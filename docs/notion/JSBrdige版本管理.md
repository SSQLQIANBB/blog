
## 📋 实现思路


### 一、当前架构分析


**现有代码结构：**

1. **JSBridge** (`js-bridge.js`): H5 → Native 单向调用
2. **Native 主动调用** (`native.js`): Native ← H5 通过 `window._nativeCallH5_`
3. **版本检测**: 已有 `getAppVersion` 接口获取 APP 版本

### 二、版本管理方案设计


### **核心思路**


```plain text
┌─────────────────────────────────────┐
│   H5 暴露方法注册表（按版本分类）      │
│   - v1.0.0: [methodA, methodB]      │
│   - v2.0.0: [methodA, methodB, C]   │
└─────────────────────────────────────┘
              ↓
    Native 调用时携带版本号
              ↓
    版本匹配检查 → 允许/拒绝调用
```


### **具体实现步骤**


### **1. 创建版本配置文件**


创建 `src/config/native-method-versions.js`：


```javascript
// src/config/native-method-versions.js

/**
 * Native 可调用方法版本映射表
 * 格式：{ 最低版本号：方法名数组 }
 *
 * 规则：
 * - 版本号格式：major.minor.patch (如 1.0.0)
 * - Native 调用时传入当前 APP 版本
 * - 只有当 APP 版本 >= 方法注册的最低版本时才允许调用
 */

export const NATIVE_METHOD_VERSIONS = {
  // 基础方法（所有版本可用）
  '1.0.0': [
    'recordStatus',        // 录音状态变化
    'getUserInfo',         // 获取用户信息
    'getToken'             // 获取 token
  ],

  // 1.5.0 新增方法
  '1.5.0': [
    'meetingNotification', // 会议通知
    'jumpToNativePage'     // 跳转原生页面
  ],

  // 2.0.0 新增方法
  '2.0.0': [
    'onAIResponse',        // AI 响应回调
    'onMeetingRecorded',   // 会议录制完成
    'updateFloatWindow'    // 更新浮窗状态
  ],

  // 2.1.0 新增方法
  '2.1.0': [
    'onMultiAgentComplete' // 多智能体完成
  ]
};

/**
 * 获取方法允许的最低版本
 * @param {string} methodName - 方法名
 * @returns {string|null} 最低版本号，不存在返回 null
 */
export function getMethodMinVersion(methodName) {
  for (const [version, methods] of Object.entries(NATIVE_METHOD_VERSIONS)) {
    if (methods.includes(methodName)) {
      return version;
    }
  }
  return null;
}

/**
 * 比较版本号
 * @param {string} v1 - 版本 1
 * @param {string} v2 - 版本 2
 * @returns {number} v1 >= v2 返回 true，否则 false
 */
export function compareVersion(v1, v2) {
  const v1Parts = v1.split('.').map(Number);
  const v2Parts = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Num = v1Parts[i] || 0;
    const v2Num = v2Parts[i] || 0;

    if (v1Num > v2Num) return 1;
    if (v1Num < v2Num) return -1;
  }

  return 0; // 相等
}

/**
 * 检查 APP 版本是否支持调用该方法
 * @param {string} appVersion - APP 当前版本
 * @param {string} methodName - 方法名
 * @returns {boolean} 是否支持调用
 */
export function canNativeCall(appVersion, methodName) {
  const minVersion = getMethodMinVersion(methodName);

  // 如果方法没有版本限制，允许调用
  if (!minVersion) return true;

  // 检查 APP 版本是否 >= 最低要求版本
  return compareVersion(appVersion, minVersion) >= 0;
}

export default {
  NATIVE_METHOD_VERSIONS,
  getMethodMinVersion,
  compareVersion,
  canNativeCall
};
```


### **2. 修改 JSBridge 增加版本存储**


修改 `src/utils/js-bridge.js`：


```javascript
class JSBridge {
  constructor(options = {}) {
    this.env = this.detectEnv();
    this.debug = options.debug ?? true;
    this.timeout = options.timeout ?? 8000;
    this.callbackPool = {};
    this.callbackId = 0;
    this.methodQueue = new Map();
    this.appVersion = '1.0.0'; // 新增：存储 APP 版本
  }

  // ... 其他方法保持不变 ...

  /**
   * 设置 APP 版本
   * @param {string} version - APP 版本号
   */
  setAppVersion(version) {
    this.appVersion = version;
    this.log('APP 版本已设置:', version);
  }

  /**
   * 获取 APP 版本
   * @returns {string} 当前版本号
   */
  getAppVersion() {
    return this.appVersion;
  }
}

window.JSBridge = new JSBridge({
  debug: true,
  timeout: 300000
});
```


### **3. 增强 Native 调用验证**


修改 `src/plugins/native.js` 中的 `registerNativeActiveMethods`：


```javascript
import { canNativeCall, getMethodMinVersion } from '@/config/native-method-versions';

const nativeMethodMap = {
  // 原生主动调用：录音状态变化
  recordStatus(payload) {
    // ... 原有逻辑 ...
    return { ok: true };
  },

  // 新增：AI 响应回调（仅 2.0.0+）
  onAIResponse(payload) {
    console.log('收到 AI 响应:', payload);
    // 处理逻辑...
    return { ok: true };
  },

  // 新增：多智能体完成（仅 2.1.0+）
  onMultiAgentComplete(payload) {
    console.log('多智能体完成:', payload);
    // 处理逻辑...
    return { ok: true };
  },
};

export function registerNativeActiveMethods() {
  if (window._nativeActiveRegistered_) return;
  window._nativeActiveRegistered_ = true;

  // 初始化时获取 APP 版本
  initAppVersion();

  // 原生统一调用方法：window.nativeCallH5('onRecordStatusChange', '{"status":"recording"}')
  window._nativeCallH5_ = (method, params) => {
    console.log('\\\\_____nativeCallH5_____//', method);

    // 1. 获取 APP 版本
    const appVersion = window.JSBridge?.getAppVersion() || '1.0.0';

    // 2. 版本兼容性检查
    const isAllowed = canNativeCall(appVersion, method);
    if (!isAllowed) {
      const minVersion = getMethodMinVersion(method);
      console.warn(`⚠️ 方法 ${method} 需要 APP 版本 >= ${minVersion}，当前版本 ${appVersion}`);
      return JSON.stringify({
        code: 403,
        msg: `方法 ${method} 需要 APP 版本 >= ${minVersion}，当前版本 ${appVersion}`
      });
    }

    // 3. 检查方法是否存在
    const handler = nativeMethodMap?.[method];
    if (!handler) {
      return JSON.stringify({ code: 404, msg: `method not found: ${method}` });
    }

    // 4. 解析参数并执行
    let payload = params;
    if (typeof params === 'string') {
      try { payload = JSON.parse(params); } catch (e) { }
    }

    try {
      console.log('\\\\_____nativeCallH5Payload_____//', payload);
      const data = handler(payload);
      return JSON.stringify({ code: 200, data });
    } catch (e) {
      return JSON.stringify({ code: 500, msg: e.message || 'handler error' });
    }
  };
}

/**
 * 初始化 APP 版本
 */
async function initAppVersion() {
  try {
    // 等待 JSBridge 初始化完成
    await new Promise(resolve => setTimeout(resolve, 100));

    const versionInfo = await window.JSBridge.call('getAppVersion', null, true);
    const version = versionInfo?.currentVersion || '1.0.0';

    window.JSBridge.setAppVersion(version);
    console.log('✅ APP 版本初始化完成:', version);
  } catch (error) {
    console.warn('获取 APP 版本失败，使用默认版本 1.0.0');
    window.JSBridge.setAppVersion('1.0.0');
  }
}
```


### **4. 在 main.js 中确保初始化顺序**


修改 `src/main.js`：


```javascript
async function bootstrap() {
  try {
    await init(); // SSO 初始化（会获取 APP 信息和版本）

    // 同步版本到 JSBridge
    const platform = store.getters.getPlatform;
    if (platform) {
      // 从 Native 获取详细版本信息
      const versionInfo = await window.JSBridge.call('getAppVersion', null, true);
      if (versionInfo?.currentVersion) {
        window.JSBridge.setAppVersion(versionInfo.currentVersion);
        console.log('📱 APP 版本:', versionInfo.currentVersion);
      }
    }
  } catch (error) {
    console.warn("SSO init failed:", error);
  }

  registerGlobalProperties();
  registerDirectives();

  const app = createApp();

  // 注册原生主动触发事件（此时已包含版本验证）
  registerNativeActiveMethods();
  installAgentFgHook();

  app.$mount("#app");
}
```


### **5. 添加版本调试工具（可选）**


创建 `src/utils/version-debug.js`：


```javascript
/**
 * 版本调试工具
 * 在浏览器控制台输入 window.versionDebug 查看版本信息
 */

export const versionDebug = {
  // 查看所有注册的方法及其版本要求
  listMethods() {
    const { NATIVE_METHOD_VERSIONS } = require('@/config/native-method-versions');
    console.table(
      Object.entries(NATIVE_METHOD_VERSIONS).map(([version, methods]) => ({
        版本：version,
        方法数量：methods.length,
        方法列表：methods.join(', ')
      }))
    );
  },

  // 检查某个方法是否可被指定版本调用
  check(methodName, appVersion) {
    const { canNativeCall, getMethodMinVersion } = require('@/config/native-method-versions');
    const minVersion = getMethodMinVersion(methodName);
    const allowed = canNativeCall(appVersion, methodName);

    console.log(`方法：${methodName}`);
    console.log(`最低版本要求：${minVersion || '无限制'}`);
    console.log(`APP 版本：${appVersion}`);
    console.log(`是否允许调用：${allowed ? '✅ 是' : '❌ 否'}`);
  },

  // 查看当前 APP 版本
  currentVersion() {
    const version = window.JSBridge?.getAppVersion();
    console.log(`当前 APP 版本：${version || '未设置'}`);
  }
};

// 挂载到全局
if (process.env.NODE_ENV === 'development') {
  window.versionDebug = versionDebug;
}
```


### 三、使用示例


### **场景 1：APP 1.0.0 尝试调用 2.0.0 方法**


```javascript
// Native 端调用
window._nativeCallH5_('onAIResponse', '{"content":"hello"}');

// 控制台输出：
// ⚠️ 方法 onAIResponse 需要 APP 版本 >= 2.0.0，当前版本 1.0.0
// 返回：{"code":403,"msg":"方法 onAIResponse 需要 APP 版本 >= 2.0.0，当前版本 1.0.0"}
```


### **场景 2：APP 2.0.0 调用 1.0.0 方法**


```javascript
// Native 端调用
window._nativeCallH5_('recordStatus', '{"status":"recording"}');

// 控制台输出：
// ✅ 允许调用（1.0.0 方法对所有版本开放）
// 返回：{"code":200,"data":{"ok":true}}
```


### 四、优势总结


✅ **向后兼容**: 新版本 APP 可以调用所有旧方法


✅ **向前限制**: 旧版本 APP 无法调用新方法，避免崩溃


✅ **集中管理**: 所有方法版本配置在一个文件中维护


✅ **易于扩展**: 新增方法只需在配置表中添加


✅ **开发友好**: 提供调试工具，快速排查问题


✅ **安全可控**: 版本不匹配时返回明确的错误码


这个方案可以确保 APP 和 H5 之间的方法调用始终保持版本一致性！


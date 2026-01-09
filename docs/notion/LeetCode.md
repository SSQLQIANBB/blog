
# DFS 算法


## 一、DFS 总纲


### 1.1 DFS 四大分类（90% 题目归属）


| 大类        | 搜索对象         | 本质      |
| --------- | ------------ | ------- |
| ① 连通块 DFS | 网格 / 图       | 染色 / 吞并 |
| ② 路径 DFS  | 树 / 图        | 枚举所有路径  |
| ③ 回溯 DFS  | 组合 / 排列 / 子集 | 枚举 + 剪枝 |
| ④ 边界 DFS  | 网格           | 先排除非法边界 |


## 二、① 连通块 DFS


### 2.1 适用场景

- 二维网格类题目
- 岛屿、区域、面积相关问题
- 核心特征：“相连的元素算一块”，只关心「连不连」，不关心具体路径

### 2.2 统一模板


```javascript
function dfs(x, y) {
  // 1. 越界或状态不合法，直接返回
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== 合法值) {
    return;
  }

  // 2. 标记已访问，避免重复遍历
  grid[x][y] = 已访问标记; // 如：0 标记为 2，'1' 标记为 '0'

  // 3. 上下左右四向递归（网格通用）
  dfs(x + 1, y); // 下
  dfs(x - 1, y); // 上
  dfs(x, y + 1); // 右
  dfs(x, y - 1); // 左
}
```


### 2.3 必刷高频题目


| 题号     | 题名     | 核心考点        |
| ------ | ------ | ----------- |
| LC 200 | 岛屿数量   | 连通块计数       |
| LC 695 | 最大岛屿面积 | 连通块 + 面积统计  |
| LC 463 | 岛屿周长   | 邻接边判断       |
| LC 733 | 图像渲染   | 泛洪填充（连通块染色） |


### 2.4 核心逻辑


DFS 的唯一作用：“吃掉”整块连通区域（标记为已访问），外层循环遍历网格，每触发一次 DFS 即找到一个新连通块，计数加一。


## 三、② 路径 DFS（树 / 图）


### 3.1 适用场景

- 查找所有路径、根到叶路径
- 判断是否存在某条目标路径
- 核心特征：关注「路径细节」，与连通块无关联

### 3.2 统一模板（含回溯）


```javascript
function dfs(node, path, res) {
  // 1. 节点为空，直接返回
  if (!node) {
    return;
  }

  // 2. 选择当前节点，加入路径
  path.push(node.val);

  // 3. 到达终点（如：叶子节点），记录答案
  if (!node.left && !node.right) {
    res.push([...path]); // 深拷贝，避免路径被修改
    // 注意：此处不直接return，需先回溯
  }

  // 4. 递归遍历左右子树（树）/ 邻接节点（图）
  dfs(node.left, path, res);
  dfs(node.right, path, res);

  // 5. 回溯：撤销当前选择，恢复路径状态
  path.pop();
}
```


### 3.3 必刷高频题目


| 题号     | 题名       |
| ------ | -------- |
| LC 112 | 路径总和     |
| LC 113 | 路径总和 II  |
| LC 257 | 二叉树的所有路径 |
| LC 797 | 所有可能的路径  |


### 3.4 核心区分


题目出现「所有路径」「所有方案」关键词 → 必须使用「DFS + 回溯」，核心是恢复路径状态，避免不同路径互相干扰。


## 四、③ 回溯 DFS（枚举解空间）


### 4.1 适用场景

- 排列、组合、子集问题
- N 皇后、数独等解空间爆炸类题目
- 核心特征：需要枚举所有可能的解，并通过剪枝优化效率

### 4.2 通用模板


```javascript
function backtrack(path, start, nums, res) {
  // 1. 满足终止条件，记录答案
  if (满足条件) { // 如：path长度达到要求、找到目标值
    res.push([...path]);
    return;
  }

  // 2. 遍历选择列表
  for (let i = start; i < nums.length; i++) {
    // 剪枝：排除无效选择（可选，优化效率）
    if (需要剪枝的条件) {
      continue;
    }

    // 3. 选择当前元素
    path.push(nums[i]);

    // 4. 递归进入下一层
    backtrack(path, i + 1, nums, res); // 组合/子集用 i+1；排列用 0（需去重）

    // 5. 回溯：撤销选择
    path.pop();
  }
}
```


### 4.3 必刷高频题目


| 题号    | 题名     |
| ----- | ------ |
| LC 46 | 全排列    |
| LC 47 | 全排列 II |
| LC 78 | 子集     |
| LC 90 | 子集 II  |
| LC 39 | 组合总和   |
| LC 51 | N 皇后   |


### 4.4 核心三件事

1. 选择列表：当前可以选择的元素集合（如：数组中未使用的元素）
2. 终止条件：何时停止递归并记录答案（如：路径长度达标）
3. 剪枝逻辑：如何排除无效选择，减少递归次数（如：跳过重复元素、超出目标值直接终止）

## 五、④ 边界 DFS


### 5.1 适用场景

- 二维网格题 + 存在「边界限制」（如：不能接触边界、不能逃出地图）
- 题目特征：未明确声明「网格外是合法值」（与 LC 200 岛屿数量的核心区别）

### 5.2 标准套路（两步走）

1. **第一步：从边界 DFS，排除非法区域**

    ```javascript
    // 遍历所有边界点（上下左右四条边）
    const m = grid.length, n = grid[0].length;
    // 上边界 + 下边界
    for (let j = 0; j < n; j++) {
      dfs(0, j);
      dfs(m - 1, j);
    }
    // 左边界 + 右边界（排除已遍历的四个角）
    for (let i = 1; i < m - 1; i++) {
      dfs(i, 0);
      dfs(i, n - 1);
    }
    ```

2. **第二步：遍历内部，统计剩余合法区域**

    ```javascript
    let count = 0;
    for (let i = 1; i < m - 1; i++) {
      for (let j = 1; j < n - 1; j++) {
        if (grid[i][j] === 合法值) {
          dfs(i, j);
          count++;
        }
      }
    }
    ```


### 5.3 必刷高频题目


| 题号      | 题名     |
| ------- | ------ |
| LC 130  | 被围绕的区域 |
| LC 1020 | 飞地的数量  |
| LC 1254 | 统计封闭岛屿 |


### 5.4 与 LC 200 的本质区别


| 题目               | 是否声明网格外是水 | 处理方式        |
| ---------------- | --------- | ----------- |
| LC 200           | 是         | 直接遍历网格统计连通块 |
| LC 130/1020/1254 | 否         | 先处理边界，再统计内部 |


## 六、DFS 与其他算法快速区分


| 题目特征        | 优先算法     |
| ----------- | -------- |
| 连通区域、吞并     | DFS      |
| 所有路径、所有方案   | DFS + 回溯 |
| 连续区间（非最值）   | 双指针      |
| 最近距离、层级遍历   | BFS      |
| 原地删除、去重     | 快慢指针     |
| 区间最值、子串/子数组 | 滑动窗口     |


## 七、DFS 10 秒快速判断流程

1. 是否是网格 / 图类题目？→ 是 → 优先 DFS
2. 是否只关心「连不连」，不关心路径？→ 连通块 DFS
3. 是否要求「所有路径」「所有方案」？→ 路径 DFS + 回溯
4. 是否存在「边界限制」（未声明网格外合法）？→ 边界 DFS（先清边）
5. 否则 → 考虑回溯 DFS（组合/排列/子集）

## 八、DFS 必刷 12 题清单

1. LC 200 岛屿数量
2. LC 695 最大岛屿面积
3. LC 733 图像渲染
4. LC 112 路径总和
5. LC 113 路径总和 II
6. LC 257 二叉树的所有路径
7. LC 46 全排列
8. LC 78 子集
9. LC 39 组合总和
10. LC 130 被围绕的区域
11. LC 1020 飞地的数量
12. LC 1254 统计封闭岛屿

# 双指针算法


## 一、双指针总纲


### 1.1 双指针四大分类（99% 题目归属）


| 大类     | 指针运动方式  | 本质           |
| ------ | ------- | ------------ |
| ① 快慢指针 | 同向、不同速度 | 过滤 / 去重 / 找环 |
| ② 左右指针 | 两端向中间对撞 | 有序数组 + 求和/回文 |
| ③ 滑动窗口 | 同向、窗口伸缩 | 区间最值（子串/子数组） |
| ④ 多指针  | ≥3 个指针  | 排序后枚举（多数求和）  |


## 二、① 快慢指针（同向）


### 2.1 适用场景

- 原地修改数组（删除、去重、移动元素）
- 链表相关（找环、环入口、中间节点）
- 核心特征：指针同方向移动，快指针探路，慢指针记录有效位置

### 2.2 典型模板


```javascript
function process(nums) {
  let slow = 0; // 慢指针：记录有效元素的下标
  // 快指针：遍历整个数组，寻找有效元素
  for (let fast = 0; fast < nums.length; fast++) {
    // 满足条件：当前元素有效，保留到慢指针位置
    if (nums[fast] 满足有效条件) {
      nums[slow] = nums[fast];
      slow++; // 慢指针后移，准备接收下一个有效元素
    }
  }
  return slow; // 有效元素的长度
}
```


### 2.3 必刷高频题目


| 题号     | 题名             | 核心考点                 |
| ------ | -------------- | -------------------- |
| LC 27  | 移除元素           | 有效元素覆盖               |
| LC 26  | 删除排序数组中的重复项    | 相邻元素去重               |
| LC 80  | 删除排序数组中的重复项 II | 保留最多两个重复项（slow-2 判断） |
| LC 283 | 移动零            | 非零元素覆盖，末尾补零          |
| LC 141 | 环形链表           | 快慢指针追及（判断环）          |
| LC 142 | 环形链表 II        | 数学推导 + 环入口定位         |


## 三、② 左右指针（对撞指针）


### 3.1 适用场景

- 有序数组（升序/降序）
- 求和问题（两数之和、三数之和）
- 回文判断、字符串反转、盛水问题
- 核心特征：数组有序，指针从两端向中间收缩，通过调整指针位置逼近目标

### 3.2 典型模板


```javascript
function process(nums, target) {
  let left = 0; // 左指针：起始位置
  let right = nums.length - 1; // 右指针：末尾位置

  while (left < right) {
    const cur = 计算当前值（如：nums[left] + nums[right]）;
    if (cur 满足目标条件) {
      // 找到答案，返回或记录
      return [left + 1, right + 1];
    } else if (cur 小于目标) {
      left++; // 左指针右移，增大当前值
    } else {
      right--; // 右指针左移，减小当前值
    }
  }
  return []; // 未找到答案
}
```


### 3.3 必刷高频题目


| 题号     | 题名               | 核心考点           |
| ------ | ---------------- | -------------- |
| LC 167 | 两数之和 II - 输入有序数组 | 有序数组求和         |
| LC 15  | 三数之和             | 固定一个数 + 左右指针对撞 |
| LC 11  | 盛最多水的容器          | 短板效应 + 指针收缩    |
| LC 125 | 验证回文串            | 忽略非字母数字 + 回文判断 |
| LC 344 | 反转字符串            | 首尾字符交换         |


## 四、③ 滑动窗口（同向窗口）


### 4.1 适用场景

- 连续子串 / 子数组问题
- 求区间最值（最小长度、最大长度、是否存在）
- 核心特征：窗口由左右指针构成（同向移动），右指针扩张窗口，左指针收缩窗口，维护窗口内的合法状态

### 4.2 典型模板


```javascript
function process(s/t, target) {
  let left = 0; // 窗口左边界
  let window = {}; // 维护窗口内的状态（如：字符计数、和值）
  let res = 最值初始化; // 如：Infinity（最小长度）、0（最大长度）

  // 右指针扩张窗口，遍历所有元素
  for (let right = 0; right < s.length; right++) {
    const cur = s[right];
    // 更新窗口内状态
    window[cur] = (window[cur] || 0) + 1;

    // 窗口内状态不合法，收缩左指针
    while (窗口不满足合法条件) {
      const leftCur = s[left];
      // 更新窗口内状态
      window[leftCur]--;
      // 左指针右移，收缩窗口
      left++;
    }

    // 更新答案（此时窗口合法）
    res = 取 res 与 当前窗口长度 的最值;
  }

  return res;
}
```


### 4.3 必刷高频题目


| 题号      | 题名            |
| ------- | ------------- |
| LC 209  | 长度最小的子数组      |
| LC 3    | 无重复字符的最长子串    |
| LC 76   | 最小覆盖子串        |
| LC 567  | 字符串的排列        |
| LC 438  | 找到字符串中所有字母异位词 |
| LC 1004 | 最大连续1的个数 III  |


## 五、④ 多指针（≥3 个）


### 5.1 适用场景

- 多数求和问题（三数之和、四数之和）
- 排序后枚举所有可能组合
- 核心特征：先排序，再固定前 N-2 个指针，最后两个指针用左右指针对撞

### 5.2 核心模板（三数之和）


```javascript
function threeSum(nums) {
  const res = [];
  nums.sort((a, b) => a - b); // 先排序，方便去重和指针移动

  for (let i = 0; i < nums.length; i++) {
    // 去重：跳过重复的固定值
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1; // 左指针：固定值的下一个元素
    let right = nums.length - 1; // 右指针：数组末尾

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        // 去重：跳过左指针重复值
        while (left < right && nums[left] === nums[left + 1]) left++;
        // 去重：跳过右指针重复值
        while (left < right && nums[right] === nums[right - 1]) right--;
        // 指针收缩，寻找下一组解
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return res;
}
```


### 5.3 必刷高频题目


| 题号     | 题名       |
| ------ | -------- |
| LC 15  | 三数之和     |
| LC 18  | 四数之和     |
| LC 16  | 最接近的三数之和 |
| LC 611 | 有效三角形的个数 |


## 六、双指针与其他算法快速区分


| 题目特征           | 优先算法     |
| -------------- | -------- |
| 原地修改数组（删除/去重）  | 快慢指针     |
| 有序数组 + 求和/回文   | 左右指针     |
| 连续区间最值（子串/子数组） | 滑动窗口     |
| 多数求和（≥3 个数）    | 多指针      |
| 层级遍历 / 最近距离    | BFS      |
| 所有路径 / 组合排列    | DFS + 回溯 |


## 七、双指针 10 秒快速判断流程

1. 是否是「连续区间最值」问题（子串/子数组）？→ 是 → 滑动窗口
2. 是否需要「原地删除/覆盖/去重」？→ 是 → 快慢指针
3. 是否是「有序数组 + 求和/回文」？→ 是 → 左右指针
4. 是否是「≥3 个数求和/组合」？→ 是 → 排序 + 多指针
5. 否则 → 考虑其他算法

## 八、双指针必刷 12 题清单

1. LC 27 移除元素
2. LC 26 删除排序数组中的重复项
3. LC 80 删除排序数组中的重复项 II
4. LC 283 移动零
5. LC 11 盛最多水的容器
6. LC 167 两数之和 II - 输入有序数组
7. LC 15 三数之和
8. LC 3 无重复字符的最长子串
9. LC 76 最小覆盖子串
10. LC 209 长度最小的子数组
11. LC 141 环形链表
12. LC 142 环形链表 II

# 二叉树算法


## 一、二叉树总纲（和 DFS 的关系）


二叉树题 **本质 90% 都是 DFS**，区别只在于：

- **访问时机不同**（前 / 中 / 后序）
- **是否需要返回值**（自底向上 or 自顶向下）

一句话：

> 树 = 无环图，DFS 天然适配

---


## 二、三大遍历（必须条件反射）


### 2.1 定义（先背死）


| 遍历 | 顺序        | 典型用途               |
| -- | --------- | ------------------ |
| 前序 | 根 → 左 → 右 | 构建 / 拷贝树、路径问题      |
| 中序 | 左 → 根 → 右 | BST（有序性）           |
| 后序 | 左 → 右 → 根 | 子树信息汇总（高度、直径、是否平衡） |


### 2.2 模板（Java）


```java
void preorder(TreeNode root) {
    if (root == null) return;
    visit(root);
    preorder(root.left);
    preorder(root.right);
}

void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    visit(root);
    inorder(root.right);
}

void postorder(TreeNode root) {
    if (root == null) return;
    postorder(root.left);
    postorder(root.right);
    visit(root);
}
```


---


## 三、二叉树四大题型（99% 归类）


### ① 路径类（自顶向下 DFS）


**特征关键词**：

- 根到叶
- 路径和
- 所有路径

**核心思想**：

> 路径是“过程数据”，必须 DFS + 回溯

### 通用模板


```java
void dfs(TreeNode node, List<Integer> path) {
    if (node == null) return;

    path.add(node.val);          // 选择

    if (node.left == null && node.right == null) {
        // 叶子节点，记录答案
    }

    dfs(node.left, path);
    dfs(node.right, path);

    path.remove(path.size() - 1); // 回溯
}
```


**必刷题**：

- LC 112 路径总和
- LC 113 路径总和 II
- LC 257 二叉树的所有路径

---


### ② 子树信息类（自底向上 DFS / 后序）


**特征关键词**：

- 高度 / 深度
- 是否平衡
- 直径 / 最大路径

**核心思想**：

> 当前节点依赖左右子树结果 → 后序遍历

### 通用模板


```java
int dfs(TreeNode root) {
    if (root == null) return 0;

    int left = dfs(root.left);
    int right = dfs(root.right);

    // 在这里“汇总左右子树信息”

    return Math.max(left, right) + 1;
}
```

> 后序: 访问当前节点时，只需要记录的右边节点有没有被访问，即上次出栈的节点是不是右侧节点；

```javascript
// 左右中 + stack
const postorderTraversal = (root) => {
  if (!root) return []

  const stack = [];
  const res = [];

  let node = root;
  let prev = null

  while (stack.length || node) {
    while (node) {
      stack.push(node);

      node = node.left;
    }

    node = stack.at(-1);

    // 【1，2，3】输出：【2，3，1】
    // 执行过程中左右按顺序压入栈。左边节点到达顶点，
    // 将左侧节点值放入result, node置为空，防止走入 node left的循环；
    // 左侧节点出栈；
    // 访问右侧节点；右侧节点入栈；
    // 到达右侧顶点；右侧值放入result,
    // 节点出栈，记录右侧出栈节点，防止再次进入右侧节点；

    if (!node.right || node.right === prev) {
      res.push(node.val);
      stack.pop();

      prev = node;

      node = null;
    } else {
      node = node.right
    }
  }

  return res;
}
```


**必刷题**：

- LC 104 二叉树的最大深度
- LC 110 平衡二叉树
- LC 543 二叉树的直径

---


### ③ BST 类（中序有序）


**特征关键词**：

- 二叉搜索树
- 第 k 小 / 验证 BST

**核心思想**：

> BST 的 中序遍历 = 升序数组

### 模板（中序）


```java
void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    // root.val 在这里是“当前最小未访问值”
    inorder(root.right);
}
```


**必刷题**：

- LC 98 验证二叉搜索树
- LC 230 二叉搜索树中第 K 小的元素

---


### ④ 层序 / BFS 类


**特征关键词**：

- 一层一层
- 最短距离
- 每层统计

### BFS 模板


```java
Queue<TreeNode> queue = new LinkedList<>();
queue.offer(root);

while (!queue.isEmpty()) {
    int size = queue.size();
    for (int i = 0; i < size; i++) {
        TreeNode cur = queue.poll();
        if (cur.left != null) queue.offer(cur.left);
        if (cur.right != null) queue.offer(cur.right);
    }
}
```


**必刷题**：

- LC 102 二叉树的层序遍历
- LC 111 二叉树的最小深度
- LC 199 二叉树的右视图

---


## 四、10 秒判断用 DFS 还是 BFS


| 题目特征           | 算法       |
| -------------- | -------- |
| 根到叶路径 / 所有方案   | DFS + 回溯 |
| 子树高度 / 平衡 / 直径 | DFS（后序）  |
| 层级 / 最短路径      | BFS      |
| BST 有序性        | 中序 DFS   |


---


## 五、二叉树必刷 10 题清单

1. LC 104 二叉树的最大深度
2. LC 111 二叉树的最小深度
3. LC 112 路径总和
4. LC 113 路径总和 II
5. LC 257 二叉树的所有路径
6. LC 110 平衡二叉树
7. LC 543 二叉树的直径
8. LC 102 层序遍历
9. LC 98 验证 BST
10. LC 230 BST 第 K 小

---


# BFS 算法


## 一、BFS 总纲


### 1.1 BFS 的本质

> 按“层”扩散，一圈一圈往外走
- 使用 **队列（Queue）**
- 先入先出（FIFO）
- 天生适合：
    - 最短路径
    - 最少步数
    - 层级关系

一句话记忆：

> “最短 / 最近 / 最少” → 直接想 BFS

---


## 二、BFS 四大高频题型（95% 覆盖）


| 类型       | 典型问题         | 核心关键词            |
| -------- | ------------ | ---------------- |
| ① 网格 BFS | 岛屿 / 迷宫 / 路径 | 最短路、扩散           |
| ② 图 BFS  | 无权图最短路       | steps / distance |
| ③ 多源 BFS | 同时从多个点出发     | 最近距离             |
| ④ 层序 BFS | 树的层级遍历       | level / depth    |


---


## 三、① 网格 BFS（最常见）


### 3.1 适用场景

- 二维矩阵
- 从起点到终点
- 求 **最短路径 / 最少步数**

典型特征：

- 每一步代价相同
- 上下左右移动

---


### 3.2 标准模板（网格）


```javascript
function bfs(grid, startX, startY) {
  const m = grid.length, n = grid[0].length;
  const queue = [];

  queue.push([startX, startY]);
  grid[startX][startY] = 已访问标记;

  let steps = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  while (queue.length > 0) {
    const size = queue.length; // 当前层节点数

    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      // 判断是否到达目标
      if (到达目标) return steps;

      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
        if (grid[nx][ny] !== 可走状态) continue;

        grid[nx][ny] = 已访问标记;
        queue.push([nx, ny]);
      }
    }

    steps++; // 一层走完，步数 +1
  }

  return -1; // 不可达
}
```


---


### 3.3 必刷题


| 题号      | 题名          |
| ------- | ----------- |
| LC 1091 | 二进制矩阵中的最短路径 |
| LC 542  | 01 矩阵       |
| LC 994  | 腐烂的橘子       |
| LC 1926 | 迷宫中离入口最近的出口 |


---


## 四、② 图 BFS（无权图最短路）


### 4.1 适用场景

- 图结构
- 节点之间没有权重
- 求最少边数

---


### 4.2 模板（邻接表）


```javascript
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  let steps = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node === target) return steps;

      for (const next of graph[node]) {
        if (visited.has(next)) continue;
        visited.add(next);
        queue.push(next);
      }
    }
    steps++;
  }
  return -1;
}
```


---


### 4.3 必刷题


| 题号     | 题名     |
| ------ | ------ |
| LC 127 | 单词接龙   |
| LC 433 | 最小基因变化 |
| LC 752 | 打开转盘锁  |


---


## 五、③ 多源 BFS（非常重要）


### 5.1 核心思想

> 不是一个起点，而是一堆起点同时扩散

本质：

- 把所有源点一次性加入队列
- BFS 自然保证最近距离

---


### 5.2 模板


```javascript
const queue = [];

// 1️⃣ 先把所有源点入队
for (所有源点) {
  queue.push([x, y]);
  grid[x][y] = 已访问;
}

let steps = 0;
while (queue.length) {
  const size = queue.length;
  for (let i = 0; i < size; i++) {
    const [x, y] = queue.shift();
    // 扩散
  }
  steps++;
}
```


---


### 5.3 必刷题


| 题号      | 题名    |
| ------- | ----- |
| LC 542  | 01 矩阵 |
| LC 994  | 腐烂的橘子 |
| LC 1162 | 地图分析  |


---


## 六、④ 层序 BFS（树）


### 6.1 适用场景

- 二叉树
- 按层遍历
- 深度 / 层数 / 每层统计

---


### 6.2 模板


```javascript
function levelOrder(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}
```


---


### 6.3 必刷题


| 题号     | 题名       |
| ------ | -------- |
| LC 102 | 二叉树的层序遍历 |
| LC 111 | 二叉树的最小深度 |
| LC 199 | 二叉树的右视图  |


---


## 七、DFS vs BFS 一眼区分表


| 需求          | 算法       |
| ----------- | -------- |
| 连通块 / 吞并    | DFS      |
| 所有路径 / 所有方案 | DFS + 回溯 |
| 最短路径 / 最少步数 | BFS      |
| 最近的 / 最小距离  | BFS      |
| 树的层级        | BFS      |


---


## 八、BFS 10 秒判断流程

1. 是否是 **最短 / 最近 / 最少步数**？→ BFS
2. 是否每一步代价相同？→ BFS
3. 是否按层扩散？→ BFS
4. 否则 → DFS / 其他算法

---


## 九、BFS 必刷 10 题清单

1. LC 102 二叉树的层序遍历
2. LC 111 二叉树的最小深度
3. LC 127 单词接龙
4. LC 433 最小基因变化
5. LC 752 打开转盘锁
6. LC 994 腐烂的橘子
7. LC 542 01 矩阵
8. LC 1091 二进制矩阵中的最短路径
9. LC 1162 地图分析
10. LC 1926 迷宫中离入口最近的出口

---


**LeetCode 1162**


BFS 求最短距离时，**起点必须是“确定状态”的点**。


| **问题目标**                        | **起点选择**            | **原因**                                   |
| ------------------------------- | ------------------- | ---------------------------------------- |
| **求离陆地最远的海洋**（即：每个海洋到最近陆地的最大距离） | ✅ **所有陆地 (1) 作为起点** | 陆地到自身的距离 = 0（已知），向外扩散可计算每个海洋到**最近陆地**的距离 |
| **求离海洋最远的陆地**（每个陆地到最近海洋的最大距离）   | ✅ **所有海洋 (0) 作为起点** | 海洋到自身距离 = 0，向外扩散计算陆地到最近海洋的距离             |


通过所有陆地同时进行 BFS 分层扩散，某个海洋格子第一次被访问的层数，就是它到最近陆地的最短距离


```javascript
/*
 * @lc app=leetcode.cn id=1162 lang=javascript
 *
 * [1162] 地图分析
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
// BFS
// 通过所有陆地同时进行 BFS 分层扩散，
// 某个海洋格子第一次被访问的层数，
// 就是它到最近陆地的最短距离

// 海洋单元格到离它最近的陆地单元格的距离是最大
// 即：以陆地为起点，层层遍历，找到距离陆地最远的（层数最大）的海洋点；
// 如果以海洋为起点；
// 被访问的陆地肯可能是当前海洋单元格最近距离，但是同时也可能是某个海洋单元格的最远距离；
const maxDistance = function(grid) {
  const n = grid.length;
  const queue = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }

  if (queue.length === n * n || !queue.length) return -1;

  let distance = -1;
  while (queue.length) {
    const size = queue.length;

    distance++;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      if (x - 1 >= 0 && grid[x-1][y] === 0) {
        queue.push([x - 1, y]);
        grid[x-1][y] = 1;
      }
      if (x + 1 <= n - 1 && grid[x+1][y] === 0) {
        queue.push([x + 1, y]);
        grid[x+1][y] = 1;
      }

      if (y - 1 >= 0 && grid[x][y-1] === 0)  {
        queue.push([x, y - 1]);
        grid[x][y-1] = 1;
      }
      if (y + 1 <= n - 1 && grid[x][y + 1] === 0) {
        queue.push([x, y + 1]);
        grid[x][y + 1] = 1;
      }
    }
  }

  return distance
}
// 暴力解法
var _maxDistance = function(grid) {
  const n = grid.length;
  const queue = [];

  for (let i  = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) queue.push([i,j]);
    }
  }

  if (queue.length === n * n || !queue.length) return -1;

  let max = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        max = Math.max(bfs(i, j), max)
      }
    }
  }

  function bfs(x1,y1) {
    let min = n + n -2;
    for (let i = 0; i < queue.length; i++) {
      const [x, y] = queue[i];

      const distance = Math.abs(x1 - x) + Math.abs(y1 - y);

      min = Math.min(min, distance)
    }

    return min;
  }

  return max;
};
// @lc code=end
```


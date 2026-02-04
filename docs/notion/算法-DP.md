
## **一、DP 的本质（一句话版）**

> DP = 状态 + 选择 + 转移 + 边界

4 个问题：

1. **状态是什么？**（dp[i] 表示什么）
2. **最后一步怎么来？**
3. **有哪些选择？**
4. **初始条件？**

---


## **二、动态规划核心题型分类**


---


## **1️⃣ 一维 DP（线性 DP）**


### **特点**

- 只和前面 1~k 个状态有关
- 最常见，入门必刷

### **模板**


```javascript
dp[0] = 初始值
for (i = 1 .. n) {
  dp[i] = 从 dp[i-1], dp[i-2] ... 转移
}
```


### **经典题**

- **70. 爬楼梯**
- **198. 打家劫舍**
- **746. 使用最小花费爬楼梯**
- **53. 最大子数组和（Kadane）**

### **必练**

- **139. 单词拆分**
- **322. 零钱兑换**

---


## **2️⃣ 二维 DP（区间 / 网格）**


### **2.1 网格 DP**


### **特点**

- 从左 / 上 / 左上 转移

### **模板**


```javascript
dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + cost[i][j]
```


### **经典题**

- **62 / 63. 不同路径**
- **64. 最小路径和**
- **221. 最大正方形**

---


### **2.2 区间 DP（最难但含金量高）**


### **特点（不是人做的）**

- 枚举区间长度
- 枚举断点 k

### **模板**


```javascript
for (len = 2 .. n)
  for (l = 0 .. n-len)
    r = l + len - 1
    for (k = l .. r)
      dp[l][r] = min/max(dp[l][k] + dp[k+1][r] + cost)
```


### **经典题**

- **312. 戳气球**
- **96. 不同的二叉搜索树**
- **1039. 多边形三角剖分**

---


## **3️⃣ 背包 DP（必考大类）**


### **3.1 0-1 背包**


### **特点**

- 每个物品只能选一次

```javascript
for item in items
  for j = W .. weight
    dp[j] = max(dp[j], dp[j-weight] + value)
```


### **经典题**

- **416. 分割等和子集**
- **494. 目标和**
- **1049. 最后一块石头的重量 II**

---


### **3.2 完全背包**


### **特点**

- 每个物品可以无限选

```javascript
for item in items
  for j = weight .. W
    dp[j] = min/max(dp[j], dp[j-weight] + value)
```


### **经典题**

- **322. 零钱兑换**
- **518. 零钱兑换 II**

---


### **3.3 多维背包**

- **474. 一和零**
- **879. 盈利计划**

---


## **4️⃣ 子序列 / 字符串 DP**


### **特点**

- `dp[i][j]` 表示前 i、前 j

### **模板（LCS）**


```javascript
if s[i-1] === t[j-1]
  dp[i][j] = dp[i-1][j-1] + 1
else
  dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```


### **经典题**

- **1143. 最长公共子序列**

    |   |   | **a** | **c** | **e** |
    | - | - | ----- | ----- | ----- |
    |   | 0 | 0     | 0     | 0     |
    | a | 0 | 1     | 1     | 1     |
    | b | 0 | 1     | 1     | 1     |
    | c | 0 | 1     | 2     | 2     |
    | d | 0 | 1     | 2     | 2     |
    | e | 0 | 1     | 2     | 3     |


    ```javascript
    // 如果 text1[i] === text2[j], 则比较text1[i - 1]:text2[j - 1];
    dp[i][j] = dp[i - 1][j - 1] + 1
    // 如果 text1[i] !== text2[j],则比较text1[i - 1]:text2[j] || text1[i]:text2[j - 1]
    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    // dp[0][0]为空
    ```

- **72. 编辑距离**

    |   |   | **r** | **o** | **s** |
    | - | - | ----- | ----- | ----- |
    |   | 0 | 1     | 2     | 3     |
    | h | 1 | 1     | 2     | 3     |
    | o | 2 | 2     | 1     | 2     |
    | r | 3 | 2     | 2     | 2     |
    | s | 4 | 3     | 3     | 2     |
    | e | 5 | 4     | 4     | 3     |


    ```javascript
    // w1[i] === w2[j] dp[i][j] = dp[i - 1][j - 1];
    // w1[i] !== w2[j] dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    // dp[i - 1][j],     // delete
    // dp[i][j - 1],     // insert
    // dp[i - 1][j - 1]  // replace
    ```

- **516. 最长回文子序列**
    > 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。(子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。)

    ```javascript
    // 长度为1时，字符串肯定为回文：dp[i][i] = 1;
    // 从长度为2开始遍历；
    dp = Array.from({ length: s.length }, () => new Array(s.length).fill(0))
    
    for (let i = 0; i < s.length; i++) {
      dp[i][i] = 1;
    }
    
    for (let len = 2; len <= s.length; len++) {
      for (let i = 0; i <= s.length - len; i++) {
        if (s[i] === s[j]) {
          dp[i][j] = dp[i + 1][j - 1] + 2;
        } else {
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
    
        if (dp[i][j] > max) max = dp[i][j]
      }
    }
    
    return max
    ```

- **5. 最长回文子串**

    **题解1： 中心扩展**

    - 长度为偶数时：两边都相等；(aabbaa)
    - 长度为奇数时：出去中间的两边都相等；(aabcbaa)

    ```javascript
    // 奇数str[i, i]
    // 偶数str[i, i + 1];
    // str判断逻辑：
    function str(i, j) {
      if (s[i] === s[j]) {
        if (j - i > maxlength) {
          left = i;
          right = j;
        }
    
        if (s > 0 && j < s.length - 1) str(i - 1, j + 1);
      }
    }
    ```


    **题解2： DP动态规划**:

    - 所有长度为1的都是回文子串；i, j 表示下标；
    - dp[i][j]依赖dp[i + 1][j - 1]

    ```javascript
    n = s.length;
    dp = Array.from({ length: n }, () => new Array(n).fill(false));
    
    // 设置所有长度为1的子串为回文；
    for (let i = 0; i < n; i++) {
      dp[i][i] = true;
    }
    // 长度从2开始
    for (len = 2; len <= n; len++) {
      for (let i = 0; i <= n - len; i++) {
        const j = i + len - 1;
    
        if (s[i] === s[j]) {
          if (len === 2 || dp[i + 1][j - 1]) {
            dp[i][j] = true;
    
            if (maxlength < len) {
              start = i;
              maxlength = len;
            }
          }
        }
      }
    }
    ```


---


## **5️⃣ 状态压缩 DP（进阶）**


### **特点**

- 用二进制表示状态
- n ≤ 15 左右

### **模板**


```javascript
dp[mask] = 从 mask 去掉一位转移
```


### **经典题**

- **698. 划分为 k 个相等的子集(不会)**
- **464. 我能赢吗**
- **847. 访问所有节点的最短路径**

---


## **6️⃣ 树形 DP**


### **特点**

- 后序遍历
- 每个节点有多个状态

### **模板**


```javascript
dfs(node) {
  for child in children:
    dfs(child)
  合并子树状态
}
```


### **经典题**

- **337. 打家劫舍 III**
- **124. 二叉树中的最大路径和**
- **968. 监控二叉树**

---


## **三、刷题路线（强烈推荐）**


### **入门**


```plain text
70 → 198 → 746 → 62 → 322
```


### **中级**


```plain text
416 → 494 → 139 → 1143 → 72
```


### **高级**


```plain text
96 → 312 → 337 → 474 → 698
```


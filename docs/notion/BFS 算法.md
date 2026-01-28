
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


> 源码文件：vuejs/core/packages/runtime-core/src/renderer.ts

## patchKeyedChildren(有key)


```javascript
const patchKeyedChildren = (
    c1: VNode[],
    c2: VNodeArrayChildren,
    container: RendererElement,
    parentAnchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    namespace: ElementNamespace,
    slotScopeIds: string[] | null,
    optimized: boolean,
  ) => {
    let i = 0
    const l2 = c2.length
    let e1 = c1.length - 1 // prev ending index
    let e2 = l2 - 1 // next ending index

    // 1. sync from start
    // (a b) c
    // (a b) d e
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]))
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        )
      } else {
        break
      }
      i++
    }

    // 2. sync from end
    // a (b c)
    // d e (b c)
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = (c2[e2] = optimized
        ? cloneIfMounted(c2[e2] as VNode)
        : normalizeVNode(c2[e2]))
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        )
      } else {
        break
      }
      e1--
      e2--
    }

    // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1
        const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
        while (i <= e2) {
          patch(
            null,
            (c2[i] = optimized
              ? cloneIfMounted(c2[i] as VNode)
              : normalizeVNode(c2[i])),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          )
          i++
        }
      }
    }

    // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true)
        i++
      }
    }

    // 5. unknown sequence
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    else {
      const s1 = i // prev starting index
      const s2 = i // next starting index

      // 5.1 build key:index map for newChildren
      const keyToNewIndexMap: Map<PropertyKey, number> = new Map()
      for (i = s2; i <= e2; i++) {
        const nextChild = (c2[i] = optimized
          ? cloneIfMounted(c2[i] as VNode)
          : normalizeVNode(c2[i]))
        if (nextChild.key != null) {
          if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
            warn(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`,
            )
          }
          keyToNewIndexMap.set(nextChild.key, i)
        }
      }

      // 5.2 loop through old children left to be patched and try to patch
      // matching nodes & remove nodes that are no longer present
      let j
      let patched = 0
      const toBePatched = e2 - s2 + 1
      let moved = false
      // used to track whether any node has moved
      let maxNewIndexSoFar = 0
      // works as Map<newIndex, oldIndex>
      // Note that oldIndex is offset by +1
      // and oldIndex = 0 is a special value indicating the new node has
      // no corresponding old node.
      // used for determining longest stable subsequence
      const newIndexToOldIndexMap = new Array(toBePatched)
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

      // 使用 for 循环遍历旧的子节点列表。
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i]
        // 如果已经更新的节点数量 patched 大于或等于需要更新的节点数量 
        // toBePatched，那么剩余的旧节点都会被移除。
        if (patched >= toBePatched) {
          // all new children have been patched so this can only be a removal
          unmount(prevChild, parentComponent, parentSuspense, true)
          continue
        }
        let newIndex
        // 通过key或节点类型查找每个旧节点在新子节点列表中的索引 newIndex
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key) // 4
        } else {
          // key-less node, try to locate a key-less node of the same type
          for (j = s2; j <= e2; j++) {
            if (
              newIndexToOldIndexMap[j - s2] === 0 &&
              isSameVNodeType(prevChild, c2[j] as VNode)
            ) {
              newIndex = j
              break
            }
          }
        }
        // 如果找不到对应的新节点，则调用 unmount 函数卸载旧节点。
        if (newIndex === undefined) {
          unmount(prevChild, parentComponent, parentSuspense, true)
        } 
        // 如果找到对应的新节点，
        // 则更新 newIndexToOldIndexMap，记录新旧节点之间的映射，
        // 并调用 patch 函数更新节点。
        else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1 // 
          if (newIndex >= maxNewIndexSoFar) {
            // 更新 maxNewIndexSoFar 为当前最大的新节点索引。
            maxNewIndexSoFar = newIndex
          } else {
            // 如果找到的新节点索引 newIndex 小于 maxNewIndexSoFar，
            // 则表明有节点发生了移动，设置 moved 为 true。
            moved = true
          }
          patch(
            prevChild,
            c2[newIndex] as VNode,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          )
          patched++
        }
      }

      // 5.3 move and mount
      // generate longest stable subsequence only when nodes have moved
      const increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : EMPTY_ARR
      j = increasingNewIndexSequence.length - 1
      // looping backwards so that we can use last patched node as anchor
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i
        const nextChild = c2[nextIndex] as VNode
        const anchor =
          nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
          if (newIndexToOldIndexMap[i] === 0) {
          // mount new
          // 如果 newIndexToOldIndexMap[i] 为 0，
          // 表示这个新节点没有对应的旧节点，调用 patch 函数挂载新的节点。
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          )
        } else if (moved) {
          // 如果节点发生了移动，
          // 并且当前节点不在最长递增子序列中，则调用 move 函数将节点移动到正确的位置。
          // move if:
          // There is no stable subsequence (e.g. a reverse)
          // OR current node is not among the stable sequence
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, MoveType.REORDER)
          } else {
            j--
          }
        }
      }
    }
  }
```


### 源码解析：


```javascript
比较规则：
- 从新旧的第一个开始；当遇到不一样的元素就跳出循环；
- 从新旧的最后开始遍历；当遇到不一样的就跳出循环；
old:[a,b,c],d,[e,f]
new:[a,b,c],o,p,[e,f]

- 只有新增元素
// 3. common sequence + mount
// (a b)
// (a b) c
// i = 2, e1 = 1, e2 = 2
// (a b)
// c (a b)
// i = 0, e1 = -1, e2 = 0

- 只有删除元素
// 4. common sequence + unmount
// (a b) c
// (a b)
// i = 2, e1 = 2, e2 = 1
// a (b c)
// (b c)
// i = 0, e1 = 0, e2 = -1

- 未知的顺序 unknown sequence
// [i ... e1 + 1]: a b [c d e] f g
// [i ... e2 + 1]: a b [e d c h] f g
// i = 2, e1 = 4, e2 = 5

- 5.1 生成新的vnode的key-index的map对象

keyToNewIndexMap: {
  key-e: 2,
  key-d: 3,
  key-c: 4,
  key-h: 5
}

patched = 0
moved = false
maxNewIndexSoFar = 0
let j;
toBePatched = e2 - s2 + 1 // 标记待patch的节点数
// 生成数组 [0,0,0,0] -> [e,d,c,h]

const newIndexToOldIndexMap = new Array(toBePatched) // // newVNode节点对应oldVNode节点的下标Index+1
for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

- 5.2 for(oldVnode) {}
// move unmount
// [i ... e1 + 1]: a b [c d e] f g
// [i ... e2 + 1]: a b [d c] f g

// 卸载元素
if (patched >= toBePatched) {
  // all new children have been patched so this can only be a removal
  unmount(prevChild, parentComponent, parentSuspense, true)
  continue
}

newIndexToOldIndexMap[newIndex - s2] = i + 1
// toBePatched = 2
// i = 2; s2 = 2 patched = 0; toBePatched = 2
// newIndex = 3
// maxNewIndexSoFar = 0
newIndexToOldIndexMap [0,3]

// maxNewIndexSoFar = 3
// i = 3, patched = 1
// newIndex = 2
// moved = true
newIndexToOldIndexMap [4,3];

// patched = 2; >= toBePatched
// unmount(e)

if (newIndex >= maxNewIndexSoFar) {
  maxNewIndexSoFar = newIndex
} else {
  判断当前对比节点在newVNode中的index小于之前比对过的节点最大index，
  证明需要移动元素;
  举例：a b [c d e] f g ｜ a b [d c] f g
  对比c节点时；c的newIndex = 3;maxNewIndexSoFar = 3
  对比d节点时；d的newIndex = 2;
  说明d需要移动到c前面；
}


- 5.3
// move mount
// [i ... e1 + 1]: a b [c d e o] f g
// [i ... e2 + 1]: a b [e d c h o p] f g
newIndexToOldIndexMap = [5, 4, 3, 0, 6, 0] 
// increasingNewIndexSequence = getSequence(newIndexToOldIndexMap) 返回最长递增子序列的下标
// 示例 
increasingNewIndexSequence = getSequence([5, 4, 3, 0, 6, 0]) // [2, 4]
通过最长递增子序列，只去移动不在最长子序列的对应下标的元素

// [5, 4, 3, 0, 6, 0] 
// 通过新节点对应旧节点的index+1可以判断：
// 0: 添加新节点，
// 6: 对应的节点下标是4,最长递增子序列 increasingNewIndexSequence[j] = 4 所以不需要移动;
// 0 添加新节点，
// 3: 对应的节点下标是2,最长递增子序列 increasingNewIndexSequence[j] = 2 所以不需要移动;
// 4: 不在下标最长递增子序列中；所以将oldVNode移动到anchor的前面；
// 5: 不在下标最长递增子序列中；所以将oldVNode移动到anchor的前面；

// 插入节点
insert: (child, parent, anchor) => {
  parent.insertBefore(child, anchor || null)
},
```


## patchUnkeyedChildren (没有key)


```javascript
const patchUnkeyedChildren = (
    c1: VNode[],
    c2: VNodeArrayChildren,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    namespace: ElementNamespace,
    slotScopeIds: string[] | null,
    optimized: boolean,
  ) => {
    c1 = c1 || EMPTY_ARR
    c2 = c2 || EMPTY_ARR
    const oldLength = c1.length
    const newLength = c2.length
    const commonLength = Math.min(oldLength, newLength)
    let i
    for (i = 0; i < commonLength; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]))
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
      )
    }
    if (oldLength > newLength) {
      // remove old
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength,
      )
    } else {
      // mount new
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength,
      )
    }
  }
```


### 源码解析


变量公共部分，即取新旧vnode的最小长度；


调用 `patch` 函数，递归地将旧节点 `c1[i]` 和新节点 `nextChild` 进行差异化更新。


如果new > old 直接mount;


如果new < old 直接unmount


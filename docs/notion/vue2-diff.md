
## 源码位置


// src/core/vdom/patch


## updateChildren更新子节点


```javascript
function updateChildren(
    parentElm,
    oldCh,
    newCh,
    insertedVnodeQueue,
    removeOnly
  ) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    if (__DEV__) {
      checkDuplicateKeys(newCh)
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(
          oldStartVnode,
          newStartVnode,
          insertedVnodeQueue,
          newCh,
          newStartIdx
        )
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(
          oldEndVnode,
          newEndVnode,
          insertedVnodeQueue,
          newCh,
          newEndIdx
        )
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(
          oldStartVnode,
          newEndVnode,
          insertedVnodeQueue,
          newCh,
          newEndIdx
        )
        canMove &&
          nodeOps.insertBefore(
            parentElm,
            oldStartVnode.elm,
            nodeOps.nextSibling(oldEndVnode.elm)
          )
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(
          oldEndVnode,
          newStartVnode,
          insertedVnodeQueue,
          newCh,
          newStartIdx
        )
        canMove &&
          nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (isUndef(oldKeyToIdx))
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 返回节点key对用的节点下标
        idxInOld = isDef(newStartVnode.key) // new Vnode存在key
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx) // sameNode查找对应的node节点下标
        // 新的vnode对应的oldVnode中的位置

        // 没找到就创建
        if (isUndef(idxInOld)) {
          // New element
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          )
        } else {
          // 找到
          vnodeToMove = oldCh[idxInOld]
          // 判断是否相同节点：
					// 找到idxInOld存在两种情况：
					// key相同「createKeyToOldIdx」；
					// 通过sameVnode判断的相同「findIdxInOld」
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(
              vnodeToMove,
              newStartVnode,
              insertedVnodeQueue,
              newCh,
              newStartIdx
            )
            oldCh[idxInOld] = undefined
            canMove &&
              nodeOps.insertBefore(
                parentElm,
                vnodeToMove.elm,
                oldStartVnode.elm
              )
          } else {
            // same key but different element. treat as new element
            createElm(
              newStartVnode,
              insertedVnodeQueue,
              parentElm,
              oldStartVnode.elm,
              false,
              newCh,
              newStartIdx
            )
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(
        parentElm,
        refElm,
        newCh,
        newStartIdx,
        newEndIdx,
        insertedVnodeQueue
      )
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
```


### 执行过程


**四种特殊情况的处理**：

- **头部节点相同** (`sameVnode(oldStartVnode, newStartVnode)`)：对比两者并更新，然后移动指针。
- **尾部节点相同** (`sameVnode(oldEndVnode, newEndVnode)`)：同样对比并更新，移动相应指针。
- **旧头部与新尾部相同**：这种情况意味着该节点可能右移，处理完后移动指针。
- **旧尾部与新头部相同**：这种情况意味着该节点可能左移，处理完后移动指针。

**以上都不满足时，寻找节点的对应关系**：

- 如果节点不满足上述任一条件，则会尝试通过 `key` 或遍历旧节点列表**(key不存在)**来查找新节点对应的旧节点位置。
- 如果找到对应节点，则更新并插入。如果未找到，则创建新元素。

**最后跳出while循环后**：

1. **判断条件 1**：`if (oldStartIdx > oldEndIdx)`
    - 这个条件成立的意思是：旧节点列表已经遍历完了，旧节点中所有需要处理的节点都已经处理完，但新节点列表还有剩余。
    - 处理方式：将剩余的新节点插入到 `parentElm` 中。
        - `refElm` 变量：用于确定新节点的插入位置。如果 `newCh[newEndIdx + 1]` 是 `undefined`，即没有参考节点，则 `refElm` 为 `null`，新节点会被追加到父节点的末尾。
        - 调用 `addVnodes`：这个函数负责将新节点插入到真实 DOM 中。
2. **判断条件 2**：`else if (newStartIdx > newEndIdx)`
    - 这个条件成立的意思是：新节点列表已经遍历完了，新节点中所有需要处理的节点都已经处理完，但旧节点列表还有剩余。
    - 处理方式：将剩余的旧节点从 DOM 中移除。
        - 调用 `removeVnodes`：这个函数负责将旧节点从真实 DOM 中删除。

### 疑问：


**其中找到key处理的逻辑和没找到isUndef(idxInOld)逻辑一样，为什么还有去生成一遍key的map对象**


答：通过key可以快速找到已有的vnode；然后再走一遍sameNode判断；如果相同，则会直接patchVnode和移动元素；sameNode比对再不一样的话就只能创建了


## patchVnode递归函数


```javascript
function patchVnode(
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly?: any
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    const elm = (vnode.elm = oldVnode.elm)

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
      } else {
        vnode.isAsyncPlaceholder = true
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (
      isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance
      return
    }

    let i
    const data = vnode.data
    if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
      i(oldVnode, vnode)
    }

    const oldCh = oldVnode.children
    const ch = vnode.children
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) {
        if (__DEV__) {
          checkDuplicateKeys(ch)
        }
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode)
    }
  }
```


`patchVnode` 函数的主要功能是对比旧的 VNode 和新的 VNode，并根据对比结果，进行最小化的 DOM 更新操作。这个过程包括节点的复用、子节点的递归处理、文本内容的更新等


## Patch过程


`patch` 函数是 Vue.js 中核心的 DOM 更新算法之一。它负责将虚拟 DOM 树（VNode tree）与实际的 DOM 树同步，从而实现高效的 UI 更新。在这个过程中，Vue.js 通过 diff 算法比较新旧节点的差异，并在最小化 DOM 操作的前提下，更新用户界面。


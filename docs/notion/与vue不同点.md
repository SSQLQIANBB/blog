> **一个 state 变量的值永远不会在一次渲染的内部发生变化，** 即使其事件处理函数的代码是异步的。在 **那次渲染的** `onClick` 内部，`number` 的值即使在调用 `setNumber(number + 5)` 之后也还是 `0`。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。

react提取为组件和不提取为组件区别

1. **直接写在页面中**：
    - 当你直接在页面中编写代码时，React 会一次性渲染整个页面。如果某个状态发生变化，React 会重新渲染相关的部分，但整体的结构和布局不会发生大的变化。
2. **提取为组件**：
    - 当你将代码提取为组件时，每个组件都有自己的生命周期方法。当父组件的状态发生变化时，React 会重新渲染所有受影响的子组件。
    - 如果子组件的渲染逻辑较为复杂或包含大量的 DOM 操作，可能会导致短暂的视觉闪烁或重绘。

react渲染问题：


```javascript
/*************情景一************/

const ComponentA = () => {
	const [state, setState] = useState(0);
	
	console.log('--render-A--')
	
	const ComponentB = ({state, setState}) => {
	console.log('--render-B--')
		return (
		<>
			<button onClick={() => setState(v => v+1)}></button>
		</>
		)
	}

	return (
	<>
		<ComponentB state={state} setState={setState} />
	</>
	)
}
/*************情景二************/

const ComponentB = ({state, setState}) => {
	console.log('--render-B--')
		return (
		<>
			<button onClick={() => setState(v => v+1)}></button>
		</>
		)
	}

const ComponentA = () => {
	const [state, setState] = useState(0);
	
	console.log('--render-A--')

	return (
	<>
		<ComponentB state={state} setState={setState} />
	</>
	)
}

// 定义在组件内部的组件即使使用memo，当组件A中变量修改时，还是会重新创建新的组件B
```


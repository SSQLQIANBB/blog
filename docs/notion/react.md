> React 组件必须以大写字母开头，而 HTML 标签则必须是小写字母  
> JSX 会让你把标签放到 JavaScript 中。而大括号会让你 “回到” JavaScript 中

### 条件渲染


```javascript
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);

// 逻辑&&语法
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```


### 渲染列表


```javascript
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```


### 组件数据共享


```javascript
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick}) {
	return (
		<button onClick={onClick}>
			点击{count}次
		</button>
	)
}
```


### props传递给子组件


```javascript
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

<details>
<summary>Avatar组件</summary>

```javascript
function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```


</details>


### 条件渲染

- `在 React，你可以使用 JavaScript 来控制分支逻辑。`
- `你可以使用 if 语句来选择性地返回 JSX 表达式。`
- `你可以选择性地将一些 JSX 赋值给变量，然后用大括号将其嵌入到其他 JSX 中。`
- `在 JSX 中，{cond ? <A /> : <B />} 表示` _`“当 cond 为真值时, 渲染 <A />，否则 <B />”`_`。`
- `在 JSX 中，{cond && <A />} 表示` _`“当 cond 为真值时, 渲染 <A />，否则不进行渲染”`_`。`
- `快捷的表达式很常见，但如果你更倾向于使用 if，你也可以不使用它们，`

```javascript
function Item({ name, isPacked }) {
  return (
	  <li className="item">
	    {isPacked ? name + ' ✔' : name}
	  </li>
	);
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```


## 交互

- **交互一**

```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```


以下是这个按钮的点击事件处理函数通知 React 要做的事情：

1. `setNumber(number + 1)`：`number` 是 `0` 所以 `setNumber(0 + 1)`。
    - React 准备在下一次渲染时将 `number` 更改为 `1`。
2. `setNumber(number + 1)`：`number` 是`0` 所以 `setNumber(0 + 1)`。
    - React 准备在下一次渲染时将 `number` 更改为 `1`。
3. `setNumber(number + 1)`：`number` 是`0` 所以 `setNumber(0 + 1)`。
    - React 准备在下一次渲染时将 `number` 更改为 `1`。
- **交互二**

```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

> **一个 state 变量的值永远不会在一次渲染的内部发生变化，** 即使其事件处理函数的代码是异步的。在 **那次渲染的** `onClick` 内部，`number` 的值即使在调用 `setNumber(number + 5)` 之后也还是 `0`。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。
- **交互三**
1. 你按下“发送”按钮，向 Alice 发送“你好”。
2. 在五秒延迟结束之前，将“To”字段的值更改为“Bob”。

```javascript
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```


`alert(’slice’)→alert(’bob’)`

> **React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部。** 你无需担心代码运行时 state 是否发生了变化。
>
> 但是，万一你想在重新渲染之前读取最新的 state 怎么办？你应该使用 [状态更新函数](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates)
>
>

### 状态更新函数（批处理）

> 设置组件 state 会把一次重新渲染加入队列。但有时你可能会希望在下次渲染加入队列之前对 state 的值执行多次操作。为此，了解 React 如何批量更新 state 会很有帮助。
- **示例1**

```javascript
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```


下面是 React 在执行事件处理函数时处理这几行代码的过程：

1. `setNumber(n => n + 1)`：`n => n + 1` 是一个函数。React 将它加入队列。
2. `setNumber(n => n + 1)`：`n => n + 1` 是一个函数。React 将它加入队列。
3. `setNumber(n => n + 1)`：`n => n + 1` 是一个函数。React 将它加入队列。

**React 会获取你上一个更新函数的返回值，并将其作为** **`n`** **传递给下一个更新函数**


| 更新队列         | `n` | 返回值         |
| ------------ | --- | ----------- |
| `n => n + 1` | `0` | `0 + 1 = 1` |
| `n => n + 1` | `1` | `1 + 1 = 2` |
| `n => n + 1` | `2` | `2 + 1 = 3` |

- **示例2**

```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>增加数字</button>
    </>
  )
}
```


这是事件处理函数告诉 React 要做的事情：

1. `setNumber(number + 5)`：`number` 为 `0`，所以 `setNumber(0 + 5)`。React 将 _“替换为_ _`5`__”_ 添加到其队列中。
2. `setNumber(n => n + 1)`：`n => n + 1` 是一个更新函数。 React 将 **该函数** 添加到其队列中。

在下一次渲染期间，React 会遍历 state 队列：


| 更新队列         | `n`      | 返回值         |
| ------------ | -------- | ----------- |
| “替换为 `5`”    | `0`（未使用） | `5`         |
| `n => n + 1` | `5`      | `5 + 1 = 6` |


**反过来呢？**


```javascript
setNumber(n => n + 1);
setNumber(number + 5); // 5
```


| 更新队列         | `n` | 返回值 |
| ------------ | --- | --- |
| `n => n + 1` | 1   | 1   |
| “替换为 `5`”    | 0   | 5   |


**摘要**

- 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
- React 会在事件处理函数执行完成之后处理 state 更新。这被称为批处理。
- 要在一个事件中多次更新某些 state，你可以使用 `setNumber(n => n + 1)` 更新函数。

### 更新state中的对象


使用`Immer`:

1. `npm install use-immer` 添加依赖
2. Then replace `import { useState } from 'react'` with `import { useImmer } from 'use-immer'`

```javascript
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```


### 更新state中的数组


下面是常见数组操作的参考表。当你操作 React state 中的数组时，你需要避免使用左列的方法，而首选右列的方法：


|      | 避免使用 (会改变原始数组)             | 推荐使用 (会返回一个新数组）                                                                                             |
| ---- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 添加元素 | `push`，`unshift`           | `concat`，`[...arr]` 展开语法（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#adding-to-an-array)） |
| 删除元素 | `pop`，`shift`，`splice`     | `filter`，`slice`（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#removing-from-an-array)）     |
| 替换元素 | `splice`，`arr[i] = ...` 赋值 | `map`（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array)）           |
| 排序   | `reverse`，`sort`           | 先将数组复制一份（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#making-other-changes-to-an-array)）   |


或者，你可以[使用 Immer](https://zh-hans.react.dev/learn/updating-arrays-in-state#write-concise-update-logic-with-immer) ，这样你便可以使用表格中的所有方法了。

- **数组中添加元素**

```javascript
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>添加</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

- **数组中删除元素**

可以通过 `filter` 方法实现


```javascript
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

- **转换数组 & 替换数组中的元素**

如果你想改变数组中的某些或全部元素，你可以用 `map()` 创建一个**新**数组


```javascript
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // 不作改变
        return shape;
      } else {
        // 返回一个新的圆形，位置在下方 50px 处
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // 使用新的数组进行重渲染
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        所有圆形向下移动！
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```

- **向数组中插入元素**

可以将数组展开运算符 `...` 和 `slice()` 方法一起使用


```javascript
const [name, setName] = useState('');
const [artists, setArtists] = useState(
  initialArtists
);

function handleClick() {
  const insertAt = 1; // 可能是任何索引
  const nextArtists = [
    // 插入点之前的元素：
    ...artists.slice(0, insertAt),
    // 新的元素：
    { id: nextId++, name: name },
    // 插入点之后的元素：
    ...artists.slice(insertAt)
  ];
  setArtists(nextArtists);
  setName('');
}
```

- **可以先拷贝这个数组，再改变这个拷贝后的值**
- **使用Immer更新数组**

```javascript
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

> 当使用 Immer 时，**类似** **`artwork.seen = nextSeen`** **这种会产生 mutation 的语法不会再有任何问题了**
>
> `updateMyTodos(draft => {`
>
>
> `const artwork = draft.find(a => a.id === artworkId);`
>
>
> `artwork.seen = nextSeen;`
>
>
> `});`
>
>

## 状态管理

<details>
<summary>_强制_ 重置其状态</summary>

通过向组件传递一个唯一 `key`（如 `<Chat key={email} />` 来 _强制_ 重置其状态


```javascript
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.email} contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```


</details>

<details>
<summary>**提取状态逻辑到 reducer 中**</summary>

</details>


### useReducer


### useContext


Section.js


```javascript
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```


LevelContext.js文件


```javascript
import { createContext } from 'react';

export const LevelContext = createContext(1);
```


Heading.js


```javascript
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}
```


App.js


```javascript
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>主标题</Heading>
      <Section level={2}>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section level={3}>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section level={4}>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```


### useRef

> 当你希望组件“记住”某些信息，但又不想让这些信息 [触发新的渲染](https://zh-hans.react.dev/learn/render-and-commit) 时，你可以使用 **ref** 。

### ref操作DOM

- useRef
- 通过ref回调管理列表

    ```javascript
    <li
      key={cat.id}
      ref={node => {
        const map = getMap();
        if (node) {
          // 添加到 Map
          map.set(cat.id, node);
        } else {
          // 从 Map 删除
          map.delete(cat.id);
        }
      }}
    >
    ```

- forwardRef调用子组件ref

    ```javascript
    import { forwardRef, useRef } from 'react';
    
    const MyInput = forwardRef((props, ref) => {
    	return <input {...props} ref={ref}>
    })
    
    export default function Form() {
      const inputRef = useRef(null);
    
      function handleClick() {
        inputRef.current.focus();
      }
    
      return (
        <>
          <MyInput ref={inputRef} />
          <button onClick={handleClick}>
            聚焦输入框
          </button>
        </>
      );
    }
    ```

- useImperativeHandle 限制ref暴露部分api (vue—defineExpose)

    ```javascript
    import {
      forwardRef, 
      useRef, 
      useImperativeHandle
    } from 'react';
    
    const MyINput = forwardRef((props, ref) => {
    	const realInputRef = useRef(null);
    	useimperativeHandle(ref, () => ({
    		focus() {
    			realInputRef.current.focus();
    		}
    	}))
    	return <input {...props} ref={realInputRef} />;
    })
    
    export default function Form() {
      const inputRef = useRef(null);
    
      function handleClick() {
        inputRef.current.focus();
      }
    
      return (
        <>
          <MyInput ref={inputRef} />
          <button onClick={handleClick}>
            聚焦输入框
          </button>
        </>
      );
    }
    ```

- flushSync 同步更新state (vue—nextTick)

    ```javascript
    import { useState, useRef } from 'react';
    import { flushSync } from 'react-dom';
    
    export default function TodoList() {
      const listRef = useRef(null);
      const [text, setText] = useState('');
      const [todos, setTodos] = useState(
        initialTodos
      );
    
      function handleAdd() {
        const newTodo = { id: nextId++, text: text };
        flushSync(() => {
          setText('');
          setTodos([ ...todos, newTodo]);      
        });
        listRef.current.lastChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    
      return (
        <>
          <button onClick={handleAdd}>
            添加
          </button>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <ul ref={listRef}>
            {todos.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        </>
      );
    }
    
    let nextId = 0;
    let initialTodos = [];
    for (let i = 0; i < 20; i++) {
      initialTodos.push({
        id: nextId++,
        text: '待办 #' + (i + 1)
      });
    }
    ```


### useEffect(vue — watch)

> **Effect 允许你指定由渲染本身，而不是特定事件引起的副作用;**
> `u`**`seEffect`** **会把这段代码放到屏幕更新渲染之后执行**

```javascript
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

- **指定 Effect 依赖**
> React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较依赖项的值

```javascript
useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]);
```


# **陷阱**


没有依赖数组作为第二个参数，与依赖数组位空数组 `[]` 的行为是不一致的：


```javascript
useEffect(() => {  // 这里的代码会在每次渲染后执行});
useEffect(() => {  /
/ 这里的代码只会在组件挂载后执行}, []
);
useEffect(() => {  //这里的代码只会在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行}, [a, b]);
```

- **按需添加清理（cleanup）函数**
> 在开发环境中，React 会在初始挂载组件后，立即再挂载一次。

App.js


```javascript
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>欢迎来到聊天室！</h1>;
}
```


chat.js


```javascript
export function createConnection() {
  // 真实的实现会将其连接到服务器，此处代码只是示例
  return {
    connect() {
      console.log('✅ 连接中……');
    },
    disconnect() {
      console.log('❌ 连接断开。');
    }
  };
}
```


# **摘要**

- 与事件不同，Effect 是由渲染本身，而非特定交互引起的。
- Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步。
- 默认情况下，Effect 在每次渲染（包括初始渲染）后运行。
- 如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect。
- 不能随意选择依赖项，它们是由 Effect 内部的代码决定的。
- 空的依赖数组（`[]`）对应于组件“挂载”，即添加到屏幕上。
- 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试。
- 如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数。
- React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数。

**从副作用中提取非反应性逻辑**

> experimental_useEffectEvent  
> 抽离非反应性逻辑  
> const onConnected = useEffectEvent(() => {  
>     showNotification('Connected!', theme);  
> });

```javascript
// App.js
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```


```javascript
// chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
```

- 使用副作用事件读取最新的属性和状态

```javascript
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}

// 你会为 url 的每次更改调用 logVisit，并始终读取最新的 numberOfItems。
// 但是，如果 numberOfItems 自行更改，则不会导致任何代码重新运行。
```


副作用事件的使用方式非常有限：

- **只能从副作用内部调用它们。**
- **永远不要将它们传递给其他组件或钩子。**

```javascript
function Timer() {
  const [count, setCount] = useState(0);
  useTimer(() => {
    setCount(count + 1);
  }, 1000);
  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  const onTick = useEffectEvent(() => {
    callback();
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick(); // ✅ Good: Only called locally inside an Effect
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]); // No need to specify "onTick" (an Effect Event) as a dependency
}
```


### 错误实例


```javascript
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // Temporarily disable the linter to demonstrate the problem
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}
```

> 分析：当message改变时，由于每次更新 `message` 时，你的组件都会重新渲染。 当你的组件重新渲染时，其中的代码会从头开始重新运行。
>
> 每次重新渲染 `ChatRoom` 组件时，都会从头开始创建一个新的 `options` 对象。 React 发现 `options` 对象与上次渲染期间创建的 `options` 对象不同。 这就是为什么它会重新同步你的副作用（取决于 `options`），并且会在你键入时重新连接聊天。
>
>

```javascript
// During the first render

const options1 = { serverUrl: 'https://localhost:1234', roomId: 'music' };

// During the next render

const options2 = { serverUrl: 'https://localhost:1234', roomId: 'music' };

// These are two different objects!

console.log(
Object.is
(options1, options2)); // false
```


正确做法提取到副作用中


```javascript
function ChatRoom({ roomId, serverUrl }) {
  const [message, setMessage] = useState('');

  // Temporarily disable the linter to demonstrate the problem
  // eslint-disable-next-line react-hooks/exhaustive-deps
  

  useEffect(() => {
		const options = {
	    serverUrl: serverUrl,
	    roomId: roomId
	  };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options, serverUrl]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}
```


如果是一个对象或者一个函数时,通过解构使用变量


```javascript
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  
const { roomId, serverUrl } = options;

  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

function ChatRoom({ getOptions: Function }) {
  const [message, setMessage] = useState('');

  
const { roomId, serverUrl } = 
getOptions()
;

  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
```


# 原理解析


## 关键词概念

1. **Fiber 节点**是最小工作单元的载体（对应组件）；
2. **任务**是一次完整更新（如`setState`触发），包含多个 Fiber 节点的处理；
3. **调度阶段**负责逐个处理 Fiber 节点（计算差异），因操作内存、可拆分，所以**可暂停**；
4. **提交阶段**负责将差异应用到 DOM，因需保证 UI 一致性，所以**不可暂停**。

## fiber


React Fiber 是 React 16 引入的**新协调引擎（Reconciliation Engine）**，其核心目标是解决传统 React 渲染过程中“长时间同步任务阻塞主线程”的问题，实现渲染工作的**可中断、可恢复、优先级可控**，从而提升大型应用的响应速度和用户体验。


### 一、Fiber 出现的背景：传统 React 渲染的痛点


在 React 15 及之前，协调（Reconciliation，即虚拟 DOM Diff 过程）是**同步且不可中断的**：


当组件树规模较大时，React 会从根节点开始，递归遍历整个虚拟 DOM 树，计算差异并更新真实 DOM。这个过程一旦开始，就会占用主线程直到完成（可能持续数百毫秒）。


而浏览器的主线程不仅负责渲染，还需要处理用户输入（如点击、输入框打字）、动画帧等关键任务。如果渲染任务长时间占据主线程，会导致：

- 用户操作无响应（如点击按钮没反应）；
- 动画卡顿（掉帧）；
- 整体体验流畅度下降。

### 二、Fiber 的核心设计：把渲染拆分成“可中断的工作单元”


Fiber 的本质是**重新设计了 React 的工作单元和调度机制**：

- 将渲染工作（Diff、计算更新）拆分成一个个**小工作单元（Fiber 节点）**；
- 每个工作单元处理完毕后，允许暂停、恢复甚至放弃（中断）；
- 优先处理高优先级任务（如用户输入），再回头处理低优先级任务（如列表渲染）。

### 1. Fiber 的数据结构：链表代替栈，支持中断与恢复


传统 React 用“递归栈”遍历组件树（递归无法中断），而 Fiber 用**链表结构**表示工作单元，每个 Fiber 节点对应一个组件，包含以下关键信息：


```javascript
const fiber = {
  type: 'div', // 组件类型（如 div、类组件、函数组件）
  props: {}, // 组件接收的 props
  stateNode: null, // 对应的真实 DOM 节点（若为原生组件）
  // 链表指针（核心！用于遍历）
  child: null, // 第一个子 Fiber 节点
  sibling: null, // 下一个兄弟 Fiber 节点
  return: null, // 父 Fiber 节点（完成后返回的节点）
  // 工作状态相关
  pendingProps: null, // 待处理的 props
  memoizedProps: null, // 已处理的 props（用于 Diff）
  effectTag: null, // 标记需要执行的操作（如更新、删除、新增）
  nextEffect: null, // 下一个有副作用的 Fiber 节点
};
```


**为什么用链表？**


链表通过 `child`（子）、`sibling`（兄弟）、`return`（父）指针遍历，而非递归栈。这种结构允许遍历过程在任意节点暂停，之后通过指针继续从断点处恢复，实现“可中断”。


### 2. 工作流程：两阶段分离（可中断 + 不可中断）


Fiber 将渲染过程拆分为两个阶段，核心是**让耗时的“计算阶段”可中断，而“执行阶段”一次性完成**：


### 阶段 1：调度阶段（Reconciliation / Schedule）

- **作用**：遍历 Fiber 树，计算新旧节点差异，标记需要更新的节点（如 `effectTag: 'UPDATE'`）。
- **特点**：**可中断、可恢复、优先级可控**。
- 过程：
    1. 从根 Fiber 开始，按“深度优先”顺序处理每个 Fiber 节点（通过链表指针遍历）；
    2. 处理一个节点后，检查是否有更高优先级任务（如用户输入），若有则暂停当前工作，保存进度；
    3. 当主线程空闲时，从断点恢复处理，直到所有节点处理完毕。

### 阶段 2：提交阶段（Commit）

- **作用**：根据调度阶段标记的“副作用”（`effectTag`），执行真实 DOM 操作（如新增、删除、更新节点）。
- **特点**：**不可中断**（一旦开始必须完成），因为 DOM 操作需要原子性，避免页面出现不完整状态。
- 过程：
    1. 遍历调度阶段收集的“副作用链表”（`nextEffect`）；
    2. 依次执行每个节点的 DOM 操作（如 `appendChild`、`removeChild`、更新属性等）；
    3. 执行组件的生命周期方法（如 `componentDidMount`、`useEffect` 回调）。

### 3. 优先级调度：谁先执行，我说了算


Fiber 引入**优先级机制**，让不同类型的更新任务按紧急程度排序，高优先级任务可以打断低优先级任务：


| 任务类型     | 优先级（从高到低）    | 说明                   |
| -------- | ------------ | -------------------- |
| 同步任务     | Immediate    | 同步执行（如 `flushSync`）  |
| 用户输入（点击） | UserBlocking | 250ms 内需要响应，否则用户感知卡顿 |
| 动画       | Animation    | 下一帧前必须执行，否则动画掉帧      |
| 低优先级任务   | Low          | 可延迟（如网络请求后更新列表）      |
| 空闲时执行    | Idle         | 浏览器空闲时才执行（最低优先级）     |


**调度原理**：


React 用类似 `requestIdleCallback` 的机制（内部实现了 `scheduler` 包），在浏览器每帧的空闲时间（约 16ms 帧周期内，扣除布局、绘制时间后的剩余时间）处理低优先级任务。若超过时间限制，就暂停并让出主线程。


### 三、Fiber 带来的核心优势

1. **解决主线程阻塞**：将长任务拆分为小单元，避免长时间占用主线程，保证用户输入、动画等关键操作的响应性。
2. **支持并发模式**：Fiber 是 React 并发模式（Concurrent Mode）的基础，允许同一时间存在多个“渲染版本”（如用户输入时暂停列表渲染，输入完成后恢复）。
3. **优先级控制**：确保紧急任务（如点击）优先执行，提升用户体验。

### 四、总结


Fiber 不是某种新的“虚拟 DOM”，而是 React 内部的**工作单元调度机制**：

- 通过“链表结构”实现工作的可中断与恢复；
- 通过“两阶段分离”让计算阶段可暂停，提交阶段原子化；
- 通过“优先级调度”保证高紧急度任务优先执行。

这些设计从根本上解决了传统 React 同步渲染的性能瓶颈，让大型 React 应用在复杂交互下仍能保持流畅。


## react如何生成fiber及示例


React 将任务拆分为 Fiber 节点的过程，本质是**将“组件树的更新”拆解为“逐个组件（或 DOM 元素）的更新单元”**，每个单元对应一个 Fiber 节点的处理。这个过程由 React 的“协调阶段（Reconciliation）”主导，核心是通过 `performUnitOfWork` 函数逐个处理 Fiber 节点，实现“可中断的工作拆分”。


### 一、任务拆分的核心逻辑：从“整树更新”到“逐个 Fiber 节点处理”


当用户触发更新（如点击按钮计算列表总和）时，React 会经历以下步骤将任务拆分：

1. **触发更新**：通过 `setState` 或 `useState` 触发状态变化（如列表数据或总和状态更新）；
2. **调度任务**：React 调度一个“更新任务”，标记需要重新渲染的根节点；
3. **拆分任务**：从根 Fiber 开始，通过 `performUnitOfWork` 函数**逐个处理 Fiber 节点**，每个节点的处理作为一个“工作单元”；
4. **中断与恢复**：每个工作单元处理后，检查是否需要暂停（如超时或高优先级任务），若需要则保存进度，下次恢复时从断点继续。

### 二、源码层面的实现：关键函数与流程


以下结合 React 源码（简化核心逻辑），以“点击按钮计算列表某列总和”为例，详细讲解拆分过程。


### 场景说明


假设有一个列表组件，点击按钮后计算所有项的 `value` 列总和，并更新显示：


```javascript
function ListItem({ item }) {
  return <li>{item.name}: {item.value}</li>;
}

function SumList() {
  const [items, setItems] = useState([{ name: 'A', value: 10 }, { name: 'B', value: 20 }]);
  const [sum, setSum] = useState(0);

  const calculateSum = () => {
    // 点击按钮触发：计算总和并更新状态
    const total = items.reduce((acc, item) => acc + item.value, 0);
    setSum(total); // 触发更新
  };

  return (
    <div>
      <button onClick={calculateSum}>计算总和</button>
      <p>总和: {sum}</p>
      <ul>
        {items.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
}
```


### 1. 触发更新：`setSum` 引发调度


点击按钮后，`setSum(total)` 会触发 React 的更新机制，最终调用 `scheduleUpdateOnFiber` 函数，将更新任务加入调度队列：


```javascript
// 简化版：触发更新的入口
function scheduleUpdateOnFiber(fiber) {
  // 1. 标记 fiber 为“需要更新”
  markUpdateLaneFromFiberToRoot(fiber);
  // 2. 调度任务（进入协调阶段）
  ensureRootIsScheduled(root);
}
```


这里的 `fiber` 是 `SumList` 组件对应的 Fiber 节点（因 `setSum` 在该组件内调用）。


### 2. 启动协调：`performUnitOfWork` 逐个处理 Fiber 节点


调度器触发后，React 进入协调阶段，通过 `workLoop` 循环调用 `performUnitOfWork` 处理每个 Fiber 节点：


```javascript
// 工作循环：逐个处理 Fiber 节点（任务拆分的核心）
function workLoop(shouldYield) {
  // workInProgress 是当前正在处理的 Fiber 节点（初始为根 Fiber）
  while (workInProgress !== null && !shouldYield()) {
    // 处理当前 Fiber 节点，并返回下一个要处理的节点
    workInProgress = performUnitOfWork(workInProgress);
  }
}

// 处理单个 Fiber 节点（一个工作单元）
function performUnitOfWork(fiber) {
  // 1. 处理当前 Fiber 节点（计算新状态、生成子节点等）
  const next = beginWork(fiber);

  // 2. 若当前节点没有子节点，进入“完成”阶段
  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    // 3. 有子节点，下一个工作单元是子节点（深度优先遍历）
    workInProgress = next;
  }

  // 返回下一个要处理的 Fiber 节点（可能是子节点、兄弟节点或父节点）
  return workInProgress;
}
```


### 3. 处理单个 Fiber 节点：`beginWork` 函数（核心拆分逻辑）


`beginWork` 函数是处理单个 Fiber 节点的核心，负责：

- 计算节点的新状态（如 `SumList` 组件的 `sum` 状态更新）；
- 生成新的子 Fiber 节点（如重新渲染 `button`、`p`、`ul`、`ListItem` 等）；
- 标记节点是否需要更新（`effectTag`）。

以 `SumList` 组件的 Fiber 节点处理为例：


```javascript
function beginWork(current, workInProgress) {
  const type = workInProgress.type;

  switch (type) {
    // 处理函数组件（如 SumList）
    case FunctionComponent: {
      // 1. 获取最新 props 和状态（sum 已更新为 30）
      const props = workInProgress.pendingProps;
      const state = workInProgress.memoizedState; // 包含更新后的 sum: 30

      // 2. 执行组件函数，获取返回的 JSX（虚拟 DOM）
      const children = renderWithHooks(current, workInProgress, props);
      // children 结构：<div>...</div>（包含按钮、p、ul 等）

      // 3. 将 JSX 转换为子 Fiber 节点（任务拆分的关键：拆分为子节点单元）
      reconcileChildren(current, workInProgress, children);

      // 4. 返回第一个子 Fiber 节点（下一个工作单元）
      return workInProgress.child;
    }

    // 处理原生 DOM 元素（如 div、button、ul）
    case HostComponent: {
      // 1. 对比新旧 props（如 button 的 onClick 是否变化）
      const props = workInProgress.pendingProps;
      if (current && !shallowEqual(oldProps, props)) {
        workInProgress.effectTag = Update; // 标记为需要更新
      }

      // 2. 生成子 Fiber 节点（如 div 的子节点是 button、p 等）
      reconcileChildren(current, workInProgress, props.children);

      // 3. 返回第一个子 Fiber 节点
      return workInProgress.child;
    }

    // 其他类型（如文本节点、列表项等）...
  }
}
```


### 4. 子节点拆分：`reconcileChildren` 生成子 Fiber 节点


`reconcileChildren` 函数会将组件返回的 JSX（虚拟 DOM）转换为子 Fiber 节点，实现“父任务拆分为子任务”。例如，`SumList` 组件返回的 `<div>...</div>` 会被拆分为：

- `div` 对应的 Fiber 节点；
- `div` 的子节点：`button`、`p`、`ul` 对应的 Fiber 节点；
- `ul` 的子节点：每个 `ListItem` 组件对应的 Fiber 节点；
- 每个 `ListItem` 的子节点：`li` 及文本节点对应的 Fiber 节点。

```javascript
// 简化版：将 JSX 转换为子 Fiber 节点
function reconcileChildren(current, workInProgress, children) {
  if (typeof children === 'object' && children !== null) {
    // 遍历 JSX 子节点，逐个创建 Fiber 节点
    let child = children;
    let prevFiber = null;
    while (child) {
      // 创建子 Fiber 节点（类型、props 等）
      const newFiber = createFiberFromElement(child);
      // 设置链表指针（父节点、兄弟节点）
      newFiber.return = workInProgress;
      if (prevFiber) {
        prevFiber.sibling = newFiber; // 兄弟节点指针
      } else {
        workInProgress.child = newFiber; // 第一个子节点指针
      }
      prevFiber = newFiber;
      child = nextSibling(child); // 下一个 JSX 子节点
    }
  }
}
```


### 5. 中断与恢复：`shouldYield` 控制工作单元拆分粒度


每个 Fiber 节点处理完毕后，`workLoop` 会通过 `shouldYield` 函数判断是否需要暂停：


```javascript
// 判断是否需要暂停当前任务（让出主线程）
function shouldYield() {
  // 检查是否超时（超过当前帧剩余时间）或有高优先级任务
  return getCurrentTime() >= frameDeadline || hasHigherPriorityWork();
}
```

- 若 `shouldYield` 返回 `true`，`workLoop` 退出循环，任务暂停，`workInProgress` 保存当前处理到的 Fiber 节点；
- 下次主线程空闲时，`workLoop` 从 `workInProgress` 继续处理，实现“从断点恢复”。

### 三、“计算列表总和”场景的任务拆分完整流程

1. **触发更新**：点击按钮调用 `calculateSum`，`setSum(30)` 触发更新，`SumList` 组件的 Fiber 节点被标记为“需要更新”。
2. **根节点开始**：`workLoop` 从根 Fiber 节点开始，调用 `performUnitOfWork` 处理根节点，最终进入 `SumList` 组件的 Fiber 节点处理。
3. **处理** **`SumList`** **组件**：
    - `beginWork` 执行 `SumList` 函数，获取更新后的 `sum: 30`，生成包含 `button`、`p`、`ul` 的 JSX。
    - `reconcileChildren` 将 JSX 拆分为 `div`、`button`、`p`、`ul` 对应的子 Fiber 节点。
    - 返回第一个子节点（`div` 的 Fiber 节点）作为下一个工作单元。
4. **处理** **`div`** **节点**：
    - 对比新旧 props，生成 `button`、`p`、`ul` 的子 Fiber 节点，返回 `button` 节点作为下一个单元。
5. **处理** **`button`** **节点**：
    - 检查 `onClick` 未变化，无更新，返回 `p` 节点（兄弟节点）作为下一个单元。
6. **处理** **`p`** **节点**：
    - 内容从“总和: 0”变为“总和: 30”，标记 `effectTag: Update`，返回 `ul` 节点（兄弟节点）。
7. **处理** **`ul`** **节点**：
    - 生成 `ListItem` 组件的子 Fiber 节点，返回第一个 `ListItem` 节点。
8. **处理** **`ListItem`** **组件**：
    - 执行组件函数，生成 `li` 节点，返回 `li` 作为下一个单元。
9. **依次处理所有节点**：直到所有 Fiber 节点处理完毕，进入提交阶段（更新 DOM）。

### 四、核心结论


React 将任务拆分为 Fiber 节点的本质是：

- 以“组件/ DOM 元素”为单位，通过 `performUnitOfWork` 逐个处理 Fiber 节点；
- 每个节点的处理（`beginWork`）包含“计算状态、生成子节点”，作为一个独立的工作单元；
- 通过 `workLoop` 循环和 `shouldYield` 控制，实现“处理一个单元→检查是否暂停→继续下一个单元”的拆分逻辑。

这种设计让原本可能耗时较长的“整树更新”任务，被拆分为多个毫秒级的小单元，从而支持中断与恢复，避免阻塞主线程。


## React 更新流程：


**触发更新 → 构建 workInProgress Fiber 树（边构建边 diff） → 生成 effect list → commit 执行真实 DOM 更新**


## React是单个dom更新还是批量更新dom的呢？


### **一、React 的 DOM 更新分 “两步”**


React 操作 DOM 并非 “执行到 Fiber 就立即更 DOM”，而是严格分为 **“协调（Reconciliation）”** 和 **“提交（Commit）”** 两个阶段，这是理解 “批量更新” 的基础：


| **阶段**               | **核心工作**                                                                               | **是否操作 DOM** | **能否被中断（暂停 / 恢复）**    |
| -------------------- | -------------------------------------------------------------------------------------- | ------------ | --------------------- |
| 协调阶段（Reconciliation） | 1. 遍历 Fiber 树，对比新旧 Fiber 节点（Diff 算法）2. 标记需要更新的 Fiber（打 “副作用标记”，如 `Update`/`Placement`） | 否            | 是（依赖 Scheduler 调度）    |
| 提交阶段（Commit）         | 1. 遍历带有 “副作用标记” 的 Fiber 节点2. 一次性执行所有 DOM 操作（更新 / 新增 / 删除）3. 执行 `useEffect` 等副作用        | 是            | 否（必须一次性完成，避免 DOM 不一致） |


### **二、核心结论：React 是 “按标记批量更新 DOM”，而非 “单个 Fiber 即时更新”**


React 不会在 “协调阶段” 遍历到一个 “需要更新的 Fiber” 就立即改 DOM（否则会频繁触发浏览器重排重绘，性能极差），而是先在协调阶段给所有需要更新的 Fiber 打上 “标记”，等 **所有协调工作完成后，在 “提交阶段” 一次性批量处理这些标记对应的 DOM 操作**。


用户操作（如点击按钮）→ 修改 state → 进入【协调阶段】
│
├─ 1. 创建 Root Fiber → 遍历 Fiber 树
├─ 2. 对比新旧 Fiber → 给需要更新的 Fiber 打标记（如 Update）
├─ 3. 协调阶段结束（无 DOM 操作）
│
↓ 进入【提交阶段】
├─ 1. 遍历带标记的 Fiber 节点
├─ 2. 一次性执行所有标记对应的 DOM 操作
└─ 3. 提交阶段结束（DOM 更新完成）


### 整体流程


```plain text
用户点击按钮（触发 setTotal）
        ↓
Scheduler 调度：将更新任务放入队列，等待浏览器空闲
        ↓
【协调阶段（可中断）】
        ↓
1. 从根 Fiber 开始，遍历生成新 Fiber 树（包括列表、总和组件）
        ↓
2. Diff 对比新旧 Fiber：标记“总和组件 Fiber”为 Update，列表项 Fiber 可复用
        ↓
3. 若浏览器有高优先级任务（如输入）→ 暂停，保存遍历位置；空闲后恢复
        ↓
协调阶段完成：收集所有“待更新 Fiber 节点”
        ↓
【提交阶段（不可中断）】
        ↓
1. 遍历“待更新 Fiber 列表”（仅总和组件 Fiber）
        ↓
2. 一次性执行 DOM 操作：修改总和组件的 innerText
        ↓
3. 执行副作用（如 useEffect）
        ↓
DOM 更新完成，页面显示新总和
```


### 协调阶段


```plain text
开始协调：从根 Fiber → 列表组件 Fiber → 列表项 Fiber 1...
        ↓
正在处理“总和组件 Fiber”的 Diff → 浏览器触发用户输入（高优先级任务）
        ↓
React 暂停协调：保存当前位置（总和组件 Fiber），释放 JS 线程
        ↓
浏览器处理用户输入 → 输入完成，浏览器空闲
        ↓
React 恢复协调：从“总和组件 Fiber”继续，完成 Diff 并标记 Update
        ↓
继续遍历剩余 Fiber（如列表项 Fiber n）→ 协调阶段结束
```


### 提交阶段


```plain text
提交阶段开始：拿到“待更新 Fiber 列表”（仅总和组件 Fiber）
        ↓
遍历待更新列表：找到总和组件 Fiber 对应的 DOM 节点（<span class="total">...</span>）
        ↓
一次性执行 DOM 操作：node.innerText = newTotal（无其他 DOM 操作）
        ↓
若有其他待更新 Fiber（如某列表项样式）→ 一并执行 DOM 修改（如 node.style.color = 'red'）
        ↓
所有 DOM 操作执行完毕 → 触发浏览器一次重排重绘
        ↓
提交阶段结束
```


## fiber调度


### 一、React 16/17 为何弃用 `requestAnimationFrame`？


React 16/17 中，调度器依赖 `requestAnimationFrame` 计算“帧截止时间”（`frameDeadline = timestamp + 16ms`），但这种方案存在两个关键缺陷：

1. **帧对齐延迟**：`requestAnimationFrame` 的回调会在“浏览器每帧渲染前”触发（约 16ms 一次），若任务优先级极高（如用户输入），需等待下一个帧回调才能执行，可能导致 16ms 级别的延迟（对输入响应来说感知明显）。
2. **主线程阻塞风险**：若当前帧渲染任务（如复杂动画）耗时超过 16ms，`requestAnimationFrame` 回调会被延迟，进而导致调度器无法及时触发任务，影响响应性。

为解决这些问题，React 18 改用 `MessageChannel` 作为“微任务级”的调度触发器，配合 `setTimeout` 兜底，实现更精细的任务调度。


### 二、React 18 调度核心：`MessageChannel + setTimeout` 原理


`MessageChannel` 是浏览器提供的 API，用于创建两个相互通信的端口（`port1`/`port2`），通过 `postMessage` 发送消息，消息回调会在“微任务队列清空后、下一次宏任务执行前”触发（优先级高于 `setTimeout`）。React 18 利用这一特性，实现“低延迟、可中断”的任务调度。


### 1. 核心机制：`MessageChannel` 作为任务触发器


React 18 调度器会创建一个全局 `MessageChannel`，并将任务执行逻辑绑定到 `port2` 的 `onmessage` 回调：


```javascript
// React 18 Scheduler 核心伪代码
const channel = new MessageChannel();
const port = channel.port2;

// 任务队列（按优先级排序）
let taskQueue = [];
// 是否正在等待消息（避免重复触发）
let isPostMessageScheduled = false;

// 1. 调度任务：将任务加入队列，并触发 MessageChannel
function scheduleTask(task) {
  taskQueue.push(task); // 任务入队（按优先级排序）
  if (!isPostMessageScheduled) {
    isPostMessageScheduled = true;
    // 发送消息，触发 port2.onmessage 回调（微任务后执行）
    channel.port1.postMessage(null);
  }
}

// 2. 消息回调：执行任务队列
port.onmessage = function () {
  isPostMessageScheduled = false;
  // 执行任务（可中断逻辑）
  workLoop();
};
```

- **触发时机**：`port1.postMessage(null)` 发送消息后，`port2.onmessage` 回调会在“当前宏任务内的微任务全部执行完毕后”立即触发（比 `setTimeout(fn, 0)` 快，`setTimeout` 会延迟到下一个宏任务）。
- **优势**：避免 `requestAnimationFrame` 的 16ms 帧延迟，高优先级任务（如用户输入）能更快进入执行流程。

### 2. `setTimeout` 作为降级兜底方案


`MessageChannel` 在大部分现代浏览器中支持良好，但存在极少数特殊场景（如旧版 IE 不支持 `MessageChannel`，或某些 iframe 环境中 `MessageChannel` 被限制）。此时，React 18 会降级使用 `setTimeout` 触发任务：


```javascript
// 降级逻辑伪代码
function scheduleTaskFallback(task) {
  taskQueue.push(task);
  if (!isTimeoutScheduled) {
    isTimeoutScheduled = true;
    // 使用 setTimeout 触发任务（下一个宏任务执行）
    setTimeout(() => {
      isTimeoutScheduled = false;
      workLoop();
    }, 0);
  }
}
```

- **作用**：保证调度器在所有环境下的兼容性，避免因 API 不支持导致任务无法执行。

### 3. 任务执行：`workLoop` 与可中断逻辑不变


无论是 `MessageChannel` 还是 `setTimeout` 触发，最终都会进入 `workLoop` 执行任务，且“可中断”核心逻辑与 React 16/17 一致：


```javascript
function workLoop() {
  let currentTask = taskQueue.shift(); // 取出最高优先级任务
  while (currentTask) {
    // 执行任务单元（如处理一个 Fiber 节点）
    const didComplete = currentTask.execute();
    if (!didComplete) {
      // 任务未完成（如超时），重新入队，等待下次调度
      taskQueue.unshift(currentTask);
      break;
    }
    currentTask = taskQueue.shift();
  }
}
```

- **可中断关键**：每个任务单元执行后，会检查是否超时（超过当前任务的优先级过期时间）或有更高优先级任务入队，若满足则暂停任务，下次调度时恢复。

### 三、`MessageChannel` 对比 `requestAnimationFrame`：核心优势


| 特性      | React 16/17（requestAnimationFrame） | React 18（MessageChannel） |
| ------- | ---------------------------------- | ------------------------ |
| 触发频率    | 固定 16ms/次（与帧同步）                    | 按需触发（微任务后立即执行）           |
| 高优任务延迟  | 可能延迟 16ms（需等下一个帧）                  | 微任务级延迟（≈0ms）             |
| 适用场景    | 低优先级渲染任务（如列表滚动）                    | 高优交互任务（如输入、点击）+ 并发渲染     |
| 主线程阻塞影响 | 受帧渲染耗时影响大                          | 受影响小（微任务优先级高）            |


### 四、为何配合 `setTimeout` 而非单独使用 `MessageChannel`？

1. **兼容性兜底**：如前所述，`MessageChannel` 并非所有环境都支持（如 IE 11 及以下），`setTimeout` 是浏览器通用 API，确保调度器在极端环境下可用。
2. **避免“无限循环”风险**：若任务执行过程中不断产生新任务，`MessageChannel` 的 `onmessage` 会被频繁触发，可能导致主线程长时间忙碌。`setTimeout` 会将任务延迟到下一个宏任务，给主线程喘息机会（尽管 React 18 有优先级控制，但若出现异常，`setTimeout` 可作为安全屏障）。

### 调度机制核心变化

- **核心触发器**：从 `requestAnimationFrame` 改为 `MessageChannel`，解决高优任务的帧延迟问题，适配并发渲染的低延迟需求。
- **降级方案**：保留 `setTimeout` 作为兜底，确保跨环境兼容性。
- **可中断逻辑**：`workLoop` 与 Fiber 任务拆分逻辑不变，仍通过“任务单元+优先级过期时间”实现可中断、可恢复。

这一调整让 React 18 在处理“用户输入+并发渲染”场景时响应更快（如输入框打字无卡顿、复杂列表滚动时点击操作即时响应）。


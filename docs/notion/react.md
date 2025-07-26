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


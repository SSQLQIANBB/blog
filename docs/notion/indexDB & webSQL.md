
```javascript
export function useIndexedDB() {
	const myDB = {
		name: 'indexedDBStore',
		version: 3.0,
		db: '',
	};
	const request = window.indexedDB.open(myDB.name, myDB.version);

	request.onerror = (err) => {
		console.log('err-msg:', err);
	};

	request.onsuccess = (e) => {
		console.log('create-indexedDB---success', e);
		myDB.db = e.target.result;
	};

	request.onupgradeneeded = (e) => {
		console.log('version: ', e.oldVersion, '---->', e.newVersion);
		const db = e.target.result;

		if (!db.objectStoreNames.contains('students')) {
			db.createObjectStore('students', { keyPath: 'id' });
		}
	};

	function addData(db, storeName) {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);

		for (var i = 0; i < students.length; i++) {
			store.add(students[i]);
		}
	}

	// 关闭
	function closeDB(db) {
		db.close();
	}

	// 删除
	function deleteDB(name) {
		indexedDB.deleteDatabase(name);
	}

	const students = [
		{
			name: 'ttt',
			age: 18,
		},
		{
			name: 'huawei',
			age: 22,
		},
	];

	setTimeout(() => addData(myDB.db, 'students'), 1000);
}

// 废弃webSQL
export function useWebSQL() {
	//Demo：获取或者创建一个数据库，如果数据库不存在那么创建之
	const dataBase = openDatabase('mydb', '1.0', '学生表', 1024 * 1024, function () {
		console.log('dataBase---sql--create-success');
	});

	// dataBase.transaction('test-transaction-api', dataBase)
}

function setupIndexDB() {
  const __DB__NAME__ = 'PROJECT_H5_DB';
  const dbOpenRequest = window.indexedDB.open(__DB__NAME__, 1);
  const __DB_STORE_NAME__ = 'PROJECT_DB_STORE';
  const __DB_BUFFER_STORE_NAME__ = 'PROJECT_BUFFER_STORE';

  console.log(dbOpenRequest.version);

  dbOpenRequest.onupgradeneeded = e => {
    console.log('----onupgradeneeded----');
    const db = e.target?.result;

    if (!db.objectStoreNames.contains(__DB_STORE_NAME__)) {
      const objectStore = db.createObjectStore(__DB_STORE_NAME__, { keyPath: 'id', autoIncrement: true });

      const idIdx = objectStore.createIndex('id', 'id', { unique: true });
      const nameIdx = objectStore.createIndex('name', 'name');
      const idx = objectStore.createIndex('index', 'index');
      const newFieldIdx = objectStore.createIndex('new', 'new');

      console.log('objectStore:', objectStore, idIdx, nameIdx, idx, newFieldIdx);
    }

    if (!db.objectStoreNames.contains(__DB_BUFFER_STORE_NAME__)) {
      const bufferStore = db.createObjectStore(__DB_BUFFER_STORE_NAME__, { autoIncrement: true });

      console.log('bufferStore', bufferStore);
    }
  };

  dbOpenRequest.onsuccess = e => {
    const db = e.target?.result;

    console.log(db.name);
    console.log(db.version);

    // 事务
    const transaction = db.transaction([__DB_STORE_NAME__], 'readwrite');

    const objectStore = transaction.objectStore(__DB_STORE_NAME__);

    objectStore.put({
      id: 1,
      name: 'test_1',
      index: 1
    });
    objectStore.put({
      id: 2,
      name: 'test_2',
      index: 2
    });
    objectStore.put({
      id: 3
    });

    const r = objectStore.openCursor();

    const results = [];
    r.onsuccess = cr => {
      const cursor = cr.target?.result;
      if (cursor) {
        results.push(cursor.value);

        cursor.continue();
      } else console.log('results:', results);
    };
    console.log(objectStore);

    const name_idx = objectStore.index('name');

    const name_req = name_idx.openCursor();

    const arr = [];
    name_req.onsuccess = e => {
      const cursor = e.target?.result;

      if (cursor) {
        console.log('cursor:', cursor);
        arr.push(cursor.value);

        cursor.continue();
      } else console.log('arr:', arr);
    };
  };
}
```


indexDB包括主键；索引（index）


可通过index快速查询；


### 区分store.openCursor和index.openCursor


openCursor类似于迭代器，cursor即游标；


store的游标是遍历全部数据；


index(’name’)：只遍历store数据中name不为空的数据；


### index索引


快速查询，类似与sql中快查字段


例如json结构：{id: 1, name: ‘liming’, age: 30, phone: ‘xxx’ }


想查询phone为123时，

- 如果没有设置phone索引，可通过查询所有数据再过滤
- 设置索引后，可直接通过索引查询 store.index(’phone’);

**文档**： 


[bookmark](https://www.tangshuang.net/3735.html#)


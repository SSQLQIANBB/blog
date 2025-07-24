
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
```


**文档**： 


[bookmark](https://www.tangshuang.net/3735.html#)


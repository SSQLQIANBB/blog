
```typescript
class RefImp {
  _value: any;
  constructor(v) {
    this._value = v;
  }

  set value(v) {
    this._value = v
    console.log('---set---')
  }

  get value() {
    console.log('---get---')
    return this._value;
  }
}

const myRef = new RefImp(1111);
```


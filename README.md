## znu-event

🚀 a sample event emitter 🌈

## 使用

``` javascript
import EventEmitter from  './znu-event';
const emitter = new EventEmitter();
emitter.on('add', data=>{
    console.log(data) // 1
});
emitter.emit('add', 1);
```
## 方法


### on(eventName, listener)
绑定事件

|名称|类型|数据类型|是否必填|说明|
|---|---|---|---|---|
|eventName| 参数 |`String/Symbol`|是|事件名称|
|listener| 参数 |`Function`|是|对应的回调函数|
|emitter| 返回值 |`EventEmitter`|---|实例|

### off(eventName, listener)
解除绑定, 如果不填写`listener`, 那么`eventName`对应的`listener`都会被移除.

|名称|类型|数据类型|是否必填|说明|
|---|---|---|---|---|
|eventName| 参数 |`String/Symbol`|是|事件名称|
|listener| 参数 |`Function`|是|对应的回调函数|
|emitter| 返回值 |`EventEmitter`|---|实例|

``` javascript
const callback = data=>{
    alert(data)
};
emitter.on('add', callback);
// 解除绑定
emitter.off('add', callback);
// add事件不会触发
emitter.emit('add', 1);
```

### once(eventName, listener)
绑定事件, 只触发一次

|名称|类型|数据类型|是否必填|说明|
|---|---|---|---|---|
|eventName| 参数 |`String/Symbol`|是|事件名称|
|listener| 参数 |`Function`|是|对应的回调函数|
|emitter| 返回值 |`EventEmitter`|---|实例|

``` javascript
const callback = data=>{
    alert(data)
};
emitter.once('add', callback);
// add事件触发
emitter.emit('add', 1);
// add事件不会触发
emitter.emit('add', 1);
```

### emit(eventName [, ...args])
触发事件, 支持任意数量参数

|名称|类型|数据类型|是否必填|说明|
|---|---|---|---|---|
|eventName| 参数 |`String/Symbol`|是|事件名称|
| ...args| 参数 |`Any`|是|对应的回调函数|
|emitter| 返回值 |`Boolean`|---|实例|

``` javascript
const callback = (a,b,c,d)=>{
    console(a,b,c,d); // 1,2,3,4
};
emitter.once('add', callback);
// add事件触发
emitter.emit('add', 1,2,3,4);
```

### has(eventName)
是否绑定了指定事件

|名称|类型|数据类型|是否必填|说明|
|---|---|---|---|---|
|eventName| 参数 |`String/Symbol`|是|事件名称|

``` javascript
emitter.on('add', callback);

emitter.has('add'); // true
```

### eventNames()
返回所有绑定事件名称

``` javascript
emitter.eventNames();
```

### offAll()
解除所有绑定事件

``` javascript
const callback = (a,b,c,d)=>{
    console(a,b,c,d); // 1,2,3,4
};
emitter.on('add', callback);
emitter.on('edf', callback);
emitter.offAll();

// add，edf事件不会触发
emitter.emit('add', 1,2,3,4);
emitter.emit('edf', 1,2,3,4);
```

### destroy()
销毁实例

``` javascript
const callback = (a,b,c,d)=>{
    console(a,b,c,d); // 1,2,3,4
};
emitter.once('add', callback);
emitter.destroy();

// add事件不会触发
emitter.emit('add', 1,2,3,4);
```

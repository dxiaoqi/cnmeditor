# `c-core`

> TODO: description

## Usage
demo
https://codesandbox.io/s/lively-surf-cvhmg?file=/src/App.js
```
const cCore = require('c-core');
demo 
// TODO: DEMONSTRATE API
```
### USE 
```react
    Core.setSchema(schema);
    // 注入整体结构
    Core.render((store) => {
        //...render with store
    });
```
### schema格式
```js
[
    {
        childrens:[]
    },{
        childrens:[]
    }
]
```
### UPDATE
```
Core.update(path, name, value)
// path 会由store中获取
// name 修改的属性名
// value 修改的值 
```
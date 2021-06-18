# `c-core`

> TODO: description

## Usage
demo
https://codesandbox.io/s/immutable-star-qdniv?file=/core/index.ts:0-2456
```
import Core from "../core/index";
demo 
// TODO: DEMONSTRATE API
```
### USE 
```react
const _c = new Core(document.getElementById("root"), {
  renderFlow: (Cur, childrens, curCom) => {
    // 当前组件，子组件，当前props，设定好主题dom结构渲染，其他交给我们
    return React.createElement(Cur, {
      ...curCom,
      childrens
    });
  }
});
// 注册组件
_c.registeredComponent("panel", Panel);
_c.registeredComponent("taxt", Pext);
// 加载 schema
const Pa = _c.loadSchema(schema);
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
-  TODO 校验（实现中） keep alive支持 全局API
### UPDATE
```
Core.update(path, name, value)
// path 会由store中获取
// name 修改的属性名
// value 修改的值 
```

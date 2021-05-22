import { autorun, makeAutoObservable } from "mobx";
import cloneDeep from 'lodash/cloneDeep'
import Plugin from "./plugin";
import assembleTree from "./assembleTree";
import updatePathTarget from "./updatePathTarget";

function debugPlugin(debug) {
  return debug
    ? {
        match(node, next) {
          console.log("match Node", node);
          next(node);
        }
      }
    : "";
}

const pluginBase = new Plugin(
  {
    init(arg, next) {
      next(arg);
    }
  },
  [debugPlugin(true)]
);

pluginBase.registerPlugins({
  init(arg) {
    return assembleTree(pluginBase, arg, []);
  }
});

class _S {
  constructor(schema = []) {
    this.schema = schema;
    makeAutoObservable(this);
  }
  setSchema(schema) {
    this.schema = assembleTree(pluginBase, schema, []);
  }
  update(path, prototype, value) {
    const shadowSchema = cloneDeep(Store.schema)
    const data = updatePathTarget(shadowSchema, path, prototype, value);
    // 此处应该是有点问题，后面优化
    this.schema = data;
  }
}
const Store = new _S();

autorun(function () {
    run()
});
function run() {
  const initData = pluginBase.run("init", Store.schema) || Store.schema;
  pluginBase.run("render", initData);
}

function cCore() {
  // init Store
  // TODO
  return {
    pluginBase,
    render: (cb) => {
      console.log("注册渲染");
      pluginBase.registerPlugins({
        render: cb
      });
      run();
    },
    setSchema: Store.setSchema.bind(Store),
    update: Store.update.bind(Store)
  };
}

export default cCore();

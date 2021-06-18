import CommandManager from "./command";
import CompentManager from "./component";
import DataService from "./dataService";
import renderFlow from "./renderFlow";
function assembleTree(base: Core, nodes: any[], parent = []) {
  nodes.forEach((n, index) => {
    let path = parent.length ? parent.concat(index) : [index]; // 数组记录path
    n.path = path;
    n = base.doService(n);
    // 数据层
    if (n.childrens && n.childrens instanceof Array) {
      assembleTree(base, n.childrens, path);
    }
  });
  return nodes;
}

function updatePathTarget(
  obj: object,
  path: number[],
  prototype: string,
  value: any
) {
  let index = path.shift();
  let target = obj[index];
  if (!target) {
    throw new Error("can not get the node in path");
  }
  while (index) {
    target = target.childrens;
    index = path.shift();
  }
  target[prototype] = value;
  return obj;
}

class Core {
  command: CommandManager;
  CompentManager: CompentManager;
  sandboxFrag: any;
  store: Array<object>;
  el: HTMLElement;
  dataService: DataService;
  options: {
    renderFlow: Function;
  };
  constructor(el, options) {
    this.el = el;
    this.options = options;
    this.command = new CommandManager(this); // 命令服务
    this.dataService = new DataService(this); // 数据服务
    this.sandboxFrag = undefined; // 沙箱片段
    this.CompentManager = new CompentManager(); // 组件服务
    this.store = []; // 数据源
    this.init();
  }
  init() {
    // 注册一些内置插件
    // render一定要在最后
    // this.dataService.registerService(addTag);
    // this.dataService.registerService(prerender);
  }
  registeredComponent(name: string, component: Function) {
    // 注册组件
    this.CompentManager.registerComponent(name, component);
  }
  getComponent(name) {
    return this.CompentManager.getComponentWidgets(name);
  }
  updateStore(path, name, value) {
    updatePathTarget(this.store, path, name, value);
  }
  doService(data) {
    return this.dataService.run(data);
  }
  useRenderFlow(Cur: HTMLElement, childrens, curCom) {
    // 使用渲染流，处理不同的语言，支持自定义渲染规则
    return this.options.renderFlow?.(Cur, childrens, curCom);
  }
  loadSchema(obj) {
    // 加载数据，目前内置功能
    this.store = assembleTree(this, obj, []);

    const _self = this;
    this.options.renderFlow &&
      (function () {
        _self.sandboxFrag = _self.store.map((element) =>
          renderFlow(_self, element)
        );
      })();
    return this.sandboxFrag;
  }
}
export default Core;

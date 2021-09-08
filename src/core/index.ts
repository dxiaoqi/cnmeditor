import CommandManager from "./command";
import CompentManager from "./ecs/componentManager";
import EntityManager from "./ecs/entityManager";
import DataService from "./dataService";
import renderFlow from "./renderFlow";
// import ECS, { Entity, Components }  from './ecs'
// import EntityTree from './EntityTree'
import ECS from './ecs'
import Component from './ecs/component'
// 创建成Entity树
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

export function ProxyUpate(data, cb) {
  return new Proxy(data, {
    get: (target, handler) => {
      // console.log('获取')
      return Reflect.get(target, handler)
    },
    set: (target, key, value) => {
      // console.log('设置')
      cb(target, key, value)
      return Reflect.set(target, key, value)
    }
  })
}

function updatePathTarget(
  obj: object[],
  path: number[],
  prototype: string,
  value: any
) {
  let index : number= path.shift() || 0;
  let target = obj[index];
  if (!target) {
    throw new Error("can not get the node in path");
  }
  while (index) {
    target = (target as any).childrens;
    index = path.shift() || 0;
  }
  (target as any)[prototype] = value;
  return obj;
}

class Core {
  command: CommandManager;
  CompentManager: CompentManager;
  sandboxFrag: any;
  system: ECS;
  store: Object[];
  el: HTMLElement;
  dataService: DataService;
  options: {
    renderFlow: Function;
  };
  constructor(el: any, options: any) {
    this.el = el;
    this.options = options;
    this.system = new ECS() // ECS 系统
    this.command = new CommandManager(this); // 命令服务
    this.dataService = new DataService(this); // 数据服务
    this.sandboxFrag = document.createDocumentFragment(); // 沙箱片段
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
  registeredComponent(component: Function) {
    // 注册组件
    this.system.registerComponent(component);
  }
  registerEntity(name: string, EntityComponent) {
    // 注册一个，Entity作为UI实体，只做渲染
    return this.system.createEntity(name, EntityComponent)
  }
  getComponent(name: string) {
    // return this.system.getComponentWidgets(name);
  }
  getEntityByName(name: string) {
    // 取第一个
    return this.system.getEntityComponent(name)
  }
  updateStore(path: number[], name: string, value: any) {
    updatePathTarget(this.store, path, name, value);
    return this.loadSchema((this.store as []))
  }
  doService(data: object) {
    return this.dataService.run(data);
  }
  useRenderFlow(Cur: HTMLElement, childrens: [], curCom: object) {
    // 使用渲染流，处理不同的语言，支持自定义渲染规则
    return this.options.renderFlow?.(Cur, childrens, curCom);
  }
  loadSchema(obj: []) {
    // 加载数据，目前内置功能
    this.store = assembleTree(this, obj, []);

    let self = this;
    this.options.renderFlow &&
      (function () {
        self.sandboxFrag = self.store.map((element) =>
          renderFlow(self, element)
        );
      })();
    return this.sandboxFrag;
  }
}
export {
  Component
}
export default Core;

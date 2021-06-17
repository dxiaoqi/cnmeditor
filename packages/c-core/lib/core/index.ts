import CommandManager from './command'
import CompentManager from './component'
import DataService from './dataService'

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
  sandboxFrag: DocumentFragment;
  store: Object;
  el: HTMLElement;
  dataService: DataService;
  constructor(el) {
    this.el = el;
    this.command = new CommandManager(this);
    this.dataService = new DataService(this);
    this.sandboxFrag = document.createDocumentFragment();
    this.CompentManager = new CompentManager();
    this.store = null;
    this.init();
  }
  init() {
    // render一定要在最后
    // this.dataService.registerService(addTag);
    // this.dataService.registerService(prerender);
  }
  updateStoe(path, name, value) {
    updatePathTarget(this.store, path, name, value)
  }
  doService(data) {
    return this.dataService.run(data)
  }
  loadSchema(obj) {
    // 加载数据，目前内置功能
    this.store = assembleTree(this, obj, []);
    return this.sandboxFrag;
  }
}
export default Core;

const isExtensible = (obj) =>
  typeof obj === "object" && Reflect.isExtensible(obj);

// 响应式函数
const effectStacks = [];
// 函数与目标映射
const targetMap = new WeakMap();
// 以来手机关系
const track = (target, key) => {
  const effect = effectStacks[effectStacks.length - 1];
  console.log("EFFECT", effectStacks);
  // 因为当前执行了get操作，所以产生了依赖，当前方法会进入effectStacks,所以该监听与函数会被捕捉掉，因为产生依赖的时候因为调用堆栈还是执行中，所以这个时候并未走到finally
  if (effect) {
    let depMap = targetMap.get(target);
    if (!depMap) {
      depMap = new Map();
      targetMap.set(target, depMap);
    }
    let deps = targetMap.get(key);
    if (!deps) {
      deps = new Set();
      depMap.set(key, deps);
    }
    deps.add(effect);
  }
};

// 根据映射关系获取响应函数, 派发通知
const trigger = (target, key) => {
  const depMap = targetMap.get(target);
  if (!depMap) return;

  const deps = depMap.get(key);

  if (deps) {
    deps.forEach((dep) => dep());
  }
};

const reactive = (obj) => {
  if (!isExtensible(obj)) {
    return obj;
  }
  const handler = {
    get: (o, key, value) => {
      const result = Reflect.get(o, key, value);
      console.log("获取");
      // 存储起来
      track(o, key);
      return isExtensible(result) ? reactive(result) : result;
    },
    set: (o, key, value) => {
      const result = Reflect.set(o, key, value);
      // 触发
      trigger(o, key);
      return result;
    },
    deleteProperrty: (target, key) => {
      const result = Reflect.deleteProperty(target, key);
      // trigger(target, key);
      return result;
    }
  };
  return new Proxy(obj, handler);
};

const createReactiveEffect = (fn) => {
  const effect = function () {
    try {
      effectStacks.push(fn);
      return fn();
    } finally {
      effectStacks.pop();
    }
  };
  return effect;
};

// 将fn转换为一个响应式函数
const effect = (fn) => {
  const e = createReactiveEffect(fn);
  e();
  return e;
};

class CnmElement extends HTMLElement {
  state: object;
  render: Function;
  constructor(options) {
    super();
    this.init(options);
  }
  init(options) {
    const templates = document.createElement("template");
    this.attachShadow({ mode: "open" });
    // 初始化state
    this.state = reactive(options);
    // 防止state被覆盖
    Reflect.defineProperty(this, "state", {
      writable: false
    });
    effect(() => {
      if (this.shadowRoot.innerHTML) {
        this.shadowRoot.innerHTML = "";
      }
      templates.innerHTML = this.render();
      // console.log(this.state.name, this.shadowRoot.childNodes, this.shadowRoot)
      this.shadowRoot.appendChild(templates.content);
    });
  }
}

export default CnmElement;

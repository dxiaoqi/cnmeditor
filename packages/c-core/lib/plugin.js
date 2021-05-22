function registerPlugins(base, plugin) {
    if (!plugin) throw Error("Plugin can not be undefined");
    const { type, ...control } = plugin;
    base.lifeHook.forEach((hn) => {
      if (control[hn]) {
        const fns = (base.plugins[hn] = base.plugins[hn] || []);
        fns.push(control[hn]);
      }
    });
  }
  
  class Plugin {
    constructor(Core) {
      this.Core = Core;
      this.plugins = {};
      // 初始化 获取所有的对象
      this.lifeHook = ["init", "match", "render"];
      // ...生命周期定义
    }
    registerPlugins(plugins) {
      if (plugins instanceof Array) {
        plugins.forEach((p) => {
          registerPlugins(this, p);
        });
      } else {
        registerPlugins(this, plugins);
      }
    }
    run(key, ...args) {
      const { plugins } = this;
      const fns = plugins[key] || [];
      let i = 0;
  
      function next(...overrides) {
        const fn = fns[i++];
        if (!fn) return overrides;
  
        if (overrides.length) {
          args = overrides;
        }
  
        const ret = fn(...args, next);
        return ret;
      }
  
      return next();
    }
  }
  
  export default Plugin;
  
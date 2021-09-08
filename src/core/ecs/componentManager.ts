import Component from './component';
class ComponentManager {
    public Components: Component[]
    private _ComponentsMap: Map<string, Component>
    constructor() {
        this.Components = [];
        this._ComponentsMap = new Map();
    }
    hasComponent(name: string) {
      // 是否包含组件
        return typeof this._ComponentsMap.get(name) === 'function'
    }
    registerComponen(Component: Component) {
      // 注册组件
          const name = (Component as any).name
          if (typeof this._ComponentsMap.get(name) === 'function') {
            console.warn(
              `Component type: '${(Component as any).name}' already registered.`
            );
            return; 
        }
          // 注册
          this.Components.push(Component);
          this._ComponentsMap.set(name, Component)
    }
    getComponent(name: string): Component {
      // 获取组件
      return this._ComponentsMap.get(name)
    }
    removeComponent(name: string) {
      // this.Components.forEach()
    }
}
export default ComponentManager
type ComponentWidget = {
    name: string;
    render: Function;
  };
  class CompentManager {
    componentWidgets: Map<string, ComponentWidget>;
    visit: object;
    constructor() {
      this.componentWidgets = new Map<string, ComponentWidget>();
      this.visit = {};
    }
    registerComponent(name, cp) {
      if (!name) {
        throw new Error("component must have a name");
      }
      if (this.componentWidgets.has(name)) {
        console.warn("component will be override");
      } else {
        this.componentWidgets.set(name, cp);
      }
    }
    getComponentWidgets(name) {
      this.visit[name] = true;
      return this.componentWidgets.get(name);
    }
    isVisit(name) {
      return this.visit[name];
    }
  }

export default CompentManager
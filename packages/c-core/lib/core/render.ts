function prerender(data) {
    const { type, props } = data;
    const Widget = this.CompentManager.getComponentWidgets(type);
    const visit = customElements.get(`cnm-${type}`);
    if (Widget && visit) {
      // 注册过了
    }
    if (Widget && !visit) {
      customElements.define(`cnm-${type}`, Widget);
    }
    const _dom = document.createElement(`cnm-${type}`);
    // 设置唯一标识来做props处理
    this.sandboxFrag.appendChild(_dom);
  }
  export default prerender
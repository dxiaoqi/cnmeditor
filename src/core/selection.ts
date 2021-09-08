// 当前选中的
class CSelection {
  public currSelection : object | null;
  constructor() {
    this.currSelection = null;
  }
  getSelect(obj: object) {
    this.currSelection = obj;
  }
}

export default new CSelection();

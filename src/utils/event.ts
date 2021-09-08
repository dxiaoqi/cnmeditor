class Events {
  cb: {keybord}
  constructor() {
    this.cb = {
      'keybord': []
    }
    this.emit()
  }
  on(type,cb) {
    this.cb[type].push(cb)
  }
  emit() {
    const { keybord } = this.cb
    document.addEventListener('keydown', function(event) {
      keybord.forEach(fn => {
        fn('keydown', event)
      })
    })
    document.addEventListener('keyup', function(event) {
      keybord.forEach(fn => {
        fn('keyup', event)
      })
    });
  }
  removeListener() {}
  removeAllListener() {}
  getListenerCount() {}
}
export default new Events()
import * as mobx from "mobx";
export const selector = mobx.observable({
    target: -1      // 当前选中的
})
// DEBUG
mobx.autorun(() => {
    console.log('111', selector.target)
})

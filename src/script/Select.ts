import { Component } from '../core'
import { selector } from '../utils/unity'
class Select extends Component {
    onClick(e) {
        // 用作点击后提交到当前的选择,预览模式下执行
        const entity = this.entity
        selector.target = entity
    }
}
export default Select
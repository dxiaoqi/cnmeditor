import { Component } from '../core'
class Click extends Component {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: object) {
        super(props)
    }
    onClick(e) {
        // 点击事件
        console.log('我被点击了', this.entity)
    }
    keyEvent() {

    }


}
Click.schema = {
    x: { type: 'string', default: 20 },
    y: { type: 'string', default: 40}
}
export default Click
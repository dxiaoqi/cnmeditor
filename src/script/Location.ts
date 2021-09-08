import { Component } from '../core'
class Location extends Component {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    static schema = {
        x: { type: 'string', default: 20 },
        y: { type: 'string', default: 40} 
    }
    constructor(props: object) {
        super(props);
        console.log(this)
    }
    onClick(e) {
        // 点击事件
        this.schema.x = 50
    }
    keyEvent(type, e) {
        if (e.keyCode === 13) {
            this.schema.x += 50
        }
        console.log(['keybort event', type].join())
    }
}
export default Location
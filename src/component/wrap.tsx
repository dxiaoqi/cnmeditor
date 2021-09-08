import React, { Component } from "react";
import {ComponentView, View} from '../utils/constant'
import Events from '../utils/event'
interface WrapType {
  name: string;
  com: object;
  [propsName: string]: any
}
function wrap(WrappedComponent: React.ComponentType) {
  return class Wrap extends Component<WrapType | any> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props) {
      super(props);
      // 实例化当前entity
      (this as any).init('Button', [])
      // 实例化组件
      this.create()
    }

    create() {
      const { component, viewStatus } = this.props
      // 实例化组件
      if (viewStatus === View.VIEW) {
        console.log(ComponentView)
        ComponentView?.concat(['Select']).forEach(ele => {
          (this as any).addComponent(ele, this.props[ele])
        });
      }
      if (viewStatus === View.PLAY) {
        component?.concat(['Select']).forEach(ele => {
          (this as any).addComponent(ele, this.props[ele])
        });
      }
      // 绑定键盘事件
      (this as any).getComponents().forEach(ele => {
        ele.keyEvent &&Events.on('keybord',ele.keyEvent?.bind(ele))
      });
    }

    componentDidMount() {

    }

    eventHandle(e) {
      (this as any).getComponents().forEach(ele => {
        ele.onClick(e)
      })
    }
    render() {
      const pos = (this as any).getComponent('Transfer')?.schema || {x: 0, y:0}
      return (
        <div
          className="entity"
          style={{transform: `translate(${pos.x}px, ${pos.y}px)`}}
          tabIndex={1}
          onClick={this.eventHandle.bind(this)}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}
export default wrap;

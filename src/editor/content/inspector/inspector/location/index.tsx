// 拓展插件
import React from 'react';
type ComponentProps = {}
export default class A extends React.Component<ComponentProps | any> {
  constructor(props) {
    super(props)
  }

    render() {
        return (
            <div className="inspector-inputs">
            <div className="wrapper">
            <div className="left">
            <div className="input-wrapper">
              <p>X</p>
              <input type="text" placeholder="621" />
            </div>
            <div className="input-wrapper">
              <p>Y</p>
              <input type="text" placeholder="412" />
            </div>
            <div className="input-wrapper" >
              <p>W</p>
              <input type="text" placeholder="98" />
            </div>
            <div className="input-wrapper">
              <p>H</p>
              <input type="text" placeholder="98" />
            </div>
            <div className="input-wrapper">
              <p>R</p>
              <input type="text" placeholder="0º" />
            </div>
          </div>
        </div>
        </div>
        )
    }
}

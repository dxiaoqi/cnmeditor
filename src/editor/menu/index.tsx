import React from 'react'
type ComponentProps = {}
export default class Editor extends React.Component<ComponentProps | any, any> {
    constructor(props: ComponentProps | any) {
        super(props)
        this.state = {
            name: '',
            componentList: {}
        }      
    }

    render() {
        return (
            <div className="tab-bar">
            <div className="container">
              <div className="left">
                <input
                  className="nav-input"
                  name="nav"
                  type="radio"
                  id="figma-app"
                  checked
                />
                <input className="nav-input" name="nav" type="radio" id="components" />
                <input className="nav-input" name="nav" type="radio" id="add" />
                <div className="sections">
                  <label className="selected">C🍋</label>
                  <label className="components">Components</label>
                  <label className="add">
                        +
                  </label>
                </div>
              </div>
              <div className="right">
                  <div className="toggle-area">
                      {/* <p>切换主题</p>
                      <label className="switch-theme">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label> */}
                  </div>
              </div>
            </div>
          </div>
        )
    }
}
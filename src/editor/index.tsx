import React from 'react'
import {observer} from 'mobx-react';
import { observable } from 'mobx'
import Silber from './silber'
import Render from './render'
import Prototype from './prototype'
import {ComponentView, View} from '../utils/constant'
import { selector } from '../utils/unity'
import Menu from './menu'
import Tool from './tool'
import Content from './content'
import './main.scss'
type ComponentProps = {}
// 视图模式 

@observer
export default class Editor extends React.Component<ComponentProps | any> {
    @observable view:View = View.VIEW
    constructor(props: ComponentProps | any) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='cnm-editor'>
                <Menu  />
                <Tool />
                <Content select={selector} viewStatus={this.view} ComponentView={ComponentView}/>
                {/* <Render select={selector} viewStatus={this.view} ComponentView={ComponentView}/>
                <Prototype select={selector} /> */}
            </div>
        )
    }
}

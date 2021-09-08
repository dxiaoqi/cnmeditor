import React from 'react';
import * as mobx from "mobx";
import Location from './inspector/location'
import InspectorMap from './inspector'
import { _EntityManager } from '../../../core/ecs'
import { selector } from '../../../utils/unity'
type ComponentProps = {}
type ComponentState = {
    name: string,
    componentMap: object
}
export default class Inspector extends React.Component<ComponentProps | any, ComponentState> {
    constructor(props: ComponentProps | any) {
        super(props)
        this.state = {
            name: '',
            componentMap: {}
        }
        const self = this
        mobx.autorun(() => {
            let id = selector.target
            const props =  _EntityManager.getEntityById(id).props
            let componentList = props['component']
            const { name } = props
            let componentMap = {}
            componentList.forEach(cn => componentMap[cn.toString().toLowerCase()] = props[cn])
            self.setState({
                name,
                componentMap: componentMap
            })
        })        
    }

    renderInspectorItem() {
        const { componentMap } = this.state
        // 需要补充默认渲染的流程
        return Object.keys(componentMap).map((e, index) => {
            const ComponentWidget = InspectorMap[e]
            return (<ComponentWidget key={index} {...componentMap[e]}/>)
        })
    }

    render() {
        return (
            <div className='inspector'>
                <div className="inspector-sections">
                    <div className="wrapper">
                        <label>Inspector</label>
                    </div>
                </div>
                {this.renderInspectorItem()}
            </div>
        )
    }
}

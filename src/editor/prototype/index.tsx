import React from 'react'
import * as mobx from "mobx";
import { _EntityManager } from '../../core/ecs'
import { selector } from '../../utils/unity'
import './index.scss'
type ComponentProps = {}
export default class Editor extends React.Component<ComponentProps | any, any> {
    constructor(props: ComponentProps | any) {
        super(props)
        this.state = {
            name: '',
            componentList: {}
        }
        const self = this
        mobx.autorun(() => {
            let id = selector.target
            const props =  _EntityManager.getEntityById(id).props
            let comsponentList = props['component']
            const { name } = props
            let comsponents = {}
            comsponentList.forEach(cn => comsponents[cn] = props[cn])
            self.setState({
                name,
                componentList: comsponentList
            })
        })        
    }

    render() {
        const {name, componentList} = this.state
        return (
            <div className='cnm-proto'>
            </div>
        )
    }
}
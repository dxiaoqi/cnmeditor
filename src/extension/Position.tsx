import React from 'react'
import * as mobx from "mobx";
import './index.scss'
type ComponentProps = {}
export default class Position extends React.Component<ComponentProps | any, any> {
    constructor(props: ComponentProps | any) {
        super(props)
        this.state = {
            name: '',
            componentList: {}
        }
    }
    render() {
        const {name, componentList} = this.state
        return (
            <div className='cnm-proto'>
            </div>
        )
    }
}
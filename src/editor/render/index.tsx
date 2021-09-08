import React from 'react'
import Screen  from '../../Render/App'
import './index.scss'
type ComponentProps = {}
export default class Editor extends React.Component<ComponentProps | any> {
    constructor(props: ComponentProps | any) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="cnm-container">
                <Screen {...this.props}/>
            </div>
        )
    }
}
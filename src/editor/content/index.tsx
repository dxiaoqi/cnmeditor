import React from 'react';
import Sidebar from './sidebar'
import ContentArea from './content'
import Inspector from './inspector'
type ComponentProps = {}
export default class Content extends React.Component<ComponentProps | any> {

    render() {
        return (
            <div className='app-content'>
                <Sidebar />
                <ContentArea {...this.props}/>
                <Inspector />
                {/* <Render select={selector} viewStatus={this.view} ComponentView={ComponentView}/>
                <Prototype select={selector} /> */}
            </div>
        )
    }
}

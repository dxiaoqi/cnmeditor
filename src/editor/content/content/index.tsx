import React from 'react';
import Screen  from '../../../Render/App'
type ComponentProps = {}
export default class Content extends React.Component<ComponentProps | any> {

    render() {
        return (
            <div className='content'>
                <div className="content-area-wrapper">
                    <Screen {...this.props}/>
                </div>
            </div>
        )
    }
}

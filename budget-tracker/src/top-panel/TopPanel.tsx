import React from 'react';
import DataSelector from './data-selectors/DataSelectors';

class TopPanel extends React.Component{
    
    render() {
        return (
            <div id='top-panel'>
                <DataSelector />
            </div>
        )
    }
}

export default TopPanel;
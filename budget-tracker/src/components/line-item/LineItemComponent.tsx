import React from 'react';
import LineItem from '../../model/LineItem';

interface LineItemProps {
    lineItem: LineItem
}

interface LineItemState {
    editing: boolean
}

class LineItemComponent extends React.Component<LineItemProps, LineItemState> {
    render() {
        return (
            <div>
                <span className='line-item-desc'>{this.props.lineItem.description}</span>
                <span className='line-item-date'>{this.props.lineItem.date!.toLocaleDateString()}</span>
                <span className='line-item-cost'>${this.props.lineItem.amount}</span>
            </div>
        );
    }
}

export default LineItemComponent;
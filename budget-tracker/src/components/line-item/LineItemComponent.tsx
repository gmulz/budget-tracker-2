import React from 'react';
import Transaction from '../../model/LineItem';

interface LineItemProps {
    lineItem: Transaction
}

interface LineItemState {
    editing: boolean
}

class LineItemComponent extends React.Component<LineItemProps, LineItemState> {
    render() {
        return (
            <div>
                <span className='line-item-desc'>{this.props.lineItem.description}</span>
                <span className='line-item-date'>{(new Date(this.props.lineItem.date!)).toLocaleDateString()}</span>
                <span className='line-item-cost'>${this.props.lineItem.cost}</span>
            </div>
        );
    }
}

export default LineItemComponent;
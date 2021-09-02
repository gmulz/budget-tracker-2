import React from 'react';
import Transaction from '../../model/LineItem';
import './LineItemComponent.scss';


interface LineItemProps {
    lineItem: Transaction,
    idx: number
}

interface LineItemState {
    editing: boolean
}

class LineItemComponent extends React.Component<LineItemProps, LineItemState> {
    render() {
        return (
            <div className={`line-item ${this.props.idx % 2 === 0 ? 'even' : 'odd'}`}>
                <div className='line-item-left'>
                    <span className='line-item-desc'>{this.props.lineItem.description}</span>
                    <span className='line-item-date'>{(new Date(this.props.lineItem.date!)).toLocaleDateString('en-US', {timeZone: 'GMT'})}</span>
                </div>
                <span className='line-item-cost'>${this.props.lineItem.cost}</span>
            </div>
        );
    }
}

export default LineItemComponent;
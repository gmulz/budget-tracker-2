import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import Transaction from '../../model/LineItem';
import DatePicker from 'react-datepicker';
import './LineItemComponent.scss';
import { connect } from 'react-redux';
import { editTransaction } from '../../slices/transactionsSlice';
import Category from '../../model/Category';


interface LineItemProps {
    lineItem: Transaction,
    category: Category,
    idx: number,
    editTransaction: (txn: Transaction) => Promise<any>
}

interface LineItemState {
    editing: boolean;
    hovering: boolean;
    showDatePicker: boolean;
    dummyTransaction: Transaction | null;
}

class LineItemComponent extends React.Component<LineItemProps, LineItemState> {

    node: HTMLDivElement | null = null;
    outsideClickHandler: (e: any) => void;

    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
            editing: false,
            showDatePicker: false,
            dummyTransaction: null
        }
        this.outsideClickHandler = this.handleOutsideClick.bind(this);
    }

    handleMouseOver(e) {
        this.setState({ hovering: true });
    }

    handleMouseLeave(e) {
        this.setState({ hovering: false });
    }

    handleOutsideClick(e) {
        if (this.node && !this.node.contains(e.target)) {
            this.makeUnEditable();
        }
    }

    editButtonClick(e) {
        this.makeEditable();
    }

    makeEditable() {
        this.setState({ editing: true, 
                        dummyTransaction: { ...this.props.lineItem } as Transaction});
        document.addEventListener('click', this.outsideClickHandler, false);
    }

    makeUnEditable() {
        document.removeEventListener('click', this.outsideClickHandler, false);
        //post to database
        this.props.editTransaction(this.state.dummyTransaction!);
        this.setState({editing: false, showDatePicker: false, dummyTransaction: null});
    }

    changeDescription(e) {
        this.setState( { dummyTransaction: {...this.state.dummyTransaction, description: e.target.value} as Transaction});
    }

    changeDate(date) {
        this.setState( { showDatePicker: false,
            dummyTransaction: {...this.state.dummyTransaction, date: date} as Transaction});
    }

    changeCost(e) {
        this.setState( {dummyTransaction: {...this.state.dummyTransaction, cost: Number(e.target.value)} as Transaction})
    }

    clickDateButton(e) {
        this.setState({showDatePicker: true});
    }

    editableFieldClass() {
        return this.state.editing ? '' : 'hide';
    }

    displayFieldClass() {
        return this.state.editing ? 'hide' : '';
    }

    isRecurringTransaction() {
        return this.props.category.is_recurring;
    }

    render() {
        return (
            <div className={`line-item ${this.props.idx % 2 === 0 ? 'even' : 'odd'}`}
                 onMouseOver={this.handleMouseOver.bind(this)}
                 onMouseLeave={this.handleMouseLeave.bind(this)}
                 ref={(node => { this.node = node})}>
                <div className='line-item-left'>
                    <span className={`line-item-desc ${this.displayFieldClass()}`}>
                        {this.props.lineItem.description}
                        <span className={`fa fa-edit ${this.state.hovering ? '' : 'hide'}`} 
                              onClick={this.editButtonClick.bind(this)}></span>
                    </span>
                    <input className={`line-item-desc-input ${this.editableFieldClass()}`}
                           value={this.state.dummyTransaction?.description || ''}
                           onChange={this.changeDescription.bind(this)}></input>
                    <span className={`line-item-date ${this.displayFieldClass()}`}>{
                            this.isRecurringTransaction() 
                                            ? moment(this.props.lineItem.date).utcOffset(0).format('MMMM YYYY') 
                                            : moment(this.props.lineItem.date).utcOffset(0).format('M/D/YY')
                    }</span>
                    <button className={`line-item-date-button ${this.editableFieldClass()}`}
                            onClick={this.clickDateButton.bind(this)}>
                        {moment(this.state.dummyTransaction?.date).utcOffset(0).format('MMM DD YY')}
                    </button>
                    {this.state.showDatePicker && (<DatePicker selected={this.props.lineItem.date} inline onChange={this.changeDate.bind(this)} />)}
                </div>
                <span className={`line-item-cost ${this.displayFieldClass()}`}>${this.props.lineItem.cost}</span>
                <input className={`line-item-cost-input ${this.editableFieldClass()}`} 
                       type='number'
                       value={this.state.dummyTransaction?.cost || ''}
                       onChange={this.changeCost.bind(this)}/>
            </div>
        );
    }
}

export default connect(null, { editTransaction })(LineItemComponent);
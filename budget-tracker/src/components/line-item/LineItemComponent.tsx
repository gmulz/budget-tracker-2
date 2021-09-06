import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import Transaction from '../../model/LineItem';
import DatePicker from 'react-datepicker';
import './LineItemComponent.scss';
import { connect } from 'react-redux';
import { editTransaction, deleteTransaction } from '../../slices/transactionsSlice';
import Category from '../../model/Category';
import { RootState } from '../../redux/store';


interface LineItemProps {
    lineItem: Transaction,
    category: Category,
    categories: Category[],
    idx: number,
    editTransaction: (txn: Transaction) => Promise<any>,
    deleteTransaction: (txn: Transaction) => Promise<any>
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

    deleteButtonClick(e) {
        this.props.deleteTransaction(this.props.lineItem);
        this.setState({editing: false, showDatePicker: false});
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

    changeCategory(e) {
        let categoryId : number = e.target.value;
        this.setState( {dummyTransaction: {...this.state.dummyTransaction, category_id: categoryId} as Transaction})
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

    convertUTCToLocaleDate(utcDate: Date) {
        return new Date(utcDate.getFullYear(), utcDate.getMonth(), utcDate.getUTCDate());
    }

    render() { //todo allow edit category?
        return (
            <div className={`line-item ${this.props.idx % 2 === 0 ? 'even' : 'odd'}`}
                 onMouseOver={this.handleMouseOver.bind(this)}
                 onMouseLeave={this.handleMouseLeave.bind(this)}
                 ref={(node => { this.node = node})}>
                <div className={`line-item-display ${this.state.editing ? 'hide' : ''}`}>
                    <div className='line-item-left'>

                        <span className={`line-item-desc ${this.displayFieldClass()}`}>
                            {this.props.lineItem.description}
                            <span className={`fa fa-edit ${this.state.hovering ? '' : 'hide'}`} 
                                onClick={this.editButtonClick.bind(this)}></span>
                        </span>
                        
                        <span className={`line-item-date ${this.displayFieldClass()}`}>{
                                this.isRecurringTransaction() 
                                                ? moment(this.props.lineItem.date).utcOffset(0).format('MMMM YYYY') 
                                                : moment(this.props.lineItem.date).utcOffset(0).format('M/D/YY')
                        }</span>
                        
                    </div>
                    <span className={`line-item-cost ${this.displayFieldClass()}`}>${this.props.lineItem.cost}</span>

                </div>
                <div className={`line-item-editor ${this.state.editing ? '' : 'hide'}`}>
                    <span className={`fa fa-trash ${this.state.editing ? '' : 'hide'}`}
                                    onClick={this.deleteButtonClick.bind(this)}></span>
                    <input className={`line-item-desc-input ${this.editableFieldClass()}`}
                            value={this.state.dummyTransaction?.description || ''}
                            onChange={this.changeDescription.bind(this)}></input>
                    <button className={`line-item-date-button ${this.editableFieldClass()}`}
                                onClick={this.clickDateButton.bind(this)}>
                            {moment(this.state.dummyTransaction?.date).utcOffset(0).format('MMM DD YY')}
                        </button>
                        {this.state.showDatePicker && (<DatePicker selected={this.convertUTCToLocaleDate(this.props.lineItem.date)} inline onChange={this.changeDate.bind(this)} />)}
                    <input className={`line-item-cost-input ${this.editableFieldClass()}`} 
                        type='number'
                        value={this.state.dummyTransaction?.cost || ''}
                        onChange={this.changeCost.bind(this)}/>
                    <select value={this.props.lineItem.category_id} onChange={this.changeCategory.bind(this)}>
                        {this.props.categories.map(cat => {
                            return <option value={cat.id} key={cat.id}>{cat.description}</option>
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps) => {
    return {
        categories: state.categories.categories.filter(cat => !cat.is_recurring)
    }
}

export default connect(mapStateToProps, { editTransaction, deleteTransaction })(LineItemComponent);
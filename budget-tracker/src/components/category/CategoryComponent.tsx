import React from 'react';
import Category from '../../model/Category';
import Transaction from '../../model/LineItem';
import LineItemComponent from '../line-item/LineItemComponent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { postTransaction, postRecurringTransaction } from '../../slices/transactionsSlice'
import { putCategory, deleteCategory } from '../../slices/categorySlice';
import User from '../../model/User';
import { RootState } from '../../redux/store';
import BudgetAPIService from '../../services/apiService';
import './CategoryComponent.scss';
import { getMonthStartEndFromDate } from '../../utils/DateUtils';

interface CategoryProps {
    category: Category,
    transactions: Transaction[],
    postTransaction: (txn: Transaction) => Promise<any>,
    postRecurringTransaction: (txn: Transaction) => Promise<any>,
    putCategory: (category: Category) => Promise<any>,
    deleteCategory: (category: Category) => Promise<any>,
    user: User,
    start_date: Date,
    end_date: Date
}

interface CategoryState {
    editing: boolean,
    hovering: boolean,
    showDatePicker: boolean,
    selectedDate: Date,
    inputCost?: number,
    inputDesc: string,
    categoryEditName: string
}

class CategoryComponent extends React.Component<CategoryProps, CategoryState> {
    descriptionInput: HTMLInputElement | null = null;
    node: HTMLDivElement | null = null;
    outsideClickHandler: (e) => void;


    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            hovering: false,
            showDatePicker: false,
            selectedDate: new Date(),
            inputCost: undefined,
            inputDesc: '',
            categoryEditName: ''
        }
        this.outsideClickHandler = this.handleOutsideClick.bind(this);
    }

    handleMouseOver(e) {
        this.setState({hovering: true});
    }

    handleMouseLeave(e) {
        this.setState({hovering: false});
    }

    handleOutsideClick(e) {
        if (this.node && !this.node.contains(e.target)) {
            this.makeUnEditable();
        }
    }

    makeEditable() {
        this.setState( { editing: true, categoryEditName: this.props.category.description} );
        document.addEventListener('click', this.outsideClickHandler, false);
    }

    editButtonClick(e) {
        this.makeEditable();
    }

    async makeUnEditable() {
        document.removeEventListener('click', this.outsideClickHandler, false);
        //post to database
        await this.props.putCategory({...this.props.category, description: this.state.categoryEditName});
        this.setState({ editing: false, categoryEditName: ''});
    }

    clickDateButton(e) {
        e.preventDefault()
        this.setState({
            showDatePicker: !this.state.showDatePicker
        })
    }

    changeCategoryName(e) {
        this.setState({ categoryEditName: e.target.value });
    }

    changeDate(date: Date) {
        this.setState({ 
            selectedDate: date,
            showDatePicker: !this.state.showDatePicker
        });
        this.descriptionInput?.focus();
    }

    changeDesc(e) {
        this.setState({inputDesc: e.target.value});
    }

    changeCost(e) {
        this.setState({inputCost: Number(e.target.value)});
    }

    isRecurringCategory() {
        return this.props.category.is_recurring;
    }

    deleteButtonClick() {
        this.props.deleteCategory(this.props.category);
        this.makeUnEditable();
    }

    async postNewTransaction() {
        let description = this.state.inputDesc;
        let cost = this.state.inputCost;
        let date = this.isRecurringCategory() ? getMonthStartEndFromDate(this.state.selectedDate)[0] : this.state.selectedDate;
        if (description !== '' && cost != undefined) {
            let dummyTransaction = {
                description: description,
                cost: cost,
                date: date,
                category_id: this.props.category.id,
                user_id: this.props.user.id
            } as Transaction;
            let response;
            if (this.isRecurringCategory()) {
                response = await this.postRecurringTransaction(dummyTransaction);
            } else {
                response = await this.postOneTimeTransaction(dummyTransaction);
            }
            return response;
        }
        return null;
    }

    async postRecurringTransaction(transaction: Transaction) {
        let response;
        if (transaction.date > this.props.end_date || transaction.date < this.props.start_date) {
            response = await BudgetAPIService.postRecurringTransaction(transaction);
        }
        else {
            response = await this.props.postRecurringTransaction(transaction);
        }
        return response;
    }

    async postOneTimeTransaction(transaction : Transaction) {
        let response;
        if (transaction.date > this.props.end_date || transaction.date < this.props.start_date) {
            //date out of display range, post out of courtesy but don't add to state
            response = await BudgetAPIService.postTransaction(transaction);
            //todo add little text saying the transaction was added but will not be displayed
            //because it is out of date range
        } else {
            response = await this.props.postTransaction(transaction);
        }
        return response;
    }

    async onKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            let response = await this.postNewTransaction();
            if (response) {
                this.setState({
                    inputDesc: '',
                    inputCost: undefined
                });
                this.descriptionInput?.focus()
            }
        }
    }

    render() {
        let lineItems = this.props.transactions
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((lineItem, idx) => {
            return <LineItemComponent category={this.props.category} lineItem={lineItem} key={idx} idx={idx} />
        });
        return (//todo add delete category button, hide new expense creator if uncategorized
            <div className='category'>
                <div className='category-header'>
                    <div className='category-header-left' ref={(node => { this.node = node })}>
                        <div className={`category-title-area ${this.state.editing ? 'hide' : ''}`} 
                                onMouseOver={this.handleMouseOver.bind(this)}
                                onMouseLeave={this.handleMouseLeave.bind(this)}
                                >
                            <span className='category-title'>{this.props.category.description} </span>
                            <span className={`fa fa-edit ${this.state.hovering ? '' : 'hide'}`}
                                    onClick={this.editButtonClick.bind(this)}
                                    />
                        </div>
                        <div className={`category-editor ${this.state.editing ? '' : 'hide'}`}>
                            <span className={`fa fa-trash ${this.props.category.is_recurring ? 'hide' : ''}`} onClick={this.deleteButtonClick.bind(this)}></span>
                            <input type='text' value={this.state.categoryEditName} onChange={this.changeCategoryName.bind(this)}/>
                        </div>
                        <div onKeyPress={this.onKeyPress.bind(this)} className={`new-line-item-creator ${this.props.category.id == -1 ? 'hide' : ''}`}>
                            New expense: <input type='text' 
                                value={this.state.inputDesc} 
                                onChange={this.changeDesc.bind(this)}
                                ref={(input) => this.descriptionInput = input}
                                placeholder='Description'></input>
                            <input type='number' 
                                value={this.state.inputCost || ''} 
                                onChange={this.changeCost.bind(this)}
                                placeholder='Cost'></input>
                            {!this.isRecurringCategory() && <button className='date-button' onClick={this.clickDateButton.bind(this)}>
                                {moment(this.state.selectedDate).format('MMM DD YY')}
                            </button>}
                            {this.state.showDatePicker && (<DatePicker selected={this.state.selectedDate} inline onChange={this.changeDate.bind(this)}></DatePicker>)}
                        </div>
                    </div>
                    <div className='category-header-right'>
                        <span className='category-total'>${this.props.transactions.reduce((acc, curr) => acc + curr.cost , 0)}</span>

                    </div>
                </div>
                <div className='line-items-container'>
                    {lineItems}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, ownProps) => {
    return {
        user: state.user.selectedUser,
        start_date: state.dateRange.start_date,
        end_date: state.dateRange.end_date
    }
}


export default connect(mapStateToProps, { postTransaction, postRecurringTransaction, putCategory, deleteCategory })(CategoryComponent);
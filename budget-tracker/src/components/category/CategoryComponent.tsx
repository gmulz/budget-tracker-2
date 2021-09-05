import React from 'react';
import Category from '../../model/Category';
import Transaction from '../../model/LineItem';
import LineItemComponent from '../line-item/LineItemComponent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { postTransaction, postRecurringTransaction } from '../../slices/transactionsSlice'
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
    user: User,
    start_date: Date,
    end_date: Date
}

interface CategoryState {
    editing: boolean,
    showDatePicker: boolean,
    selectedDate: Date,
    inputCost?: number,
    inputDesc: string
}

class CategoryComponent extends React.Component<CategoryProps, CategoryState> {
    descriptionInput: HTMLInputElement | null = null;

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showDatePicker: false,
            selectedDate: new Date(),
            inputCost: undefined,
            inputDesc: ''
        }
    }

    clickDateButton(e) {
        e.preventDefault()
        this.setState({
            showDatePicker: !this.state.showDatePicker
        })
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
            console.log(description);
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
        let lineItems = this.props.transactions.map((lineItem, idx) => {
            return <LineItemComponent lineItem={lineItem} key={idx} idx={idx} />
        });
        return (
            <div className='category'>
                <div className='category-header'>
                    <div className='category-header-left'>
                        <div>
                            <span className='category-title'>{this.props.category.description} </span>
                        </div>
                        <div onKeyPress={this.onKeyPress.bind(this)} className='new-line-item-creator'>
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


export default connect(mapStateToProps, { postTransaction, postRecurringTransaction })(CategoryComponent);
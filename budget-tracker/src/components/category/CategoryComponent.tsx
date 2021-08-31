import React from 'react';
import Category from '../../model/Category';
import Transaction from '../../model/LineItem';
import LineItemComponent from '../line-item/LineItemComponent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { postTransaction } from '../../slices/transactionsSlice'
import User from '../../model/User';
import { RootState } from '../../redux/store';

interface CategoryProps {
    category: Category,
    transactions: Transaction[],
    postTransaction: (txn: Transaction) => void,
    user: User
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

    onEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            let description = this.state.inputDesc;
            let cost = this.state.inputCost;
            let date = this.state.selectedDate;
            if (description !== '' && cost != undefined) {
                this.props.postTransaction({
                    description: description,
                    cost: cost,
                    date: date,
                    category_id: this.props.category.id,
                    user_id: this.props.user.id
                } as Transaction)
            }
            this.setState({
                inputDesc: '',
                inputCost: undefined
            })
        }
    }

    render() {
        let lineItems = this.props.transactions.map((lineItem, idx) => {
            return <LineItemComponent lineItem={lineItem} key={idx} />
        });
        return (
            <div>
                <div className='line-item-header'>
                    <div>
                        <span className='category-title'>{this.props.category.description} </span>
                        <span className='category-total'>${this.props.transactions.reduce((acc, curr) => acc + curr.cost , 0)}</span>
                    </div>
                    <div onKeyPress={this.onEnter.bind(this)}>
                        <input type='text' 
                               value={this.state.inputDesc} 
                               onChange={this.changeDesc.bind(this)}
                               ref={(input) => this.descriptionInput = input}></input>
                        <input type='number' value={this.state.inputCost || ''} onChange={this.changeCost.bind(this)}></input>
                        <button className='date-button' onClick={this.clickDateButton.bind(this)}>
                            {moment(this.state.selectedDate).format('MMM DD YY')}
                        </button>
                        {this.state.showDatePicker && (<DatePicker selected={this.state.selectedDate} inline onChange={this.changeDate.bind(this)}></DatePicker>)}
                    </div>
                </div>
                {lineItems}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, ownProps) => {
    return {
        user: state.user.selectedUser
    }
}


export default connect(mapStateToProps, { postTransaction })(CategoryComponent);
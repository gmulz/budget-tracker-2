import React from 'react';
import CategoryComponent from '../../components/category/CategoryComponent';
import Category from '../../model/Category';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { RootState } from '../../redux/store';
import { fetchCategories } from '../../slices/categorySlice';
import { fetchTransactions } from '../../slices/transactionsSlice';
import User from '../../model/User';
import Transaction from '../../model/LineItem';

interface CategoryBlottersProps {
    categories: Category[],
    transactions: Transaction[],
    user: User,
    start_date: Date,
    end_date?: Date,
    fetchCategories: () => void,
    fetchTransactions: (info: {user: User, start_date: Date, end_date?: Date}) => void
}

class CategoryBlotters extends React.Component<CategoryBlottersProps, {}> {
    async componentDidMount() {
        this.props.fetchCategories();
    }

    componentDidUpdate(prevProps : CategoryBlottersProps) {
        if (prevProps.user !== this.props.user || prevProps.start_date.getTime() !== this.props.start_date.getTime() || prevProps.end_date?.getTime() !== this.props.end_date?.getTime()) {
            if (this.props.end_date == null) {
                return;
            }
            this.props.fetchTransactions({user: this.props.user, start_date: this.props.start_date, end_date: this.props.end_date});
        }
    }

    render() {
        let categories = this.props.categories.map((category, idx) => {
            let transactions = this.props.transactions.filter(transaction => transaction.category_id == category.id);
            return <CategoryComponent category={category} key={idx} transactions={transactions}/>
        })
        return categories;
    }
}

const mapStateToProps = (state: RootState, ownProps) => {
    return {
        categories: state.categories.categories,
        transactions: state.transactions.transactions,
        user: state.user.selectedUser,
        start_date: new Date(state.dateRange.start_date),
        end_date: state.dateRange.end_date ? new Date(state.dateRange.end_date) : undefined
    }
}

export default connect(mapStateToProps, { fetchCategories, fetchTransactions })(CategoryBlotters)
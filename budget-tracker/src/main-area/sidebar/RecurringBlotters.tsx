import React from 'react';
import './RecurringBlotters.scss';
import { connect } from 'react-redux';
import Transaction from '../../model/LineItem';
import Category from '../../model/Category';
import { RootState } from '../../redux/store';
import CategoryComponent from '../../components/category/CategoryComponent';

interface RecurringBlottersProps {
    transactions: Transaction[];
    recurringCategories: Category[];
}


class RecurringBlotters extends React.Component<RecurringBlottersProps, {}> {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        //fetch recurring categories
    }

    componentDidUpdate(prevProps: {}) {
        //fetch recurring transactions
    }

    render() {
        let categories = this.props.recurringCategories.map((category, idx) => {
            let transactions = this.props.transactions.filter(transaction => transaction.category_id === category.id);
            return <CategoryComponent category={category} key={idx} transactions={transactions} />
        })
        return (<div className='recurring-blotters-sidebar'>
            <div className='recurring-categories-container'>
                {categories}
            </div>
        </div>)
    }
}

const mapStateToProps = (state: RootState, ownProps) => {
    return {
        transactions: state.transactions.transactions,
        recurringCategories: state.categories.categories.filter(cat => cat.is_recurring)
    } as RecurringBlottersProps
}

export default connect(mapStateToProps, {})(RecurringBlotters);
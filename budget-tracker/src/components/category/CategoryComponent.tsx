import React from 'react';
import Category from '../../model/Category';
import Transaction from '../../model/LineItem';
import LineItemComponent from '../line-item/LineItemComponent';

interface CategoryProps {
    category: Category
    transactions: Transaction[]
}

interface CategoryState {
    editing: boolean
}

class CategoryComponent extends React.Component<CategoryProps, CategoryState> {

    render() {
        let lineItems = this.props.transactions.map((lineItem, idx) => {
            return <LineItemComponent lineItem={lineItem} key={idx} />
        });
        return (
            <div>
                <div>
                    <span className='category-title'>{this.props.category.description} </span>
                    <span className='category-total'>${this.props.transactions.reduce((acc, curr) => acc + curr.cost , 0)}</span>
                </div>
                {lineItems}
            </div>
        )
    }
}

export default CategoryComponent;
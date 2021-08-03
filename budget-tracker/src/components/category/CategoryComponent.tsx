import React from 'react';
import Category from '../../model/Category';
import LineItemComponent from '../line-item/LineItemComponent';

interface CategoryProps {
    category: Category
}

interface CategoryState {
    editing: boolean
}

class CategoryComponent extends React.Component<CategoryProps, CategoryState> {

    render() {
        let lineItems = this.props.category.lineItems.map(lineItem => {
            return <LineItemComponent lineItem={lineItem} />
        });
        return (
            <div>
                <div>
                    <span className='category-title'>{this.props.category.title} </span>
                    <span className='category-total'>{this.props.category.total}</span>
                </div>
                {lineItems}
            </div>
        )
    }
}

export default CategoryComponent;
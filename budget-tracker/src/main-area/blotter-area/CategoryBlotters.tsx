import React from 'react';
import CategoryComponent from '../../components/category/CategoryComponent';
import Category from '../../model/Category';

interface CategoryBlottersProps {
    categories: Category[]
}

export class CategoryBlotters extends React.Component<CategoryBlottersProps> {
    render() {
        let categories = this.props.categories.map(category => {
            return <CategoryComponent category={category} />
        })
        return categories;
    }
}
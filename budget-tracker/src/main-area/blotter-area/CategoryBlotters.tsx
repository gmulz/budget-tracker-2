import React from 'react';
import CategoryComponent from '../../components/category/CategoryComponent';
import Category from '../../model/Category';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchCategories } from '../../slices/categorySlice';

interface CategoryBlottersProps {
    categories: Category[],
    fetchCategories: () => void
}

class CategoryBlotters extends React.Component<CategoryBlottersProps, {}> {
    async componentDidMount() {
        this.props.fetchCategories()
    }
    render() {
        let categories = this.props.categories.map(category => {
            return <CategoryComponent category={category} />
        })
        return categories;
    }
}

const mapStateToProps = (state: RootState, ownProps) => {
    return {
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps, { fetchCategories })(CategoryBlotters)
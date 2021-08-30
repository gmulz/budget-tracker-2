import LineItem from './LineItem';

interface Category {
    total: number
    title: string,
    lineItems: LineItem[]
}

export default Category;
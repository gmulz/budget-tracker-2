import Transaction from './LineItem';

interface Category {
    total: number
    title: string,
    lineItems: Transaction[]
}

export default Category;
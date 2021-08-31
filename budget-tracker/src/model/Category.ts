import Transaction from './LineItem';

interface Category {
    total: number,
    id: number,

    description: string,
    lineItems: Transaction[]
}

export default Category;
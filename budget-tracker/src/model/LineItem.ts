interface Transaction {
    description: string,
    date: Date,
    cost: number,
    id: number,
    category_id: number,
    user_id: number
}

export default Transaction;
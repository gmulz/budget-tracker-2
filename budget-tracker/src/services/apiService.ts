import { apiURL } from "../environment";
import User from '../model/User';
import Transaction from "../model/LineItem";
import { formatDateYearMonthDay, LATE_DATE } from '../utils/DateUtils';
import { transactions } from "../slices/transactionsSlice";

const POST_INFO = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
}

class BudgetAPIService {
    static async getAllUsers() {
        let response = await fetch(apiURL + "/users/");
        return await response.json();
    }

    static async getAllCategories() {
        let response = await fetch(apiURL + "/categories/");
        return await response.json();
    }

    static async getTransactionsForUserAndDateRange(user: User, start_date: Date, end_date?: Date) {
        let userId = user.id;
        let startDate = formatDateYearMonthDay(start_date);
        let endDate = formatDateYearMonthDay(LATE_DATE);
        if (end_date != null) {
            endDate = formatDateYearMonthDay(end_date);    
        }

        let response = await fetch(apiURL + `/transactions/transactions_for_user/?user=${userId}&start_date=${startDate}&end_date=${endDate}`);
        let txns = await response.json() as any[];
        let transactions = txns.map(val => {
            return {
                description: val.description,
                date: new Date(val.date),
                id: val.id,
                category_id: val.category_id,
                user_id: val.user_id,
                cost: val.cost
            } as Transaction
        });
        return transactions;
    }

    static async postTransaction(transaction: Transaction) {
        let response = await fetch(apiURL + '/transactions/create_transaction/', {
            ...POST_INFO,
            body: JSON.stringify({
                description: transaction.description,
                date: formatDateYearMonthDay(transaction.date),
                cost: transaction.cost,
                category: transaction.category_id,
                user: transaction.user_id
            })
        });
        let responseObj = await response.json();
        return {...transaction, id: responseObj.id} as Transaction
    }
}

export default BudgetAPIService
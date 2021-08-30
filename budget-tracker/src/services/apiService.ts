import { apiURL } from "../environment";
import User from '../model/User';

class BudgetAPIService {
    static async getAllUsers() {
        let response = await fetch(apiURL + "/users/");
        return await response.json();
    }

    static async getTransactionsForUserAndDateRange(user: User, start_date: Date, end_date: Date) {
        let response = await fetch(apiURL + `/transactions/transactions_for_user/?user=${user.id}&start_date=${start_date}&end_date=${end_date}`);
        return await response.json();
    }

}

export default BudgetAPIService
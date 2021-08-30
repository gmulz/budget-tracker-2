import { apiURL } from "../environment";

class BudgetAPIService {
    static async getAllUsers() {
        let response = await fetch(apiURL + "/users/", { mode: 'cors', });
        return await response.json();
    }
    
}

export default BudgetAPIService
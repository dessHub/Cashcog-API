import fetch from 'node-fetch';

import Expense from '../models/expense';

export const listenToNewExpense = async () => {
    const api = 'https://cashcog.xcnt.io/single';

    return await fetch(api)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let expense = Expense(data)
            expense.save()
                .then( response => {
                console.log("successfully created", response)
                return response
                })
                .catch(error => {
                console.log("Error creating expense", error);
                return error
                })
        })
        .catch(error => {
            console.log("Error fetching expense", error)
            return error
        })
    
    
}


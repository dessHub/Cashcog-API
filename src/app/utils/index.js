import fetch from 'node-fetch';

import Expense from '../models/expense';

export const listenToNewExpense = async () => {
    const api = 'https://cashcog.xcnt.io/single';

    await fetch(api)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let expense = Expense(data)
            expense.save((err, record) => {
                if(err) {
                  console.log("Error creating expense", err);
                } 
                console.log("successfully create", record)
            })
            return data;
        })
        .catch(error => {
            console.log("Error fetching expense", error)
            return error
        })
    
    
}


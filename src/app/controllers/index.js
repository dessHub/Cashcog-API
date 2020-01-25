import Expense from '../models/expense';

let controller = {};

controller.index = async (req, res) => {
    console.log("getting here")
    return await Expense.find()
    .then(expenses => {
        return res.status(200).send(expenses)
    })
    .catch(error => res.status(400).send(error))
 }
 
 export default controller;
import Expense from '../models/expense';

let controller = {};

controller.getAllExpenses = async (req, res) => {
    console.log("getting here")
    return await Expense.find()
    .then(expenses => {
        return res.status(200).send(expenses)
    })
    .catch(error => res.status(400).send(error))
 }

controller.updateExpense = async (req, res) => {
    const uuid = req.params.uuid;
    return await Expense.findOneAndUpdate({
        uuid
    },
    {
        approved: req.body.approved
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(expense => {
        console.log("exe", expense)
        return res.status(200).send({
            "message": "Record updated successfully",
            expense
        })
    })
    .catch(error => res.status(400).send({
        "message": error.message}))
 }

controller.deleteExpense = async (req, res) => {
    const uuid = req.params.uuid;
    return await Expense.findOneAndRemove({
        uuid
    })
    .then(expense => {
        return res.status(200).send({
            "message": "Record removed successfully",
            expense
        })
    })
    .catch(error => res.status(400).send({
        "message": error.message}))
}
 
 export default controller;
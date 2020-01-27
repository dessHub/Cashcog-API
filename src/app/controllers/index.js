import Expense from '../models/expense';

let controller = {};

controller.getAllExpenses = async (req, res) => {
    return await Expense.find()
    .then(expenses => {
        return res.status(200).send(expenses)
    })
    .catch(error => res.status(400).send(error))
 }

 controller.getOneExpense = async (req, res) => {
     try {
         return res.status(200).send({
             "Expense": res.expense
         })
     } catch (error){
         return res.status(400).send({
             "message": error.message})
     } 
  }

controller.updateExpense = async (req, res) => {
    try {
        await res.expense.save();
        return res.status(200).send({
            "message": "Expense updated successfully"
        })
    } catch (error){
        return res.status(400).send({
            "message": error.message})
    } 
 }

// function to remove a record from db
controller.deleteExpense = async (req, res) => {
    try {
        await res.expense.remove();
        return res.status(200).send({
            "message": "Expense removed successfully"
        })
    } catch (error){
        return res.status(400).send({
            "message": error.message})
    } 

}

// Middleware function for getting expense by uuid
export const getExpense = async (req, res, next) => {
    let expense
    try {
        expense = await Expense.findOne({uuid: req.params.uuid})
        if (expense == null) {
          return res.status(404).json({ message: 'Cant find expense'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.expense = expense
    next()
}

// Middleware function to validate patch payload
export const validateInputBody = async (req, res, next) => {
    if(!req.body || !req.body.approved) 
       return res.status(400).json({message: "Approved form field is required"});

    let validValues = ['Pending', 'Declined', 'Approved',];

    if (!validValues.includes(req.body.approved))
        return res.status(400).json({message: "'Declined' and 'Approved' are valid values"})

    res.expense.approved = req.body.approved
    next()
}
 
 export default controller;
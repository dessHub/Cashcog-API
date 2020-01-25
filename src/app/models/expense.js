
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// create a schema
let expenseSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  approved: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Declined', 'Approved',]
  },
  created_at: { 
    type: Date, 
    default: Date.now() 
  },
  employee: {
    uuid: {
      type: String,
      unique: true
    },
    first_name: { 
      type: String,
      required: true
    },
    last_name: { 
      type: String, 
      required: true 
    }
  }

});

var Expense = mongoose.model('User', expenseSchema);

module.exports = Expense;
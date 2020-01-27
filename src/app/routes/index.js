import express from 'express';

import controllers, { getExpense, validateInputBody } from '../controllers';

const router = express.Router();

const { getAllExpenses, getOneExpense, updateExpense, deleteExpense } = controllers;

router.get('/expenses', getAllExpenses);
router.get('/expense/:uuid', getExpense, getOneExpense);
router.patch('/expense/:uuid', getExpense, validateInputBody, updateExpense);
router.delete('/expense/:uuid', getExpense, deleteExpense);

module.exports = router;
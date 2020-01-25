import express from 'express';

import controllers from '../controllers';

const router = express.Router();

router.get('/expenses', controllers.getAllExpenses);
router.patch('/expense/:uuid', controllers.updateExpense);
router.delete('/expense/:uuid', controllers.deleteExpense);

module.exports = router;
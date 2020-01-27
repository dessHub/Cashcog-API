import request from 'supertest';
import app from '../index';
import Expense from '../models/expense';
import { clearDatabase, closeDatabase } from '../db/connect';

describe('Test the root path', () => {
    beforeAll(async() => {
      const expenseObject =
        {
            "uuid": "92b19fc6-5386-4985-bf5c-dc56c903dd23",
            "description": "Itaque fugiat repellendus velit deserunt praesentium.",
            "created_at": "2019-09-22T23:07:01",
            "amount": 2291,
            "currency": "UZS",
            "employee": {
                "uuid": "858142ac-299a-48f0-b221-7d6de9439454",
                "first_name": "Birthe",
                "last_name": "Meier"
             }
        }
      let expense = Expense(expenseObject)
      await expense.save();
    });

    /**
     * Clear all test data after every test.
     *
     * Remove and close the db and server.
     */
    afterAll(async () => {
        await clearDatabase()
        await closeDatabase();
    });

    test('It should response the GET method', async() => {
      const response = await request(app).get('/api/expenses');
      expect(response.statusCode).toBe(200);
    });

    test('It should get one expense by UUID', async() => {
        const response = await request(app).get('/api/expense/92b19fc6-5386-4985-bf5c-dc56c903dd23');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).Expense.uuid).toEqual('92b19fc6-5386-4985-bf5c-dc56c903dd23')
      });
  
    test('It should update an expense', async() => {
        const payload = { approved: 'Approved' }
        const response = await request(app).patch('/api/expense/92b19fc6-5386-4985-bf5c-dc56c903dd23')
            .set('Content-Type', 'application/json')
            .send(payload)
        expect(JSON.parse(response.text).message).toEqual('Expense updated successfully')
    });

    test('It should check if expense exist before update', async() => {
        const response = await request(app).patch('/api/expense/090990')
            .set('Content-Type', 'application/json')
        expect(JSON.parse(response.text).message).toEqual("Cant find expense")
    });

    test('It should not update an expense with withoud approved field', async() => {
        const response = await request(app).patch('/api/expense/92b19fc6-5386-4985-bf5c-dc56c903dd23')
            .set('Content-Type', 'application/json')
        expect(JSON.parse(response.text).message).toEqual("Approved form field is required")
    });

    test('It should not update an expense with wrong approved value', async() => {
        const payload = { approved: 'Random' }
        const response = await request(app).patch('/api/expense/92b19fc6-5386-4985-bf5c-dc56c903dd23')
            .set('Content-Type', 'application/json')
            .send(payload)
        expect(JSON.parse(response.text).message).toEqual("'Declined' and 'Approved' are valid values")
    });

    test('It should delete an expense', async() => {
        const response = await request(app).delete('/api/expense/92b19fc6-5386-4985-bf5c-dc56c903dd23');
        expect(JSON.parse(response.text).message).toEqual('Expense removed successfully')
    });
});
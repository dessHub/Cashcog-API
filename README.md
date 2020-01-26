
[![Build Status](https://travis-ci.org/dessHub/Cashcog-API.svg?branch=master)](https://travis-ci.org/dessHub/Cashcog-API)

# Cashcog-Approval-API
Cashcog Approval API is a extension feature which provide approval process for Cashcog expense management software.


**Technologies
 - [Nodejs](https://nodejs.org/) - Javascript runtime
 - [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework.
 - [Mongodb](https://www.mongodb.com/) - MongoDB is a schema-less NoSQL document database.
 - [Helmet](https://helmetjs.github.io/docs/) - Package to secure the API.

**How to set up locally**
* clone the repo

     `git clone https://github.com/dessHub/Cashcog-API.git`

* Install mongodb and create database  both for development.
* Copy `.env.example` to `.env` and update the values.
* Install dependencies

     `npm install`

* start the application with

     `npm start`

* Run the tests

     `npm run test`

**API features**
* fetching and creating expenses
* displaying all expenses
* deleting expense
* updating expense
* get the expense by uuid

**Endpoints exposed by the API**


Endpoint                    |  Functionality
 ------------------------   |   ------------------------
GET /api/expenses              | get all expenses
GET /api/expense/:uuid         | get expense with the given uuid
UPDATE /api/expense/:uuid       | update expense with the given id
DELETE /api/expense/:uuid       | delete expense with the given id

**Endpoint payload**

* PATCH /api/expense/:uuid
```
{
  "approved": "Approved" or "Declined"
}
```


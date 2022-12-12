let express = require('express');
let taskRouter = express.Router();
const serverFunctions = require('../modules/taskList');

const pg = require('pg');

const Pool = pg.Pool;

// DB CONNECTION
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000, 
});

pool.on('connect', ()=> {
    console.log('postgres is connected');
});

pool.on('error', (error)=> {
    console.log('error connecting to the database: ', error);
});

//GET request to db
taskRouter.get('/', function(req, res) {
    console.log('GET request for task list was made');
    //add SQL request as variable here
    let queryText = 'SELECT * FROM tasks';
    //new pool query with SQL
    pool.query(queryText)
    .then((result) => {
        console.log(`this is your GET response from db: ${result}`);
        //send db result to client
        res.send(result.rows);
    })
    //add error catch
    .catch((error) => {
        console.log(`error making GET query to db: ${error}`);
        //send error status to client
        res.sendStatus(error);
    })
});

//POST request to db
taskRouter.post('/', function(req, res) {
    console.log(`in the newupdate task POST request with ${req.body.task} and completion status: ${req.body.complete}`);
    
    //make variables for req.body
    const newTask = req.body; 
    const task = req.body.task;
    const status = req.body.complete;
    const title = req.body.title;
    const idNo = req.body.idNo;

    //if statement to capture if data is a new task
    if (task && status === 'no') {
    //add SQL insert as variable here
        const queryText = `
        INSERT INTO "tasks" ("task", "complete")
        VALUES ('${task}', '${status}');
        `;
        console.log(`you are creating new task: ${task}`);

        //make pool query to db here with SQL variable
        pool.query(queryText)
        .then((result) => {
            //send new task POST created status here
            res.sendStatus(201); 
        })
        //add error CATCH here
            .catch((error) => {
                console.log('error making new task POST query: ', error);
                //send server status error
                res.sendStatus(error);
        });
    }
    //if statement to capture if data status is to be UPDATED to YES
    if (title && status === 'yes') {
        //add SQL insert as variable here
        const queryText = `
        UPDATE "tasks" SET "complete"='yes' WHERE "task"='${title}' AND "id"=${idNo};
        `;
        console.log(`you are updating status of: "${title}" with ID number "${idNo}" to complete`);
    
        //make pool query to db here with SQL variable
        pool.query(queryText)
        .then((result) => {
            //send new task POST created status here
            res.sendStatus(201); 
        })
        //add error CATCH here
            .catch((error) => {
                console.log('error making new task POST query: ', error);
                //send server status error
                res.sendStatus(error);
        });
    }
    if (title && status === 'no') {
        //add SQL insert as variable here
        const queryText = `
        UPDATE "tasks" SET "complete"='no' WHERE "task"='${title}' AND "id"=${idNo};
        `;
        console.log(`you are updating ${task} with ID number ${idNo} to incomplete`);
    
        //make pool query to db here with SQL variable
            pool.query(queryText)
            .then((result) => {
                //send new task POST created status here
                res.sendStatus(201); 
            })
            //add error CATCH here
                .catch((error) => {
                    console.log('error making new task POST query: ', error);
                    //send server status error
                    res.sendStatus(error);
            });
        }
});

//DELETE route to db
taskRouter.delete('/', function(req, res) {
    console.log(`DELETE request for task list was made for ${req.body}`);
    //add SQL request as variable here
    let queryText = `
    DELETE FROM tasks WHERE task='${req.body.title}' AND "id"=${req.body.idNo};
    `;
    //new pool query with SQL
    pool.query(queryText)
    .then((result) => {
        console.log(`this is your DELETE response from db: ${result}`);
        //send db result to client
        res.send(result.rows);
    })
    //add error catch
    .catch((error) => {
        console.log(`error making GET query to db: ${error}`);
        //send error status to client
        res.sendStatus(error);
    })
});

module.exports = taskRouter;
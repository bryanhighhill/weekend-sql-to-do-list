let express = require('express');
let taskRouter = express.Router();

const serverFunctions = require('../modules/taskList');
const pool = require('../modules/pool');


// -------------------------------------------------------------------------- GET REQUESTS ------------------------------

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
        res.sendStatus(200);
    })
    //add error catch
    .catch((error) => {
        console.log(`error making GET query to db: ${error}`);
        //send error status to client
        res.sendStatus(error);
    })
});

//GET REQUEST TO DB TARGETING ID
taskRouter.get('/:id', (req, res) => {
    console.log(`hello from get id request, ${req.params.id}`);
    const queryText = `Select * from tasks WHERE id = ${req.params.id};`;
    pool.query(queryText)
    .then((result) => {
        console.log('results from DB', result);
        res.sendStatus(200);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error making a query: ', error);
        res.sendStatus(500);
    });
});


// -------------------------------------------------------------------------- POST REQUESTS ------------------------------

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


// -------------------------------------------------------------------------- DELETE REQUESTS ------------------------------

//DELETE REQUEST TO DB - NEW ONE
// taskRouter.delete('/:id', (req, res) => {
//     let reqId= req.params.id;
//     console.log(`delete request was made for ${req.params.id}`);

//     const queryText = `DELETE from tasks WHERE id = ${req.params.id};`;

//     pool.query(queryText, [reqId])
//     .then((result) => {
//         console.log('task deleted');
//         res.sendStatus(204);
//     })
//     .catch((error) => {
//         console.log(`error making a query: ${queryText}, has error: ${error}`);
//         res.sendStatus(500);
//     })
// })

//------------------------DELETE ROUTE TO DB - HOW I GOT IT TO WORK BEFORE OUR LECTURE ON DELETE ROUTES
taskRouter.delete('/', function(req, res) {
    console.log(`DELETE request for task list was made for ${req.body}`);
    // add SQL request as variable here
    let queryText = `
    DELETE FROM tasks WHERE task='${req.body.title}' AND "id"=${req.body.idNo};
    `;
    // new pool query with SQL
    pool.query(queryText)
    .then((result) => {
        console.log(`this is your DELETE response from db: ${result}`);
        //send db result to client
        res.send(result.rows);
    })
    // add error catch
    .catch((error) => {
        console.log(`error making GET query to db: ${error}`);
        //send error status to client
        res.sendStatus(error);
    })
});

module.exports = taskRouter;
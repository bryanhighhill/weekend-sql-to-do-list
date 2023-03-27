let express = require('express');
let taskRouter = express.Router();

const pool = require('../modules/pool');


// ----------------------------------------------- GET REQUEST ------------------------------

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


// --------------------------------------------- POST REQUEST ------------------------------

taskRouter.post('/', function (req, res) {
    console.log(`in the newupdate task POST request with ${req.body.task} and completion status: ${req.body.complete}`);
     //make variables for req.body
     const task = req.body.task;
     const status = req.body.complete;

     if (req.body.task == "drop table;") {
     return 
}

         
    //add SQL insert as variable here - SANITIZE!
    const queryText = `
    INSERT INTO "tasks" ("task", "complete")
    VALUES ($1, $2);`;
    
    //make pool query to db here with SQL variable
    pool.query(queryText, [task, status])
    .then((result) => {
        //send new task POST created status here
        // res.send("HEY IM TESTING SOMETHING")
        res.sendStatus(201); 
    })
    //add error CATCH here
        .catch((error) => {
            console.log('error making new task POST query: ', error);
            //send server status error
            res.sendStatus(error);
        })
 })

 
 // ----------------------------------------------------- PUT REQUESTS ------------------------------
 
 taskRouter.put('/complete/:id', (req, res) => {
     console.log(`this task id is: ${req.params.id}`);
     console.log(`task is complete: ${req.body.complete}`);
     
     const id = req.params.id;
     const complete = req.body.complete;
     
     if (complete == 'no') {
         //add SQL insert as variable here 
         queryText = `
         UPDATE "tasks" SET "complete"='yes' WHERE "id"=$1;
         `;
        } else if (complete == 'yes') {
            //add SQL insert as variable here
            queryText = `
            UPDATE "tasks" SET "complete"='no' WHERE "id"=$1;
            `;
        } else {
            res.sendStatus(500);
            return;
        }
        pool.query(queryText, [id])
        .then((dbResponse) => {
            console.log(`response from db: ${dbResponse}`);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    })
    
    
    // ------------------------------------------------------- DELETE REQUESTS ------------------------------
    taskRouter.delete('/:id', (req, res) => {
        console.log(`DELETE request for task list was made for id# ${req.params.id}`);
        
        // add SQL request as variable here
        const queryText = `
        DELETE FROM tasks WHERE "id"=${req.params.id};`;

        // new pool query with SQL
        pool.query(queryText)
        .then((result) => {
            console.log(`this is your DELETE response from db: ${result}`);

            //send pos status
            res.sendStatus(204);
        })
        // add error catch
        .catch((error) => {
            console.log(`error making DELETE query to db: ${error}`);
            //send error status to client
            res.sendStatus(500);
        })
    })

module.exports = taskRouter;
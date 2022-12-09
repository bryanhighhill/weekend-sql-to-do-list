let express = require('express');
let taskRouter = express.Router();
const serverFunctions = require('../modules/taskList');

const pg = require('pg');

const Pool = pg.Pool;

// DB CONNECTION
const pool = new Pool({
    database: 'task_list',
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
    console.log('request for /tasks was made');
    //add SQL request here

    res.send();
});

//POST request to db
taskRouter.post('/', function(req, res) {
    console.log(`in the new task POST request with ${req.body}`);
    
    //make variable for req.body (new task)
    const newTask = req.body; 

    //add SQL insert as variable here
    const queryText = `
    INSERT INTO "tasks" ("task", "complete")
    VALUES ('${newTask.task}', '${newTask.complete}');
    `;
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
});

    





// router.post('/', function(req, res) {
//     console.log('in the post request', req.body); //access data being sent in POST request using req.body
//     if(req.body) {
//         taskList.push(req.body);
//         res.sendStatus(201);
//     } else {
//         res.sendStatus(500);
//     }
// });

module.exports = taskRouter;
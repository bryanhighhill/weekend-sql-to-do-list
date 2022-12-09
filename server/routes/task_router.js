let express = require('express');
let router = express.Router();
const serverFunctions = require('../modules/taskList');



router.get('/', function(req, res) {
    console.log('request for /tasks was made');
    res.send(serverFunctions.taskList);
});

router.post('/', function(req, res) {
    console.log('in the post request', req.body); //access data being sent in POST request using req.body
    if(req.body) {
        // serverFunctions.taskList.push(req.body);
        serverFunctions.statusUpdate(req.body);
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
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

module.exports = router;
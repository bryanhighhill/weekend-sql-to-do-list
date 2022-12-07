let express = require('express');
let router = express.Router();
const taskList = require('../modules/taskList');



router.get('/', function(req, res) {
    console.log('request for /tasks was made');
    res.send(taskList);
});

router.post('/', function(req, res) {
    console.log('in the post request', req.body); //access data being sent in POST request using req.body
    if(req.body) {
        taskList.push(req.body);
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;
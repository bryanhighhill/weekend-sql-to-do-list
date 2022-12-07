const express = require('express');

const app = express();
const port = 5001;

app.use(express.static('server/public'));
app.use(express.urlencoded());

//add router
const taskRouter = require('./routes/task_router');

app.use('/tasks', taskRouter);

app.listen(port, () => {
    console.log('listening on port, ', port);
});

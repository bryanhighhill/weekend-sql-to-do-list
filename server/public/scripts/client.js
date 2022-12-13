console.log('in my client.js file now');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');

    //function to retrieve current task list from server/database
    getTasks();

    //on-click event for submit task button
    $('#submit-task-btn').on('click', submitTask);

    //future task complete button function
    $('#task-list').on('click', '.complete-btn', taskComplete);
    //future task incomplete button function
    $('#task-list').on('click', '.incomplete-btn', taskIncomplete);
    //future delete button function
    $('#task-list').on('click', '.delete', taskDelete);
};

//function to POST new task to server => db
function submitTask() {
    let newTask = $('#task-input').val();
    if (newTask === ''){
        alert('task cannot be blank!');
        return false;
    }
        $.ajax({
            method: 'POST',
            url: '/tasks',
            //create new task object here
            data: {
                task: newTask,
                //have new task default be incomplete
                complete:'no',
            }
        }).then(function(response){
            console.log('new task POST response from the server: ', response);
            
            //GET tasks here
            getTasks();
            
            //clear task input value here
            $('#task-input').val('');

        //add error catch
        }).catch(function(error){
            alert(error.responseText);
            console.log(error);
        });
};

//function to GET tasks from server/database
function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response){
        console.log(`this is the task list GET response from server: ${response}`);

        //sort response in order of id
        let sortedResponse = response.sort((a,b) => a.id - b.id);

        //send response table to appendToDom
        appendToDom(sortedResponse);
    });
};


//function to append task list to DOM
function appendToDom(taskTable){
    console.log(`about to append db table: ${taskTable}`);
    $('#task-list').empty();
    
    // loop through table and append tasks to dom. add a COMPLETE and DELETE button
    for (let i=0; i < taskTable.length; i++) {
        
        //if statement to check completion status - INCOMPLETE
        if(taskTable[i].complete === 'no') {
            $('#task-list').append(`
            <div class="task-incomplete">
                <div id="pattern-incomplete">
                    <h2>
                        ${taskTable[i].task}      
                    </h2>
                    <i>task is incomplete</i>      
                    <br />
                    <br />
                    <button id="${taskTable[i].id}" class="complete-btn" title="${taskTable[i].task}">Mark as complete</button>
                    <button id="${taskTable[i].id}" class="delete" title="${taskTable[i].task}">Remove Task</button>
                    <br />
                    <br />
                </div>
            </div>
        `)}

        //if statement to check completion status - COMPLETE
        if(taskTable[i].complete === 'yes') {
            $('#task-list').append(`
            <div class="task-complete">
                <div id="pattern">
                    <h2>
                        ${taskTable[i].task}      
                    </h2>
                    <i>task is complete!</i>      
                    <br />
                    <br />
                    <button id="${taskTable[i].id}" class="incomplete-btn" title="${taskTable[i].task}">Mark as incomplete</button>
                    <button id="${taskTable[i].id}" class="delete" title="${taskTable[i].task}">Remove Task</button>
                    <br />
                    <br />     
                </div>
            </div>
            `)
        }
    };
};

//create Task Completed button function
function taskComplete() {
    console.log(`clicked button to update completion status of task: "${this.title}" to complete`);
    console.log(`this should be the unique id from task: ${this.id}`);
  
    //set task to update to variable
    const updateTask = (this).title;
    const taskId = (this).id;
    console.log(`test of updateTask variable: ${updateTask}`);
    console.log(`id: ${taskId}`);

    //make POST request to update completion status on db
    $.ajax({
        method: 'POST',
        url: '/tasks',
        //create new task object here
        data: {
            title: updateTask,
            //have new task default be incomplete
            complete:'yes',
            idNo: taskId,
        }
    }).then(function(response){
        console.log('new task complete POST response from the server: ', response);
        
        //GET updated tasks here
        getTasks();
       
    //add error catch
    }).catch(function(error){
        alert(error.responseText);
        console.log(error);
    });
};

//create Task Completed button function
function taskIncomplete() {
    console.log(`clicked button to update completion status of task: ${this.title} to incomplete`);
 
    //set task to update to variable
    const updateTask = (this).title;
    const taskId = (this).id;
    console.log(`test of updateTask variable: ${updateTask}`);
    console.log(`test of updateTask id: ${taskId}`);

    //make POST request to update completion status on db
    $.ajax({
        method: 'POST',
        url: '/tasks',
        //create new task object here
        data: {
            title: updateTask,
            //have new task default be incomplete
            complete:'no',
            idNo: taskId,
        }
    }).then(function(response){
        console.log('revert task to incomplete POST response from the server: ', response);
        
        //GET updated tasks here
        getTasks();
       
    //add error catch
    }).catch(function(error){
        alert(error.responseText);
        console.log(error);
    });
};

//creat task DELETE function
function taskDelete() {
    console.log(`you want to delete ${this.title} with ID no: ${this.id}`);

    const deleteTask = (this).title;
    const taskId = (this).id;

    //make DELETE request to delete task from db
    $.ajax({
        method: 'DELETE',
        url: '/tasks',
        //create new task object here
        data: {
            title: deleteTask,
            idNo: taskId,
        }
    }).then(function(response){
        console.log('revert task to incomplete POST response from the server: ', response);
        
        //GET updated tasks here
        getTasks();
       
    //add error catch
    }).catch(function(error){
        alert(error.responseText);
        console.log(error);
    });
};

console.log('in my client.js file now');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');

    //function to retrieve current task list from server/database
    getTasks();

    //on-click event for submit task button
    $('#submit-task-btn').on('click', submitTask);

    //future task complete button function
    $('#task-list').on('click', '.complete', taskComplete);
    //future delete button function
    $('#task-list').on('click', '.delete', taskDelete);
}

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
}


//function to GET tasks from server/database
function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response){
        console.log(`this is the task list GET response from server: ${response}`);

        //send response table to appendToDom
        appendToDom(response);
    });
}


//function to append task list to DOM
function appendToDom(taskTable){
    console.log(`about to append db table: ${taskTable}`);
    $('#task-list').empty();

  // loop through table and append tasks to dom. add a COMPLETE and DELETE button
    for (let i=0; i < taskTable.length; i++) {

        //if statement to check completion status - INCOMPLETE
        if(taskTable[i].complete === 'no') {
            $('#task-list').append(`
            <tr class="task-incomplete">
                <td>
                    ${taskTable[i].task}      
                </td>
                <td>
                    ${taskTable[i].complete}      
                </td>
                <td>
                    <button class="complete" title="${taskTable[i].task}">Task Completed</button>
                </td>
                <td>
                    <button class="delete" title="${taskTable[i].task}">Remove Task</button>
                </td>
            </tr>
        `)}

        //if statement to check completion status - COMPLETE
        if(taskTable[i].complete === 'yes') {
            $('#task-list').append(`
            <tr class="task-complete">
                <td>
                    ${taskTable[i].task}      
                </td>
                <td>
                    ${taskTable[i].complete}, <i>task is complete!</i>      
                </td>
                <td>
                    <button class="complete" title="${taskTable[i].task}">Task Incomplete</button>
                </td>
                <td>
                    <button class="delete" title="${taskTable[i].task}">Remove Task</button>
                </td>     
            </tr>
            `)
        }
    };
};

//create Task Completed button function
function taskComplete() {
    console.log(`clicked button to update completion status of task: ${this.title}`);

//     $(this).parent().css('background-color', 'rgb(161, 236, 150)');
//  $(this).attr('disabled', 'disabled');
    
    //set task to update to variable
    const updateTask = (this).title;
    console.log(`test of updateTask variable: ${updateTask}`);

    //make POST request to update completion status on db
    $.ajax({
        method: 'POST',
        url: '/tasks',
        //create new task object here
        data: {
            task: updateTask,
            //have new task default be incomplete
            complete:'yes',
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


}


function changeBgColor(item) {
    item.addClass('task-complete');
}







//POST to update server with status
// function taskComplete(){
//     console.log('you completed this task');
//     $(this).parent().css('background-color', 'rgb(161, 236, 150)');
//     $(this).attr('disabled', 'disabled');
//     let updatedTask = this.id;

//     $.ajax({
//         method: 'POST',
//         url: '/tasks',
//         data: {
//             task: updatedTask,
//             status: 'complete',
//         }
//     }).then(function(response){
//         console.log('new task POST response from the server', response);
//     })
// }
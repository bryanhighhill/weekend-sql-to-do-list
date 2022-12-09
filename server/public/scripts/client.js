console.log('in my client.js file now');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');

    //function to retrieve current task list from server/database
    getTasks();

    //on-click event for submit task button
    $('#submit-task-btn').on('click', submitTask);

    //future delete button function
    // $('.delete').on('click', '#to-do-list', taskDelete);
    //future task complete button function
    // $('#to-do-list').on('click', '.complete', taskComplete);
}

//function to POST new task to server
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
        console.log('this is the tasks GET response from the server', response);
        appendToDom(response);
    });
}


//function to append task list to DOM
function appendToDom(array){
    console.log('appendToDom function', array);
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
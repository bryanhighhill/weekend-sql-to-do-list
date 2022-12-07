console.log('in my client.js file now');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');

    //function to retrieve current task list from server/database
    // getTasks();

    //on-click event for submit task button
    $('#submit-task-btn').on('click', submitTask);
}

//function to POST new task to server
function submitTask() {
    let newTask = $('#task-input').val();
    if (newTask === ''){
        alert('task input cannot be blank');
        return false;
    }
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: newTask,
        }).then(function(response){
            console.log('new task POST response from the server', response);
            
            //get tasks here
            getTasks();
            
            //clear input value here
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
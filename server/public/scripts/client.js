console.log('in my client.js file now');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');

    //function to retrieve current task list from server/database
    getTasks();

    //on-click event for submit task button
    $('#submit-task-btn').on('click', submitTask);
}

//function to POST new task to server
function submitTask() {
    let newTask = $('#task-input').val();
    if (newTask != ''){
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: newTask,
        }).then(function(response){
            console.log('new task POST response from the server', response);
            //get tasks here
            getTasks();
        }).catch(function(error){
            alert(error.responseText);
            console.log(error);
        });

    }
    alert('task input cannot be blank');

}
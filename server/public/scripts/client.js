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
    $('#to-do-list').on('click', '.complete', taskComplete);
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
            data: {
                task: newTask,
            }
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


//function to append task list to DOM
function appendToDom(array){
    console.log('appendToDom function', array);
    $('#to-do-list').empty();
    for (let item of array) {
        $('#to-do-list').append(`
            <div> 
                ${item.task}
                <button id="${item.task}" class="complete">Task Complete</button>
                <button class="delete">Delete Task</button>
                <br />
                <br />
            </div>
        `)
    }
}


function taskComplete(){
    console.log('you completed this task');
    $(this).parent().css('background-color', 'rgb(161, 236, 150)');
    $(this).attr('disabled', 'disabled');
}
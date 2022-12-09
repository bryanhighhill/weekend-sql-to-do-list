let taskList = [
    { task: 'wake up', status: ''},
    { task: 'do morning stretches', status: ''},
    { task: 'clock in for work and respond to emails', status: ''},
    { task: 'make coffee', status: ''},
];


let serverFunctions = {
    taskList: taskList,

    removeTask: function callRemove(taskToRemove) {
        this.removeTask(taskList, taskToRemove);
    },

    statusUpdate: function statusUpdate(task) {
        updateTaskStatus(task, taskList);
    }
}


// function taskToRemove(array, task) {
//     console.log(`in task to remove with: ${array} and ${task}`);
//     for (let i=0; i < array.length; i++) {
//         if (task === array[i].length) {
//             array.splice(array[i], 1);
//             break;
//         }
//     }
// }

function updateTaskStatus (task, array) {
    console.log(`in update task status with' ${task} and ${array}`)
for (let i=0; i < array.length; i++) {
    if (task.task === array[i].task) {
        array.splice(array[i]);
        // return;
        console.log(`this should have no task duplicates: ${taskList}`);
    } else {
        array.push(task);
    }
}
}


module.exports = serverFunctions;
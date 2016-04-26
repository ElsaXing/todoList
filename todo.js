"use strict";

// function addLoadEvent(func) {
// 	var oldonload = window.onload;
// 	if (typeof window.onload != 'function') {
// 		window.onload = func;
// 	} else	{
// 		window.onload = function () {
// 			oldonload();
// 			func();
// 		};
// 	}
// }





// 检查是否有任务储存

	if (!localStorage.getItem('allTasks')) {
	// show example
		newTask('read','2016-05-01','book');
		var allTasks = {
			'example': ['read','2016-05-01','book']
		};
} else {
	// show tasks
		// get data
		// 提前给task创建一个名字！！
		function getData() {
			var allTasks = localStorage.getItem(allTasks);
			for (var i=0; i < allTasks.length; i++) {
				 var  task = allTasks[i];
				 newTask(task.taskTitle,task.deadLine,task.descriptionText);
			}
		}
}






// create new task
function newTask(taskTitle,deadLine,descriptionText) {
	var task = document.createElement('li');
	var taskList = document.getElementById('taskList');
	taskList.appendChild(task);
	var task_title = document.createTextNode(taskTitle);
	task.appendChild(task_title);
// 不知道create啥
	var deadline = document.createElement('p');
	var deadline_date = document.createTextNode(deadLine);
	var description = document.createElement('p');
	var description_text = document.createTextNode(descriptionText);
	description.appendChild(description_text);
	deadline.appendChild(deadline_date);
	task.appendChild(deadline);
	task.appendChild(description);
	
}





// create UUID
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}




// save task
function saveTask () {
	alert ("dwed");
	// var taskTitle= document.getElementById('taskTitle').value;
	// var deadLine= document.getElementById('deadLine').value;
	// var descriptionText= document.getElementById('descriptionText').value;
	// // var task =[taskTitle,deadLine,descriptionText];
	// // allTasks.push(task);
	// // localStorage.setItem('allTasks',JSON.stringify(allTasks));

	// newTask(taskTitle,deadLine,descriptionText);
	}
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
		newTask('read','2016-05-01','book','123');
		var allTasks = [
			{'title':'read',
			 'deadline': '2016-05-01',
			 'description': 'book',
			 'UUID': '123'
			}
		];
} else {
	// show tasks
		// get data
		// 提前给task创建一个名字！！
			var allTasks = JSON.parse(localStorage.getItem('allTasks'));
			for (var i=0; i < allTasks.length; i++) {
				 var  task = allTasks[i];
				 newTask(task.title,task.deadline,task.description,task.UUID);
			}
		
}






// create new task
function newTask(taskTitle,deadLine,descriptionText,UUID) {
	var task = document.createElement('li');
	var taskList = document.getElementById('taskList');
	taskList.appendChild(task);
	var task_title = document.createTextNode(taskTitle);
	task.appendChild(task_title);
	var deadline = document.createElement('p');
	var deadline_date = document.createTextNode(deadLine);
	var description = document.createElement('p');
	var description_text = document.createTextNode(descriptionText);
	description.appendChild(description_text);
	deadline.appendChild(deadline_date);
	task.appendChild(deadline);
	task.appendChild(description);
	task.setAttribute('UUID',UUID);
	task.setAttribute('Id',UUID);

	var deleteTask = document.createElement('button');
	deleteTask.addEventListener('click',deleteTask(){	
		var targetTask = document.getElementById(UUID);
		var pareTask = document.getElementById('taskList');
		pareTask.removeChild(targetTask);
		console.log (UUID);}
		);
	// task.addEventListener('mouseover',target);
	deleteTask.innerHTML = 'delete';
	task.appendChild(deleteTask);
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
	var taskTitle= document.getElementById('taskTitle').value;
	var deadLine= document.getElementById('deadLine').value;
	var descriptionText= document.getElementById('descriptionText').value;
	var UUID = generateUUID();
	var task = model_newTask(taskTitle,deadLine,descriptionText,UUID);

	allTasks.push(task);

	localStorage.setItem('allTasks', JSON.stringify(allTasks));

	newTask(taskTitle,deadLine,descriptionText,UUID);
	}


function model_newTask (taskTitle,deadLine,descriptionText,UUID) {
	var task = {
		'title': taskTitle,
		'deadline': deadLine,
		'description': descriptionText,
		'UUID': UUID
	};

	return task;
}


// // 删除任务
// function deleteTask (UUID) {


// }

// function target () {

// }

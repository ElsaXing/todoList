"use strict";

if (localStorage.getItem('allTasks')) {
	// 隐藏范例
	document.getElementById('example').style.display = 'none';
	// 读取数据
	var allTasks = JSON.parse(localStorage.getItem('allTasks'));
	// 排序
	allTasks.sort(
		function(task1, task2) {
			if(Date.parse(task1.deadline) > Date.parse(task2.deadline)){
				return true;
			} else {
				return false;
			}
		}
	);
	// 创建任务
	for (var i=0; i < allTasks.length; i++) {
		var task = allTasks[i];
		View_newTask(task.title,task.deadline,task.description,task.UUID);
	}

}else{
	var allTasks = [];
}


function View_newTask (taskTitle,deadLine,descriptionText,UUID) {

	var taskList = document.getElementById('taskList');
	var finished_taskList = document.getElementById('finished_taskList');

	var task = document.createElement('li');
	// 基础信息
	var title = document.createTextNode(taskTitle);
	var deadline = document.createElement('p');
	    var deadline_date = document.createTextNode(deadLine);
	    deadline.className = 'deadline';
    	deadline.appendChild(deadline_date);	
	var description = document.createElement('p');
		var description_text = document.createTextNode(descriptionText);
		description.appendChild(description_text);
 	
 	task.appendChild(title);
	task.appendChild(deadline);
	task.appendChild(description);
	task.setAttribute('UUID',UUID);
	task.className = 'unfinished';
	for (var i = 0; i<taskList.length; ++i){
		var indexTask = taskList[i];
		var indexDeadline = indexTask.getElementsByClassName('deadline');
		console.log (indexDeadline);
		if(Date.parse(indexDeadline.value) <= Date.parse(deadLine)){
			taskList.insertAfter(task,indexTask);
			break;
		}
	}


	// 基础功能
	// delete task
	var deleteTask = document.createElement('button');
	task.appendChild(deleteTask);
	deleteTask.addEventListener('click',function(){
		taskList.removeChild(task);
		for (var i=0; i<allTasks.length; i++) {
			if (allTasks[i].UUID == UUID) {
				allTasks.splice(i,1);
			}
		}
	} );
	deleteTask.innerHTML = 'delete';


	// 是否完成
	var finished = document.createElement('input');
	task.appendChild(finished);
	finished.type = 'checkbox';
	finished.addEventListener('change',function(){
		if (finished.checked) {
			task.className = 'finished';
			finished_taskList.appendChild(task);
		} else {
			task.className = 'unfinished';
			taskList.appendChild(task);
		}

	});
}

// 从界面获取数据并显示
function get_viewData () {
	var taskTitle= document.getElementById('taskTitle').value;
	var deadLine= document.getElementById('deadLine').value;
	var descriptionText= document.getElementById('descriptionText').value;
	var UUID = generateUUID();
	var createdTime = new Date();
	var task = model_newTask(taskTitle,deadLine,descriptionText,UUID,createdTime);
	// 插入
	if(allTasks.length === 0){
		allTasks.push(task);
	}else{
		for (var i = 0; i<allTasks.length; ++i){
			var indexTask = allTasks[i];
			if(Date.parse(task.deadline) >= Date.parse(indexTask.deadline)){
				allTasks.splice(i, 0, task);
				break;
			} else {
				allTasks.splice(task, 0, i);
			}
		};
	}
	View_newTask(task.title,task.deadline,task.description,task.UUID);

}


// 将数据加入到allTask
function model_newTask (taskTitle,deadLine,descriptionText,UUID,createdTime) {
	var task = {
		'title': taskTitle,
		'deadline': deadLine,
		'description': descriptionText,
		'UUID': UUID,
		'createdTime':createdTime
	};

	return task;
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




window.onunload = function () {
	if (allTasks.length === 0 ) {
		localStorage.removeItem('allTasks');
	} else {
		localStorage.setItem('allTasks', JSON.stringify(allTasks));

	}
};

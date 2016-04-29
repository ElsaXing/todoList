"use strict";

if (localStorage.getItem('allTasks')) {
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
	var finished_taskList = document.getElementById('finished_taskList');
	for (var i=0; i < allTasks.length; i++) {
		var task = allTasks[i];
		var seperatetask = View_newTask(task.title,task.deadline,task.description,task.UUID);
		if (task.finished) {
			finished_taskList.appendChild(seperatetask);
			var showcheckbox = seperatetask.getElementsByTagName('input')[0];
			showcheckbox.checked = true;
		}	
	}

}
else{
	var allTasks = [];
	View_newTask('Try it!','','Creat you first Task!','123');
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
	taskList.appendChild(task);

	// 基础功能
	// delete task
	var deleteTask = document.createElement('button');
	task.appendChild(deleteTask);
	deleteTask.addEventListener('click',function(){
		var pare = task.parentNode;
		pare.removeChild(task);
		for (var i=0; i<allTasks.length; i++) {
			if (allTasks[i].UUID == UUID) {
				allTasks.splice(i,1);
			}
		}
	} );
	deleteTask.innerHTML = 'delete';


	// 是否完成
	var finishedstate = document.createElement('input');
	task.appendChild(finishedstate);
	finishedstate.type = 'checkbox';
	finishedstate.checked = false;
	finishedstate.addEventListener('change',function(){
		var finished;
		if (finishedstate.checked) {
			task.className = 'finished';
			finished_taskList.appendChild(task);
			finished= true;
			update_model(task,UUID);
		} else {
			task.className = 'unfinished';
			taskList.appendChild(task);
			finished= false;
			update_model(task,UUID);
		}

	});
	return task;
}


// 获取view的子元素
function getchildnode (parent) {
	var childlist = parent.children;
	var childlistarr = [];
	var i=0;
	while (i<childlist.length) {
		if (childlist[i].nodeType == 1) {
			childlistarr.push(childlist[i]);
			i += 1;
		}
		else{i+=1;}

	}
	return childlistarr;
}


// 从界面获取数据并显示
function get_viewData () {
	var taskTitle= document.getElementById('taskTitle').value;
	var deadLine= document.getElementById('deadLine').value;
	var descriptionText= document.getElementById('descriptionText').value;
	var UUID = generateUUID();
	var createdTime = new Date();
	var finished = false;
	var task = model_newTask(taskTitle,deadLine,descriptionText,UUID,createdTime,finished);
	// 插入
	if(allTasks.length === 0){
		allTasks.push(task);
	}
	else{
		var i=0;
		var indexTask = allTasks[i];
		while (i<allTasks.length) {
			if(Date.parse(task.deadline) <= Date.parse(indexTask.deadline)){
				allTasks.splice(i-1, 0, task);
				break;
			} 
			else {
				if (allTasks.length == i+1) {
					allTasks.splice(i,0,task);
					break;
				}
				else {
					i+=1;
				}
			}
		}
	}
	View_newTask(task.title,task.deadline,task.description,task.UUID);
		document.location.reload(true);

}


// 将数据加入到allTask
function model_newTask (taskTitle,deadLine,descriptionText,UUID,createdTime,finished) {
	var task = {
		'title': taskTitle,
		'deadline': deadLine,
		'description': descriptionText,
		'UUID': UUID,
		'createdTime':createdTime,
		'finished':finished
	};

	return task;
}


// 更新model数据
function update_model(targettask,UUID) {
	//get model task and update:
	for (var i=0; i<allTasks.length; ++i){
		if(allTasks[i].UUID == UUID){
			allTasks[i].finished = !allTasks[i].finished;
			break;
		}
	}
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

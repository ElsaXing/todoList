function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else	{
		window.onload = function () {
			oldonload();
			func();
		}
	}
}


var allTasks = new Array;


// 检查是否有任务储存

	if (!localStorage.getItem('allTasks')) {
	// show example
		newTask('read','5/1','book');
	// var task = document.createElement('li');
	// var taskList = document.getElementById('taskList');
	// taskList.appendChild(task);
	// var task_title = document.createTextNode('read');
	// task.appendChild(task_title);
} else {
	// show tasks
		// get data
		// 提前给task创建一个名字！！
		function getData() {
			var allTasks = localStorage.getItem(allTasks);
			for (var i=0; i < allTasks.length; i++) {
				 var  FUCK = allTasks[i];
				 newTask(FUCK.taskTitle,FUCK.deadLine,FUCK.descriptionText);
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
	description.appendChild(description_text)
	deadline.appendChild(deadline_date)
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
};




// save task
function saveTask () {
	alert ('asd');
	var taskTitle= document.getElementById('taskTitle');
	var deadLine= document.getElementById('deadLine');
	var descriptionText= document.getElementById('descriptionText');
	var task = new Object (),
		TT = taskTitle.value,
		DL = deadLine.value,
		DT = descriptionText.value,
		name = generateUUID();
	allTasks.push(task);
	localStorage.setItem('allTasks',JSON.stringify(allTasks));

	newTask(taskTitle.value,deadLine.value,descriptionText.value);
}
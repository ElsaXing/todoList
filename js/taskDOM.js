function addTaskToDOM(task, finished) {
    var el_tasks = getDOM('id', 'taskList');
    var el_finishedTasks = getDOM('id', 'finished_taskList');
    var tasks = el_tasks;
    var el_task = document.createElement('div');
    var numDate = task.date.split('-').join('');

    if (finished) {
        tasks = el_finishedTasks;
    }


    el_task.className = 'task';
    el_task.setAttribute('created', task.created);
    el_task.setAttribute('state', 'brief');
    el_task.setAttribute('due', numDate);

    var el_iconCheckbox = fakeCheckbox(el_task, finished);
    var el_taskInfo = taskBody(el_task);
    var el_moreInfo = createDOMElem('div', el_taskInfo);
    var el_title = createDOMElem('span', el_taskInfo);
    var el_date = createDOMElem('span',el_taskInfo);


    el_iconCheckbox.className = 'icon-checkbox';
    el_taskInfo.className = 'task-info';
    el_title.className = 'name';
    el_date.className = 'date';
    el_moreInfo.className = 'icon icon-moreInfo hide';

    el_title.textContent = task.title;
    el_date.textContent = task.date;

    if (emptyValueCheck(task.desc)) {
        var el_desc = createDOMElem('p', el_taskInfo);
        el_desc.textContent = task.desc;
        el_desc.className = 'desc hide';
    }

    sortTask(el_task, tasks);

    existTaskCheck();

}


function taskBody(parent) {
    var taskInfo = createDOMElem('div', parent);
    var el_parent = taskInfo.parentElement;

    taskInfo.addEventListener('click', function() {
        var active = getDOM('class', 'active');
        if (active[0]) {
            changeState('brief', active[0]);
        }
        changeState('selected', el_parent);
    });

    taskInfo.addEventListener('dblclick', function() {
        var active = getDOM('class', 'active');
        if (active[0]) {
            changeState('brief', active[0]);
        }
        changeState('detail', el_parent);
    });

    return taskInfo;
}

function fakeCheckbox (parent, finished) {
    var el_taskList = getDOM('id', 'taskList');
    var el_finished_taskList = getDOM('id', 'finished_taskList');

    var finishedstate = createDOMElem('div', parent);
    parent.setAttribute('checked', finished);

    finishedstate.addEventListener('click',function(){
        if (parent.checked) {
            el_finished_taskList.removeChild(parent);
            sortTask(parent, el_taskList);
            parent.checked = false;
            finishedstate.className = 'icon-checkbox';

            existTaskCheck();
        } else {
            el_taskList.removeChild(parent);
            sortTask(parent, el_finished_taskList);
            parent.checked = true;
            finishedstate.className = 'icon-checkbox-checked';
            existTaskCheck();
        }
    });

    return finishedstate;
}


function sortTask (taskDiv, parentDiv) {
    var taskList = parentDiv.getElementsByClassName('task');
    var numDate = taskDiv.getAttribute('due');

    if (taskList.length == 0) {
        parentDiv.appendChild(taskDiv);
    } else if (numDate == '') {
        parentDiv.insertBefore(taskDiv, taskList[0]);
    }else {
        for (var i=0; i < taskList.length; ++i) {
            if (taskList[i].getAttribute('due') > Number(numDate)) {
                parentDiv.insertBefore(taskDiv, taskList[i]);
                break;
            } else if (i == taskList.length -1) {
                parentDiv.appendChild(taskDiv);
                break;
            }
        }
    }
}
/**
 * Created by Lan on 2016/12/19.
 */
"use strict";
//set up
function init() {
    localStorage_check();
    calenderCheck();
    existTaskCheck();
}

init();

function localStorage_check() {

    if (!window.localStorage) {
        alert("Sorry, your browser doesn't support this page. Please try another one.");
    }

}

var _tasks = [];


function getTaskData(event) {
    var el_title = getDOM('id', 'input-name');

    if (event.keyCode == 13) {
        if (el_title.value && emptyValueCheck(el_title.value)) {
            event.preventDefault();
            var el_year = getDOM('id', 'input-year');
            var el_month = getDOM('id', 'input-month');
            var el_day = getDOM('id', 'input-day');
            var el_desc = getDOM('id', 'input-desc');

            var title = el_title.value;
            var date = emptyValueCheck(el_day.value) ?
                (el_year.value + '-' + el_month.value + '-' + el_day.value) : '';
            var desc = emptyValueCheck(el_desc.value) ? el_desc.value : '';

            var task = tempTask(title, date, desc, generateUUID());
            viewNewTask(task);

            el_title.value = '';
            el_desc.value = '';
        }
    }
}

function switchInfo() {
    var cal = getDOM('id', 'icon-calender');
    var des = getDOM('id', 'input-desc');
    var more = getDOM('id', 'icon-switch');
    var divDate = getDOM('class', 'div-date');
    if (more.className == 'icon-addMore') {
        cal.className = 'icon-calender';
        des.className = 'input-desc';
        more.className = 'icon-showLess';
    } else {
        cal.className = 'icon-calender hide';
        des.className = 'input-desc hide';
        more.className = 'icon-addMore';
        divDate[0].className = 'div-date hide';
    }
}

function setDeadline() {
    var date = getDOM('class', 'input-date');
    var divDate = getDOM('class', 'div-date');
    var icon = getDOM('id', 'icon-calender');
    icon.className = 'icon-calender hide';
    divDate[0].className = 'div-date';
    date[0].value = getToday('year');
    date[1].value = getToday('month');
    date[2].value = getToday('day');
}

function tempTask(title, date, desc, uuid) {
    return {
        title: title,
        date: date,
        desc: desc,
        uuid: uuid,
        createTime: new Date(),
        finished: false
    }
}

function viewNewTask(task) {
    var el_taskList = getDOM('id', 'taskList');

    var el_task = createDOMElem('div', el_taskList);
    el_task.className = 'task';
    el_task.setAttribute('UUID',task.uuid);
    el_task.setAttribute('createTime', task.createTime);
    el_task.setAttribute('state', 'brief');

    var el_iconCheckbox = fakeCheckbox(el_task);

    var el_taskInfo = taskDiv(el_task);
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

    lineCheck();

}

function fakeCheckbox (parent) {
    var el_taskList = getDOM('id', 'taskList');
    var el_finished_taskList = getDOM('id', 'finished_taskList');

    var finishedstate = createDOMElem('div', parent);
    parent.setAttribute('checked', false);

    finishedstate.addEventListener('click',function(){
        if (parent.checked) {
            el_finished_taskList.removeChild(parent);
            el_taskList.appendChild(parent);
            parent.checked = false;
            finishedstate.className = 'icon-checkbox';

            lineCheck();
        } else {
            el_taskList.removeChild(parent);
            el_finished_taskList.appendChild(parent);
            parent.checked = true;
            finishedstate.className = 'icon-checkbox-checked';

            lineCheck();
        }
    });

    return finishedstate;
}

function taskDiv(parent) {
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

function changeState(state, task) {
    var info = task.getElementsByClassName('task-info')[0];
    var icon = info.getElementsByClassName('icon')[0];
    var name = info.getElementsByClassName('name')[0];
    var date = info.getElementsByClassName('date')[0];
    var desc = info.getElementsByClassName('desc')[0];
    if (!desc) {
        desc = {};
    }

    switch (state) {
        case 'brief':
            task.state = 'brief';
            task.className = 'task';
            desc.className = 'desc hide';
            icon.className = 'icon hide';
            break;
        case 'selected':
            task.state = 'selected';
            task.className = 'task active';
            desc.className = 'desc hide';
            icon.className = 'icon icon-moreInfo';
            break;
        case 'detail':
            task.state = 'detail';
            task.className = 'task active';
            desc.className = 'desc';
            icon.className = 'icon icon-lessInfo';
            break;
        case 'editing':

            break;
    }
}

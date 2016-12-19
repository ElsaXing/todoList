/**
 * Created by Lan on 2016/12/19.
 */
"use strict";
//set up
function init() {
    localStorage_check();
    dateCheck();
    lineCheck();
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

//tool function
function createDOMElem(type, parent) {
    var DOM = document.createElement(type);
    parent.appendChild(DOM);
    return DOM;
}

function getDOM(type, name) {
    switch (type) {
        case 'class':
            return document.getElementsByClassName(name);
            break;
        case 'id':
            return document.getElementById(name);
            break;
        case 'tag':
            return document.getElementsByTagName(name);
            break;
        case 'name':
            return document.getElementsByName(name);
            break;
        default:
            return;
    }
}

function emptyValueCheck(str) {
    return !(str.replace(/^\s+|\s+$/g, '').length == 0);
}

function getToday(type) {
    var today = new Date;
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate() + 1;

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    switch (type) {
        case 'year':
            return year;
            break;
        case 'month':
            return month;
            break;
        case 'day':
            return day;
            break;
    }
}

function dateCheck() {
    var el_year = getDOM('id', 'input-year');
    var el_month = getDOM('id', 'input-month');
    var el_day = getDOM('id', 'input-day');

    el_year.addEventListener('change',function() {
        if (Number(el_year.value)) {
            el_year.value = getToday('year');
        } else {
            el_year.value = dataCheck(Number(el_year.value), 0, 5000);
        }
    });
    el_month.addEventListener('change',function() {
        if (Number(el_month.value)) {
            el_month.value = getToday('month');
        }
        else {
            el_month.value = dataCheck(Number(el_month.value), 1, 12);
        }
    });
    el_day.addEventListener('change',function() {
        if (Number(el_day.value)) {
            el_day.value = getToday('day');
        } else {
            el_day.value = dataCheck(Number(el_day.value), 1, 31);
        }
    });

    function dataCheck(value, min, max) {
        switch (value) {
            case (value < min):
                return min;
                break;
            case (value > max):
                return max;
                break;
            case (min <= value < 10):
                return '0' + value;
                break;
            default:
                return value;
        }
    }
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

function lineCheck() {
    var hr = getDOM('tag', 'hr');
    var finished = getDOM('id', 'finished_taskList');
    var unfinished = getDOM('id', 'taskList');
    if (finished.firstElementChild && unfinished.firstElementChild) {
        hr[0].className = '';
    } else {
        hr[0].className = 'hide';
    }
}
/**
 * Created by Lan on 2016/12/19.
 */
"use strict";
//set up
var _tasks;

function init() {
    localStorage_check();


    if (localStorage.getItem('tasks')) {
        _tasks = JSON.parse(localStorage.getItem('tasks'));

        for (var i = 0; i < _tasks.length; i++) {
            addTaskToDOM(_tasks[i], _tasks[i].finished);
        }
    }
    else {
        _tasks = [];
    }

    calenderCheck();

    switchInfo();
    existTaskCheck();

}

init();

function localStorage_check() {

    if (!window.localStorage) {
        alert("Sorry, your browser doesn't support this page. Please try another one.");
    }

}

window.addEventListener('keydown', function () {

    if (event.keyCode != 46 && event.keyCode != 8) {
        return;
    }

    if (document.activeElement != getDOM('tag', 'body')[0]) {
        return;
    }

    var active = getDOM('class', 'active');

    if (active.length <= 0) {
        return;
    }

    update_model(active[0].getAttribute('created'), 'delete');
    active[0].parentElement.removeChild(active[0]);
    existTaskCheck();

});

window.addEventListener('click', function() {

    var tasks = getDOM('class', 'task-infos');
    for (var i = 0; i < tasks.length; i++) {
        if (event.target == tasks[i]) {
            return;
        }
    }

    var active = getDOM('class', 'active')[0];
    if (active) {
        changeState('brief', active);
    }


});

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

            var task = tempTask(title, date, desc);
            addTaskToDOM(task, false);
            _tasks.push(task);

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

function tempTask(title, date, desc) {
    return {
        title: title,
        date: date,
        desc: desc,
        created: new Date(),
        finished: false
    }
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
            icon.className = 'task-infos icon icon-moreInfo';
            break;
        case 'detail':
            task.state = 'detail';
            task.className = 'task active';
            desc.className = 'desc';
            icon.className = 'task-infos icon icon-delete';
            break;
        case 'editing':

            break;
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

function update_model(task, type) {

    for (var i = 0; i < _tasks.length; ++i) {
        if (_tasks[i].created == task) {
            if (type == 'edit') {
                _tasks[i].finished = !_tasks[i].finished;
                break;
            } else if (type == 'delete') {
                _tasks.splice(i, 1);
                break;
            }
        }
    }
}


window.onunload = function () {
    if (_tasks.length === 0) {
        localStorage.removeItem('tasks');
    } else {
        localStorage.setItem('tasks', JSON.stringify(_tasks));

    }
};

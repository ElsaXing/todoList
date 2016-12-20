/**
 * Created by Lan on 2016/12/19.
 */
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



function posIntCheck(str) {
    if (isNaN(str)) {
        return false;
    }
    var num = Number(str);
    if (!Number.isInteger(num)) {
        return false;
    }
    if (num <= 0) {
        return false;
    }
    return true;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
}

function existTaskCheck() {
    var hr = getDOM('tag', 'hr');
    var finished = getDOM('id', 'finished_taskList');
    var unfinished = getDOM('id', 'taskList');
    if (finished.firstElementChild && unfinished.firstElementChild) {
        hr[0].className = '';
    } else {
        hr[0].className = 'hide';
    }
}
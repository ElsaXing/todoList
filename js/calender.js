/**
 * Created by Lan on 2016/12/20.
 */
function calenderCheck() {
    var el_year = getDOM('id', 'input-year');
    var el_month = getDOM('id', 'input-month');
    var el_day = getDOM('id', 'input-day');
    var bigMonth = [1, 3, 5, 7, 8, 10, 12];
    var smallMonth = [4, 6, 9, 11];
    var specialYear = (el_year.value % 4 == 0);

    el_year.addEventListener('change', function () {
        if (!posIntCheck(el_year.value)) {
            el_year.value = getToday('year');
        }

        specialYear = (el_year.value % 4 == 0);
        console.log(specialYear);

        if (specialYear && el_month.value == '02') {
            el_day.value = februaryCheck(specialYear, el_day.value)
        }

    });

    el_month.addEventListener('change', function () {
        if (!posIntCheck(el_month.value) || el_month.value > 12) {
            el_month.value = getToday('month');
        }
        if (el_month.value < 10 && (el_month.value.toString().length == 1)) {
            el_month.value = '0' + el_month.value;
        }
        if (el_month.value == '02') {
            el_day.value = februaryCheck(specialYear, el_day.value);
        }
    });

    el_day.addEventListener('change', function () {
        if (!posIntCheck(el_day.value)) {
            el_day.value = getToday('day');
        }
        if (el_day.value < 10 && (el_day.value.toString().length == 1)) {
            el_day.value = '0' + el_day.value;
        }
        if (el_month.value == 2) {
            el_day.value = februaryCheck(specialYear, el_day.value);
        }
        if (bigMonth.includes(Number(el_month.value)) && el_day.value > 31) {
            el_day.value = getToday('day');
        }
        if (smallMonth.includes(Number(el_month.value)) && el_day.value > 30) {
            el_day.value = getToday('day');
        }
    });

}

function februaryCheck(specialYear, day) {
    var max = 28;
    var today = getToday('day');
    if (specialYear) {
        max = 29;
    }
    if (day > max && today <= max) {
        day = today;
    }
    if (day > max && today > max) {
        day = max;
    }
    if (day < 10 && (day.toString().length == 1)){
        day = '0' + day;
    }
    return day
}
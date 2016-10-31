var times = [ 
    { open: 17, close: 22 }, //Sunday
    { open: 10.5, close: 22 }, //Monday
    { open: 10.5, close: 22 }, //Tuesday
    { open: 10.5, close: 22 }, //Wednesday
    { open: 10.5, close: 22 }, //Thursday
    { open: 10.5, close: 22 }, //Friday
    { open1: 11.5, close1: 14, open2: 17, close2: 22 }, //Saturday
];
var date = new Date();
date.setDate(date.getDate() + 1);
var openingTimes = openingHours(date);
var openClosed = false; // closed by default
var hour = date.getHours() 
var message = 'Today we are open till '; // message if open

// check that there are opening times for today
if (hasSimpleOpeningHours(openingTimes)){
    openClosed = openingTimes.open <= hour && hour < openingTimes.close;
} else if (hasComplexOpeningHours(openingTimes))  {
    openClosed = (openingTimes.open1 <= hour && hour < openingTimes.close1) 
    || (openingTimes.open2 <= hour && hour < openingTimes.close2);
}

if (openClosed) {
    if (hasSimpleOpeningHours(openingTimes)){
        message += formatHours(openingTimes.close);
    } else if (hasComplexOpeningHours(openingTimes)) {
        if (openingTimes.open1 <= hour && hour < openingTimes.close1) {
            message += formatHours(openingTimes.close1);
        } else if (openingTimes.open2 <= hour && hour < openingTimes.close2) {
            message += formatHours(openingTimes.close2);
        }
    }
}

if (!openClosed){
    if (hasSimpleOpeningHours(openingTimes)){
        //Work out when we next open...
        if (hour < openingTimes.open){ // open later on today.
            var openAt = new Date();
            message = 'We will be opening at  ' + formatHours(openingTimes.open) + ' today.';
        }
        else {
            var foundNextOpenDay = false;
            var nextOpenDay;
            for (var i = 1; !foundNextOpenDay && i < 7; i++){
                nextOpenDay = new Date(date.setDate(date.getDate() + 1)); // Add a day
                openingTimes = openingHours(nextOpenDay);
                if (hasSimpleOpeningHours(openingTimes) || hasComplexOpeningHours(openingTimes)){
                    foundNextOpenDay = true; // exit the for loop
                    if (hasSimpleOpeningHours(openingTimes)) {
                        message = 'We will open ' + (i > 1 ? formatDay(nextOpenDay) : 'tomorrow') + 
                              ' at ' + formatHours(openingTimes.open) + '.';
                    } else if (hasComplexOpeningHours(openingTimes)) {
                        message = 'We will open ' + (i > 1 ? formatDay(nextOpenDay) : 'tomorrow') + 
                              ' at ' + formatHours(openingTimes.open1) + '.';
                    }
                }
            }
            if (!foundNextOpenDay){
                // No longer in business!
                message = 'Sorry, we are closed for business.';
            }
        }
    }  else if (hasComplexOpeningHours(openingTimes)) {
        //Work out when we next open...
        if (hour < openingTimes.open1){ // open later on today.
            var openAt = new Date();
            message = 'We will be opening at  ' + formatHours(openingTimes.open1) + ' today.';
        } else if (hour < openingTimes.open2) {
            var openAt = new Date();
            message = 'We will be opening at  ' + formatHours(openingTimes.open2) + ' today.';
        }
        else {
            var foundNextOpenDay = false;
            var nextOpenDay;
            for (var i = 1; !foundNextOpenDay && i < 7; i++){
                nextOpenDay = new Date(date.setDate(date.getDate() + 1)); // Add a day
                openingTimes = openingHours(nextOpenDay);
                if (hasSimpleOpeningHours(openingTimes) || hasComplexOpeningHours(openingTimes)){
                    foundNextOpenDay = true; // exit the for loop
                    if (hasSimpleOpeningHours(openingTimes)) {
                        message = 'We will open ' + (i > 1 ? formatDay(nextOpenDay) : 'tomorrow') + 
                              ' at ' + formatHours(openingTimes.open) + '.';
                    } else if (hasComplexOpeningHours(openingTimes)) {
                        message = 'We will open ' + (i > 1 ? formatDay(nextOpenDay) : 'tomorrow') + 
                              ' at ' + formatHours(openingTimes.open1) + '.';
                    }
                }
            }
            if (!foundNextOpenDay){
                // No longer in business!
                message = 'Sorry, we are closed for business.';
            }
        }
    }
}

function hasSimpleOpeningHours(openingTimes){
    return openingTimes.hasOwnProperty('open') && openingTimes.hasOwnProperty('close');
}

function hasComplexOpeningHours(openingTimes){
    return openingTimes.hasOwnProperty('open1') && openingTimes.hasOwnProperty('close1') && 
    openingTimes.hasOwnProperty('open2') && openingTimes.hasOwnProperty('close2');
}

function formatHours(hour){
    var amPm = hour > 11 ? 'pm' : 'am';
    var time;
    if (hour === 0) { // If, for whatever reason, you open at midnight!
        time = 12;
    }
    else {
        time = hour > 12 ? hour - 12 : hour;
    }

    return time + amPm;
}

function formatDay(date){
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()];
}

function openingHours(date){
    var dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, etc...
    var openingTimes = times[dayOfWeek];

    return openingTimes;
}

$(document).ready(function(){
    document.getElementById('hours').innerHTML = message;    
});

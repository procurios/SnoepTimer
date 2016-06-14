!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.snoepTimer=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @param momentEnd
 * @param momentStart
 * @returns {{hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds, humanize: humanize}}
 */
function duration (momentEnd, momentStart) {
    var diff = momentEnd.diff(momentStart);

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
        humanize: humanize
    };

    /**
     * @returns {int}
     */
    function hours () {
        return parseInt(((diff / 1000) / 60) / 60, 10);
    }

    /**
     * @returns {int}
     */
    function minutes () {
        var minutes = ((diff / 1000) / 60) % 60;

        if (minutes === 0) {
            return 60;
        }

        return parseInt(minutes, 10);
    }

    /**
     * @returns {int}
     */
    function seconds () {
        return Math.floor((diff / 1000) % 60);
    }

    /**
     * @returns {int}
     */
    function milliseconds () {
        return diff;
    }

    /**
     * @returns {string}
     */
    function humanize () {
        var hoursText = (hours() < 10) ? '0' + hours() : hours();
        var minutesText = (minutes() < 10) ? '0' + minutes() : minutes();
        var secondsText = (seconds() < 10) ? '0' + seconds() : seconds();

        if (!hours()) {
            return minutesText + ':' + secondsText;
        }

        return hoursText + ':' + minutesText + ':' + secondsText;
    }
}

module.exports = duration;
},{}],2:[function(require,module,exports){
/**
 * @param {Date} date
 * @returns {{hours: hours, minutes: minutes, seconds: seconds}}
 */
function moment (date) {
    if (date && !(date instanceof Date)) {
        date = date.getDate();
    }

    date = date || new Date();

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        add: add,
        subtract: subtract,
        diff: diff,
        isSame: isSame,
        isAfter: isAfter,
        isBefore: isBefore,
        isSameOrBefore: isSameOrBefore,
        isSameOrAfter: isSameOrAfter,
        getDate: getDate
    };

    /**
     * @param {int} nrHours
     * @returns {int|{}}
     */
    function hours (nrHours) {
        if (!nrHours && nrHours !== 0) {
            return date.getHours();
        }

        var newDate = new Date(date);
        newDate.setHours(nrHours);

        return moment(newDate);
    }

    /**
     * @param {int} nrMinutes
     * @returns {int|{}}
     */
    function minutes (nrMinutes) {
        if (!nrMinutes && nrMinutes !== 0) {
            return date.getMinutes();
        }

        var newDate = new Date(date);
        newDate.setMinutes(nrMinutes);

        return moment(newDate);
    }

    /**
     * @param {int} nrSeconds
     * @returns {int|{}}
     */
    function seconds (nrSeconds) {
        if (!nrSeconds && nrSeconds !== 0) {
            return date.getSeconds();
        }

        var newDate = new Date(date);
        newDate.setSeconds(nrSeconds);

        return moment(newDate);
    }

    /**
     * @param momentStart
     * @returns {number}
     */
    function diff (momentStart) {
        return date - momentStart.getDate();
    }

    /**
     * @param amount
     * @param type
     * @returns {{}}
     */
    function add (amount, type) {
        var newDate;

        if (type === 'seconds') {
            newDate = new Date(date);
            newDate.setSeconds(date.getSeconds() + amount);

            return moment(newDate);
        }

        if (type === 'minutes') {
            newDate = new Date(date);
            newDate.setMinutes(date.getMinutes() + amount);

            return moment(newDate);
        }

        if (type === 'hours') {
            newDate = new Date(date);
            newDate.setHours(date.getHours() + amount);

            return moment(newDate);
        }

        if (type === 'days') {
            newDate = new Date(date);
            newDate.setDate(date.getDate() + amount);

            return moment(newDate);
        }
    }

    /**
     * @param amount
     * @param type
     * @returns {{}}
     */
    function subtract (amount, type) {
        var newDate;

        if (type === 'seconds') {
            newDate = new Date(date);
            newDate.setSeconds(date.getSeconds() - amount);

            return moment(newDate);
        }

        if (type === 'minutes') {
            newDate = new Date(date);
            newDate.setMinutes(date.getMinutes() - amount);

            return moment(newDate);
        }

        if (type === 'hours') {
            newDate = new Date(date);
            newDate.setHours(date.getHours() - amount);

            return moment(newDate);
        }

        if (type === 'days') {
            newDate = new Date(date);
            newDate.setDate(date.getDate() - amount);

            return moment(newDate);
        }
    }

    /**
     * @param moment
     * @returns {boolean}
     */
    function isSame (moment) {
        return (date.getTime() === moment.getDate().getTime());
    }

    /**
     * @param moment
     * @returns {boolean}
     */
    function isAfter (moment) {
        return (date > moment.getDate());
    }

    /**
     * @param moment
     * @returns {boolean}
     */
    function isBefore (moment) {
        return (date < moment.getDate());
    }

    /**
     * @param moment
     * @returns {boolean}
     */
    function isSameOrBefore (moment) {
        return (isSame(moment) || isBefore(moment));
    }

    /**
     * @param moment
     * @returns {boolean}
     */
    function isSameOrAfter (moment) {
        return (isSame(moment) || isAfter(moment));
    }

    /**
     * @returns {Date}
     */
    function getDate () {
        return date;
    }
}

module.exports = moment;
},{}],3:[function(require,module,exports){
/**
 * @returns {{getPermission: getPermission, notifyPeriodStart: notifyPeriodStart, notifyPeriodEnd: notifyPeriodEnd}}
 */
function notifier () {
    if ('Audio' in window) {
        var bell = new Audio('assets/audio/bell.mp3');
    }

    return {
        getPermission: getPermission,
        notifyPeriodStart: notifyPeriodStart,
        notifyPeriodEnd: notifyPeriodEnd
    };

    /**
     * @param {string} title
     * @param {string} body
     */
    function notify (title, body) {
        if (bell) {
            bell.play();
        }

        new Notification(title, { icon: 'assets/img/icon-alarm.png', body: body });
    }

    /**
     * @param {string} periodType
     */
    function notifyPeriodStart (periodType) {
        notify(getPeriodStartTitle(periodType), getPeriodStartBody(periodType));
    }

    /**
     * @param {string} periodType
     * @returns {string}
     */
    function getPeriodStartTitle (periodType) {
        return 'New period started: ' + periodType;
    }

    /**
     * @param {string} periodType
     * @returns {*}
     */
    function getPeriodStartBody (periodType) {
        if (periodType === 'break') {
            return 'And snap out of it; your break has just begun. Need coffee or water? Can you review someones work?';
        }

        if (periodType === 'work') {
            return 'Sweet. Your 25 minutes without distraction have just begun. Go forth and build!';
        }

        if (periodType === 'lunch') {
            return 'Omnomnomnomnom, food! Enjoy!'
        }

        return '';
    }

    function getPermission () {
        if (!('Notification') in window) {
            return;
        }

        if (Notification.permission === 'granted' || Notification.permission === 'denied') {
            return;
        }

        Notification.requestPermission();
    }
}

module.exports = notifier;
},{}],4:[function(require,module,exports){
/**
 * @param now
 * @param getMoment
 * @returns {{type: string, start: {}, end: {}}}
 */
function getPeriod (now, getMoment) {
    var periodTypes = {
        work: 'work',
        lunch: 'lunch',
        break: 'break'
    };

    var lunchStart = getMoment().hours(12).minutes(30).seconds(0);
    var lunchEnd = getMoment().hours(12).minutes(59).seconds(59);

    if (now.isSameOrAfter(lunchStart) && now.isSameOrBefore(lunchEnd)) {
        return {
            type: periodTypes.lunch,
            start: lunchStart,
            end: lunchEnd
        };
    }

    if (now.minutes() >= 25 && now.minutes() < 30) {
        return {
            type: periodTypes.break,
            start: getMoment(now).hours(now.hours()).minutes(25).seconds(0),
            end: getMoment(now).hours(now.hours()).minutes(29).seconds(59)
        }
    }

    if (now.minutes() >= 55 && now.minutes() < 60) {
        return {
            type: periodTypes.break,
            start: getMoment(now).hours(now.hours()).minutes(55).seconds(0),
            end: getMoment(now).hours(now.hours()).minutes(59).seconds(59)
        }
    }

    if (now.minutes() < 25) {
        return {
            type: periodTypes.work,
            start: getMoment(now).hours(now.hours()).minutes(0).seconds(0),
            end: getMoment(now).hours(now.hours()).minutes(24).seconds(59)
        }
    }

    return {
        type: periodTypes.work,
        start: getMoment(now).hours(now.hours()).minutes(30).seconds(0),
        end: getMoment(now).hours(now.hours()).minutes(54).seconds(59)
    };
}

module.exports = getPeriod;
},{}],5:[function(require,module,exports){
'use strict';

var getPeriod = require('./getPeriod');
var getMoment = require('./getMoment');
var getDuration = require('./getDuration');
var getNotifier = require('./getNotifier');

function snoepTimer () {
    var notifier = getNotifier();
    var counterElem = document.querySelector('.snoepTimer');
    var currentPeriodType;

    notifier.getPermission();
    window.setInterval(updateTimer, 1000);

    function updateTimer () {
        var now = getMoment();
        var period = getPeriod(now, getMoment);
        var duration = getDuration(period.end, now);

        castNotifications(period.type);
        updateBrowserTitle(duration.humanize());
        drawCounter(duration.humanize());
    }

    /**
     * @param duration
     * @param {string} periodType
     * @returns {*}
     */
    function castNotifications (periodType) {
        // Notify user that new period has started
        if (currentPeriodType === periodType) {
            return;
        }

        currentPeriodType = periodType;
        return notifier.notifyPeriodStart(periodType);
    }

    /**
     * @param {string} timeRemainingText
     */
    function updateBrowserTitle (timeRemainingText) {
        document.title = timeRemainingText;
    }

    /**
     * @param {string} timeRemainingText
     */
    function drawCounter (timeRemainingText) {
        counterElem.innerHTML = timeRemainingText;
    }
}

module.exports = snoepTimer;
},{"./getDuration":1,"./getMoment":2,"./getNotifier":3,"./getPeriod":4}]},{},[5])(5)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2V0RHVyYXRpb24uanMiLCJzcmMvZ2V0TW9tZW50LmpzIiwic3JjL2dldE5vdGlmaWVyLmpzIiwic3JjL2dldFBlcmlvZC5qcyIsInNyYy9zbm9lcFRpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQHBhcmFtIG1vbWVudEVuZFxuICogQHBhcmFtIG1vbWVudFN0YXJ0XG4gKiBAcmV0dXJucyB7e2hvdXJzOiBob3VycywgbWludXRlczogbWludXRlcywgc2Vjb25kczogc2Vjb25kcywgbWlsbGlzZWNvbmRzOiBtaWxsaXNlY29uZHMsIGh1bWFuaXplOiBodW1hbml6ZX19XG4gKi9cbmZ1bmN0aW9uIGR1cmF0aW9uIChtb21lbnRFbmQsIG1vbWVudFN0YXJ0KSB7XG4gICAgdmFyIGRpZmYgPSBtb21lbnRFbmQuZGlmZihtb21lbnRTdGFydCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBob3VyczogaG91cnMsXG4gICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXG4gICAgICAgIHNlY29uZHM6IHNlY29uZHMsXG4gICAgICAgIG1pbGxpc2Vjb25kczogbWlsbGlzZWNvbmRzLFxuICAgICAgICBodW1hbml6ZTogaHVtYW5pemVcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBob3VycyAoKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCgoKGRpZmYgLyAxMDAwKSAvIDYwKSAvIDYwLCAxMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtaW51dGVzICgpIHtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSAoKGRpZmYgLyAxMDAwKSAvIDYwKSAlIDYwO1xuXG4gICAgICAgIGlmIChtaW51dGVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gNjA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VJbnQobWludXRlcywgMTApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2Vjb25kcyAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChkaWZmIC8gMTAwMCkgJSA2MCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtaWxsaXNlY29uZHMgKCkge1xuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGh1bWFuaXplICgpIHtcbiAgICAgICAgdmFyIGhvdXJzVGV4dCA9IChob3VycygpIDwgMTApID8gJzAnICsgaG91cnMoKSA6IGhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzVGV4dCA9IChtaW51dGVzKCkgPCAxMCkgPyAnMCcgKyBtaW51dGVzKCkgOiBtaW51dGVzKCk7XG4gICAgICAgIHZhciBzZWNvbmRzVGV4dCA9IChzZWNvbmRzKCkgPCAxMCkgPyAnMCcgKyBzZWNvbmRzKCkgOiBzZWNvbmRzKCk7XG5cbiAgICAgICAgaWYgKCFob3VycygpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWludXRlc1RleHQgKyAnOicgKyBzZWNvbmRzVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBob3Vyc1RleHQgKyAnOicgKyBtaW51dGVzVGV4dCArICc6JyArIHNlY29uZHNUZXh0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkdXJhdGlvbjsiLCIvKipcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHJldHVybnMge3tob3VyczogaG91cnMsIG1pbnV0ZXM6IG1pbnV0ZXMsIHNlY29uZHM6IHNlY29uZHN9fVxuICovXG5mdW5jdGlvbiBtb21lbnQgKGRhdGUpIHtcbiAgICBpZiAoZGF0ZSAmJiAhKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICBkYXRlID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhvdXJzOiBob3VycyxcbiAgICAgICAgbWludXRlczogbWludXRlcyxcbiAgICAgICAgc2Vjb25kczogc2Vjb25kcyxcbiAgICAgICAgYWRkOiBhZGQsXG4gICAgICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCxcbiAgICAgICAgZGlmZjogZGlmZixcbiAgICAgICAgaXNTYW1lOiBpc1NhbWUsXG4gICAgICAgIGlzQWZ0ZXI6IGlzQWZ0ZXIsXG4gICAgICAgIGlzQmVmb3JlOiBpc0JlZm9yZSxcbiAgICAgICAgaXNTYW1lT3JCZWZvcmU6IGlzU2FtZU9yQmVmb3JlLFxuICAgICAgICBpc1NhbWVPckFmdGVyOiBpc1NhbWVPckFmdGVyLFxuICAgICAgICBnZXREYXRlOiBnZXREYXRlXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50fSBuckhvdXJzXG4gICAgICogQHJldHVybnMge2ludHx7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBob3VycyAobnJIb3Vycykge1xuICAgICAgICBpZiAoIW5ySG91cnMgJiYgbnJIb3VycyAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIG5ld0RhdGUuc2V0SG91cnMobnJIb3Vycyk7XG5cbiAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gbnJNaW51dGVzXG4gICAgICogQHJldHVybnMge2ludHx7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtaW51dGVzIChuck1pbnV0ZXMpIHtcbiAgICAgICAgaWYgKCFuck1pbnV0ZXMgJiYgbnJNaW51dGVzICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBuZXdEYXRlLnNldE1pbnV0ZXMobnJNaW51dGVzKTtcblxuICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50fSBuclNlY29uZHNcbiAgICAgKiBAcmV0dXJucyB7aW50fHt9fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlY29uZHMgKG5yU2Vjb25kcykge1xuICAgICAgICBpZiAoIW5yU2Vjb25kcyAmJiBuclNlY29uZHMgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhuclNlY29uZHMpO1xuXG4gICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFN0YXJ0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkaWZmIChtb21lbnRTdGFydCkge1xuICAgICAgICByZXR1cm4gZGF0ZSAtIG1vbWVudFN0YXJ0LmdldERhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYW1vdW50XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkIChhbW91bnQsIHR5cGUpIHtcbiAgICAgICAgdmFyIG5ld0RhdGU7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzZWNvbmRzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXRTZWNvbmRzKGRhdGUuZ2V0U2Vjb25kcygpICsgYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnbWludXRlcycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ2hvdXJzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdkYXlzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhbW91bnRcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHt7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdWJ0cmFjdCAoYW1vdW50LCB0eXBlKSB7XG4gICAgICAgIHZhciBuZXdEYXRlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc2Vjb25kcycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhkYXRlLmdldFNlY29uZHMoKSAtIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgLSBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdob3VycycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpIC0gYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnZGF5cycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbW9tZW50XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTYW1lIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlLmdldFRpbWUoKSA9PT0gbW9tZW50LmdldERhdGUoKS5nZXRUaW1lKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0FmdGVyIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlID4gbW9tZW50LmdldERhdGUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQmVmb3JlIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlIDwgbW9tZW50LmdldERhdGUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQmVmb3JlIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChpc1NhbWUobW9tZW50KSB8fCBpc0JlZm9yZShtb21lbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbW9tZW50XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JBZnRlciAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoaXNTYW1lKG1vbWVudCkgfHwgaXNBZnRlcihtb21lbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7RGF0ZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXREYXRlICgpIHtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vbWVudDsiLCIvKipcbiAqIEByZXR1cm5zIHt7Z2V0UGVybWlzc2lvbjogZ2V0UGVybWlzc2lvbiwgbm90aWZ5UGVyaW9kU3RhcnQ6IG5vdGlmeVBlcmlvZFN0YXJ0LCBub3RpZnlQZXJpb2RFbmQ6IG5vdGlmeVBlcmlvZEVuZH19XG4gKi9cbmZ1bmN0aW9uIG5vdGlmaWVyICgpIHtcbiAgICBpZiAoJ0F1ZGlvJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgdmFyIGJlbGwgPSBuZXcgQXVkaW8oJ2Fzc2V0cy9hdWRpby9iZWxsLm1wMycpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFBlcm1pc3Npb246IGdldFBlcm1pc3Npb24sXG4gICAgICAgIG5vdGlmeVBlcmlvZFN0YXJ0OiBub3RpZnlQZXJpb2RTdGFydCxcbiAgICAgICAgbm90aWZ5UGVyaW9kRW5kOiBub3RpZnlQZXJpb2RFbmRcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3RpZnkgKHRpdGxlLCBib2R5KSB7XG4gICAgICAgIGlmIChiZWxsKSB7XG4gICAgICAgICAgICBiZWxsLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBOb3RpZmljYXRpb24odGl0bGUsIHsgaWNvbjogJ2Fzc2V0cy9pbWcvaWNvbi1hbGFybS5wbmcnLCBib2R5OiBib2R5IH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm90aWZ5UGVyaW9kU3RhcnQgKHBlcmlvZFR5cGUpIHtcbiAgICAgICAgbm90aWZ5KGdldFBlcmlvZFN0YXJ0VGl0bGUocGVyaW9kVHlwZSksIGdldFBlcmlvZFN0YXJ0Qm9keShwZXJpb2RUeXBlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFBlcmlvZFN0YXJ0VGl0bGUgKHBlcmlvZFR5cGUpIHtcbiAgICAgICAgcmV0dXJuICdOZXcgcGVyaW9kIHN0YXJ0ZWQ6ICcgKyBwZXJpb2RUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UGVyaW9kU3RhcnRCb2R5IChwZXJpb2RUeXBlKSB7XG4gICAgICAgIGlmIChwZXJpb2RUeXBlID09PSAnYnJlYWsnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0FuZCBzbmFwIG91dCBvZiBpdDsgeW91ciBicmVhayBoYXMganVzdCBiZWd1bi4gTmVlZCBjb2ZmZWUgb3Igd2F0ZXI/IENhbiB5b3UgcmV2aWV3IHNvbWVvbmVzIHdvcms/JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwZXJpb2RUeXBlID09PSAnd29yaycpIHtcbiAgICAgICAgICAgIHJldHVybiAnU3dlZXQuIFlvdXIgMjUgbWludXRlcyB3aXRob3V0IGRpc3RyYWN0aW9uIGhhdmUganVzdCBiZWd1bi4gR28gZm9ydGggYW5kIGJ1aWxkISc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVyaW9kVHlwZSA9PT0gJ2x1bmNoJykge1xuICAgICAgICAgICAgcmV0dXJuICdPbW5vbW5vbW5vbW5vbSwgZm9vZCEgRW5qb3khJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBlcm1pc3Npb24gKCkge1xuICAgICAgICBpZiAoISgnTm90aWZpY2F0aW9uJykgaW4gd2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09ICdncmFudGVkJyB8fCBOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gJ2RlbmllZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3RpZmllcjsiLCIvKipcbiAqIEBwYXJhbSBub3dcbiAqIEBwYXJhbSBnZXRNb21lbnRcbiAqIEByZXR1cm5zIHt7dHlwZTogc3RyaW5nLCBzdGFydDoge30sIGVuZDoge319fVxuICovXG5mdW5jdGlvbiBnZXRQZXJpb2QgKG5vdywgZ2V0TW9tZW50KSB7XG4gICAgdmFyIHBlcmlvZFR5cGVzID0ge1xuICAgICAgICB3b3JrOiAnd29yaycsXG4gICAgICAgIGx1bmNoOiAnbHVuY2gnLFxuICAgICAgICBicmVhazogJ2JyZWFrJ1xuICAgIH07XG5cbiAgICB2YXIgbHVuY2hTdGFydCA9IGdldE1vbWVudCgpLmhvdXJzKDEyKS5taW51dGVzKDMwKS5zZWNvbmRzKDApO1xuICAgIHZhciBsdW5jaEVuZCA9IGdldE1vbWVudCgpLmhvdXJzKDEyKS5taW51dGVzKDU5KS5zZWNvbmRzKDU5KTtcblxuICAgIGlmIChub3cuaXNTYW1lT3JBZnRlcihsdW5jaFN0YXJ0KSAmJiBub3cuaXNTYW1lT3JCZWZvcmUobHVuY2hFbmQpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy5sdW5jaCxcbiAgICAgICAgICAgIHN0YXJ0OiBsdW5jaFN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBsdW5jaEVuZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChub3cubWludXRlcygpID49IDI1ICYmIG5vdy5taW51dGVzKCkgPCAzMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogcGVyaW9kVHlwZXMuYnJlYWssXG4gICAgICAgICAgICBzdGFydDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoMjUpLnNlY29uZHMoMCksXG4gICAgICAgICAgICBlbmQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDI5KS5zZWNvbmRzKDU5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vdy5taW51dGVzKCkgPj0gNTUgJiYgbm93Lm1pbnV0ZXMoKSA8IDYwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy5icmVhayxcbiAgICAgICAgICAgIHN0YXJ0OiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcyg1NSkuc2Vjb25kcygwKSxcbiAgICAgICAgICAgIGVuZDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoNTkpLnNlY29uZHMoNTkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm93Lm1pbnV0ZXMoKSA8IDI1KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy53b3JrLFxuICAgICAgICAgICAgc3RhcnQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDApLnNlY29uZHMoMCksXG4gICAgICAgICAgICBlbmQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDI0KS5zZWNvbmRzKDU5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogcGVyaW9kVHlwZXMud29yayxcbiAgICAgICAgc3RhcnQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDMwKS5zZWNvbmRzKDApLFxuICAgICAgICBlbmQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDU0KS5zZWNvbmRzKDU5KVxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UGVyaW9kOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFBlcmlvZCA9IHJlcXVpcmUoJy4vZ2V0UGVyaW9kJyk7XG52YXIgZ2V0TW9tZW50ID0gcmVxdWlyZSgnLi9nZXRNb21lbnQnKTtcbnZhciBnZXREdXJhdGlvbiA9IHJlcXVpcmUoJy4vZ2V0RHVyYXRpb24nKTtcbnZhciBnZXROb3RpZmllciA9IHJlcXVpcmUoJy4vZ2V0Tm90aWZpZXInKTtcblxuZnVuY3Rpb24gc25vZXBUaW1lciAoKSB7XG4gICAgdmFyIG5vdGlmaWVyID0gZ2V0Tm90aWZpZXIoKTtcbiAgICB2YXIgY291bnRlckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc25vZXBUaW1lcicpO1xuICAgIHZhciBjdXJyZW50UGVyaW9kVHlwZTtcblxuICAgIG5vdGlmaWVyLmdldFBlcm1pc3Npb24oKTtcbiAgICB3aW5kb3cuc2V0SW50ZXJ2YWwodXBkYXRlVGltZXIsIDEwMDApO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXIgKCkge1xuICAgICAgICB2YXIgbm93ID0gZ2V0TW9tZW50KCk7XG4gICAgICAgIHZhciBwZXJpb2QgPSBnZXRQZXJpb2Qobm93LCBnZXRNb21lbnQpO1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBnZXREdXJhdGlvbihwZXJpb2QuZW5kLCBub3cpO1xuXG4gICAgICAgIGNhc3ROb3RpZmljYXRpb25zKHBlcmlvZC50eXBlKTtcbiAgICAgICAgdXBkYXRlQnJvd3NlclRpdGxlKGR1cmF0aW9uLmh1bWFuaXplKCkpO1xuICAgICAgICBkcmF3Q291bnRlcihkdXJhdGlvbi5odW1hbml6ZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGVyaW9kVHlwZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhc3ROb3RpZmljYXRpb25zIChwZXJpb2RUeXBlKSB7XG4gICAgICAgIC8vIE5vdGlmeSB1c2VyIHRoYXQgbmV3IHBlcmlvZCBoYXMgc3RhcnRlZFxuICAgICAgICBpZiAoY3VycmVudFBlcmlvZFR5cGUgPT09IHBlcmlvZFR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRQZXJpb2RUeXBlID0gcGVyaW9kVHlwZTtcbiAgICAgICAgcmV0dXJuIG5vdGlmaWVyLm5vdGlmeVBlcmlvZFN0YXJ0KHBlcmlvZFR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lUmVtYWluaW5nVGV4dFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUJyb3dzZXJUaXRsZSAodGltZVJlbWFpbmluZ1RleHQpIHtcbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aW1lUmVtYWluaW5nVGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGltZVJlbWFpbmluZ1RleHRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkcmF3Q291bnRlciAodGltZVJlbWFpbmluZ1RleHQpIHtcbiAgICAgICAgY291bnRlckVsZW0uaW5uZXJIVE1MID0gdGltZVJlbWFpbmluZ1RleHQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNub2VwVGltZXI7Il19

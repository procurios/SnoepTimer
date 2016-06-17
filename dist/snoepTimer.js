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
        notifyPeriodStart: notifyPeriodStart
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
    var canvas = document.createElement('canvas');
    var favicon = document.getElementById('favicon');
    var counterElem = document.querySelector('.snoepTimer');
    var periodTypeElem = document.querySelector('.snoepTimer__periodType');
    var currentPeriodType;

    notifier.getPermission();
    window.setInterval(updateTimer, 1000);

    function updateTimer () {
        var now = getMoment();
        var period = getPeriod(now, getMoment);
        var duration = getDuration(period.end, now);

        castNotifications(period.type);
        updateBrowserTitle(duration.humanize());
        updateCounter(duration.humanize());
        updatePeriodType(period.type);
        updateFavIcon(duration);
    }

    /**
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
    function updateCounter (timeRemainingText) {
        counterElem.innerHTML = timeRemainingText;
    }

    /**
     * @param {string} periodType
     */
    function updatePeriodType (periodType) {
        if (currentPeriodType === periodType && periodTypeElem.innerHTML !== '') {
            return;
        }

        periodTypeElem.innerHTML = periodType;
    }

    /**
     * @param duration
     */
    function updateFavIcon (duration) {
        var remainingMinutes = (duration.minutes() < 10) ? '0' + duration.minutes() : duration.minutes();
        var remainingSeconds = (duration.seconds() < 10) ? '0' + duration.seconds() : duration.seconds();

        canvas.width = canvas.height = 16;
        var ctx = canvas.getContext('2d');

        ctx.font = 'regular 8px Courier';
        ctx.fillStyle = '#000';
        ctx.fillText(remainingMinutes, 0, 8, 16);
        ctx.fillText(remainingSeconds, 0, 16, 16);

        favicon.href = canvas.toDataURL('image/png');
    }
}

module.exports = snoepTimer;
},{"./getDuration":1,"./getMoment":2,"./getNotifier":3,"./getPeriod":4}]},{},[5])(5)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2V0RHVyYXRpb24uanMiLCJzcmMvZ2V0TW9tZW50LmpzIiwic3JjL2dldE5vdGlmaWVyLmpzIiwic3JjL2dldFBlcmlvZC5qcyIsInNyYy9zbm9lcFRpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBwYXJhbSBtb21lbnRFbmRcbiAqIEBwYXJhbSBtb21lbnRTdGFydFxuICogQHJldHVybnMge3tob3VyczogaG91cnMsIG1pbnV0ZXM6IG1pbnV0ZXMsIHNlY29uZHM6IHNlY29uZHMsIG1pbGxpc2Vjb25kczogbWlsbGlzZWNvbmRzLCBodW1hbml6ZTogaHVtYW5pemV9fVxuICovXG5mdW5jdGlvbiBkdXJhdGlvbiAobW9tZW50RW5kLCBtb21lbnRTdGFydCkge1xuICAgIHZhciBkaWZmID0gbW9tZW50RW5kLmRpZmYobW9tZW50U3RhcnQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaG91cnM6IGhvdXJzLFxuICAgICAgICBtaW51dGVzOiBtaW51dGVzLFxuICAgICAgICBzZWNvbmRzOiBzZWNvbmRzLFxuICAgICAgICBtaWxsaXNlY29uZHM6IG1pbGxpc2Vjb25kcyxcbiAgICAgICAgaHVtYW5pemU6IGh1bWFuaXplXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaG91cnMgKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoKChkaWZmIC8gMTAwMCkgLyA2MCkgLyA2MCwgMTApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWludXRlcyAoKSB7XG4gICAgICAgIHZhciBtaW51dGVzID0gKChkaWZmIC8gMTAwMCkgLyA2MCkgJSA2MDtcblxuICAgICAgICBpZiAobWludXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDYwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG1pbnV0ZXMsIDEwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7aW50fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlY29uZHMgKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZGlmZiAvIDEwMDApICUgNjApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWlsbGlzZWNvbmRzICgpIHtcbiAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBodW1hbml6ZSAoKSB7XG4gICAgICAgIHZhciBob3Vyc1RleHQgPSAoaG91cnMoKSA8IDEwKSA/ICcwJyArIGhvdXJzKCkgOiBob3VycygpO1xuICAgICAgICB2YXIgbWludXRlc1RleHQgPSAobWludXRlcygpIDwgMTApID8gJzAnICsgbWludXRlcygpIDogbWludXRlcygpO1xuICAgICAgICB2YXIgc2Vjb25kc1RleHQgPSAoc2Vjb25kcygpIDwgMTApID8gJzAnICsgc2Vjb25kcygpIDogc2Vjb25kcygpO1xuXG4gICAgICAgIGlmICghaG91cnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1pbnV0ZXNUZXh0ICsgJzonICsgc2Vjb25kc1RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaG91cnNUZXh0ICsgJzonICsgbWludXRlc1RleHQgKyAnOicgKyBzZWNvbmRzVGV4dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHVyYXRpb247IiwiLyoqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAqIEByZXR1cm5zIHt7aG91cnM6IGhvdXJzLCBtaW51dGVzOiBtaW51dGVzLCBzZWNvbmRzOiBzZWNvbmRzfX1cbiAqL1xuZnVuY3Rpb24gbW9tZW50IChkYXRlKSB7XG4gICAgaWYgKGRhdGUgJiYgIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgZGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIH1cblxuICAgIGRhdGUgPSBkYXRlIHx8IG5ldyBEYXRlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBob3VyczogaG91cnMsXG4gICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXG4gICAgICAgIHNlY29uZHM6IHNlY29uZHMsXG4gICAgICAgIGFkZDogYWRkLFxuICAgICAgICBzdWJ0cmFjdDogc3VidHJhY3QsXG4gICAgICAgIGRpZmY6IGRpZmYsXG4gICAgICAgIGlzU2FtZTogaXNTYW1lLFxuICAgICAgICBpc0FmdGVyOiBpc0FmdGVyLFxuICAgICAgICBpc0JlZm9yZTogaXNCZWZvcmUsXG4gICAgICAgIGlzU2FtZU9yQmVmb3JlOiBpc1NhbWVPckJlZm9yZSxcbiAgICAgICAgaXNTYW1lT3JBZnRlcjogaXNTYW1lT3JBZnRlcixcbiAgICAgICAgZ2V0RGF0ZTogZ2V0RGF0ZVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gbnJIb3Vyc1xuICAgICAqIEByZXR1cm5zIHtpbnR8e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gaG91cnMgKG5ySG91cnMpIHtcbiAgICAgICAgaWYgKCFuckhvdXJzICYmIG5ySG91cnMgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBuZXdEYXRlLnNldEhvdXJzKG5ySG91cnMpO1xuXG4gICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnR9IG5yTWludXRlc1xuICAgICAqIEByZXR1cm5zIHtpbnR8e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWludXRlcyAobnJNaW51dGVzKSB7XG4gICAgICAgIGlmICghbnJNaW51dGVzICYmIG5yTWludXRlcyAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgbmV3RGF0ZS5zZXRNaW51dGVzKG5yTWludXRlcyk7XG5cbiAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gbnJTZWNvbmRzXG4gICAgICogQHJldHVybnMge2ludHx7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWNvbmRzIChuclNlY29uZHMpIHtcbiAgICAgICAgaWYgKCFuclNlY29uZHMgJiYgbnJTZWNvbmRzICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBuZXdEYXRlLnNldFNlY29uZHMobnJTZWNvbmRzKTtcblxuICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRTdGFydFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZGlmZiAobW9tZW50U3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUgLSBtb21lbnRTdGFydC5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFtb3VudFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZCAoYW1vdW50LCB0eXBlKSB7XG4gICAgICAgIHZhciBuZXdEYXRlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc2Vjb25kcycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhkYXRlLmdldFNlY29uZHMoKSArIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdob3VycycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpICsgYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnZGF5cycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYW1vdW50XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gc3VidHJhY3QgKGFtb3VudCwgdHlwZSkge1xuICAgICAgICB2YXIgbmV3RGF0ZTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldFNlY29uZHMoZGF0ZS5nZXRTZWNvbmRzKCkgLSBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdtaW51dGVzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpIC0gYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnaG91cnMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSAtIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RheXMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU2FtZSAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoZGF0ZS5nZXRUaW1lKCkgPT09IG1vbWVudC5nZXREYXRlKCkuZ2V0VGltZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbW9tZW50XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNBZnRlciAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoZGF0ZSA+IG1vbWVudC5nZXREYXRlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0JlZm9yZSAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoZGF0ZSA8IG1vbWVudC5nZXREYXRlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1NhbWVPckJlZm9yZSAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoaXNTYW1lKG1vbWVudCkgfHwgaXNCZWZvcmUobW9tZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQWZ0ZXIgKG1vbWVudCkge1xuICAgICAgICByZXR1cm4gKGlzU2FtZShtb21lbnQpIHx8IGlzQWZ0ZXIobW9tZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0RhdGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb21lbnQ7IiwiLyoqXG4gKiBAcmV0dXJucyB7e2dldFBlcm1pc3Npb246IGdldFBlcm1pc3Npb24sIG5vdGlmeVBlcmlvZFN0YXJ0OiBub3RpZnlQZXJpb2RTdGFydCwgbm90aWZ5UGVyaW9kRW5kOiBub3RpZnlQZXJpb2RFbmR9fVxuICovXG5mdW5jdGlvbiBub3RpZmllciAoKSB7XG4gICAgaWYgKCdBdWRpbycgaW4gd2luZG93KSB7XG4gICAgICAgIHZhciBiZWxsID0gbmV3IEF1ZGlvKCdhc3NldHMvYXVkaW8vYmVsbC5tcDMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQZXJtaXNzaW9uOiBnZXRQZXJtaXNzaW9uLFxuICAgICAgICBub3RpZnlQZXJpb2RTdGFydDogbm90aWZ5UGVyaW9kU3RhcnRcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3RpZnkgKHRpdGxlLCBib2R5KSB7XG4gICAgICAgIGlmIChiZWxsKSB7XG4gICAgICAgICAgICBiZWxsLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBOb3RpZmljYXRpb24odGl0bGUsIHsgaWNvbjogJ2Fzc2V0cy9pbWcvaWNvbi1hbGFybS5wbmcnLCBib2R5OiBib2R5IH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm90aWZ5UGVyaW9kU3RhcnQgKHBlcmlvZFR5cGUpIHtcbiAgICAgICAgbm90aWZ5KGdldFBlcmlvZFN0YXJ0VGl0bGUocGVyaW9kVHlwZSksIGdldFBlcmlvZFN0YXJ0Qm9keShwZXJpb2RUeXBlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFBlcmlvZFN0YXJ0VGl0bGUgKHBlcmlvZFR5cGUpIHtcbiAgICAgICAgcmV0dXJuICdOZXcgcGVyaW9kIHN0YXJ0ZWQ6ICcgKyBwZXJpb2RUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UGVyaW9kU3RhcnRCb2R5IChwZXJpb2RUeXBlKSB7XG4gICAgICAgIGlmIChwZXJpb2RUeXBlID09PSAnYnJlYWsnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0FuZCBzbmFwIG91dCBvZiBpdDsgeW91ciBicmVhayBoYXMganVzdCBiZWd1bi4gTmVlZCBjb2ZmZWUgb3Igd2F0ZXI/IENhbiB5b3UgcmV2aWV3IHNvbWVvbmVzIHdvcms/JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwZXJpb2RUeXBlID09PSAnd29yaycpIHtcbiAgICAgICAgICAgIHJldHVybiAnU3dlZXQuIFlvdXIgMjUgbWludXRlcyB3aXRob3V0IGRpc3RyYWN0aW9uIGhhdmUganVzdCBiZWd1bi4gR28gZm9ydGggYW5kIGJ1aWxkISc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVyaW9kVHlwZSA9PT0gJ2x1bmNoJykge1xuICAgICAgICAgICAgcmV0dXJuICdPbW5vbW5vbW5vbW5vbSwgZm9vZCEgRW5qb3khJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBlcm1pc3Npb24gKCkge1xuICAgICAgICBpZiAoISgnTm90aWZpY2F0aW9uJykgaW4gd2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09ICdncmFudGVkJyB8fCBOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gJ2RlbmllZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3RpZmllcjsiLCIvKipcbiAqIEBwYXJhbSBub3dcbiAqIEBwYXJhbSBnZXRNb21lbnRcbiAqIEByZXR1cm5zIHt7dHlwZTogc3RyaW5nLCBzdGFydDoge30sIGVuZDoge319fVxuICovXG5mdW5jdGlvbiBnZXRQZXJpb2QgKG5vdywgZ2V0TW9tZW50KSB7XG4gICAgdmFyIHBlcmlvZFR5cGVzID0ge1xuICAgICAgICB3b3JrOiAnd29yaycsXG4gICAgICAgIGx1bmNoOiAnbHVuY2gnLFxuICAgICAgICBicmVhazogJ2JyZWFrJ1xuICAgIH07XG5cbiAgICB2YXIgbHVuY2hTdGFydCA9IGdldE1vbWVudCgpLmhvdXJzKDEyKS5taW51dGVzKDMwKS5zZWNvbmRzKDApO1xuICAgIHZhciBsdW5jaEVuZCA9IGdldE1vbWVudCgpLmhvdXJzKDEyKS5taW51dGVzKDU5KS5zZWNvbmRzKDU5KTtcblxuICAgIGlmIChub3cuaXNTYW1lT3JBZnRlcihsdW5jaFN0YXJ0KSAmJiBub3cuaXNTYW1lT3JCZWZvcmUobHVuY2hFbmQpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy5sdW5jaCxcbiAgICAgICAgICAgIHN0YXJ0OiBsdW5jaFN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBsdW5jaEVuZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChub3cubWludXRlcygpID49IDI1ICYmIG5vdy5taW51dGVzKCkgPCAzMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogcGVyaW9kVHlwZXMuYnJlYWssXG4gICAgICAgICAgICBzdGFydDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoMjUpLnNlY29uZHMoMCksXG4gICAgICAgICAgICBlbmQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDI5KS5zZWNvbmRzKDU5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vdy5taW51dGVzKCkgPj0gNTUgJiYgbm93Lm1pbnV0ZXMoKSA8IDYwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy5icmVhayxcbiAgICAgICAgICAgIHN0YXJ0OiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcyg1NSkuc2Vjb25kcygwKSxcbiAgICAgICAgICAgIGVuZDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoNTkpLnNlY29uZHMoNTkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm93Lm1pbnV0ZXMoKSA8IDI1KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy53b3JrLFxuICAgICAgICAgICAgc3RhcnQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDApLnNlY29uZHMoMCksXG4gICAgICAgICAgICBlbmQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDI0KS5zZWNvbmRzKDU5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogcGVyaW9kVHlwZXMud29yayxcbiAgICAgICAgc3RhcnQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDMwKS5zZWNvbmRzKDApLFxuICAgICAgICBlbmQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDU0KS5zZWNvbmRzKDU5KVxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UGVyaW9kOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFBlcmlvZCA9IHJlcXVpcmUoJy4vZ2V0UGVyaW9kJyk7XG52YXIgZ2V0TW9tZW50ID0gcmVxdWlyZSgnLi9nZXRNb21lbnQnKTtcbnZhciBnZXREdXJhdGlvbiA9IHJlcXVpcmUoJy4vZ2V0RHVyYXRpb24nKTtcbnZhciBnZXROb3RpZmllciA9IHJlcXVpcmUoJy4vZ2V0Tm90aWZpZXInKTtcblxuZnVuY3Rpb24gc25vZXBUaW1lciAoKSB7XG4gICAgdmFyIG5vdGlmaWVyID0gZ2V0Tm90aWZpZXIoKTtcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdmFyIGZhdmljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmF2aWNvbicpO1xuICAgIHZhciBjb3VudGVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbm9lcFRpbWVyJyk7XG4gICAgdmFyIHBlcmlvZFR5cGVFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNub2VwVGltZXJfX3BlcmlvZFR5cGUnKTtcbiAgICB2YXIgY3VycmVudFBlcmlvZFR5cGU7XG5cbiAgICBub3RpZmllci5nZXRQZXJtaXNzaW9uKCk7XG4gICAgd2luZG93LnNldEludGVydmFsKHVwZGF0ZVRpbWVyLCAxMDAwKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyICgpIHtcbiAgICAgICAgdmFyIG5vdyA9IGdldE1vbWVudCgpO1xuICAgICAgICB2YXIgcGVyaW9kID0gZ2V0UGVyaW9kKG5vdywgZ2V0TW9tZW50KTtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gZ2V0RHVyYXRpb24ocGVyaW9kLmVuZCwgbm93KTtcblxuICAgICAgICBjYXN0Tm90aWZpY2F0aW9ucyhwZXJpb2QudHlwZSk7XG4gICAgICAgIHVwZGF0ZUJyb3dzZXJUaXRsZShkdXJhdGlvbi5odW1hbml6ZSgpKTtcbiAgICAgICAgdXBkYXRlQ291bnRlcihkdXJhdGlvbi5odW1hbml6ZSgpKTtcbiAgICAgICAgdXBkYXRlUGVyaW9kVHlwZShwZXJpb2QudHlwZSk7XG4gICAgICAgIHVwZGF0ZUZhdkljb24oZHVyYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FzdE5vdGlmaWNhdGlvbnMgKHBlcmlvZFR5cGUpIHtcbiAgICAgICAgLy8gTm90aWZ5IHVzZXIgdGhhdCBuZXcgcGVyaW9kIGhhcyBzdGFydGVkXG4gICAgICAgIGlmIChjdXJyZW50UGVyaW9kVHlwZSA9PT0gcGVyaW9kVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFBlcmlvZFR5cGUgPSBwZXJpb2RUeXBlO1xuICAgICAgICByZXR1cm4gbm90aWZpZXIubm90aWZ5UGVyaW9kU3RhcnQocGVyaW9kVHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpbWVSZW1haW5pbmdUZXh0XG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlQnJvd3NlclRpdGxlICh0aW1lUmVtYWluaW5nVGV4dCkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRpbWVSZW1haW5pbmdUZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lUmVtYWluaW5nVGV4dFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXIgKHRpbWVSZW1haW5pbmdUZXh0KSB7XG4gICAgICAgIGNvdW50ZXJFbGVtLmlubmVySFRNTCA9IHRpbWVSZW1haW5pbmdUZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlUGVyaW9kVHlwZSAocGVyaW9kVHlwZSkge1xuICAgICAgICBpZiAoY3VycmVudFBlcmlvZFR5cGUgPT09IHBlcmlvZFR5cGUgJiYgcGVyaW9kVHlwZUVsZW0uaW5uZXJIVE1MICE9PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcGVyaW9kVHlwZUVsZW0uaW5uZXJIVE1MID0gcGVyaW9kVHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVGYXZJY29uIChkdXJhdGlvbikge1xuICAgICAgICB2YXIgcmVtYWluaW5nTWludXRlcyA9IChkdXJhdGlvbi5taW51dGVzKCkgPCAxMCkgPyAnMCcgKyBkdXJhdGlvbi5taW51dGVzKCkgOiBkdXJhdGlvbi5taW51dGVzKCk7XG4gICAgICAgIHZhciByZW1haW5pbmdTZWNvbmRzID0gKGR1cmF0aW9uLnNlY29uZHMoKSA8IDEwKSA/ICcwJyArIGR1cmF0aW9uLnNlY29uZHMoKSA6IGR1cmF0aW9uLnNlY29uZHMoKTtcblxuICAgICAgICBjYW52YXMud2lkdGggPSBjYW52YXMuaGVpZ2h0ID0gMTY7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICBjdHguZm9udCA9ICdyZWd1bGFyIDhweCBDb3VyaWVyJztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KHJlbWFpbmluZ01pbnV0ZXMsIDAsIDgsIDE2KTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHJlbWFpbmluZ1NlY29uZHMsIDAsIDE2LCAxNik7XG5cbiAgICAgICAgZmF2aWNvbi5ocmVmID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNub2VwVGltZXI7Il19

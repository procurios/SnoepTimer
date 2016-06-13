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
     */
    function notifyPeriodEnd (periodType) {
        notify(getPeriodEndTitle(periodType), getPeriodEndBody(periodType));
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

    /**
     * @param {string} periodType
     * @returns {string}
     */
    function getPeriodEndTitle (periodType) {
        return 'Period about to end: ' + periodType;
    }

    /**
     * @param {string} periodType
     * @returns {*}
     */
    function getPeriodEndBody (periodType) {
        if (periodType === 'break') {
            return 'Coffee: ✓. Board updated: ✓. All messages answered: ✓. All set to get back to work!';
        }

        if (periodType === 'work') {
            return 'Break coming up. Time to create a snapshot of your work, and maybe even get it reviewed?';
        }

        if (periodType === 'lunch') {
            return 'Hopefully you are past your after-lunch dip, because a fresh period of work is starting soon.';
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
    var isPeriodEndsNotificationSent = false;

    notifier.getPermission();
    window.setInterval(updateTimer, 1000);

    function updateTimer () {
        var now = getMoment();
        var period = getPeriod(now, getMoment);
        var duration = getDuration(period.end, now);

        castNotifications(duration, period.type);
        updateBrowserTitle(duration.humanize());
        drawCounter(duration.humanize());
    }

    /**
     * @param duration
     * @param {string} periodType
     * @returns {*}
     */
    function castNotifications (duration, periodType) {
        // Notify user that new period has started
        if (currentPeriodType !== periodType) {
            isPeriodEndsNotificationSent = false;
            currentPeriodType = periodType;
            return notifier.notifyPeriodStart(periodType);
        }

        // Notify user that current period is about to end
        if (duration.minutes() <= 1 && !isPeriodEndsNotificationSent) {
            isPeriodEndsNotificationSent = true;
            return notifier.notifyPeriodEnd(periodType + ' is about to end');
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2V0RHVyYXRpb24uanMiLCJzcmMvZ2V0TW9tZW50LmpzIiwic3JjL2dldE5vdGlmaWVyLmpzIiwic3JjL2dldFBlcmlvZC5qcyIsInNyYy9zbm9lcFRpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBwYXJhbSBtb21lbnRFbmRcbiAqIEBwYXJhbSBtb21lbnRTdGFydFxuICogQHJldHVybnMge3tob3VyczogaG91cnMsIG1pbnV0ZXM6IG1pbnV0ZXMsIHNlY29uZHM6IHNlY29uZHMsIG1pbGxpc2Vjb25kczogbWlsbGlzZWNvbmRzLCBodW1hbml6ZTogaHVtYW5pemV9fVxuICovXG5mdW5jdGlvbiBkdXJhdGlvbiAobW9tZW50RW5kLCBtb21lbnRTdGFydCkge1xuICAgIHZhciBkaWZmID0gbW9tZW50RW5kLmRpZmYobW9tZW50U3RhcnQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaG91cnM6IGhvdXJzLFxuICAgICAgICBtaW51dGVzOiBtaW51dGVzLFxuICAgICAgICBzZWNvbmRzOiBzZWNvbmRzLFxuICAgICAgICBtaWxsaXNlY29uZHM6IG1pbGxpc2Vjb25kcyxcbiAgICAgICAgaHVtYW5pemU6IGh1bWFuaXplXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaG91cnMgKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoKChkaWZmIC8gMTAwMCkgLyA2MCkgLyA2MCwgMTApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWludXRlcyAoKSB7XG4gICAgICAgIHZhciBtaW51dGVzID0gKChkaWZmIC8gMTAwMCkgLyA2MCkgJSA2MDtcblxuICAgICAgICBpZiAobWludXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDYwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG1pbnV0ZXMsIDEwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7aW50fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlY29uZHMgKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoZGlmZiAvIDEwMDApICUgNjApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWlsbGlzZWNvbmRzICgpIHtcbiAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBodW1hbml6ZSAoKSB7XG4gICAgICAgIHZhciBob3Vyc1RleHQgPSAoaG91cnMoKSA8IDEwKSA/ICcwJyArIGhvdXJzKCkgOiBob3VycygpO1xuICAgICAgICB2YXIgbWludXRlc1RleHQgPSAobWludXRlcygpIDwgMTApID8gJzAnICsgbWludXRlcygpIDogbWludXRlcygpO1xuICAgICAgICB2YXIgc2Vjb25kc1RleHQgPSAoc2Vjb25kcygpIDwgMTApID8gJzAnICsgc2Vjb25kcygpIDogc2Vjb25kcygpO1xuXG4gICAgICAgIGlmICghaG91cnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1pbnV0ZXNUZXh0ICsgJzonICsgc2Vjb25kc1RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaG91cnNUZXh0ICsgJzonICsgbWludXRlc1RleHQgKyAnOicgKyBzZWNvbmRzVGV4dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHVyYXRpb247IiwiLyoqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAqIEByZXR1cm5zIHt7aG91cnM6IGhvdXJzLCBtaW51dGVzOiBtaW51dGVzLCBzZWNvbmRzOiBzZWNvbmRzfX1cbiAqL1xuZnVuY3Rpb24gbW9tZW50IChkYXRlKSB7XG4gICAgaWYgKGRhdGUgJiYgIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgZGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIH1cblxuICAgIGRhdGUgPSBkYXRlIHx8IG5ldyBEYXRlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBob3VyczogaG91cnMsXG4gICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXG4gICAgICAgIHNlY29uZHM6IHNlY29uZHMsXG4gICAgICAgIGFkZDogYWRkLFxuICAgICAgICBzdWJ0cmFjdDogc3VidHJhY3QsXG4gICAgICAgIGRpZmY6IGRpZmYsXG4gICAgICAgIGlzU2FtZTogaXNTYW1lLFxuICAgICAgICBpc0FmdGVyOiBpc0FmdGVyLFxuICAgICAgICBpc0JlZm9yZTogaXNCZWZvcmUsXG4gICAgICAgIGlzU2FtZU9yQmVmb3JlOiBpc1NhbWVPckJlZm9yZSxcbiAgICAgICAgaXNTYW1lT3JBZnRlcjogaXNTYW1lT3JBZnRlcixcbiAgICAgICAgZ2V0RGF0ZTogZ2V0RGF0ZVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gbnJIb3Vyc1xuICAgICAqIEByZXR1cm5zIHtpbnR8e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gaG91cnMgKG5ySG91cnMpIHtcbiAgICAgICAgaWYgKCFuckhvdXJzICYmIG5ySG91cnMgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBuZXdEYXRlLnNldEhvdXJzKG5ySG91cnMpO1xuXG4gICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnR9IG5yTWludXRlc1xuICAgICAqIEByZXR1cm5zIHtpbnR8e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWludXRlcyAobnJNaW51dGVzKSB7XG4gICAgICAgIGlmICghbnJNaW51dGVzICYmIG5yTWludXRlcyAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgbmV3RGF0ZS5zZXRNaW51dGVzKG5yTWludXRlcyk7XG5cbiAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gbnJTZWNvbmRzXG4gICAgICogQHJldHVybnMge2ludHx7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWNvbmRzIChuclNlY29uZHMpIHtcbiAgICAgICAgaWYgKCFuclNlY29uZHMgJiYgbnJTZWNvbmRzICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBuZXdEYXRlLnNldFNlY29uZHMobnJTZWNvbmRzKTtcblxuICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRTdGFydFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZGlmZiAobW9tZW50U3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUgLSBtb21lbnRTdGFydC5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFtb3VudFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZCAoYW1vdW50LCB0eXBlKSB7XG4gICAgICAgIHZhciBuZXdEYXRlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc2Vjb25kcycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhkYXRlLmdldFNlY29uZHMoKSArIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdob3VycycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpICsgYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnZGF5cycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYW1vdW50XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gc3VidHJhY3QgKGFtb3VudCwgdHlwZSkge1xuICAgICAgICB2YXIgbmV3RGF0ZTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldFNlY29uZHMoZGF0ZS5nZXRTZWNvbmRzKCkgLSBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdtaW51dGVzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpIC0gYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnaG91cnMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSAtIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RheXMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU2FtZSAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoZGF0ZS5nZXRUaW1lKCkgPT09IG1vbWVudC5nZXREYXRlKCkuZ2V0VGltZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbW9tZW50XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNBZnRlciAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoZGF0ZSA+IG1vbWVudC5nZXREYXRlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0JlZm9yZSAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoZGF0ZSA8IG1vbWVudC5nZXREYXRlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1NhbWVPckJlZm9yZSAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoaXNTYW1lKG1vbWVudCkgfHwgaXNCZWZvcmUobW9tZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQWZ0ZXIgKG1vbWVudCkge1xuICAgICAgICByZXR1cm4gKGlzU2FtZShtb21lbnQpIHx8IGlzQWZ0ZXIobW9tZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0RhdGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb21lbnQ7IiwiLyoqXG4gKiBAcmV0dXJucyB7e2dldFBlcm1pc3Npb246IGdldFBlcm1pc3Npb24sIG5vdGlmeVBlcmlvZFN0YXJ0OiBub3RpZnlQZXJpb2RTdGFydCwgbm90aWZ5UGVyaW9kRW5kOiBub3RpZnlQZXJpb2RFbmR9fVxuICovXG5mdW5jdGlvbiBub3RpZmllciAoKSB7XG4gICAgaWYgKCdBdWRpbycgaW4gd2luZG93KSB7XG4gICAgICAgIHZhciBiZWxsID0gbmV3IEF1ZGlvKCdhc3NldHMvYXVkaW8vYmVsbC5tcDMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQZXJtaXNzaW9uOiBnZXRQZXJtaXNzaW9uLFxuICAgICAgICBub3RpZnlQZXJpb2RTdGFydDogbm90aWZ5UGVyaW9kU3RhcnQsXG4gICAgICAgIG5vdGlmeVBlcmlvZEVuZDogbm90aWZ5UGVyaW9kRW5kXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5XG4gICAgICovXG4gICAgZnVuY3Rpb24gbm90aWZ5ICh0aXRsZSwgYm9keSkge1xuICAgICAgICBpZiAoYmVsbCkge1xuICAgICAgICAgICAgYmVsbC5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXcgTm90aWZpY2F0aW9uKHRpdGxlLCB7IGljb246ICdhc3NldHMvaW1nL2ljb24tYWxhcm0ucG5nJywgYm9keTogYm9keSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGVyaW9kVHlwZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vdGlmeVBlcmlvZFN0YXJ0IChwZXJpb2RUeXBlKSB7XG4gICAgICAgIG5vdGlmeShnZXRQZXJpb2RTdGFydFRpdGxlKHBlcmlvZFR5cGUpLCBnZXRQZXJpb2RTdGFydEJvZHkocGVyaW9kVHlwZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm90aWZ5UGVyaW9kRW5kIChwZXJpb2RUeXBlKSB7XG4gICAgICAgIG5vdGlmeShnZXRQZXJpb2RFbmRUaXRsZShwZXJpb2RUeXBlKSwgZ2V0UGVyaW9kRW5kQm9keShwZXJpb2RUeXBlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFBlcmlvZFN0YXJ0VGl0bGUgKHBlcmlvZFR5cGUpIHtcbiAgICAgICAgcmV0dXJuICdOZXcgcGVyaW9kIHN0YXJ0ZWQ6ICcgKyBwZXJpb2RUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UGVyaW9kU3RhcnRCb2R5IChwZXJpb2RUeXBlKSB7XG4gICAgICAgIGlmIChwZXJpb2RUeXBlID09PSAnYnJlYWsnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0FuZCBzbmFwIG91dCBvZiBpdDsgeW91ciBicmVhayBoYXMganVzdCBiZWd1bi4gTmVlZCBjb2ZmZWUgb3Igd2F0ZXI/IENhbiB5b3UgcmV2aWV3IHNvbWVvbmVzIHdvcms/JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwZXJpb2RUeXBlID09PSAnd29yaycpIHtcbiAgICAgICAgICAgIHJldHVybiAnU3dlZXQuIFlvdXIgMjUgbWludXRlcyB3aXRob3V0IGRpc3RyYWN0aW9uIGhhdmUganVzdCBiZWd1bi4gR28gZm9ydGggYW5kIGJ1aWxkISc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVyaW9kVHlwZSA9PT0gJ2x1bmNoJykge1xuICAgICAgICAgICAgcmV0dXJuICdPbW5vbW5vbW5vbW5vbSwgZm9vZCEgRW5qb3khJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRQZXJpb2RFbmRUaXRsZSAocGVyaW9kVHlwZSkge1xuICAgICAgICByZXR1cm4gJ1BlcmlvZCBhYm91dCB0byBlbmQ6ICcgKyBwZXJpb2RUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwZXJpb2RUeXBlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UGVyaW9kRW5kQm9keSAocGVyaW9kVHlwZSkge1xuICAgICAgICBpZiAocGVyaW9kVHlwZSA9PT0gJ2JyZWFrJykge1xuICAgICAgICAgICAgcmV0dXJuICdDb2ZmZWU6IOKcky4gQm9hcmQgdXBkYXRlZDog4pyTLiBBbGwgbWVzc2FnZXMgYW5zd2VyZWQ6IOKcky4gQWxsIHNldCB0byBnZXQgYmFjayB0byB3b3JrISc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVyaW9kVHlwZSA9PT0gJ3dvcmsnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0JyZWFrIGNvbWluZyB1cC4gVGltZSB0byBjcmVhdGUgYSBzbmFwc2hvdCBvZiB5b3VyIHdvcmssIGFuZCBtYXliZSBldmVuIGdldCBpdCByZXZpZXdlZD8nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBlcmlvZFR5cGUgPT09ICdsdW5jaCcpIHtcbiAgICAgICAgICAgIHJldHVybiAnSG9wZWZ1bGx5IHlvdSBhcmUgcGFzdCB5b3VyIGFmdGVyLWx1bmNoIGRpcCwgYmVjYXVzZSBhIGZyZXNoIHBlcmlvZCBvZiB3b3JrIGlzIHN0YXJ0aW5nIHNvb24uJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQZXJtaXNzaW9uICgpIHtcbiAgICAgICAgaWYgKCEoJ05vdGlmaWNhdGlvbicpIGluIHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSAnZ3JhbnRlZCcgfHwgTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09ICdkZW5pZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm90aWZpZXI7IiwiLyoqXG4gKiBAcGFyYW0gbm93XG4gKiBAcGFyYW0gZ2V0TW9tZW50XG4gKiBAcmV0dXJucyB7e3R5cGU6IHN0cmluZywgc3RhcnQ6IHt9LCBlbmQ6IHt9fX1cbiAqL1xuZnVuY3Rpb24gZ2V0UGVyaW9kIChub3csIGdldE1vbWVudCkge1xuICAgIHZhciBwZXJpb2RUeXBlcyA9IHtcbiAgICAgICAgd29yazogJ3dvcmsnLFxuICAgICAgICBsdW5jaDogJ2x1bmNoJyxcbiAgICAgICAgYnJlYWs6ICdicmVhaydcbiAgICB9O1xuXG4gICAgdmFyIGx1bmNoU3RhcnQgPSBnZXRNb21lbnQoKS5ob3VycygxMikubWludXRlcygzMCkuc2Vjb25kcygwKTtcbiAgICB2YXIgbHVuY2hFbmQgPSBnZXRNb21lbnQoKS5ob3VycygxMikubWludXRlcyg1OSkuc2Vjb25kcyg1OSk7XG5cbiAgICBpZiAobm93LmlzU2FtZU9yQWZ0ZXIobHVuY2hTdGFydCkgJiYgbm93LmlzU2FtZU9yQmVmb3JlKGx1bmNoRW5kKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogcGVyaW9kVHlwZXMubHVuY2gsXG4gICAgICAgICAgICBzdGFydDogbHVuY2hTdGFydCxcbiAgICAgICAgICAgIGVuZDogbHVuY2hFbmRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAobm93Lm1pbnV0ZXMoKSA+PSAyNSAmJiBub3cubWludXRlcygpIDwgMzApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHBlcmlvZFR5cGVzLmJyZWFrLFxuICAgICAgICAgICAgc3RhcnQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDI1KS5zZWNvbmRzKDApLFxuICAgICAgICAgICAgZW5kOiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcygyOSkuc2Vjb25kcyg1OSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub3cubWludXRlcygpID49IDU1ICYmIG5vdy5taW51dGVzKCkgPCA2MCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogcGVyaW9kVHlwZXMuYnJlYWssXG4gICAgICAgICAgICBzdGFydDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoNTUpLnNlY29uZHMoMCksXG4gICAgICAgICAgICBlbmQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDU5KS5zZWNvbmRzKDU5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vdy5taW51dGVzKCkgPCAyNSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogcGVyaW9kVHlwZXMud29yayxcbiAgICAgICAgICAgIHN0YXJ0OiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcygwKS5zZWNvbmRzKDApLFxuICAgICAgICAgICAgZW5kOiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcygyNCkuc2Vjb25kcyg1OSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHBlcmlvZFR5cGVzLndvcmssXG4gICAgICAgIHN0YXJ0OiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcygzMCkuc2Vjb25kcygwKSxcbiAgICAgICAgZW5kOiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcyg1NCkuc2Vjb25kcyg1OSlcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFBlcmlvZDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRQZXJpb2QgPSByZXF1aXJlKCcuL2dldFBlcmlvZCcpO1xudmFyIGdldE1vbWVudCA9IHJlcXVpcmUoJy4vZ2V0TW9tZW50Jyk7XG52YXIgZ2V0RHVyYXRpb24gPSByZXF1aXJlKCcuL2dldER1cmF0aW9uJyk7XG52YXIgZ2V0Tm90aWZpZXIgPSByZXF1aXJlKCcuL2dldE5vdGlmaWVyJyk7XG5cbmZ1bmN0aW9uIHNub2VwVGltZXIgKCkge1xuICAgIHZhciBub3RpZmllciA9IGdldE5vdGlmaWVyKCk7XG4gICAgdmFyIGNvdW50ZXJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNub2VwVGltZXInKTtcbiAgICB2YXIgY3VycmVudFBlcmlvZFR5cGU7XG4gICAgdmFyIGlzUGVyaW9kRW5kc05vdGlmaWNhdGlvblNlbnQgPSBmYWxzZTtcblxuICAgIG5vdGlmaWVyLmdldFBlcm1pc3Npb24oKTtcbiAgICB3aW5kb3cuc2V0SW50ZXJ2YWwodXBkYXRlVGltZXIsIDEwMDApO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXIgKCkge1xuICAgICAgICB2YXIgbm93ID0gZ2V0TW9tZW50KCk7XG4gICAgICAgIHZhciBwZXJpb2QgPSBnZXRQZXJpb2Qobm93LCBnZXRNb21lbnQpO1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBnZXREdXJhdGlvbihwZXJpb2QuZW5kLCBub3cpO1xuXG4gICAgICAgIGNhc3ROb3RpZmljYXRpb25zKGR1cmF0aW9uLCBwZXJpb2QudHlwZSk7XG4gICAgICAgIHVwZGF0ZUJyb3dzZXJUaXRsZShkdXJhdGlvbi5odW1hbml6ZSgpKTtcbiAgICAgICAgZHJhd0NvdW50ZXIoZHVyYXRpb24uaHVtYW5pemUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjYXN0Tm90aWZpY2F0aW9ucyAoZHVyYXRpb24sIHBlcmlvZFR5cGUpIHtcbiAgICAgICAgLy8gTm90aWZ5IHVzZXIgdGhhdCBuZXcgcGVyaW9kIGhhcyBzdGFydGVkXG4gICAgICAgIGlmIChjdXJyZW50UGVyaW9kVHlwZSAhPT0gcGVyaW9kVHlwZSkge1xuICAgICAgICAgICAgaXNQZXJpb2RFbmRzTm90aWZpY2F0aW9uU2VudCA9IGZhbHNlO1xuICAgICAgICAgICAgY3VycmVudFBlcmlvZFR5cGUgPSBwZXJpb2RUeXBlO1xuICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWVyLm5vdGlmeVBlcmlvZFN0YXJ0KHBlcmlvZFR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90aWZ5IHVzZXIgdGhhdCBjdXJyZW50IHBlcmlvZCBpcyBhYm91dCB0byBlbmRcbiAgICAgICAgaWYgKGR1cmF0aW9uLm1pbnV0ZXMoKSA8PSAxICYmICFpc1BlcmlvZEVuZHNOb3RpZmljYXRpb25TZW50KSB7XG4gICAgICAgICAgICBpc1BlcmlvZEVuZHNOb3RpZmljYXRpb25TZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBub3RpZmllci5ub3RpZnlQZXJpb2RFbmQocGVyaW9kVHlwZSArICcgaXMgYWJvdXQgdG8gZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGltZVJlbWFpbmluZ1RleHRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVCcm93c2VyVGl0bGUgKHRpbWVSZW1haW5pbmdUZXh0KSB7XG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGltZVJlbWFpbmluZ1RleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpbWVSZW1haW5pbmdUZXh0XG4gICAgICovXG4gICAgZnVuY3Rpb24gZHJhd0NvdW50ZXIgKHRpbWVSZW1haW5pbmdUZXh0KSB7XG4gICAgICAgIGNvdW50ZXJFbGVtLmlubmVySFRNTCA9IHRpbWVSZW1haW5pbmdUZXh0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzbm9lcFRpbWVyOyJdfQ==

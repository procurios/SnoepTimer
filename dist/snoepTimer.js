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
}

module.exports = snoepTimer;
},{"./getDuration":1,"./getMoment":2,"./getNotifier":3,"./getPeriod":4}]},{},[5])(5)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2V0RHVyYXRpb24uanMiLCJzcmMvZ2V0TW9tZW50LmpzIiwic3JjL2dldE5vdGlmaWVyLmpzIiwic3JjL2dldFBlcmlvZC5qcyIsInNyYy9zbm9lcFRpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQHBhcmFtIG1vbWVudEVuZFxuICogQHBhcmFtIG1vbWVudFN0YXJ0XG4gKiBAcmV0dXJucyB7e2hvdXJzOiBob3VycywgbWludXRlczogbWludXRlcywgc2Vjb25kczogc2Vjb25kcywgbWlsbGlzZWNvbmRzOiBtaWxsaXNlY29uZHMsIGh1bWFuaXplOiBodW1hbml6ZX19XG4gKi9cbmZ1bmN0aW9uIGR1cmF0aW9uIChtb21lbnRFbmQsIG1vbWVudFN0YXJ0KSB7XG4gICAgdmFyIGRpZmYgPSBtb21lbnRFbmQuZGlmZihtb21lbnRTdGFydCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBob3VyczogaG91cnMsXG4gICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXG4gICAgICAgIHNlY29uZHM6IHNlY29uZHMsXG4gICAgICAgIG1pbGxpc2Vjb25kczogbWlsbGlzZWNvbmRzLFxuICAgICAgICBodW1hbml6ZTogaHVtYW5pemVcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBob3VycyAoKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCgoKGRpZmYgLyAxMDAwKSAvIDYwKSAvIDYwLCAxMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtaW51dGVzICgpIHtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSAoKGRpZmYgLyAxMDAwKSAvIDYwKSAlIDYwO1xuXG4gICAgICAgIGlmIChtaW51dGVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gNjA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VJbnQobWludXRlcywgMTApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2Vjb25kcyAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChkaWZmIC8gMTAwMCkgJSA2MCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtaWxsaXNlY29uZHMgKCkge1xuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGh1bWFuaXplICgpIHtcbiAgICAgICAgdmFyIGhvdXJzVGV4dCA9IChob3VycygpIDwgMTApID8gJzAnICsgaG91cnMoKSA6IGhvdXJzKCk7XG4gICAgICAgIHZhciBtaW51dGVzVGV4dCA9IChtaW51dGVzKCkgPCAxMCkgPyAnMCcgKyBtaW51dGVzKCkgOiBtaW51dGVzKCk7XG4gICAgICAgIHZhciBzZWNvbmRzVGV4dCA9IChzZWNvbmRzKCkgPCAxMCkgPyAnMCcgKyBzZWNvbmRzKCkgOiBzZWNvbmRzKCk7XG5cbiAgICAgICAgaWYgKCFob3VycygpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWludXRlc1RleHQgKyAnOicgKyBzZWNvbmRzVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBob3Vyc1RleHQgKyAnOicgKyBtaW51dGVzVGV4dCArICc6JyArIHNlY29uZHNUZXh0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkdXJhdGlvbjsiLCIvKipcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHJldHVybnMge3tob3VyczogaG91cnMsIG1pbnV0ZXM6IG1pbnV0ZXMsIHNlY29uZHM6IHNlY29uZHN9fVxuICovXG5mdW5jdGlvbiBtb21lbnQgKGRhdGUpIHtcbiAgICBpZiAoZGF0ZSAmJiAhKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICBkYXRlID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhvdXJzOiBob3VycyxcbiAgICAgICAgbWludXRlczogbWludXRlcyxcbiAgICAgICAgc2Vjb25kczogc2Vjb25kcyxcbiAgICAgICAgYWRkOiBhZGQsXG4gICAgICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCxcbiAgICAgICAgZGlmZjogZGlmZixcbiAgICAgICAgaXNTYW1lOiBpc1NhbWUsXG4gICAgICAgIGlzQWZ0ZXI6IGlzQWZ0ZXIsXG4gICAgICAgIGlzQmVmb3JlOiBpc0JlZm9yZSxcbiAgICAgICAgaXNTYW1lT3JCZWZvcmU6IGlzU2FtZU9yQmVmb3JlLFxuICAgICAgICBpc1NhbWVPckFmdGVyOiBpc1NhbWVPckFmdGVyLFxuICAgICAgICBnZXREYXRlOiBnZXREYXRlXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50fSBuckhvdXJzXG4gICAgICogQHJldHVybnMge2ludHx7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBob3VycyAobnJIb3Vycykge1xuICAgICAgICBpZiAoIW5ySG91cnMgJiYgbnJIb3VycyAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIG5ld0RhdGUuc2V0SG91cnMobnJIb3Vycyk7XG5cbiAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gbnJNaW51dGVzXG4gICAgICogQHJldHVybnMge2ludHx7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtaW51dGVzIChuck1pbnV0ZXMpIHtcbiAgICAgICAgaWYgKCFuck1pbnV0ZXMgJiYgbnJNaW51dGVzICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBuZXdEYXRlLnNldE1pbnV0ZXMobnJNaW51dGVzKTtcblxuICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50fSBuclNlY29uZHNcbiAgICAgKiBAcmV0dXJucyB7aW50fHt9fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlY29uZHMgKG5yU2Vjb25kcykge1xuICAgICAgICBpZiAoIW5yU2Vjb25kcyAmJiBuclNlY29uZHMgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhuclNlY29uZHMpO1xuXG4gICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFN0YXJ0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkaWZmIChtb21lbnRTdGFydCkge1xuICAgICAgICByZXR1cm4gZGF0ZSAtIG1vbWVudFN0YXJ0LmdldERhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYW1vdW50XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkIChhbW91bnQsIHR5cGUpIHtcbiAgICAgICAgdmFyIG5ld0RhdGU7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzZWNvbmRzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXRTZWNvbmRzKGRhdGUuZ2V0U2Vjb25kcygpICsgYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnbWludXRlcycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ2hvdXJzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdkYXlzJykge1xuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhbW91bnRcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHt7fX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdWJ0cmFjdCAoYW1vdW50LCB0eXBlKSB7XG4gICAgICAgIHZhciBuZXdEYXRlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc2Vjb25kcycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhkYXRlLmdldFNlY29uZHMoKSAtIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICAgICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgLSBhbW91bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ld0RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdob3VycycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpIC0gYW1vdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXdEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnZGF5cycpIHtcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIGFtb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnQobmV3RGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbW9tZW50XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTYW1lIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlLmdldFRpbWUoKSA9PT0gbW9tZW50LmdldERhdGUoKS5nZXRUaW1lKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtb21lbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0FmdGVyIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlID4gbW9tZW50LmdldERhdGUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQmVmb3JlIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlIDwgbW9tZW50LmdldERhdGUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1vbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQmVmb3JlIChtb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIChpc1NhbWUobW9tZW50KSB8fCBpc0JlZm9yZShtb21lbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbW9tZW50XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JBZnRlciAobW9tZW50KSB7XG4gICAgICAgIHJldHVybiAoaXNTYW1lKG1vbWVudCkgfHwgaXNBZnRlcihtb21lbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7RGF0ZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXREYXRlICgpIHtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vbWVudDsiLCIvKipcbiAqIEByZXR1cm5zIHt7Z2V0UGVybWlzc2lvbjogZ2V0UGVybWlzc2lvbiwgbm90aWZ5UGVyaW9kU3RhcnQ6IG5vdGlmeVBlcmlvZFN0YXJ0LCBub3RpZnlQZXJpb2RFbmQ6IG5vdGlmeVBlcmlvZEVuZH19XG4gKi9cbmZ1bmN0aW9uIG5vdGlmaWVyICgpIHtcbiAgICBpZiAoJ0F1ZGlvJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgdmFyIGJlbGwgPSBuZXcgQXVkaW8oJ2Fzc2V0cy9hdWRpby9iZWxsLm1wMycpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFBlcm1pc3Npb246IGdldFBlcm1pc3Npb24sXG4gICAgICAgIG5vdGlmeVBlcmlvZFN0YXJ0OiBub3RpZnlQZXJpb2RTdGFydFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vdGlmeSAodGl0bGUsIGJvZHkpIHtcbiAgICAgICAgaWYgKGJlbGwpIHtcbiAgICAgICAgICAgIGJlbGwucGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3IE5vdGlmaWNhdGlvbih0aXRsZSwgeyBpY29uOiAnYXNzZXRzL2ltZy9pY29uLWFsYXJtLnBuZycsIGJvZHk6IGJvZHkgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3RpZnlQZXJpb2RTdGFydCAocGVyaW9kVHlwZSkge1xuICAgICAgICBub3RpZnkoZ2V0UGVyaW9kU3RhcnRUaXRsZShwZXJpb2RUeXBlKSwgZ2V0UGVyaW9kU3RhcnRCb2R5KHBlcmlvZFR5cGUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGVyaW9kVHlwZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UGVyaW9kU3RhcnRUaXRsZSAocGVyaW9kVHlwZSkge1xuICAgICAgICByZXR1cm4gJ05ldyBwZXJpb2Qgc3RhcnRlZDogJyArIHBlcmlvZFR5cGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRQZXJpb2RTdGFydEJvZHkgKHBlcmlvZFR5cGUpIHtcbiAgICAgICAgaWYgKHBlcmlvZFR5cGUgPT09ICdicmVhaycpIHtcbiAgICAgICAgICAgIHJldHVybiAnQW5kIHNuYXAgb3V0IG9mIGl0OyB5b3VyIGJyZWFrIGhhcyBqdXN0IGJlZ3VuLiBOZWVkIGNvZmZlZSBvciB3YXRlcj8gQ2FuIHlvdSByZXZpZXcgc29tZW9uZXMgd29yaz8nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBlcmlvZFR5cGUgPT09ICd3b3JrJykge1xuICAgICAgICAgICAgcmV0dXJuICdTd2VldC4gWW91ciAyNSBtaW51dGVzIHdpdGhvdXQgZGlzdHJhY3Rpb24gaGF2ZSBqdXN0IGJlZ3VuLiBHbyBmb3J0aCBhbmQgYnVpbGQhJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwZXJpb2RUeXBlID09PSAnbHVuY2gnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ09tbm9tbm9tbm9tbm9tLCBmb29kISBFbmpveSEnXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGVybWlzc2lvbiAoKSB7XG4gICAgICAgIGlmICghKCdOb3RpZmljYXRpb24nKSBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gJ2dyYW50ZWQnIHx8IE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSAnZGVuaWVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdGlmaWVyOyIsIi8qKlxuICogQHBhcmFtIG5vd1xuICogQHBhcmFtIGdldE1vbWVudFxuICogQHJldHVybnMge3t0eXBlOiBzdHJpbmcsIHN0YXJ0OiB7fSwgZW5kOiB7fX19XG4gKi9cbmZ1bmN0aW9uIGdldFBlcmlvZCAobm93LCBnZXRNb21lbnQpIHtcbiAgICB2YXIgcGVyaW9kVHlwZXMgPSB7XG4gICAgICAgIHdvcms6ICd3b3JrJyxcbiAgICAgICAgbHVuY2g6ICdsdW5jaCcsXG4gICAgICAgIGJyZWFrOiAnYnJlYWsnXG4gICAgfTtcblxuICAgIHZhciBsdW5jaFN0YXJ0ID0gZ2V0TW9tZW50KCkuaG91cnMoMTIpLm1pbnV0ZXMoMzApLnNlY29uZHMoMCk7XG4gICAgdmFyIGx1bmNoRW5kID0gZ2V0TW9tZW50KCkuaG91cnMoMTIpLm1pbnV0ZXMoNTkpLnNlY29uZHMoNTkpO1xuXG4gICAgaWYgKG5vdy5pc1NhbWVPckFmdGVyKGx1bmNoU3RhcnQpICYmIG5vdy5pc1NhbWVPckJlZm9yZShsdW5jaEVuZCkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHBlcmlvZFR5cGVzLmx1bmNoLFxuICAgICAgICAgICAgc3RhcnQ6IGx1bmNoU3RhcnQsXG4gICAgICAgICAgICBlbmQ6IGx1bmNoRW5kXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKG5vdy5taW51dGVzKCkgPj0gMjUgJiYgbm93Lm1pbnV0ZXMoKSA8IDMwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy5icmVhayxcbiAgICAgICAgICAgIHN0YXJ0OiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcygyNSkuc2Vjb25kcygwKSxcbiAgICAgICAgICAgIGVuZDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoMjkpLnNlY29uZHMoNTkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm93Lm1pbnV0ZXMoKSA+PSA1NSAmJiBub3cubWludXRlcygpIDwgNjApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHBlcmlvZFR5cGVzLmJyZWFrLFxuICAgICAgICAgICAgc3RhcnQ6IGdldE1vbWVudChub3cpLmhvdXJzKG5vdy5ob3VycygpKS5taW51dGVzKDU1KS5zZWNvbmRzKDApLFxuICAgICAgICAgICAgZW5kOiBnZXRNb21lbnQobm93KS5ob3Vycyhub3cuaG91cnMoKSkubWludXRlcyg1OSkuc2Vjb25kcyg1OSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub3cubWludXRlcygpIDwgMjUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHBlcmlvZFR5cGVzLndvcmssXG4gICAgICAgICAgICBzdGFydDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoMCkuc2Vjb25kcygwKSxcbiAgICAgICAgICAgIGVuZDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoMjQpLnNlY29uZHMoNTkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBwZXJpb2RUeXBlcy53b3JrLFxuICAgICAgICBzdGFydDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoMzApLnNlY29uZHMoMCksXG4gICAgICAgIGVuZDogZ2V0TW9tZW50KG5vdykuaG91cnMobm93LmhvdXJzKCkpLm1pbnV0ZXMoNTQpLnNlY29uZHMoNTkpXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRQZXJpb2Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0UGVyaW9kID0gcmVxdWlyZSgnLi9nZXRQZXJpb2QnKTtcbnZhciBnZXRNb21lbnQgPSByZXF1aXJlKCcuL2dldE1vbWVudCcpO1xudmFyIGdldER1cmF0aW9uID0gcmVxdWlyZSgnLi9nZXREdXJhdGlvbicpO1xudmFyIGdldE5vdGlmaWVyID0gcmVxdWlyZSgnLi9nZXROb3RpZmllcicpO1xuXG5mdW5jdGlvbiBzbm9lcFRpbWVyICgpIHtcbiAgICB2YXIgbm90aWZpZXIgPSBnZXROb3RpZmllcigpO1xuICAgIHZhciBjb3VudGVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbm9lcFRpbWVyJyk7XG4gICAgdmFyIHBlcmlvZFR5cGVFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNub2VwVGltZXJfX3BlcmlvZFR5cGUnKTtcbiAgICB2YXIgY3VycmVudFBlcmlvZFR5cGU7XG5cbiAgICBub3RpZmllci5nZXRQZXJtaXNzaW9uKCk7XG4gICAgd2luZG93LnNldEludGVydmFsKHVwZGF0ZVRpbWVyLCAxMDAwKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyICgpIHtcbiAgICAgICAgdmFyIG5vdyA9IGdldE1vbWVudCgpO1xuICAgICAgICB2YXIgcGVyaW9kID0gZ2V0UGVyaW9kKG5vdywgZ2V0TW9tZW50KTtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gZ2V0RHVyYXRpb24ocGVyaW9kLmVuZCwgbm93KTtcblxuICAgICAgICBjYXN0Tm90aWZpY2F0aW9ucyhwZXJpb2QudHlwZSk7XG4gICAgICAgIHVwZGF0ZUJyb3dzZXJUaXRsZShkdXJhdGlvbi5odW1hbml6ZSgpKTtcbiAgICAgICAgdXBkYXRlQ291bnRlcihkdXJhdGlvbi5odW1hbml6ZSgpKTtcbiAgICAgICAgdXBkYXRlUGVyaW9kVHlwZShwZXJpb2QudHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjYXN0Tm90aWZpY2F0aW9ucyAocGVyaW9kVHlwZSkge1xuICAgICAgICAvLyBOb3RpZnkgdXNlciB0aGF0IG5ldyBwZXJpb2QgaGFzIHN0YXJ0ZWRcbiAgICAgICAgaWYgKGN1cnJlbnRQZXJpb2RUeXBlID09PSBwZXJpb2RUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50UGVyaW9kVHlwZSA9IHBlcmlvZFR5cGU7XG4gICAgICAgIHJldHVybiBub3RpZmllci5ub3RpZnlQZXJpb2RTdGFydChwZXJpb2RUeXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGltZVJlbWFpbmluZ1RleHRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVCcm93c2VyVGl0bGUgKHRpbWVSZW1haW5pbmdUZXh0KSB7XG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGltZVJlbWFpbmluZ1RleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpbWVSZW1haW5pbmdUZXh0XG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlQ291bnRlciAodGltZVJlbWFpbmluZ1RleHQpIHtcbiAgICAgICAgY291bnRlckVsZW0uaW5uZXJIVE1MID0gdGltZVJlbWFpbmluZ1RleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBlcmlvZFR5cGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVQZXJpb2RUeXBlIChwZXJpb2RUeXBlKSB7XG4gICAgICAgIGlmIChjdXJyZW50UGVyaW9kVHlwZSA9PT0gcGVyaW9kVHlwZSAmJiBwZXJpb2RUeXBlRWxlbS5pbm5lckhUTUwgIT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwZXJpb2RUeXBlRWxlbS5pbm5lckhUTUwgPSBwZXJpb2RUeXBlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzbm9lcFRpbWVyOyJdfQ==

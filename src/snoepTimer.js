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
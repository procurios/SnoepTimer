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
            return notifier.notifyPeriodEnd(periodType);
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
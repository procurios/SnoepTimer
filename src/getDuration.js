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
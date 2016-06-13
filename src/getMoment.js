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
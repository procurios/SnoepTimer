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
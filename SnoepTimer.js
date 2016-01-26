/**
 * @see (https://github.com/procurios/SnoepTimer)
 * @author Peter Slagter
 * @license MIT
 * @preserve
 */

;(function () {
    /** @var {String} */
    var TYPE_SLEEP = 'SLEEP';
    /** @var {String} */
    var TYPE_WORK = 'WORK';
    /** @var {String} */
    var TYPE_BREAK = 'BREAK';
    /** @var {String} */
    var TYPE_LUNCH = 'LUNCH';

    /** @var {String} */
    var CLASS_CONTAINER = 'SnoepTimer';
    /** @var {String} */
    var CLASS_COUNTER = 'SnoepTimer__counter';
    /** @var {String} */
    var CLASS_SLEEP = 'SnoepTimer--sleep';
    /** @var {String} */
    var CLASS_WORK = 'SnoepTimer--work';
    /** @var {String} */
    var CLASS_BREAK = 'SnoepTimer--break';
    /** @var {String} */
    var CLASS_LUNCH = 'SnoepTimer--lunch';

    var SnoepTimer = function () {
        var dateNow = new Date();

        this.currentPeriodType = '';

        this.dayStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 08, 30, 00);
        this.dayEnd = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 16, 30, 00);
        this.lunchStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 12, 30, 00);
        this.lunchEnd = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 13, 00, 00);

        this.snoepTimerContainer = document.querySelector('.' + CLASS_CONTAINER);
        this.snoepTimerCounter = this.snoepTimerContainer.querySelector('.' + CLASS_COUNTER);

        Notification.requestPermission();

        this.interval = window.setInterval(this.updateTimer.bind(this), 1000);
    };

    SnoepTimer.prototype.updateTimer = function () {
        this.timeOfInterest = new Date();
        this.periodData = this.getPeriodData();

        if (this.currentPeriodType !== this.periodData.type) {
            this.currentPeriodType = this.periodData.type;
            this.resetNotificationFlags();
        }

        this.notifyUser();
        this.setTypeClass();
        this.drawCounter();
    };

    SnoepTimer.prototype.setTypeClass = function () {
        var classesToSet = [CLASS_CONTAINER];

        if (this.periodData.type === TYPE_SLEEP) {
            classesToSet.push(CLASS_SLEEP);
        }

        if (this.periodData.type === TYPE_BREAK) {
            classesToSet.push(CLASS_BREAK);
        }

        if (this.periodData.type === TYPE_LUNCH) {
            classesToSet.push(CLASS_LUNCH);
        }

        if (this.periodData.type === TYPE_WORK) {
            classesToSet.push(CLASS_WORK);
        }

        this.snoepTimerContainer.className = classesToSet.join(' ');
    };

    SnoepTimer.prototype.drawCounter = function () {
        this.snoepTimerCounter.innerHTML = this.getRemainingTimeString();
    };

    SnoepTimer.prototype.resetNotificationFlags = function () {
        this.notificationStates = {
            periodStart: false,
            periodEnd: false
        };
    };

    SnoepTimer.prototype.notifyUser = function () {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
            return;
        }

        if (this.notificationStates.periodStart === false) {
            var notification = new Notification(this.periodData.type + ' has started!', {
              icon: 'img/icon-alarm.png',
              body: 'A new period (' + this.periodData.type + ') has started. Have fun!'
            });

            this.notificationStates.periodStart = true;
        }

        if (this.notificationStates.periodEnd === false) {
            var remainingTimeInMinutes = this.periodData.timeRemaining / 1000 / 60;

            if (remainingTimeInMinutes <= 1) {
                var notification = new Notification(this.periodData.type + ' ends soon!', {
                  icon: 'img/icon-alarm.png',
                  body: 'The current period (' + this.periodData.type + ') will end soon. Wrap it up!'
                });

                this.notificationStates.periodEnd = true;
            }
        }
    };

    /**
     *
     * @returns {{type: String, dateStart: Date, dateEnd: Date, timeRemaining: number}}
     */
    SnoepTimer.prototype.getPeriodData = function () {
        var periodType = this.getPeriodType();
        var periodDateStart = this.getPeriodDateStart(periodType);
        var periodDateEnd = this.getPeriodDateEnd(periodType);

        return {
            type: periodType,
            dateStart: periodDateStart,
            dateEnd: periodDateEnd,
            timeRemaining: (periodDateEnd - this.timeOfInterest)
        }
    };

    /**
     *
     * @returns {String}
     */
    SnoepTimer.prototype.getPeriodType = function () {
        var curMinutes = this.timeOfInterest.getMinutes();

        if (this.timeOfInterest < this.dayStart || this.timeOfInterest > this.dayEnd) {
            return TYPE_SLEEP;
        }

        if (this.timeOfInterest >= this.lunchStart && this.timeOfInterest < this.lunchEnd) {
            return TYPE_LUNCH;
        }

        if ((curMinutes >= 25 && curMinutes < 30) || (curMinutes >= 55 && curMinutes < 60)) {
            return TYPE_BREAK;
        }

        return TYPE_WORK;
    };

    /**
     *
     * @param periodType
     * @returns {Date}
     */
    SnoepTimer.prototype.getPeriodDateStart = function (periodType) {
        switch (periodType) {
            case TYPE_LUNCH:
                return this.lunchStart;

            case TYPE_SLEEP:
                return this.dayEnd;

            case TYPE_BREAK:
                var breakDateStart = new Date(this.timeOfInterest.getTime());
                breakDateStart.setSeconds(0);

                if (this.timeOfInterest.getMinutes() < 30) {
                    breakDateStart.setMinutes(25);
                    return breakDateStart;
                }

                breakDateStart.setMinutes(55);
                return breakDateStart;

            case TYPE_WORK:
                var workDateStart = new Date(this.timeOfInterest.getTime());
                workDateStart.setSeconds(0);

                if (this.timeOfInterest.getMinutes() < 25) {
                    workDateStart.setMinutes(0);
                    return workDateStart;
                }

                workDateStart.setMinutes(30);
                return workDateStart;
        }
    };

    /**
     *
     * @param periodType
     * @returns {Date}
     */
    SnoepTimer.prototype.getPeriodDateEnd = function (periodType) {
        switch (periodType) {
            case TYPE_LUNCH:
                return this.lunchEnd;

            case TYPE_SLEEP:
                var sleepDateEnd = new Date(this.dayStart.getTime());
                sleepDateEnd.setDate(sleepDateEnd.getDate() + 1);
                return sleepDateEnd;

            case TYPE_BREAK:
                var breakDateEnd = new Date(this.timeOfInterest.getTime());
                breakDateEnd.setSeconds(0);

                if (this.timeOfInterest.getMinutes() < 30) {
                    breakDateEnd.setMinutes(30);
                    return breakDateEnd;
                }

                breakDateEnd.setMinutes(60);
                return breakDateEnd;

            case TYPE_WORK:
                var workDateEnd = new Date(this.timeOfInterest.getTime());
                workDateEnd.setSeconds(0);

                if (this.timeOfInterest.getMinutes() < 25) {
                    workDateEnd.setMinutes(25);
                    return workDateEnd;
                }

                workDateEnd.setMinutes(55);
                return workDateEnd;
        }
    };

    /**
     *
     * @returns {string}
     */
    SnoepTimer.prototype.getRemainingTimeString = function () {
        var remainingTimeInSeconds = this.periodData.timeRemaining / 1000;
        var remainingMinutes = parseInt(remainingTimeInSeconds / 60);
        var remainingSeconds = remainingTimeInSeconds % 60;

        remainingSeconds = (remainingSeconds < 10) ? '0' + remainingSeconds : remainingSeconds;

        return remainingMinutes + ':' + remainingSeconds;
    };

    new SnoepTimer();
})();
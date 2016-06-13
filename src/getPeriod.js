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
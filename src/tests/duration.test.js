'use strict';

var test = require('tape');
var getMoment = require('../getMoment');
var getDuration = require('../getDuration');

test('duration.hours() should return hours', function (assert) {
    var hoursStart = 5;
    var hoursEnd = 10;

    var dateStart = new Date();
    dateStart.setHours(hoursStart);
    var dateEnd = new Date();
    dateEnd.setHours(hoursEnd);

    var momentStart = getMoment(dateStart);
    var momentEnd = getMoment(dateEnd);

    var duration = getDuration(momentEnd, momentStart);
    var expectedHours = hoursEnd - hoursStart;

    assert.equal(duration.hours(), expectedHours, 'Expected ' + expectedHours + ', got ' + duration.hours());
    assert.end();
});

test('duration.minutes() should return minutes', function (assert) {
    var minutesStart = 30;
    var minutesEnd = 50;

    var dateStart = new Date();
    dateStart.setHours(2);
    dateStart.setMinutes(minutesStart);
    var dateEnd = new Date();
    dateEnd.setHours(3);
    dateEnd.setMinutes(minutesEnd);

    var momentStart = getMoment(dateStart);
    var momentEnd = getMoment(dateEnd);

    var duration = getDuration(momentEnd, momentStart);
    var expectedMinutes = minutesEnd - minutesStart;

    assert.equal(duration.minutes(), expectedMinutes, 'Expected ' + expectedMinutes + ', got ' + duration.minutes());
    assert.end();
});

test('duration.seconds() should return seconds', function (assert) {
    var secondsStart = 30;
    var secondsEnd = 40;

    var dateStart = new Date();
    dateStart.setHours(2);
    dateStart.setMinutes(10);
    dateStart.setSeconds(secondsStart);
    var dateEnd = new Date();
    dateEnd.setHours(3);
    dateEnd.setMinutes(5);
    dateEnd.setSeconds(secondsEnd);

    var momentStart = getMoment(dateStart);
    var momentEnd = getMoment(dateEnd);

    var duration = getDuration(momentEnd, momentStart);
    var expectedSeconds = secondsEnd - secondsStart;

    assert.equal(duration.seconds(), expectedSeconds, 'Expected ' + expectedSeconds + ', got ' + duration.seconds());
    assert.end();
});

test('duration.humanize() should return HH:mm:ss for durations longer than an hour', function (assert) {
    var dateStart = new Date();
    dateStart.setHours(2);
    dateStart.setMinutes(10);
    dateStart.setSeconds(30);
    var dateEnd = new Date();
    dateEnd.setHours(3);
    dateEnd.setMinutes(30);
    dateEnd.setSeconds(50);

    var momentStart = getMoment(dateStart);
    var momentEnd = getMoment(dateEnd);

    var duration = getDuration(momentEnd, momentStart);
    var expected = '01:20:20';

    assert.equal(duration.humanize(), expected, 'Expected ' + expected + ', got ' + duration.humanize());
    assert.end();
});
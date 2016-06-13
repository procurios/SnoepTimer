'use strict';

var test = require('tape');
var getMoment = require('../getMoment');

test('moment.hours() should return hours', function (assert) {
    var expectedHours = 10;
    var date = new Date();
    date.setHours(expectedHours);

    var moment = getMoment(date);

    assert.equal(moment.hours(), expectedHours, 'Expected ' + expectedHours + ', got ' + moment.hours());
    assert.end();
});

test('moment.hours(nrHours) should set hours', function (assert) {
    var date = new Date();
    date.setHours(10);

    var expectedHours = 18;
    var moment = getMoment(date);
    moment = moment.hours(expectedHours);

    assert.equal(moment.hours(), expectedHours, 'Expected ' + expectedHours + ', got ' + moment.hours());
    assert.end();
});

test('moment.minutes() should return minutes', function (assert) {
    var expectedMinutes = 45;
    var date = new Date();
    date.setMinutes(expectedMinutes);

    var moment = getMoment(date);

    assert.equal(moment.minutes(), expectedMinutes, 'Expected ' + expectedMinutes + ', got ' + moment.minutes());
    assert.end();
});

test('moment.minutes(nrMinutes) should set minutes', function (assert) {
    var date = new Date();
    date.setMinutes(18);

    var expectedMinutes = 10;
    var moment = getMoment(date);
    moment = moment.minutes(expectedMinutes);

    assert.equal(moment.minutes(), expectedMinutes, 'Expected ' + expectedMinutes + ', got ' + moment.minutes());
    assert.end();
});

test('moment.seconds() should return seconds', function (assert) {
    var expectedSeconds = 59;
    var date = new Date();
    date.setSeconds(expectedSeconds);

    var moment = getMoment(date);

    assert.equal(moment.seconds(), expectedSeconds, 'Expected ' + expectedSeconds + ', got ' + moment.seconds());
    assert.end();
});

test('moment.seconds(nrSeconds) should set seconds', function (assert) {
    var date = new Date();
    date.setSeconds(51);

    var expectedSeconds = 10;
    var moment = getMoment(date);
    moment = moment.seconds(expectedSeconds);

    assert.equal(moment.seconds(), expectedSeconds, 'Expected ' + expectedSeconds + ', got ' + moment.seconds());
    assert.end();
});

test('moment.isSame() should return false when comparing different moments', function (assert) {
    var date1 = new Date();
    date1.setHours(10);
    var moment1 = getMoment(date1);

    var date2 = new Date(date1);
    date2.setHours(11);
    var moment2 = getMoment(date2);

    assert.equal(moment1.isSame(moment2), false, 'Expected false, got ' + moment1.isSame(moment2));
    assert.end();
});

test('moment.isSame() should return true when comparing equal moments', function (assert) {
    var now = new Date();

    var moment1 = getMoment(now);
    var moment2 = getMoment(now);

    assert.equal(moment1.isSame(moment2), true, 'Expected true, got ' + moment1.isSame(moment2));
    assert.end();
});

test('moment.isAfter() should return true when comparing with an earlier moment', function (assert) {
    var now = new Date();
    var before = new Date();
    before.setHours(now.getHours() - 1);

    var moment1 = getMoment(now);
    var moment2 = getMoment(before);

    assert.equal(moment1.isAfter(moment2), true, 'Expected true, got ' + moment1.isAfter(moment2));
    assert.end();
});

test('moment.isAfter() should return true when comparing with a later moment', function (assert) {
    var now = new Date();
    var later = new Date();
    later.setHours(now.getHours() + 1);

    var moment1 = getMoment(now);
    var moment2 = getMoment(later);

    assert.equal(moment1.isAfter(moment2), false, 'Expected false, got ' + moment1.isAfter(moment2));
    assert.end();
});

test('moment.isBefore() should return true when comparing with a later moment', function (assert) {
    var now = new Date();
    var later = new Date();
    later.setHours(now.getHours() + 1);

    var moment1 = getMoment(now);
    var moment2 = getMoment(later);

    assert.equal(moment1.isBefore(moment2), true, 'Expected true, got ' + moment1.isBefore(moment2));
    assert.end();
});

test('moment.isBefore() should return false when comparing with an earlier moment', function (assert) {
    var now = new Date();
    var before = new Date();
    before.setHours(now.getHours() - 1);

    var moment1 = getMoment(now);
    var moment2 = getMoment(before);

    assert.equal(moment1.isBefore(moment2), false, 'Expected false, got ' + moment1.isBefore(moment2));
    assert.end();
});

test('moment.add(30, "seconds") should return a moment with 30 seconds added', function (assert) {
    var date = new Date();
    date.setSeconds(15);
    var moment = getMoment(date);
    moment = moment.add(30, 'seconds');

    assert.equal(moment.seconds(), 45, 'Expected 45, got ' + moment.seconds());
    assert.end();
});

test('moment.add(10, "minutes") should return a moment with 10 minutes added', function (assert) {
    var date = new Date();
    date.setMinutes(20);
    var moment = getMoment(date);
    moment = moment.add(10, 'minutes');

    assert.equal(moment.minutes(), 30, 'Expected 30, got ' + moment.minutes());
    assert.end();
});

test('moment.add(1, "hours") should return a moment with 1 hour added', function (assert) {
    var date = new Date();
    date.setHours(2);
    var moment = getMoment(date);
    moment = moment.add(1, 'hours');

    assert.equal(moment.hours(), 3, 'Expected 3, got ' + moment.hours());
    assert.end();
});

test('moment.subtract(30, "seconds") should return a moment with 30 seconds subtracted', function (assert) {
    var date = new Date();
    date.setSeconds(45);
    var moment = getMoment(date);
    moment = moment.subtract(30, 'seconds');

    assert.equal(moment.seconds(), 15, 'Expected 15, got ' + moment.seconds());
    assert.end();
});

test('moment.subtract(10, "minutes") should return a moment with 10 minutes subtracted', function (assert) {
    var date = new Date();
    date.setMinutes(20);
    var moment = getMoment(date);
    moment = moment.subtract(10, 'minutes');

    assert.equal(moment.minutes(), 10, 'Expected 10, got ' + moment.minutes());
    assert.end();
});

test('moment.subtract(1, "hours") should return a moment with 1 hour subtracted', function (assert) {
    var date = new Date();
    date.setHours(2);
    var moment = getMoment(date);
    moment = moment.subtract(1, 'hours');

    assert.equal(moment.hours(), 1, 'Expected 1, got ' + moment.hours());
    assert.end();
});

test('moment.diff(moment) should return a diff in milliseconds', function (assert) {
    var dateEnd = new Date();
    dateEnd.setHours(2);
    var dateStart = new Date();
    dateStart.setHours(1);

    var momentEnd = getMoment(dateEnd);
    var momentStart = getMoment(dateStart);

    var diff = momentEnd.diff(momentStart);

    assert.equal(diff, 3600000, 'Expected 3600000, got ' + diff);
    assert.end();
});
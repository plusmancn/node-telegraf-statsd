'use strict';
/**
 * <plusmancn@gmail.com> created at 2016.09.05 14:03:04
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 *
 */

const Tstatsd = require('../');

describe('#gauge', function () {
    this.timeout(10e3);
    let tstatsd = new Tstatsd('10.211.55.18');
    describe('#standard', function () {
        it('the value is 10', function (done) {
            tstatsd.gauge('tstatsd.test.gauge', 10);
            setTimeout(done, 2e3);
        });
    });

    describe('#plus', function () {
        it('the value is 110', function (done) {
            tstatsd.gauge('tstatsd.test.gauge', 100, '+');
            setTimeout(done, 2e3);
        });
    });

    describe('#minus', function () {
        it('the value is -90', function (done) {
            tstatsd.gauge('tstatsd.test.gauge', 200, '-');
            setTimeout(done, 2e3);
        });
    });
});

describe('#counter', function () {
    this.timeout(10e3);
    let tstatsd = new Tstatsd('10.211.55.18');
    describe('incr 10', function () {
        it('', function (done) {
            tstatsd.counter('tstatsd.test.counter', 10);
            setTimeout(done, 2e3);
        });
    });

    describe('incr 1 with sample rate 0.2', function () {
        it('shoud incr 1/0.2', function (done) {
            tstatsd.counter('tstatsd.test.counter', 1, 0.2);
            setTimeout(done, 2e3);
        });
    });
});

describe('#set', function () {
    this.timeout(10e3);
    let tstatsd = new Tstatsd('10.211.55.18');
    describe('统计唯一值数量', function () {
        it('input value 100', function (done) {
            tstatsd.set('tstatsd.test.set', 100);
            setTimeout(done, 2e3);
        });

        it('input value 102', function (done) {
            tstatsd.set('tstatsd.test.set', 102);
            setTimeout(done, 2e3);
        });
    });
});

describe('#timing', function () {
    this.timeout(10e3);
    let tstatsd = new Tstatsd('10.211.55.18');
    describe('输入 ms 单位5次', function () {
        it('mean=30, counter=5', function (done) {
            tstatsd.timing('tstatsd.test.timing', 10);
            tstatsd.timing('tstatsd.test.timing', 20);
            tstatsd.timing('tstatsd.test.timing', 30);
            tstatsd.timing('tstatsd.test.timing', 40);
            tstatsd.timing('tstatsd.test.timing', 50);
            setTimeout(done, 2e3);
        });
    });

    describe('输入 h 单位5次', function () {
        it('mean=30 counter=5', function (done) {
            tstatsd.timing('tstatsd.test.timing', 10, 'h');
            tstatsd.timing('tstatsd.test.timing', 20, 'h');
            tstatsd.timing('tstatsd.test.timing', 30, 'h');
            tstatsd.timing('tstatsd.test.timing', 40, 'h');
            tstatsd.timing('tstatsd.test.timing', 50, 'h');
            setTimeout(done, 2e3);
        });
    });

    describe('输入 h 单位, with sample 0.1', function () {
        it('mean 1, counter=1/0.1', function (done) {
            tstatsd.timing('tstatsd.test.timing.hour', 1, 'h', 0.1);
            setTimeout(done, 2e3);
        });
    });
});

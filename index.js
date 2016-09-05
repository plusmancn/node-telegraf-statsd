'use strict';
/**
 * <plusmancn@gmail.com> created at 2016.09.05 11:39:00
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 *
 * Generate telegraf statsd's inputs in NodeJs
 * According to https://github.com/influxdata/telegraf/tree/master/plugins/inputs/statsd
 * Etsy Statsd: https://github.com/etsy/statsd/blob/master/docs/metric_types.md
 * Inspired by https://github.com/dscape/lynx
 *
 * Node UDP/DataGram Doc: https://nodejs.org/dist/latest-v4.x/docs/api/dgram.html
 */

const dgram = require('dgram');

/**
 * @constructor
 * @param {String} host - 主机IP
 * @param {Integer} port - 服务端口
 */
function Tstatsd (host, port) {
    this.host = host || '127.0.0.1';
    this.port = port || 8125;
    this.socket = dgram.createSocket('udp4');
}

/**
 * gauge
 * @param {String} key
 * @param {Integer} value
 * @param {Enum} operator - 操作符，可选 ['+', '-']
 */
Tstatsd.prototype.gauge = function (key, value, operator) {
    operator = operator || '';
    let str = `${key}:${operator}${value}|g`;

    this.send(str);
};

/**
 * counter
 * @param {String} key
 * @param {Integer} step - 步进
 * @param {Float} sample - 采样率，最后增量为 step/sample
 */
Tstatsd.prototype.counter = function (key, step, sample) {
    let str = `${key}:${step}|c`;
    if(sample) {
        str = `${str}|@${sample}`;
    }

    this.send(str);
};

/**
 * set
 * @param {String} key
 * @param {String} value - 遇到不同值才会加一
 */
Tstatsd.prototype.set = function (key, value) {
    let str = `${key}:${value}|s`;

    this.send(str);
};

/**
 * @param {String} key
 * @param {Integer} value - 消耗时长
 * @param {Enum} unit - 计时单位, ms/h
 * @param {Float} sample - 采样率，最后 counter=1/sample
 */
Tstatsd.prototype.timing = function (key, value, unit, sample) {
    unit = unit || 'ms';
    let str = `${key}:${value}|${unit}`;
    if(sample) {
        str = `${str}|@${sample}`;
    }

    this.send(str);
};

/**
 * 原生发送方法
 * @param {String} str - statsd 定义的字符串
 */
Tstatsd.prototype.send = function (str) {
    let buf = new Buffer(str, 'utf8');
    this.socket.send(buf, 0, buf.length, this.port, this.host);
};

module.exports = Tstatsd;

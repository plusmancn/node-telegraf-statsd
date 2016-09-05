# node-telegraf-statsd
> Abbr: tstatsd means t(telegraf)statsd
> Generate telegraf statsd's inputs in NodeJs

* According to https://github.com/influxdata/telegraf/tree/master/plugins/inputs/statsd
* Etsy Statsd: https://github.com/etsy/statsd/blob/master/docs/metric_types.md
* Inspired by https://github.com/dscape/lynx
* Node UDP/DataGram Doc: https://nodejs.org/dist/latest-v4.x/docs/api/dgram.html

## Usage
**Install**
```shell
npm install tstatsd --save
```
**Example**
```javascript
const Tstatsd = require('tstatsd');
let tstatsd = new Tstatsd('10.211.55.18');
tstatsd.timing('tstatsd.test.timing', 10);
```

## Api
**Kind**: global class

* [Tstatsd](#Tstatsd)
    * [new Tstatsd(host, port)](#new_Tstatsd_new)
    * [.gauge(key, value, operator)](#Tstatsd+gauge)
    * [.counter(key, step, sample)](#Tstatsd+counter)
    * [.set(key, value)](#Tstatsd+set)
    * [.timing(key, value, unit, sample)](#Tstatsd+timing)
    * [.send(str)](#Tstatsd+send)

<a name="new_Tstatsd_new"></a>

### new Tstatsd(host, port)

| Param | Type | Description |
| --- | --- | --- |
| host | <code>String</code> | 主机IP |
| port | <code>Integer</code> | 服务端口 |

<a name="Tstatsd+gauge"></a>

### tstatsd.gauge(key, value, operator)
gauge

**Kind**: instance method of <code>[Tstatsd](#Tstatsd)</code>

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
| value | <code>Integer</code> |  |
| operator | <code>Enum</code> | 操作符，可选 ['+', '-'] |

<a name="Tstatsd+counter"></a>

### tstatsd.counter(key, step, sample)
counter

**Kind**: instance method of <code>[Tstatsd](#Tstatsd)</code>

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
| step | <code>Integer</code> | 步进 |
| sample | <code>Float</code> | 采样率，最后增量为 step/sample |

<a name="Tstatsd+set"></a>

### tstatsd.set(key, value)
set

**Kind**: instance method of <code>[Tstatsd](#Tstatsd)</code>

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
| value | <code>String</code> | 遇到不同值才会加一 |

<a name="Tstatsd+timing"></a>

### tstatsd.timing(key, value, unit, sample)
**Kind**: instance method of <code>[Tstatsd](#Tstatsd)</code>

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
| value | <code>Integer</code> | 消耗时长 |
| unit | <code>Enum</code> | 计时单位, ms/h |
| sample | <code>Float</code> | 采样率，最后 counter=1/sample |

<a name="Tstatsd+send"></a>

### tstatsd.send(str)
原生发送方法

**Kind**: instance method of <code>[Tstatsd](#Tstatsd)</code>

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | statsd 定义的字符串 |

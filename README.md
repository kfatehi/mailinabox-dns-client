mailinabox-dns-client
==================

[![NPM](https://nodei.co/npm/mailinabox-dns-client.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mailinabox-dns-client/)

Manage your DNS records from node.js

## Usage

`npm install --save mailinabox-dns-client`

## test.js

```js
var client = require('./')({
  host: process.env.MBHOST,
  email: process.env.MBUSER,
  password: process.env.MBPASS
})

//# Create an A record
client.addRecord('foobar.pillbox.io', '127.0.0.1', function (err) {
  if (err) throw err;
  else console.log('done')
})

//# Create a CNAME record
client.addRecord('foobar.pillbox.io', '127.0.0.1', 'CNAME', function (err) {
  if (err) throw err;
  else console.log('done')
})

//# Delete an A record
client.deleteRecord('foobar.pillbox.io', function (err) {
  if (err) throw err;
  else console.log('done')
})

//# Delete a CNAME record
client.deleteRecord('foobar.pillbox.io', 'CNAME', function (err) {
  if (err) throw err;
  else console.log('done')
})
```

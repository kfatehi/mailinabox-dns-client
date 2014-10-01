var https = require('https');

module.exports = function (config) {
  function getOptions(qname, rtype, value) {
    return {
      port: 443,
      method: 'POST',
      hostname: config.host,
      auth: config.email+':'+config.password,
      path: '/admin/dns/set/'+qname+'/'+rtype+'/'+value,
      headers: { 'Connection': 'close' }
    }
  }

  return {
    addRecord: function(fqdn, ip, rtypeOrCb, cb) {
      return request(fqdn, ip, rtypeOrCb, cb);
    },
    deleteRecord: function(fqdn, rtypeOrCb, cb) {
      return request(fqdn, '__delete__', rtypeOrCb, cb);
    }
  }

  function request(fqdn, ip, rtypeOrCb, cb) {
    var rtype = 'A'
    var callback = cb || function(){};
    if (typeof rtypeOrCb === 'function') {
      callback = rtypeOrCb
    } else {
      rtype = rtypeOrCb
    }
    var options = getOptions(fqdn, rtype, ip)

    var req = https.request(options, function(res) {
      if (res.statusCode === 200) {
        callback(null)
      } else {
        callback(new Error('Unexpected status code '+res.statusCode))
      }
    });
    req.end();
    req.on('error', callback)
    return req;
  }
}

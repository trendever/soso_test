var SockJS = require('sockjs-client');

function SoSo(url) {
  this.url = url
  this.log = true
  this.sock = new SockJS(url)
  this.onmsg = null
  this.onopen = null
  this.ondirectmsg = null
  this.onclose = null
  this.onerror = null
  this.callbacks = {}
  var self = this;

  this.sock.onmessage = function(e) {
    var resp = JSON.parse(e.data)
    if (this.onmsg) {
      self.onmsg(resp)
    }

    if (resp.log_list.length > 0) {
      resp.log_map = resp.log_list[0]
    }

    if (resp.trans_map.trans_id) {
      self.callbacks[resp.trans_map.trans_id](resp)
      delete self.callbacks[resp.trans_map.trans_id]
    } else {
      if (this.ondirectmsg) {
        self.ondirectmsg(resp)
      }
    }

    if (self.log && resp.trans_map.sended_at) {

      var sendedAt = resp.trans_map.sended_at;
      var endTime = new Date().getTime();

      var code_int = parseInt(resp.log_map.code_key);
      var color_code_key = 'color: red';
      if (code_int < 400) {
        color_code_key = 'color: #4CAF50';
      }

      console.log('[CHAN] ' +
       resp.action_str,
       resp.data_type,
       resp.log_map.code_str,
       resp.log_map.user_msg,
       resp.log_map.level_str,
       (endTime - sendedAt) + 'ms');

    }
  }
  this.sock.onopen = function(e){
    if (self.onopen){
      self.onopen(e)
    }
  }
  this.sock.onclose = function(e){
    if (self.onclose) {
      self.onclose(e)
    }
  }
  this.sock.onerror = function(e){
    if (self.onerror) {
      self.onerror(e)
    }
  }

}

SoSo.prototype.request = function (action_str, data_type, request_map, trans_map) {
  var self = this
  return new Promise(function(resolve, reject) {

    var request = !request_map ? {} : request_map
    var trans = !trans_map ? {} : trans_map

    trans.sended_at = new Date().getTime()
    trans.trans_id = uuid()
    self.callbacks[trans.trans_id] = resolve

    var data = {
      action_str: action_str,
      data_type: data_type,
      log_list:[],
      request_map: request,
      trans_map: trans
    };
    self.sock.send(JSON.stringify(data));

  })
}

// utils

var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
function uuid()
{
  var d0 = Math.random()*0xffffffff|0;
  var d1 = Math.random()*0xffffffff|0;
  var d2 = Math.random()*0xffffffff|0;
  var d3 = Math.random()*0xffffffff|0;
  return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
    lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
    lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
    lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
}

module.exports = SoSo;

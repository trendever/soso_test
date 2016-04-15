/* globals SockJS */

export default class {
  constructor() {
    this.sock = null;
    this.echo_url = "";
    this.connected = false;
    this.cache = {
      requests: []
    };
  }

  init(onOpen, onMessage, echo_url) {
    var self = this;
    self.echo_url = echo_url;

    self.sock = new SockJS(self.echo_url);
    self.sock.onmessage = function(data) {
        onMessage.call(self, data);
    };

    self.sock.onclose = (function () {
        self.connected = false;

        setTimeout(function () {
          console.log("try recconect");
          self.init.call(self, onOpen, onMessage);
        }, 5000);
      });

    self.sock.onopen = (() => {
      if (self.sock.readyState !== SockJS.OPEN) {
        self.connected = false;
      } else {
        self.connected = true;

        self._resendOfflineRequests();
      }
      onOpen.call(self, self.sock);
    });
  }

  _send(data) {
    /**
     data (object) *
     */
    this.sock.send(JSON.stringify(data));
  }

  send(data) {
    if (this.connected) {
      this._send(data);
    } else {

      // Save offline request if it's unique
      if (!this.cache.requests.find( item => {

        if (item.data.action_str === data.action_str &&
            item.data.data_type === data.data_type &&
             JSON.stringify(item.data.request_map) === JSON.stringify(data.request_map)) {
          return true;
        }
        return false;
      })) {
        // Write new request
        this.cache.requests.push({
          created: Date.now(),
          data: data
        });
      }

    }
  }

  _resendOfflineRequests() {
    if (!this.connected) {return;}

    while (this.cache.requests.length > 0) {
      let request = this.cache.requests.pop();
      this.send(request.data);
    }
  }

}
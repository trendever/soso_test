import * as utils from './../utils';

export default class {
  constructor(store) {
    this.store = store;
    this.sock;
    this.callbacks = [];
  }

  init(onMessage, echo_url) {
    /*
     Init SockJS
     */
    this.store.init((socket) => {
      return this.sock = socket;
    }, onMessage, echo_url);
  };

  request(action_str, data_type,
          log_list, request_map,
          trans_map, callback) {
    /**
     *  @param {string} action_str
     *  @param {string} data_type
     *  @param {array} log_list
     *  @param {object} request_map
     *  @param {object} trans_map
     *  @param {object} callback
     */
    var data = {
      action_str: action_str,
      data_type: data_type,
      log_list: log_list,
      request_map: request_map,
      trans_map: trans_map ? trans_map : {}
    };
    if (callback) {
      var trans_id = utils.guid();
      data.trans_map["trans_id"] = trans_id;
      this._addCallback(trans_id, callback);
    }

    this.store.send(data);
  };

  _addCallback(guid_key, callback) {
    /**
     * @param {method} callback function
     */

    let _callback = {callback}
    // Remember when we started
    _callback.startTime = new Date().getTime();
    this.callbacks[guid_key] = _callback;

  };

  executeCallback(guid_key, response) {
    if (this.callbacks[guid_key]) {
      this.callbacks[guid_key].callback.call(this, response);
      delete this.callbacks[guid_key];
    }
  };

};

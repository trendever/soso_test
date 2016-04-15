export default class {
  constructor(model) {
    this.model = model;
    this.routes = [];
  }

  init(echo_url) {
    this.model.init((resp) => {
      this.onMessage(resp);
    }, echo_url);
  }

  addRoute(action_str, data_type, handler_func) {
    this.routes.push({
      action_str: action_str,
      data_type: data_type,
      handler_func: handler_func
    });
  }

  executeHandler(ctx) {

    if (ctx.trans_map.trans_id && ctx.trans_map.trans_id.length > 0) {
      this.model.executeCallback(ctx.trans_map.trans_id, ctx);
    } else {
      for (let route of this.routes) {
        if (route.action_str === ctx.action_str && route.data_type === ctx.data_type) {
          route.handler_func(ctx);
          return;
        }
      }
    }
    if (!ctx.log_list.length) {
      window.debugLog("[CHAN] log not exist, ctx:", ctx);
      return;
    }

    this.executeLog(ctx);
  }

  executeLog(ctx) {
    if (ctx.log_list.length) {
      for (let log of ctx.log_list) {
        switch (log.level_str) {
          case "emerg":
            // this.view.emergencyLog(log);
            break;
          case "alert":
            // this.view.alertLog(log);
            break;
          case "crit":
            // this.view.criticalLog(log);
            break;
          default:
            // window.debugLog("[CHANNEL-LOG]", log);
        }
      }
    }
  }

  onMessage(e) {
    var ctx = JSON.parse(e.data);
    if (!ctx) {
      return;
    }

    var startTime = this.model.callbacks[ctx.trans_map.trans_id].startTime;
    var endTime = new Date().getTime();

    let code_int = parseInt(ctx.log_list[0].code_key);
    if (code_int < 400) {
      var color_code_key = 'color: #4CAF50';
    } else {
      var color_code_key = 'color: red';
    }

    console.log("[CHAN]" +
      "%c " + ctx.action_str +
      " %c " + ctx.data_type +
      " %c " + ctx.log_list[0].code_str +
      " " + ctx.log_list[0].user_msg +
      " " + ctx.log_list[0].level_str +
      " %c " + (endTime - startTime) + "ms",
      'color: #2196F3',
      'color: #FF9800',
      color_code_key,
      'color: #5E35B1'
    );


    this.executeHandler(ctx);
  }
}

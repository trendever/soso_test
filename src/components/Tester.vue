<style lang="less" src="./style.less"></style>
<template lang="jade">
.main(:style='{width: frame_width}')
  .settings(v-show='settings_show')
    .tabs
      .tabs_i(@click="settings_tab='main'", :class="{'__active': settings_tab=='main'}")
        | Main
      .tabs_i(@click="settings_tab='api'", :class="{'__active': settings_tab=='api'}")
        | API
    .tab_content(v-show="settings_tab=='main'")
      div Main Settings
      br
      select(v-model='socket_url', v-on:change='sock.close()')
        option(value='http://api.dev2.trendever.com:8085/channel', selected='') dev2
        option(value='localhost:8081/channel') localhost:8081
      .status(@click='InitSock()', :class="{'__online': connected}")
        span(v-if='connected') online
        span(v-if='!connected') connect
      br
      br
      .input
        label Frame width
        input(type='text', v-model='frame_width', debounce='500')
        .help_text Example: 100% - responsive
      br
      br
      .input
        label Auth Token
        input(type='text', v-model='auth_token')
        .help_text Get from Auth/Login. Will set for every request.
    .tab_content(v-show="settings_tab=='api'")
      div API Settings
      br
      #api_editor(style='height: 500px')
  .app
    .panel
      select(v-model='resourse')
        option(v-for='item in resourses', v-bind:value='item')
          | {{ item.name | capitalize }}
      select(v-model='action')
        option(v-for='item in actions', v-bind:value='item')
          | {{ item.name | capitalize }}
      button.panel_send(@click='Send') Send
      .settings_btn(@click='settings_show=!settings_show')
        i.material-icons settings

    .params
      .param_list(v-if="action.params.length")
        .input(v-bind:class="{'__required': param.required}",
               v-for='param in action.params')
          label(for='field_{{ param.name }}') {{ param.name }}
          input(type='{{param.type | to_field}}',
                id='field_{{ param.name }}',
                v-model='param.value',
                :value='param.default')
          .help_text {{param.help_text}}

      .description
        .toggle(@click="isVisibleDescription=!isVisibleDescription")
          span(v-if="!isVisibleDescription") Show description
          span(v-if="isVisibleDescription") Hide description
        .cnt(v-if="isVisibleDescription")
          | {{{ action.description }}}

    .response
      .title Last Response
      .error(v-if='error.length')
        | Error: {{ error }}
      #reponse_editor(style='height: 500px')

    .logs(v-if='logs.length>0')
      div
        | Logs
        span(style='float:right;cursor:pointer;', @click='logs=[]')
          | очистить
      hr
      .log(:class='log.type', v-for='log in logs')
        span.type(@click='log.show = !log.show')
          | {{{log.description}}}
        span.created {{log.created}}
        .log_data(:id='log.id',
                  v-show='log.show')
</template>

<script>

import Vue from 'vue';
import * as profile from 'src/services/profile';
import {CONFIG} from '../../resourses.js';

Vue.filter('to_field', function (value) {
  var parts = value.split('|');
  if (parts.length == 2) {
    // it's array of type
    return "text";
  }
  var type = parts[0];
  if (type == "string") {
    return "text";
  } else if (type == "number") {
    return "number";
  } else if (type == "boolean") {
    return "checkbox";
  }
  console.log("Unsupported param type", type, "of", value);
});

export default {
  data () {
    return {
      config: CONFIG,
      resourses: null,
      resourse: null,
      action: null,
      socket_url:null,
      sock: null,
      error: "",
      request: "",
      reponse_editor: null,
      isVisibleDescription: true,
      editor_settings: {
        mode: "view",
        modes: ['view', 'code'],
        history: false,
      },
      connected: false,
      logs: [],
      // Settings
      settings_tab: "main",
      settings_show: false,
      frame_width: "700px",
      auth_token: null
    }
  },
  computed: {
    actions: function(){
      var actions = this.resourse.actions;
      this.action = actions[0];
      return actions;
    }
  },
  ready: function() {
    this.InitSock();
    this.InitApiSettings();
    this.auth_token = profile.getProfile().token;
    this.reponse_editor = new JSONEditor(
        document.getElementById('reponse_editor'),
        this.editor_settings
    );
  },
  methods: {
    InitSock: function(){
      this.sock = SockJS(this.socket_url);
      this.sock.onmessage = this.receive;
      this.sock.onopen = this.open;
      this.sock.onclose = this.close;
    },
    open: function() {
      this.connected = true;
      this.error = null;
    },
    close: function(err){
      this.connected = false;
      this.error = err.reason;
    },
    receive: function(resp) {
      var response = JSON.parse(resp.data);
      this.log("response", response);
      this.reponse_editor.set(response);
      this.error = null;
    },
    send: function(request_obj) {
      this.sock.send(JSON.stringify(request_obj));
    },
    Send: function(){
      var request_map = {},
          trans_map = {},
          params = this.action.params;

      // Set Auth token, if set in settings
      if (this.auth_token) {
        trans_map.token = this.auth_token;
      }
      trans_map.sendedAt = new Date().getTime();

      for (var i=0; i < params.length; i++){
        var param = params[i];
        if (!param.value || param.value == param.default) {
          continue;
        }
        request_map[param.name] = this.convertType(param.value, param.type);
      }
      var data = {
        action_str: this.action.name,
        data_type: this.resourse.name,
        log_list:[],
        request_map: request_map,
        trans_map:trans_map
      };
      this.log("request", data);
      this.send(data);
    },
    InitApiSettings: function() {
      var self = this;
      // Init editor and watch changes
      this.api_editor = new JSONEditor(
        document.getElementById('api_editor'),
        {
          mode: "code",
          modes: ['tree', 'code'],
          onChange: function() {
            self.resourses = self.api_editor.get();
            self.resourse = self.resourses[0];
          }
        }
      );
      // Set resourses
      self.resourses = this.config.resourses;
      self.resourse = self.resourses[0];
      this.api_editor.set(this.config.resourses);
    },
    convertType: function(value, type) {
      try {
        var parts = type.split('|');
        if (parts.length == 2) {
          // it's array of type
          return JSON.parse(value);
        }
        var _type = parts[0];
        if (type == "string") {
          return value;
        } else if (_type == "number") {
          return parseInt(value);
        } else if (_type == "boolean") {
          return value;
        }
      } catch (err) {
        this.error = "Error parse: " +
          value + " Msg: " + err.message;
        return;
      }
    },
    log: function(type, data) {
      var self = this;
      var id = "log_" + new Date().getTime();

      if (!data.log_list) {
        data.log_list = [{}];
      }
      var description =
      " <span style='color: #2196F3'>" +
      data.action_str + "</span>" +

      " <span style='color: #FF9800'>" +
      data.data_type + "</span>"

      if (data.log_list.length > 0) {
        description +=
        " <span style='color: #5E35B1'>" +
        data.log_list[0].code_str + "</span>" +

        " <span style='color: #5E35B1'>" +
        data.log_list[0].level_str + "</span>   "

        if (data.log_list[0].user_msg) {
          description += " <span style='color: gray'>" +
          data.log_list[0].user_msg.substr(0, 40) + "...</span>";
        }
      }

      description += ` ${new Date().getTime() - data.trans_map.sendedAt}ms`;

      this.logs.push({
        type,
        description,
        id,
        show: false,
        created: new Date().toLocaleString(),
      });
      setTimeout(function(){
        console.log(this.editor_settings);
        var _editor = new JSONEditor(
          document.getElementById(id),
          self.editor_settings
        );
        _editor.set(data);
      }, 10);
    }
  },

  watch: {
    auth_token: function() {
      // if (this.auth_token && this.auth_token.length > 0) {
        profile.setToken(this.auth_token);
      // }
    }
  }

}
</script>

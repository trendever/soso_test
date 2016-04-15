// API config
export const CONFIG = {
  resourses: [{
      name: "product",
      actions: [{
        name: "retrieve",
        description: "Вложить описание. Можно <b>с тэгами</b>. Вложить описание. Можно <b>с тэгами</b>. Вложить описание. Можно <b>с тэгами</b>. Вложить описание. Можно <b>с тэгами</b>. Вложить описание. Можно <b>с тэгами</b>.",
        params: [{
          name: "limit",
          type: "number",
          default: 9,
          required: true,
        }, {
          name: "offset",
          type: "number",
          default: 0
        }, {
          name: "id",
          type: "number"
        }, {
          name: "q",
          type: "string",
          help_text: "Поиск по названию"
        }, {
          name: "tags",
          type: "number|array",
          help_text: "Например: [1, 2 ,3]"
        }]
      }]
    },

    {
      name: "tag",
      actions: [{
        name: "retrieve",
        description: "Вложить описание",
        params: [{
          name: "is_main",
          type: "boolean",
          default: false
        }, {
          name: "limit",
          type: "number",
          default: 15
        }, {
          name: "tags",
          type: "number|array",
          help_text: "Example: [1, 2 ,3]. Return related tags. "
        }]
      }]
    },

    {
      name: "lead",
      actions: [{
        "name": "create",
        description: "Вложить описание",
        "params": [{
          "name": "id",
          "type": "number",
          "help_text": "ID продукта. Например: 42",
          "required": true
        }]
      }, {
        "name": "list",
        description: "Вложить описание",
        "params": []
      }, {
        "name": "event",
        description: "Вложить описание",
        "params": [{
          "name": "lead_id",
          "type": "number",
          "required": true
        }, {
          "name": "event",
          "type": "string",
          "help_text": "Доступные события: CREATE, PROGRESS, SUBMIT, DELIVERY, COMPLETE, CANCEL",
          "required": true
        }]
      }]
    },

    {
      name: "email",
      actions: [{
        name: "create",
        description: "Вложить описание",
        params: [{
          name: "email",
          type: "string",
          required: true
        }, {
          name: "type",
          type: "string",
          required: true,
          help_text: "Example: for_shop"
        }, {
          name: "comment",
          type: "string",
          required: true
        }]
      }]
    },

    {
      "name": "chat",
      description: "Вложить описание",
      "actions": [{
        "name": "join",
        "params": [{
          "name": "lead_id",
          "type": "number",
          "required": true
        }]
      }, {
        "name": "send",
        description: "Вложить описание",
        "params": [{
          "name": "conversation_id",
          "type": "number",
          "required": true
        }, {
          "name": "text",
          "type": "string",
          "required": true
        }, {
          "name": "mime_type",
          "type": "string",
          "help_text": "по умолчанию text/plain"
        }]
      }, {
        "name": "history",
        description: "Вложить описание",
        "params": [{
          "name": "conversation_id",
          "type": "number",
          "required": true
        }, {
          "name": "from_message_id",
          "type": "number",
          "required": false
        }, {
          "name": "limit",
          "type": "number",
          "required": false
        }]
      }, {
        "name": "list",
        description: "Вложить описание",
        "params": []
      }, {
        "name": "call_supplier",
        description: "Вложить описание",
        "params": [{
          "name": "lead_id",
          "type": "number",
          "required": true
        }]
      }]
    },

    {
      name: "auth",
      description: "Вложить описание",
      actions: [{
        name: "register",
        params: [{
          name: "phone",
          type: "string",
          required: true
        }, {
          name: "instagram_username",
          type: "string",
          help_text: "Если пользователь не зарег-н, то посылаем это поле"
        }, {
          name: "username",
          type: "string",
          help_text: "Если пользователь не имеет instagram то, шлем его"
        }]
      }, {
        name: "send_password",
        description: "Вложить описание",
        params: [{
          name: "phone",
          type: "string",
          required: true
        }]
      }, {
        name: "login",
        description: "Вложить описание",
        params: [{
          name: "phone",
          type: "string",
          required: true
        }, {
          name: "password",
          type: "string",
          required: true,
          help_text: "Одноразовый пароль, который выслали в sms"
        }]
      }]
    }

  ]
};

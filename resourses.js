// API config
export const CONFIG = {
    resourses: [{
        name: "product",
        actions: [
            {
                name: "retrieve",
                params: [
                    {
                        name: "limit",
                        type: "number",
                        default: 9,
                        required: true,
                    },
                    {
                        name: "offset",
                        type: "number",
                        default: 0
                    },
                    {
                        name: "id",
                        type: "number"
                    },
                    {
                        name: "q",
                        type: "string",
                        help_text: "Поиск по названию"
                    },
                    {
                        name: "tags",
                        type: "number|array",
                        help_text: "Например: [1, 2 ,3]"
                    }
                ]
            }
        ]
    },

        {
            name: "tag",
            actions: [
                {
                    name: "retrieve",
                    params: [
                        {
                            name: "is_main",
                            type: "boolean",
                            default: false
                        },
                        {
                            name: "limit",
                            type: "number",
                            default: 15
                        },
                        {
                            name: "tags",
                            type: "number|array",
                            help_text: "Example: [1, 2 ,3]. Return related tags. "
                        }
                    ]
                }
            ]
        },

        {
            name: "lead",
            actions: [
                {
                    name: "create",
                    params: [
                        {
                            name: "ids",
                            type: "number|array",
                            help_text: "Например: [1, 42, 3]",
                            required: true
                        },
                        {
                            name: "email",
                            type: "string",
                            required: true
                        },
                        {
                            name: "comment",
                            type: "string",
                            required: true
                        }
                    ]
                },
                {
                    "name": "list",
                    "params": [
                    ]
                },
                {
                    "name": "event",
                    "params": [
                        {
                            "name": "lead_id",
                            "type": "number",
                            "required": true
                        },
                        {
                            "name": "event",
                            "type": "string",
                            "help_text":"Доступные события: CREATE, PROGRESS, SUBMIT, DELIVERY, COMPLETE, CANCEL",
                            "required": true
                        }
                    ]
                }
            ]
        },

        {
            name: "email",
            actions: [
                {
                    name: "create",
                    params: [
                        {
                            name: "email",
                            type: "string",
                            required: true
                        },
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            help_text: "Example: for_shop"
                        },
                        {
                            name: "comment",
                            type: "string",
                            required: true
                        }
                    ]
                }
            ]
        },

        {
            "name": "chat",
            "actions": [
                {
                    "name": "join",
                    "params": [
                        {
                            "name": "lead_id",
                            "type": "number",
                            "required": true
                        }
                    ]
                },
                {
                    "name": "send",
                    "params": [
                        {
                            "name": "conversation_id",
                            "type": "number",
                            "required": true
                        },
                        {
                            "name": "text",
                            "type": "string",
                            "required": true
                        }
                    ]
                },
                {
                    "name": "history",
                    "params": [
                        {
                            "name": "conversation_id",
                            "type": "number",
                            "required": true
                        },
                        {
                            "name": "from_message_id",
                            "type": "number",
                            "required": false
                        },
                        {
                            "name": "limit",
                            "type": "number",
                            "required": false
                        }
                    ]
                },
                {
                    "name": "list",
                    "params":[]
                },
                {
                    "name": "call_supplier",
                    "params":[
                        {
                            "name": "lead_id",
                            "type": "number",
                            "required": true
                        }
                    ]
                }
            ]
        },

        {
            name: "auth",
            actions: [
                {
                    name: "register",
                    params: [
                        {
                            name: "phone",
                            type: "string",
                            required: true
                        },
                        {
                            name: "instagram_username",
                            type: "string",
                            help_text: "Если пользователь не зарег-н, то посылаем это поле"
                        },
                        {
                            name: "username",
                            type: "string",
                            help_text: "Если пользователь не имеет instagram то, шлем его"
                        }
                    ]
                },
                {
                    name: "send_password",
                    params: [
                        {
                            name: "phone",
                            type: "string",
                            required: true
                        }
                    ]
                },
                {
                    name: "login",
                    params: [
                        {
                            name: "phone",
                            type: "string",
                            required: true
                        },
                        {
                            name: "password",
                            type: "string",
                            required: true,
                            help_text: "Одноразовый пароль, который выслали в sms"
                        }
                    ]
                }
            ]
        }

    ]
};

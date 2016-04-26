// API config
export const CONFIG = {
    resourses: [{
        name: "product",
        actions: [{
            name: "retrieve",
            description: "Получение продукта по ID",
            params: [{
                name: "id",
                type: "number"
            }]
        }, {
            name: "search",
            description: "Поиск продуктов",
            params: [{
                name: "limit",
                type: "number",
                default: 9,
                required: true
            }, {
                name: "offset",
                type: "number",
                default: 0
            }, {
                name: "from_id",
                type: "number",
                help_text: "ID продукта с которого начинать поиск (не включая этот продукт). Не работает, если указан offset"
            }, {
                name: "user_id",
                type: "number",
                help_text: "ID пользователя. Вернет продукты которые упоминал пользватель, или которые лайкнул"
            }, {
                name: "shop_id",
                type: "number",
                help_text: "ID магазина, вернет продукты магазина"
            }, {
                name: "direction",
                type: "boolean",
                help_text: "Направление сортировки, false - desc, true - asc. ",
                default: false
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
                description: "Возвращает список лидов пользователя с информацией о продуктах и чату",
                "params": [
                    {
                        "name": "limit",
                        "type": "number",
                        "help_text": "Сколько лидов за раз вернуть, по умолчанию 20"
                    },
                    {
                        "name": "from_lead_id",
                        "type": "number",
                        "help_text": "ID лида от которого нужно начать выборку (не вклюачя этот ID), работает только если явно задан лимит"
                    }
                ]
            }, {
                "name": "retrieve",
                description: "Возвращает полную информацию о lead, по его lead_id или conversation_id",
                "params": [
                    {
                        "name": "lead_id",
                        "type": "number"
                    },
                    {
                        "name": "conversation_id",
                        "type": "number"
                    }
                ]
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
                description: "Позвать поставщика",
                "params": [{
                    "name": "lead_id",
                    "type": "number",
                    "required": true
                }]
            }, {
                "name": "call_customer",
                description: "Позвать покупателя",
                "params": [{
                    "name": "lead_id",
                    "type": "number",
                    "required": true
                }]
            }]
        },

        {
            name: "message",
            description: "Сообщения чата",
            actions: [
                {
                    "name": "create",
                    description: "Отправка сообщения участинам чата",
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
                },
                {
                    "name": "update",
                    description: "Пометить сообщение прочтенным",
                    "params": [{
                        "name": "conversation_id",
                        "type": "number",
                        "required": true
                    }, {
                        "name": "message_id",
                        "type": "number",
                        "required": true
                    }]
                }
            ]
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

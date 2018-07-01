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
            name: "like",
            description: "Лайкнуть продукт или забрать лайк",
            params: [{
                name: "product_id",
                type: "number",
                required: true
            }, {
                name: "like",
                type: "boolean",
                help_text: "true - поставить лайк, false - забрать лайк",
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
                name: "instagram_name",
                type: "string",
                help_text: "Instagram username пользователя или магазина. Вернет продукты которые упоминал пользватель, или которые лайкнул. Если это магазин, то вернет продукты магазина. При поиски по instagram_name приоритет отдается магазину. Т.е. при существовании магазина и пользователя с одинаковым юзернеймом, поиск будет по магазину"
            }, {
                name: "shop_id",
                type: "number",
                help_text: "ID магазина, вернет продукты магазина"
            }, {
                name: "shop_instagram_name",
                type: "string",
                help_text: "Instagram username магазина, вернет продукты магазина"
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
        }, {
            name: "elastic_search",
            description: "поиск продуктов через эластик",
            params: [{
                name: "query",
                type: "string",
                help_text: "текст запроса"
            }, {
                name: "tags",
                type: "number|array",
                help_text: "Массив id интересующих тегов('[1, 2 ,3]')"
            }, {
                name: "shop_id",
                type: "number",
                help_text: "id магазина, в товарах которого идет поиск"
            }, {
                name: "mentioner_id",
                type: "number",
                help_text: "id пользователя, добавившего товар. исключит из выдачи товары, для которых этот пользователь является поставщиком"
            }, {
                name: "limit",
                type: "number",
                default: 9,
                help_text: "количество запрашиваемых результатов"
            }, {
                name: "offset",
                type: "number",
                default: 0,
                help_text: "смещение начала окна возвращаемых результатов"
            }, {
                name: "include_not_on_sale",
                type: "boolean",
            }]
        }, {
            name: "get_liked_by",
            description: "Возвращает список товаров, лайкнутых пользователем",
            params: [{
                name: "user_id",
                type: "number",
                required: true,
                help_text: "id интересующего пользователя"
            }]
        }, {
            name: "get_specials",
            description: "Возвращает список товаров с нестандартными шаблонами",
            params: []
        }, {
            name: "lastid",
            description: "Возвращает ID последнего товара",
            params: [{
                name: "shop_id",
                type: "number",
                required: true,
                help_text: "id интересующего шопа"
            }]
        }, {
            name: "delete",
            description: "Удалить продукт по ID",
            params: [{
                name: "product_id",
                type: "number",
                required: true
            }]
        }, {
            name: "edit",
            description: "Редактирование товара. Стоит передавать объект, полученный через product/retrieve с нужными изменениями. Поля, которых нет в описании, невозможно изменить через этот вызов.",
            params: [{
                name: "id",
                type: "number",
                required: true,
                help_text: "id продукта"
            }, {
                name: "title",
                type: "string",
                help_text: "заголовок",
            }, {
                name: "code",
                type: "string",
                help_text: "обычно код привязан к id продукта. возможно, стоит запретить редактирование"
            }, {
                name: "instagram_image_caption",
                type: "string",
                help_text: "описание товара"
            }, {
                name: "instagram_image_url",
                type: "string",
                help_text: "картинка товара. instagram_images обновляются при её смене"
            }, {
                name: "instagram_link",
                type: "string",
                help_text: "линк на пост в инстаграмме",
            }, {
                name: "chat_message",
                type: "string",
                help_text: "сообщение, отправляемое после основных шаблонов"
            }, {
                name: "web_shop_url",
                type: "string",
                help_text: "линк на товар на сайте поставщика"
            }, {
                name: "isSale",
                type: "boolean",
                help_text: "если истина, продукт будет показан на сайте",
            }, {
                name: "items",
                type: "json",
                help_text: "если не указывать id, то создается новый итем. с удалением всё плохо, т.к. итемы до сих под напрямую линкуются в заказы... в тегах достаточно указывать только их id, остальные поля игнорируются",
                default: [{id: 42, name: "test", price: 42, discount_price: 24, tags: [{id: 1}, {id: 2}]}]
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
        name: "card",
        actions: [{
            name: "retrieve",
            description: "Получить карты магазина",
            params: [{
                name: "shop_id",
                type: "number",
                default: 0
            }]
        },
        {
            name: "create",
            description: "Создать карту магазина",
            params: [{
                name: "shop_id",
                type: "number",
                default: 0
            }, {
                name: "card_name",
                type: "string",
                default: ""
            }, {
                name: "card_number",
                type: "string",
                default: ""
            }]
        }, {
            name: "delete",
            description: "Удалить карту по ID",
            params: [{
                name: "card_id",
                type: "number",
                default: 0
            }]
        }]
    },

    {
        name: "paymentcard",
        actions: [{
            name: "retrieve",
            description: "Получить карты текущего юзера",
            params: []
        },
        {
            name: "create",
            description: "Создать карту",
            params: []
        }, {
            name: "delete",
            description: "Удалить карту по ID",
            params: [{
                name: "card_id",
                type: "string",
                default: ""
            }]
        }]
    },

    {
        name: "account",
        actions: [
        {
            name: "confirm",
            description: "Ввести код подтверждения",
            params: [
            {
                name: "code",
                type: "string"
            },
            {
                name: "instagram_username",
                type: "string"
            },
            {
                name: "instagram_id",
                type: "number"
            },
            {
                name: "password",
                type: "string"
            }
            ]
        },
        {
            name: "list",
            description: "Получение слиска известных аккаунтов",
            params: [{
                name: "role",
                type: "string",
                help_text: "Если задана, выдаются только аккаунты с этой ролью"
            }, {
                name: "with_invalids",
                type: "boolean",
                help_text: "Если инстина, выдаются в том числе невалидные(незалогиненные) аккаутны"
            }, {
                name: "with_non_owned",
                type: "boolean",
                help_text: "Если инстина, выдаются в том числе аккаунты, не принадлежащие текущему пользвателю. Нужны админские права"
            }, {
                name: "show_private",
                type: "boolean",
                help_text: "Показывать системные поля. Нужны админские права"
            }]
        },
        {
            name: "add",
            description: "Добавление аккаунта для ботов",
            params: [{
                name: "username",
                type: "string"
            }, {
                name: "password",
                type: "string"
            }, {
                name: "role",
                type: "string",
                help_text: "Роль бота. Только для админов"
            }, {
                name: "prefer_email",
                type: "boolean",
                help_text: "Если инстина, при отправке кода подтверждения приоритет будет предоставляться email-методу"
            }, {
                name: "proxy",
                type: "string",
                help_text: "Прокси в формате scheme://user:password@host:port Подддерживаеются http, https и socks5 прокси"
            }]
        },
        {
            name: "set_proxy",
            description: "Изменение прокси для бота. Нужны права администратора.",
            params: [{
                name: "username",
                type: "string"
            }, {
                name: "proxy",
                type: "string",
                help_text: "Прокси в формате scheme://user:password@host:port Подддерживаеются http, https и socks5 прокси"
            }]
        },
        {
            name: "set_debug",
            description: "Включение/выключение отладочных сообщений",
            params: [{
                name: "username",
                type: "string"
            }, {
                name: "debug",
                type: "boolean",
            }]
        },
        {
            name: "raw_query",
            description: "Прямой GET запрос к api инстаграма от имени заданого пользователя. Нужны права администратора.",
            params: [{
                name: "user_id",
                type: "string",
                help_text: "instagram id интересующего пользователя"
            }, {
                name: "uri",
                type: "string",
            }]
        },
        {
            name: "invalidate",
            description: "Отключить бота",
            params: [{
                name: "username",
                type: "string"
            }, {
                name: "force",
                type: "boolean",
                help_text: "позволяет админам выключать чужих ботов",
            }]
        }
        ]
    },


    {
        name: "order",
        actions: [{
            name: "create",
            description: "Создать ордер на перевод между картами",
            params: [
            {
                name: "amount",
                type: "number",
                help_text: "Сумма платежа в валюте",
                default: 0
            }, {
                name: "currency",
                type: "number",
                help_text: "Номер валюты (соответственно protobuf; 0=RUB)",
                default: 0
            }, {
                name: "lead_id",
                type: "number",
                help_text: "Номер заказа, по которому проходит оплата",
                default: 0
            }, {
                name: "card",
                type: "number",
                help_text: "ID карты магазина",
                default: ""
            }, {
                name: "redirect",
                type: "string",
                help_text: "Ключ выбора шаблона перенаправления клиента после оплаты"
            }
            ]
        }, {
            name: "cancel",
            description: "Отменить ордер на перевод",
            params: [
            {
                name: "lead_id",
                type: "number",
                help_text: "Номер заказа, по которому проходит оплата",
                default: 0
            }, {
                name: "id",
                type: "number",
                help_text: "Номер отменяемого ордера",
                default: 0
            }
            ]

        }
        ]
    },

    {
        name: "payment",
        actions: [{
            name: "create",
            description: "Начать процесс оплаты (получить ссылку на страницу с оплатой)",
            params: [
            {
                name: "id",
                type: "number",
                help_text: "ID ордера на оплату",
                default: 0
            }, {
                name: "lead_id",
                type: "number",
                help_text: "Номер заказа, по которому проходит оплата",
                default: 0
            }
            ]
        }]
    },


    {
        name: "lead",
        actions: [{
            name: "create",
            description: "Создает или находит существующий заказ и выподлняет действие, заднанное в action, с переданным товром в контексте этого заказа.",
            params: [{
                name: "id",
                type: "number",
                help_text: "ID продукта. Например: 42",
                required: true
            }, {
                name: "action",
                type: "number",
                help_text: "Код типа действия. 0(по умолчанию) - покупка, 1 - запрос информации в чат"
            }]
        }, {
            name: "list",
            description: "Возвращает список лидов пользователя с информацией о продуктах и чату",
            params: [{
                name: "limit",
                type: "number",
                help_text: "Сколько лидов за раз вернуть, по умолчанию 20"
            }, {
                name: "from_updated_at",
                type: "number",
                help_text: "Время обновления от которого нужно возвращать лиды. Используйте 0 чтобы получить самые свежии лиды, а затем используйте update_at последнего в списке для получения следующей страницы"
            },{
                name: "direction",
                type: "boolean",
                help_text: "Направление сортировки true - asc, false - desc"
            },
            {
                name: "roles",
                type: "string",
                help_text: "Список ролей через запятую, возможные роли: seller, customer, supplier. Если ни одна из ролей не передана, будет возвращено две группы лидов: customer(только лиды где юзер customer) и seller(где юзер seller, supplier или super_seller)"
            }, {
                name: "shop_id",
                type: "number",
                help_text: "Отфильтровать заказы по магазину"
            }]
        }, {
            name: "retrieve",
            description: "Возвращает полную информацию о lead, по его lead_id или conversation_id",
            params: [{
                name: "lead_id",
                type: "number"
            }, {
                name: "conversation_id",
                type: "number"
            }]
        }, {
            name: "event",
            description: "Изменяет статус заказа",
            params: [{
                name: "lead_id",
                type: "number",
                required: true
            }, {
                name: "event",
                type: "string",
                help_text: "Доступные события: CREATE, PROGRESS, SUBMIT, DELIVERY, COMPLETE, CANCEL",
                required: true
            }, {
                name: "cancel_reason",
                type: "number",
                help_text: "id причины отмены заказа. Обязателен при event = CANCEL, при переходах в другие состояния сбрасывается"
            }, {
                name: "status_commet",
                type: "string",
                help_text: "Комментарий к статусу заказа. Если пустой, старое значение не изменяется"
            }]
        }, {
            name: "get_cancel_reasons",
            description: "Возвращает возможные причины отмены заказа",
            params: []
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
        name: "chat",
        description: "Присоединение к чату по ID лида или ID его чата",
        actions: [{
            name: "join",
            params: [
            {
                name: "lead_id",
                type: "number",
                help_text: "ID лида"
            },
            {
                name: "conversation_id",
                type: "number",
                help_text: "ID чата"
            }
            ]
        }, {
            name: "call_supplier",
            description: "Позвать поставщика",
            params: [{
                name: "lead_id",
                type: "number",
                required: true
            }]
        }, {
            name: "call_customer",
            description: "Позвать покупателя",
            params: [{
                name: "lead_id",
                type: "number",
                required: true
            }]
        }, {
            name: "enable_sync",
            description: "Активирует синхронизацию с директом",
            params: [{
                name: "conversation_id",
                type: "number",
                help_text: "ID чата"
            }]
        }]
    },

    {
        name: "message",
        description: "Сообщения чата",
        actions: [{
            name: "create",
            description: "Отправка сообщения участинам чата",
            params: [{
                name: "conversation_id",
                type: "number",
                required: true
            }, {
                name: "text",
                type: "string",
                required: true
            }, {
                name: "mime_type",
                type: "string",
                help_text: "по умолчанию text/plain. Для того чтобы послать изображение, нужно указать тип image/base64, в качестве текста передать base64 закодированное сообщение. Обратите внимание что FileReader.GetDataUrl возвращает не чистый base64, а с префиксом, который нужно удалить из полученной строки"
            }]
        }, {
            name: "update",
            description: "Пометить сообщение прочтенным",
            params: [{
                name: "conversation_id",
                type: "number",
                required: true
            }, {
                name: "message_id",
                type: "number",
                required: true
            }]
        },
        {
            name: "search",
            description: "История сообщений",
            params: [{
                name: "conversation_id",
                type: "number",
                required: true
            }, {
                name: "from_message_id",
                type: "number",
                required: false
            }, {
                name: "limit",
                type: "number",
                required: false
            },
            {
                name: "direction",
                type: "boolean",
                default: false,
                    required: false,
                    help_text: "если true, сообщения возращаются от новых к старым"
            }]
        }, {
            name: "count_unread",
            description: "Получить общее число не прочтенных сообщений для всех чатов",
            params: []
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
            },{
                name: "source",
                type: "string"
            }]
        }, {
            name: "fakeregister",
            description: "Регистрирует временного пользователя и возвращает токен",
            params: [
            {
                name: "source",
                type: "string"
            }]
        }, {
            name: "send_password",
            description: "Отправляет пароль на телефон",
            params: [{
                name: "phone",
                type: "string",
                required: true
            }]
        }, {
            name: "login",
            description: "Логинит и возвращает токен",
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
    },

    {
        name: "user",
        description: "Профиль пользователя",
        actions: [
        {
            name: "retrieve",
            description: "Получения профиля пользователя или магазина",
            params: [
            {
                name: "instagram_name",
                type: "string",
                help_text: "Instagram username пользователя или магазина. Приритет отдается магазину, т.е. при совпадении инстаграм имен, будет возвращен магазин"
            },
            {
                name: "user_id",
                type: "number",
                help_text: "ID пользователя в core"
            }
            ]
        },
        {
            name: "set_email",
            description: "Устанавливает email для текущего пользователя",
            params: [
            {
                name: "email",
                type: "string"
            }
            ]
        },
        {
            name: "set_data",
            description: "Устанавливает name и phone для текущего пользователя",
            params: [
            {
                name: "name",
                type: "string"
            },
            {
                name: "phone",
                type: "string"
            }
            ]
        },
        {
            name: "list_telegrams",
            description: "Список связанных чатов телеграма",
            params: [
            ]
        },
        {
            name: "confirm_telegram",
            description: "Подтверждение чата для получения уведомлений",
            params: [
            {
                name: "chat_id",
                type: "number",
                help_text: "id чата из list_telegrams"
            }
            ]
        },
        {
            name: "del_telegram",
            description: "Отвязывает чат от учетной записи",
            params: [
            {
                name: "chat_id",
                type: "number",
                help_text: "id чата из list_telegrams"
            }
            ]
        }
        ]
    },
    {
        name: "shop",
        description: "Профиль магазина",
        actions: [
        {
            name: "retrieve",
            description: "Получения профиля магазина по id или имени в инстаграмме",
            params: [
            {
                name: "instagram_name",
                type: "string",
                help_text: "Instagram username пользователя"
            },
            {
                name: "shop_id",
                type: "number",
                help_text: "ID пользователя в core"
            }
            ]
        },
        {
            name: "create",
            description: "Создает магазин для текущего пользователя и вовращает его id. Если такой уже существует, возвращается старый.",
            params: []
        }
        ]
    },
    {
        name: "coins",
        description: "Трендкоины",
        actions: [
        {
            name: "balance",
            description: "Возвращает баланс текущего пользователя",
            params: []
        },
        {
            name: "log",
            description: "Возвращает лог транзакций текущего пользователя",
            params: [{
                name: "limit",
                type: "number",
                default: 20,
                    help_text: "количество запрашиваемых результатов"
            }, {
                name: "offset",
                type: "number",
                default: 0,
                    help_text: "смещение начала окна возвращаемых результатов"
            }, {
                name: "before",
                type: "number",
                help_text: "только транзакции, произведенные до(не включая), юникстайм, секунды"
            }, {
                name: "after",
                type: "number",
                help_text: "только транзакции, произведенные начиная с(включительно), юникстайм, секунды"
            }, {
                name: "asc",
                type: "boolean",
                dafault: false,
                help_text: "если истина, транзакции возвращаются от старых к новым(по умолчанию наооборот)"
            }]
        }
        ]
    },
    {
        name: "monetization",
        description: "Инфрмация о планах монитизации",
        actions: [
        {
            name: "get_plan",
            description: "Возвращает информацию о конкретном плане",
            params: [{
                name: "plan_id",
                type: "number",
                required: true,
                help_text: "ID плана"
            }]
        }, {
            name: "plans_list",
            description: "Возвращает список публичных плане",
            params: [{
                name: "currency",
                type: "string",
                help_text: "опциональный фильтр по валюте(RUB/USD/etc)",
            }, {
                name: "with_bot",
                type: "boolean",
                dafault: false,
                help_text: "только планы с directbot"
            }]
        }, {
            name: "coins_offers",
            description: "Возвращает список пакетов коинов",
            params: [{
                name: "currency",
                type: "string",
                help_text: "опциональный фильтр по валюте(RUB/USD/etc)",
            }, {
                name: "offer_id",
                type: "number",
                help_text: "может быть передан для выбора получения конкретного пакета по id",
            }]
        }, {
            name: "buy_coins",
            description: "Покупка коинв. Возвращает id платежа, дальше его нужно использовать в payment/create",
            params: [{
                name: "offer_id",
                type: "number",
                required: true,
                help_text: "ID пакета",
            }, {
                name: "gateway",
                type: "string",
                required: true,
                help_text: "имя гайта платежей",
            },{
                name: "redirect",
                type: "string",
                required: true,
                help_text: "redirect key (trendever,directbot, test)"
            }]
        }, {
            name: "set_autorefill",
            description: "Устанавливает пакет коинов для автопополнения счета",
            params: [{
                name: "offer_id",
                type: "number",
                help_text: "ID пакета",
            }, {
                name: "disable",
                type: "boolean",
                dafault: false,
                help_text: "отменяет текущие настройки атопополнения(при этом новый пакет установлен НЕ будет)",
            }]
        }, {
            name: "subscribe",
            description: "Подключает магазин к плану монетизации. Текущий пользователь должен быть поставщиком этого магазина",
            params: [{
                name: "plan_id",
                type: "number",
                required: true,
                help_text: "ID плана"
            }, {
                name: "shop_id",
                type: "number",
                required: true,
                help_text: "ID шопа"
            }, {
                name: "auto_renewal",
                type: "boolean",
                help_text: "если истина, подписка будет автоматически продляться по истечению"
            }]
        }
        ]
    },
    {
        name: "common",
        description: "Другое",
        actions: [
        {
            name: "market_sms",
            description: "Посылает смс со ссылкой на маркет на переданный номер",
            params: [{
                name: "phone",
                type: "string",
                required: true
            }]
        }
        ]
    },
    {
        name: "instagram",
        description: "",
        actions: [
        {
            name: "get_profile",
            description: "Получает профиль в инстаргамме по его id или имени",
            params: [{
                name: "id",
                type: "number",
                help_text: "instagram id"
            }, {
                name: "name",
                type: "string",
                help_text: "instagram username"
            }]
        }
        ]
    }

    ]
};

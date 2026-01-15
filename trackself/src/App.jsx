import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Globe, X, ArrowRight, Check, Star, Layout, TrendingUp, Calendar } from 'lucide-react';
import habitTrackerImage from './assets/habittracker.png';
import dailyTrackerImage from './assets/dailytracker.png';
import comboTrackersImage from './assets/combotrackers.png';

// --- КОНФИГУРАЦИЯ И ДАННЫЕ ---

const TRANSLATIONS = {
  en: {
    heroTitle: "Structure your chaos.",
    heroSubtitle: "Premium Google Sheets templates for finance, habits, and life management. No subscriptions, just lifetime access.",
    cta: "Explore Templates",
    shopTitle: "Curated Collection",
    shopSubtitle: "Tools designed to make you productive and calm.",
    buy: "Buy",
    footer: "© 2025 TrackSelf. Designed for the organized mind.",
    filters: { all: "All", planner: "Planners", bundle: "Bundle" },
    currency: "$",
    cart: "Cart",
    features: [
      { title: "Auto-Calculations", desc: "Formulas do the math for you." },
      { title: "Aesthetic Design", desc: "Pleasing to the eye, easy to read." },
      { title: "Instant Access", desc: "Start planning in seconds." }
    ],
    templatesTitle: "Built-in dashboards",
    templatesSubtitle: "Preview the templates right here. One click to open or make a copy.",
    inlinePreview: "Inline preview",
    expand: "Expand",
    preview: "Preview",
    open: "Open",
    copy: "Make a copy",
    bestseller: "Bestseller",
    legalTitle: "Seller details",
    legalName: "Full name: Lokiaev Alan Eduardovich",
    legalInn: "Tax ID: 304794676",
    legalContact: "Contact email: realmaboi@gmail.com",
    documentsTitle: "Documents",
    backToSite: "Back to site",
    offerTitle: "Public offer",
    privacyTitle: "Privacy policy",
  },
  ru: {
    heroTitle: "Структурируй свой хаос.",
    heroSubtitle: "Премиальные шаблоны Google Таблиц для финансов, привычек и жизни. Никаких подписок — доступ навсегда.",
    cta: "Смотреть шаблоны",
    shopTitle: "Коллекция шаблонов",
    shopSubtitle: "Инструменты, созданные для спокойствия и продуктивности.",
    buy: "Купить",
    // footer: "© 2025 TrackSelf. Дизайн для организованного разума.",
    filters: { all: "Все", planner: "Планнеры", bundle: "Комбо" },
    currency: "₽",
    cart: "Корзина",
    features: [
      { title: "Авто-расчеты", desc: "Формулы считают всё за вас." },
      { title: "Эстетика", desc: "Приятный глазу минимализм." },
      { title: "Мгновенный доступ", desc: "Начните планировать сразу." }
    ],
    templatesTitle: "Встроенные дашборды",
    templatesSubtitle: "Смотри превью прямо тут. В 1 клик — открыть или сделать копию.",
    inlinePreview: "Превью на странице",
    expand: "Развернуть",
    preview: "Превью",
    open: "Открыть",
    copy: "Сделать копию",
    bestseller: "Хит продаж",
    legalTitle: "Реквизиты",
    legalName: "ФИО: Локьяев Алан Эдуардович",
    legalInn: "ИНН: 250814495705",
    legalContact: "Контактный e-mail: realmaboi@gmail.com",
    documentsTitle: "Документы",
    backToSite: "Вернуться на сайт",
    offerTitle: "Публичная оферта",
    privacyTitle: "Политика конфиденциальности",
  }
};

// FastSpring test storefront base (product page)
const FASTSPRING_TEST_BASE = "https://ryyvo.test.onfastspring.com/";

const PRODUCTS = [
  {
    id: 1,
    category: "planner",
    title: { en: "Daily Tracker", ru: "Дейли Трекер" },
    price: { en: 12, ru: 399 },
    oldPrice: { en: 18, ru: 699 },
    image: dailyTrackerImage,
    tags: { en: ["Daily", "Focus"], ru: ["Дейли", "Фокус"] },
    fastspringPath: "daily-tracker",
    bestseller: true,
    description: {
      en: "A focused daily system for clarity, priorities, and progress. Plan your day, capture results, and stay consistent.",
      ru: "Сфокусированная ежедневная система для ясности, приоритетов и прогресса. Планируй день, фиксируй результаты и держи ритм."
    },
    details: {
      en: ["Morning plan + evening review", "Priority blocks and time focus", "Micro-habit checklist", "Daily mood + energy log"],
      ru: ["Утренний план + вечерний обзор", "Блоки приоритетов и фокуса", "Чек-лист микро-привычек", "Лог настроения и энергии"]
    }
  },
  {
    id: 2,
    category: "planner",
    title: { en: "Habit Tracker", ru: "Хэбит Трекер" },
    price: { en: 12, ru: 399 },
    oldPrice: { en: 18, ru: 699 },
    image: habitTrackerImage,
    tags: { en: ["Habits", "Health"], ru: ["Хэбиты", "Здоровье"] },
    fastspringPath: "habit-tracker",
    bestseller: false,
    description: {
      en: "Build routines that stick with a clean monthly habit grid and weekly insights.",
      ru: "Построй устойчивые привычки с чистой сеткой месяца и недельной аналитикой."
    },
    details: {
      en: ["Monthly grid with streaks", "Weekly summary and notes", "Progress score + KPI", "Clean, print-ready layout"],
      ru: ["Сетка месяца со streaks", "Недельная сводка и заметки", "Скор прогресса + KPI", "Чистый макет для печати"]
    }
  },
  {
    id: 3,
    category: "bundle",
    title: { en: "Combo: 2 Trackers", ru: "Комбо: 2 Планнера" },
    price: { en: 19, ru: 699 },
    oldPrice: { en: 24, ru: 1499 },
    image: comboTrackersImage,
    tags: { en: ["Best Value", "Save"], ru: ["Выгодно", "Скидка"] },
    fastspringPath: "PASTE_COMBO_PRODUCT_PATH",
    bestseller: false,
    description: {
      en: "Get both trackers together and save. Perfect for daily focus + habit consistency.",
      ru: "Два трекера вместе и выгоднее. Идеально для ежедневного фокуса и привычек."
    },
    details: {
      en: ["Daily Tracker + Habit Tracker bundle", "Unified visual style", "One-time purchase, lifetime access", "Save vs buying separately"],
      ru: ["Daily Tracker + Habit Tracker в наборе", "Единый визуальный стиль", "Разовая покупка, доступ навсегда", "Экономия против отдельной покупки"]
    }
  }
];

const OFFER_CONTENT = {
  en: [
    {
      title: "",
      body: "on concluding a contract for providing access to digital content",
    },
    {
      title: "1. GENERAL PROVISIONS",
      body: `1.1. This public agreement (the "Offer") defines the terms for providing access to digital products and is an official public offer by the individual registered as a payer of professional income tax, Lokyaev Alan Eduardovich (the "Provider"), to conclude a contract on the terms set out below with any fully capable individual or legal entity that accepts this offer (the "Customer").
1.2. The Provider operates under Federal Law dated 27.11.2018 No. 422-FZ "On conducting an experiment to establish a special tax regime 'Professional Income Tax'".
1.3. In accordance with paragraph 2 of Article 437 of the Civil Code of the Russian Federation, this document is a public offer. The Customer's actions to accept the offer in the manner specified in Section 3 of this Offer mean full and unconditional acceptance of all terms without any exceptions or limitations (acceptance).
1.4. The Agreement is deemed concluded and gains legal force from the moment the Customer accepts this offer.

Terms and definitions:
- Provider's website: https://trackself.ru
- Digital content / Product: Digital products presented on the Provider's website - Google Sheets (spreadsheets), as well as other related materials (instructions, guides) provided in digital form.
- Acceptance: Full and unconditional payment by the Customer for the selected Product, which is deemed the conclusion of the Agreement on the terms of this Offer.
- Access: Providing the Customer with a unique link to view and/or copy a Google Sheet to their personal account.
- Personal data: Information provided by the Customer when placing an order (email address, Telegram nickname) needed to perform this Agreement.`,
    },
    {
      title: "2. SUBJECT OF THE AGREEMENT",
      body: `2.1. The Provider grants the Customer access to the purchased Digital Content (Google Sheets), and the Customer undertakes to pay for the provided access under the terms of this Agreement.
2.2. The full list of Products, their description, functionality, and price are posted on the Provider's website and are an integral part of this Agreement.`,
    },
    {
      title: "3. CONCLUSION OF THE AGREEMENT AND ACCESS TO CONTENT",
      body: `3.1. The Customer chooses a Product on the Provider's website and, when placing an order, provides the following personal data required for communication and performance of the Agreement: email address (email) and Telegram nickname.
3.2. The Customer pays for the Product on a 100% prepayment basis via the payment systems connected on the Provider's website.
3.3. The moment of acceptance (full and unconditional acceptance of the offer terms) and the moment of concluding the Agreement is the fact of successful receipt of funds to the Provider's account.
3.4. After confirming successful payment, the Provider, within a reasonable time but no later than 24 (twenty-four) hours from receipt, sends the Customer access to the paid Product. The access link to the Google Sheet is sent to the email address and/or Telegram nickname provided by the Customer (at the Provider's discretion).
3.5. The service of providing access is deemed rendered at the moment the link is sent to the Customer by one of the indicated methods.`,
    },
    {
      title: "4. RIGHTS AND OBLIGATIONS OF THE PARTIES",
      body: `4.1. The Provider undertakes to:
4.1.1. Provide the Customer with access to the paid Digital Content in the manner and timeframes specified in clause 3.4 of the Agreement.
4.1.2. Ensure confidentiality of the Customer's personal data in accordance with Russian law.

4.2. The Provider has the right to:
4.2.1. Unilaterally change the terms of this Offer and/or the prices of Products posted on the website. Changes take effect from the moment they are published on the website.
4.2.2. Suspend service provision for technical reasons (maintenance, outages, etc.).

4.3. The Customer undertakes to:
4.3.1. Provide accurate data needed to obtain access to the Product and communicate.
4.3.2. Independently ensure the necessary technical capabilities (device, internet access, Google account) to work with Google Sheets.
4.3.3. Not distribute, reproduce, sell, or transfer to third parties the provided Digital Content (the link to the Sheet or its copy), except for personal use. Any commercial use of templates and methodologies implemented in the Sheets for third parties is prohibited.
4.3.4. Provide accurate email and Telegram nickname needed for proper performance of the Agreement.

4.4. The Customer has the right to:
4.4.1. Require the Provider to provide access to the Digital Content in accordance with this Agreement.`,
    },
    {
      title: "5. COST OF SERVICES AND SETTLEMENTS",
      body: `5.1. The cost of access to the selected Digital Content is indicated on the Provider's website at the moment of payment by the Customer.
5.2. The full cost of the Provider's services includes the professional income tax (PIT). The Provider, being self-employed, does not issue invoices and does not use cash register equipment, but creates a receipt in the "My Tax" mobile app, which is sent to the Customer by email.
5.3. Payment is made once and in full on the basis of the issued invoice by transferring funds to the Provider's bank account/card or through a payment gateway.
5.4. The Digital Content is considered properly delivered and accepted by the Customer at the moment the access link is sent. Due to the nature of the product (granting a non-exclusive license to use a digital template), refunds are not made after the Customer receives access to the Sheet. Claims about quality are not accepted after the Customer copies/downloads the content.`,
    },
    {
      title: "6. LIABILITY OF THE PARTIES",
      body: `6.1. The parties are liable for non-performance or improper performance of this Agreement in accordance with current Russian law.
6.2. The Provider is not liable for the inability to provide services to the Customer for reasons beyond the Provider's control, including but not limited to internet outages, equipment or software failures on the Customer's side, actions of providers, or government authorities.
6.3. The Provider is not liable for the results of the Customer's use of the obtained knowledge, templates, and materials, as well as for possible losses arising from their use in the Customer's business.`,
    },
    {
      title: "7. CONFIDENTIALITY AND DATA PROTECTION",
      body: `7.1. The purpose of collecting and processing the Customer's personal data is the performance of this Agreement: identification of the Customer, communication to send access to the Product and resolve issues related to the Agreement, and sending informational and promotional messages.
7.2. The list of processed data: email address, Telegram nickname, mobile phone number.
7.3. Personal data is processed by mixed processing (collection, recording, systematization, accumulation, storage, updating (modification), use, transfer (providing access)).
7.4. The Provider undertakes not to transfer received personal data to third parties, except when necessary for technical mailing support (for example, using email mailing services), and only provided that such parties maintain confidentiality of personal data.
7.5. By accepting this Offer, the Customer expresses consent to such processing of their personal data in accordance with Federal Law dated 27.07.2006 No. 152-FZ "On Personal Data" on the terms and for the purposes specified in the Offer.
7.6. Consent to personal data processing is valid until the Customer withdraws it by sending a notice to the Provider's email. Withdrawal of consent makes further performance of the Agreement impossible.`,
    },
    {
      title: "8. FINAL PROVISIONS",
      body: `8.1. This Agreement is governed by the laws of the Russian Federation.
8.2. All disputes and disagreements are resolved through negotiation. If no agreement is reached, the dispute shall be resolved in court at the Provider's place of registration.
8.3. Recognition by a court of any provision of the Agreement as invalid does not affect the validity of the remaining provisions.`,
    },
    {
      title: "9. PROVIDER DETAILS AND CONTACTS",
      body: `Full name: Lokyaev Alan Eduardovich
TIN: 250814495705
Contact email: realmaboi@gmail.com`,
    },
  ],
  ru: [
    {
      title: "",
      body: "о заключении договора на предоставление доступа к цифровому контенту",
    },
    {
      title: "1. ОБЩИЕ ПОЛОЖЕНИЯ",
      body: `1.1. Настоящий публичный договор (далее – «Оферта») определяет условия предоставления доступа к цифровым продуктам и является официальным публичным предложением Физического лица, зарегистрированного в качестве плательщика налога на профессиональный доход Локьяева Алана Эдуардовича (далее — «Исполнитель»), заключить договор на изложенных ниже условиях с любым полностью дееспособным физическим или юридическим лицом, которое совершит акцепт настоящей оферты (далее — «Заказчик»).
1.2. Исполнитель осуществляет деятельность на основании Федерального закона от 27.11.2018 N 422-ФЗ "О проведении эксперимента по установлению специального налогового режима "Налог на профессиональный доход".
1.3. В соответствии с п. 2 ст. 437 Гражданского кодекса РФ (ГК РФ) данный документ является публичной офертой. Совершение Заказчиком действий по акцепту оферты в порядке, предусмотренном разделом 3 настоящей Оферты, означает полное и безоговорочное принятие Заказчиком всех условий без каких-либо изъятий или ограничений (акцепт).
1.4. Договор считается заключенным и приобретает юридическую силу с момента совершения Заказчиком акцепта настоящей оферты.

Термины и определения:
- Сайт Исполнителя: Интернет-сайт, расположенный по адресу: https://trackself.ru
- Цифровой контент / Товар: Цифровые продукты, представленные на Сайте Исполнителя – Google Таблицы (электронные таблицы), а также иные сопутствующие материалы (инструкции, гайды), предоставляемые в цифровой форме.
- Акцепт: Полная и безусловная оплата Заказчиком выбранного Товара, что признается заключением Договора на условиях настоящей оферты.
- Доступ: Предоставление Заказчику уникальной ссылки для просмотра и/или копирования Google Таблицы в его личный аккаунт.
- Персональные данные: Информация, указанная Заказчиком при оформлении заказа (адрес электронной почты, никнейм в мессенджере Telegram), необходимая для исполнения настоящего Договора.`,
    },
    {
      title: "2. ПРЕДМЕТ ДОГОВОРА",
      body: `2.1. Исполнитель предоставляет Заказчику доступ к приобретенному Цифровому контенту (Google Таблицам), а Заказчик обязуется оплатить предоставленный доступ на условиях настоящего Договора.
2.2. Полный перечень Товаров, их описание, функционал и стоимость размещены на Сайте Исполнителя и являются неотъемлемой частью настоящего Договора.`,
    },
    {
      title: "3. ПОРЯДОК ЗАКЛЮЧЕНИЯ ДОГОВОРА И ДОСТУПА К КОНТЕНТУ",
      body: `3.1. Заказчик осуществляет выбор Товара на Сайте Исполнителя и при оформлении заказа предоставляет следующие персональные данные, необходимые для связи и исполнения Договора: адрес электронной почты (email) и никнейм в мессенджере Telegram.
3.2. Оплата Товара производится Заказчиком на условиях 100% предоплаты путем безналичного расчета через платежные системы, подключенные на Сайте Исполнителя.
3.3. Моментом акцепта (полного и безоговорочного принятия условий оферты) и моментом заключения Договора является факт успешного поступления денежных средств на счет Исполнителя.
3.4. После подтверждения успешной оплаты Исполнитель в разумный срок, но не позднее 24 (двадцати четырех) часов с момента ее получения, направляет Заказчику доступ к оплаченному Товару. Ссылка для доступа к Google Таблице отправляется на указанный Заказчиком адрес электронной почты и/или в мессенджер Telegram на указанный никнейм (на усмотрение Исполнителя).
3.5. Моментом оказания Услуги по предоставлению доступа считается момент отправки ссылки Заказчику одним из указанных способов.`,
    },
    {
      title: "4. ПРАВА И ОБЯЗАННОСТИ СТОРОН",
      body: `4.1. Исполнитель обязуется:
4.1.1. Предоставить Заказчику доступ к оплаченному Цифровому контенту в порядке и сроки, указанные в п. 3.4. Договора.
4.1.2. Обеспечивать конфиденциальность персональных данных Заказчика в соответствии с законодательством РФ.

4.2. Исполнитель вправе:
4.2.1. В одностороннем порядке изменять условия настоящей оферты и/или стоимость Товаров, размещенных на Сайте. Изменения вступают в силу с момента их публикации на Сайте.
4.2.2. Приостановить оказание услуг по техническим причинам (техническое обслуживание, аварии и т.п.).

4.3. Заказчик обязуется:
4.3.1. Предоставить достоверные данные, необходимые для получения доступа к Товару и связи с ним.
4.3.2. Самостоятельно обеспечить наличие технических возможностей (устройство, доступ в интернет, аккаунт Google) для работы с Google Таблицами.
4.3.3. Не распространять, не тиражировать, не продавать, не передавать третьим лицам предоставленный Цифровой контент (ссылку на Таблицу или ее копию), за исключением использования в своих личных целях. Любое коммерческое использование шаблонов и методик, реализованных в Таблицах, в интересах третьих лиц запрещено.
4.3.4. Предоставить достоверные адрес электронной почты и никнейм в Telegram, необходимые для надлежащего исполнения Договора.

4.4. Заказчик вправе:
4.4.1. Требовать от Исполнителя предоставления доступа к Цифровому контенту в соответствии с условиями настоящего Договора.`,
    },
    {
      title: "5. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ",
      body: `5.1. Стоимость доступа к выбранному Цифровому контенту указывается на Сайте Исполнителя на момент его оплаты Заказчиком.
5.2. Вся стоимость услуг Исполнителя включает в себя налог на профессиональный доход (НПД). Исполнитель, являясь самозанятым, не выставляет счета-фактуры и не применяет ККТ, а создает чек в мобильном приложении «Мой налог», который направляется Заказчику по электронной почте.
5.3. Оплата производится единовременно и в полном объеме на основании выставленного счета путем перечисления денежных средств на банковский счет/карту Исполнителя или через платежный шлюз.
5.4. Цифровой контент признается оказанным надлежащим образом и принятым Заказчиком в момент отправки ссылки для доступа. В связи с особенностью продукта (предоставление неисключительной лицензии на использование цифрового шаблона), возврат денежных средств после получения Заказчиком доступа к Таблице не осуществляется. Претензии по качеству не принимаются после копирования/скачивания контента Заказчиком.`,
    },
    {
      title: "6. ОТВЕТСТВЕННОСТЬ СТОРОН",
      body: `6.1. Стороны несут ответственность за неисполнение или ненадлежащее исполнение настоящего Договора в соответствии с действующим законодательством РФ.
6.2. Исполнитель не несет ответственности за невозможность оказания услуг Заказчику по причинам, не зависящим от Исполнителя, включая, но не ограничиваясь: сбоями в работе интернета, оборудования или программного обеспечения у Заказчика, действиями провайдеров, органов государственной власти.
6.3. Исполнитель не несет ответственности за результаты использования Заказчиком полученных знаний, шаблонов и материалов, а также за возможные убытки, возникшие в ходе их применения в бизнесе Заказчика.`,
    },
    {
      title: "7. КОНФИДЕНЦИАЛЬНОСТЬ И ЗАЩИТА ДАННЫХ",
      body: `7.1. Целью сбора и обработки персональных данных Заказчика является исполнение настоящего Договора: идентификация Заказчика, связь с ним для отправки доступа к Товару и решения вопросов, связанных с исполнением Договора, а также направление информационных и рекламных сообщений.
7.2. Перечень обрабатываемых данных: адрес электронной почты (email), никнейм в мессенджере Telegram, номер мобильного телефона.
7.3. Обработка персональных данных осуществляется путем смешанной обработки (сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, передача (предоставление доступа).
7.4. Исполнитель обязуется не передавать полученные персональные данные третьим лицам, за исключением случаев, когда это необходимо для технического обеспечения рассылок (например, с использованием сервисов email-рассылок), и только при условии соблюдения такими лицами конфиденциальности персональных данных.
7.5. Совершая акцепт настоящей оферты, Заказчик выражает свое согласие на такую обработку своих персональных данных в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ «О персональных данных» на условиях и для целей, указанных в Оферте.
7.6. Согласие на обработку персональных данных действует до момента его отзыва Заказчиком путем направления соответствующего уведомления на email Исполнителя. Отзыв согласия влечет за собой невозможность дальнейшего исполнения Договора.`,
    },
    {
      title: "8. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ",
      body: `8.1. Настоящий Договор регулируется законодательством Российской Федерации.
8.2. Все споры и разногласия разрешаются путем переговоров. В случае недостижения согласия спор подлежит разрешению в суде по месту регистрации Исполнителя.
8.3. Признание судом какого-либо положения Договора недействительным не влечет недействительности остальных положений.`,
    },
    {
      title: "9. РЕКВИЗИТЫ И КОНТАКТЫ ИСПОЛНИТЕЛЯ",
      body: `ФИО: Локьяев Алан Эдуардович
ИНН: 250814495705
Контактный e-mail: realmaboi@gmail.com`,
    },
  ],
};

const PRIVACY_CONTENT = {
  en: [
    {
      title: "1. GENERAL PROVISIONS",
      body: `1.1. This Privacy Policy (the "Policy") defines the procedure for processing and protecting personal data by the individual registered as a payer of professional income tax, Lokyaev Alan Eduardovich (the "Administrator").

1.2. The Policy applies to all information that the Administrator may receive about the User while using the website https://trackself.ru (the "Site"), when concluding and performing the public offer agreement, as well as during any other interaction with the Administrator.

1.3. By using the Site and providing the Administrator with their personal data, the User gives consent to their processing in accordance with this Policy.

Terms and definitions:
Personal data - any information relating to the User as a subject of personal data.
Processing of personal data - any action (operation) or set of actions (operations) performed with personal data, including collection, recording, storage, use, transfer, and destruction.`,
    },
    {
      title: "2. PERSONAL DATA",
      body: `2.1. The Administrator processes the following personal data of the User:
Email address (e-mail);
Nickname (username) in the Telegram messenger;
Mobile phone number.

2.2. The specified data is collected and processed for the specific purposes stated in section 3 of this Policy.`,
    },
    {
      title: "3. PURPOSES OF COLLECTING AND PROCESSING PERSONAL DATA",
      body: `3.1. The Administrator processes the User's personal data for the following purposes:
Identification of the User as a party to the public offer agreement.
Performance of obligations under the Agreement: sending access to paid digital products (Google Sheets) and related instructions.
Communication with the User to resolve issues related to the performance of the Agreement.
Sending informational and promotional materials about other digital products and services of the Administrator (mailing).

3.2. Consent to data processing for the purposes specified in clause 3.1 is mandatory for concluding and performing the Agreement. Consent to data processing for the purpose specified in clause 3.1.4 is voluntary.`,
    },
    {
      title: "4. PROCEDURE AND CONDITIONS FOR PROCESSING PERSONAL DATA",
      body: `4.1. Processing of personal data is carried out by the Administrator in compliance with the principles and rules established by Federal Law dated 27.07.2006 No. 152-FZ "On Personal Data".

4.2. Processing of the User's personal data is performed by the following methods:
Collection;
Recording;
Storage;
Updating (modification);
Use;
Transfer (only for the purposes specified in clause 4.3);
Destruction.

4.3. The Administrator has the right to transfer the User's personal data to third parties in the following cases:
For technical organization of mailings: using services that ensure data confidentiality.
At the request of authorized government bodies in cases provided by applicable law of the Russian Federation.

4.4. Personal data processing period:
For purposes of performing the Agreement and sending promotional materials - until the User withdraws consent.

4.5. The Administrator takes necessary and sufficient organizational and technical measures to protect the User's personal data from unlawful or accidental access, destruction, modification, blocking, copying, dissemination, and other unlawful actions by third parties.`,
    },
    {
      title: "5. USER RIGHTS",
      body: `5.1. The User has the right to:
Access their personal data, update, block, or delete it if the data is incomplete, outdated, inaccurate, unlawfully obtained, or not necessary for the stated processing purpose.
Withdraw consent to processing personal data, including for marketing mailings. Withdrawal of consent to processing data necessary for performance of the Agreement makes such performance impossible.
Require elimination of unlawful actions by the Administrator in relation to their personal data.

5.2. To exercise their rights, the User may send a request to the Administrator at the contact email address: realmaboi@gmail.com`,
    },
    {
      title: "6. RIGHTS AND OBLIGATIONS OF THE ADMINISTRATOR",
      body: `6.1. The Administrator undertakes to use the User's personal data exclusively for the purposes specified in section 3 of this Policy.

6.2. The Administrator is obliged to ensure the confidentiality of processed personal data.

6.3. The Administrator has the right to unilaterally change this Policy. The new version of the Policy takes effect from the moment it is posted on the Site.`,
    },
    {
      title: "7. FINAL PROVISIONS",
      body: `7.1. Russian law applies to this Policy and to the relationship between the User and the Administrator arising from its application.

7.2. All disputes under this Policy are resolved in the manner established by applicable law of the Russian Federation, at the location of the Administrator.`,
    },
  ],
  ru: [
    {
      title: "1. ОБЩИЕ ПОЛОЖЕНИЯ",
      body: `1.1. Настоящая Политика конфиденциальности (далее – «Политика») определяет порядок обработки и защиты персональных данных Физическим лицом, зарегистрированным в качестве плательщика налога на профессионального дохода Локьяевым Аланом Эдуардовичем (далее – «Администратор»).

1.2. Политика действует в отношении всей информации, которую Администратор может получить о Пользователе во время использования им сайта https://trackself.ru (далее – «Сайт»), при заключении и исполнении Договора публичной оферты, а также при любом другом взаимодействии с Администратором.

1.3. Используя Сайт и предоставляя Администратору свои персональные данные, Пользователь дает свое согласие на их обработку в соответствии с настоящей Политикой.

Термины и определения:
Персональные данные – любая информация, относящаяся к Пользователю как к субъекту персональных данных.
Обработка персональных данных – любое действие (операция) или совокупность действий (операций), совершаемых с персональными данными, включая сбор, запись, хранение, использование, передачу и уничтожение.`,
    },
    {
      title: "2. ПЕРСОНАЛЬНЫЕ ДАННЫЕ",
      body: `2.1. Администратор обрабатывает следующие персональные данные Пользователя:
Адрес электронной почты (e-mail);
Никнейм (имя пользователя) в мессенджере Telegram;
Номер мобильного телефона.

2.2. Указанные данные собираются и обрабатываются с конкретными целями, указанными в разделе 3 настоящей Политики.`,
    },
    {
      title: "3. ЦЕЛИ СБОРА И ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ",
      body: `3.1. Администратор обрабатывает персональные данные Пользователя для следующих целей:
Идентификация Пользователя как стороны Договора публичной оферты.
Исполнение обязательств по Договору: направление доступа к оплаченным цифровым продуктам (Google Таблицам) и сопутствующих инструкций.
Связь с Пользователем для решения вопросов, связанных с исполнением Договора.
Направление информационных и рекламных материалов о других цифровых продуктах и услугах Администратора (рассылка).

3.2. Согласие на обработку данных для целей, указанных в п.п. 3.1, является обязательным для заключения и исполнения Договора. Согласие на обработку данных для цели, указанной в п. 3.1.4., является добровольным.`,
    },
    {
      title: "4. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ",
      body: `4.1. Обработка персональных данных осуществляется Администратором с соблюдением принципов и правил, установленных Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».

4.2. Обработка персональных данных Пользователя осуществляется следующими способами:
Сбор;
Запись;
Хранение;
Уточнение (обновление, изменение);
Использование;
Передача (только для целей, указанных в п. 4.3);
Уничтожение.

4.3. Администратор вправе передавать персональные данные Пользователя третьим лицам в следующих случаях:
Для технической организации рассылок: с использованием сервисов, обеспечивающих конфиденциальность данных.
По требованию уполномоченных государственных органов в случаях, предусмотренных действующим законодательством Российской Федерации.

4.4. Срок обработки персональных данных:
Для целей исполнения Договора и рассылки рекламных материалов – до момента отзыва согласия Пользователем.

4.5. Администратор принимает необходимые и достаточные организационные и технические меры для защиты персональных данных Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий с ними третьих лиц.`,
    },
    {
      title: "5. ПРАВА ПОЛЬЗОВАТЕЛЯ",
      body: `5.1. Пользователь имеет право:
На доступ к своим персональным данным, их уточнение, блокирование или уничтожение, если данные являются неполными, устаревшими, недостоверными, незаконно полученными или не являются необходимыми для заявленной цели обработки.
На отзыв согласия на обработку персональных данных, в том числе для целей рекламных рассылок. Отзыв согласия на обработку данных, необходимых для исполнения Договора, влечет невозможность такого исполнения.
Требовать устранения неправомерных действий Администратора в отношении его персональных данных.

5.2. Для реализации своих прав Пользователь может направить соответствующий запрос Администратору по контактному адресу электронной почты: realmaboi@gmail.com`,
    },
    {
      title: "6. ПРАВА И ОБЯЗАННОСТИ АДМИНИСТРАТОРА",
      body: `6.1. Администратор обязуется использовать персональные данные Пользователя исключительно в целях, указанных в разделе 3 настоящей Политики.

6.2. Администратор обязан обеспечить конфиденциальность обрабатываемых персональных данных.

6.3. Администратор вправе в одностороннем порядке изменять настоящую Политику. Новая редакция Политики вступает в силу с момента ее размещения на Сайте.`,
    },
    {
      title: "7. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ",
      body: `7.1. К настоящей Политике и отношениям между Пользователем и Администратором, возникающим в связи с ее применением, подлежит применению право Российской Федерации.

7.2. Все споры по настоящей Политике подлежат разрешению в порядке, установленном действующим законодательством РФ, по месту нахождения Администратора.`,
    },
  ],
};

// ⚠️ ВСТАВЬ СЮДА СВОИ ССЫЛКИ (две таблицы): embed/open/copy
const TEMPLATES = [
  {
    id: "habit",
    title: { en: "Habit & Wellness Hub", ru: "Habit & Wellness Hub (Привычки)" },
    subtitle: { en: "Monthly habit grid + analysis + mood chart", ru: "Трекер привычек + анализ + графики" },
    icon: Calendar,
    previewEmbedUrl: "PASTE_HABIT_PUBLISHED_EMBED_URL_HERE",
    openUrl: "PASTE_HABIT_SHEET_URL_HERE",
    copyUrl: "PASTE_HABIT_COPY_URL_HERE",
    bullets: {
      en: ["Checkbox habit grid", "Weekly separation", "Progress KPIs", "Mood & motivation chart"],
      ru: ["Сетка чекбоксов", "Разделение по неделям", "KPI прогресса", "График Mood/Motivation"]
    }
  },
  {
    id: "tasks",
    title: { en: "Task List Dashboard", ru: "Task List Dashboard (Задачи)" },
    subtitle: { en: "KPI + overdue/today highlights + dashboard charts", ru: "KPI + подсветка overdue/today + дашборд" },
    icon: Check,
    previewEmbedUrl: "PASTE_TASKS_PUBLISHED_EMBED_URL_HERE",
    openUrl: "PASTE_TASKS_SHEET_URL_HERE",
    copyUrl: "PASTE_TASKS_COPY_URL_HERE",
    bullets: {
      en: ["Priority/Status/Category dropdowns", "Overdue & today highlighting", "Progress bar", "Dashboard pies + filters"],
      ru: ["Выпадашки Priority/Status/Category", "Подсветка overdue/today", "Progress bar", "Диаграммы + фильтры"]
    }
  }
];

// --- КОМПОНЕНТЫ ---

const Navbar = ({ lang, setLang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold text-stone-900 tracking-tight z-50">
          TrackSelf<span className="text-green-600">.</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#templates" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition">
            {lang === "en" ? "Templates" : "Шаблоны"}
          </a>
          <a href="#shop" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition">
            {t.shopTitle}
          </a>
          <a href="#faq" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition">
            FAQ
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {/* <button
            onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
            className="flex items-center text-xs font-bold bg-stone-200 px-3 py-1 rounded-full hover:bg-stone-300 transition"
            aria-label={lang === 'en' ? 'Switch to Russian' : 'Switch to English'}
          >
            <Globe size={14} className="mr-1" />
            {lang === 'en' ? 'RU' : 'EN'}
          </button> */}

          <button className="relative p-2 text-stone-800 hover:bg-stone-100 rounded-full transition" aria-label={t.cart}>
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-700 rounded-full" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="top" className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider mb-6 border border-emerald-100">
          GOOGLE SHEETS TEMPLATES
        </span> */}
        <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-6 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-10 font-light">
          {t.heroSubtitle}
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#templates"
            className="bg-stone-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-stone-700 transition flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.cta} <ArrowRight size={18} className="ml-2" />
          </a>
        </div> */}
      </motion.div>

      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob animation-delay-2000" />
    </section>
  );
};

const Features = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const icons = [<TrendingUp />, <Layout />, <Check />];

  return (
    <div className="bg-white py-16 border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6">
            <div className="mb-4 text-emerald-700 bg-emerald-50 p-3 rounded-full">
              {icons[idx]}
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">{feature.title}</h3>
            <p className="text-stone-500 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewModal = ({ open, onClose, title, embedUrl }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl overflow-hidden border border-stone-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
          <div className="font-medium text-stone-900">{title}</div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 transition"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        <div className="bg-stone-50">
          <iframe
            title={title}
            src={embedUrl}
            className="w-full h-[70vh]"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const TemplatesShowcase = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [active, setActive] = useState(TEMPLATES[0].id);
  const [modal, setModal] = useState({ open: false, title: "", url: "" });

  const current = TEMPLATES.find(x => x.id === active);

//   return (
//     <section id="templates" className="py-20 px-6 max-w-7xl mx-auto">
//       <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-10">
//         <div>
//           <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">{t.templatesTitle}</h2>
//           <p className="text-stone-500">{t.templatesSubtitle}</p>
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {TEMPLATES.map(item => (
//             <button
//               key={item.id}
//               onClick={() => setActive(item.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
//                 active === item.id
//                   ? "bg-stone-800 text-white"
//                   : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
//               }`}
//             >
//               {item.title[lang]}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left card */}
//         <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
//           <div className="flex items-start gap-4">
//             <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100">
//               <current.icon size={22} />
//             </div>

//             <div className="flex-1">
//               <h3 className="font-serif text-2xl text-stone-900">{current.title[lang]}</h3>
//               <p className="text-stone-500 mt-1">{current.subtitle[lang]}</p>

//               <ul className="mt-5 space-y-2">
//                 {current.bullets[lang].map((b, i) => (
//                   <li key={i} className="flex items-start gap-2 text-stone-700">
//                     <span className="mt-1 text-emerald-700"><Check size={16} /></span>
//                     <span className="text-sm">{b}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={() => setModal({ open: true, title: current.title[lang], url: current.previewEmbedUrl })}
//                   className="bg-stone-900 text-white px-5 py-3 rounded-xl font-medium hover:bg-stone-700 transition flex items-center justify-center"
//                   disabled={!current.previewEmbedUrl || current.previewEmbedUrl.includes("PASTE_")}
//                   title={!current.previewEmbedUrl || current.previewEmbedUrl.includes("PASTE_") ? "Вставь previewEmbedUrl" : ""}
//                 >
//                   {t.preview} <ArrowRight size={16} className="ml-2" />
//                 </button>

//                 <a
//                   href={current.openUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="bg-white border border-stone-200 text-stone-900 px-5 py-3 rounded-xl font-medium hover:bg-stone-50 transition flex items-center justify-center"
//                 >
//                   {t.open}
//                 </a>

//                 <a
//                   href={current.copyUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="bg-emerald-50 border border-emerald-100 text-emerald-900 px-5 py-3 rounded-xl font-medium hover:bg-emerald-100 transition flex items-center justify-center"
//                 >
//                   {t.copy}
//                 </a>
//               </div>

//               <p className="text-xs text-stone-400 mt-3">
//                 {lang === "en"
//                   ? "Tip: preview works only if the Sheet is published to the web."
//                   : "Подсказка: превью работает только если таблица опубликована в интернет (Publish to web)."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right: inline iframe */}
//         <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
//           <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
//             <div className="text-sm font-medium text-stone-700">{t.inlinePreview}</div>
//             <button
//               onClick={() => setModal({ open: true, title: current.title[lang], url: current.previewEmbedUrl })}
//               className="text-sm text-stone-600 hover:text-stone-900 transition"
//               disabled={!current.previewEmbedUrl || current.previewEmbedUrl.includes("PASTE_")}
//             >
//               {t.expand}
//             </button>
//           </div>

//           <div className="bg-stone-50">
//             {(!current.previewEmbedUrl || current.previewEmbedUrl.includes("PASTE_")) ? (
//               <div className="h-[420px] flex items-center justify-center text-stone-500 text-sm px-6 text-center">
//                 Вставь <span className="font-mono mx-1">previewEmbedUrl</span> (Publish → Embed URL), чтобы увидеть превью.
//               </div>
//             ) : (
//               <iframe
//                 title={`${current.title[lang]} inline preview`}
//                 src={current.previewEmbedUrl}
//                 className="w-full h-[420px]"
//                 frameBorder="0"
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       <PreviewModal
//         open={modal.open}
//         onClose={() => setModal({ open: false, title: "", url: "" })}
//         title={modal.title}
//         embedUrl={modal.url}
//       />
//     </section>
//   );
};

const ProductCard = ({ product, lang, onOpen }) => {
  const t = TRANSLATIONS[lang];
  const currency = t.currency;
  const price = product.price[lang];
  const isFree = price === 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => onOpen(product)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(product);
        }
      }}
      role="button"
      tabIndex={0}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
        <img
          src={product.image}
          alt={product.title[lang]}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
        />
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-stone-900 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide flex items-center shadow-sm">
            <Star size={10} className="mr-1 fill-yellow-400 text-yellow-400" /> {t.bestseller}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 mb-2">
            {product.tags[lang].map((tag, i) => (
              <span key={i} className="text-[10px] uppercase tracking-wider text-stone-400 font-medium border border-stone-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-serif text-lg font-medium text-stone-900 mb-2 leading-snug">
          {product.title[lang]}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <span className={`text-lg font-semibold ${isFree ? 'text-emerald-700' : 'text-stone-900'}`}>
            {isFree ? (lang === 'en' ? 'Free' : 'Бесплатно') : `${currency}${price}`}
          </span>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="bg-stone-100 text-stone-900 px-4 py-2 rounded-full transition duration-300 text-sm font-medium opacity-60 cursor-not-allowed"
            title="Покупка временно недоступна"
          >
            {t.buy}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetailModal = ({ product, lang, onClose }) => {
  const t = TRANSLATIONS[lang];

  if (!product) return null;

  const currency = t.currency;
  const price = product.price[lang];
  const oldPrice = product.oldPrice?.[lang];

  return (
    <div className="fixed inset-0 z-[120]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl overflow-hidden border border-stone-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="font-medium text-stone-900">{product.title[lang]}</div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 transition"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <img src={product.image} alt={product.title[lang]} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags[lang].map((tag, i) => (
                <span key={i} className="text-[10px] uppercase tracking-wider text-stone-400 font-medium border border-stone-100 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-stone-600 leading-relaxed">{product.description[lang]}</p>

            <ul className="mt-6 space-y-2">
              {product.details[lang].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-700">
                  <span className="mt-1 text-emerald-700"><Check size={16} /></span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-end gap-3">
              {oldPrice ? (
                <span className="text-sm text-stone-400 line-through">
                  {currency}{oldPrice}
                </span>
              ) : null}
              <span className="text-2xl font-semibold text-stone-900">
                {currency}{price}
              </span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="bg-stone-900 text-white px-6 py-3 rounded-xl font-medium transition flex items-center justify-center opacity-60 cursor-not-allowed"
                title="Покупка временно недоступна"
              >
                {t.buy}
              </button>
              <button
                onClick={onClose}
                className="bg-white border border-stone-200 text-stone-900 px-6 py-3 rounded-xl font-medium hover:bg-stone-50 transition"
              >
                {lang === "en" ? "Back to shop" : "Назад в магазин"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shop = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <section id="shop" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">{t.shopTitle}</h2>
          <p className="text-stone-500">{t.shopSubtitle}</p>
        </div>

        <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
          {Object.entries(t.filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                filter === key
                  ? 'bg-stone-800 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} lang={lang} onOpen={setSelectedProduct} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProduct ? (
          <ProductDetailModal
            product={selectedProduct}
            lang={lang}
            onClose={() => setSelectedProduct(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};

const LegalPage = ({ title, content, backLabel }) => (
  <div className="min-h-screen bg-stone-50 selection:bg-emerald-200 selection:text-emerald-900 font-sans">
    <div className="max-w-5xl mx-auto px-6 py-10">
      <a href="#top" className="text-sm text-stone-500 hover:text-stone-900 transition">
        {backLabel}
      </a>
      <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mt-4 mb-6">
        {title}
      </h1>
      <div className="bg-white border border-stone-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 text-stone-700 text-sm leading-relaxed whitespace-pre-line">
        {content.map((section) => (
          <div key={section.title || section.body}>
            {section.title ? (
              <div className="text-stone-900 font-semibold mb-2">{section.title}</div>
            ) : null}
            <div>{section.body}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Footer = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 px-6" id="faq">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col">
          <span className="text-2xl font-serif text-stone-100 font-bold">TrackSelf.</span>
          <div className="text-sm font-light mt-3">{t.footer}</div>
          {/* <div className="flex space-x-6 mt-4">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Pinterest</a>
          </div> */}
        </div>

        <div className="text-sm font-light">
          <div className="text-stone-200 font-medium mb-3">{t.legalTitle}</div>
          <div className="space-y-2">
            <div>{t.legalName}</div>
            <div>{t.legalInn}</div>
            <div>{t.legalContact}</div>
          </div>
        </div>

        <div className="text-sm font-light">
          <div className="text-stone-200 font-medium mb-4">{t.documentsTitle}</div>
          <div className="flex flex-col gap-3">
            <a
              href="#offer"
              className="inline-flex items-center justify-center rounded-full border border-stone-600 px-4 py-2 text-sm text-stone-200 hover:text-white hover:border-stone-400 transition"
            >
              {t.offerTitle}
            </a>
            <a
              href="#privacy"
              className="inline-flex items-center justify-center rounded-full border border-stone-600 px-4 py-2 text-sm text-stone-200 hover:text-white hover:border-stone-400 transition"
            >
              {t.privacyTitle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---

export default function App() {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    return window.location.hash === '#offer'
      ? 'offer'
      : window.location.hash === '#privacy'
        ? 'privacy'
        : 'home';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#offer') {
        setPage('offer');
      } else if (window.location.hash === '#privacy') {
        setPage('privacy');
      } else {
        setPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const t = TRANSLATIONS[lang];

  if (page === 'offer') {
    return (
      <LegalPage title={t.offerTitle} content={OFFER_CONTENT[lang]} backLabel={t.backToSite} />
    );
  }

  if (page === 'privacy') {
    return (
      <LegalPage title={t.privacyTitle} content={PRIVACY_CONTENT[lang]} backLabel={t.backToSite} />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-emerald-200 selection:text-emerald-900 font-sans">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Features lang={lang} />
      <TemplatesShowcase lang={lang} />
      <Shop lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

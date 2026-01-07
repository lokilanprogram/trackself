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
    footer: "© 2025 GridFlow. Designed for the organized mind.",
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
  },
  ru: {
    heroTitle: "Структурируй свой хаос.",
    heroSubtitle: "Премиальные шаблоны Google Таблиц для финансов, привычек и жизни. Никаких подписок — доступ навсегда.",
    cta: "Смотреть шаблоны",
    shopTitle: "Коллекция шаблонов",
    shopSubtitle: "Инструменты, созданные для спокойствия и продуктивности.",
    buy: "Купить",
    footer: "© 2025 GridFlow. Дизайн для организованного разума.",
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
  }
};

// FastSpring test storefront base (product page)
const FASTSPRING_TEST_BASE = "https://ryyvo.test.onfastspring.com/";

const PRODUCTS = [
  {
    id: 1,
    category: "planner",
    title: { en: "Daily Tracker", ru: "Дейли Трекер" },
    price: { en: 12, ru: 1200 },
    oldPrice: { en: 18, ru: 1800 },
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
    price: { en: 12, ru: 1200 },
    oldPrice: { en: 18, ru: 1800 },
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
    price: { en: 19, ru: 1900 },
    oldPrice: { en: 24, ru: 2400 },
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
        <a href="#top" className="text-2xl font-serif font-bold tracking-tight text-stone-800">
          GridFlow.
        </a>

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
          >
            <Globe size={14} className="mr-1" />
            {lang.toUpperCase()}
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
  const buyUrl = `${FASTSPRING_TEST_BASE}${product.fastspringPath}`;

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
            <Star size={10} className="mr-1 fill-yellow-400 text-yellow-400" /> Bestseller
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
          <a
            href={buyUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-900 px-4 py-2 rounded-full transition duration-300 text-sm font-medium"
            title={!product.fastspringPath || product.fastspringPath.includes("PASTE_") ? "Вставь fastspringPath" : ""}
          >
            {t.buy}
          </a>
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
  const buyUrl = `${FASTSPRING_TEST_BASE}${product.fastspringPath}`;

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
              <a
                href={buyUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-stone-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-stone-700 transition flex items-center justify-center"
                title={!product.fastspringPath || product.fastspringPath.includes("PASTE_") ? "Вставь fastspringPath" : ""}
              >
                {t.buy}
              </a>
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

const Footer = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 px-6" id="faq">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-2xl font-serif text-stone-100 font-bold">GridFlow.</span>
        </div>
        <div className="text-sm font-light">
          {t.footer}
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">Pinterest</a>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---

export default function App() {
  const [lang, setLang] = useState('en');

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

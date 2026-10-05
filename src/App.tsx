import { useEffect, useRef, useState, type ReactNode } from "react"
import WelcomeNotice from "./WelcomeNotice"
import appleWatchOne from "./assets/products/apple-watch-stage-1.jpg"
import appleWatchTwo from "./assets/products/apple-watch-stage-2.jpg"
import marshallOne from "./assets/products/marshall-stage-1.jpg"
import marshallTwo from "./assets/products/marshall-stage-2.jpg"
import goodGirlOne from "./assets/products/good-girl-stage-1.jpg"
import goodGirlTwo from "./assets/products/good-girl-stage-2.jpg"
import monsterOne from "./assets/products/monster-stage-1.jpg"
import monsterTwo from "./assets/products/monster-stage-3.jpg"
import cameraOne from "./assets/products/papershoot-stage-1.jpg"
import cameraTwo from "./assets/products/papershoot-stage-2.jpg"
import cameraThree from "./assets/products/papershoot-stage-3.jpg"
import cakeOne from "./assets/products/edward-cake-1.jpg"
import cakeTwo from "./assets/products/edward-cake-2.jpg"
import cakeThree from "./assets/products/edward-cake-3.jpg"
import vpnYear from "./assets/products/vpn-year.jpg"
import vaseOne from "./assets/products/vase-stage-1.jpg"
import vaseThree from "./assets/products/vase-stage-3.jpg"
import petReference from "./assets/pet-reference.jpg"
// Replaceable product assets: swap the file to update the card photo
import cultivatorBag from "./assets/products/cultivator-bag.png"
import swingersCap from "./assets/products/swingers-cap.png"
import miniBurgers from "./assets/products/mini-burgers.png"
import embroideryExample from "./assets/products/embroidery-example.png"

type Tone = "lime" | "pink" | "lilac" | "graphite"

type Wish = {
  id: number
  title: string
  description: string
  details: string
  price: string
  tag: string
  note: string
  tone: Tone
  images: string[]
  size?: "wide" | "tall" | "standard"
  specs: string[]
  link?: string
  petMockup?: boolean
  alt?: string
}

const photo = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`

const expensive: Wish[] = [
  {
    id: 1,
    title: "Та самая квартира",
    description:
      "С высокими окнами, светом по утрам и местом для огромного стола.",
    details:
      "Мечта не про квадратные метры, а про своё пространство: тёплое, светлое и с характером. Обязательно много воздуха, уютная кухня и район, где приятно гулять.",
    price: "очень много ₽",
    tag: "большая мечта",
    note: "коплю сама",
    tone: "lilac",
    images: [
      photo("photo-1522708323590-d24dbb6b0267"),
      photo("photo-1596113199003-03babc2bdd2b"),
      photo("photo-1595560006870-71deded44269"),
    ],
    size: "wide",
    specs: [
      "Много естественного света",
      "Отдельная спальня",
      "Балкон — огромный плюс",
    ],
  },
  {
    id: 3,
    title: "MacBook Pro 14″ M5",
    description:
      "Рабочая мечта: быстрый, серебристый и готовый ко всем моим идеям",
    details:
      "MacBook Pro 14″ для дизайна, больших проектов и работы из любимых мест. Именно конфигурация с чипом M5, 16 ГБ объединённой памяти, SSD на 512 ГБ и серебристым корпусом",
    price: "187 580 ₽",
    tag: "для дела",
    note: "именно Silver",
    tone: "pink",
    images: [
      photo("photo-1629131726692-1accd0c53ce0", 1600),
      photo("photo-1611186871348-b1ce696e52c9", 1600),
      photo("photo-1517336714731-489689fd1ca8", 1600),
    ],
    specs: [
      "MacBook Pro 14″, модель 2025 года",
      "Чип Apple M5",
      "10-ядерный CPU",
      "10-ядерный GPU",
      "16 ГБ объединённой памяти",
      "SSD 512 ГБ",
      "Цвет Silver",
      "Артикул MDE44",
    ],
    link: "https://world-devices.ru/noutbuki/macbook/noutbuk-apple-macbook-pro-14-2025-m5-10c-cpu-10c-gpu-16gb-512gb-ssd-silver-mde44",
  },
  {
    id: 4,
    title: "Apple Watch Series 11",
    description:
      "Розовое золото и светлый ремешок — тот редкий случай, когда цвет решает вообще всё",
    details:
      "Apple Watch Series 11 GPS в корпусе 42 мм. Нужна именно версия Rose Gold Aluminium Case с ремешком Light Blush Sport Band",
    price: "30 480 ₽",
    tag: "техника",
    note: "именно эта расцветка",
    tone: "pink",
    images: [appleWatchOne, appleWatchTwo],
    size: "tall",
    specs: [
      "Корпус 42 мм",
      "Rose Gold Aluminium",
      "Ремешок Light Blush",
      "Версия GPS",
    ],
    link: "https://world-devices.ru/umnye-chasy-i-braslety/apple-watch/umnyye-chasy-apple-watch-series-11-gps-42mm-rose-gold-aluminium-case-with-light-blush-sport-band",
  },
]

const medium: Wish[] = [
  {
    id: 5,
    title: "Marshall Major V",
    description: "Чтобы личный саундтрек не заканчивался раньше меня",
    details:
      "Беспроводные накладные наушники Marshall Major V. Нужна именно чёрная версия: складная конструкция, фирменный дизайн и до 100 часов музыки без подзарядки",
    price: "5 960 ₽",
    tag: "музыка",
    note: "именно чёрные",
    tone: "lime",
    images: [marshallOne, marshallTwo],
    size: "wide",
    specs: [
      "Цвет Black",
      "До 100 часов работы",
      "Bluetooth 5.3",
      "Складная конструкция",
    ],
    link: "https://world-devices.ru/naushniki-i-bluetooth-garnitury/naushniki-marshall/besprovodnye-naushniki-marshall-major-v-black-chernye",
  },
  {
    id: 6,
    title: "Good Girl Jasmine Absolute",
    description:
      "Пахнет как человек, который всё контролирует. Даже если это не так",
    details:
      "Good Girl Jasmine Absolute от Carolina Herrera — тёплый жасминовый аромат с чёрной смородиной, миндалём, ириской и бобами тонка",
    price: "от 8 000 ₽",
    tag: "аромат",
    note: "именно Jasmine Absolute",
    tone: "pink",
    images: [
      goodGirlOne,
      goodGirlTwo,
    ],
    specs: [
      "Carolina Herrera",
      "Парфюмированная вода",
      "Жасмин и чёрная смородина",
      "Миндаль, ириска и бобы тонка",
    ],
    link: "https://goldapple.ru/19000468855-good-girl-jasmine-absolute",
  },
  {
    id: 7,
    title: "Сумка Cultivator",
    description:
      "Маленькая сумка, в которую каким-то образом должно поместиться всё",
    details:
      "Кросс-боди Cultivator. Нужна именно модель по ссылке — заменять её просто похожей сумкой не надо",
    price: "цена меняется",
    tag: "стиль",
    note: "именно эта модель",
    tone: "lilac",
    images: [
      cultivatorBag,
    ],
    specs: [
      "Формат кросс-боди",
      "Именно модель по ссылке",
      "Без замены на похожую",
    ],
    link: "https://www.ozon.ru/product/cultivator-sumka-kross-bodi-na-plecho-3930071125/",
  },
  {
    id: 8,
    title: "Кепка Swingers",
    description: "Для образов, в которых всё как будто получилось случайно",
    details: "Кепка Swingers с Avito. Важна именно модель из объявления",
    price: "цена по ссылке",
    tag: "аксессуар",
    note: "именно эта",
    tone: "graphite",
    images: [
      swingersCap,
    ],
    specs: [
      "Модель Swingers",
      "Именно объявление по ссылке",
      "Без замены на похожую",
    ],
    link: "https://www.avito.ru/moskva/odezhda_obuv_aksessuary/kepka_swingers_4710394015",
  },
  {
    id: 9,
    title: "Худи с моим питомцем",
    description: "Самый адекватный способ брать питомца с собой вообще везде",
    details:
      "Худи с индивидуальной вышивкой по фотографии моего питомца. Для вышивки должна использоваться приложенная фотография, а не случайное изображение животного",
    price: "цена зависит от заказа",
    tag: "кастом",
    note: "вышивка по моему фото",
    tone: "pink",
    images: [embroideryExample, petReference],
    specs: [
      "Вышивка по фотографии",
      "Изображение моего питомца",
      "Цвет и размер согласовываются",
      "Без замены на готовый принт",
    ],
    link: "https://m.vk.ru/sorocavoronawear",
  },
  {
    id: 14,
    title: "PaperShoot Vintage 1925",
    description: "Как плёнка, только без проявки и тревоги за каждый кадр",
    details:
      "Тонкая цифровая камера, которая снимает с эффектом плёнки, но сохраняет фотографии на карту памяти. Компактная, простая и достаточно странная, чтобы брать её с собой везде",
    price: "14 240 ₽",
    tag: "творчество",
    note: "именно Vintage 1925",
    tone: "lilac",
    images: [cameraOne, cameraTwo, cameraThree],
    specs: [
      "Модель PaperShoot Vintage 1925",
      "Разрешение 20 МП",
      "Четыре фильтра: цветной, чёрно-белый, сепия и blue",
      "Автоматическая экспозиция",
      "Режимы видео и timelapse",
      "Корпус из каменной бумаги",
      "Карта памяти 8 ГБ в комплекте",
      "Подключение через Type-C",
      "Компактный корпус без экрана",
    ],
    link: "https://market.yandex.ru/card/kompaktnyy-fotoapparat-papershoot-vintage-1925/103195803628?firstOpenOskuId=103218143319&firstOpenOfferId=e2nhRB1beZvwVgT7y7ayiA",
  },
  {
    id: 12,
    title: "Monster Peachy Keen",
    description:
      "Чтобы фраза “осталась последняя баночка” звучала как можно реже",
    details:
      "Целая упаковка персикового Monster Peachy Keen — 24 банки по 0,5 литра. Нужен именно этот вкус и именно розовые банки",
    price: "цена меняется",
    tag: "запас энергии",
    note: "сразу 24",
    tone: "pink",
    images: [monsterOne, monsterTwo],
    size: "wide",
    specs: [
      "Вкус Peachy Keen",
      "Персиковый вкус",
      "Объём одной банки 0,5 л",
      "24 банки в упаковке",
      "Именно розовое оформление банки",
    ],
    link: "https://www.ozon.ru/product/energeticheskiy-napitok-monster-peachy-keen-0-5l-h-24sht-5086641248/",
  },
]

const small: Wish[] = [
  {
    id: 10,
    title: "Цветы без повода",
    description: "Небрежный букет, будто только что с дачи",
    details:
      "Никаких торжественных роз в плёнке — люблю сезонные цветы, зелень, странные веточки и свободную форму",
    price: "до 2 000 ₽",
    tag: "настроение",
    note: "сюрприз",
    tone: "graphite",
    images: [
      photo("photo-1585955463294-a63bdd060e32"),
      photo("photo-1765815430988-9f3889f6d4fa"),
    ],
    specs: [
      "Сезонные цветы",
      "Свободная форма",
      "Без пластиковой упаковки",
      "Палитра может быть любой",
    ],
  },
  {
    id: 13,
    title: "Ваза-сапог",
    description: "Яркий акцент для цветов и просто красивой жизни",
    details:
      "Красная глянцевая ваза высотой 20 см в форме сапога на высокой платформе. Можно поставить цветы, декоративные веточки или оставить её самостоятельным элементом интерьера",
    price: "909 ₽",
    tag: "декор",
    note: "именно красная",
    tone: "pink",
    images: [vaseOne, vaseThree],
    specs: [
      "Высота 20 см",
      "Насыщенный красный цвет",
      "Глянцевая поверхность",
      "Форма сапога на платформе",
      "Подходит для цветов и декоративных веточек",
      "Может использоваться как самостоятельный предмет интерьера",
    ],
    link: "https://modi.ru/catalog/goods/vaza-20-sm_d0710752/",
  },
  {
    id: 15,
    title: "Бенто-торт с Эдвардом",
    description: "И давно мне семнадцать? Достаточно давно, чтобы захотеть этот торт",
    details:
      "Небольшой бенто-торт со светлым кремовым оформлением, чёрными бантами и съедобной картинкой с Эдвардом. Внутри обязательно начинка “Молочный ломтик”",
    price: "цена зависит от кондитера",
    tag: "съедобное",
    note: "начинка Молочный ломтик",
    tone: "lime",
    images: [cakeOne, cakeTwo, cakeThree],
    alt: "Светлый бенто-торт с изображением Эдварда и чёрными бантами",
    specs: [
      "Формат бенто",
      "Светлое кремовое оформление",
      "Чёрные атласные бантики",
      "Съедобная картинка с Эдвардом",
      "Надпись «И давно тебе 17?»",
      "Начинка «Молочный ломтик»",
      "Точный состав начинки согласовывается с кондитером",
    ],
  },
  {
    id: 11,
    title: "Минибургеры",
    description: "Слишком маленькие, чтобы делиться. Очень удобно",
    details:
      "Набор минибургеров или гастробокс с доставкой. Нужен вариант из объявления — маленький, красивый и желательно в количестве побольше",
    price: "цена зависит от набора",
    tag: "съедобное",
    note: "с доставкой",
    tone: "lime",
    images: [
      miniBurgers,
    ],
    specs: [
      "Набор минибургеров",
      "Доставка",
      "Вариант из объявления",
      "Количество побольше",
    ],
    link: "https://www.avito.ru/sankt-peterburg/predlozheniya_uslug/gastroboksy_pirozhki_deserty_s_dostavkoy_3591877247",
  },
  {
    id: 16,
    title: "VPN на год",
    description: "Чтобы интернет снова был просто интернетом",
    details:
      "Годовая подписка на VPN, чтобы интернет снова был просто интернетом. Сервис лучше уточнить у меня",
    price: "зависит от сервиса",
    tag: "подписка",
    note: "на целый год",
    tone: "lilac",
    images: [vpnYear],
    specs: ["Подписка на 12 месяцев", "Сервис лучше уточнить у меня"],
  },
]

function Icon({
  name,
  size = 20,
}: {
  name: "arrow" | "heart" | "moon" | "sun" | "close" | "up" | "spark"
  size?: number
}) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
        <path d="M5 12h14" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    up: <path d="m6 15 6-6 6 6" />,
    spark: (
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  href,
  onClick,
  variant = "dark",
  className = "",
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "dark" | "light" | "pink"
  className?: string
}) {
  const classes = `button button--${variant} ${className}`
  const external = href?.startsWith("http")
  return href ? (
    <a
      className={classes}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  ) : (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

function Tag({ children, tone }: { children: ReactNode; tone: Tone }) {
  return <span className={`tag tag--${tone}`}>{children}</span>
}

function Header({
  dark,
  setDark,
}: {
  dark: boolean
  setDark: (value: boolean) => void
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#top">
        <span className="brand-star">
          <Icon name="spark" size={17} />
        </span>
        ХОЧУ!
      </a>
      <nav className="nav" aria-label="Навигация по категориям">
        <a href="#dreams">Мечты</a>
        <a href="#medium">До 10 000 ₽</a>
        <a href="#small">До 2 000 ₽</a>
      </nav>
      <button
        className="theme-toggle"
        onClick={() => setDark(!dark)}
        aria-label={dark ? "Включить светлую тему" : "Включить тёмную тему"}
      >
        <span>{dark ? "Светло" : "Темно"}</span>
        <Icon name={dark ? "sun" : "moon"} size={18} />
      </button>
    </header>
  )
}

function WishVisual({ wish, modal = false }: { wish: Wish; modal?: boolean }) {
  if (!wish.petMockup) {
    return (
      <img
        className={modal ? "modal-main-image" : undefined}
        src={wish.images[0]}
        alt={wish.alt ?? wish.title}
      />
    )
  }

  return (
    <div
      className={`hoodie-mockup ${modal ? "modal-main-image" : ""}`}
      aria-label="Мокап худи с вышивкой питомца"
    >
      <div className="hoodie-shape">
        <div className="pet-embroidery">
          <img src={petReference} alt="Питомец для вышивки" />
          <span>вышивка по моему фото</span>
        </div>
      </div>
    </div>
  )
}

function WishCard({
  wish,
  cinematic = false,
  onOpen,
}: {
  wish: Wish
  cinematic?: boolean
  onOpen: (wish: Wish) => void
}) {
  return (
    <article
      className={`wish-card ${wish.size ? `wish-card--${wish.size}` : ""} ${
        cinematic ? "wish-card--cinematic" : ""
      }`}
      onClick={() => onOpen(wish)}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        onOpen(wish)
      }}
    >
      <div className="wish-card__media">
        <WishVisual wish={wish} />
        <button
          className="heart-button"
          aria-label={`Добавить «${wish.title}» в любимое`}
          onClick={(event) => event.stopPropagation()}
        >
          <Icon name="heart" size={18} />
        </button>
        <span className="wish-note">{wish.note}</span>
      </div>
      <div className="wish-card__body">
        <div className="wish-card__top">
          <Tag tone={wish.tone}>{wish.tag}</Tag>
          <strong>{wish.price}</strong>
        </div>
        <h3>{wish.title}</h3>
        <p>{wish.description}</p>
        <div className="wish-card__footer">
          <button
            className="text-link"
            onClick={(event) => {
              event.stopPropagation()
              onOpen(wish)
            }}
          >
            Посмотреть <Icon name="arrow" size={17} />
          </button>
          <div className="mini-gallery" aria-hidden="true">
            {wish.images.slice(0, 3).map((image, index) => (
              <img
                key={image}
                src={image}
                alt=""
                className={index === 0 ? "is-active" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function SectionHeading({
  kicker,
  title,
  description,
  light = false,
}: {
  kicker: string
  title: string
  description: string
  light?: boolean
}) {
  return (
    <div
      className={`section-heading reveal ${
        light ? "section-heading--light" : ""
      }`}
    >
      <span className="eyebrow">{kicker}</span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function Modal({ wish, onClose }: { wish: Wish | null; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setActiveImage(0)
    if (!wish) return
    document.body.classList.add("modal-open")
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose()
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [wish, onClose])

  if (!wish) return null
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <Icon name="close" />
        </button>
        <div className="modal-gallery">
          {wish.petMockup && activeImage === 0 ? (
            <WishVisual wish={wish} modal />
          ) : (
            <img
              className="modal-main-image"
              src={wish.images[activeImage]}
              alt={wish.alt ?? wish.title}
            />
          )}
          <div className="modal-thumbs">
            {wish.images.map((image, index) => (
              <button
                key={image}
                className={activeImage === index ? "is-active" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={`Фото ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="modal-content">
          <div>
            <Tag tone={wish.tone}>{wish.tag}</Tag>
            <span className="modal-note">{wish.note}</span>
          </div>
          <h2 id="modal-title">{wish.title}</h2>
          <p>{wish.details}</p>
          <ul>
            {wish.specs.map((spec) => (
              <li key={spec}>
                <Icon name="spark" size={15} />
                {spec}
              </li>
            ))}
          </ul>
          <div className="modal-action">
            <strong>{wish.price}</strong>
            {wish.link && (
              <Button href={wish.link} variant="pink">
                Перейти по ссылке <Icon name="arrow" size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero({ onOpen }: { onOpen: (wish: Wish) => void }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (
        !ref.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return
      const x = (event.clientX / window.innerWidth - 0.5) * 14
      const y = (event.clientY / window.innerHeight - 0.5) * 14
      ref.current.style.setProperty("--mx", `${x}px`)
      ref.current.style.setProperty("--my", `${y}px`)
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-blob hero-blob--one" />
      <div className="hero-blob hero-blob--two" />
      <div className="hero-copy">
        <span className="eyebrow">
          Личный архив желаний <Icon name="spark" size={14} />
        </span>
        <h1>
          Вещи, о которых
          <br />я <em>мечтаю</em>
        </h1>
        <p>От маленьких приятностей до планов размером с квартиру</p>
        <Button href="#dreams">
          Смотреть хотелки <Icon name="arrow" size={18} />
        </Button>
        <span className="hand-note">листай, там красиво!</span>
      </div>
      <div className="hero-collage" aria-label="Избранные желания">
        <button
          className="hero-photo hero-photo--main"
          onClick={() => onOpen(expensive[1])}
        >
          <img src={expensive[1].images[0]} alt="Серебристый MacBook Pro 14″" />
          <span>MacBook Pro</span>
        </button>
        <button
          className="hero-photo hero-photo--small"
          onClick={() => onOpen(small[0])}
        >
          <img src={small[0].images[0]} alt="Цветы" />
        </button>
        <div className="sticker sticker--lime">
          мечтать
          <br />
          не вредно!
        </div>
        <div className="floating-heart">
          <Icon name="heart" size={34} />
        </div>
        <span className="doodle-star">✦</span>
      </div>
      <div className="hero-marquee">
        <div>
          ХОЧУ • ЛЮБЛЮ • МЕЧТАЮ • СОХРАНЯЮ • ХОЧУ • ЛЮБЛЮ • МЕЧТАЮ • СОХРАНЯЮ •
        </div>
      </div>
    </section>
  )
}

function App() {
  const [dark, setDark] = useState(false)
  const [selected, setSelected] = useState<Wish | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        )
      },
      { threshold: 0.08 },
    )
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={dark ? "app dark" : "app"}>
      <Header dark={dark} setDark={setDark} />
      <main>
        <Hero onOpen={setSelected} />
        <section className="dream-section" id="dreams">
          <div className="section-shell">
            <SectionHeading
              kicker="01 / Мечты без лимита"
              title="Экстремально дорого"
              description="Большие мечты — в основном для вдохновения и мотивации"
              light
            />
            <div className="dream-grid reveal">
              {expensive.map((wish) => (
                <WishCard
                  key={wish.id}
                  wish={wish}
                  cinematic
                  onOpen={setSelected}
                />
              ))}
            </div>
          </div>
          <span className="orbit-copy">а вдруг? — а вдруг? — а вдруг?</span>
        </section>

        <section
          className="catalog-section catalog-section--medium"
          id="medium"
        >
          <div className="section-shell">
            <SectionHeading
              kicker="02 / Уже ближе"
              title="Средние хотелки"
              description="Подарки примерно до 10 000 ₽"
            />
            <div className="bento-grid reveal">
              {medium.map((wish) => (
                <WishCard key={wish.id} wish={wish} onOpen={setSelected} />
              ))}
            </div>
          </div>
        </section>

        <section className="catalog-section catalog-section--small" id="small">
          <div className="section-shell">
            <SectionHeading
              kicker="03 / Просто порадовать"
              title="Маленькие радости"
              description="Подарки примерно до 2 000 ₽"
            />
            <div className="small-grid reveal">
              {small.map((wish) => (
                <WishCard key={wish.id} wish={wish} onOpen={setSelected} />
              ))}
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="gift-illustration" aria-hidden="true">
            <span className="gift-lid" />
            <span className="gift-box" />
            <span className="gift-bow">⌁</span>
            <i>✦</i>
          </div>
          <span className="eyebrow">И это самое важное</span>
          <h2>
            Подарок — совсем
            <br />
            не главное <span>♥</span>
          </h2>
          <p>
            Мне уже очень приятно, что вы сюда заглянули и решили посмотреть,
            что мне нравится. Выбирать что-то из списка совсем не обязательно 💗
          </p>
          <Button href="#top" variant="light">
            Наверх <Icon name="up" size={18} />
          </Button>
        </section>
      </main>
      <footer>
        <span>Сделано с мечтами</span>
        <span>2025 · мой вишлист</span>
      </footer>
      <Modal wish={selected} onClose={() => setSelected(null)} />
      <WelcomeNotice />
      <div className="cursor-dot" aria-hidden="true" />
    </div>
  )
}

export default App

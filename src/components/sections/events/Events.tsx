"use client";

import Image from "next/image";
import { useEffect, useState, useId, useRef, useMemo } from "react";
import "./style.scss";
import Modal from "@/components/ui/Modal/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useReducedMotion, motion, AnimatePresence, Variants } from "framer-motion";
import { Fade, Lift, Stagger, StaggerItem } from "@/components/ui/Motion";
import Bron from "@/components/ui/Bron/Bron";

const events = [
  {
    title: "Свадьбы",
    img: "/img/events/svadb.jpg",
    alt: "Организация свадьб",
    href: "https://t.me/Burzyi_bot",
    gall: ["/img/events/svadb.jpg", "/img/events/svadb-3.jpg"],
    area: "a",
    text: "Планируете незабываемое торжество в красивой обстановке? <br>Вместительность зала позволяет создать уютную и праздничную атмосферу для близких и друзей.<br>Интерьер выполнен в элегантном стиле с милыми деталями, мягким освещением и изысканной мебелью, создавая идеальное пространство для торжественных моментов и фотосессий.<br>Мы предоставляем все необходимое для проведения счастливого дня: уютные заловые пространства, современное оборудование, возможность оформления по вашему желанию, а также профессиональную организацию и сопровождение.<br>Создайте свою сказку вместе с нами — мы сделаем всё, чтобы ваш особенный день прошёл идеально!",
  },
  {
    title: "Юбилеи",
    img: "/img/events/yub.jpg",
    alt: "Организация юбилеев",
    href: "https://t.me/Burzyi_bot",
    gall: ["/img/events/yub.jpg", "/img/events/yub-2.jpg", "/img/events/yub-3.jpg", "/img/events/yub-4.jpg"],
    area: "b",
    text: "Планируете незабываемое торжество в красивой обстановке? <br>Вместительность зала позволяет создать уютную и праздничную атмосферу для близких и друзей.<br>Интерьер выполнен в элегантном стиле с милыми деталями, мягким освещением и изысканной мебелью, создавая идеальное пространство для торжественных моментов и фотосессий.<br>Мы предоставляем все необходимое для проведения счастливого дня: уютные заловые пространства, современное оборудование, возможность оформления по вашему желанию, а также профессиональную организацию и сопровождение.<br>Создайте свою сказку вместе с нами — мы сделаем всё, чтобы ваш особенный день прошёл идеально!",
  },
  {
    title: "Корпоративы",
    img: "/img/events/korp.jpg",
    alt: "Организация корпоративов",
    href: "https://t.me/Burzyi_bot",
    gall: ["/img/events/korp.jpg", "/img/events/korp-2.jpg", "/img/events/korp-3.jpg", "/img/events/korp-4.jpg"],
    area: "c",
    text: "Планируете незабываемое торжество в красивой обстановке? <br>Вместительность зала позволяет создать уютную и праздничную атмосферу для близких и друзей.<br>Интерьер выполнен в элегантном стиле с милыми деталями, мягким освещением и изысканной мебелью, создавая идеальное пространство для торжественных моментов и фотосессий.<br>Мы предоставляем все необходимое для проведения счастливого дня: уютные заловые пространства, современное оборудование, возможность оформления по вашему желанию, а также профессиональную организацию и сопровождение.<br>Создайте свою сказку вместе с нами — мы сделаем всё, чтобы ваш особенный день прошёл идеально!",
  },
  {
    title: "Дни рождения",
    img: "/img/events/dr.jpg",
    alt: "Организация Дней рождений",
    href: "https://t.me/Burzyi_bot",
    gall: ["/img/events/dr.jpg", "/img/events/dr-2.jpg", "/img/events/dr-3.jpg", "/img/events/dr-4.jpg"],
    area: "d",
    text: "Планируете незабываемое торжество в красивой обстановке? <br>Вместительность зала позволяет создать уютную и праздничную атмосферу для близких и друзей.<br>Интерьер выполнен в элегантном стиле с милыми деталями, мягким освещением и изысканной мебелью, создавая идеальное пространство для торжественных моментов и фотосессий.<br>Мы предоставляем все необходимое для проведения счастливого дня: уютные заловые пространства, современное оборудование, возможность оформления по вашему желанию, а также профессиональную организацию и сопровождение.<br>Создайте свою сказку вместе с нами — мы сделаем всё, чтобы ваш особенный день прошёл идеально!",
  },
  {
    title: "Банкеты",
    img: "/img/events/banket.jpg",
    alt: "Организация банкетов",
    gall: ["/img/events/banket.jpg", "/img/events/banket-2.jpg", "/img/events/banket-3.jpg", "/img/events/banket-4.jpg"],
    href: "https://t.me/Burzyi_bot",
    area: "e",
    text: "Планируете незабываемое торжество в красивой обстановке? <br>Вместительность зала позволяет создать уютную и праздничную атмосферу для близких и друзей.<br>Интерьер выполнен в элегантном стиле с милыми деталями, мягким освещением и изысканной мебелью, создавая идеальное пространство для торжественных моментов и фотосессий.<br>Мы предоставляем все необходимое для проведения счастливого дня: уютные заловые пространства, современное оборудование, возможность оформления по вашему желанию, а также профессиональную организацию и сопровождение.<br>Создайте свою сказку вместе с нами — мы сделаем всё, чтобы ваш особенный день прошёл идеально!",
  },
];

// Условия для ресторана "Буржуй"
const burzhuyConditions = [
  {
    title: "Минимальная сумма заказа на одну персону — не менее 2 500 ₽",
    text: "На данную сумму Заказчик набирает блюда по предложенному меню (к примеру: салат, закуски, 2 горячих блюда). Если будет нужна помощь в выборе меню либо дополнительные блюда, которые не представлены в меню — всё это обсуждается отдельно по вашему желанию с зав. производством.",
  },
  {
    title: "При заказе банкета менее 30 человек — депозит зала составляет 85 000 ₽",
  },
  {
    title: "Разрешено приносить",
    text: "Дополнительно разрешается приносить: вино-водочные изделия, соки, воды, так же по вашему желанию продукты для мясной, рыбной, овощной нарезки, фрукты, сладости для чайного стола. Кол-во необходимых продуктов и напитков обсуждается так же с зав. производством. За работу поварам, которые нарежут и украсят ваши блюда, необходима дополнительная оплата — 100 ₽ за одну тарелку одного вида нарезки.",
  },
  {
    title: "Принадлежности для сбора продуктов и напитков",
    text: "Не забывайте привозить принадлежности для сбора продуктов и напитков, которые останутся после торжества: контейнеры, боксы, пакеты.",
  },
  {
    title: "Дополнительные продукты",
    text: "Дополнительные продукты, привозимые Заказчиком, необходимо доставить в ресторан в предыдущий день до торжества до 15:00.",
  },
  {
    title: "Завозить продукты необходимо в разгрузочную зону ресторана",
    text: "В конце здания напротив магазина «Гулливер», предварительно позвонив по телефону 27-10-27, чтобы вас встречали.",
  },
  {
    title: "В подарок заведение для вас наряжает зал",
    text: "Белые чехлы на стулья с белыми бантами, белые скатерти до пола на столах, имеются большие вазы с букетами из белых веток, так же белыми ветками с хрусталем декорирован потолок",
  },
  {
    title: "Фотозона",
    text: "Оформление фотозоны, а так же зоны для жениха и невесты оплачивается отдельно, и всё согласовывается по вашему желанию с оформителем ресторана — Светланой: 8-906-391-17-96",
  },
  {
    title: "Дополнительная техника",
    text: "В зале имеется видеопроектор, который демонстрирует видео по всему залу, на всех экранах телевизоров, так же имеется профессиональный свет для дискотеки — все это заведение предоставляет вам бесплатно. По вашему желанию вы выбираете ведущих для своего торжества, они работают в нашем зале со своей звуковой аппаратурой",
  },
  {
    title: "Предоплата",
    text: "При заключении договора необходима предоплата в размере не менее 10 000 ₽ (при себе иметь паспорт)",
  },
  {
    title: "Расчет",
    text: "Окончательный расчет — за 10 дней до мероприятия",
  },
  {
    title: "Подтверждение гостей и рассадка",
    text: "За 3 дня до мероприятия — окончательное утверждение количества гостей, их рассадки за столами",
  },
  {
    title: "Время на мероприятие",
    text: "Отведено — 5 часов, устанавливается по желанию заказчика (например: с 17:00 до 22:00) + за пятым часом предоставляется время для сбора и отправки гостей по домам. Если заказчик желает продлить торжество, то следующий час за пятым часом оплачивается дополнительно — 5 000 ₽ за 1 час. Всё это решается с администрацией заведения на месте в конце торжества, и после этого так же время на сборы",
  },
  {
    title: "Бой посуды",
    text: "По окончанию банкета представитель администрации вместе со старшим официантом, при наличии боя посуды, предоставляет заказчику разбитую посуду, которую заказчик оплачивает согласно конфликт-меню, либо это оплачивает виновник боя посуды",
  },
];

// Условия для кафе "Деканат"
const dekanatConditions = [
  {
    title: "Минимальная сумма заказа на одну персону — не менее 2 500 ₽",
    text: "На данную сумму Заказчик выбирает блюда по предложенному меню (к примеру: салат, закуски, 2 горячих блюда). Если будет нужна помощь в выборе меню, либо дополнительные блюда, которые не представлены в меню, всё это обсуждается отдельно по вашему желанию с зав. производством.",
  },
  {
    title: "При заказе банкета менее 20 человек — депозит зала — 50 000 ₽",
  },
  {
    title: "Разрешено приносить",
    text: "Дополнительно разрешается приносить: вино-водочные изделия, соки, воды, так же по вашему желанию продукты для мясной, рыбной, овощной нарезки, фрукты, сладости для чайного стола. Кол-во необходимых продуктов и напитков обсуждается так же с заведующей производством. За работу поварам, которые нарежут и украсят ваши блюда, необходима дополнительная оплата: 100 ₽ за одну тарелку одного вида нарезки.",
  },
  {
    title: "Принадлежности для сбора продуктов",
    text: "Не забывайте привозить принадлежности для сбора продуктов, остающихся после торжества: контейнеры, боксы, пакеты.",
  },
  {
    title: "Дополнительные продукты",
    text: "Дополнительные продукты, привозимые Заказчиком, необходимо доставить в кафе в предыдущий день до торжества до 15 часов.",
  },
  {
    title: "Завозить продукты необходимо в разгрузочную зону кафе",
    text: "В конце нашего здания по ул. Пушкинской, напротив магазина Гулливер, предварительно позвонив по телефону +7 908 479 62 62, чтобы вас встречали.",
  },
  {
    title: "В подарок заведение для вас наряжает зал",
    text: "Белые чехлы на стулья с белыми бантами, белые скатерти до пола на столах.",
  },
  {
    title: "Оформление",
    text: "Оформление зоны для жениха и невесты оплачивается отдельно и всё согласовывается по вашему желанию с оформителем ресторана.",
  },
  {
    title: "Дополнительная техника",
    text: "В зале имеется видео проектор, экран, звук, свет — это всё заведение предоставляет вам безвозмездно. По вашему желанию вы выбираете ведущих для своего торжества, они могут воспользоваться нашей аппаратурой, либо устанавливать свою.",
  },
  {
    title: "Предоплата",
    text: "При заключении договора необходима предоплата в размере не менее 10 000 ₽ (при себе иметь паспорт).",
  },
  {
    title: "Расчет",
    text: "Окончательный расчёт — за 10 дней до мероприятия.",
  },
  {
    title: "Время на мероприятие",
    text: "Время отведенное на мероприятие — 5 часов, устанавливается по желанию заказчика (например: с 17.00 до 22.00) + за пятым часом предоставляется вам время для сбора и отправки гостей по домам. Если заказчик желает продлить торжество, то следующий час, за пятым часом, оплачивается дополнительно — 5 000 ₽ за 1 час, всё это решается с администрацией заведения на месте, в конце торжества и после этого так же + время на сборы.",
  },
  {
    title: "Бой посуды",
    text: "По окончанию банкета так же представитель администрации вместе со старшим официантом, при наличии боя посуды, предоставляет заказчику разбитую посуду, которую заказчик оплачивает согласно конфликт-меню, либо это оплачивает виновник боя посуды.",
  },
  {
    title: "Подтверждение гостей и рассадка",
    text: "За 3 дня до мероприятия — окончательное утверждение количества гостей и их рассадка по столам (кол-во гостей за каждым столом).",
  },
];

// Тип для таба
type ConditionsVenue = "burzhuy" | "dekanat";

interface VenueTab {
  id: ConditionsVenue;
  label: string;
  title: string;
  conditions: typeof burzhuyConditions;
}

const venueTabs: VenueTab[] = [
  {
    id: "burzhuy",
    label: "Буржуй",
    title: "УСЛОВИЯ ПРОВЕДЕНИЯ ТОРЖЕСТВА В РЕСТОРАНЕ «БУРЖУЙ»",
    conditions: burzhuyConditions,
  },
  {
    id: "dekanat",
    label: "Деканат",
    title: "УСЛОВИЯ ПРОВЕДЕНИЯ ТОРЖЕСТВА В КАФЕ «ДЕКАНАТ»",
    conditions: dekanatConditions,
  },
];

// Компонент попапа условий с табами (аналогично первому примеру)
function ConditionsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const [activeId, setActiveId] = useState<ConditionsVenue>("burzhuy");
  const activeVenue = useMemo(
    () => venueTabs.find((v) => v.id === activeId) ?? venueTabs[0],
    [activeId]
  );

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    setTimeout(() => panelRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const backdrop = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const panel: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
    exit: reduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 10,
          scale: 0.99,
          filter: "blur(8px)",
          transition: { duration: 0.25 },
        },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="eventsPop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          variants={backdrop}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div
            className="eventsPop__panel conditionsPop__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={panelRef}
            tabIndex={-1}
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* TOP BAR с табами */}
            <div className="conditionsPop__top">
              <div className="conditionsPop__tabs" role="tablist" aria-label="Выбор заведения">
                {venueTabs.map((venue) => {
                  const checked = venue.id === activeId;
                  return (
                    <motion.button
                      key={venue.id}
                      type="button"
                      className={`conditionsPop__tab ${checked ? "is-active" : ""}`}
                      onClick={() => setActiveId(venue.id)}
                      role="tab"
                      aria-selected={checked}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`conditionsPop__radio ${checked ? "is-on" : ""}`} />
                      <span className="conditionsPop__tabText">{venue.label}</span>
                      {checked && (
                        <motion.span
                          className="conditionsPop__tabGlow"
                          layoutId="conditionsTabGlow"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <button
                className="eventsPop__close conditionsPop__close"
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            {/* BODY с условиями */}
            <div className="eventsPop__body conditionsPop__body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVenue.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="eventsPop__title conditionsPop__mainTitle" id={titleId}>
                    {activeVenue.title}
                  </h3>

                  <div className="conditionsPop__list">
                    {activeVenue.conditions.map((item, idx) => (
                      <motion.div
                        className="eventsPop__row conditionsPop__row"
                        key={idx}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.02 * idx,
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div className="eventsPop__num">{idx + 1}.</div>
                        <div className="eventsPop__content">
                          <div className="eventsPop__rowTitle">{item.title}</div>
                          {item.text && (
                            <div className="eventsPop__rowText">{item.text}</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="eventsPop__foot conditionsPop__foot">
              <div className="eventsPop__contact">
                <a className="eventsPop__phone" href="tel:+79084796262">
                  +7 (908) 479-62-62
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Events() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveEvent, setIsActiveEvent] = useState<{
    title: string;
    img: string;
    alt: string;
    href: string;
    gall: string[];
    area: string;
    text: string;
  }>({ title: "", img: "", alt: "", href: "", gall: [], area: "", text: "" });

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsActiveEvent({ title: "", img: "", alt: "", href: "", gall: [], area: "", text: "" });
      }
    };

    const anyModalOpen = isOpen || !!isActiveEvent.title;

    if (anyModalOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, isActiveEvent.title]);

  const openEvent = (ev: any) => {
    setIsActiveEvent(ev);
  };

  const closeEvent = () => {
    setIsActiveEvent({ title: "", img: "", alt: "", href: "", gall: [], area: "", text: "" });
  };

  const item = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="events sect">
      <div className="container">
        <Lift>
          <h2 className="h2">Мероприятия</h2>
        </Lift>

        <Stagger delay={0.06} stagger={0.06} className="events_grid" once amount={0.25}>
          {events.map((ev) => (
            <motion.article
              key={ev.title}
              variants={item}
              className={`events_card area-${ev.area}`}
              onClick={() => openEvent(ev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openEvent(ev)}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="events_media">
                <Image
                  src={ev.img}
                  alt={ev.alt}
                  fill
                  sizes="(max-width: 420px) 92vw, (max-width: 1024px) 94vw, 1200px"
                  priority={ev.area === "a"}
                />
              </div>

              <div className="events_overlay" />

              <div className="events_info">
                <h3 className="events_title">{ev.title}</h3>
                <p className="events_btn">Узнать подробнее</p>
              </div>
            </motion.article>
          ))}
        </Stagger>

        <Fade delay={0.08}>
          <div className="evetnMenu flex items-center mt-12 gap-15">
            <Bron text="Выбрать мероприятие"/>
          

            <p
              className="link"
              role="button"
              tabIndex={0}
              onClick={() => setIsOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
            >
              Условия проведения
            </p>
          </div>
        </Fade>
      </div>

      {/* POPUP события */}
      <AnimatePresence>
        {!!isActiveEvent.title && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal
              header={
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  pagination={{ clickable: true }}
                  className="eventPop__swiper"
                >
                  {(isActiveEvent.gall || []).map((src, i) => (
                    <SwiperSlide key={`${src}-${i}`}>
                      <div className="eventPop__slide">
                        <Image src={src} alt={`${isActiveEvent.title} фото ${i + 1}`} fill />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              }
              onClose={closeEvent}
              isActive={!!isActiveEvent.title}
            >
              <h3 className="eventPop_title mb-2">{isActiveEvent.title}</h3>
              <p className="eventPop_count mb-4">Вместительность от 50 до 100 гостей</p>
              <p className="modal_text" dangerouslySetInnerHTML={{ __html: isActiveEvent.text }} />
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP условий с табами */}
      <ConditionsModal open={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
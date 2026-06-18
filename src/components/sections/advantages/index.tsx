"use client";

import "./style.scss";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useReducedMotion, motion, Variants } from "framer-motion";
import { Fade, Lift, Stagger } from "@/components/ui/Motion";

const advantages = [
  {
    title: "СОВРЕМЕННЫЙ ЗАЛ",
    text: "Стильное пространство с торжественной атмосферой, идеально подходящее для любого мероприятия",
    icon: "/icons/adv-1.png", 
  },
  {
    title: "ИЗЫСКАННАЯ КУХНЯ",
    text: "Наше меню с авторскими и классическими блюдами, которые восхитят даже самых притязательных гостей",
    icon: "/icons/adv-2.png",
  },
  {
    title: "ДЕМОКРАТИЧНЫЕ ЦЕНЫ",
    text: "Мы предлагаем высокое качество еды и сервиса, сохраняя при этом приемлемый и прозрачный уровень цен",
    icon: "/icons/adv-3.png",
  },
  {
    title: "МОЖНО СВОЙ АЛКОГОЛЬ",
    text: "Мы с пониманием относимся к вашим пожеланиям и разрешаем принести свой алкоголь и напитки, что позволяет значительно сэкономить",
    icon: "/icons/adv-4.png",
  },
  {
    title: "БОГАТЫЕ НАРЕЗКИ",
    text: "Разрешаем приносить продукты для нарезок, а наши профессиональные повара превратят их в композиции, которые украсят ваш стол",
    icon: "/icons/adv-5.png",
  },
  {
    title: "ОБУЧЕНЫЙ ПЕРСОНАЛ",
    text: "Внимательные и вежливые официанты и компетентный управляющий, которые обеспечат безупречное проведение вашего праздника",
    icon: "/icons/adv-6.png",
  },
];

const slides = [
  { src: "/img/adv/4.jpg", alt: "Интерьер 4" },

  { src: "/img/adv/1.jpg", alt: "Интерьер 1" },
  { src: "/img/adv/2.jpg", alt: "Интерьер 2" },
  { src: "/img/adv/3.jpg", alt: "Интерьер 3" },
  { src: "/img/adv/5.jpg", alt: "Интерьер 5" },
  { src: "/img/adv/6.jpg", alt: "Интерьер 6" },
  { src: "/img/adv/7.jpg", alt: "Интерьер 7" },
];

export default function Advantages() {
  const reduceMotion = useReducedMotion();

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

  return (
    <section className="advantages">
      <div className="container">
        <Lift>
          <div className="advantages__head">
            <h2 className="h2">Преимущества</h2>
          </div>
        </Lift>

        {/* GRID — каскадно */}
        <Stagger delay={0.06} stagger={0.18} className="advantages__grid" once amount={0.25}>
          {advantages.map((item) => (
            <motion.div
              key={item.title}
              className="advantages__card"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="advantages__icon"
                whileHover={reduceMotion ? undefined : { rotate: -2, scale: 1.03 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={item.icon} alt="" width={72} height={72} priority={false} />
              </motion.div>

              <h3 className="advantages__title">{item.title}</h3>
              <p className="advantages__text">{item.text}</p>
            </motion.div>
          ))}
        </Stagger>

        {/* SLIDER — мягкое появление */}
        <Fade delay={0.08} className="advantages__slider">
          <Swiper
            modules={[Pagination, A11y]}
            slidesPerView={1}
            loop
            speed={600}
            pagination={{ clickable: true }}
            className="advantagesSwiper"
          >
            {slides.map((s) => (
              <SwiperSlide key={s.src}>
                <div className="advantages__slide">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="advantages__slideImg"
                    priority={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Fade>
      </div>
    </section>
  );
}

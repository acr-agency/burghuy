"use client";

import { SetStateAction, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import "./style.scss";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { Lift, Stagger } from "@/components/ui/Motion";

export default function Menu() {
  const reduceMotion = useReducedMotion();

  const menuData = useMemo(
    () => [
      {
        key: "hot",
        tileClass: "tile tile--big",
        title: "Горячие блюда",
        image: "/img/menu/hot.png",
        rows: [
          {
            name: "Говяжий язык, запечённый с грибами и сыром",
            out: "100/50г.",
            price: "720руб.",
          },
          {
            name: "Говядина во фруктовом кисло-сладком соусе",
            out: "100/50г.",
            price: "680руб.",
          },
          {
            name: "Эскалоп запеченный с сыром и свежими томатами",
            out: "100/50г.",
            price: "580руб.",
          },
          {
            name: "Свиная вырезка с белыми грибами в сливочном соусе",
            out: "100/50г.",
            price: "580руб.",
          },
          {
            name: "Вырезка фаршированная вялеными томатами и маслинами с пикантным соусом",
            out: "100/50",
            price: "620руб.",
          },
          {
            name: "Фаршированное вялеными томатами, грибами и зеленью мясо птицы",
            out: "100/50г.",
            price: "550руб.",
          },
          {
            name: "Сочные куриные рулетики запеченные с сыром и овощами",
            out: "100/50",
            price: "580руб.",
          },
          {
            name: "Стейк из свинины с острым соусом и свежими овощами",
            out: "150/50",
            price: "580руб.",
          },
          {
            name: "Говядина запеченная по-французски с маринованным луком и соусом",
            out: "100/50г.",
            price: "680руб.",
          },
          {
            name: "Филе горбуши запеченное под сочной шубкой из сыра с заправкой",
            out: "100/50г.",
            price: "560руб.",
          },
          {
            name: "Треска в сливочном соусе на подушке из булгура с овощами",
            out: "100/100/30",
            price: "680руб.",
          },
          {
            name: "Филе судака в сливочно–ореховом соусе с кедровыми орешками",
            out: "100/50г.",
            price: "620руб.",
          },
          {
            name: "Форель с томлёными овощами, запечённая в сливочном соусе",
            out: "200г.",
            price: "590руб.",
          },
          {
            name: "Жаркое из мяса говядины с печеными овощами в горшочках",
            out: "300г.",
            price: "640руб.",
          },
          {
            name: "Шашлык из свинины со свежими овощами, маринованным луком, зеленью и соусом",
            out: "150/100",
            price: "640руб.",
          },
        ],
      },
      {
        key: "salads",
        tileClass: "tile tile--sm tile--salads",
        title: "Салаты",
        image: "/img/menu/salads.png",
        rows: [
          {
            name: "«ЦЕЗАРЬ» маринованное мясо птицы, помидор черри, пармезан, салат романно, соус цезарь, чесночные сухарики",
            out: "215г.",
            price: "520руб.",
          },
          {
            name: "«ЦЕЗАРЬ» со сл./соленой форелью, салат микс, помидор черри, пармезан, соус цезарь, гренки",
            out: "215г.",
            price: "690руб.",
          },
          {
            name: "«ГУРМАН» мясная вырезка, перец сладкий, салат микс, горчичная заправка",
            out: "215г.",
            price: "530руб.",
          },
          {
            name: "«ЭЛИТНЫЙ» мясная вырезка, отварной язык, огурец, сладкий перец, пекинская капуста, крем бальзамический",
            out: "215г.",
            price: "590руб.",
          },
          {
            name: "«ЗАБАВА» отварное мясо говядины, свекла, морковча, капуста, чипсы, майонезная заправка",
            out: "215г.",
            price: "650руб.",
          },
          {
            name: "«ПРАЗДНИЧНЫЙ» маринованное мясо птицы, вяленые томаты, сыр Пармезан, острая заправка",
            out: "215г.",
            price: "530руб.",
          },
          {
            name: "«ГУАКАМОЛЕ» свежие томаты, красный лук, авокадо, кинза, вяленые томаты, сыр Фета, лайм",
            out: "215г.",
            price: "550руб.",
          },
          {
            name: "«ЭКЗОТИКА» мясо птицы, грейпфрут, салат микс, арахис, салатная заправка с соком грейпфрута",
            out: "215г.",
            price: "550руб.",
          },
        ],
      },
      {
        key: "hotSnacks",
        tileClass: "tile tile--sm tile--hot-snacks",
        title: "Горячие закуски",
        image: "/img/menu/hot-snacks.png",
        rows: [
          {
            name: "Грибной жульен с мясом птицы, запечённый с сыром",
            out: "130г.",
            price: "290руб.",
          },
          {
            name: "Грибной жульен с языком из говядины, запечённый с сыром",
            out: "130г.",
            price: "390руб.",
          },
          {
            name: "«ГРАТЕН» запеченные овощи с беконом в сливочном соусе",
            out: "200г.",
            price: "350руб.",
          },
          {
            name: "Утиная грудка с брусничным соусом и райскими яблочками на подушке из рукколы",
            out: "50/50",
            price: "540руб.",
          },
          {
            name: "Семга с овощным рататуем и соусом Песто",
            out: "75/50",
            price: "680руб.",
          },
          {
            name: "«КУЛАЦКОЕ ПОДВОРЬЕ» овощи запеченные: баклажаны, кабачки, сладкий перец, помидор, морковь, лук (блюдо)",
            out: "1600г.",
            price: "2400руб.",
          },
        ],
      },
      {
        key: "coldSnacks",
        tileClass: "tile tile--sm tile--cold-snacks",
        title: "Холодные закуски",
        image: "/img/menu/cold-snacks.png",
        rows: [
          {
            name: "Розочки из форели с маскарпоне на пышной булочке",
            out: "50г.",
            price: "250руб.",
          },
          { name: "Бутерброд с красной икрой", out: "50г.", price: "280руб." },
          {
            name: "Рулетики из баклажан с острой закусочкой",
            out: "75г.",
            price: "210руб.",
          },
          {
            name: "Грибочки фаршированные беконом, запечённые с сыром",
            out: "50г.",
            price: "210руб.",
          },
          {
            name: "Цукини с обжаренным беконом, томлёным сладким перцем, свежим помидором черри на тосте",
            out: "50г.",
            price: "220руб.",
          },
          {
            name: "Мясной медальон на салатной подушке с коктейльной вишней",
            out: "75г.",
            price: "200руб.",
          },
          {
            name: "Канапе из утиной грудки с райскими яблочками",
            out: "50г.",
            price: "250руб.",
          },
          {
            name: "Канапе из маринованного мяса птицы, сыра, помидора черри и листа салата",
            out: "50г.",
            price: "100руб.",
          },
          {
            name: "Обжаренное филе горбуши в тесте кляр",
            out: "75г.",
            price: "220руб.",
          },
          { name: "Заливное из мяса говядины", out: "50/75", price: "350руб." },
          {
            name: "Заливное из языка говядины",
            out: "50/75",
            price: "420руб.",
          },
          {
            name: "Шашлычок из рыбы на деревянной шпажке с лимоном и оливкой",
            out: "50/20",
            price: "270руб.",
          },
          {
            name: "Шашлычок из мяса птицы с помидором черри и зеленью",
            out: "50/20",
            price: "130руб.",
          },
          {
            name: "Закуска из баклажан, свежих томатов и зелени под сырной шубой",
            out: "50г.",
            price: "220руб.",
          },
          {
            name: "Сельдь с дымком и картофелем гриль, лучком и зеленью",
            out: "100г.",
            price: "160руб.",
          },
          {
            name: "Блинные мешочки с икрой лосося и Маскарпоне",
            out: "50г.",
            price: "280руб.",
          },
          {
            name: "Блинные мешочки с лососем и Макарпоне",
            out: "50г.",
            price: "200руб.",
          },
          {
            name: "Брускетта с подкопченным лососем, вялеными томатами и маслинами",
            out: "50г.",
            price: "290руб.",
          },
          {
            name: "Брускетта с королевской креветкой, пастой из кальмаров и розовым перцем",
            out: "50г.",
            price: "280руб.",
          },
          {
            name: "Брускетта со шпротами, соусом Релиш и перепелиным яйцом",
            out: "50г.",
            price: "180руб.",
          },
          {
            name: "Брускетта с мясом птицы, персиком и брусничным соусом",
            out: "50г.",
            price: "250руб.",
          },
          {
            name: "Брускетта с беконом, творожным сыром и помидором черри",
            out: "50г.",
            price: "250руб.",
          },
        ],
      },
      {
        key: "sides",
        tileClass: "tile tile--sm tile--sides",
        title: "Гарниры",
        image: "/img/menu/sides.png",
        rows: [
          {
            name: "Картофель отварной с зеленью",
            out: "150г.",
            price: "100руб.",
          },
          {
            name: "Запечённый картофель с прованскими травами, специями и заправкой",
            out: "150г.",
            price: "100руб.",
          },
          { name: "Рис отварной", out: "150г.", price: "100руб." },
          { name: "Рис с овощами", out: "150г.", price: "100руб." },
          { name: "Булгур с овощами", out: "150г.", price: "120руб." },
          {
            name: "Картофель «Бэби» обжаренный на сливочном масле с зернами горчицы и кориандром",
            out: "150г.",
            price: "120руб.",
          },
          {
            name: "Картофельное пюре со сливочным маслом и зеленью",
            out: "150г.",
            price: "100руб.",
          },
        ],
      },
    ],
    [],
  );

  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const activeCategory = useMemo(
    () => menuData.find((x) => x.key === activeKey),
    [menuData, activeKey],
  );

  const openModal = (key: string) => {
    setActiveKey(key);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    // key можно оставить (чтобы не мигало) — но обычно очищают:
    // setActiveKey(null);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: { key: string }) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("no-scroll");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("no-scroll");
    };
  }, [open]);
const easeSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tileVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeSoft,
      delay: 0.06 + i * 0.08, // “волна”
    },
  }),
};

  // модалка
  const backdrop = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  };

  const panel = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, scale: 0.985, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1 }
      : {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      },
    exit: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 10, scale: 0.99, filter: "blur(8px)", transition: { duration: 0.22 } },
  };
  return (
    <section className="menu sect">
      <div className="container">
        <Lift>
          <h2 className="h2">Меню</h2>
        </Lift>

        {/* ВАЖНО: Stagger оборачивает grid, но плитки остаются прямыми детьми grid */}
        <Stagger delay={0.06} stagger={0.12} className="menu_content" once amount={0.25}>
          {menuData.map((cat) => (
            <motion.button
              key={cat.key}
              type="button"
              className={cat.tileClass}
              onClick={() => openModal(cat.key)}
              aria-label={`Открыть категорию: ${cat.title}`}
              variants={tileVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="tile_media">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 420px) 100vw, 33vw"
                  priority={cat.key === "hot"}
                />
              </div>

              <div className="tile_label">{cat.title}</div>
            </motion.button>
          ))}
        </Stagger>
      </div>

      <AnimatePresence>
        {open && activeCategory && (
          <motion.div
            className="menu_modal"
            role="dialog"
            aria-modal="true"
            variants={backdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseDown={(e) => e.target === e.currentTarget && closeModal()}
          >
            {/* backdrop кликабельный */}
            <button
              type="button"
              className="menu_modal_backdrop"
              onClick={closeModal}
              aria-label="Закрыть"
            />

            <motion.div
              className="menu_modal_card"
              variants={panel}
              initial="hidden"
              animate="show"
              exit="exit"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="menu_modal_head">
                <div className="menu_modal_title">{activeCategory.title}</div>

                <button
                  type="button"
                  className="menu_modal_close"
                  onClick={closeModal}
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>

              <div className="menu_modal_body">
                <div className="menu_table">
                  <div className="menu_table_rows">
                    {activeCategory.rows.map((r, idx) => (
                      <div className="menu_table_row" key={idx}>
                        <div className="col_name">{r.name}</div>
                        <div className="col_out">{r.out}</div>
                        <div className="col_price">{r.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

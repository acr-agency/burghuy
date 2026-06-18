"use client";
import "./style.scss";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Bron({ text }: { text: string }) {
    const [active, setactive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [fixedWidth, setFixedWidth] = useState<number | null>(null);

    useEffect(() => {
        if (containerRef.current && !fixedWidth) {
            setFixedWidth(containerRef.current.offsetWidth);
        }
    }, [fixedWidth]);

    // Анимация для контейнера с иконками
    const containerVariants:Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                duration: 0.2
            }
        }
    };

    // Анимация для каждой иконки
    const iconVariants:Variants  = {
        hidden: { 
            opacity: 0, 
            y: -40,
            scale: 0.5,
            rotateX: 90
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
                mass: 0.8
            }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            scale: 0.3,
            transition: { duration: 0.15 }
        }
    };

    return (
        <motion.div
            ref={containerRef}
            className="bron butT1"
            onClick={() => setactive(true)}
            style={{ width: fixedWidth ? `${fixedWidth}px` : "auto" }}
            animate={{ width: fixedWidth ? `${fixedWidth}px` : "auto" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <AnimatePresence mode="wait">
                {!active ? (
                    <motion.span
                        key="text"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {text}
                    </motion.span>
                ) : (
                    <motion.div
                        key="icons"
                        className="bronBox"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.a
                            href="https://max.ru/id7325134627_bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={iconVariants}
                            whileHover={{ scale: 1.15, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image src="/icons/max.svg" alt="Max" width={45} height={45} />
                        </motion.a>
                        
                        <motion.a
                            href="https://t.me/Burzyi_bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={iconVariants}
                            whileHover={{ scale: 1.15, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image src="/icons/tg.svg" alt="Telegram" width={45} height={45} />
                        </motion.a>
                        
                        <motion.a
                            href="https://vk.com/burzui_bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={iconVariants}
                            whileHover={{ scale: 1.15, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image src="/icons/vk.svg" alt="VK" width={45} height={45} />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
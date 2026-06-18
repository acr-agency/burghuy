"use client";

import Image from "next/image";
import Link from "next/link";
import "./style.scss";

import { openCookieSettings } from "@/components/features/CookieConsent/CookieConsent"; // ✅ Только функцию
import { useCallback } from "react";

export default function Footer() {

    const handleOpenSettings = useCallback(() => {
    console.log('[Footer] Opening cookie settings'); // 🔍 Проверяем
    try {
      openCookieSettings();
    } catch (error) {
      console.error('[Footer] Error opening settings:', error);
    }
  }, []);
  return (
    <footer className="footer">
      <div className="container footer__top">
        <Link className="footer__logo" href="/" aria-label="На главную">
          <Image src="/img/logo.png" alt="Логотип" width={200} height={100} />
        </Link>

        <p className="footer__copyright">
          ©2025 <span className="footer__brand">000 «Империя»</span>. Все права защищены
        </p>
      </div>

      {/* Нижняя полоса */}
      <div className="footer__bar">
        <div className="container footer__barInner">
          <div className="footer__links">
            <Link className="footer__link" href="/privacy">
              Политика конфиденциальности
            </Link>

         <button
              type="button"
              className="footer__link footer__linkBtn"
              onClick={handleOpenSettings} // ✅ Используем обернутую функцию
              data-testid="footer-cookie-settings" // ✅ Добавляем testid
            >
              Настройки cookies
            </button>
          </div>

          <div className="footer__dev">
            <a className="footer__link" href="https://acr-agency.ru/" target="_blank" rel="noreferrer">
             <Image className="acr" src={'/img/ACR.svg'} alt="аналитический центр развитие" width={120} height={60}/>
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Убираем CookieConsent отсюда - он уже в RootLayout */}
    </footer>
  );
}
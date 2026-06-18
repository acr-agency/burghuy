"use client";

import React, { useEffect, useMemo, useState } from "react";

export type CookieConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  decidedAt: string | null;
  utmData?: Record<string, string>;
};

export type CookieConsentProps = {
  siteName?: string;
  policyUrl?: string;
  storageKey?: string;
  ymId?: number; // ✅ Яндекс.Метрика - number
  gtmId?: string; // Google Tag Manager - string
  vkId?: string; // VK Pixel - string
  mtId?: string; // MyTarget - string
  calltouchId?: string; // Calltouch - string
  onChange?: (consent: CookieConsentState) => void;
  showFunctional?: boolean;
  testMode?: boolean;
  testId?: string;
};

const OPEN_EVENT = "open-cookie-settings";

let globalSetDrawerOpen: ((open: boolean) => void) | null = null;
let globalSetDraft: ((draft: any) => void) | null = null;
let globalConsent: any = null;
let globalBase: any = null;
// Утилиты для работы с UTM
const UTMParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_referrer'];
const YCLIDParam = 'yclid';
const GCLIDParam = 'gclid';
const FBParam = 'fbclid';
const VKParam = 'vkcid';

export function CookieConsent({
  siteName = "буржуй73.рф",
  policyUrl = "/privacy",
  storageKey = "cookie_consent_v1",
  ymId,
  gtmId,
  vkId,
  mtId,
  calltouchId,
  showFunctional = false,
  testMode = false,
  testId = "cookie-consent",
  onChange,
}: CookieConsentProps) {
  const base = useMemo<CookieConsentState>(
    () => ({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      decidedAt: null,
      utmData: {},
    }),
    []
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [consent, setConsent] = useState<CookieConsentState>(base);
  const [draft, setDraft] = useState<CookieConsentState>(base);
  const [ymInitialized, setYmInitialized] = useState(false);

  useEffect(() => {
    globalSetDrawerOpen = setDrawerOpen;
    globalSetDraft = setDraft;
    globalConsent = consent;
    globalBase = base;
    
    return () => {
      globalSetDrawerOpen = null;
      globalSetDraft = null;
      globalConsent = null;
      globalBase = null;
    };
  }, [consent, base]);

   // ✅ Улучшенный обработчик события
  useEffect(() => {
    const handler = () => {
      console.log('[CookieConsent] OPEN_EVENT received');
      setDraft(consent?.decidedAt ? consent : base);
      setDrawerOpen(true);
      setVisible(true); // Убедимся что видимый
    };
    
    window.addEventListener(OPEN_EVENT, handler);
    console.log('[CookieConsent] Listener attached');
    
    return () => {
      window.removeEventListener(OPEN_EVENT, handler);
      console.log('[CookieConsent] Listener removed');
    };
  }, [consent, base]); 
  // ✅ Загружаем скрипт Яндекс.Метрики динамически
  const loadYandexMetrika = () => {
    if (typeof window === 'undefined' || !ymId || window.ym) return;

    const script = document.createElement('script');
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.async = true;
    script.onload = () => {
      // Скрипт загружен, но ym еще может быть не доступен мгновенно
      setTimeout(() => {
        if (typeof window.ym === 'function') {
          setYmInitialized(true);
        }
      }, 100);
    };
    document.head.appendChild(script);
  };

  // Инициализация Яндекс.Метрики с согласием
  const initializeYandexMetrika = (consentState: CookieConsentState) => {
    if (!ymId || typeof window.ym !== 'function') return;

    try {
      if (consentState.analytics) {
        window.ym(ymId, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: consentState.analytics,
          ecommerce: consentState.functional || consentState.analytics,
          utm: consentState.marketing ? 'preserve' : false,
        });
      } else {
        // Отключаем метрику если нет согласия
        window.ym(ymId, 'disable');
      }
    } catch (e) {
      console.debug('[CookieConsent] YM init error:', e);
    }
  };



  // Сохранение UTM меток из URL
  const captureUTMParams = (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {};
    
    [...UTMParams, YCLIDParam, GCLIDParam, FBParam, VKParam].forEach(param => {
      const value = params.get(param);
      if (value) {
        utmData[param] = value;
        sessionStorage.setItem(`last_${param}`, value);
        document.cookie = `${param}=${value}; path=/; max-age=31536000; SameSite=Lax`;
      }
    });
    
    return utmData;
  };

  // Загружаем скрипты при монтировании
  useEffect(() => {
    if (!testMode) {
      loadYandexMetrika();
      // Здесь можно добавить загрузку других скриптов
    }
  }, []);

  // Инициализируем счетчики когда скрипт загружен
  useEffect(() => {
    if (ymInitialized && consent.decidedAt) {
      initializeYandexMetrika(consent);
    }
  }, [ymInitialized, consent]);

  // load consent from storage
  useEffect(() => {
    if (testMode) {
      setVisible(true);
      return;
    }

    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        setVisible(true);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<CookieConsentState> | null;

      if (parsed?.necessary === true) {
        const isExpired = parsed.decidedAt && 
          new Date(parsed.decidedAt) < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        
        if (isExpired) {
          setVisible(true);
          return;
        }

        const normalized: CookieConsentState = {
          ...base,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          functional: Boolean(parsed.functional),
          utmData: parsed.utmData || {},
          decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : null,
          necessary: true,
        };
        
        setConsent(normalized);
        setDraft(normalized);
        setVisible(false);
        
        // Инициализируем счетчики с сохраненными настройками
        if (ymInitialized) {
          initializeYandexMetrika(normalized);
        }
        
        onChange?.(normalized);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, [testMode, ymInitialized]);

  const save = (next: Partial<CookieConsentState>) => {
    const utmData = captureUTMParams();
    
    const payload: CookieConsentState = {
      ...base,
      ...consent,
      ...next,
      utmData: { ...utmData, ...consent.utmData, ...next.utmData },
      necessary: true,
      decidedAt: new Date().toISOString(),
    };
    
    setConsent(payload);
    setDraft(payload);
    
    localStorage.setItem(storageKey, JSON.stringify(payload));
    document.cookie = `${storageKey}=${encodeURIComponent(JSON.stringify(payload))}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Инициализируем счетчики с новыми настройками
    if (ymInitialized) {
      initializeYandexMetrika(payload);
    }
    
    setVisible(false);
    setDrawerOpen(false);
    onChange?.(payload);
  };

  const acceptAll = () => save({ 
    analytics: true, 
    marketing: true, 
    functional: showFunctional ? true : false 
  });
  
  const acceptNecessary = () => save({ 
    analytics: false, 
    marketing: false, 
    functional: false 
  });

  const openSettings = () => {
    setDraft(consent?.decidedAt ? consent : base);
    setDrawerOpen(true);
  };

  const toggle = (key: "analytics" | "marketing" | "functional") => {
    setDraft((p) => ({ ...p, [key]: !p[key] }));
  };

  if (!visible) {
    return testMode ? (
      <div 
        data-testid={`${testId}-hidden`}
        data-cookie-consent-status="hidden"
        data-cookie-consent-analytics={consent.analytics}
        data-cookie-consent-marketing={consent.marketing}
        data-cookie-consent-functional={consent.functional}
        data-cookie-consent-decided={consent.decidedAt || 'never'}
        style={{ display: 'none' }}
      />
    ) : null;
  }

  return (
    <>
      {/* compact bar */}
      {!drawerOpen && (
        <div 
          className="cookieMiniBar"
          data-testid={`${testId}-bar`}
          data-cookie-consent-visible="true"
          data-cookie-consent-stage="bar"
        >
          <div className="cookieMiniInner uiPanel">
            <div className="cookieMiniRow">
              <div className="cookieMiniText">
                <span className="uiGoldText" style={{ fontWeight: 500 }}>
                  Cookies
                </span>
                — мы ценим вашу приватность. Используем cookies для аналитики и рекламы.
                <a 
                  className="cookieLink" 
                  href={policyUrl}
                  data-testid={`${testId}-policy-link`}
                >
                  Подробнее
                </a>.
              </div>

              <div className="cookieMiniActions">
                <button 
                  className="uiBtnGhost" 
                  onClick={openSettings}
                  data-testid={`${testId}-settings-button`}
                >
                  Настроить
                </button>
                <button 
                  className="butT2 uiBtnTiny" 
                  onClick={acceptNecessary}
                  data-testid={`${testId}-reject-button`}
                >
                  Только нужные
                </button>
                <button 
                  className="butT1 uiBtnTiny" 
                  onClick={acceptAll}
                  data-testid={`${testId}-accept-button`}
                >
                  Принять все
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* drawer */}
      {drawerOpen && (
        <div
          className="uiOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Настройки cookies"
          data-testid={`${testId}-drawer`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <div className="uiDrawer uiPanel">
            <div className="uiDrawerHead">
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  <span className="uiGoldText">Настройки cookies</span>
                </div>
                <div className="cookieMiniText" style={{ maxWidth: 620 }}>
                  Обязательные cookies включены всегда. Остальные — по вашему выбору.
                </div>
              </div>
              <button 
                className="uiClose" 
                onClick={() => setDrawerOpen(false)} 
                aria-label="Закрыть"
                data-testid={`${testId}-close-drawer`}
              >
                ×
              </button>
            </div>

            <div 
              className="cookieOpt"
              data-testid={`${testId}-option-necessary`}
            >
              <div className="cookieOptTop">
                <div className="cookieOptName">Обязательные</div>
                <div className="sw2" data-on="true" aria-disabled="true">
                  <div className="sw2Dot" />
                </div>
              </div>
              <div className="cookieOptDesc">
                Нужны для корректной работы сайта (навигация, безопасность, формы).
              </div>
            </div>

            <div 
              className="cookieOpt"
              data-testid={`${testId}-option-analytics`}
            >
              <div className="cookieOptTop">
                <div className="cookieOptName">Аналитика</div>
                <div
                  className="sw2"
                  data-on={String(draft.analytics)}
                  role="switch"
                  aria-checked={draft.analytics}
                  tabIndex={0}
                  onClick={() => toggle("analytics")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle("analytics");
                  }}
                  data-testid={`${testId}-toggle-analytics`}
                >
                  <div className="sw2Dot" />
                </div>
              </div>
              <div className="cookieOptDesc">
                Помогает понимать, что улучшать на сайте. 
                {ymId && " Яндекс.Метрика,"} 
                {" обезличенная статистика."}
              </div>
            </div>

            <div 
              className="cookieOpt"
              data-testid={`${testId}-option-marketing`}
            >
              <div className="cookieOptTop">
                <div className="cookieOptName">Маркетинг</div>
                <div
                  className="sw2"
                  data-on={String(draft.marketing)}
                  role="switch"
                  aria-checked={draft.marketing}
                  tabIndex={0}
                  onClick={() => toggle("marketing")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle("marketing");
                  }}
                  data-testid={`${testId}-toggle-marketing`}
                >
                  <div className="sw2Dot" />
                </div>
              </div>
              <div className="cookieOptDesc">
                Для оценки эффективности рекламы и персонализации предложений.
                {vkId && " VK Реклама,"} 
                {mtId && " myTarget,"}
                {" сохранение UTM-меток."}
              </div>
            </div>

            {showFunctional && (
              <div 
                className="cookieOpt"
                data-testid={`${testId}-option-functional`}
              >
                <div className="cookieOptTop">
                  <div className="cookieOptName">Синхронизация данных</div>
                  <div
                    className="sw2"
                    data-on={String(draft.functional)}
                    role="switch"
                    aria-checked={draft.functional}
                    tabIndex={0}
                    onClick={() => toggle("functional")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggle("functional");
                    }}
                    data-testid={`${testId}-toggle-functional`}
                  >
                    <div className="sw2Dot" />
                  </div>
                </div>
                <div className="cookieOptDesc">
                  Актуальные остатки на складе, быстрая загрузка цен и наличия.
                </div>
              </div>
            )}

            <div 
              className="drawerActions"
              data-testid={`${testId}-drawer-actions`}
            >
              <button 
                className="uiBtnGhost" 
                onClick={acceptNecessary}
                data-testid={`${testId}-drawer-reject`}
              >
                Отклонить необязательные
              </button>
              <button 
                className="butT2 uiBtnTiny" 
                onClick={() => save(draft)}
                data-testid={`${testId}-drawer-save`}
              >
                Сохранить настройки
              </button>
              <button 
                className="butT1 uiBtnTiny" 
                onClick={acceptAll}
                data-testid={`${testId}-drawer-accept-all`}
              >
                Принять все
              </button>
            </div>

            <div className="cookieMiniText" style={{ marginTop: 10, color: '#6b7280' }}>
              {siteName}:{" "}
              <a 
                className="cookieLink" 
                href={policyUrl}
                data-testid={`${testId}-drawer-policy`}
              >
                политика конфиденциальности
              </a>
              {" • "}
              <a 
                className="cookieLink" 
                href="/cookie-policy"
                data-testid={`${testId}-drawer-cookie-policy`}
              >
                управление cookies
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  
  console.log('[openCookieSettings] Called');
  
  // 1. Пробуем через событие
  try {
    window.dispatchEvent(new Event(OPEN_EVENT));
    console.log('[openCookieSettings] Event dispatched');
  } catch (e) {
    console.error('[openCookieSettings] Event error:', e);
  }
  
  // 2. Fallback: прямой вызов через глобальные ссылки
  setTimeout(() => {
    if (globalSetDrawerOpen) {
      console.log('[openCookieSettings] Using fallback direct call');
      globalSetDraft?.(globalConsent?.decidedAt ? globalConsent : globalBase);
      globalSetDrawerOpen(true);
    } else {
      console.log('[openCookieSettings] Component not mounted yet');
      
      // 3. Если компонент еще не смонтирован - сохраняем флаг
      sessionStorage.setItem('pending_cookie_settings', 'true');
    }
  }, 100);
}

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...params: any[]) => void; // ✅ number!
    gtag?: (...args: any[]) => void;
    VK?: any;
    mt?: (...args: any[]) => void;
    ct?: (...args: any[]) => void;
    _gaInitialized?: boolean;
    _gtmLoaded?: boolean;
  }
}
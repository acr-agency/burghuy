// __tests__/cookie-consent.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Cookie Consent', () => {
  test('должен показывать баннер при первом посещении', async ({ page }) => {
    await page.goto('/');
    
    // ✅ Проверяем видимость баннера
    await expect(page.getByTestId('cookie-consent-bar')).toBeVisible();
    
    // ✅ Проверяем текст
    await expect(page.getByText(/Cookies/)).toBeVisible();
  });

  test('должен принимать все cookies', async ({ page }) => {
    await page.goto('/');
    
    await page.getByTestId('cookie-consent-accept-button').click();
    
    // ✅ Проверяем что баннер исчез
    await expect(page.getByTestId('cookie-consent-bar')).toBeHidden();
    
    // ✅ Проверяем cookies в браузере
    const cookies = await page.context().cookies();
    expect(cookies.find(c => c.name.includes('cookie_analytics'))?.value).toBe('true');
    expect(cookies.find(c => c.name.includes('cookie_marketing'))?.value).toBe('true');
  });

  test('должен отклонять необязательные cookies', async ({ page }) => {
    await page.goto('/');
    
    await page.getByTestId('cookie-consent-reject-button').click();
    
    const cookies = await page.context().cookies();
    expect(cookies.find(c => c.name.includes('cookie_analytics'))?.value).toBe('false');
    expect(cookies.find(c => c.name.includes('cookie_marketing'))?.value).toBe('false');
  });

  test('должен открывать настройки и сохранять выбор', async ({ page }) => {
    await page.goto('/');
    
    await page.getByTestId('cookie-consent-settings-button').click();
    await expect(page.getByTestId('cookie-consent-drawer')).toBeVisible();
    
    // ✅ Переключаем аналитику
    await page.getByTestId('cookie-consent-toggle-analytics').click();
    await page.getByTestId('cookie-consent-drawer-save').click();
    
    const cookies = await page.context().cookies();
    expect(cookies.find(c => c.name.includes('cookie_analytics'))?.value).toBe('true');
  });

  test('должен сохранять UTM метки в cookies', async ({ page }) => {
    await page.goto('/?utm_source=google&utm_medium=cpc&utm_campaign=test');
    
    await page.getByTestId('cookie-consent-accept-button').click();
    
    const cookies = await page.context().cookies();
    expect(cookies.find(c => c.name === 'utm_source')?.value).toBe('google');
    expect(cookies.find(c => c.name === 'utm_medium')?.value).toBe('cpc');
  });

  test('тестовый режим - всегда показывает баннер', async ({ page }) => {
    // ✅ Используем testMode для E2E тестов
    await page.addInitScript(() => {
      window.localStorage.setItem('cookie_consent_v1', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        decidedAt: new Date().toISOString()
      }));
    });
    
    await page.goto('/?testMode=true');
    await expect(page.getByTestId('cookie-consent-bar')).toBeVisible();
  });
});
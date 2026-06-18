/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Разрешаем iframe только для /tg
      {
        source: '/tg',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
      // Разрешаем iframe только для /vk
      {
        source: '/vk',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
      // Для всех остальных маршрутов - запрещаем iframe
      {
        source: '/((?!tg|vk).*)',  // все кроме tg и vk
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
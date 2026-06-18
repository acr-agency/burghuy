"use client";

import { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import Events from "@/components/sections/events/Events";
import Menu from "@/components/sections/menu/Menu";

type VkUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  photo_200?: string;
};

export default function VkPage() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<VkUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initVkApp = async () => {
      try {
        // Инициализация VK Mini App
        await bridge.send("VKWebAppInit");

        // Получение данных пользователя
        const vkUser = await bridge.send("VKWebAppGetUserInfo");

        if (isMounted) {
          setUser(vkUser ?? null);
          setReady(true);
        }
      } catch (error) {
        console.error("VK Mini App init error:", error);

        if (isMounted) {
          setReady(true);
        }
      }
    };

    initVkApp();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main style={{ padding: 16 }}>
      {/* временно можно включить для проверки
      <pre>{JSON.stringify({ ready, user }, null, 2)}</pre>
      */}

      <Events />
      <Menu />
    </main>
  );
}
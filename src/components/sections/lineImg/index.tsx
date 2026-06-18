"use client";

import { BlurIn } from "@/components/ui/Motion";
import "./style.scss";

export default function LineImg() {
  return (
    <section className="lineImg sect">
      <div className="container flex justify-center align-center ">
        <BlurIn>
            <p className="lineImg_text">
          Создадим для вас незабываемое и яркое впечатление
        </p>
        </BlurIn>
      
      </div>
    </section>
  );
}   
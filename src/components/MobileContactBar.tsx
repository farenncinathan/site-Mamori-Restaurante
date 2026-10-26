"use client";

import { useEffect, useState } from "react";
import { messages } from "@/content/business";
import WhatsAppCTA from "./WhatsAppCTA";

export default function MobileContactBar() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const footer = document.querySelector(".site-footer");
    const observer = new IntersectionObserver(([entry]) =>
      setFooterVisible(entry.isIntersecting),
    );
    if (footer) observer.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
  if (!scrolled || footerVisible) return null;
  return (
    <aside aria-label="Contato rápido" className="mobile-contact-bar">
      <WhatsAppCTA message={messages.cardapio}>
        O que tem no buffet hoje?
      </WhatsAppCTA>
    </aside>
  );
}

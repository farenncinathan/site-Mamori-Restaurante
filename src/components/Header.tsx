"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { nav } from "@/content/copy";
import { messages } from "@/content/business";
import WhatsAppCTA from "./WhatsAppCTA";
import Icon from "./Icon";

export default function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        closeMenu();
        menuRef.current.querySelector<HTMLElement>("summary")?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        menuRef.current?.open &&
        !menuRef.current.contains(event.target as Node)
      )
        closeMenu();
    };
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (breakpoint.matches) closeMenu();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(entry.target.id === "topo" ? "" : `#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    for (const href of ["#topo", ...nav.map((item) => item.href)]) {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    breakpoint.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      breakpoint.removeEventListener("change", onDesktop);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner section-shell">
        <a
          href="#topo"
          onClick={() => {
            closeMenu();
            setActive("");
          }}
          aria-label="Mamori — voltar ao início"
          className="brand"
        >
          <span className="brand-icon">
            <Image
              src="/images/branding/logo-mamori-original.png"
              alt=""
              fill
              sizes="48px"
              priority
            />
          </span>
          <span className="brand-type">
            Mamori<span>COMIDINHAS COM AMOR</span>
          </span>
        </a>
        <nav aria-label="Principal" className="desktop-nav">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <WhatsAppCTA
            size="sm"
            message={messages.geral}
            className="header-contact"
          >
            <span className="desktop-contact-label">Fale com a gente</span>
            <span className="mobile-contact-label">WhatsApp</span>
          </WhatsAppCTA>
          <details
            ref={menuRef}
            onToggle={(event) => setOpen(event.currentTarget.open)}
            className="mobile-menu"
          >
            <summary
              className="menu-toggle icon-button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <span className="menu-icon-open">
                <Icon name="menu" />
              </span>
              <span className="menu-icon-close">
                <Icon name="close" />
              </span>
            </summary>
            <nav
              id="menu-mobile"
              aria-label="Navegação móvel"
              className="menu-panel"
            >
              <p className="eyebrow">Sinta-se em casa</p>
              <ul>
                {nav.map((item, index) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={closeMenu}>
                      <span className="item-number" aria-hidden="true">
                        0{index + 1}
                      </span>
                      {item.label}
                      <Icon name="arrow-up" />
                    </a>
                  </li>
                ))}
              </ul>
              <WhatsAppCTA message={messages.cardapio}>
                Consultar o buffet de hoje
              </WhatsAppCTA>
              <p className="menu-note">Comidinhas com amor, em Manaus.</p>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

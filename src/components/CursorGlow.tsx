"use client";

import { useEffect, useRef } from "react";

/** Efeito decorativo: não substitui o cursor nativo nem intercepta cliques. */
export default function CursorGlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!root || !ring || !glow) return;
    const preference = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let initialized = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const paint = () => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      const position = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = position;
      glow.style.transform = position;
      if (Math.hypot(target.x - current.x, target.y - current.y) > 0.1) {
        frame = requestAnimationFrame(paint);
      } else frame = 0;
    };
    const hide = () => {
      root.dataset.visible = "false";
      root.dataset.pressed = "false";
      root.dataset.interactive = "false";
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      initialized = false;
    };
    const syncPreference = () => {
      root.dataset.enabled = String(preference.matches);
      if (!preference.matches) hide();
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType === "touch") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!initialized) {
        current.x = target.x;
        current.y = target.y;
        initialized = true;
      }
      root.dataset.visible = "true";
      root.dataset.interactive = String(
        event.target instanceof Element &&
          !!event.target.closest("a, button, summary, input, select, textarea"),
      );
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const press = (event: PointerEvent) => {
      if (preference.matches && event.pointerType !== "touch")
        root.dataset.pressed = "true";
    };
    const release = () => {
      root.dataset.pressed = "false";
    };
    const onKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab") hide();
    };
    const onVisibility = () => {
      if (document.hidden) hide();
    };

    syncPreference();
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("pointercancel", hide, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("keydown", onKeyboard);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", hide);
    preference.addEventListener("change", syncPreference);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("keydown", onKeyboard);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", hide);
      preference.removeEventListener("change", syncPreference);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="cursor-effects"
      data-visible="false"
      data-enabled="false"
      aria-hidden="true"
    >
      <span ref={glowRef} className="cursor-glow" />
      <span ref={ringRef} className="cursor-ring" />
    </div>
  );
}

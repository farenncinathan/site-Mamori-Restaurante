"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { messages } from "@/content/business";
import Photo from "./Photo";
import Icon from "./Icon";
import Ornament from "./Ornament";
import WhatsAppCTA from "./WhatsAppCTA";

const gallery = copy.gallery;
const filters = ["Tudo", "Buffet", "Da cozinha", "Doces"];

export default function FoodGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [current, setCurrent] = useState(0);
  const [filter, setFilter] = useState("Tudo");
  const photo = gallery.items[current];
  const visible = gallery.items
    .map((item, index) => ({ ...item, index }))
    .filter((item) => filter === "Tudo" || item.category === filter);

  const openPhoto = (index: number, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setCurrent(index);
    dialogRef.current?.showModal();
  };
  const stepPhoto = (step: number) =>
    setCurrent((n) => (n + step + gallery.items.length) % gallery.items.length);
  const onGalleryKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepPhoto(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepPhoto(-1);
    }
  };
  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    if (touchStart.current && touch) {
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.25)
        stepPhoto(dx > 0 ? -1 : 1);
    }
    touchStart.current = null;
  };

  return (
    <>
      <section
        id="sabores"
        aria-labelledby="sabores-title"
        className="gallery-section section-space"
      >
        <div className="section-shell">
          <Ornament className="centered-ornament" />
          <div className="section-heading">
            <div>
              <p className="eyebrow">{gallery.eyebrow}</p>
              <h2 id="sabores-title">
                {gallery.title} <br />
                <em>{gallery.emphasis}</em>
              </h2>
            </div>
            <p className="section-description">{gallery.text}</p>
          </div>
          <div className="gallery-toolbar">
            <div
              className="gallery-filters"
              role="group"
              aria-label="Filtrar fotos por categoria"
            >
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={filter === item}
                  aria-controls="food-grid"
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="gallery-count" role="status">
              {String(visible.length).padStart(2, "0")}{" "}
              {visible.length === 1 ? "foto" : "fotos"} da casa
            </p>
          </div>
          <div id="food-grid" className="food-grid">
            {visible.map((item) => (
              <figure className="food-tile" key={item.src}>
                <button
                  type="button"
                  onClick={(event) =>
                    openPhoto(item.index, event.currentTarget)
                  }
                  aria-label={`Ampliar foto: ${item.caption}`}
                  aria-haspopup="dialog"
                  className="food-photo-button"
                >
                  <Photo
                    src={item.src}
                    alt={item.alt}
                    sizes="(min-width: 1280px) 390px, (min-width: 768px) 30vw, 46vw"
                    ratio="aspect-[4/3]"
                  />
                  <span className="photo-expand">
                    <Icon name="expand" />
                    <span className="sr-only">Ampliar</span>
                  </span>
                </button>
                <figcaption>
                  <h3>{item.caption}</h3>
                  <p>{item.description}</p>
                  <span className="photo-category">{item.category}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="gallery-note">
            <p>
              <span className="note-dot" aria-hidden="true" />
              {gallery.note}
            </p>
            <WhatsAppCTA variant="line" message={messages.cardapio}>
              {gallery.cta}
            </WhatsAppCTA>
          </div>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        aria-labelledby="gallery-photo-title"
        onClose={() => triggerRef.current?.focus()}
        onKeyDown={onGalleryKey}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="photo-dialog"
      >
        <div className="dialog-header">
          <p aria-live="polite">
            {String(current + 1).padStart(2, "0")}{" "}
            <span>/ {String(gallery.items.length).padStart(2, "0")}</span>
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Fechar galeria"
            className="icon-button"
          >
            <Icon name="close" />
          </button>
        </div>
        <div
          className="dialog-image"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={900}
            height={Math.round(900 / photo.ratio)}
            sizes="(min-width: 768px) 700px, 94vw"
          />
        </div>
        <div className="dialog-footer">
          <div>
            <p className="eyebrow">{photo.category}</p>
            <h3 id="gallery-photo-title">{photo.caption}</h3>
          </div>
          <div className="dialog-controls">
            <button
              type="button"
              className="icon-button"
              onClick={() => stepPhoto(-1)}
              aria-label="Foto anterior"
            >
              <Icon name="left" />
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={() => stepPhoto(1)}
              aria-label="Próxima foto"
            >
              <Icon name="right" />
            </button>
          </div>
        </div>
        <p className="dialog-hint">
          Deslize ou use as setas para ver mais. Esc para fechar.
        </p>
      </dialog>
    </>
  );
}

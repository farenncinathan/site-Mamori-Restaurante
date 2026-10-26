import type { ReactNode } from "react";
import { wa } from "@/content/business";
import Icon from "./Icon";

type Props = {
  children: ReactNode;
  message?: string;
  variant?: "solid" | "line" | "light";
  size?: "sm" | "md";
  className?: string;
};

/** CTA compartilhado: área de toque confortável, texto responsivo e estados acessíveis. */
export default function WhatsAppCTA({
  children,
  message,
  variant = "solid",
  size = "md",
  className = "",
}: Props) {
  return (
    <a
      href={wa(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`site-button site-button--${variant} ${size === "sm" ? "site-button--sm" : ""} ${className}`}
    >
      <Icon name="whatsapp" />
      <span>{children}</span>
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}

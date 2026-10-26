import Image from "next/image";
import { copy } from "@/content/copy";
import { messages } from "@/content/business";
import Icon from "./Icon";
import Ornament from "./Ornament";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="hero">
      <div className="hero-backdrop">
        <Image
          src={copy.space.salao.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-background-image"
        />
      </div>
      <div className="hero-shade" />
      <div className="section-shell hero-inner">
        <div className="hero-copy">
          <p className="eyebrow rise">{copy.hero.eyebrow}</p>
          <h1 id="hero-title" className="rise">
            {copy.hero.titleLines[0]}
            <br />
            <em>{copy.hero.titleLines[1]}</em>
            <br />
            {copy.hero.emphasis}
          </h1>
          <Ornament className="hero-ornament" />
          <p className="hero-description rise">{copy.hero.text}</p>
          <div className="hero-actions rise">
            <a href="#sabores" className="site-button site-button--solid">
              Conheça nossos sabores <Icon name="arrow" />
            </a>
            <WhatsAppCTA variant="line" message={messages.geral}>
              Fale com o Mamori
            </WhatsAppCTA>
          </div>
        </div>
        <a href="#mamori" className="hero-scroll">
          <span>Comidinhas com amor, em Manaus</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

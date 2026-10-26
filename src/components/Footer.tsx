import Image from "next/image";
import { business } from "@/content/business";
import { nav } from "@/content/copy";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="section-shell">
        <div className="footer-top">
          <div>
            <a
              href="#topo"
              className="brand footer-brand"
              aria-label="Mamori — voltar ao início"
            >
              <span className="brand-icon">
                <Image
                  src="/images/branding/logo-mamori-original.png"
                  alt=""
                  fill
                  sizes="56px"
                />
              </span>
              <span className="brand-type">
                Mamori<span>COMIDINHAS COM AMOR</span>
              </span>
            </a>
            <p>
              Comida de casa. Gente de verdade.
              <br />
              Um pedacinho do Mamori na sua rotina.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-social">
            <p>Mais um pouco da nossa casa</p>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <Icon name="instagram" /> Instagram do Mamori{" "}
              <Icon name="arrow-up" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a href="#topo" className="back-to-top">
              Voltar ao início <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Mamori · Flores, Manaus</span>
          <p>{business.demoNotice}</p>
        </div>
      </div>
    </footer>
  );
}

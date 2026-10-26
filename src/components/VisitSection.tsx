import { business, messages, wa } from "@/content/business";
import WhatsAppCTA from "./WhatsAppCTA";
import Icon from "./Icon";

export default function VisitSection() {
  return (
    <section
      id="visita"
      aria-labelledby="visita-title"
      className="visit-section section-shell section-space"
    >
      <div className="visit-heading">
        <p className="eyebrow">Nosso endereço</p>
        <h2 id="visita-title">
          Seu próximo almoço
          <br />
          <em>pode ser aqui.</em>
        </h2>
        <p className="body-copy">
          Estamos no bairro Flores, em Manaus.
          <br />
          Vai ser um prazer receber você.
        </p>
        <div className="visit-actions">
          <a
            href={business.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-button site-button--solid"
          >
            <Icon name="pin" />
            Traçar rota no Google Maps
            <Icon name="arrow-up" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <WhatsAppCTA variant="line" message={messages.cardapio}>
            Falar com o Mamori
          </WhatsAppCTA>
        </div>
      </div>
      <div className="visit-details">
        <div className="visit-address">
          <Icon name="pin" />
          <div>
            <h3>Encontre o Mamori</h3>
            <address>
              {business.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
        </div>
        <div className="visit-hours">
          <Icon name="clock" />
          <div>
            <h3>Hora do almoço</h3>
            <dl>
              {business.hours.map((item) => (
                <div key={item.days}>
                  <dt>{item.days}</dt>
                  <dd>{item.time}</dd>
                </div>
              ))}
            </dl>
            <p className="hours-note">{business.hoursNote}</p>
          </div>
        </div>
        <a
          href={wa(messages.geral)}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-phone"
        >
          <div>
            <span>Prefere conversar?</span>
            <strong>{business.phoneDisplay}</strong>
          </div>
          <Icon name="whatsapp" />
          <span className="sr-only"> (WhatsApp em nova aba)</span>
        </a>
      </div>
    </section>
  );
}

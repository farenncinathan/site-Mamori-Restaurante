import { copy } from "@/content/copy";
import Photo from "./Photo";
import Icon from "./Icon";

export default function SpaceSection() {
  const s = copy.space;
  return (
    <section
      id="espaco"
      aria-labelledby="espaco-title"
      className="space-section on-dark section-space"
    >
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="espaco-title">
              {s.titleLines[0]}
              <br />
              {s.titleLines[1]}
            </h2>
          </div>
          <div className="section-description">
            <p>{s.text}</p>
            <a href="#visita" className="text-link">
              Venha almoçar com a gente <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="space-photos">
          <figure>
            <Photo
              {...s.mural}
              sizes="(min-width: 768px) 55vw, 90vw"
              ratio="aspect-[5/4]"
              pos="object-[center_30%]"
            />
            <figcaption>
              <span>Um cantinho com a nossa cara</span>
              <span aria-hidden="true">MAMORI, FLORES</span>
            </figcaption>
          </figure>
          <figure>
            <Photo
              {...s.salao}
              sizes="(min-width: 768px) 30vw, 60vw"
              ratio="aspect-[4/5]"
            />
            <figcaption>
              A mesa já está aqui.
              <br />
              Só falta você.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

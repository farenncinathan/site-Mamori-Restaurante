import { business } from "@/content/business";
import Icon from "./Icon";
import { copy } from "@/content/copy";

export default function ReviewsLink() {
  return (
    <section aria-labelledby="avaliacoes" className="reviews-section">
      <div className="section-shell reviews-inner">
        <span className="reviews-mark" aria-hidden="true">
          “
        </span>
        <div>
          <p className="eyebrow">{copy.reviews.eyebrow}</p>
          <h2 id="avaliacoes">{copy.reviews.title}</h2>
          <p>{copy.reviews.text}</p>
        </div>
        <a
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="site-button site-button--line"
        >
          {copy.reviews.cta} <Icon name="arrow-up" />
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
    </section>
  );
}

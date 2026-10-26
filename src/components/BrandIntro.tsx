import { copy } from "@/content/copy";
import Icon from "./Icon";

const icons = ["leaf", "utensils", "heart", "people"] as const;

export default function BrandIntro() {
  return (
    <section
      id="mamori"
      aria-labelledby="mamori-title"
      className="features-section"
    >
      <div className="section-shell">
        <h2 id="mamori-title" className="sr-only">
          O jeito Mamori de receber
        </h2>
        <div className="features-grid">
          {copy.intro.features.map((item, index) => (
            <article key={item.title} className="feature">
              <Icon name={icons[index]} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

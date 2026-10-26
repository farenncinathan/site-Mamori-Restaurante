import { copy } from "@/content/copy";
import Photo from "./Photo";
import Ornament from "./Ornament";
import Icon from "./Icon";

export default function StorySection() {
  const s = copy.story;
  return (
    <section
      id="historia"
      aria-labelledby="historia-title"
      className="story-section section-shell section-space"
    >
      <figure className="story-photo">
        <Photo
          {...s.photo}
          sizes="(min-width: 1280px) 500px, (min-width: 768px) 44vw, 90vw"
          ratio="aspect-[4/5]"
        />
        <span className="story-photo-mark" aria-hidden="true">
          <Icon name="sparkle" />
        </span>
        <figcaption>{s.photo.caption}</figcaption>
      </figure>
      <div className="story-copy">
        <Ornament />
        <p className="eyebrow">{s.eyebrow}</p>
        <h2 id="historia-title">
          {s.titleLines[0]}
          <br />
          {s.titleLines[1]}
          <br />
          <em>{s.emphasis}</em>
        </h2>
        <div className="story-paragraphs">
          {s.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="story-dates">
          {s.milestones.map((item) => (
            <div key={item.year}>
              <span>{item.year}</span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <a href="#visita" className="site-button site-button--line">
          Venha conhecer a nossa casa <Icon name="arrow-up" />
        </a>
      </div>
    </section>
  );
}

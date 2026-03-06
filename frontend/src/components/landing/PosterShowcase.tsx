import React from "react";

export default function PosterShowcase({ posterLoop, posterLoopReverse }) {
  return (
    <section id="showcase" className="page-shell py-10 sm:py-16">
      <div className="content-shell">
        <div className="poster-marquee sm:mt-2">
          <div className="poster-track">
            {posterLoop.map((item, idx) => (
              <article key={`a-${idx}`} className="poster-card">
                <div className="poster-img" style={{ backgroundImage: `url(${item.img})` }} />
                <div className="poster-meta">
                  <p className="poster-title">{item.title}</p>
                  <p className="poster-tag">{item.tag}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="poster-track reverse">
            {posterLoopReverse.map((item, idx) => (
              <article key={`b-${idx}`} className="poster-card">
                <div className="poster-img" style={{ backgroundImage: `url(${item.img})` }} />
                <div className="poster-meta">
                  <p className="poster-title">{item.title}</p>
                  <p className="poster-tag">{item.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function PipelineSection({ isRevealLocked, activeReveal, revealSlides, setActiveReveal }) {
  return (
    <section id="scroll-reveal" className="page-shell pb-8">
      <div className="content-shell">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl text-[#f7edd6]">Pipeline</CardTitle>
            <CardDescription>Scroll inside this panel to move phases.</CardDescription>
          </CardHeader>
        </Card>
        <Card className={`story-wheel-zone ${isRevealLocked ? "locked" : ""}`}>
          <div className="story-progress">
            {revealSlides.map((slide, idx) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveReveal(idx)}
                className={`story-dot ${activeReveal === idx ? "active" : ""}`}
                aria-label={`Show phase ${idx + 1}`}
              />
            ))}
          </div>
          <div className="story-content">
            <p className="story-kicker">PHASE {String(activeReveal + 1).padStart(2, "0")}</p>
            <h4 className="story-title">{revealSlides[activeReveal].title}</h4>
            <p className="story-text">{revealSlides[activeReveal].text}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}

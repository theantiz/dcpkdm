import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function FeaturesSection({ features }) {
  return (
    <section className="page-shell py-14 sm:py-20">
      <div className="content-shell">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] text-[#caa86b]/70">CAPABILITIES</p>
          <h3 className="text-3xl sm:text-4xl font-semibold text-[#f7edd6]">Built for modern cinema delivery.</h3>
          <p className="text-[#d9c9ac]/70 mt-3 max-w-2xl mx-auto">
            Encryption, timing, and distribution tuned for multi-screen chains and boutique premieres alike.
          </p>
        </div>
        <div className="cap-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              className={`feature-card feature-card-${(i % 3) + 1} fade-in p-4`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Badge className="min-w-[2.4rem] justify-center rounded-md border-[#f7d7a0]/70 bg-[#caa86b] px-2 py-1 text-[11px] font-bold tracking-[0.08em] text-[#1a1206]">
                  {feature.code}
                </Badge>
                <h4 className="text-lg font-semibold text-[#f5e8cf]">{feature.title}</h4>
              </div>
              <p className="text-sm text-[#d9c9ac]/75">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

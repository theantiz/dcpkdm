import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function HeroSection({ onGenerate, onFlow, featuredMovie }) {
  return (
    <header className="relative overflow-hidden page-shell pt-16 pb-14 sm:pb-20">
      <div className="noise-bg pointer-events-none" />
      <div className="hero-glow hero-glow-left pointer-events-none" />
      <div className="hero-glow hero-glow-right pointer-events-none" />
      <div className="hero-beam pointer-events-none" />
      <div className="content-shell grid gap-10 lg:grid-cols-[1.15fr_0.95fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#caa86b]/10 border border-[#caa86b]/30">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wide text-[#caa86b]">LIVE | SECURE PIPELINE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-[#f7edd6]">
            Cinema-grade KDMs in minutes, not days.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-[#d9c9ac]/80">
            DCP-KDM orchestrates encryption, certificate targeting, and delivery so you can
            move premieres faster while staying DCI-precise.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={onGenerate}>
              Generate KDM
            </Button>
            <Button variant="outline" size="lg" onClick={onFlow}>
              See the flow
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-[#caa86b]/75">
            <Badge>AES-256</Badge>
            <Badge>Multi-certificate batches</Badge>
            <Badge>Immutable audit</Badge>
            <Badge>24/7 cloud render</Badge>
          </div>
        </div>

        <div className="relative">
          <Card className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#caa86b]/70">Showing</p>
                <p className="text-3xl font-semibold text-[#f5e8cf]">
                  {featuredMovie?.title || "Tonight | 21:00"}
                </p>
                <p className="text-sm text-[#caa86b]/85 mt-1">
                  {featuredMovie?.tag || "Live cinema lineup"}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#caa86b]/15 flex items-center justify-center text-[#caa86b] font-bold">
                4K
              </div>
            </div>
            <div className="space-y-3 text-sm text-[#d9c9ac]/80">
              <div className="flex items-center justify-between">
                <span>Certificates</span>
                <span className="font-semibold text-[#caa86b]">12 queued</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Window</span>
                <span className="font-semibold text-[#caa86b]">Mar 08 | 18:00 to Mar 15 | 23:59</span>
              </div>
              <div className="flex items-center justify-between">
                <span>DCI Compliance</span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">Verified</span>
              </div>
            </div>
            <div className="mt-6 h-32 rounded-xl overflow-hidden border border-[#caa86b]/25 bg-[#0c0b0a] relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(202,168,107,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_35%)]" />
              <div className="absolute inset-0 flex items-center justify-between px-5 text-[#f5e8cf] font-semibold text-lg">
                <span>Encrypting Reels</span>
                <span className="text-sm text-[#caa86b]/80">82% | 9s</span>
              </div>
              <div className="absolute bottom-0 left-0 h-2 bg-[#caa86b] transition-all duration-500 w-[82%]" />
            </div>
          </Card>
        </div>
      </div>
    </header>
  );
}

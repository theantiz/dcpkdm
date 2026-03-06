"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "../Footer";
import TopNav from "./TopNav";
import HeroSection from "./HeroSection";
import PosterShowcase from "./PosterShowcase";
import WorkflowSection from "./WorkflowSection";
import FeaturesSection from "./FeaturesSection";
import PipelineSection from "./PipelineSection";
import KdmSection from "./KdmSection";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";

const FALLBACK_POSTERS = [
  {
    title: "The Dark Knight",
    tag: "EN | 2008",
    img: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
  },
  {
    title: "Interstellar",
    tag: "EN | 2014",
    img: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
  },
  {
    title: "Inception",
    tag: "EN | 2010",
    img: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
  },
  {
    title: "Titanic",
    tag: "EN | 1997",
    img: "https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg",
  },
  {
    title: "The Matrix",
    tag: "EN | 1999",
    img: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
  },
];

function shufflePosters(items) {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Reveal-on-scroll helper
function useScrollFade(selector = ".fade-in", deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector, ...deps]);
}

export default function DcpKdmLanding() {
  const [showMain, setShowMain] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [isWorkflowLocked, setIsWorkflowLocked] = useState(false);
  const [workflowCompleted, setWorkflowCompleted] = useState(false);
  const [activeReveal, setActiveReveal] = useState(0);
  const [isRevealLocked, setIsRevealLocked] = useState(false);
  const workflowWheelAccumRef = useRef(0);
  const workflowWheelDirRef = useRef(0);
  const revealWheelAccumRef = useRef(0);
  const revealWheelDirRef = useRef(0);
  const [posters, setPosters] = useState(() => shufflePosters(FALLBACK_POSTERS));
  const [formSessionKey, setFormSessionKey] = useState(() => Date.now());
  useScrollFade(".fade-in", [showMain]);

  // Auto-reveal intro
  useEffect(() => {
    const timer = setTimeout(() => setShowMain(true), 1900);
    return () => clearTimeout(timer);
  }, []);

  // Force a fresh generator panel each new visit/login session.
  useEffect(() => {
    setFormSessionKey(Date.now());
  }, []);

  // Navbar transform on page scroll
  useEffect(() => {
    const onScroll = () => setIsNavScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load fresh posters from TMDB on every page load.
  useEffect(() => {
    let cancelled = false;

    if (!TMDB_API_KEY) {
      setPosters(shufflePosters(FALLBACK_POSTERS));
      return () => {
        cancelled = true;
      };
    }

    const pickPage = () => Math.floor(Math.random() * 6) + 1;

    const loadMovies = async () => {
      try {
        const ts = Date.now();
        const today = new Date().toISOString().slice(0, 10);
        const indiaNowPage = pickPage();
        const usNowPage = pickPage();
        const bollyPage = pickPage();
        const hollyPage = pickPage();
        const [indiaNowResp, usNowResp, bollyResp, hollyResp] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&region=IN&page=${indiaNowPage}&_${ts}`,
            { cache: "no-store" }
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&region=US&page=${usNowPage}&_${ts}`,
            { cache: "no-store" }
          ),
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&region=IN&with_original_language=hi&with_release_type=2|3&release_date.lte=${today}&sort_by=popularity.desc&page=${bollyPage}&_${ts}`,
            { cache: "no-store" }
          ),
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&region=US&with_origin_country=US&with_release_type=2|3&release_date.lte=${today}&sort_by=popularity.desc&page=${hollyPage}&_${ts}`,
            { cache: "no-store" }
          ),
        ]);
        if (!indiaNowResp.ok || !usNowResp.ok || !bollyResp.ok || !hollyResp.ok) {
          throw new Error("TMDB fetch failed");
        }
        const [indiaNowData, usNowData, bollyData, hollyData] = await Promise.all([
          indiaNowResp.json(),
          usNowResp.json(),
          bollyResp.json(),
          hollyResp.json(),
        ]);

        const normalize = (items, label) =>
          (items || [])
            .filter((item) => {
              if (!item || !item.poster_path) return false;
              const year = Number((item.release_date || "").slice(0, 4));
              return Number.isNaN(year) || year !== 2026;
            })
            .map((item) => ({
              id: item.id || `${item.title}-${item.poster_path}`,
              title: item.title || item.original_title || "Untitled",
              tag: `${label} | ${item.release_date?.slice(0, 4) || "Random"}`,
              img: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }));

        const bollywoodRaw = [
          ...normalize(indiaNowData.results, "Bollywood"),
          ...normalize(bollyData.results, "Bollywood"),
        ];
        const hollywoodRaw = [
          ...normalize(usNowData.results, "Hollywood"),
          ...normalize(hollyData.results, "Hollywood"),
        ];

        const dedupe = (arr) => {
          const seen = new Set();
          return arr.filter((item) => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
          });
        };

        const bollywood = dedupe(bollywoodRaw).slice(0, 12);
        const hollywood = dedupe(hollywoodRaw).slice(0, 12);

        const merged = [];
        const max = Math.max(bollywood.length, hollywood.length);
        for (let i = 0; i < max; i += 1) {
          if (bollywood[i]) merged.push(bollywood[i]);
          if (hollywood[i]) merged.push(hollywood[i]);
          if (merged.length >= 20) break;
        }

        const mapped = merged.length > 0 ? shufflePosters(merged).slice(0, 20) : shufflePosters(FALLBACK_POSTERS);

        if (!cancelled && mapped.length > 0) {
          setPosters(shufflePosters(mapped));
        }
      } catch (err) {
        if (!cancelled) {
          setPosters(shufflePosters(FALLBACK_POSTERS));
        }
      }
    };

    loadMovies();
    const refreshTimer = window.setInterval(loadMovies, 45000);
    return () => {
      cancelled = true;
      window.clearInterval(refreshTimer);
    };
  }, []);

  // Keep poster names stable; they update on refresh fetches only.

  const posterLoop = [...posters, ...posters];
  const posterLoopReverse = [...posters].reverse().concat([...posters].reverse());

  const features = [
    { code: "ENC", title: "Key Encryption", desc: "AES-256 envelope, projector certificate re-wrap, traceable audit log." },
    { code: "BAT", title: "Multi-Cert Batching", desc: "Upload a pack of certificates and drop KDMs in one sweep." },
    { code: "TMW", title: "Time Windows", desc: "Exact UTC windows so screenings never start early or overrun." },
    { code: "DCI", title: "DCI Compliant", desc: "Aligned with SMPTE/DCI delivery rules out of the box." },
    { code: "CLD", title: "Cloud Ready", desc: "Render-ready API that ships keys anywhere on earth." },
    { code: "OPS", title: "Operator Friendly", desc: "Copy, drag, drop. Human-readable logs and alerts." },
  ];

  const steps = [
    { num: "01", title: "Upload DCP", desc: "Drop your digest XML" },
    { num: "02", title: "Attach Certificates", desc: "Single or batch projector certs" },
    { num: "03", title: "Define Window", desc: "Start / End with timezone clarity" },
    { num: "04", title: "Ship KDM", desc: "Instant download & dispatch" },
  ];

  const revealSlides = [
    {
      title: "Parse DCP Digest",
      text: "Validates XML and extracts CPL data.",
    },
    {
      title: "Map Certificate Identity",
      text: "Binds projector fingerprint to target server.",
    },
    {
      title: "Lock Screening Window",
      text: "Encodes secure start and end playback window.",
    },
    {
      title: "Generate + Download KDM",
      text: "Signs and returns final KDM XML.",
    },
  ];

  const stepReveal = (direction) => {
    setActiveReveal((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next > revealSlides.length - 1) return revealSlides.length - 1;
      return next;
    });
  };

  const stepWorkflow = (direction) => {
    setActiveWorkflowStep((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next > steps.length - 1) return steps.length - 1;
      if (next === steps.length - 1) {
        setWorkflowCompleted(true);
      }
      return next;
    });
  };

  // Consume wheel inside workflow and pipeline sections.
  useEffect(() => {
    const minWheelGap = 220;
    const revealThreshold = 170;
    let lastWheelAt = 0;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 8) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      const now = Date.now();
      const targetEl = e.target instanceof Element ? e.target : null;
      const pointerInWorkflow = Boolean(targetEl?.closest("#how-it-works"));
      const pointerInReveal = Boolean(targetEl?.closest("#scroll-reveal"));

      const workflowZone = document.getElementById("how-it-works");
      const revealZone = document.getElementById("scroll-reveal");

      const workflowRect = workflowZone?.getBoundingClientRect();
      const revealRect = revealZone?.getBoundingClientRect();

      const workflowInFocus = Boolean(
        workflowRect &&
          workflowRect.top <= window.innerHeight * 0.85 &&
          workflowRect.bottom >= window.innerHeight * 0.15
      );
      const revealInFocus = Boolean(
        revealRect &&
          revealRect.top <= window.innerHeight * 0.85 &&
          revealRect.bottom >= window.innerHeight * 0.15
      );

      const workflowActive = workflowInFocus && pointerInWorkflow;
      const revealActive = revealInFocus && pointerInReveal;

      if (!workflowActive) {
        setIsWorkflowLocked(false);
        workflowWheelAccumRef.current = 0;
        workflowWheelDirRef.current = 0;
      }
      if (!revealActive) {
        setIsRevealLocked(false);
        revealWheelAccumRef.current = 0;
        revealWheelDirRef.current = 0;
      }

      if (workflowActive) {
        const workflowAtFirst = activeWorkflowStep === 0;
        const workflowAtLast = activeWorkflowStep === steps.length - 1;
        const strictWorkflowLock = !workflowCompleted;
        const workflowConsume =
          strictWorkflowLock || (direction > 0 && !workflowAtLast) || (direction < 0 && !workflowAtFirst);

        setIsWorkflowLocked(workflowConsume);
        if (!workflowConsume) return;

        if (workflowWheelDirRef.current !== direction) {
          workflowWheelDirRef.current = direction;
          workflowWheelAccumRef.current = 0;
        }
        workflowWheelAccumRef.current += Math.abs(e.deltaY);
        if (workflowWheelAccumRef.current < revealThreshold || now - lastWheelAt < minWheelGap) {
          e.preventDefault();
          return;
        }

        workflowWheelAccumRef.current = 0;
        lastWheelAt = now;
        e.preventDefault();
        stepWorkflow(direction);
        return;
      }

      if (revealActive) {
        const revealAtFirst = activeReveal === 0;
        const revealAtLast = activeReveal === revealSlides.length - 1;
        const revealConsume = (direction > 0 && !revealAtLast) || (direction < 0 && !revealAtFirst);

        setIsRevealLocked(revealConsume);
        if (!revealConsume) return;

        if (revealWheelDirRef.current !== direction) {
          revealWheelDirRef.current = direction;
          revealWheelAccumRef.current = 0;
        }
        revealWheelAccumRef.current += Math.abs(e.deltaY);
        if (revealWheelAccumRef.current < revealThreshold || now - lastWheelAt < minWheelGap) {
          e.preventDefault();
          return;
        }

        revealWheelAccumRef.current = 0;
        lastWheelAt = now;
        e.preventDefault();
        stepReveal(direction);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [activeReveal, activeWorkflowStep, revealSlides.length, steps.length, workflowCompleted]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0c0b0a] via-[#0f0e0c] to-[#0b0a09] text-[#e9dec7]">
      {!showMain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0b0a]">
          <div className="text-center">
            <div className="loading-orb mx-auto mb-8" />
            <p className="tracking-[0.3em] text-xs text-[#caa86b]/80 mb-3">WARMING REELS</p>
            <h1 className="text-4xl font-semibold text-[#caa86b]">DCP | KDM</h1>
          </div>
        </div>
      )}

      {showMain && (
        <>
          <TopNav isNavScrolled={isNavScrolled} onLaunchBuilder={() => scrollToId("kdm-form")} />
          <HeroSection
            onGenerate={() => scrollToId("kdm-form")}
            onFlow={() => scrollToId("how-it-works")}
            featuredMovie={posters[0]}
          />
          <PosterShowcase posterLoop={posterLoop} posterLoopReverse={posterLoopReverse} />
          <WorkflowSection
            isWorkflowLocked={isWorkflowLocked}
            activeWorkflowStep={activeWorkflowStep}
            steps={steps}
          />
          <FeaturesSection features={features} />
          <PipelineSection
            isRevealLocked={isRevealLocked}
            activeReveal={activeReveal}
            revealSlides={revealSlides}
            setActiveReveal={setActiveReveal}
          />
          <KdmSection formSessionKey={formSessionKey} />

          <Footer />
        </>
      )}
    </div>
  );
}

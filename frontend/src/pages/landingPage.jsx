import React, { useEffect } from "react";
import KdmFormComponent from "./kdmForm";
import Footer from "../components/Footer";

function useScrollFade(selector = ".fade-in") {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

export default function DcpKdmLanding() {
  useScrollFade();

  return (
    <div className="relative w-full bg-[#0f0e0c] text-mustard leading-relaxed">

      {/* Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay loop muted playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="film-grain" aria-hidden="true" />
      <div className="cinema-vignette" aria-hidden="true" />

      {/* HERO */}
      <header className="relative z-30 min-h-[100vh] flex items-center justify-center px-4">
        <div className="w-full max-w-3xl mx-auto text-center">

          <h1 className="
            fade-in font-bold tracking-tight
            text-[clamp(2rem,6vw,3.8rem)]
            leading-[1.1]
          ">
            DCP-KDM System
          </h1>

          <p
            className="
              fade-in mt-4
              text-sm sm:text-base md:text-lg
              max-w-xl mx-auto opacity-90
            "
            style={{ transitionDelay: "120ms" }}
          >
            Generate Key Delivery Messages for encrypted Digital Cinema Packages
          </p>

          <div
            className="fade-in mt-6 flex flex-col sm:flex-row gap-2 justify-center"
            style={{ transitionDelay: "220ms" }}
          >
            <a href="#more-info" className="btn-gold text-sm px-3 py-2">More Info</a>
           
          </div>

        </div>
      </header>

      <div className="sep-line" />

      {/* MAIN BODY — TIGHT CENTERED COLUMN */}
      <main className="relative z-31 w-full flex justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-3xl space-y-20">

          {/* INFO SECTION */}
          {/* INFO SECTION */}
<section id="more-info" className="fade-in" style={{ transitionDelay: "260ms" }}>
  <div className="card p-7 sm:p-9 space-y-8">

    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">What is a DCP ?</h2>
      <p className="text-sm sm:text-base opacity-90">
        A Digital Cinema Package is the standard format used worldwide to deliver movies to theatres.
        It bundles together high-quality picture (JPEG2000), multi-channel audio, subtitles, and
        playback metadata inside carefully structured folders.
      </p>
      <p className="text-sm sm:text-base mt-2 opacity-90">
        Many modern DCPs are encrypted, which prevents unauthorized copying or playback. Only a valid
        cinema server with a matching key can unlock and screen the content.
      </p>
    </div>

    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Why DCPs Matter ?</h2>
      <p className="text-sm sm:text-base opacity-90">
        DCPs provide a universal standard for cinemas across different brands, technologies, and
        countries. Whether it’s IMAX, Dolby, Christie, Barco, or a small-town theatre, a DCP will play
        exactly the same way.
      </p>
      <p className="text-sm sm:text-base mt-2 opacity-90">
        The format keeps things predictable same color grading, same audio levels, same timing,
        everywhere. This consistency is one of the reasons global film releases are technically possible.
      </p>
    </div>

    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">What is a KDM ?</h2>
      <p className="text-sm sm:text-base opacity-90">
        A Key Delivery Message is a small XML file that gives permission to a specific cinema server to
        decrypt and screen an encrypted DCP. Without a KDM, the DCP stays locked even if the theatre
        physically has the files.
      </p>
      <p className="text-sm sm:text-base mt-2 opacity-90">
        Every server in every theatre has its own unique certificate. A KDM is generated individually
        for that certificate, making it impossible to play encrypted content on unauthorized systems.
      </p>
    </div>

    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">How KDMs Work ?</h2>
      <p className="text-sm sm:text-base opacity-90">
        The DCP contains an encrypted content key. The KDM re-encrypts that key using the target
        server’s public certificate. Only that server’s private key can unlock it which makes the
        system secure and theatre-specific.
      </p>
      <p className="text-sm sm:text-base mt-2 opacity-90">
        Each KDM also includes a strict validity window. The server can only unlock and play the film
        between those start and end dates. Outside the window, playback automatically stops.
      </p>
      <p className="text-sm sm:text-base mt-2 opacity-90">
        Your generator below takes the digest from the DCP, combines it with the projector certificate,
        builds the correct validity period, encrypts everything, and produces a fully compliant KDM
        ready for distribution.
      </p>
    </div>

  </div>
</section>


          {/* GENERATOR SECTION */}
          <section id="kdm-form-section" className="fade-in" style={{ transitionDelay: "300ms" }}>
            <div className="card p-5 sm:p-8">
              <KdmFormComponent />
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

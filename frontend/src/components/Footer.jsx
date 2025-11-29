import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-8 bg-[#0e0d0b] text-mustard/70 font-classic overflow-hidden">

      <div className="absolute inset-0 opacity-[0.15] film-grain-footer pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-5 bg-repeat-x footer-sprockets opacity-[0.12]" />
      <div className="relative w-full border-t border-mustard/30" />

      <div
        className="
        relative z-20
        py-3 sm:py-4
        flex flex-col sm:flex-row gap-2 sm:gap-4
        justify-center items-center
        text-center
        px-3
        text-xs sm:text-sm font-semibold
      "
      >
       
        <a
          href="/certificate.cer"
          download
          className="hover:text-gold transition ml-4"
        >
          Download Certificate (Sample Projector Cert)
        </a>
        <a
          href="/dcpDigest.xml"
          download
          className="hover:text-gold transition ml-4"
        >
          Download DCP Digest (Sample DCP Digest)
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-mustard/40 to-transparent animate-hum-line" />

      <div className="relative z-20 py-3 sm:py-5 text-center">
        <p className="text-[10px] sm:text-xs tracking-wide">
          © {year} • Crafted with precision by {" "}
          <a
            href="https://antiz.xyz"
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:text-mustard underline-offset-4 hover:underline"
          >
            Antiz
          </a>
        </p>
      </div>
      
    </footer>
  );
}

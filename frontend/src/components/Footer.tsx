import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-8 bg-[#0e0d0b] text-[#caa86b]/70 py-6 border-t border-[#caa86b]/20">
      <div className="page-shell">
        <div className="content-shell">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <a
              href="/certificate.cer"
              download
              className="text-xs hover:text-[#caa86b] transition"
            >
              Sample Certificate
            </a>
            <span className="hidden sm:inline text-[#caa86b]/30">|</span>
            <a
              href="/dcpDigest.xml"
              download
              className="text-xs hover:text-[#caa86b] transition"
            >
              Sample DCP Digest
            </a>
          </div>
          <p className="text-center text-xs text-[#caa86b]/50">
            c {year} | DCP-KDM System |{" "}
            <a
              href="https://antiz.xyz"
              target="_blank"
              rel="noreferrer"
              className="text-[#caa86b] hover:underline"
            >
              Antiz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

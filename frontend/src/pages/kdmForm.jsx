import React, { useState, useRef } from "react";

export default function KdmFormComponent() {
  const [dcpDigest, setDcpDigest] = useState(null);
  const [projectorCert, setProjectorCert] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  
  const digestRef = useRef(null);
  const certRef = useRef(null);

  
  const API_URL = "https://dcp-kdm-system.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dcpDigest", dcpDigest);
    formData.append("projectorCertificate", projectorCert);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    setMessage("Processing...");

    try {
      const resp = await fetch(`${API_URL}/api/kdm/generate`, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        setMessage("Error: " + (await resp.text()));
        return;
      }

      
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_kdm.xml";
      document.body.appendChild(a);
      a.click();
      a.remove();

      
      setDcpDigest(null);
      setProjectorCert(null);
      setStartDate("");
      setEndDate("");
      setMessage("KDM generated and downloaded!");

      
      if (digestRef.current) digestRef.current.value = "";
      if (certRef.current) certRef.current.value = "";

    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-5
        p-4 sm:p-5
        rounded-xl
        bg-[#161412]/70 backdrop-blur-md
        border border-mustard/40
        shadow-[0_0_14px_rgba(0,0,0,0.35)]
      "
    >
      <h2 className="text-center text-base sm:text-lg md:text-xl font-retro text-gold tracking-wide mb-2">
        DCP-KDM Generator
      </h2>

      <div className="space-y-3">
        <div>
          <label className="block text-[10px] sm:text-xs text-mustard/85 mb-1">
            DCP Digest (.xml)
          </label>
          <input
            ref={digestRef}
            required
            type="file"
            onChange={(e) => setDcpDigest(e.target.files[0])}
            className="w-full border border-mustard/40 bg-charcoal/80 px-2 py-1.5 rounded-md text-mustard text-[11px] sm:text-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] sm:text-xs text-mustard/85 mb-1">
            Projector Certificate (.cet)
          </label>
          <input
            ref={certRef}
            required
            type="file"
            onChange={(e) => setProjectorCert(e.target.files[0])}
            className="w-full border border-mustard/40 bg-charcoal/80 px-2 py-1.5 rounded-md text-mustard text-[11px] sm:text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] sm:text-xs text-mustard/85 mb-1">
            Start Date
          </label>
          <input
            required
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-mustard/40 bg-charcoal/80 px-2 py-1.5 rounded-md text-mustard"
          />
        </div>

        <div>
          <label className="block text-[10px] sm:text-xs text-mustard/85 mb-1">
            End Date
          </label>
          <input
            required
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-mustard/40 bg-charcoal/80 px-2 py-1.5 rounded-md text-mustard"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-gold w-full sm:w-auto py-2 px-4 rounded-lg text-charcoal uppercase block mx-auto"
      >
        Generate KDM
      </button>

      <div className="text-center text-[10px] sm:text-xs text-mustard/75">
        {message}
      </div>
    </form>
  );
}

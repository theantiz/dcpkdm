"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function KdmFormComponent() {
  const [dcpDigest, setDcpDigest] = useState<File | null>(null);
  const [primaryCert, setPrimaryCert] = useState<File | null>(null);
  const [secondaryCert, setSecondaryCert] = useState<File | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const digestRef = useRef<HTMLInputElement | null>(null);
  const primaryCertRef = useRef<HTMLInputElement | null>(null);
  const secondaryCertRef = useRef<HTMLInputElement | null>(null);

  const API_URL = "https://dcp-kdm-system.onrender.com";
  const shortName = (name = "") => (name.length > 34 ? `${name.slice(0, 16)}...${name.slice(-12)}` : name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dcpDigest || !primaryCert) {
      setMessage("Error: DCP digest and primary certificate are required.");
      return;
    }

    const formData = new FormData();
    formData.append("dcpDigest", dcpDigest);
    formData.append("projectorCertificate", primaryCert);
    if (secondaryCert) formData.append("projectorCertificate2", secondaryCert);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    setMessage("Processing...");
    setIsLoading(true);

    try {
      const resp = await fetch(`${API_URL}/api/kdm/generate`, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        setMessage("Error: " + (await resp.text()));
        setIsLoading(false);
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
      setPrimaryCert(null);
      setSecondaryCert(null);
      setStartDate("");
      setEndDate("");

      setMessage("KDM generated and downloaded!");

      if (digestRef.current) digestRef.current.value = "";
      if (primaryCertRef.current) primaryCertRef.current.value = "";
      if (secondaryCertRef.current) secondaryCertRef.current.value = "";

      setIsLoading(false);

    } catch (err) {
      setMessage("Error: " + err.message);
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Generate KDM</CardTitle>
        <CardDescription>
          Upload required files and generate KDM XML.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-xl border border-[#caa86b]/20 bg-[#1b1712]/70 p-3">
            <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#caa86b]/85">Upload Requirements</p>
            <div className="grid gap-2 text-[11px] text-[#d9c9ac]/80 sm:grid-cols-3">
              <div>DCP Digest: 1 XML file</div>
              <div>Primary Cert: required</div>
              <div>Secondary Cert: optional</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block" htmlFor="digest-upload">DCP Digest (.xml)</Label>
              <Input
                ref={digestRef}
                required
                id="digest-upload"
                type="file"
                accept=".xml"
                onChange={(e) => setDcpDigest(e.target.files[0])}
              />
              <p className="mt-1 text-[11px] text-[#caa86b]/65">
                Selected: {dcpDigest ? shortName(dcpDigest.name) : "No file selected"}
              </p>
            </div>

            <div>
              <Label className="mb-1.5 block" htmlFor="primary-cert-upload">
                Primary Projector Certificate (.cer/.crt)
              </Label>
              <Input
                ref={primaryCertRef}
                required
                id="primary-cert-upload"
                type="file"
                accept=".cer,.crt"
                onChange={(e) => setPrimaryCert(e.target.files[0])}
              />
              <p className="mt-1 text-[11px] text-[#caa86b]/65">
                Selected: {primaryCert ? shortName(primaryCert.name) : "No file selected"}
              </p>
            </div>

            <div>
              <Label className="mb-1.5 block" htmlFor="secondary-cert-upload">
                Secondary Certificate (Optional)
              </Label>
              <Input
                ref={secondaryCertRef}
                id="secondary-cert-upload"
                type="file"
                accept=".cer,.crt"
                onChange={(e) => setSecondaryCert(e.target.files[0])}
              />
              <p className="mt-1 text-[11px] text-[#caa86b]/65">
                Selected: {secondaryCert ? shortName(secondaryCert.name) : "Not provided"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block" htmlFor="start-date">Start Date</Label>
              <Input
                required
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block" htmlFor="end-date">End Date</Label>
              <Input
                required
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate KDM"}
          </Button>

          {message && (
            <div className={`text-center text-xs ${message.startsWith("Error") ? "text-red-300" : "text-[#caa86b]/85"}`}>
              {message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}


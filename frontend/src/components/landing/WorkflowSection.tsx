import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function WorkflowSection({ isWorkflowLocked, activeWorkflowStep, steps }) {
  const visualSteps = [...steps].reverse();

  return (
    <section id="how-it-works" className="page-shell py-14 sm:py-20 bg-[#0d0c0b]/70 border-y border-[#caa86b]/10">
      <Card className={`content-shell workflow-shell grid gap-10 lg:grid-cols-[1fr_1.3fr] items-center p-6 sm:p-8 ${isWorkflowLocked ? "ring-1 ring-[#f1c774]/35" : ""}`}>
        <div className="space-y-4">
          <p className="text-xs tracking-[0.25em] text-[#caa86b]/70">WORKFLOW</p>
          <h3 className="text-3xl sm:text-4xl font-semibold text-[#f7edd6] leading-tight">
            A four-step pipeline with zero friction.
          </h3>
          <p className="text-[#d9c9ac]/75">
            Every touchpoint is designed for projectionists: drag-and-drop, clear time windows,
            real-time compliance checks, and a download that just works.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Card className="rounded-xl border-[#caa86b]/20 bg-[#13110f]/75 p-3">
              <p className="text-[11px] text-[#caa86b]/70 uppercase tracking-[0.14em]">Avg Generate</p>
              <p className="text-2xl font-semibold text-[#f5e8cf]">42s</p>
            </Card>
            <Card className="rounded-xl border-[#caa86b]/20 bg-[#13110f]/75 p-3">
              <p className="text-[11px] text-[#caa86b]/70 uppercase tracking-[0.14em]">Audit Coverage</p>
              <p className="text-2xl font-semibold text-[#f5e8cf]">100%</p>
            </Card>
          </div>
          <Card className="rounded-xl border-[#f1c774]/35 bg-[#15110c]/85 p-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#caa86b]/70">Active Step</p>
            <p className="text-lg font-semibold text-[#f5e8cf]">
              {String(activeWorkflowStep + 1).padStart(2, "0")} - {steps[activeWorkflowStep].title}
            </p>
          </Card>
        </div>
        <div className="space-y-5">
          <Card className="border-[#f1c774]/35 bg-[#120f0b]/90 p-5 sm:p-6 min-h-[240px] transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-[#caa86b]/20 text-[#f1c774] border-[#f1c774]/40">
                STEP {steps[activeWorkflowStep].num}
              </Badge>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#caa86b]/70">
                Scroll to reveal
              </p>
            </div>
            <h4 className="text-3xl sm:text-4xl font-semibold text-[#f7edd6] leading-tight">
              {steps[activeWorkflowStep].title}
            </h4>
            <p className="mt-4 text-xl text-[#d9c9ac]/90">
              {steps[activeWorkflowStep].desc}
            </p>
          </Card>

          <Card className="border-[#caa86b]/25 bg-[#13110f]/70 p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              {visualSteps.map((step, i) => {
                const originalIndex = steps.length - 1 - i;
                return (
                <div key={step.num} className="flex items-center gap-3 flex-1">
                  <div
                    className={`h-3.5 w-3.5 rounded-full border transition-all duration-300 ${
                      originalIndex < activeWorkflowStep
                        ? "bg-[#f1c774] border-[#f1c774]"
                        : originalIndex === activeWorkflowStep
                          ? "bg-[#f1c774]/80 border-[#f1c774] scale-125"
                          : "bg-transparent border-[#caa86b]/40"
                    }`}
                  />
                  {i < visualSteps.length - 1 && (
                    <div
                      className={`h-[2px] flex-1 transition-all duration-300 ${
                        originalIndex <= activeWorkflowStep ? "bg-[#f1c774]" : "bg-[#caa86b]/20"
                      }`}
                    />
                  )}
                </div>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] sm:text-xs text-[#caa86b]/80">
              {visualSteps.map((step) => (
                <p key={step.title} className="truncate">{step.title}</p>
              ))}
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}

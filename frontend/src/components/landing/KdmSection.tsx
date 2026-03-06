import React from "react";
import KdmFormComponent from "../forms/KdmForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export default function KdmSection({ formSessionKey }) {
  return (
    <section id="kdm-form" className="page-shell pb-20">
      <div className="content-shell space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl text-[#f7edd6] leading-tight">Generate KDM</CardTitle>
            <CardDescription>Upload your files, set the time window, and generate KDM XML.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Separator />
          </CardContent>
        </Card>
        <KdmFormComponent key={formSessionKey} />
      </div>
    </section>
  );
}

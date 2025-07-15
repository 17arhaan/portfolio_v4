"use client"

import React from "react"
import { Award } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import CertificationsGrid from "@/components/ui/certifications-grid"

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-6">
        <SectionHeader title="Certifications" icon={<Award className="w-6 h-6" />} />

        <CertificationsGrid />
      </div>
    </section>
  )
} 
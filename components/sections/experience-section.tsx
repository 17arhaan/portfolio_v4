"use client"

import React from "react"
import { Briefcase } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import EnhancedExperienceSection from "@/components/ui/enhanced-experience-section"

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-6">
        <SectionHeader title="Experience" icon={<Briefcase className="w-6 h-6" />} />

        <div className="mt-16">
          <EnhancedExperienceSection />
        </div>
      </div>
    </section>
  )
} 
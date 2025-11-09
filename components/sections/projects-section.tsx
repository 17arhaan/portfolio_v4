"use client"

import React from "react"
import { Briefcase } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import ProjectsGrid from "@/components/ui/projects-grid"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto px-6">
        <SectionHeader title="Projects" icon={<Briefcase className="w-6 h-6" />} />

        {/* Projects Grid */}
        <ProjectsGrid />
      </div>
    </section>
  )
} 
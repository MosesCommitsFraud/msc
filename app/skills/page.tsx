"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Code, Languages, GraduationCap, Briefcase } from "lucide-react"

// SVG icons from public folder
const PythonIcon = "/icons/python.svg"
const ReactIcon = "/icons/React_light.svg"
const NextJSIcon = "/icons/nextjs_icon_dark.svg"
const NodeJSIcon = "/icons/nodejs.svg"
const GitIcon = "/icons/git.svg"
const TypeScriptIcon = "/icons/typescript.svg"
const AngularIcon = "/icons/angular.svg"
const MySQLIcon = "/icons/mysql.svg"

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const technicalSkills = [
    { name: "Python", level: "Advanced", icon: PythonIcon, color: "#3776ab" },
    { name: "Next.js", level: "Advanced", icon: NextJSIcon, color: "#000000" },
    { name: "Angular", level: "Advanced", icon: AngularIcon, color: "#dd0031" },
    { name: "MySQL", level: "Intermediate", icon: MySQLIcon, color: "#00546B" },
    { name: "React", level: "Advanced", icon: ReactIcon, color: "#61dafb" },
    { name: "TypeScript", level: "Advanced", icon: TypeScriptIcon, color: "#3178c6" },
    { name: "Node.js", level: "Intermediate", icon: NodeJSIcon, color: "#339933" },
    { name: "Git", level: "Advanced", icon: GitIcon, color: "#f05032" },
  ]

  const languages = [
    { name: "German", level: "Native (C2)", icon: Languages, color: "#000000" },
    { name: "English", level: "Fluent (C1)", icon: Languages, color: "#012169" },
  ]

  const education = [
    {
      institution: "Duale Hochschule Baden-Württemberg",
      degree: "Wirtschaftsinformatik, Sales & Consulting",
      location: "Mannheim, BW",
      period: "01.10.2022 – 30.09.2025",
      current: true,
    },
    {
      institution: "Universität Mannheim",
      degree: "Wirtschaftsinformatik (ohne Abschluss)",
      location: "Mannheim, BW",
      period: "22.09.2020 – 27.07.2022",
      current: false,
    },
    {
      institution: "Leibniz-Gymnasium Rottweil",
      degree: "Leistungsfächer: Wirtschaft, Chemie",
      location: "Rottweil, BW",
      period: "Graduated 31.07.2020",
      current: false,
    },
  ]

  const experience = [
    {
      company: "PHOENIX International Holdings GmbH",
      role: "Dual Student",
      location: "Mannheim / Fürth, BW / Bayern",
      period: "Sep. 2022 – Present",
      current: true,
      responsibilities: [
        "Automated processes using RPA tools, including Excel integration and web queries",
        "Created BI migration guides and developed Power BI templates for standardized reporting",
        "Gained insights into SAP systems and SAP ServiceNow, supported training documentation",
        "Led IT process transitions from ITIL v3 to ITIL 4 for process standardization and efficiency",
        "Analyzed phishing risks and developed practical awareness and prevention concepts",
      ],
    },
  ]

  const projects = [
    {
      name: "Become Consulting",
      role: "Developer",
      location: "Mannheim",
      period: "Sep. 2024 – Apr. 2025",
      description:
        "Conceptualized and led workshops for a local CBD shop, developed targeted business strategies, built webshop and online presence, implemented profile website for the flower shop",
    },
    {
      name: "Evalo – Feedback Analysis Tool",
      role: "Developer",
      location: "Mannheim",
      period: "Sep. 2024 – Mar 2025",
      description:
        "Developed scalable feedback and sentiment analysis tool with Next.js and Supabase, featuring comprehensive authentication and authorization mechanisms",
    },
    {
      name: "Stundenstapel",
      role: "Developer",
      location: "Mannheim",
      period: "Feb. 2024 – Mai 2024",
      description:
        "Designed and developed 'Stundenstapel' web application for school inventory and loan management with modular architecture, implemented comprehensive authentication with Angular and Firebase",
    },
    {
      name: "Salamon (Yu-Gi-Oh! Deck Builder)",
      role: "Developer",
      location: "Mannheim",
      period: "Sep. 2024 – Mai 2025",
      description:
        "Developed deck builder for Yu-Gi-Oh! card game with multiple self-trained ML models in Python, frontend built with Next.js, implemented Azure-hosted RAG with official rulebook and card information",
    },
  ]

  return (
    <div
      className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      {/* Top fade overlay */}
      <div className="fixed left-0 right-0 h-14 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto px-6 py-32">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#888] hover:text-[#e5e5e5] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>
          <h1 className="text-2xl font-medium mb-4 text-[#e5e5e5]">Skills & Experience</h1>
          <p className="text-[#888] text-base">
            Technical expertise, educational background, and professional journey.
          </p>
        </header>

        {/* Technical Skills */}
        <section className="mb-20">
          <h2 className="text-lg font-medium mb-10 text-[#e5e5e5] flex items-center gap-2">
            <Code className="w-5 h-5" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {technicalSkills.map((skill) => {
              const isHovered = hoveredSkill === skill.name
              return (
                <div
                  key={skill.name}
                  className="group p-4 rounded-lg border border-[#333] hover:border-[#555] transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 transition-all duration-200">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full transition-all duration-200"
                        style={{
                          filter: isHovered ? "none" : "grayscale(100%) brightness(0.7) opacity(0.6)",
                        }}
                      />
                    </div>
                    <span className="text-[#e5e5e5] font-medium text-sm">{skill.name}</span>
                  </div>
                  <span className="text-[#888] text-xs">{skill.level}</span>
                </div>
              )
            })}
          </div>
        </section>


        {/* Education Timeline */}
        <section className="mb-20">
          <h2 className="text-lg font-medium mb-10 text-[#e5e5e5] flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h2>
          <div className="space-y-10">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-8">
                {/* Timeline line */}
                {index !== education.length - 1 && <div className="absolute left-2 top-8 w-px h-16 bg-[#333]"></div>}
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-2 w-4 h-4 rounded-full border-2 ${
                    edu.current ? "bg-[#6b46c1] border-[#6b46c1]" : "bg-[#1a1a1a] border-[#555]"
                  }`}
                ></div>

                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-[#e5e5e5] font-medium">{edu.institution}</h3>
                    <div className="flex items-center gap-4 text-[#888] text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#888] text-sm">{edu.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-20">
          <h2 className="text-lg font-medium mb-10 text-[#e5e5e5] flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Professional Experience
          </h2>
          <div className="space-y-10">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8">
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-2 w-4 h-4 rounded-full border-2 ${
                    exp.current ? "bg-[#6b46c1] border-[#6b46c1]" : "bg-[#1a1a1a] border-[#555]"
                  }`}
                ></div>

                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-[#e5e5e5] font-medium">{exp.company}</h3>
                      <p className="text-[#888] text-sm">{exp.role}</p>
                    </div>
                    <div className="flex items-center gap-4 text-[#888] text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-[#888] text-sm">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#555] mt-1.5">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-lg font-medium mb-10 text-[#e5e5e5] flex items-center gap-2">
            <Code className="w-5 h-5" />
            Key Projects
          </h2>
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div key={index} className="p-6 rounded-lg border border-[#333] hover:border-[#555] transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-[#e5e5e5] font-medium">{project.name}</h3>
                    <p className="text-[#888] text-sm">{project.role}</p>
                  </div>
                  <div className="flex items-center gap-4 text-[#888] text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#888] text-sm leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

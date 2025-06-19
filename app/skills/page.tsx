"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Code, MapPin } from "lucide-react"

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
    { name: "Python", icon: PythonIcon, color: "#3776ab" },
    { name: "Next.js", icon: NextJSIcon, color: "#000000" },
    { name: "Angular", icon: AngularIcon, color: "#dd0031" },
    { name: "MySQL", icon: MySQLIcon, color: "#00546B" },
    { name: "React", icon: ReactIcon, color: "#61dafb" },
    { name: "TypeScript", icon: TypeScriptIcon, color: "#3178c6" },
    { name: "Node.js", icon: NodeJSIcon, color: "#339933" },
    { name: "Git", icon: GitIcon, color: "#f05032" },
  ]

  const experiences = [
    {
      type: "work",
      title: "PHOENIX International Holdings",
      role: "Dual Student",
      location: "Mannheim",
      startDate: "2022-09-01",
      endDate: null,
      highlights: ["RPA & Process Automation", "BI Templates & SAP Systems", "ITIL Process Optimization", "Cybersecurity Prevention & Awareness"],
      status: "active",
    },
    {
      type: "education",
      title: "DHBW Baden-Württemberg",
      role: "Wirtschaftsinformatik, Sales & Consulting",
      location: "Mannheim",
      startDate: "2022-10-01",
      endDate: "2025-09-30",
      highlights: ["Dual Study Program"],
      status: "active",
    },
    {
      type: "education",
      title: "Leibniz-Gymnasium Rottweil",
      role: "Abitur",
      location: "Rottweil",
      startDate: "2011-09-01",
      endDate: "2020-07-31",
      highlights: ["Economics & Chemistry Focus"],
      status: "completed",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleDateString("en", { month: "short" }).toUpperCase(),
      year: date.getFullYear(),
    }
  }

  const getDuration = (start: string, end: string | null) => {
    const startDate = new Date(start)
    const endDate = end ? new Date(end) : new Date()
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) return `${months}mo`
    if (remainingMonths === 0) return `${years}y`
    return `${years}y ${remainingMonths}mo`
  }

  return (
    <div
      className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
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
          <p className="text-[#888] text-base">Technical expertise and professional journey.</p>
        </header>

        {/* Experience Cards */}
        <section className="mb-20">
          <h2 className="text-lg font-medium mb-12 text-[#e5e5e5]">Journey</h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const startDate = formatDate(exp.startDate)
              const endDate = exp.endDate ? formatDate(exp.endDate) : null
              const duration = getDuration(exp.startDate, exp.endDate)

              return (
                <div key={index} className="relative group">
                  {/* Duration Badge */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <div
                      className={`
                      px-3 py-1 rounded-full text-xs font-mono border
                      ${
                        exp.status === "active"
                          ? "bg-[#6b46c1] border-[#6b46c1] text-white"
                          : "bg-[#333] border-[#555] text-[#888]"
                      }
                    `}
                    >
                      {duration}
                    </div>
                  </div>

                  {/* Main Card */}
                  <div className="relative overflow-hidden rounded-xl">
                                         {/* Date Sidebar */}
                     <div className="absolute left-0 top-0 bottom-0 w-20 bg-[#333] rounded-l-xl flex flex-col items-center justify-center text-center">
                       {endDate && (
                         <>
                           <div className="text-[#888] text-xs font-mono mb-1">{endDate.month}</div>
                           <div className="text-white text-xl font-bold">{endDate.year}</div>
                           <div className="w-6 h-px bg-[#555] my-3"></div>
                         </>
                       )}

                       {!endDate && (
                         <>
                           <div className="w-2 h-2 rounded-full bg-[#6b46c1] animate-pulse"></div>
                           <div className="w-6 h-px bg-[#555] my-3"></div>
                         </>
                       )}

                       <div className="text-[#888] text-xs font-mono mb-1">{startDate.month}</div>
                       <div className="text-white text-xl font-bold">{startDate.year}</div>
                     </div>

                    {/* Content */}
                    <div className="pl-24 pr-6 py-6 bg-[#222] hover:bg-[#252525] transition-colors rounded-r-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-[#e5e5e5] font-medium text-lg mb-1">{exp.title}</h3>
                          <p className="text-[#888] text-base">{exp.role}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[#666] text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full bg-[#333] text-[#ccc] border border-[#444]"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-lg font-medium mb-8 text-[#e5e5e5] flex items-center gap-2">
            <Code className="w-5 h-5" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {technicalSkills.map((skill) => {
              const isHovered = hoveredSkill === skill.name
              return (
                <div
                  key={skill.name}
                  className="group transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="w-10 h-10 transition-all duration-200">
                    <img
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      className="w-full h-full transition-all duration-200"
                      style={{
                        filter: isHovered ? "none" : "grayscale(100%) brightness(0.7) opacity(0.6)",
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

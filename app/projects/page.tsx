"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react"

// SVG icons from public folder
const PythonIcon = "/icons/python.svg"
const ReactIcon = "/icons/React_light.svg"
const NextJSIcon = "/icons/nextjs_icon_dark.svg"
const NodeJSIcon = "/icons/nodejs.svg"
const TypeScriptIcon = "/icons/typescript.svg"
const AngularIcon = "/icons/angular.svg"
const MySQLIcon = "/icons/mysql.svg"

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const activeProjects = [
    {
      title: "Portfolio v3",
      subtitle: "Personal Website & Portfolio",
      description:
        "A modern, interactive portfolio showcasing my work and skills. Features custom animations, responsive design, and creative layouts. Built with Next.js and deployed on Vercel with continuous integration.",
      lastUpdated: "2 days ago",
      status: "active",
      type: "Personal",
      technologies: [
        { name: "Next.js", icon: NextJSIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
      ],
      highlights: ["Custom Animations", "Responsive Design", "Creative Layouts"],
      impact: "Showcases professional work and technical skills",
    },
    {
      title: "AI Learning Platform",
      subtitle: "Educational Technology Platform",
      description:
        "An adaptive learning platform that uses AI to personalize educational content for students. Features real-time progress tracking, intelligent content recommendations, and comprehensive analytics for educators.",
      lastUpdated: "1 week ago",
      status: "active",
      type: "Study Project",
      technologies: [
        { name: "Next.js", icon: NextJSIcon },
        { name: "Python", icon: PythonIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
      ],
      highlights: ["AI Personalization", "Real-time Analytics", "Adaptive Learning"],
      impact: "Enhances learning outcomes through personalization",
    },
    {
      title: "Smart Campus Navigator",
      subtitle: "AR-Enhanced University Navigation",
      description:
        "An augmented reality application that helps students navigate university campuses with real-time directions, building information, and event notifications. Features indoor mapping, accessibility routes, and integration with campus services.",
      lastUpdated: "3 weeks ago",
      status: "hold",
      type: "Study Project",
      technologies: [
        { name: "React", icon: ReactIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
        { name: "Node.js", icon: NodeJSIcon },
      ],
      highlights: ["Augmented Reality", "Indoor Mapping", "Accessibility Features"],
      impact: "Improves campus navigation and accessibility",
    },
  ]

  const completedProjects = [
    {
      title: "Salamon",
      subtitle: "AI-Powered Card Game Deck Builder",
      description: "Intelligent deck building assistant for Yu-Gi-Oh! with machine learning optimization.",
      lastUpdated: "3 months ago",
      status: "completed",
      type: "Study Project",
      technologies: [
        { name: "Python", icon: PythonIcon },
        { name: "Next.js", icon: NextJSIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
      ],
      highlights: ["Machine Learning", "Azure RAG", "Strategy AI"],
      category: "ai",
    },
    {
      title: "Evalo",
      subtitle: "Feedback Analysis Platform",
      description: "Scalable sentiment analysis tool for educational feedback with comprehensive data security.",
      lastUpdated: "3 months ago",
      status: "completed",
      type: "Study Project",
      technologies: [
        { name: "Next.js", icon: NextJSIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
      ],
      highlights: ["Sentiment Analysis", "Authentication"],
      category: "analytics",
    },
    {
      title: "Stundenstapel",
      subtitle: "School Management System",
      description: "Comprehensive web application for school inventory and loan management with modular architecture.",
      lastUpdated: "8 months ago",
      status: "completed",
      type: "Study Project",
      technologies: [
        { name: "Angular", icon: AngularIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
      ],
      highlights: ["Modular Architecture", "User Management"],
      category: "management",
    },
    {
      title: "Become Consulting",
      subtitle: "Student Consulting Firm",
      description: "Co-founded consulting firm developing business strategies and process optimization solutions.",
      lastUpdated: "2 months ago",
      status: "completed",
      type: "Business",
      technologies: [],
      highlights: ["Business Strategy", "Process Optimization"],
      category: "business",
    },
  ]

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
          <h1 className="text-2xl font-medium mb-4 text-[#e5e5e5]">Projects</h1>
          <p className="text-[#888] text-base">
            A collection of things I've built — from AI-powered applications to business solutions.
          </p>
        </header>

        {/* Active Projects */}
        <section className="mb-20">
          <div className="space-y-8">
            {activeProjects.map((project, index) => (
              <div key={index} className="relative group">
                {/* Floating status indicator */}
                <div className="absolute -top-4 left-8 z-10">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium ${
                      project.status === "hold" ? "bg-[#f59e0b] border-[#f59e0b]" : "bg-[#6b46c1] border-[#6b46c1]"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 bg-white rounded-full ${project.status === "hold" ? "" : "animate-pulse"}`}
                    ></div>
                    {project.status === "hold" ? "On hold" : "Currently building"}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#222] to-[#1a1a1a] rounded-2xl p-8 border border-[#333] hover:border-[#444] transition-all duration-300">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-semibold text-[#e5e5e5]">{project.title}</h3>
                        <span className="px-3 py-1 bg-[#333] text-[#888] rounded-full text-xs">{project.type}</span>
                      </div>
                      <p className="text-[#888] text-lg mb-4">{project.subtitle}</p>
                      <p className="text-[#ccc] leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#888]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {project.lastUpdated}</span>
                      </div>
                      <div className="w-px h-4 bg-[#444]"></div>
                      <span>{project.impact}</span>
                    </div>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="flex items-center gap-3">
                        <span className="text-[#888] text-sm">Built with:</span>
                        <div className="flex items-center gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <div key={techIndex} className="w-6 h-6">
                              <img 
                                src={tech.icon || "/placeholder.svg"} 
                                alt={tech.name} 
                                className="w-full h-full object-contain" 
                                style={{ imageRendering: 'crisp-edges' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#333] text-[#ccc] rounded-full text-sm border border-[#444]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-[#333]">
                      <button className="flex-1 px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm text-[#e5e5e5] transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Demo
                      </button>
                      <button className="px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm text-[#e5e5e5] transition-colors">
                        <Github className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Projects */}
        <section>
          <h2 className="text-lg font-medium mb-8 text-[#e5e5e5]">More Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {completedProjects.map((project, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="h-full bg-[#222] rounded-xl p-6 border border-[#333] hover:border-[#444] transition-all duration-200 hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-[#e5e5e5]">{project.title}</h3>
                    <div
                      className={`w-3 h-3 rounded-full ${project.status === "active" ? "bg-[#6b46c1]" : "bg-[#555]"}`}
                    ></div>
                  </div>

                  <p className="text-[#888] text-sm mb-3">{project.subtitle}</p>
                  <p className="text-[#ccc] text-sm mb-4 leading-relaxed">{project.description}</p>

                  {/* Technologies */}
                  {project.technologies.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="w-5 h-5">
                          <img
                            src={tech.icon || "/placeholder.svg"}
                            alt={tech.name}
                            className="w-full h-full object-contain transition-all duration-200"
                            style={{
                              imageRendering: 'crisp-edges',
                              filter:
                                hoveredProject === project.title
                                  ? "none"
                                  : "grayscale(100%) brightness(0.7) opacity(0.6)",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.highlights.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-[#333] text-[#888] rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-[#333] space-y-3">
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-xs text-[#e5e5e5] transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="w-3 h-3" />
                        View Demo
                      </button>
                      <button className="px-3 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-xs text-[#e5e5e5] transition-colors">
                        <Github className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-[#666]">Updated {project.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

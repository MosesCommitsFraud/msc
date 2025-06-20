"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, X } from "lucide-react"
import { getRepoLastCommit } from "../../lib/github"

// SVG icons from public folder
const PythonIcon = "/icons/python.svg"
const ReactIcon = "/icons/React_light.svg"
const NextJSIcon = "/icons/nextjs_icon_dark.svg"
const NodeJSIcon = "/icons/nodejs.svg"
const TypeScriptIcon = "/icons/typescript.svg"
const AngularIcon = "/icons/angular.svg"
const MySQLIcon = "/icons/mysql.svg"
const TailwindIcon = "/icons/tailwindcss.svg"
const JSONIcon = "/icons/json.svg"
const AzureIcon = "/icons/azure.svg"
const GeminiIcon = "/icons/gemini.svg"
const DockerIcon = "/icons/docker.svg"
const FastAPIIcon = "/icons/fastapi.svg"
const SupabaseIcon = "/icons/supabase.svg"
const FirebaseIcon = "/icons/firebase.svg"

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [repoUpdates, setRepoUpdates] = useState<Record<string, string>>({})
  const [modalImage, setModalImage] = useState<string | null>(null)

  // Disable scrolling when modal is open
  useEffect(() => {
    if (modalImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modalImage])

  const activeProjects = [
    {
      title: "Portfolio Page",
      description:
        "A modern, interactive portfolio showcasing my work and skills. Features custom animations, responsive design, and creative layouts. Built with Next.js and deployed on Vercel with continuous integration.",
      repositories: {
        github: "MosesCommitsFraud/msc"
      },
      demoUrl: null,
      status: "active",
      type: "Personal",
      technologies: [
        { name: "Next.js", icon: NextJSIcon },
        { name: "Tailwind", icon: TailwindIcon },
      ],
      highlights: ["Custom Animations", "Responsive Design", "Creative Layouts"],
      impact: "Showcases professional work and technical skills",
    },
    {
      title: "Hiraeth Theme",
      description:
        "My own custom theme based on Cursor Dark. I just like purple so i made it purple.",
      repositories: {
        github: "MosesCommitsFraud/hiraeth"
      },
      demoUrl: "https://marketplace.visualstudio.com/items?itemName=MosesCommitsFraud.hiraeth",
      status: "active",
      type: "Personal",
      technologies: [
        { name: "JSON", icon: JSONIcon },
      ],
      highlights: ["Purple", "Dark Theme", "Cursor"],
      impact: "I just like purple",
    },
    {
      title: "Cyberpunk 2077 UI",
      description:
        "Fun project to recreate the UI of Cyberpunk 2077 in NextJs. I've been working on and off on this for a while now.",
      repositories: {
        github: "MosesCommitsFraud/CyberpunkUI"
      },
      demoUrl: "/assets/CyberpunkUI.png",
      status: "hold",
      type: "Fun Project",
      technologies: [
        { name: "NextJs", icon: NextJSIcon },
        { name: "Tailwind", icon: TailwindIcon },
      ],
      highlights: ["Cyberpunk 2077", "Glows and Complex Polygons"],
      impact: "Cyberpunk UI recreated in NextJs",
    },
  ]

  const completedProjects = [
    {
      title: "Salamon",
      description: "Intelligent deck building assistant for Yu-Gi-Oh! Includes a RAG model and several self-trained models based on Embeddings.",
      repositories: {
        frontend: "MosesCommitsFraud/Salamon-Frontend",
        backend: "MosesCommitsFraud/Salamon-Backend"
      },
      demoUrl: null,
      status: "completed",
      type: "Study Project",
      technologies: [
        { name: "Python", icon: PythonIcon },
        { name: "Next.js", icon: NextJSIcon },
        { name: "Tailwind", icon: TailwindIcon },
        { name: "Azure RAG", icon: AzureIcon },
        { name: "Gemini", icon: GeminiIcon },
        { name: "FastAPI", icon: FastAPIIcon },
      ],
      highlights: ["Machine Learning", "Azure RAG", "Gemini"],
      category: "ai",
    },
    {
      title: "Evalo",
      description: "Scalable sentiment analysis tool for educational feedback for professors. Has been pushed to production and is has been tested.",
      repositories: {
        frontend: "MosesCommitsFraud/frontend-evalo",
        huggingface: "spaces/MosesCommitsFraud/BERTSentiment/tree/main"
      },
      demoUrl: "https://frontend-evalo.vercel.app/",
      status: "completed",
      type: "Study Project",
      technologies: [
        { name: "Next.js", icon: NextJSIcon },
        { name: "Tailwind", icon: TailwindIcon },
        { name: "Python", icon: PythonIcon },
        { name: "Docker", icon: DockerIcon },
        { name: "FastAPI", icon: FastAPIIcon },
        { name: "Supabase", icon: SupabaseIcon },    
      ],
      highlights: ["Sentiment Analysis", "Multitenancy"],
      category: "analytics",
    },
    {
      title: "Stundenstapel",
      description: "Comprehensive web application for school inventory. Has been pushed to production and has been tested.",
      repositories: {
        github: "https://github.com/cephalofoil/stundenstapel-frontend"
      },
      demoUrl: null,
      status: "completed",
      type: "Study Project",
      technologies: [
        { name: "Angular", icon: AngularIcon },
        { name: "Tailwind", icon: TailwindIcon },
        { name: "Firebase", icon: FirebaseIcon },
      ],
      highlights: ["Modular Architecture", "User Management"],
      category: "management",
    },
    {
      title: "Become Consulting",
      description: "Co-founded consulting firm developing business strategies and developing a web presence for the client.",
      repositories: {
        frontend: "MosesCommitsFraud/become-frontend",
      },
      demoUrl: "https://become-consulting.de",
      status: "completed",
      type: "Business",
      technologies: [
        { name: "Next.js", icon: NextJSIcon },
        { name: "Tailwind", icon: TailwindIcon },
      ],
      highlights: ["Business Strategy", "Web Development"],
      category: "business",
    },
  ]

  // Helper function to parse GitHub repository info from URL or path
  const parseGitHubRepo = (repoString: string): { owner: string; repo: string } | null => {
    if (!repoString) return null;
    
    // Handle full GitHub URLs like "https://github.com/owner/repo"
    if (repoString.startsWith('https://github.com/')) {
      const path = repoString.replace('https://github.com/', '');
      const [owner, repo] = path.split('/');
      return owner && repo ? { owner, repo } : null;
    }
    
    // Handle repo paths like "owner/repo"
    const [owner, repo] = repoString.split('/');
    return owner && repo ? { owner, repo } : null;
  };

  useEffect(() => {
    const fetchRepoUpdates = async () => {
      const updates: Record<string, string> = {}
      
      // Fetch updates for all projects with GitHub repos
      const allProjects = [...activeProjects, ...completedProjects]
      
      for (let i = 0; i < allProjects.length; i++) {
        const project = allProjects[i];
        
        // Check for GitHub repo (prioritize main github, then frontend, then backend)
        const githubRepo = (project.repositories as any).github || (project.repositories as any).frontend || (project.repositories as any).backend
        if (githubRepo) {
          const repoInfo = parseGitHubRepo(githubRepo);
          if (repoInfo) {
            try {
              const lastUpdate = await getRepoLastCommit(repoInfo.owner, repoInfo.repo)
              updates[project.title] = lastUpdate
              
              // Add a small delay between requests to avoid rate limiting
              if (i < allProjects.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 100));
              }
            } catch (error) {
              console.error(`Failed to fetch update for ${project.title}:`, error);
              updates[project.title] = 'Unknown';
            }
          }
        }
      }
      
      setRepoUpdates(updates)
    }

    fetchRepoUpdates()
  }, [])

  // Helper function to get the display date
  const getLastUpdated = (project: any) => {
    return repoUpdates[project.title] || project.lastUpdated
  }

  return (
    <div
      className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      <div className="fixed left-0 right-0 h-14 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a] to-transparent z-40 pointer-events-none"></div>

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
            A collection of things I've built.
          </p>
        </header>

        {/* Active Projects */}
        <section className="mb-20">
          <div className="space-y-8">
            {activeProjects.map((project, index) => (
              <div key={index} className="relative group">
                {/* Floating status indicator */}
                <div className="absolute -top-4 left-8 z-30">
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
                      <p className="text-[#ccc] leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#888]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {getLastUpdated(project)}</span>
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
                                className="w-full h-full object-contain transition-all duration-200 cursor-pointer hover:!filter-none" 
                                style={{ 
                                  imageRendering: 'crisp-edges',
                                  filter: "grayscale(100%) brightness(0.7) opacity(0.6)"
                                }}
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
                      {project.demoUrl && (
                        <button 
                          onClick={() => {
                            if (project.demoUrl) {
                              const url = project.demoUrl as string
                              if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
                                setModalImage(url)
                              } else {
                                window.open(url, '_blank')
                              }
                            }
                          }}
                          className="flex-1 px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm text-[#e5e5e5] transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Demo
                        </button>
                      )}
                      {(project.repositories as any).github && (
                        <button 
                          onClick={() => {
                            const githubRepo = (project.repositories as any).github;
                            const url = githubRepo.startsWith('https://') ? githubRepo : `https://github.com/${githubRepo}`;
                            window.open(url, '_blank');
                          }}
                          className={`px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm text-[#e5e5e5] transition-colors ${
                            !project.demoUrl && Object.keys(project.repositories).length === 1 ? 'flex-1 flex items-center justify-center gap-2' : ''
                          }`}
                        >
                          <Github className="w-4 h-4" />
                          {!project.demoUrl && Object.keys(project.repositories).length === 1 && <span>View Code</span>}
                        </button>
                      )}
                      {(project.repositories as any).frontend && (
                        <button 
                          onClick={() => {
                            const frontendRepo = (project.repositories as any).frontend;
                            const url = frontendRepo.startsWith('https://') ? frontendRepo : `https://github.com/${frontendRepo}`;
                            window.open(url, '_blank');
                          }}
                          className="px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm text-[#e5e5e5] transition-colors flex items-center justify-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          <span>Frontend</span>
                        </button>
                      )}
                      {(project.repositories as any).backend && (
                        <button 
                          onClick={() => {
                            const backendRepo = (project.repositories as any).backend;
                            const url = backendRepo.startsWith('https://') ? backendRepo : `https://github.com/${backendRepo}`;
                            window.open(url, '_blank');
                          }}
                          className="px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm text-[#e5e5e5] transition-colors flex items-center justify-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          <span>Backend</span>
                        </button>
                      )}
                      {(project.repositories as any).huggingface && (
                        <button 
                          onClick={() => window.open(`https://huggingface.co/${(project.repositories as any).huggingface}`, '_blank')}
                          className="px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm text-[#e5e5e5] transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span style={{ filter: 'grayscale(100%)' }}>🤗</span>
                          <span>HF</span>
                        </button>
                      )}
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


                  <p className="text-[#ccc] text-sm mb-4 leading-relaxed">{project.description}</p>

                  {/* Technologies */}
                  {project.technologies.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="w-5 h-5">
                          <img
                            src={tech.icon || "/placeholder.svg"}
                            alt={tech.name}
                            className="w-full h-full object-contain transition-all duration-200 cursor-pointer hover:!filter-none"
                            style={{
                              imageRendering: 'crisp-edges',
                              filter: "grayscale(100%) brightness(0.7) opacity(0.6)",
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
                                        <div className="grid grid-cols-4 gap-1">
                      {(() => {
                        // Count total buttons that will be rendered
                        const buttons = [];
                        if (project.demoUrl) buttons.push('demo');
                        if ((project.repositories as any).github) buttons.push('github');
                        if ((project.repositories as any).frontend) buttons.push('frontend');
                        if ((project.repositories as any).backend) buttons.push('backend');
                        if ((project.repositories as any).huggingface) buttons.push('huggingface');
                        
                        const totalButtons = buttons.length;
                        const colSpan = totalButtons === 1 ? 'col-span-4' : 
                                       totalButtons === 2 ? 'col-span-2' : 
                                       totalButtons === 3 ? 'col-span-1' : 'col-span-1';
                        
                        // For 3 buttons, make the first one span 2 columns
                        const firstColSpan = totalButtons === 3 ? 'col-span-2' : colSpan;
                        
                        return (
                          <>
                            {project.demoUrl && (
                              <button 
                                onClick={() => {
                                  if (project.demoUrl) {
                                    const url = project.demoUrl as string
                                    if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
                                      setModalImage(url)
                                    } else {
                                      window.open(url, '_blank')
                                    }
                                  }
                                }}
                                className={`px-3 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-xs text-[#e5e5e5] transition-colors flex items-center justify-center gap-1 ${firstColSpan}`}
                              >
                                <ExternalLink className="w-3 h-3" />
                                Demo
                              </button>
                            )}
                            {(project.repositories as any).github && (
                              <button 
                                onClick={() => {
                                  const githubRepo = (project.repositories as any).github;
                                  const url = githubRepo.startsWith('https://') ? githubRepo : `https://github.com/${githubRepo}`;
                                  window.open(url, '_blank');
                                }}
                                className={`px-2 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-xs text-[#e5e5e5] transition-colors flex items-center justify-center gap-1 ${project.demoUrl ? colSpan : firstColSpan}`}
                              >
                                <Github className="w-3 h-3" />
                                {totalButtons === 1 ? <span>Code</span> : ''}
                              </button>
                            )}
                            {(project.repositories as any).frontend && (
                              <button 
                                onClick={() => {
                                  const frontendRepo = (project.repositories as any).frontend;
                                  const url = frontendRepo.startsWith('https://') ? frontendRepo : `https://github.com/${frontendRepo}`;
                                  window.open(url, '_blank');
                                }}
                                className={`px-2 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-xs text-[#e5e5e5] transition-colors flex items-center justify-center gap-1 ${colSpan}`}
                              >
                                <Github className="w-3 h-3" />
                                <span>FE</span>
                              </button>
                            )}
                            {(project.repositories as any).backend && (
                              <button 
                                onClick={() => {
                                  const backendRepo = (project.repositories as any).backend;
                                  const url = backendRepo.startsWith('https://') ? backendRepo : `https://github.com/${backendRepo}`;
                                  window.open(url, '_blank');
                                }}
                                className={`px-2 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-xs text-[#e5e5e5] transition-colors flex items-center justify-center gap-1 ${colSpan}`}
                              >
                                <Github className="w-3 h-3" />
                                <span>BE</span>
                              </button>
                            )}
                            {(project.repositories as any).huggingface && (
                              <button 
                                onClick={() => window.open(`https://huggingface.co/${(project.repositories as any).huggingface}`, '_blank')}
                                className={`px-2 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-xs text-[#e5e5e5] transition-colors flex items-center justify-center gap-1 ${colSpan}`}
                              >
                                <span style={{ filter: 'grayscale(100%)' }}>🤗</span>
                              </button>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-[#666]">Updated {getLastUpdated(project)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-[0.03] z-50 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-3 -right-3 w-7 h-7 bg-[#333] hover:bg-[#444] rounded-full flex items-center justify-center text-[#e5e5e5] transition-colors z-10 border border-[#555]"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={modalImage}
              alt="Project Demo"
              className="max-w-full max-h-full object-contain rounded-xl border border-[#333] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

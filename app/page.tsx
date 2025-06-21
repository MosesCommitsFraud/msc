"use client";

import { useState, useEffect } from "react";
import { Dither } from "./components/Dither";

export default function HomePage() {
  const [showDither, setShowDither] = useState(true);
  const [ditherReady, setDitherReady] = useState(false);
  const [ditherFadingOut, setDitherFadingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isReturningToDither, setIsReturningToDither] = useState(false);
  const [contentFadingOut, setContentFadingOut] = useState(false);
  const [hasShownContentOnce, setHasShownContentOnce] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Function to handle the initial fade out
  const handleInitialFadeOut = () => {
    setDitherFadingOut(true);
    setTimeout(() => {
      setShowDither(false);
      setShowContent(true);
      setHasShownContentOnce(true);
    }, 1000);
  };

  // Function to handle the return to dither view
  const handleReturnToDither = () => {
    setIsReturningToDither(true);
    setContentFadingOut(true);
    
    // First fade out the content
    setTimeout(() => {
      setShowContent(false);
      setContentFadingOut(false);
      // Then fade in the dither
      setDitherFadingOut(false);
      setShowDither(true);
      setDitherReady(true); // Make dither visible for AFK mode
      setIsReturningToDither(false);
    }, 1000);
  };

  // Function to handle return to content
  const handleReturnToContent = () => {
    setDitherFadingOut(true);
    setTimeout(() => {
      setShowDither(false);
      setDitherReady(false); // Hide dither when returning to content
      setShowContent(true);
    }, 1000);
  };

  // Effect to handle initial behavior based on sessionStorage
  useEffect(() => {
    const isReload = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    const ditherShown = sessionStorage.getItem('ditherShown');
    
    if (ditherShown && !isReload) {
      // Navigation from another page - skip to content immediately
      setShowDither(false);
      setShowContent(true);
      setHasShownContentOnce(true);
    } else {
      // First time visiting or page reload - show dither
      setDitherReady(true);
      const initialTimer = setTimeout(() => {
        handleInitialFadeOut();
        sessionStorage.setItem('ditherShown', 'true');
      }, 4000);
      
      return () => clearTimeout(initialTimer);
    }
  }, []); // Empty dependency array for initial effect only

  // Separate effect for inactivity detection
  useEffect(() => {
    if (!hasShownContentOnce) return; // Only set up inactivity detection after initial dither phase

    let inactivityTimer: NodeJS.Timeout;
    let lastMouseMoveTime = Date.now();

    // Function to reset the inactivity timer
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      // If we're returning to dither, don't interrupt
      if (isReturningToDither) return;
      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - lastMouseMoveTime;
      // If mouse just started moving and we're showing dither (AFK mode), allow return to content
      if (timeSinceLastMove > 100 && showDither && !ditherFadingOut && hasShownContentOnce) {
        handleReturnToContent();
      }
      lastMouseMoveTime = currentTime;
      if (showContent) {
        inactivityTimer = setTimeout(handleReturnToDither, 60000); // 60 seconds
      }
    };

    // Add event listeners for user activity
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer, { passive: true });
    });

    // Initial setup of inactivity timer
    if (showContent) {
      inactivityTimer = setTimeout(handleReturnToDither, 60000); // 60 seconds
    }

    // Cleanup function
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [showContent, showDither, ditherFadingOut, isReturningToDither, hasShownContentOnce]);

  // Mouse tracking and time update for content view
  useEffect(() => {
    if (!showContent) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Europe/Berlin",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timeInterval);
    };
  }, [showContent]);

  const sections = [
    {
      id: "current",
      title: "Current",
      items: [
        {
          title: "AI Platform",
          description: "Educational technology with personalized learning",
          href: "#",
        },
        {
          title: "Skills & Experience",
          description: "Technical skills and professional background",
          href: "/skills",
        },
      ],
    },
    {
      id: "projects",
      title: "Projects",
      items: [
        {
          title: "Portfolio v3",
          description: "This website, built with Next.js and creativity",
          href: "#",
        },
        {
          title: "Salamon",
          description: "AI-powered deck builder for card games",
          href: "#",
        },
        {
          title: "All Projects",
          description: "Complete collection of my work",
          href: "/projects",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning",
      items: [
        {
          title: "Machine Learning",
          description: "Deep learning and neural networks",
          href: "#",
        },
        {
          title: "System Design",
          description: "Scalable architecture patterns",
          href: "#",
        },
      ],
    },
  ];

  return (
    <>
      <style jsx global>{`
        ::selection {
          background-color: rgba(107, 70, 193, 0.3);
          color: white;
        }
        ::-moz-selection {
          background-color: rgba(107, 70, 193, 0.3);
          color: white;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes fadeToBackground {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-out {
          animation: fadeOut 1s ease-out forwards;
        }

        .animate-fade-to-background {
          animation: fadeToBackground 1s ease-out forwards;
          opacity: 0;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Dither Background */}
      {showDither && (
        <>
          <div 
            className={`fixed inset-0 z-50 ${ditherFadingOut ? 'animate-fade-out' : ''}`}
            style={{ opacity: ditherReady ? 1 : 0 }}
          >
            <Dither 
              enableMouseInteraction={false}
              waveColor={[0.3, 0.3, 0.3]}
              colorNum={8}
              pixelSize={2}
            />
            {/* Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img 
                src="/logo.svg"
                alt="Logo"
                className="w-52 h-52 mx-auto"
                style={{
                  filter: 'brightness(0) invert(1)',
                  imageRendering: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              />
            </div>
          </div>
          {/* Background overlay that fades in as dither fades out */}
          {ditherFadingOut && (
            <div 
              className="fixed inset-0 z-40 bg-[#1a1a1a] animate-fade-to-background"
              style={{ opacity: 0 }}
            />
          )}
        </>
      )}

      {/* Main Content */}
      {showContent && (
        <div 
          className={`min-h-screen bg-[#1a1a1a] text-[#e5e5e5] relative overflow-hidden ${contentFadingOut ? 'animate-fade-out' : ''}`}
          style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          {/* Background gradient that follows mouse */}
          <div
            className="fixed w-96 h-96 bg-gradient-radial from-[#6b46c1] to-transparent opacity-5 pointer-events-none transition-all duration-1000 ease-out"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />

          <div className="fixed left-0 right-0 h-14 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>

          <div className="max-w-2xl mx-auto px-6 py-32 relative">
            {/* Header */}
            <header className="mb-20 animate-fade-in-up">
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-lg font-medium text-[#e5e5e5]">Moritz Schäfer</h1>
                <div className="text-right">
                  <div className="text-xs text-[#666] mb-1">Local time</div>
                  <div className="font-mono text-sm text-[#888]">{currentTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-4 h-4 text-[#888]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-[#888] text-base">Mannheim, Germany</span>
              </div>

              <p className="text-[#e5e5e5] mb-4 text-base">
                I build software that solves problems. Currently working with AI and automation while studying at DHBW.
              </p>
              <p className="text-[#e5e5e5] text-base">Dual student at PHOENIX International Holdings.</p>
            </header>

            {/* Three-column layout with hover effects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {sections.map((section, sectionIndex) => (
                <section
                  key={section.id}
                  className={`animate-fade-in-up delay-${(sectionIndex + 1) * 100} relative transition-all duration-300 ${
                    hoveredSection === section.id ? "bg-[#1f1f1f] -mx-2 px-2 py-4 rounded-lg" : ""
                  }`}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <h2
                    className={`text-base font-medium mb-6 transition-colors duration-300 ${
                      hoveredSection === section.id ? "text-[#6b46c1]" : "text-[#888]"
                    }`}
                  >
                    {section.title}
                  </h2>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="group">
                        <a href={item.href} className="block">
                          <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                            <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                              {item.title}
                            </span>
                            <svg
                              className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </h3>
                          <p className="text-[#888] text-base group-hover:text-[#aaa] transition-colors">
                            {item.description}
                          </p>
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Now section with animated elements */}
            <section className="mb-16 animate-fade-in-up delay-400 relative">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-medium text-[#e5e5e5]">Now</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#333] to-transparent"></div>
                <div className="w-2 h-2 bg-[#6b46c1] rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-4 text-[#e5e5e5] text-base leading-relaxed">
                <p className="hover:text-[#f5f5f5] transition-colors cursor-default">
                  Building software that makes a difference. Focused on creating intelligent applications that solve real
                  problems while maintaining clean, intuitive interfaces.
                </p>
                <p className="hover:text-[#f5f5f5] transition-colors cursor-default">
                  Learning constantly—whether it's new AI techniques, better development practices, or understanding how
                  technology can transform business processes.
                </p>
                <p className="hover:text-[#f5f5f5] transition-colors cursor-default">
                  Balancing studies with practical work experience, finding the intersection between academic knowledge
                  and real-world application.
                </p>
              </div>
            </section>

            {/* Connect section */}
            <section className="animate-fade-in-up delay-500 relative">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-medium text-[#e5e5e5]">Connect</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#333] to-transparent"></div>
              </div>

              <div className="group">
                <p className="text-[#e5e5e5] text-base">
                  Reach me at{" "}
                  <a href="mailto:moritz.b.schaefer@outlook.de" className="relative inline-block">
                    <span className="border-b border-[#333] group-hover:border-[#6b46c1] transition-colors">
                      moritz.b.schaefer@outlook.de
                    </span>
                    <span className="absolute -top-1 -right-1 w-1 h-1 bg-[#6b46c1] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </a>{" "}
                  or find me on GitHub.
                </p>
              </div>
            </section>
          </div>

          {/* Floating background elements */}
          <div className="fixed bottom-20 right-20 w-32 h-32 bg-[#6b46c1] rounded-full opacity-5 blur-2xl animate-float pointer-events-none"></div>
          <div
            className="fixed top-40 left-20 w-24 h-24 bg-[#f59e0b] rounded-full opacity-5 blur-2xl animate-float pointer-events-none"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      )}
    </>
  );
}
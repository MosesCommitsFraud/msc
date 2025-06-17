"use client";

import { useState, useEffect } from "react";
import { Dither } from "./components/Dither";

export default function Home() {
  const [showDither, setShowDither] = useState(true);
  const [ditherFadingOut, setDitherFadingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isReturningToDither, setIsReturningToDither] = useState(false);
  const [contentFadingOut, setContentFadingOut] = useState(false);

  // Function to handle the initial fade out
  const handleInitialFadeOut = () => {
    setDitherFadingOut(true);
    setTimeout(() => {
      setShowDither(false);
      setShowContent(true);
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
      setIsReturningToDither(false);
    }, 1000);
  };

  // Function to handle return to content
  const handleReturnToContent = () => {
    setDitherFadingOut(true);
    setTimeout(() => {
      setShowDither(false);
      setShowContent(true);
    }, 1000);
  };

  // Effect for initial fade out
  useEffect(() => {
    const initialTimer = setTimeout(handleInitialFadeOut, 4000);
    return () => clearTimeout(initialTimer);
  }, []); // Empty dependency array for initial fade only

  // Separate effect for inactivity detection
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    let lastMouseMoveTime = Date.now();

    // Function to reset the inactivity timer
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      
      // If we're returning to dither, don't interrupt
      if (isReturningToDither) return;

      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - lastMouseMoveTime;
      
      // If mouse just started moving and we're showing dither
      if (timeSinceLastMove > 100 && showDither && !ditherFadingOut) {
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
    resetInactivityTimer();

    // Cleanup function
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [showContent, showDither, ditherFadingOut, isReturningToDither]);

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
            transform: translateY(30px);
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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
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
        
        .delay-150 { animation-delay: 0.15s; }
        .delay-250 { animation-delay: 0.25s; }
        .delay-350 { animation-delay: 0.35s; }
        .delay-450 { animation-delay: 0.45s; }
        .delay-550 { animation-delay: 0.55s; }
        .delay-650 { animation-delay: 0.65s; }
        .delay-750 { animation-delay: 0.75s; }
        .delay-850 { animation-delay: 0.85s; }
      `}</style>

      {/* Dither Background */}
      {showDither && (
        <>
          <div 
            className={`fixed inset-0 z-50 ${ditherFadingOut ? 'animate-fade-out' : ''}`}
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
            {/* Signature overlay */}
            <div className="absolute bottom-[-16] right-4 w-32 h-32 pointer-events-none">
              <img 
                src="/Signature.svg"
                alt="Signature"
                className="w-full h-full"
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
        <div className={`min-h-screen bg-[#1a1a1a] text-[#e5e5e5] ${contentFadingOut ? 'animate-fade-out' : ''}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          {/* Top fade overlay */}
          <div className="fixed left-0 right-0 h-14 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a] via-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>
          
          <div className="max-w-2xl mx-auto px-6 py-32">
            {/* Header */}
            <header className="mb-24 animate-fade-in-up delay-150" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h1 className="text-lg font-medium mb-4 text-[#e5e5e5]">Moritz Schäfer</h1>
              <p className="text-[#888] mb-6 text-base">
                <em>I like to try new stuff</em>. Experimenting with new AI stuff and current tech trends. I like to build nice looking interfaces.
              </p>
              <div className="animate-fade-in delay-250" style={{ opacity: 0 }}>
                <p className="text-[#888] text-base">
                  Currently employed at PHOENIX group as a dual study student.
                </p>
              </div>
            </header>

            {/* Three Column Layout: Building, Projects, Writing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
              {/* Building Section */}
              <section className="animate-fade-in-up delay-350" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h2 className="text-base font-medium mb-8 text-[#888]">Building</h2>
                <div className="space-y-4">
                  <div>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Craft
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Implementing interfaces and interactions.</p>
                    </a>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section className="animate-fade-in-up delay-350" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h2 className="text-base font-medium mb-8 text-[#888]">Projects</h2>
                <div className="space-y-6">
                  <div>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          ⌘K
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Composable command menu React component.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-450" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Writer
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Plain text editor with a focus on performance.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-550" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Next Themes
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Perfect dark mode in Next.js apps.</p>
                    </a>
                  </div>
                </div>
              </section>

              {/* Writing Section */}
              <section className="animate-fade-in-up delay-350" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h2 className="text-base font-medium mb-8 text-[#888]">Writing</h2>
                <div className="space-y-6">
                  <div>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          React Hook Getter Pattern
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Simple, efficient React state hook in 50 lines.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-450" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Redesign 2021
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Return to simplicity.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-550" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          All writing
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Infrequent thoughts on design and code.</p>
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* Now Section */}
            <section className="mb-16 animate-fade-in-up delay-650" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h2 className="text-lg font-medium mb-8 text-[#e5e5e5]">Now</h2>
              <div className="space-y-4 text-[#e5e5e5] text-base leading-relaxed">
                <p>
                  Developing skill through doing, guiltlessly exploring passion and interests, imbuing quality. 
                  Mindful that <em>everything around me is someone's life work.</em>
                </p>
                <div className="animate-fade-in delay-750" style={{ opacity: 0 }}>
                  <p>
                    All I want to do is build websites. Typography, motion design, copywriting, performance—
                    the web is an endless medium of opportunity and creativity of which I've only scratched 
                    the surface.
                  </p>
                </div>
                <div className="animate-fade-in delay-850" style={{ opacity: 0 }}>
                  <p>
                    Enjoying deep, dark, boring dance music: songs that set the pace in the first ten seconds 
                    and maintain it for the next ten minutes. Deep is a curation of my favorites. Soothed by the 
                    inherent energy of drum and bass—Drum has my favorites.
                  </p>
                </div>
              </div>
            </section>

            {/* Connect Section */}
            <section className="animate-fade-in-up delay-750" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h2 className="text-lg font-medium mb-8 text-[#e5e5e5]">Connect</h2>
              <p className="text-[#e5e5e5] text-base">
                Reach me at <span className="text-[#e5e5e5]">@msc</span> or <span className="text-[#e5e5e5]">ms@msc.dev</span>.
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

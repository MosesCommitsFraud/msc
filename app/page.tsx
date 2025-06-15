"use client";

export default function Home() {
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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
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
        
        /* Ensure the page starts completely hidden */
        body {
          opacity: 0;
          animation: pageReveal 0.1s ease-out 0.1s forwards;
        }
        
        @keyframes pageReveal {
          to {
            opacity: 1;
          }
        }
      `}</style>
      <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
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
    </>
  );
}

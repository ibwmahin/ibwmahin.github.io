// src/pages/DevDiaries.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  caseStudies as importedCaseStudies,
  CaseStudy,
} from "../data/caseStudies";

const caseStudies: CaseStudy[] = importedCaseStudies;

const parsePathForId = (path: string) => {
  const m = path.match(/^\/case-studies\/([^/]+)\/?$/);
  return m ? m[1] : null;
};

const DevDiaries: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [landing, setLanding] = useState(true);

  const selected = caseStudies.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    const idFromPath = parsePathForId(window.location.pathname);
    if (idFromPath && caseStudies.some((c) => c.id === idFromPath)) {
      setSelectedId(idFromPath);
      setLanding(false);
    }

    const onPop = () => {
      const id = parsePathForId(window.location.pathname);
      if (id && caseStudies.some((c) => c.id === id)) {
        setSelectedId(id);
        setLanding(false);
      } else {
        setSelectedId(null);
        setLanding(true);
      }
      setOpen(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function openPage(id: string) {
    history.pushState({}, "", `/case-studies/${id}`);
    setSelectedId(id);
    setLanding(false);
    setOpen(false);
  }

  function backToLanding() {
    history.pushState({}, "", "/");
    setSelectedId(null);
    setLanding(true);
  }

  return (
    <div className="in-h-screen flex flex-col bg-white text-black font-sans">
      <Header />
      {/* Sidebar toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="fixed right-4 bottom-6 z-40 border-4 border-black bg-white p-3 font-mono text-xs hover:scale-105 transform transition-transform"
      >
        CASES
      </button>
      {/* overlay */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      {/* sidebar */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 z-40 h-full w-80 md:w-96 bg-white border-l-4 border-black transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-sm font-semibold">Case Studies</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="border-2 border-black px-2 py-1 font-mono text-xs"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 overflow-auto space-y-3 pr-2">
            {caseStudies.map((c) => (
              <div
                key={c.id}
                className="border-2 border-black p-3 rounded-none cursor-default font-mono text-xs"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-[11px] mt-1">{c.tagline}</div>
                  </div>
                  <div className="text-[10px]">{c.updated}</div>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap">
                  {c.tech?.map((t) => (
                    <span
                      key={t}
                      className="border-2 border-black px-2 py-[2px] rounded-none text-[10px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openPage(c.id)}
                    className="border-2 border-black px-3 py-1 rounded-none text-xs font-mono"
                  >
                    Open Page
                  </button>
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-4">
            <button
              onClick={backToLanding}
              className="border-2 border-black px-3 py-1 rounded-none text-xs font-mono w-full"
            >
              Back to Landing
            </button>
          </div>
        </div>
      </aside>
      {/* main */}
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-12 space-y-8">
        {landing ? (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((c) => (
              <article
                key={c.id}
                className="border-4 border-black p-6 rounded-none cursor-pointer"
              >
                <h3 className="font-mono text-lg font-semibold mb-2">
                  {c.title}
                </h3>
                <p className="font-mono text-xs mb-4">{c.tagline}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.tech?.map((t) => (
                    <span
                      key={t}
                      className="border-2 border-black px-2 py-[2px] text-[11px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openPage(c.id)}
                  className="border-2 border-black px-3 py-1 rounded-none text-xs font-mono"
                >
                  Open Page
                </button>
              </article>
            ))}
          </section>
        ) : (
          <section className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-mono font-semibold tracking-tight mb-2">
              Dev Diaries — {selected?.title}
            </h1>
            <p className="font-mono text-sm mb-4">{selected?.tagline}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {selected?.tech?.map((t) => (
                <span
                  key={t}
                  className="border-2 border-black px-3 py-1 font-mono text-xs rounded-none"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Render all sections */}
            {selected?.sections?.map((s, i) => (
              <div
                key={i}
                className="border-2 border-black p-4 rounded-none mb-4"
              >
                <h3 className="font-mono text-sm font-semibold mb-2">
                  {s.heading}
                </h3>
                {s.content && (
                  <p className="font-mono text-xs leading-relaxed">
                    {s.content}
                  </p>
                )}
                {s.code && (
                  <pre className="font-mono text-xs mt-2 whitespace-pre-wrap">
                    {s.code}
                  </pre>
                )}
                {s.images && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {s.images.map((img, j) => (
                      <img
                        key={j}
                        src={img}
                        alt=""
                        className="w-32 h-32 object-cover border-2 border-black"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={backToLanding}
              className="border-2 border-black px-4 py-2 rounded-none text-xs font-mono"
            >
              Back to Landing
            </button>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DevDiaries;

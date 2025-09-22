// src/pages/BlogPost.tsx
import React, { useMemo, useRef, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { posts as allPosts } from "../data/posts";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  cover?: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = allPosts.find((p: Post) => p.slug === slug) as Post | undefined;

  // fallback
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-white/60 to-gray-50 dark:from-slate-900/60 dark:to-slate-950">
        <div className="text-center space-y-4">
          <p className="text-lg text-foreground/80">Post not found.</p>
          <div className="flex gap-2 justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-white/60 dark:bg-slate-800/60 shadow-sm hover:shadow-md transition"
            >
              ← Back to blog
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm text-muted-foreground hover:underline"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // reading time estimate
  const readingTime = useMemo(() => {
    const words = post.content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }, [post.content]);

  // reading progress
  const articleRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const total = el.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = Math.min(
        Math.max(window.scrollY - (el.offsetTop - 80), 0),
        total,
      );
      const pct = (scrolled / total) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // custom MD components
  const mdComponents = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      if (!inline && match) {
        return (
          <div className="my-4 overflow-x-auto rounded-lg bg-slate-900/20">
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              showLineNumbers
              wrapLines
              {...props}
            >
              {String(children).replace(/\n$/, "") || ""}
            </SyntaxHighlighter>
          </div>
        );
      }
      return (
        <code
          className={`rounded px-1 py-0.5 text-sm bg-slate-100 dark:bg-slate-800/60 ${inline ? "inline" : ""}`}
          {...props}
        >
          {children}
        </code>
      );
    },
    a({ href, children, ...props }: any) {
      const isExternal =
        typeof href === "string" && /^(http|https):/.test(href);
      return (
        <a
          href={href}
          {...props}
          className="text-foreground/90 underline hover:text-foreground transition"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    img({ src, alt, ...props }: any) {
      return (
        <div className="my-6 rounded-lg overflow-hidden shadow-sm">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
            loading="lazy"
            {...props}
          />
        </div>
      );
    },
    h1: (props: any) => (
      <h1 className="text-3xl md:text-4xl font-semibold mt-6 mb-4" {...props} />
    ),
    h2: (props: any) => (
      <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
    ),
    h3: (props: any) => (
      <h3 className="text-xl font-medium mt-5 mb-2" {...props} />
    ),
    p: (props: any) => (
      <p className="leading-7 text-foreground/90 mb-4" {...props} />
    ),
    ul: (props: any) => (
      <ul className="list-disc list-inside ml-4 mb-4" {...props} />
    ),
    ol: (props: any) => (
      <ol className="list-decimal list-inside ml-4 mb-4" {...props} />
    ),
    blockquote: (props: any) => (
      <blockquote
        className="border-l-2 pl-4 italic text-muted-foreground my-4"
        {...props}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,white)] dark:bg-[linear-gradient(180deg,#071024,#0b1320)] pb-32">
      {/* reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200 dark:bg-slate-800">
        <div
          className="h-1 bg-gradient-to-r from-indigo-700 to-violet-700 shadow-sm"
          style={{ width: `${progress}%`, transition: "width 120ms linear" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 text-sm shadow-sm hover:shadow-md transition"
            >
              ← Back
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-muted-foreground hover:underline"
            >
              Or go back
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{post.date}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {readingTime} min read
            </span>
          </div>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-3xl border border-gray-200/40 dark:border-slate-700/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md shadow-xl overflow-hidden"
          ref={articleRef}
        >
          {post.cover && (
            <div className="relative h-72 md:h-96 w-full overflow-hidden">
              <img
                src={post.cover}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transform scale-[1.03] transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute left-6 bottom-6 right-6 md:left-12 md:bottom-12 md:right-auto">
                <h1 className="text-2xl md:text-4xl font-semibold text-white drop-shadow-lg">
                  {post.title}
                </h1>
                <div className="mt-2 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-white/90">
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-white/90">
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="px-6 md:px-10 py-8 md:py-12">
            <div className="md:flex md:items-start md:gap-10">
              <main className="flex-1 prose prose-lg max-w-none overflow-x-auto text-foreground/90 dark:prose-invert">
                <p className="text-sm text-muted-foreground mb-4 !prose-none">
                  {post.excerpt}
                </p>

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={mdComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </main>
            </div>

            <footer className="mt-8 border-t pt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} • Soft Pen
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-white dark:text-black text-sm shadow hover:shadow-lg transition"
                  >
                    Back to all posts
                  </Link>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                  >
                    ↑ Top
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

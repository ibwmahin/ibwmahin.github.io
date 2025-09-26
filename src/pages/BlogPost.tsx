import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { posts, Post } from "../data/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function BlogPost() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const articleRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [codeStyle, setCodeStyle] = useState<any>(null);

  useEffect(() => {
    import("react-syntax-highlighter/dist/esm/styles/prism/one-dark").then(
      (mod) => setCodeStyle(mod.default),
    );
  }, []);

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg text-foreground/80">Post not found.</p>
          <button
            onClick={() => navigate("/blog")}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const readingTime = useMemo(() => {
    const words = post.content.split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }, [post.content]);

  const mdComponents = {
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      if (!inline && match) {
        return (
          <SyntaxHighlighter
            style={codeStyle ?? {}}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }
      return <code className="bg-gray-200 px-1 rounded">{children}</code>;
    },
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200 dark:bg-slate-800">
        <div
          className="h-1 bg-gradient-to-r from-indigo-700 to-violet-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="inline-block px-3 py-2 bg-gray-200 rounded"
            >
              ← Back
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-muted-foreground"
            >
              Or go back
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.date}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
        </div>

        <article ref={articleRef} className="prose mx-auto">
          <h1>{post.title}</h1>
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={mdComponents}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

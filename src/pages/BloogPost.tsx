// src/pages/BlogPost.tsx
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { posts as allPosts } from "../data/posts";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

export default function BlogPost(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/404" replace />;

  // pick up to 3 related posts (others)
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-24">
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-card/60 backdrop-blur-md border rounded-2xl p-8 shadow-md"
        >
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">{post.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{post.date}</p>
          </header>

          {post.cover && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="prose max-w-none text-muted-foreground">
            {/* plain content for now */}
            <pre className="whitespace-pre-wrap">{post.content}</pre>
          </div>
        </motion.article>

        {/* Related posts */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-foreground">Related</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border bg-card/50 p-3 shadow-sm hover:shadow-md transition"
              >
                <Link to={`/blog/${r.slug}`} className="block">
                  <div className="text-sm text-muted-foreground">{r.date}</div>
                  <div className="font-medium text-foreground mt-1">
                    {r.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {r.excerpt}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

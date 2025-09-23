// src/pages/BlogList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts as allPosts, Post } from "../data/posts";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};
const item = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

export default function BlogList() {
  return (
    <div className="min-h-screen bg-background pb-24 mt-12">
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={container}
          className="mb-8 text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-bold text-foreground"
          >
            Blog
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-2 text-muted-foreground max-w-2xl mx-auto"
          >
            Thoughts, tutorials and short notes. Bento-style layout with an
            applish look — cards, soft shadows and subtle glass.
          </motion.p>
        </motion.header>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr"
        >
          {allPosts.map((post: Post) => {
            const featured = post.featured ? "md:col-span-2 md:row-span-2" : "";
            return (
              <motion.article
                key={post.slug}
                variants={item}
                className={`relative overflow-hidden rounded-2xl border bg-white/6 dark:bg-white/4 backdrop-blur-md p-4 shadow-md hover:shadow-xl transition-all ${featured}`}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  {post.cover ? (
                    <div className="h-40 md:h-48 w-full rounded-lg overflow-hidden mb-3 bg-muted/10">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg md:text-xl font-semibold text-foreground">
                        {post.title}
                      </h2>
                      <time className="text-xs text-muted-foreground">
                        {post.date}
                      </time>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-muted/20 text-muted-foreground">
                        Read
                      </span>
                      <span className="text-sm font-medium text-primary">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.section>
      </div>
    </div>
  );
}

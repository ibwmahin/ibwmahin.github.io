import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Calendar, Clock, Search, Tag } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const blogGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blogGridRef.current) {
      gsap.fromTo(
        blogGridRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, [selectedCategory, searchTerm]);

  const blogPosts = [
    {
      title: "Building Responsive Components with Tailwind CSS",
      excerpt:
        "Learn how to create flexible, responsive components using Tailwind CSS utility classes and modern CSS techniques. This comprehensive guide covers grid systems, flexbox layouts, and responsive design patterns.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "CSS",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
      slug: "responsive-components-tailwind",
      tags: ["Tailwind", "CSS", "Responsive Design"],
    },
    {
      title: "Advanced React Hooks: useCallback and useMemo",
      excerpt:
        "Deep dive into React's performance optimization hooks and when to use them effectively in your applications. Understanding the differences and best practices for optimal performance.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "React",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
      slug: "advanced-react-hooks",
      tags: ["React", "Performance", "Hooks"],
    },
    {
      title: "JavaScript ES2024: New Features and Updates",
      excerpt:
        "Explore the latest JavaScript features and how they can improve your development workflow and code quality. From array methods to async improvements.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "JavaScript",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop",
      slug: "javascript-es2024-features",
      tags: ["JavaScript", "ES2024", "Features"],
    },
    {
      title: "Creating Smooth Animations with Framer Motion",
      excerpt:
        "Master the art of web animations using Framer Motion. Learn about transitions, gestures, and complex animation sequences that enhance user experience.",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Animation",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&fit=crop",
      slug: "framer-motion-animations",
      tags: ["Framer Motion", "Animation", "React"],
    },
    {
      title: "TypeScript Best Practices for React Development",
      excerpt:
        "Learn essential TypeScript patterns and best practices for building robust React applications. Type safety, interfaces, and advanced TypeScript features.",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "TypeScript",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
      slug: "typescript-react-best-practices",
      tags: ["TypeScript", "React", "Best Practices"],
    },
    {
      title: "Modern CSS Grid Layout Techniques",
      excerpt:
        "Discover powerful CSS Grid techniques for creating complex layouts with minimal code. From basic grids to advanced responsive designs.",
      date: "2023-12-15",
      readTime: "6 min read",
      category: "CSS",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      slug: "css-grid-layout-techniques",
      tags: ["CSS Grid", "Layout", "Responsive"],
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-secondary/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gradient">
                Blog & Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Sharing my thoughts, experiences, and tutorials about web
                development, programming, and the latest technologies in the
                industry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length > 0 ? (
              <div
                ref={blogGridRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    whileHover={{ scale: 1.03 }}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Post Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-semibold text-card-foreground mb-3 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                          >
                            <Tag className="h-3 w-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        Read Full Article
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-xl text-muted-foreground">
                  No posts found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

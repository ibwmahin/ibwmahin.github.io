// src/pages/BlogPost.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { posts as allPosts } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = allPosts.find((p) => p.slug === slug);

  // simple fallback
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-lg">Post not found.</p>
          <div className="flex gap-2 justify-center">
            <Link to="/blog" className="text-sm text-primary hover:underline">
              Back to blog
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-muted-foreground hover:underline"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-24">
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Blog
        </Link>

        <article className="mt-6 bg-white/6 dark:bg-white/4 backdrop-blur-md border rounded-2xl p-8 shadow-md">
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
            {/* For now render content as plain text; later swap to markdown rendering */}
            <pre className="whitespace-pre-wrap">{post.content}</pre>
          </div>
        </article>
      </div>
    </div>
  );
}

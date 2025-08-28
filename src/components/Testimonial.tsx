import { useEffect, useRef } from 'react';

interface TestimonialProps {
  quote?: string;
  author?: string;
  role?: string;
  avatarUrl?: string;
}

const Testimonial = ({
  quote = "Alex delivered exceptional design work that perfectly captured our vision. The attention to detail and user experience was outstanding. Highly recommended!",
  author = "Sarah Johnson",
  role = "Product Manager at TechCorp",
  avatarUrl = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
}: TestimonialProps) => {
  const testimonialRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      { threshold: 0.3 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={testimonialRef}
      className="section-padding bg-[hsl(var(--muted-light))] animate-fade-up"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12">
            <div className="text-4xl text-[hsl(var(--muted))] mb-8">"</div>
            <blockquote className="text-h2 leading-relaxed text-[hsl(var(--foreground))] mb-8">
              {quote}
            </blockquote>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <img
              src={avatarUrl}
              alt={`${author} avatar`}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-[var(--shadow)]"
              loading="lazy"
            />
            <div className="text-left">
              <div className="font-semibold text-[hsl(var(--foreground))]">{author}</div>
              <div className="text-[hsl(var(--muted))] text-sm">{role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
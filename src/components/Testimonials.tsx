
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Startup Founder",
      company: "TechVenture Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "Abdulla delivered an exceptional e-commerce platform that exceeded our expectations. His attention to security and performance details made all the difference for our business growth."
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Digital Solutions Co.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "Working with Abdulla was a game-changer. His full-stack expertise and clean coding practices resulted in a scalable application that our team can easily maintain and extend."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "The website Abdulla created for us is not only visually stunning but also incredibly fast and user-friendly. Our conversion rates improved by 40% after the launch!"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-lg text-foreground/70">
              What my clients say about working with me
            </p>
          </div>

          {/* Testimonial Slider */}
          <div className="relative">
            <div className="bg-card-gradient rounded-3xl p-8 md:p-12 border border-border glow-primary">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-primary/30"
                  />
                  <div className="text-left">
                    <h4 className="text-xl font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-foreground/70">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-primary text-sm">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-foreground/30 hover:bg-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All Testimonials Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-card-gradient rounded-xl p-6 border border-border transition-all duration-300 cursor-pointer hover-lift ${
                  index === currentIndex ? 'ring-2 ring-primary glow-primary' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border border-primary/30 mr-3"
                  />
                  <div>
                    <h5 className="font-semibold text-foreground">{testimonial.name}</h5>
                    <p className="text-sm text-foreground/70">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm line-clamp-3">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "AbdulLa consistently delivers exceptional results. His expertise in both web development and cybersecurity has transformed our digital presence and made our online platform more secure than ever.",
      name: "Sarah Johnson",
      title: "Tech Lead at InnovateFlow"
    },
    {
      id: 2,
      quote: "Working with AbdulLa was a game-changer for our startup. He not only built a beautiful website but also implemented security features that gave us and our customers peace of mind.",
      name: "Michael Roberts",
      title: "Founder at TechSprint"
    },
    {
      id: 3,
      quote: "I've collaborated with many developers, but AbdulLa stands out for his attention to detail and commitment to quality. His code is clean, well-documented, and built with security as a priority.",
      name: "Jessica Chen",
      title: "Product Manager at DevSecOps"
    }
  ];

  return (
    <section id="testimonials" className="section-container">
      <SectionTitle title="Testimonials" />
      
      <p className="text-gray-300 mb-12 max-w-3xl">
        What colleagues and clients have to say about my work and collaborations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
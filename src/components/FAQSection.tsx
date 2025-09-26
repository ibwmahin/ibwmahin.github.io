// FAQSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqs?: FAQItem[];
};

const sampleFAQs: FAQItem[] = [
  {
    question: "What services do you provide?",
    answer:
      "As a full-stack web developer specializing in React, TypeScript, and modern technologies, I offer end-to-end solutions including UI/UX design, frontend and backend development, performance optimization, and deployment. From custom websites to scalable applications, I focus on delivering clean, efficient code tailored to your business goals.",
  },
  {
    question: "What is your development process?",
    answer:
      "My process follows agile principles: initial consultation to understand requirements, wireframing and prototyping, iterative development with regular feedback, thorough testing, and seamless deployment. This ensures alignment with your vision while maintaining high standards of quality and scalability.",
  },
  {
    question: "How do you handle project timelines and pricing?",
    answer:
      "Timelines are estimated based on project scope—typically 2-4 weeks for MVPs and 6-12 weeks for complex apps. Pricing is transparent: fixed quotes for defined scopes starting at $2,000, or hourly rates from $50. I provide detailed breakdowns upfront to fit your budget without compromising excellence.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Core stack includes React/Next.js for frontend, Node.js/Express for backend, Tailwind CSS for styling, and databases like MongoDB/PostgreSQL. I integrate tools like Framer Motion for animations, AWS/Vercel for hosting, and Git for version control, always selecting the best fit for performance and maintainability.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, I provide ongoing maintenance packages including bug fixes, updates, and performance monitoring. Options range from ad-hoc hourly support to retainer plans, ensuring your digital presence remains secure, fast, and up-to-date long-term.",
  },
  {
    question: "How do we get started?",
    answer:
      "Schedule a free 30-minute consultation via the contact form. We'll discuss your goals, timeline, and budget, after which I'll deliver a customized proposal. Let's turn your ideas into impactful digital realities.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FAQSection: React.FC<FAQSectionProps> = ({ faqs = sampleFAQs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20 rounded-xl">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common inquiries about my services, process, and collaboration. If
              your question isn't here, reach out—I'm here to help.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                >
                  <span className="text-lg font-semibold text-foreground">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl text-muted-foreground ml-4"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

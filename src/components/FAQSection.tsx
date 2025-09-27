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
    question: "What front-end technologies do you specialize in?",
    answer:
      "I primarily build with React and Next.js using TypeScript for type safety. For styling I use Tailwind CSS and CSS Modules, and I apply modern build tools (Vite, Webpack) and testing with Jest/React Testing Library.",
  },
  {
    question: "Can you improve our site's performance?",
    answer:
      "Absolutely — I audit bundle size, optimize images and fonts, implement code-splitting and lazy loading, and tune server-side rendering or edge caching. Typical wins include faster Time to First Byte (TTFB) and lower Largest Contentful Paint (LCP).",
  },
  {
    question: "Do you handle accessibility (a11y)?",
    answer:
      "Yes. I build with semantic HTML, keyboard navigation, ARIA where appropriate, and run automated and manual accessibility tests to help reach WCAG AA standards.",
  },
  {
    question: "How do you approach component architecture and code quality?",
    answer:
      "I organize UI into small, reusable components with clear props and separation of concerns. I enforce linting (ESLint), formatting (Prettier), and CI checks; write unit and integration tests; and keep documentation and type definitions up-to-date.",
  },
  {
    question: "What about state management and data fetching?",
    answer:
      "I prefer lightweight solutions: React Query / TanStack Query or SWR for server state, and local state with React Context or Zustand. For APIs I integrate REST or GraphQL depending on the backend, with retry and caching strategies.",
  },
  {
    question:
      "Do you build on CMSs or page builders like WordPress or Webflow?",
    answer:
      "Yes — I create custom themes, headless WordPress integrations, and polished Webflow builds. For headless setups I pair Next.js with a CMS (WordPress, Sanity, or Strapi) to deliver fast, maintainable sites.",
  },
  {
    question: "How do you deploy and host projects?",
    answer:
      "I typically deploy static/SSR apps to Vercel or Netlify, and containerized services to AWS or DigitalOcean. I configure CI/CD pipelines, environment variables, monitoring, and automated rollbacks when needed.",
  },
  {
    question: "What does post-launch support look like?",
    answer:
      "Options range from hourly ad-hoc fixes to monthly retainers. Support covers security updates, dependency upgrades, bug fixes, performance monitoring, and small feature iterations.",
  },
  {
    question: "How long will my project take and how is pricing handled?",
    answer:
      "Timelines depend on scope; a marketing site is often 1–3 weeks, a complex app 6–12+ weeks. I provide fixed quotes for defined scopes or an hourly model. Every proposal includes milestones and a clear deliverables list.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send project details via the contact form or schedule a short discovery call. I’ll review requirements, share a rough timeline and estimate, and outline next steps to kick off development.",
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
              Front-End & Web Development FAQs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Answers to common questions about my stack, workflow, and how we
              can ship fast, maintainable web products together.
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

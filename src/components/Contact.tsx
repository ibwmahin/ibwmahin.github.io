import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactProps {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
}

const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
        to_email: 'ibwmahin@gmail.com',
        time: new Date().toLocaleString(),
      };

      await emailjs.send(
        'service_li5izpc',
        'template_2ag350j',
        templateParams,
        'GWvjXulV3i2NZJ5jo'
      );

      setSubmitStatus('success');
      setFormData({ name: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "ibwmahin@gmail.com",
      link: "mailto:ibwmahin@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+8801854333256",
      link: "tel:+8801854333256"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "Available Globally",
      link: null
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-latte-text dark:text-mocha-text mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-latte-subtext1 dark:text-mocha-subtext1 max-w-3xl mx-auto">
              Have a project in mind? I'd love to hear from you. Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-bold text-latte-text dark:text-mocha-text">
                Let's Connect
              </h3>
              
              <p className="text-latte-subtext1 dark:text-mocha-subtext1 leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a question, want to discuss a project, or just want to say hello, 
                don't hesitate to reach out.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-latte-blue dark:text-mocha-blue">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-latte-text dark:text-mocha-text">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-latte-subtext1 dark:text-mocha-subtext1 hover:text-latte-blue dark:hover:text-mocha-blue transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-latte-subtext1 dark:text-mocha-subtext1">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-latte-text dark:text-mocha-text mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 border border-latte-overlay0 dark:border-mocha-overlay0 text-latte-text dark:text-mocha-text placeholder-latte-subtext0 dark:placeholder-mocha-subtext0 focus:border-latte-blue dark:focus:border-mocha-blue focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-latte-text dark:text-mocha-text mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 border border-latte-overlay0 dark:border-mocha-overlay0 text-latte-text dark:text-mocha-text placeholder-latte-subtext0 dark:placeholder-mocha-subtext0 focus:border-latte-blue dark:focus:border-mocha-blue focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-latte-text dark:text-mocha-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 border border-latte-overlay0 dark:border-mocha-overlay0 text-latte-text dark:text-mocha-text placeholder-latte-subtext0 dark:placeholder-mocha-subtext0 focus:border-latte-blue dark:focus:border-mocha-blue focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-latte-blue to-latte-mauve dark:from-mocha-blue dark:to-mocha-mauve text-latte-base dark:text-mocha-base font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-latte-base dark:border-mocha-base border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Send size={20} className="mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-latte-green dark:text-mocha-green"
                  >
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-latte-red dark:text-mocha-red"
                  >
                    <AlertCircle size={20} />
                    <span>Something went wrong. Please try again or contact me directly.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
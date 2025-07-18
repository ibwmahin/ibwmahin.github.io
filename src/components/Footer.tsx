import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Github, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: 'https://facebook.com/ibwmahin',
      color: 'hover:text-latte-blue dark:hover:text-mocha-blue'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      url: 'https://instagram.com/ibwmahin',
      color: 'hover:text-latte-pink dark:hover:text-mocha-pink'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: 'https://linkedin.com/in/ibwmahin',
      color: 'hover:text-latte-blue dark:hover:text-mocha-blue'
    },
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      url: 'https://github.com/ibwmahin',
      color: 'hover:text-latte-subtext1 dark:hover:text-mocha-subtext1'
    }
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} />,
      text: 'ibwmahin@gmail.com',
      link: 'mailto:ibwmahin@gmail.com'
    },
    {
      icon: <Phone size={16} />,
      text: '+8801854333256',
      link: 'tel:+8801854333256'
    }
  ];

  return (
    <footer className="bg-latte-surface0 dark:bg-mocha-surface0 border-t border-latte-surface1 dark:border-mocha-surface1 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-latte-blue to-latte-mauve dark:from-mocha-blue dark:to-mocha-mauve bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-latte-subtext1 dark:text-mocha-subtext1 text-sm mt-2">
              Crafting digital experiences
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-latte-subtext1 dark:text-mocha-subtext1 ${social.color} transition-colors`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center md:text-right space-y-2"
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center justify-center md:justify-end space-x-2">
                <div className="text-latte-blue dark:text-mocha-blue">
                  {info.icon}
                </div>
                <a
                  href={info.link}
                  className="text-latte-subtext1 dark:text-mocha-subtext1 hover:text-latte-blue dark:hover:text-mocha-blue transition-colors text-sm"
                >
                  {info.text}
                </a>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-8 border-t border-latte-surface1 dark:border-mocha-surface1 text-center"
        >
          <p className="text-latte-subtext0 dark:text-mocha-subtext0 text-sm">
            © 2024 Portfolio. Built with React, Tailwind CSS, and Framer Motion.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import {
  Github as GitHub,
  Twitter,
  Linkedin,
  Mail,
  ArrowUp,
} from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background-glass backdrop-blur-md border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AbdulLa Al Mahin. All Rights Reserved.
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </button>

          {/* Social links */}
          <div className="flex space-x-4">
            <a
              target="_blank"
              href="https://github.com/ibwmahin/"
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GitHub size={20} />
            </a>
            <a
              target="_blank"
              href="https://x.com/ibwmahin"
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ibwmahin/"
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              target="_blank"
              href="mailto:ibwmahin@mail.com"
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


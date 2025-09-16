import { motion } from "framer-motion";

interface FooterProps {
  logoText?: string;
  aboutText?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

const Footer = ({
  logoText = "Abdulla Al Mahin",
  aboutText = "A passionate developer turning ideas into beautiful, growth-focused digital experiences.",
  contactEmail = "ibwmahin@gmail.com",
  contactPhone = "+880 1854333256",
  address = "Dhaka, BanglaDesh",
  socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ibwmahin/",
      icon: "linkedin",
    },
    { name: "Github", url: "https://github.com/ibwmahin/", icon: "github" },
    {
      name: "Instagram",
      url: "https://instagram.com/ibwmahin/",
      icon: "instagram",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/ibwmahin/",
      icon: "facebook",
    },
  ],
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "linkedin":
        return <i className="fa-brands fa-linkedin text-2xl"></i>;
      case "github":
        return <i className="fa-brands fa-github text-2xl"></i>;
      case "instagram":
        return <i className="fa-brands fa-instagram text-2xl"></i>;
      case "facebook":
        return <i className="fa-brands fa-facebook text-2xl"></i>;
      default:
        return null;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 5px rgba(129, 140, 248, 0.2)",
        "0 0 15px rgba(129, 140, 248, 0.4)",
        "0 0 5px rgba(129, 140, 248, 0.2)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-b from-black to-green-900 text-white"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <div className="container py-16">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {/* Company Info */}
          <motion.div className="lg:col-span-2" variants={childVariants}>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
              {logoText}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {aboutText}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-green-400 hover:bg-green-400/20 transition-all"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  variants={glowVariants}
                  animate="glow"
                >
                  {renderSocialIcon(social.icon)}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={childVariants}>
            <h4 className="font-semibold mb-4 text-green-400">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-green-400 transition-colors"
                >
                  {contactEmail}
                </a>
              </div>
              <div>
                <div className="text-sm text-gray-400">Phone</div>
                <a
                  href={`tel:${contactPhone}`}
                  className="hover:text-green-400 transition-colors"
                >
                  {contactPhone}
                </a>
              </div>
              <div>
                <div className="text-sm text-gray-400">Location</div>
                <span>{address}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={childVariants}>
            <h4 className="font-semibold mb-4 text-green-400">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-gray-300 hover:text-green-400 transition-colors text-left relative group"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-green-400 transition-all group-hover:w-full"></span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-green-400/20 mt-12 pt-8 text-center text-gray-400"
          variants={childVariants}
        >
          <p>
            &copy; {currentYear} {logoText}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

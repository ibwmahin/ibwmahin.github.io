import { Github, Linkedin, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://www.github.com/ibwmahin/", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ibwmahin/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ibwmahin",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-foreground/70">
              © 2025 Abdulla Al Mahin. Made with
            </span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-foreground/70">in Bangladesh</span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
  logoText = " Abdulla Al Mahin",
  aboutText = "A passionate developer turning ideas into beautiful, growth-focused digital experiences.",
  contactEmail = "ibwmahin@gmail.com",
  contactPhone = "+880 1854333256",
  address = "Dhaka, BanglaDesh",

  socialLinks = [
    { name: "LinkedIn", url: "#", icon: "linkedin" },
    { name: "Github", url: "#", icon: "github" },
    { name: "Instagram", url: "#", icon: "instagram" },
    { name: "Facebook", url: "#", icon: "facebook" },
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
        return <i className="bxl bx-linkedin-square text-2xl"></i>;
      case "github":
        return <i className="bxl bx-github text-2xl"></i>;
      case "instagram":
        return <i className="bxl bx-instagram text-2xl"></i>;
      case "facebook":
        return <i className="bxl bx-facebook-square text-2xl"></i>;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">{logoText}</h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              {aboutText}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-all"
                  aria-label={social.name}
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-white/70">
              <div>
                <div className="text-sm text-white/50">Email</div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {contactEmail}
                </a>
              </div>
              <div>
                <div className="text-sm text-white/50">Phone</div>
                <a
                  href={`tel:${contactPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {contactPhone}
                </a>
              </div>
              <div>
                <div className="text-sm text-white/50">Location</div>
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white/70 hover:text-white transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50">
          <p>
            &copy; {currentYear} {logoText}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

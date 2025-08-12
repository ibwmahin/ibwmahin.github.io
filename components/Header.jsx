"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", hash: "#home" },
    { name: "About", href: "/", hash: "#about" },
    { name: "Experience", href: "/", hash: "#experience" },
    { name: "Works", href: "/", hash: "#portfolio" },
    { name: "Impact Chronicles", href: "/case-studies", hash: null },
    { name: "Contact", href: "/", hash: "#contact" },
  ];

  const handleNavClick = (item) => {
    setIsOpen(false);
    if (item.hash && pathname === "/") {
      setTimeout(() => {
        const element = document.querySelector(item.hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <button
        className={`menu-btn fixed top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 w-8 h-8 sm:w-9 sm:h-9 cursor-pointer z-50 lg:hidden xl:hidden 2xl:hidden flex flex-col justify-center items-center space-y-1 ${
          isOpen ? "nav-active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span
          className={`block w-5 sm:w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-5 sm:w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 sm:w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      <header
        className={`fixed left-0 top-0 w-full sm:w-72 md:w-80 lg:w-64 xl:w-72 2xl:w-80 h-full bg-white px-4 sm:px-5 md:px-6 z-40 transition-transform duration-300 lg:translate-x-0 xl:translate-x-0 2xl:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="navigation">
            <div className="mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-5">
              <Link href="/">
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-bold text-gray-900">
                  Mahin.
                </h1>
              </Link>
            </div>

            <nav className="my-8 sm:my-10 md:my-12">
              <ul className="space-y-0">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item)}
                      className={`block py-2 sm:py-3 text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-xl font-normal text-gray-900 border-b border-gray-300 relative transition-all duration-200 hover:text-gray-900 ${
                        (item.href === "/case-studies" &&
                          pathname === "/case-studies") ||
                        (item.name === "Home" && pathname === "/")
                          ? "after:content-[''] after:absolute after:-bottom-px after:left-0 after:w-full after:h-px after:bg-gray-900"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-5 mb-4 sm:mb-6">
            <div className="py-2 sm:py-3 my-2 sm:my-3 border-b border-gray-300">
              <a
                href="mailto:ibwmahin@gmail.com"
                className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg text-gray-900 break-all"
              >
                ibwmahin@gmail.com
              </a>
            </div>

            <ul className="flex justify-start flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
              {/* Facebook */}
              <li>
                <a
                  href="https://facebook.com/ibwmahin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 inline-block leading-none"
                  aria-label="Facebook"
                >
                  <i
                    className="fa-brands fa-facebook-f text-[20px] sm:text-[24px] md:text-[24px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]"
                    aria-hidden="true"
                  />
                </a>
              </li>

              {/* Twitter */}
              <li>
                <a
                  href="https://twitter.com/ibwmahin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 inline-block leading-none"
                  aria-label="Twitter"
                >
                  <i
                    className="fa-brands fa-twitter text-[20px] sm:text-[24px] md:text-[24px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]"
                    aria-hidden="true"
                  />
                </a>
              </li>

              {/* LinkedIn */}
              <li>
                <a
                  href="https://linkedin.com/in/ibwmahin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 inline-block leading-none"
                  aria-label="LinkedIn"
                >
                  <i
                    className="fa-brands fa-linkedin-in text-[20px] sm:text-[24px] md:text-[24px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]"
                    aria-hidden="true"
                  />
                </a>
              </li>

              {/* YouTube */}
              <li>
                <a
                  href="https://youtube.com/@ibwmahin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 inline-block leading-none"
                  aria-label="YouTube"
                >
                  <i
                    className="fa-brands fa-youtube text-[20px] sm:text-[24px] md:text-[24px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]"
                    aria-hidden="true"
                  />
                </a>
              </li>

              {/* GitHub */}
              <li>
                <a
                  href="https://github.com/ibwmahin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 inline-block leading-none"
                  aria-label="GitHub"
                >
                  <i
                    className="fa-brands fa-github text-[20px] sm:text-[24px] md:text-[24px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]"
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>

            <div className="py-3 sm:py-4 border-t border-gray-300">
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-gray-600">
                HTML by{" "}
                <a
                  href="https://templatesjungle.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900"
                >
                  TemplatesJungle
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden xl:hidden 2xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

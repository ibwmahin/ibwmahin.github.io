import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faFolderOpen, // better for "Projects"
  faBox, // better for "Products"
  faPen, // blog
  faShoppingCart,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeProvider";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: faHome, label: "Home" },
    { path: "/about", icon: faUser, label: "About" },
    { path: "/projects", icon: faFolderOpen, label: "Projects" }, // changed
    { path: "/products", icon: faBox, label: "Products" }, // changed
    { path: "/blog", icon: faPen, label: "Blog" }, // new
  ];

  return (
    // fixed top center
    <div
      className="
        fixed left-1/2 top-4 transform -translate-x-1/2 z-50
        sm:top-4 md:top-6
      "
    >
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="
          pointer-events-auto
          bg-white/8 dark:bg-black/30 backdrop-blur-md
          border border-white/6 dark:border-black/20
          rounded-2xl px-5 py-3 shadow-lg
          flex items-center gap-4
          min-w-[260px] md:min-w-[460px]
        "
      >
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const safeId = `tooltip-${item.path.replace(/[^a-zA-Z0-9]/g, "") || "home"}`;
            return (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  aria-describedby={safeId}
                  className={`
                    flex items-center justify-center
                    w-9 h-9 rounded-lg
                    transition-all
                    ${
                      active
                        ? "bg-primary text-primary-foreground shadow-inner"
                        : "hover:bg-white/10 dark:hover:bg-white/6"
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
                  `}
                  title={item.label}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="sr-only">{item.label}</span>
                </Link>

                {/* Tooltip */}
                <span
                  id={safeId}
                  role="tooltip"
                  className="
                    absolute bottom-full left-1/2 mb-2 -translate-x-1/2
                    whitespace-nowrap text-xs rounded px-2 py-1
                    bg-black/85 text-white text-[12px] font-medium
                    shadow-md
                    opacity-0 scale-95 translate-y-1
                    group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                    transition-all duration-180
                    pointer-events-none
                    dark:bg-white/12 dark:text-white
                  "
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* Theme toggle with tooltip */}
        <div className="relative group">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-describedby="tooltip-theme"
            className="
              w-9 h-9 rounded-lg flex items-center justify-center
              hover:bg-white/10 dark:hover:bg-white/6
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
            "
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="w-4 h-4"
            />
            <span className="sr-only">Toggle theme</span>
          </button>

          <span
            id="tooltip-theme"
            role="tooltip"
            className="
              absolute bottom-full left-1/2 mb-2 -translate-x-1/2
              whitespace-nowrap text-xs rounded px-2 py-1
              bg-black/85 text-white text-[12px] font-medium
              shadow-md
              opacity-0 scale-95 translate-y-1
              group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
              transition-all duration-180
              pointer-events-none
              dark:bg-white/12 dark:text-white
            "
          >
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </span>
        </div>

        <Link to="/contact" aria-label="Hire me">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              px-3 py-1.5 rounded-lg font-medium text-sm
              bg-primary text-primary-foreground
              shadow-md
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
            "
            title="Hire me"
          >
            Hire Me
          </motion.button>
        </Link>
      </motion.nav>
    </div>
  );
}

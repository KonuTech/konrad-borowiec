import { useState, useEffect } from "react";
import { Link } from "wouter";
import DarkModeToggle from "./DarkModeToggle";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 bg-ghibli-light/80 dark:bg-ghibli-dark/80 backdrop-blur-md py-4 shadow-sm transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <a className="text-xl font-nunito font-bold bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">
              <span className="text-2xl">✨</span> Dev Portfolio
            </a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8 font-nunito font-semibold text-sm">
            <li>
              <a
                href="#home"
                className="hover:text-ghibli-pink transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-ghibli-pink transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-ghibli-pink transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#books"
                className="hover:text-ghibli-pink transition-colors duration-300"
              >
                Books
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-ghibli-pink transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;

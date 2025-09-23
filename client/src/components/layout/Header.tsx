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
      className={`fixed w-full top-0 z-50 bg-white/95 dark:bg-portfolio-darker/95 backdrop-blur-md py-4 shadow-sm transition-colors duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-nunito font-bold text-portfolio-dark dark:text-portfolio-lighter">
            <span className="text-2xl">👨‍💻</span> Konrad Borowiec
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8 font-nunito font-semibold text-sm text-portfolio-text dark:text-portfolio-lighter">
            <li>
              <a
                href="#home"
                className="hover:text-portfolio-primary transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-portfolio-primary transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-portfolio-primary transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#books"
                className="hover:text-portfolio-primary transition-colors duration-300"
              >
                Books
              </a>
            </li>
            <li>
              <a
                href="#interests"
                className="hover:text-portfolio-primary transition-colors duration-300"
              >
                Interests
              </a>
            </li>
            <li>
              <a
                href="#contact-info"
                className="hover:text-portfolio-primary transition-colors duration-300"
              >
                Contact Me
              </a>
            </li>

          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-full p-2 hover:bg-portfolio-lightest dark:hover:bg-portfolio-dark transition-colors duration-300 text-portfolio-text dark:text-portfolio-lighter"
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

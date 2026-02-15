import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-portfolio-lightest dark:bg-portfolio-darker py-10 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-nunito font-bold text-portfolio-dark dark:text-portfolio-lighter">
              <span className="text-2xl">👨‍💻</span> Konrad Borowiec
            </Link>
            <p className="text-sm mt-2 text-portfolio-muted">Data Analysis & Data Engineering</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-portfolio-text dark:text-portfolio-lighter">&copy; {currentYear} Konu-Tec Konrad Borowiec. All rights reserved.</p>
            <p className="text-xs mt-2 text-portfolio-muted">Professional data solutions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

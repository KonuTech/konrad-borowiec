import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/">
              <a className="text-xl font-nunito font-bold bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">
                <span className="text-2xl">✨</span> Dev Portfolio
              </a>
            </Link>
            <p className="text-sm mt-2">Creating magical web experiences</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm">&copy; {currentYear} Dev Portfolio. All rights reserved.</p>
            <p className="text-xs mt-2">Designed with 💜 and Studio Ghibli inspiration</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

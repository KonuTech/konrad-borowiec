import { FC } from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/about/AboutSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import BooksSection from '@/components/books/BooksSection';
import ContactSection from '@/components/contact/ContactSection';

const Home: FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <BooksSection />
      <ContactSection />
    </>
  );
};

export default Home;

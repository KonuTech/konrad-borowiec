import { FC } from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/about/AboutSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import BooksSection from '@/components/books/BooksSection';
import InterestsSection from '@/components/interests/InterestsSection';

const Home: FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <BooksSection />
      <InterestsSection />
    </>
  );
};

export default Home;

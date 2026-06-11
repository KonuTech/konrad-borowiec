import { FC } from 'react';
import { SKILL_TECHNOLOGIES } from '@/data/technologies';
import { TECH_ICONS } from './techIcons';

type TechStackProps = {
  /** Currently selected technology ids (filter state). */
  selected: string[];
  /** Toggle a technology in/out of the filter. */
  onToggle: (id: string) => void;
};

const TechStack: FC<TechStackProps> = ({ selected, onToggle }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      {SKILL_TECHNOLOGIES.map((tech) => {
        const active = selected.includes(tech.id);
        return (
          <button
            key={tech.id}
            type="button"
            onClick={() => onToggle(tech.id)}
            aria-pressed={active}
            title={tech.label}
            className="group flex flex-col items-center focus:outline-none"
          >
            <div
              className={`mb-2 flex h-16 w-16 items-center justify-center rounded-lg shadow-md transition-all duration-200 group-hover:shadow-lg ${
                active
                  ? 'bg-portfolio-primary text-white ring-2 ring-portfolio-primary ring-offset-2 ring-offset-portfolio-lightest dark:ring-offset-portfolio-dark'
                  : 'bg-white text-portfolio-primary group-hover:-translate-y-0.5 dark:bg-portfolio-dark dark:text-portfolio-lighter'
              }`}
            >
              {TECH_ICONS[tech.id]}
            </div>
            <span
              className={`text-sm font-medium transition-colors ${
                active
                  ? 'text-portfolio-primary dark:text-portfolio-light'
                  : 'text-portfolio-text dark:text-portfolio-lighter'
              }`}
            >
              {tech.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TechStack;

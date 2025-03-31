import { FC } from 'react';

type TechItem = {
  name: string;
  icon: string;
};

const techStack: TechItem[] = [
  { name: "React", icon: "fab fa-react" },
  { name: "Node.js", icon: "fab fa-node-js" },
  { name: "TypeScript", icon: "fab fa-js" },
  { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
  { name: "MongoDB", icon: "fas fa-database" },
  { name: "Express", icon: "fas fa-server" },
  { name: "Git", icon: "fas fa-code-branch" },
  { name: "Responsive", icon: "fas fa-mobile-alt" }
];

const TechStack: FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {techStack.map((tech, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center mb-2">
            <i className={`${tech.icon} text-2xl text-ghibli-blue`}></i>
          </div>
          <span className="text-sm font-medium">{tech.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TechStack;

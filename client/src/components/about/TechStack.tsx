import { FC } from 'react';

type TechItem = {
  name: string;
  icon: string;
};

const techStack: TechItem[] = [
  { name: "SQL", icon: "fas fa-database" },
  { name: "Python", icon: "fab fa-python" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "Oracle", icon: "fas fa-database" },
  { name: "PySpark", icon: "fab fa-python" },
  { name: "Airflow", icon: "fas fa-wind" },
  { name: "Hadoop", icon: "fas fa-server" },
  { name: "SAS", icon: "fas fa-chart-line" }
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

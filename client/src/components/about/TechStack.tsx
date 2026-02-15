import { FC } from 'react';

type TechItem = {
  name: string;
  icon: string;
};

const techStack: TechItem[] = [
  { name: "SQL", icon: "fas fa-database" },
  { name: "Oracle", icon: "fas fa-database" },
  { name: "SAS", icon: "fas fa-chart-line" },
  { name: "Hadoop", icon: "fas fa-server" },
  { name: "Python", icon: "fab fa-python" },
  { name: "PySpark", icon: "fab fa-python" },
  { name: "Databricks", icon: "fas fa-bolt" },
  { name: "Apache Airflow", icon: "fas fa-wind" },
  { name: "Linux", icon: "fab fa-linux" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "Claude Code", icon: "fas fa-code" },
  { name: "MS Excel", icon: "fas fa-table" },
  { name: "GCP - Big Query", icon: "fab fa-google" },
  { name: "Apache Superset", icon: "fas fa-chart-bar" },
  { name: "GitLab", icon: "fab fa-gitlab" },
  { name: "VS Code", icon: "fas fa-code" },
];

const TechStack: FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {techStack.map((tech, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white dark:bg-portfolio-dark rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center mb-2">
            <i className={`${tech.icon} text-2xl text-portfolio-primary dark:text-portfolio-lighter`}></i>
          </div>
          <span className="text-sm font-medium text-portfolio-text dark:text-portfolio-lighter">{tech.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TechStack;

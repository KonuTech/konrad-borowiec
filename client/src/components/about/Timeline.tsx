import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'education';
};

const timelineItems: TimelineItem[] = [
  {
    title: "Data Analytics & Engineering",
    organization: "Public Sector",
    period: "08.2024 - 02.2025",
    description: "Worked with Oracle SQL/PL/SQL for national data reporting. Developed a PoC application to visualize routes between controlled entities and controllers using Python and SQL.",
    type: 'work'
  },
  {
    title: "B2B Consultant",
    organization: "B2B.NET S.A. (BNP Paribas Bank Polska S.A.)",
    period: "07.2023 - 03.2024",
    description: "Developed ELT data pipelines for Open Banking, processing JSON data into Hive tables using MongoDB, HDFS, HiveSQL, Python, and Airflow.",
    type: 'work'
  },
  {
    title: "Big Data Developer",
    organization: "Crestt Sp z o.o. (Bank Pekao, Nationale-Nederlanden)",
    period: "02.2021 - 06.2022",
    description: "Built batch data processing solutions using Airflow, Python, PySpark, and Hive. Developed churn classifiers and HR dashboards using SAS Viya.",
    type: 'work'
  },
  {
    title: "Business Intelligence Analyst",
    organization: "PZU S.A.",
    period: "10.2020 - 01.2021",
    description: "Tested output tables created by SAS Developers and maintained documentation for the Property Insurances department.",
    type: 'work'
  },
  {
    title: "Big Data Engineering",
    organization: "Polish-Japanese Academy of Information Technology",
    period: "03.2018 - 02.2019",
    description: "Postgraduate studies in Large Data Sets Engineering. Developed a movie recommender system using Python for the end project.",
    type: 'education'
  },
  {
    title: "MSc Finance and Accounting",
    organization: "Warsaw School of Economics",
    period: "02.2012 - 11.2014",
    description: "Specialized in International financial markets. Thesis: The use of logistic regression model to estimate probability of a correction of Polish current account.",
    type: 'education'
  }
];

// Sort items by date (most recent first)
const sortedTimelineItems = [...timelineItems].sort((a, b) => {
  const aYear = parseInt(a.period.split(' - ')[0].split('.')[1]);
  const bYear = parseInt(b.period.split(' - ')[0].split('.')[1]);
  if (aYear !== bYear) return bYear - aYear;
  
  const aMonth = parseInt(a.period.split(' - ')[0].split('.')[0]);
  const bMonth = parseInt(b.period.split(' - ')[0].split('.')[0]);
  return bMonth - aMonth;
});

const TimelineItem: FC<{ 
  item: TimelineItem; 
  isLast: boolean; 
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isLast, isActive, onClick }) => {
  return (
    <motion.div 
      layout
      className={`relative mb-8 ${isLast ? 'mb-0' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start">
        <div className="relative mr-4">
          <div 
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer
              ${item.type === 'work' 
                ? 'bg-ghibli-purple text-white' 
                : 'bg-ghibli-pink text-white'}`}
            onClick={onClick}
          >
            {item.type === 'work' 
              ? <i className="fas fa-briefcase text-xs"></i> 
              : <i className="fas fa-graduation-cap text-xs"></i>}
          </div>
          {!isLast && (
            <div className="absolute top-6 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-300 dark:bg-gray-600 h-full"></div>
          )}
        </div>
        
        <div className="flex-1">
          <div 
            onClick={onClick}
            className={`flex justify-between items-center cursor-pointer bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md 
              ${isActive ? 'border-l-4 border-ghibli-purple dark:border-ghibli-lightPink' : ''}`}
          >
            <div>
              <h4 className="font-nunito font-bold text-lg">{item.title}</h4>
              <h5 className="text-sm text-gray-600 dark:text-gray-400">{item.organization}</h5>
            </div>
            <span className="text-xs px-3 py-1 bg-ghibli-lightBlue dark:bg-ghibli-blue/30 text-ghibli-blue dark:text-ghibli-lightBlue rounded-full whitespace-nowrap">
              {item.period}
            </span>
          </div>
          
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pl-4 pr-4 pb-2 bg-white dark:bg-gray-800 rounded-b-lg shadow-md mt-1">
                  <p className="text-sm">{item.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="pl-4 pr-4">
      {sortedTimelineItems.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          isLast={index === sortedTimelineItems.length - 1}
          isActive={activeIndex === index}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Timeline;

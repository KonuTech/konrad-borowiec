import { FC, useState, useEffect } from 'react';
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
    title: "Data Engineer",
    organization: "Sublime Sp z o.o.",
    period: "10.2025 - 03.2026",
    description: "Responsible for designing and developing data pipelines and ETL processes. Collaborated with cross-functional teams to ensure data quality and availability. Contributed to data architecture improvements and automation of data workflows.",
    type: 'work'
  },
  {
    title: "B2B Consultant",
    organization: "Crestt Sp z o.o. (Santander Bank Polska S.A.)",
    period: "04.2025 - 08.2025",
    description: "Supporting role in Oracle APEX application development. Collaborated with business analysts to assist in the development of a reporting tool for ESRS (European Sustainability Reporting Standards). Designed and implemented BI functionalities into APEX application using PL/SQL. Performed modifications to the reporting model when needed. Utilized PL/SQL to generate and displayed reports. Contributed ideas and provided feedback by applying my expertise and knowledge in reporting tasks.",
    type: 'work'
  },
  {
    title: "Data Analytics & Engineering",
    organization: "Public Sector",
    period: "08.2024 - 02.2025",
    description: "Depending on the scale of analysis, reporting of national data using either Oracle SQL or Oracle PL/SQL. Development of a PoC application to calculate and visualize the closest routes between a controlled entity and ten closest controllers (public sector employees). A graph problem on a big data scale. Used Python and SQL.",
    type: 'work'
  },
  {
    title: "B2B Consultant",
    organization: "B2B.NET S.A. (BNP Paribas Bank Polska S.A.)",
    period: "07.2023 - 03.2024",
    description: "Development of ELT data pipelines for the Open Banking area. Including flattening, deduplication, and normalization of JSON data source into Hive tables. Processing both semi-structured and structured data. Technologies used: MongoDB, HDFS, HiveSQL, Python, Airflow, and GitLab for CICD. Ad-hoc analysis of customers activity within Open Banking area.",
    type: 'work'
  },
  {
    title: "Big Data Developer",
    organization: "Crestt Sp z o.o. (Bank Pekao S.A., Nationale-Nederlanden S.A.)",
    period: "02.2021 - 06.2022",
    description: "Development of batch data processing solutions for one of the largest banks in Poland. The ELT processes for Data Lake were designed using Airflow, Python, PySpark, and Hive within the on-premise Cloudera Data Platform. Development and operationalization of churn related classifier for insurance company. Added functionalities for scoring and monitoring of new data. Development and operationalization of classifiers for VR training company. Design and development of HR demo dashboard with a use SAS Viya.",
    type: 'work'
  },
  {
    title: "Business Intelligence Analyst",
    organization: "PZU S.A.",
    period: "10.2020 - 01.2021",
    description: "Tester of output tables created by SAS Developers. Maintenance of documentation in the Area of Property Insurances.",
    type: 'work'
  },
  {
    title: "SAS Analyst",
    organization: "ITFS Sp. z o. o. (PZU S.A.)",
    period: "05.2020 - 09.2020",
    description: "Co-responsible for migrating SAS Visual Analytics reports to the SAS Viya environment for Poland's largest insurance company. Tasks included importing dashboards to Viya, repairing XML schemas, redesigning dashboard layouts for improved UX, creating global Themes, developing XML/HTML forms, and processing JSON files using Python.",
    type: 'work'
  },
  {
    title: "Junior Data Scientist",
    organization: "Crestt Sp z o. o. (Polkomtel Sp. z o. o., TVP S.A.)",
    period: "03.2019 - 04.2020",
    description: "As a consultant at a major Polish telecom, participated in projects to upgrade data mart recalculation processes. Developed production-ready SAS scripts focusing on 4GL and SQL for data processing. Handled data collection and segmentation using Python. Contributed to dashboard development using Shiny and Tableau.",
    type: 'work'
  },
  {
    title: "Data/Business Intelligence Analyst",
    organization: "NatWest Markets plc\nThe Royal Bank of Scotland Group",
    period: "11.2016 - 03.2019",
    description: "Consolidated and simplified financial regulatory reporting using SAS 4GL and SQL. Developed reports using SAP BO, SAS EG, and SAS VA. Utilized Stored Processes for user self-service. Recognized as a top dashboard developer and ranked in top ten in an internal competition designing optimal binary classifiers with customer data.",
    type: 'work'
  },
  {
    title: "Data Analyst",
    organization: "Bank Pocztowy S.A.",
    period: "11.2015 - 11.2016",
    description: "Automated reporting using SAS Guide and SAS VA. Developed dashboards for evaluating bank branch performance, facilitating statistical and visual analysis of issued loans.",
    type: 'work'
  },
  {
    title: "Junior Reporting Specialist",
    organization: "ASB Poland Sp. z o. o.",
    period: "07.2015 - 09.2015",
    description: "Processed financial data, actualized financial statements, and supported data migration between databases.",
    type: 'work'
  },
  {
    title: "Intern, Credit Portfolio Analysis",
    organization: "Bank BPH S.A., GE Capital",
    period: "03.2014 - 02.2015",
    description: "Supported the development of a predictive model used for estimation of LGD parameter in the Valuation Standards and Reporting Team.",
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
    title: "Statistical Analysis and Data Mining",
    organization: "Warsaw School of Economics",
    period: "10.2013 - 06.2015",
    description: "Postgraduate studies. Assessment of Reject Inference methods implemented in SAS Enterprise Miner with a use of credit scorecard models built on randomly generated consumer finance portfolio data.",
    type: 'education'
  },
  {
    title: "MSc Finance and Accounting",
    organization: "Warsaw School of Economics",
    period: "02.2012 - 11.2014",
    description: "Specialized in International Financial Markets. Thesis: The use of logistic regression model to estimate probability of a correction of Polish current account basing on determinants of Polish balance of payments.",
    type: 'education'
  },
  {
    title: "Erasmus Exchange Program",
    organization: "European University Viadrina Frankfurt (Oder)",
    period: "04.2011 - 07.2011",
    description: "Student exchange program.",
    type: 'education'
  },
  {
    title: "Faculty of Administration and Social Sciences",
    organization: "Warsaw University of Technology",
    period: "10.2008 - 01.2012",
    description: "The analysis of state budget in 2006-2010.",
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
  index: number;
}> = ({ item, isLast, isActive, onClick, index }) => {
  useEffect(() => {
    if (isLast && isActive) {
      setTimeout(() => {
        const descriptionElement = document.querySelector(`.timeline-description-id-${index}`);
        if (descriptionElement) {
          const descriptionHeight = descriptionElement.clientHeight || 0;
          const isMobile = window.innerWidth < 768;
          const multiplier = isMobile ? 1.5 : 0.5;
          const calculatedHeight = Math.max(isMobile ? 8 : 3, (descriptionHeight / 16) * multiplier);
          document.documentElement.style.setProperty('--timeline-line-height-last', `calc(100% + ${calculatedHeight}rem)`);
        }
      }, 10);
    }
  }, [isActive, isLast, index]);

  return (
    <motion.div 
      layout
      className={`relative mb-8 ${isLast ? 'mb-0' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start">
        <div className="relative mr-6">
          <div className="flex flex-col items-center">
            {/* Icon container */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer relative z-10
                ${item.type === 'work'
                  ? 'bg-portfolio-primary text-white'
                  : 'bg-portfolio-accent dark:bg-portfolio-darker text-white'}`}
              onClick={onClick}
            >
              {item.type === 'work'
                ? <i className="fas fa-briefcase text-lg"></i>
                : <i className="fas fa-graduation-cap text-lg"></i>}
            </div>
            
            {/* Vertical line that extends dynamically */}
            <div className="relative w-full min-h-[4rem]">
              {!isLast && (
                <motion.div
                  className="w-1 bg-portfolio-lighter dark:bg-[#4A90E2] absolute left-1/2 transform -translate-x-1/2"
                  initial={{ height: "4rem" }}
                  animate={{
                    height: isActive ? "var(--timeline-line-height, calc(100% + 6rem))" : "4rem"
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                  style={{ top: "0.5rem" }}
                  onAnimationStart={() => {
                    if (isActive) {
                      // Delay to let the content expand first
                      setTimeout(() => {
                        const descriptionHeight = document.querySelector(`.timeline-description-id-${index}`)?.clientHeight || 0;
                        document.documentElement.style.setProperty('--timeline-line-height', `calc(100% + ${Math.max(4, descriptionHeight / 16)}rem)`);
                      }, 10);
                    }
                  }}
                />
              )}
              {isLast && (
                <motion.div
                  className="w-1 bg-portfolio-lighter dark:bg-[#4A90E2] absolute left-1/2 transform -translate-x-1/2"
                  initial={{ height: "4rem" }}
                  animate={{
                    height: isActive ? "var(--timeline-line-height-last, calc(100% + 6rem))" : "4rem"
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                  style={{ top: "0.5rem" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          {/* Title and organization card */}
          <div 
            onClick={onClick}
            className={`flex flex-col cursor-pointer bg-white dark:bg-portfolio-darker rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow w-full
              ${isActive ? 'border-l-4 border-portfolio-primary dark:border-portfolio-primary' : ''}`}
          >
            <div className="flex-grow">
              {/* Responsive layout for title, organization, and date */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h4 className="font-nunito font-bold text-lg text-portfolio-dark dark:text-portfolio-lighter">{item.title}</h4>
                  <h5 className="text-sm text-portfolio-text dark:text-portfolio-lighter/70 whitespace-pre-line">{item.organization}</h5>
                  {/* Date displayed under organization on mobile */}
                  <div className="text-sm font-medium text-portfolio-text dark:text-portfolio-lighter mt-1 block sm:hidden">
                    {item.period}
                  </div>
                </div>
                {/* Date displayed on the right side on larger screens */}
                <div className="text-sm font-medium text-portfolio-text dark:text-portfolio-lighter text-right whitespace-nowrap hidden sm:block">
                  {item.period}
                </div>
              </div>
            </div>
          </div>

          {/* Description (expands/collapses) */}
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                layout
              >
                <div className={`pt-4 pl-4 pr-4 pb-2 bg-white dark:bg-portfolio-darker rounded-b-lg shadow-md mt-1 timeline-description-id-${index}`}>
                  <p className="text-sm text-portfolio-text dark:text-portfolio-lighter/90">{item.description}</p>
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
      <AnimatePresence>
        {sortedTimelineItems.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            isLast={index === sortedTimelineItems.length - 1}
            isActive={activeIndex === index}
            onClick={() => toggleItem(index)}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
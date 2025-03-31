import { FC } from 'react';

type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
};

const timelineItems: TimelineItem[] = [
  {
    title: "Data Analytics & Engineering",
    organization: "Public Sector",
    period: "08.2024 - 02.2025",
    description: "Worked with Oracle SQL/PL/SQL for national data reporting. Developed a PoC application to visualize routes between controlled entities and controllers using Python and SQL."
  },
  {
    title: "B2B Consultant",
    organization: "B2B.NET S.A. (BNP Paribas Bank Polska S.A.)",
    period: "07.2023 - 03.2024",
    description: "Developed ELT data pipelines for Open Banking, processing JSON data into Hive tables using MongoDB, HDFS, HiveSQL, Python, and Airflow."
  },
  {
    title: "Big Data Developer",
    organization: "Crestt Sp z o.o. (Bank Pekao, Nationale-Nederlanden)",
    period: "02.2021 - 06.2022",
    description: "Built batch data processing solutions using Airflow, Python, PySpark, and Hive. Developed churn classifiers and HR dashboards using SAS Viya."
  },
  {
    title: "Business Intelligence Analyst",
    organization: "PZU S.A.",
    period: "10.2020 - 01.2021",
    description: "Tested output tables created by SAS Developers and maintained documentation for the Property Insurances department."
  },
  {
    title: "MSc Finance and Accounting",
    organization: "Warsaw School of Economics",
    period: "02.2012 - 11.2014",
    description: "Specialized in International financial markets. Thesis: The use of logistic regression model to estimate probability of a correction of Polish current account."
  },
  {
    title: "Big Data Engineering",
    organization: "Polish-Japanese Academy of Information Technology",
    period: "03.2018 - 02.2019",
    description: "Postgraduate studies in Large Data Sets Engineering. Developed a movie recommender system using Python for the end project."
  }
];

const TimelineItem: FC<{ item: TimelineItem; isLast: boolean }> = ({ item, isLast }) => {
  return (
    <div className={`mb-10 relative timeline-dot ${isLast ? 'mb-0' : ''}`}>
      <div className="h-5 w-5 rounded-full bg-ghibli-purple absolute left-0 top-0 transform -translate-x-1/2 z-10"></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md ml-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-nunito font-bold text-lg">{item.title}</h4>
          <span className="text-sm px-3 py-1 bg-ghibli-lightBlue dark:bg-ghibli-blue/30 text-ghibli-blue dark:text-ghibli-lightBlue rounded-full">{item.period}</span>
        </div>
        <h5 className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.organization}</h5>
        <p className="text-sm">{item.description}</p>
      </div>
    </div>
  );
};

const Timeline: FC = () => {
  return (
    <div className="pl-8 relative">
      {timelineItems.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          isLast={index === timelineItems.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;

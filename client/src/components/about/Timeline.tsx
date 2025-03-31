import { FC } from 'react';

type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
};

const timelineItems: TimelineItem[] = [
  {
    title: "Senior Frontend Developer",
    organization: "InnovateX Solutions",
    period: "2020 - Present",
    description: "Led development of multiple client projects using React and TypeScript. Mentored junior developers and implemented best practices for code quality and performance."
  },
  {
    title: "Web Developer",
    organization: "Digital Creators Agency",
    period: "2018 - 2020",
    description: "Developed responsive web applications and e-commerce solutions. Worked in an agile environment with a focus on high-quality user experiences."
  },
  {
    title: "BSc Computer Science",
    organization: "University of Technology",
    period: "2014 - 2018",
    description: "Graduated with honors. Specialized in web technologies and interactive systems. Completed capstone project on generative art with JavaScript."
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

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PdfButtons from './PdfButtons';

const ContactInfo: FC = () => {
  const { t } = useTranslation();

  const cvContent = `I'm a Data Guy with a strong background in the financial services sector. I enjoy my work the most when the tools and solutions I develop are actively used by other people or businesses. With expertise in SQL, Python, and various data processing technologies, I focus on designing efficient data pipelines and extracting valuable insights.

My journey began in finance and analytics, evolving into a more technical role specializing in data engineering, big data processing, and machine learning. I enjoy solving complex data challenges and building robust, reliable solutions.`;

  return (
    <div className="flex h-full flex-col lg:flex-row lg:items-start lg:gap-16">
      <div>
        <h3 className="font-nunito mb-6 text-2xl font-bold text-portfolio-primary dark:text-portfolio-lighter md:mb-4">
          {t('contact.title')}
        </h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-portfolio-lighter/30 dark:bg-portfolio-primary/30">
              <i className="fas fa-envelope text-portfolio-primary dark:text-portfolio-lighter"></i>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-portfolio-text dark:text-portfolio-lighter/80">
                {t('contact.labels.email')}
              </p>
              <a
                href="mailto:borowiec.k@gmail.com"
                className="text-portfolio-primary hover:underline dark:text-portfolio-lighter"
              >
                borowiec.k@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-portfolio-lighter/30 dark:bg-portfolio-primary/30">
              <i className="fas fa-phone text-portfolio-primary dark:text-portfolio-lighter"></i>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-portfolio-text dark:text-portfolio-lighter/80">
                {t('contact.labels.phone')}
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter">+48 570 223 108</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-portfolio-lighter/30 dark:bg-portfolio-primary/30">
              <i className="fas fa-map-marker-alt text-portfolio-primary dark:text-portfolio-lighter"></i>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-portfolio-text dark:text-portfolio-lighter/80">
                {t('contact.labels.location')}
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter">Warsaw, Poland</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-0">
        <h3 className="font-nunito mb-6 text-2xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
          {t('contact.labels.connect')}
        </h3>

        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/konutech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-lighter dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
            </a>
            <a
              href="https://linkedin.com/in/32167"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-lighter dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
            </a>
            <a
              href="https://credly.com/users/konrad-borowiec/badges"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-lighter dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
              aria-label="Credly"
            >
              <i className="fas fa-certificate text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
            </a>
          </div>
          <h3 className="font-nunito mb-4 text-2xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
            {t('about.contact.pdf.download')}
          </h3>
          <PdfButtons cvContent={cvContent} />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

import { FC } from 'react';
import html2pdf from 'html2pdf.js';

interface PdfButtonsProps {
  language: 'en' | 'pl';
}

const PdfButtons: FC<PdfButtonsProps> = ({ language }) => {
  const currentDate = new Date().toLocaleDateString();
  const currentYear = new Date().getFullYear();

  const generateDownload = () => {
    const cvContent = language === 'en' ? getCVContent('en') : getCVContent('pl');

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `cv-konrad-borowiec-${language}-${currentDate}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'child'] },
    };

    const element = document.createElement('div');
    element.innerHTML = cvContent;

    html2pdf().set(opt).from(element).save();
  };

  const getCVContent = (lang: 'en' | 'pl'): string => {
    const headerSubtitle =
      lang === 'en'
        ? 'Data Engineer | Financial Services Specialist'
        : 'Inżynier danych | Specjalista usług finansowych';

    const aboutParagraphs =
      lang === 'en'
        ? [
            "I'm a Data Guy with a strong background in the financial services sector. I enjoy my work the most when the tools and solutions I develop are actively used by other people or businesses. With expertise in SQL, Python, and various data processing technologies, I focus on designing efficient data pipelines and extracting valuable insights.",
            'My journey began in finance and analytics, evolving into a more technical role specializing in data engineering, big data processing, and machine learning. I enjoy solving complex data challenges and building robust, reliable solutions.',
          ]
        : [
            'Jestem specjalistą od danych z mocnym zapleczem w sektorze usług finansowych. Największą satysfakcję czerpię z pracy wtedy, gdy narzędzia i rozwiązania, które tworzę, są aktywnie wykorzystywane przez ludzi i firmy. Dzięki biegłości w SQL, Pythonie oraz różnych technologiach przetwarzania danych skupiam się na projektowaniu wydajnych potoków danych i wyciąganiu z nich wartościowych wniosków.',
            'Moja droga zawodowa zaczęła się w finansach i analityce, by ewoluować w stronę bardziej technicznej roli — specjalizuję się w inżynierii danych, przetwarzaniu big data i uczeniu maszynowym. Lubię mierzyć się ze złożonymi wyzwaniami związanymi z danymi i budować solidne, niezawodne rozwiązania.',
          ];

    const educationItems = [
      {
        degree: 'Big Data Engineering',
        institution: 'Polish-Japanese Academy of Information Technology',
        dates: '03.2018 - 02.2019',
        description:
          'Postgraduate studies in Large Data Sets Engineering. Developed a movie recommender system using Python for the end project.',
      },
      {
        degree: 'Statistical Analysis and Data Mining',
        institution: 'Warsaw School of Economics',
        dates: '10.2013 - 06.2015',
        description:
          'Postgraduate studies. Assessment of Reject Inference methods implemented in SAS Enterprise Miner with a use of credit scorecard models built on randomly generated consumer finance portfolio data.',
      },
      {
        degree: 'MSc Finance and Accounting',
        institution: 'Warsaw School of Economics',
        dates: '02.2012 - 11.2014',
        description:
          'Specialized in International Financial Markets. Thesis: The use of logistic regression model to estimate probability of a correction of Polish current account basing on determinants of Polish balance of payments.',
      },
      {
        degree: 'ERASMUS student exchange program',
        institution: 'European University Viadrina Frankfurt (Oder)',
        dates: '04.2011 - 07.2011',
        description: 'Student exchange program.',
      },
      {
        degree: 'Faculty of Administration and Social Sciences',
        institution: 'Warsaw University of Technology',
        dates: '10.2008 - 01.2012',
        description: 'The analysis of state budget in 2006-2010.',
      },
    ];

    const experienceItems = [
      {
        title: 'Data Engineer',
        company: 'Marketing Engineers Group sp. z o.o.',
        period: '10.2025 - 03.2026',
        tech: 'Python, SQL, Apache Airflow, BigQuery, Google Cloud Storage, Apache Superset, dbt, Jinja2, YAML',
        description:
          'Maintained production data infrastructure powering analytics for e-commerce clients, processing data from multiple platforms into a unified BigQuery warehouse orchestrated by Apache Airflow. Used Apache Superset as the BI solution.',
        bullets: [
          'Developed a custom Apache Airflow connector for Magento 2 with OAuth 1.0a (HMAC-SHA256) authentication, generator-based pagination, and exponential-backoff retry logic across multiple REST API endpoints. Extracted records into GCS as NDJSON with daily loading into BigQuery.',
          'Engineered a Google Ads ETL pipeline integrating the Google Ads API with BigQuery via GCS staging. Designed analytical tables mapping Google Ads spend to actual e-commerce client stock for rendering in Apache Superset. Leveraged dynamic Jinja2 date templating with intelligent lookback windows to properly handle late arrivals and deduplication.',
          'Onboarded e-commerce clients onto a config-driven data platform. Leveraged a YAML-to-DAG generation framework to dynamically produce Airflow DAGs from declarative client configurations.',
          'Executed a zero-downtime Klaviyo API revision migration spanning a multi-year revision gap. Designed and ran automated validation tests across multiple categories (authentication, subscription schemas, marketing fields, event structures, campaign filters, flow pagination, metric types), confirming zero breaking changes.',
          'Developed a custom dbt macro for Unicode text normalization to resolve product ID mapping and deduplication failures caused by special characters (Polish, Russian, and other non-ASCII glyphs) in e-commerce product URLs. Standardized URL parsing across the unified ECOM entity schema spanning four platforms (e.g., Shopify, Shoper, WooCommerce, and Magento), enabling reliable cross-platform deduplication.',
          'Used the Superset REST API via Superset MCP to programmatically query dashboard and chart configurations for automated data lineage investigations and subsequent fixes.',
          'Maintained rigorous quality standards by designing comprehensive validation suites for every table and pipeline. Authored SQL tests covering cross-layer consistency (staging through transformed), NULL-rate analysis on mandatory fields, surrogate-key uniqueness, referential integrity, and old-vs-new API output comparison.',
          "Eurostat GISCO Geospatial Data Pipeline: Designed and implemented an end-to-end ETL pipeline integrating Eurostat GISCO geospatial data into the company's Airflow-based data platform. Built a custom Airflow plugin (operator + hook) that downloads ~815,000 EU postal codes and 1,211 NUTS3 boundary polygons from the GISCO API, stages them as NDJSON in Google Cloud Storage, and loads into BigQuery. Implemented ijson streaming to handle the 350MB postal codes GeoJSON within container memory limits. Created dbt source and transformed models with full NUTS hierarchy (country/NUTS1/NUTS2/NUTS3). Registered the pipeline in the DAG generator framework to enable automated deployment across environments. Data serves Superset map visualizations for 31 EU/EEA/EFTA countries.",
          "Sales Channel Backfill & Schema Migration: Led a data backfill initiative to integrate historical mobile app order data into a major e-commerce client's analytics pipeline. Extended the BigQuery staging schema and dbt models (source and transformed layers) to accommodate a new sales channel column, enabling filtering between web and app orders across all reporting layers. Managed backward compatibility for 2+ years of historical CSV files lacking the new column while ensuring seamless ingestion of new files containing both channel types. Coordinated schema changes across GCS-to-BQ ingestion, dbt incremental models, and downstream Superset dashboards.",
        ],
      },
      {
        title: 'B2B Consultant',
        company: 'Crestt sp. z o.o. (Santander Bank Polska S.A.)',
        period: '04.2025 - 08.2025',
        tech: 'Oracle APEX, PL/SQL, SQL',
        description:
          'Supporting role in Oracle APEX application development. Collaborated with business analysts to assist in the development of a reporting tool for ESRS (European Sustainability Reporting Standards).',
        bullets: [
          'Designed and implemented BI functionalities into APEX application using PL/SQL.',
          'Performed modifications to the reporting model when needed.',
          'Utilized PL/SQL to generate displayed reports.',
          'Contributed ideas and provided feedback by applying my expertise and knowledge in reporting tasks.',
        ],
      },
      {
        title: 'Data Analytics & Engineering Consultant',
        company: 'Public Sector',
        period: '08.2024 - 02.2025',
        tech: 'Python, SQL, Oracle SQL, Oracle PL/SQL',
        description:
          'Depending on the scale of analysis, reporting of national data using either Oracle SQL or Oracle PL/SQL.',
        bullets: [
          'Development of a PoC application to calculate and visualize the closest routes between a controlled entity and ten closest controllers (public sector employees).',
          'A graph problem on a big data scale. Used Python and SQL.',
        ],
      },
      {
        title: 'B2B Consultant',
        company: 'B2B.NET S.A. (BNP Paribas Bank Polska S.A.)',
        period: '07.2023 - 03.2024',
        tech: 'MongoDB, HDFS, HiveSQL, Python, Airflow, GitLab',
        description: 'Development of ELT data pipelines for the Open Banking area.',
        bullets: [
          'Including flattening, deduplication, and normalization of JSON data source into Hive tables.',
          'Processing both semi-structured and structured data.',
          'Ad-hoc analysis of customers activity within Open Banking area.',
        ],
      },
      {
        title: 'Big Data Developer',
        company: 'Crestt sp. z o.o. (Bank Pekao S.A., Nationale-Nederlanden S.A.)',
        period: '02.2021 - 06.2022',
        tech: 'Airflow, Python, PySpark, HiveSQL, HDFS, Cloudera, SAS Viya',
        description:
          'Development of batch data processing solutions for one of the largest banks in Poland.',
        bullets: [
          'The ELT processes for Data Lake were designed using Airflow, Python, PySpark, and Hive within the on-premise Cloudera Data Platform.',
          'Development and operationalization of churn related classifier for insurance company.',
          'Added functionalities for scoring and monitoring of new data.',
          'Development and operationalization of classifiers for VR training company.',
          'Design and development of HR demo dashboard with a use SAS Viya.',
        ],
      },
      {
        title: 'Business Intelligence Analyst',
        company: 'PZU S.A.',
        period: '10.2020 - 01.2021',
        tech: 'SAS Guide, SAS Data Integration Studio',
        description: 'Tester of output tables created by SAS Developers.',
        bullets: ['Maintenance of documentation in the Area of Property Insurances.'],
      },
      {
        title: 'SAS Analyst',
        company: 'ITFS Sp. z o.o. (PZU S.A.)',
        period: '05.2020 - 09.2020',
        tech: 'SAS Viya, Python',
        description:
          "Co-responsible for migrating SAS Visual Analytics reports to the SAS Viya environment for Poland's largest insurance company.",
        bullets: [
          'Tasks included importing dashboards to Viya, repairing XML schemas, redesigning dashboard layouts for improved UX.',
          'Creating global Themes, developing XML/HTML forms, and processing JSON files using Python.',
        ],
      },
      {
        title: 'Junior Data Scientist',
        company: 'Crestt sp. z o.o. (Polkomtel sp. z o.o., TVP S.A.)',
        period: '03.2019 - 04.2020',
        tech: 'SAS, Python, SQL, Shiny, Tableau',
        description:
          'As a consultant at a major Polish telecom, participated in projects to upgrade data mart recalculation processes.',
        bullets: [
          'Developed production-ready SAS scripts focusing on 4GL and SQL for data processing.',
          'Handled data collection and segmentation using Python.',
          'Contributed to dashboard development using Shiny and Tableau.',
        ],
      },
      {
        title: 'Data Analyst',
        company: 'Bank Pocztowy S.A.',
        period: '11.2015 - 11.2016',
        tech: 'SAS Guide, SAS VA, Oracle SQL',
        description: 'Automated reporting using SAS Guide and SAS VA.',
        bullets: [
          'Developed dashboards for evaluating bank branch performance.',
          'Facilitating statistical and visual analysis of issued loans.',
        ],
      },
      {
        title: 'Junior Reporting Specialist',
        company: 'ASB Poland Sp. z o.o.',
        period: '07.2015 - 09.2015',
        tech: 'MS Excel',
        description:
          'Processed financial data, actualized financial statements, and supported data migration between databases.',
        bullets: [],
      },
      {
        title: 'Intern, Credit Portfolio Analysis',
        company: 'Bank BPH S.A., GE Capital',
        period: '03.2014 - 02.2015',
        tech: 'SAS Guide, SAS Miner, SQL',
        description:
          'Supported the development of a predictive model used for estimation of LGD parameter.',
        bullets: ['Worked in the Valuation Standards and Reporting Team.'],
      },
    ];

    const projects = [
      {
        title: 'SQL Playground using NYC Taxi Data',
        tech: 'Python, PostgreSQL, Superset, Docker, Claude Code',
        description:
          'SQL playground using NYC Taxi Data. Dockerized PostgreSQL, pgAdmin, and Superset. Database initialization, backfill, and data ingestion are preconfigured and ready to go. Start analytics fast.',
      },
      {
        title: 'Classify stock growth for trading',
        tech: 'Python, Docker, PostgreSQL, Apache Airflow, XGBoost, React, TypeScript, JavaScript, Jinja, Claude Code',
        description:
          'Daily ETL and ML with Docker, PostgreSQL, Airflow, and XGBoost on pre-selected stocks. Finally, React as web-app. All done with Claude Code',
      },
      {
        title: 'Data Engineering Zoomcamp Capstone',
        tech: 'Python, Docker, Apache Airflow, Kafka, PySpark, PostgreSQL, Streamlit',
        description:
          'A dockerized 5 min. mini-batch data pipeline. Spark Structured Streaming: reading from Kafka to PostgreSQL as a sink DB. Airflow, Kafka, PySpark, PostgreSQL, Streamlit',
      },
      {
        title: 'LLM Zoomcamp Capstone',
        tech: 'Python, Elasticsearch, PostgreSQL, Flask, Docker, Grafana',
        description:
          'A dockerized RAG application based on PC game reviews pulled from the Steam store. Featuring a Flask app running on Elasticsearch vector database. As an addition PostgreSQL for logging and Grafana for monitoring',
      },
      {
        title: 'MLOps Zoomcamp Capstone',
        tech: 'GCP, Python, PySpark, Pandas, scikit-learn, XGBoost, Prefect, MLflow, FastAPI, Flask, Evidently AI',
        description:
          'e2e MLOps on GCP - PySpark, Pandas, Sciki-learn, XGBoost, Prefect, MLflow, FastAPI, Flask, Evidently AI',
      },
      {
        title: 'Machine Learning Zoomcamp Capstone',
        tech: 'Python, scikit-learn, XGBoost, Flask, Docker',
        description:
          'Dockerized Flask service - scoring if a customer will default. Pandas, Scikit-learn, XGBoost, Flask, Docker',
      },
      {
        title: 'Machine Learning Zoomcamp Capstone',
        tech: 'Python, TensorFlow, Kubernetes, Docker, Kind cluster',
        description:
          'TensorFlow, image classifier, transfer-learning, model serving, Docker, Kubernetes, Kind cluster',
      },
      {
        title: 'Portfolio Website',
        tech: 'React, TypeScript, Tailwind CSS, Node.js',
        description:
          'Personal portfolio website built with React and TypeScript, featuring modern design and responsive layout.',
      },
    ];

    const contactInfo =
      lang === 'en'
        ? [
            '<strong>Email:</strong> borowiec.k@gmail.com',
            '<strong>Phone:</strong> +48 570 223 108',
            '<strong>Location:</strong> Warsaw, Poland',
            '<strong>GitHub:</strong> konutech',
            '<strong>LinkedIn:</strong> linkedin.com/in/32167',
            '<strong>Credly:</strong> credly.com/users/konrad-borowiec/badges',
          ]
        : [
            '<strong>E-mail:</strong> borowiec.k@gmail.com',
            '<strong>Telefon:</strong> +48 570 223 108',
            '<strong>Lokalizacja:</strong> Warszawa, Polska',
            '<strong>GitHub:</strong> konutech',
            '<strong>LinkedIn:</strong> linkedin.com/in/32167',
            '<strong>Credly:</strong> credly.com/users/konrad-borowiec/badges',
          ];

    const footerText =
      lang === 'en'
        ? `Generated on: ${currentDate}\n© ${currentYear} Konu-Tec Konrad Borowiec. All rights reserved.`
        : `Wygenerowano: ${currentDate}\n© ${currentYear} Konu-Tec Konrad Borowiec. Wszelkie prawa zastrzeżone.`;

    return `<!DOCTYPE html>
<html lang="${lang === 'en' ? 'en' : 'pl'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Konrad Borowiec - CV</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #1f2937;
      line-height: 1.6;
      font-size: 11pt;
      background: #ffffff;
    }
    .container {
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm;
    }
    header {
      border-bottom: 3px solid #1f2937;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      font-size: 28pt;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 18pt;
      font-weight: bold;
      color: #1f2937;
      margin: 25px 0 10px 0;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 5px;
    }
    .subtitle {
      font-size: 14pt;
      color: #6b7280;
      margin-bottom: 15px;
    }
    .contact-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 10pt;
    }
    .contact-item {
      color: #4b5563;
    }
    .about-section {
      margin-bottom: 25px;
    }
    .about-text {
      color: #374151;
      text-align: justify;
    }
    .education-section, .experience-section, .projects-section {
      margin-bottom: 25px;
    }
    .education-item {
      margin-bottom: 20px;
    }
    .degree {
      font-weight: bold;
      font-size: 12pt;
      color: #1f2937;
    }
    .institution {
      color: #4b5563;
      margin: 3px 0;
    }
    .dates {
      font-size: 9pt;
      color: #6b7280;
      margin-left: 4px;
    }
    .description {
      color: #374151;
      margin-top: 5px;
      font-style: italic;
    }
    .experience-item {
      margin-bottom: 20px;
    }
    .job-title {
      font-weight: bold;
      font-size: 12pt;
      color: #1f2937;
    }
    .company {
      color: #4b5563;
      margin: 3px 0;
    }
    .job-period {
      font-size: 9pt;
      color: #6b7280;
      margin-left: 4px;
    }
    .job-tech {
      font-size: 9pt;
      color: #6b7280;
      margin: 5px 0;
      font-style: italic;
    }
    .job-desc {
      color: #374151;
      margin-top: 5px;
      text-align: justify;
    }
    .job-bullets {
      margin-top: 8px;
      padding-left: 18px;
    }
    .job-bullets li {
      margin-bottom: 4px;
      color: #374151;
      text-align: justify;
    }
    .projects-section {
      margin-bottom: 25px;
    }
    .project-item {
      margin-bottom: 15px;
    }
    .project-title {
      font-weight: bold;
      font-size: 12pt;
      color: #1f2937;
    }
    .project-tech {
      font-size: 9pt;
      color: #6b7280;
      margin: 3px 0;
    }
    .project-desc {
      color: #374151;
      margin-top: 5px;
      font-size: 10pt;
      text-align: justify;
    }
    footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      margin-top: 30px;
      font-size: 8pt;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Konrad Borowiec</h1>
      <div class="subtitle">${headerSubtitle}</div>
      <div class="contact-info">${contactInfo.join('\n')}</div>
    </header>

    <section class="about-section">
      <h2>${lang === 'en' ? 'About Me' : 'O Mnie'}</h2>
      <div class="about-text">
        <p>${aboutParagraphs[0]}</p>
        <p>${aboutParagraphs[1]}</p>
      </div>
    </section>

    <section class="education-section">
      <h2>${lang === 'en' ? 'Education' : 'Edukacja'}</h2>
      ${educationItems
        .map(
          (item) => `
        <div class="education-item">
          <div class="degree">${item.degree}</div>
          <div class="institution">${item.institution}</div>
          <div class="dates">${item.dates}</div>
          <div class="description">${item.description}</div>
        </div>
      `,
        )
        .join('')}
    </section>

    <section class="experience-section">
      <h2>${lang === 'en' ? 'Experience' : 'Doświadczenie'}</h2>
      ${experienceItems
        .map(
          (item) => `
        <div class="experience-item">
          <div class="job-title">${item.title}</div>
          <div class="company">${item.company}</div>
          <div class="job-period">${item.period}</div>
          <div class="job-tech">${item.tech}</div>
          <div class="job-desc">${item.description}</div>
          ${item.bullets.length > 0 ? `<div class="job-bullets"><ul>${item.bullets.map((b) => `<li>${b}</li>`).join('')}</ul></div>` : ''}
        </div>
      `,
        )
        .join('')}
    </section>

    <section class="projects-section">
      <h2>${lang === 'en' ? 'Side Projects' : 'Projekty poboczne'}</h2>
      ${projects
        .map(
          (project) => `
        <div class="project-item">
          <div class="project-title">${project.title}</div>
          <div class="project-tech">${project.tech}</div>
          <div class="project-desc">${project.description}</div>
        </div>
      `,
        )
        .join('')}
    </section>

    <footer>
      ${footerText}
    </footer>
  </div>
</body>
</html>`;
  };

  const generateHTMLDownload = () => {
    const cvContent = language === 'en' ? getCVContent('en') : getCVContent('pl');

    const link = document.createElement('a');
    link.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(cvContent);
    link.download = `cv-konrad-borowiec-${language}-${currentDate}.html`;
    link.click();
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={generateHTMLDownload}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-primary/10 dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
        aria-label="Download as HTML"
        title="Download HTML version"
      >
        <i className="fas fa-file-code text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
      </button>
      <button
        onClick={generateDownload}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-primary/10 dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
        aria-label="Download as PDF"
        title="Download PDF version"
      >
        <i className="fas fa-file-pdf text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
      </button>
    </div>
  );
};

export default PdfButtons;

// Experience & Education entries (roles + studies). Extracted so both the
// timeline (Timeline.tsx) and the years-of-experience computation
// (experience.ts) read from a single source of truth.

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'education';
  technologies: string[];
};

export const timelineItems: TimelineItem[] = [
  {
    title: 'Data Engineer',
    organization: 'Marketing Engineers Group sp. z o.o.',
    period: '10.2025 - 03.2026',
    technologies: [
      'gcp-bigquery',
      'apache-airflow',
      'apache-superset',
      'dbt',
      'python',
      'sql',
      'linux',
      'docker',
      'claude-code',
      'gitlab',
      'gcs',
      'magento',
      'google-ads',
      'klaviyo',
      'jinja2',
      'shopify',
      'woocommerce',
      'eurostat-gisco',
    ],
    description:
      "Maintained production data infrastructure powering analytics for e-commerce clients, processing data from multiple platforms into a unified BigQuery warehouse orchestrated by Apache Airflow. Used Apache Superset as the BI solution.\n\n• Developed a custom Apache Airflow connector for Magento 2 with OAuth 1.0a (HMAC-SHA256) authentication, generator-based pagination, and exponential-backoff retry logic across multiple REST API endpoints. Extracted records into GCS as NDJSON with daily loading into BigQuery.\n\n• Engineered a Google Ads ETL pipeline integrating the Google Ads API with BigQuery via GCS staging. Designed analytical tables mapping Google Ads spend to actual e-commerce client stock for rendering in Apache Superset. Leveraged dynamic Jinja2 date templating with intelligent lookback windows to properly handle late arrivals and deduplication.\n\n• Onboarded e-commerce clients onto a config-driven data platform. Leveraged a YAML-to-DAG generation framework to dynamically produce Airflow DAGs from declarative client configurations.\n\n• Executed a zero-downtime Klaviyo API revision migration spanning a multi-year revision gap. Designed and ran automated validation tests across multiple categories (authentication, subscription schemas, marketing fields, event structures, campaign filters, flow pagination, metric types), confirming zero breaking changes.\n\n• Developed a custom dbt macro for Unicode text normalization to resolve product ID mapping and deduplication failures caused by special characters (Polish, Russian, and other non-ASCII glyphs) in e-commerce product URLs. Standardized URL parsing across the unified ECOM entity schema spanning four platforms (e.g., Shopify, Shoper, WooCommerce, and Magento), enabling reliable cross-platform deduplication.\n\n• Used the Superset REST API via Superset MCP to programmatically query dashboard and chart configurations for automated data lineage investigations and subsequent fixes.\n\n• Maintained rigorous quality standards by designing comprehensive validation suites for every table and pipeline. Authored SQL tests covering cross-layer consistency (staging through transformed), NULL-rate analysis on mandatory fields, surrogate-key uniqueness, referential integrity, and old-vs-new API output comparison.\n\n• Eurostat GISCO Geospatial Data Pipeline: Designed and implemented an end-to-end ETL pipeline integrating Eurostat GISCO geospatial data into the company's Airflow-based data platform. Built a custom Airflow plugin (operator + hook) that downloads ~815,000 EU postal codes and 1,211 NUTS3 boundary polygons from the GISCO API, stages them as NDJSON in Google Cloud Storage, and loads into BigQuery. Implemented ijson streaming to handle the 350MB postal codes GeoJSON within container memory limits. Created dbt source and transformed models with full NUTS hierarchy (country/NUTS1/NUTS2/NUTS3). Registered the pipeline in the DAG generator framework to enable automated deployment across environments. Data serves Superset map visualizations for 31 EU/EEA/EFTA countries.\n\n• Sales Channel Backfill & Schema Migration: Led a data backfill initiative to integrate historical mobile app order data into a major e-commerce client's analytics pipeline. Extended the BigQuery staging schema and dbt models (source and transformed layers) to accommodate a new sales channel column, enabling filtering between web and app orders across all reporting layers. Managed backward compatibility for 2+ years of historical CSV files lacking the new column while ensuring seamless ingestion of new files containing both channel types. Coordinated schema changes across GCS-to-BQ ingestion, dbt incremental models, and downstream Superset dashboards.",
    type: 'work',
  },
  {
    title: 'B2B Consultant',
    organization: 'Crestt sp. z o.o. (Santander Bank Polska S.A.)',
    period: '04.2025 - 08.2025',
    technologies: ['oracle', 'oracle-apex', 'pl-sql', 'sql'],
    description:
      'Supporting role in Oracle APEX application development. Collaborated with business analysts to assist in the development of a reporting tool for ESRS (European Sustainability Reporting Standards). Designed and implemented BI functionalities into APEX application using PL/SQL. Performed modifications to the reporting model when needed. Utilized PL/SQL to generate displayed reports. Contributed ideas and provided feedback by applying my expertise and knowledge in reporting tasks.',
    type: 'work',
  },
  {
    title: 'Data Analytics & Engineering',
    organization: 'Public Sector',
    period: '08.2024 - 02.2025',
    technologies: ['oracle', 'sql', 'pl-sql', 'python'],
    description:
      'Depending on the scale of analysis, reporting of national data using either Oracle SQL or Oracle PL/SQL. Development of a PoC application to calculate and visualize the closest routes between a controlled entity and ten closest controllers (public sector employees). A graph problem on a big data scale. Used Python and SQL.',
    type: 'work',
  },
  {
    title: 'B2B Consultant',
    organization: 'B2B.NET S.A. (BNP Paribas Bank Polska S.A.)',
    period: '07.2023 - 03.2024',
    technologies: ['python', 'apache-airflow', 'gitlab', 'mongodb', 'hdfs', 'hive', 'sql'],
    description:
      'Development of ELT data pipelines for the Open Banking area. Including flattening, deduplication, and normalization of JSON data source into Hive tables. Processing both semi-structured and structured data. Technologies used: MongoDB, HDFS, HiveSQL, Python, Airflow, and GitLab for CICD. Ad-hoc analysis of customers activity within Open Banking area.',
    type: 'work',
  },
  {
    title: 'Big Data Developer',
    organization: 'Crestt sp. z o.o. (Bank Pekao S.A., Nationale-Nederlanden S.A.)',
    period: '02.2021 - 06.2022',
    technologies: ['apache-airflow', 'python', 'pyspark', 'hive', 'cloudera', 'sas', 'sas-viya'],
    description:
      'Development of batch data processing solutions for one of the largest banks in Poland. The ELT processes for Data Lake were designed using Airflow, Python, PySpark, and Hive within the on-premise Cloudera Data Platform. Development and operationalization of churn related classifier for insurance company. Added functionalities for scoring and monitoring of new data. Development and operationalization of classifiers for VR training company. Design and development of HR demo dashboard with a use SAS Viya.',
    type: 'work',
  },
  {
    title: 'Business Intelligence Analyst',
    organization: 'PZU S.A.',
    period: '10.2020 - 01.2021',
    technologies: ['sas'],
    description:
      'Tester of output tables created by SAS Developers. Maintenance of documentation in the Area of Property Insurances.',
    type: 'work',
  },
  {
    title: 'SAS Analyst',
    organization: 'ITFS Sp. z o. o. (PZU S.A.)',
    period: '05.2020 - 09.2020',
    technologies: ['sas', 'sas-viya', 'sas-va', 'python'],
    description:
      "Co-responsible for migrating SAS Visual Analytics reports to the SAS Viya environment for Poland's largest insurance company. Tasks included importing dashboards to Viya, repairing XML schemas, redesigning dashboard layouts for improved UX, creating global Themes, developing XML/HTML forms, and processing JSON files using Python.",
    type: 'work',
  },
  {
    title: 'Junior Data Scientist',
    organization: 'Crestt sp. z o. o. (Polkomtel sp. z o. o., TVP S.A.)',
    period: '03.2019 - 04.2020',
    technologies: ['sas', 'sql', 'python', 'shiny', 'tableau'],
    description:
      'As a consultant at a major Polish telecom, participated in projects to upgrade data mart recalculation processes. Developed production-ready SAS scripts focusing on 4GL and SQL for data processing. Handled data collection and segmentation using Python. Contributed to dashboard development using Shiny and Tableau.',
    type: 'work',
  },
  {
    title: 'Data/Business Intelligence Analyst',
    organization: 'NatWest Markets plc\nThe Royal Bank of Scotland Group',
    period: '11.2016 - 03.2019',
    technologies: ['sas', 'sql', 'sap-bo', 'sas-eg', 'sas-va'],
    description:
      'Consolidated and simplified financial regulatory reporting using SAS 4GL and SQL. Developed reports using SAP BO, SAS EG, and SAS VA. Utilized Stored Processes for user self-service. Recognized as a top dashboard developer and ranked in top ten in an internal competition designing optimal binary classifiers with customer data.',
    type: 'work',
  },
  {
    title: 'Data Analyst',
    organization: 'Bank Pocztowy S.A.',
    period: '11.2015 - 11.2016',
    technologies: ['sas', 'sas-va'],
    description:
      'Automated reporting using SAS Guide and SAS VA. Developed dashboards for evaluating bank branch performance, facilitating statistical and visual analysis of issued loans.',
    type: 'work',
  },
  {
    title: 'Junior Reporting Specialist',
    organization: 'ASB Poland Sp. z o. o.',
    period: '07.2015 - 09.2015',
    technologies: [],
    description:
      'Processed financial data, actualized financial statements, and supported data migration between databases.',
    type: 'work',
  },
  {
    title: 'Intern, Credit Portfolio Analysis',
    organization: 'Bank BPH S.A., GE Capital',
    period: '03.2014 - 02.2015',
    technologies: [],
    description:
      'Supported the development of a predictive model used for estimation of LGD parameter in the Valuation Standards and Reporting Team.',
    type: 'work',
  },
  {
    title: 'Big Data Engineering',
    organization: 'Polish-Japanese Academy of Information Technology',
    period: '03.2018 - 02.2019',
    technologies: ['python'],
    description:
      'Postgraduate studies in Large Data Sets Engineering. Developed a movie recommender system using Python for the end project.',
    type: 'education',
  },
  {
    title: 'Statistical Analysis and Data Mining',
    organization: 'Warsaw School of Economics',
    period: '10.2013 - 06.2015',
    technologies: ['sas', 'sas-em'],
    description:
      'Postgraduate studies. Assessment of Reject Inference methods implemented in SAS Enterprise Miner with a use of credit scorecard models built on randomly generated consumer finance portfolio data.',
    type: 'education',
  },
  {
    title: 'MSc Finance and Accounting',
    organization: 'Warsaw School of Economics',
    period: '02.2012 - 11.2014',
    technologies: [],
    description:
      'Specialized in International Financial Markets. Thesis: The use of logistic regression model to estimate probability of a correction of Polish current account basing on determinants of Polish balance of payments.',
    type: 'education',
  },
  {
    title: 'Erasmus Exchange Program',
    organization: 'European University Viadrina Frankfurt (Oder)',
    period: '04.2011 - 07.2011',
    technologies: [],
    description: 'Student exchange program.',
    type: 'education',
  },
  {
    title: 'Faculty of Administration and Social Sciences',
    organization: 'Warsaw University of Technology',
    period: '10.2008 - 01.2012',
    technologies: [],
    description: 'The analysis of state budget in 2006-2010.',
    type: 'education',
  },
];

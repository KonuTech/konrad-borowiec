# Konrad Borowiec - CV

## 🌐 Connect With Me

|                                 |                                                     |
| ------------------------------- | --------------------------------------------------- |
| **Email:** borowiec.k@gmail.com | **GitHub:** konutech                                |
| **Phone:** +48 570 223 108      | **LinkedIn:** linkedin.com/in/32167                 |
| **Location:** Warsaw, Poland    | **Credly:** credly.com/users/konrad-borowiec/badges |

---

## 👨‍💻 About Me

I'm a Data Guy with a strong background in the financial services sector. I enjoy my work the most when the tools and solutions I develop are actively used by other people or businesses. With expertise in SQL, Python, and various data processing technologies, I focus on designing efficient data pipelines and extracting valuable insights.

My journey began in finance and analytics, evolving into a more technical role specializing in data engineering, big data processing, and machine learning. I enjoy solving complex data challenges and building robust, reliable solutions.

---

## 📜 Experience & Education

### Education

- **Big Data Engineering** | Polish-Japanese Academy of Information Technology | 03.2018 - 02.2019
  - Postgraduate studies in Large Data Sets Engineering. Developed a movie recommender system using Python for the end project.

- **Statistical Analysis and Data Mining** | Warsaw School of Economics | 10.2013 - 06.2015
  - Postgraduate studies. Assessment of Reject Inference methods implemented in SAS Enterprise Miner with a use of credit scorecard models built on randomly generated consumer finance portfolio data.

- **MSc Finance and Accounting** | Warsaw School of Economics | 02.2012 - 11.2014
  - Specialized in International Financial Markets. Thesis: The use of logistic regression model to estimate probability of a correction of Polish current account basing on determinants of Polish balance of payments.

- **ERASMUS student exchange program** | European University Viadrina Frankfurt (Oder) | 04.2011 - 07.2011
  - Student exchange program.

- **Faculty of Administration and Social Sciences** | Warsaw University of Technology | 10.2008 - 01.2012
  - The analysis of state budget in 2006-2010.

### Experience

#### Data Engineer | Marketing Engineers Group sp. z o.o. | 10.2025 - 03.2026

**Technologies:** Python, SQL, Apache Airflow, BigQuery, Google Cloud Storage, Apache Superset, dbt, Jinja2, YAML

Maintained production data infrastructure powering analytics for e-commerce clients, processing data from multiple platforms into a unified BigQuery warehouse orchestrated by Apache Airflow. Used Apache Superset as the BI solution.

- Developed a custom Apache Airflow connector for Magento 2 with OAuth 1.0a (HMAC-SHA256) authentication, generator-based pagination, and exponential-backoff retry logic across multiple REST API endpoints. Extracted records into GCS as NDJSON with daily loading into BigQuery.
- Engineered a Google Ads ETL pipeline integrating the Google Ads API with BigQuery via GCS staging. Designed analytical tables mapping Google Ads spend to actual e-commerce client stock for rendering in Apache Superset. Leveraged dynamic Jinja2 date templating with intelligent lookback windows to properly handle late arrivals and deduplication.
- Onboarded e-commerce clients onto a config-driven data platform. Leveraged a YAML-to-DAG generation framework to dynamically produce Airflow DAGs from declarative client configurations.
- Executed a zero-downtime Klaviyo API revision migration spanning a multi-year revision gap. Designed and ran automated validation tests across multiple categories (authentication, subscription schemas, marketing fields, event structures, campaign filters, flow pagination, metric types), confirming zero breaking changes.
- Developed a custom dbt macro for Unicode text normalization to resolve product ID mapping and deduplication failures caused by special characters (Polish, Russian, and other non-ASCII glyphs) in e-commerce product URLs. Standardized URL parsing across the unified ECOM entity schema spanning four platforms (e.g., Shopify, Shoper, WooCommerce, and Magento), enabling reliable cross-platform deduplication.
- Used the Superset REST API via Superset MCP to programmatically query dashboard and chart configurations for automated data lineage investigations and subsequent fixes.
- Maintained rigorous quality standards by designing comprehensive validation suites for every table and pipeline. Authored SQL tests covering cross-layer consistency (staging through transformed), NULL-rate analysis on mandatory fields, surrogate-key uniqueness, referential integrity, and old-vs-new API output comparison.
- Eurostat GISCO Geospatial Data Pipeline: Designed and implemented an end-to-end ETL pipeline integrating Eurostat GISCO geospatial data into the company's Airflow-based data platform. Built a custom Airflow plugin (operator + hook) that downloads ~815,000 EU postal codes and 1,211 NUTS3 boundary polygons from the GISCO API, stages them as NDJSON in Google Cloud Storage, and loads into BigQuery. Implemented ijson streaming to handle the 350MB postal codes GeoJSON within container memory limits. Created dbt source and transformed models with full NUTS hierarchy (country/NUTS1/NUTS2/NUTS3). Registered the pipeline in the DAG generator framework to enable automated deployment across environments. Data serves Superset map visualizations for 31 EU/EEA/EFTA countries.
- Sales Channel Backfill & Schema Migration: Led a data backfill initiative to integrate historical mobile app order data into a major e-commerce client's analytics pipeline. Extended the BigQuery staging schema and dbt models (source and transformed layers) to accommodate a new sales channel column, enabling filtering between web and app orders across all reporting layers. Managed backward compatibility for 2+ years of historical CSV files lacking the new column while ensuring seamless ingestion of new files containing both channel types. Coordinated schema changes across GCS-to-BQ ingestion, dbt incremental models, and downstream Superset dashboards.

#### B2B Consultant | Crestt sp. z o.o. (Santander Bank Polska S.A.) | 04.2025 - 08.2025

**Technologies:** Oracle APEX, PL/SQL, SQL

Supporting role in Oracle APEX application development. Collaborated with business analysts to assist in the development of a reporting tool for ESRS (European Sustainability Reporting Standards). Designed and implemented BI functionalities into APEX application using PL/SQL. Performed modifications to the reporting model when needed. Utilized PL/SQL to generate displayed reports. Contributed ideas and provided feedback by applying my expertise and knowledge in reporting tasks.

#### Data Analytics & Engineering Consultant | Public Sector | 08.2024 - 02.2025

**Technologies:** Python, SQL, Oracle SQL, Oracle PL/SQL

Depending on the scale of analysis, reporting of national data using either Oracle SQL or Oracle PL/SQL. Development of a PoC application to calculate and visualize the closest routes between a controlled entity and ten closest controllers (public sector employees). A graph problem on a big data scale. Used Python and SQL.

#### B2B Consultant | B2B.NET S.A. (BNP Paribas Bank Polska S.A.) | 07.2023 - 03.2024

**Technologies:** MongoDB, HDFS, HiveSQL, Python, Airflow, GitLab

Development of ELT data pipelines for the Open Banking area. Including flattening, deduplication, and normalization of JSON data source into Hive tables. Processing both semi-structured and structured data. Technologies used: MongoDB, HDFS, HiveSQL, Python, Airflow, and GitLab for CICD. Ad-hoc analysis of customers activity within Open Banking area.

#### Big Data Developer | Crestt sp. z o.o. (Bank Pekao S.A., Nationale-Nederlanden S.A.) | 02.2021 - 06.2022

**Technologies:** Airflow, Python, PySpark, HiveSQL, HDFS, Cloudera, SAS Viya

Development of batch data processing solutions for one of the largest banks in Poland. The ELT processes for Data Lake were designed using Airflow, Python, PySpark, and Hive within the on-premise Cloudera Data Platform. Development and operationalization of churn related classifier for insurance company. Added functionalities for scoring and monitoring of new data. Development and operationalization of classifiers for VR training company. Design and development of HR demo dashboard with a use SAS Viya.

#### Business Intelligence Analyst | PZU S.A. | 10.2020 - 01.2021

**Technologies:** SAS Guide, SAS Data Integration Studio

Tester of output tables created by SAS Developers. Maintenance of documentation in the Area of Property Insurances.

#### SAS Analyst | ITFS Sp. z o. o. (PZU S.A.) | 05.2020 - 09.2020

**Technologies:** SAS Viya, Python

Co-responsible for migrating SAS Visual Analytics reports to the SAS Viya environment for Poland's largest insurance company. Tasks included importing dashboards to Viya, repairing XML schemas, redesigning dashboard layouts for improved UX, creating global Themes, developing XML/HTML forms, and processing JSON files using Python.

#### Junior Data Scientist | Crestt sp. z o. o. (Polkomtel sp. z o. o., TVP S.A.) | 03.2019 - 04.2020

**Technologies:** SAS, Python, SQL, Shiny, Tableau

As a consultant at a major Polish telecom, participated in projects to upgrade data mart recalculation processes. Developed production-ready SAS scripts focusing on 4GL and SQL for data processing. Handled data collection and segmentation using Python. Contributed to dashboard development using Shiny and Tableau.

#### Data Analyst | Bank Pocztowy S.A. | 11.2015 - 11.2016

**Technologies:** SAS Guide, SAS VA, Oracle SQL

Automated reporting using SAS Guide and SAS VA. Developed dashboards for evaluating bank branch performance, facilitating statistical and visual analysis of issued loans.

#### Junior Reporting Specialist | ASB Poland Sp. z o. o. | 07.2015 - 09.2015

**Technologies:** MS Excel

Processed financial data, actualized financial statements, and supported data migration between databases.

#### Intern, Credit Portfolio Analysis | Bank BPH S.A., GE Capital | 03.2014 - 02.2015

**Technologies:** SAS Guide, SAS Miner, SQL

Supported the development of a predictive model used for estimation of LGD parameter in the Valuation Standards and Reporting Team.

---

## 🧪 Side Projects

### SQL Playground using NYC Taxi Data

**Technologies:** Python, PostgreSQL, Superset, Docker, Claude Code

**Description:** SQL playground using NYC Taxi Data. Dockerized PostgreSQL, pgAdmin, and Superset. Database initialization, backfill, and data ingestion are preconfigured and ready to go. Start analytics fast.

---

### Classify stock growth for trading

**Technologies:** Python, Docker, PostgreSQL, Apache Airflow, XGBoost, React, TypeScript, JavaScript, Jinja, Claude Code

**Description:** Daily ETL and ML with Docker, PostgreSQL, Airflow, and XGBoost on pre-selected stocks. Finally, React as web-app. All done with Claude Code

---

### Data Engineering Zoomcamp Capstone

**Technologies:** Python, Docker, Apache Airflow, Kafka, PySpark, PostgreSQL, Streamlit

**Description:** A dockerized 5 min. mini-batch data pipeline. Spark Structured Streaming: reading from Kafka to PostgreSQL as a sink DB. Airflow, Kafka, PySpark, PostgreSQL, Streamlit

---

### LLM Zoomcamp Capstone

**Technologies:** Python, Elasticsearch, PostgreSQL, Flask, Docker, Grafana

**Description:** A dockerized RAG application based on PC game reviews pulled from the Steam store. Featuring a Flask app running on Elasticsearch vector database. As an addition PostgreSQL for logging and Grafana for monitoring

---

### MLOps Zoomcamp Capstone

**Technologies:** GCP, Python, PySpark, Pandas, scikit-learn, XGBoost, Prefect, MLflow, FastAPI, Flask, Evidently AI

**Description:** e2e MLOps on GCP - PySpark, Pandas, Sciki-learn, XGBoost, Prefect, MLflow, FastAPI, Flask, Evidently AI

---

### Machine Learning Zoomcamp Capstone (Default Scoring)

**Technologies:** Python, scikit-learn, XGBoost, Flask, Docker

**Description:** Dockerized Flask service - scoring if a customer will default. Pandas, Sciki-learn, XGBoost, Flask, Docker

---

### Machine Learning Zoomcamp Capstone (Image Classifier)

**Technologies:** Python, TensorFlow, Kubernetes, Docker, Kind cluster

**Description:** TensorFlow, image classifier, transfer-learning, model serving, Docker, Kubernetes, Kind cluster

---

### Portfolio Website

**Technologies:** React, TypeScript, Tailwind CSS, Node.js

**Description:** Personal portfolio website built with React and TypeScript, featuring modern design and responsive layout.

---

## 🎯 Interests

### Outside of work, I enjoy exploring various hobbies and interests.

#### Motorcycling 🏍️

I'm passionate about exploring the world on two wheels. Motorcycle road trips offer me the perfect blend of adventure, freedom, and connection with nature. From winding mountain roads to coastal highways, each journey brings new perspectives and unforgettable experiences. Browse through my photo gallery from recent motorcycle journeys across beautiful landscapes, mountain roads, and coastal routes!

#### Cycling 🚴

Cycling is another passion of mine that allows me to stay active while exploring beautiful landscapes. Whether it's a quick ride through local trails or a day-long excursion in the countryside, cycling provides both physical exercise and mental refreshment.

#### Analytics Engineering & Technology 📊

Beyond my professional work, I'm deeply interested in the advancements in data engineering and analytics engineering. I enjoy working with modern data platforms, exploring new tools for data modeling and transformation, optimizing data pipelines, and experimenting with ways to make data more reliable, scalable, and actionable. I also keep up with the latest trends in cloud data infrastructure, ELT/ETL processes, and visualization techniques to stay current in the field. My technical reading list reflects this passion, as I constantly seek to expand my knowledge and skills in these rapidly evolving areas.

#### History, Architecture & Economics 🏛️

I have a profound interest in history, architecture, and economics, which greatly influences how I explore the world. Learning about different civilizations, their architectural achievements, and economic systems helps me understand the evolution of human society and culture. These interests are actually the driving forces behind my motorcycle road trips and cycling adventures. They allow me to directly experience historical sites, appreciate diverse architectural styles, and observe economic differences across regions—creating a deeper connection with the places I visit.

#### Financial Markets 💰

My journey in financial markets reflects a thoughtful, long-term investment approach rather than short-term trading. Starting a few years ago, I built a foundation with conservative instruments like anti-inflation bonds and ETFs, gradually expanding into dividend-generating Polish equities. Currently, I maintain a diversified portfolio across both Polish and U.S. markets, applying a systematic investment strategy that has yielded satisfactory results. This hands-on experience has provided valuable insights into market dynamics and investment principles.

---

_Generated on: 2026-05-11_
_© 2026 Konu-Tec Konrad Borowiec. All rights reserved._

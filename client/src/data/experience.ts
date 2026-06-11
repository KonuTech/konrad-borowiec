// Years of experience per technology, shown in the About “Years of Experience”
// chart. Seeded by computing the span (first→last used) across roles
// (roles.ts periods) and side projects (their GitHub created→pushed dates),
// rounded to whole years with a floor of 1. Curated: edit the numbers below
// directly to reflect true experience.

export const TECH_EXPERIENCE: { id: string; years: number }[] = [
  { id: 'sas', years: 9 },
  { id: 'sql', years: 9 },
  { id: 'python', years: 8 },
  { id: 'apache-airflow', years: 5 },
  { id: 'sas-va', years: 5 },
  { id: 'docker', years: 3 },
  { id: 'gitlab', years: 3 },
  { id: 'hive', years: 3 },
  { id: 'pyspark', years: 3 },
  { id: 'postgresql', years: 2 },
  { id: 'sap-bo', years: 2 },
  { id: 'sas-eg', years: 2 },
  { id: 'sas-em', years: 2 },
  { id: 'sas-viya', years: 2 },
  { id: 'apache-superset', years: 1 },
  { id: 'claude-code', years: 1 },
  { id: 'cloudera', years: 1 },
  { id: 'dbt', years: 1 },
  { id: 'elasticsearch', years: 1 },
  { id: 'gcp-bigquery', years: 1 },
  { id: 'google-ads', years: 1 },
  { id: 'gcp', years: 1 },
  { id: 'gcs', years: 1 },
  { id: 'grafana', years: 1 },
  { id: 'hdfs', years: 1 },
  { id: 'kafka', years: 1 },
  { id: 'kubernetes', years: 1 },
  { id: 'linux', years: 1 },
  { id: 'mlflow', years: 1 },
  { id: 'mongodb', years: 1 },
  { id: 'oracle', years: 1 },
  { id: 'oracle-apex', years: 1 },
  { id: 'pl-sql', years: 1 },
  { id: 'prefect', years: 1 },
  { id: 'shiny', years: 1 },
  { id: 'streamlit', years: 1 },
  { id: 'tableau', years: 1 },
];

export const MAX_EXPERIENCE_YEARS = 9;

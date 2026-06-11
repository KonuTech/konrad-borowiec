// Central technology registry — the single source of truth shared by the Skills
// grid (filter controls), the Experience & Education timeline (tech tags +
// filtering), and the description highlighter.
//
// `isSkill: true` entries have an icon in the Skills section and act as
// clickable filters. All entries (skills + the rest) are used to highlight
// technology mentions inside role descriptions and to render per-role tags.
//
// `aliases` are the strings matched (case-insensitive, word-boundaried) against
// description prose. Technology proper nouns are kept in Latin script across all
// locales, so alias matching works in every language.

export type Technology = {
  id: string;
  label: string;
  aliases: string[];
  isSkill: boolean;
  category?: string;
};

export const TECHNOLOGIES: Technology[] = [
  // --- Skills (have icons, act as filters) ---
  { id: 'sql', label: 'SQL', aliases: ['SQL'], isSkill: true },
  { id: 'oracle', label: 'Oracle', aliases: ['Oracle'], isSkill: true },
  { id: 'sas', label: 'SAS', aliases: ['SAS'], isSkill: true },
  { id: 'hadoop', label: 'Hadoop', aliases: ['Hadoop'], isSkill: true },
  { id: 'python', label: 'Python', aliases: ['Python'], isSkill: true },
  { id: 'pyspark', label: 'PySpark', aliases: ['PySpark'], isSkill: true },
  { id: 'databricks', label: 'Databricks', aliases: ['Databricks'], isSkill: true },
  {
    id: 'apache-airflow',
    label: 'Apache Airflow',
    aliases: ['Apache Airflow', 'Airflow'],
    isSkill: true,
  },
  { id: 'linux', label: 'Linux', aliases: ['Linux'], isSkill: true },
  { id: 'docker', label: 'Docker', aliases: ['Docker'], isSkill: true },
  { id: 'claude-code', label: 'Claude Code', aliases: ['Claude Code'], isSkill: true },
  { id: 'ms-excel', label: 'MS Excel', aliases: ['MS Excel'], isSkill: true },
  {
    id: 'gcp-bigquery',
    label: 'GCP - Big Query',
    aliases: ['BigQuery', 'Big Query'],
    isSkill: true,
  },
  {
    id: 'apache-superset',
    label: 'Apache Superset',
    aliases: ['Apache Superset', 'Superset'],
    isSkill: true,
  },
  { id: 'gitlab', label: 'GitLab', aliases: ['GitLab'], isSkill: true },
  { id: 'dbt', label: 'dbt', aliases: ['dbt'], isSkill: true },

  // --- Other technologies (tags + highlight only) ---
  { id: 'magento', label: 'Magento', aliases: ['Magento 2', 'Magento'], isSkill: false },
  { id: 'google-ads', label: 'Google Ads', aliases: ['Google Ads'], isSkill: false },
  { id: 'klaviyo', label: 'Klaviyo', aliases: ['Klaviyo'], isSkill: false },
  {
    id: 'gcs',
    label: 'Google Cloud Storage',
    aliases: ['Google Cloud Storage', 'GCS'],
    isSkill: false,
  },
  { id: 'jinja2', label: 'Jinja2', aliases: ['Jinja2'], isSkill: false },
  { id: 'shopify', label: 'Shopify', aliases: ['Shopify'], isSkill: false },
  { id: 'shoper', label: 'Shoper', aliases: ['Shoper'], isSkill: false },
  { id: 'woocommerce', label: 'WooCommerce', aliases: ['WooCommerce'], isSkill: false },
  {
    id: 'eurostat-gisco',
    label: 'Eurostat GISCO',
    aliases: ['Eurostat GISCO', 'GISCO'],
    isSkill: false,
  },
  { id: 'superset-mcp', label: 'Superset MCP', aliases: ['Superset MCP'], isSkill: false },
  { id: 'oracle-apex', label: 'Oracle APEX', aliases: ['Oracle APEX', 'APEX'], isSkill: false },
  { id: 'pl-sql', label: 'PL/SQL', aliases: ['PL/SQL'], isSkill: false },
  { id: 'mongodb', label: 'MongoDB', aliases: ['MongoDB'], isSkill: false },
  { id: 'hdfs', label: 'HDFS', aliases: ['HDFS'], isSkill: false },
  { id: 'hive', label: 'Hive', aliases: ['HiveSQL', 'HiveQL', 'Hive'], isSkill: false },
  {
    id: 'cloudera',
    label: 'Cloudera',
    aliases: ['Cloudera Data Platform', 'Cloudera'],
    isSkill: false,
  },
  { id: 'sas-viya', label: 'SAS Viya', aliases: ['SAS Viya', 'Viya'], isSkill: false },
  {
    id: 'sas-va',
    label: 'SAS VA',
    aliases: ['SAS Visual Analytics', 'SAS VA'],
    isSkill: false,
  },
  { id: 'sas-eg', label: 'SAS EG', aliases: ['SAS EG'], isSkill: false },
  {
    id: 'sas-em',
    label: 'SAS Enterprise Miner',
    aliases: ['SAS Enterprise Miner'],
    isSkill: false,
  },
  { id: 'sap-bo', label: 'SAP BO', aliases: ['SAP BO'], isSkill: false },
  { id: 'shiny', label: 'Shiny', aliases: ['Shiny'], isSkill: false },
  { id: 'tableau', label: 'Tableau', aliases: ['Tableau'], isSkill: false },

  // --- Highlight-only formats / protocols mentioned in prose ---
  { id: 'ndjson', label: 'NDJSON', aliases: ['NDJSON'], isSkill: false },
  { id: 'geojson', label: 'GeoJSON', aliases: ['GeoJSON'], isSkill: false },
  { id: 'ijson', label: 'ijson', aliases: ['ijson'], isSkill: false },
  { id: 'oauth', label: 'OAuth', aliases: ['OAuth 1.0a', 'OAuth'], isSkill: false },
  { id: 'json', label: 'JSON', aliases: ['JSON'], isSkill: false },
  { id: 'xml', label: 'XML', aliases: ['XML'], isSkill: false },
];

export const SKILL_TECHNOLOGIES = TECHNOLOGIES.filter((t) => t.isSkill);

export const TECH_BY_ID = new Map(TECHNOLOGIES.map((t) => [t.id, t]));

export const isSkillId = (id: string): boolean => TECH_BY_ID.get(id)?.isSkill ?? false;

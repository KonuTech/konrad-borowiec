# Konrad Borowiec - Portfolio CV

## 🌐 Połącz się ze mną

- **[GitHub](https://github.com/konutech)**
- **[LinkedIn](https://linkedin.com/in/32167)**
- **[Credly](https://credly.com/users/konrad-borowiec/badges)**

- **E-mail:** borowiec.k@gmail.com
- **Telefon:** +48 570 223 108
- **Lokalizacja:** Warszawa, Polska

---

## 👨‍💻 O Mnie

Jestem specjalistą od danych z mocnym zapleczem w sektorze usług finansowych. Największą satysfakcję czerpię z pracy wtedy, gdy narzędzia i rozwiązania, które tworzę, są aktywnie wykorzystywane przez ludzi i firmy. Dzięki biegłości w SQL, Pythonie oraz różnych technologiach przetwarzania danych skupiam się na projektowaniu wydajnych potoków danych i wyciąganiu z nich wartościowych wniosków.

Moja droga zawodowa zaczęła się w finansach i analityce, by ewoluować w stronę bardziej technicznej roli — specjalizuję się w inżynierii danych, przetwarzaniu big data i uczeniu maszynowym. Lubię mierzyć się ze złożonymi wyzwaniami związanymi z danymi i budować solidne, niezawodne rozwiązania.

---

## 📜 Doświadczenie i edukacja

### Edukacja

- **Inżynieria Big Data** | Politechnika Japońsko-Polska | 03.2018 - 02.2019
  - Studia podyplomowe z inżynierii dużych zbiorów danych. W ramach pracy końcowej zbudowanie systemu rekomendacji filmów w Pythonie.

- **Statystyczna Analiza i Analiza Danych** | Szkoła Główna Handlowa w Warszawie | 10.2013 - 06.2015
  - Studia podyplomowe. Ocena metod Reject Inference zaimplementowanych w SAS Enterprise Miner z wykorzystaniem kart scoringowych zbudowanych na losowo wygenerowanych danych portfela consumer finance.

- **MSc Finanse i Rachunkowość** | Szkoła Główna Handlowa w Warszawie | 02.2012 - 11.2014
  - Specjalizacja: Międzynarodowe Rynki Finansowe. Praca dyplomowa: wykorzystanie modelu regresji logistycznej do szacowania prawdopodobieństwa korekty polskiego rachunku bieżącego w oparciu o determinanty polskiego bilansu płatniczego.

- **Program Erasmus** | Europejski Uniwersytet Wiadrowy Frankfurt (Oder) | 04.2011 - 07.2011
  - Program wymiany studenckiej.

- **Wydział Administracji i Nauk Społecznych** | Politechnika Warszawska | 10.2008 - 01.2012
  - Analiza budżetu państwa w latach 2006–2010.

### Doświadczenie

#### Data Engineer | Marketing Engineers Group sp. z o.o. | 10.2025 - Present

Prowadzenie infrastruktury danych produkcyjnych wspierającej analizę dla klientów e-commerce, przetwarzanie danych z wielu platform do jednolitego magazynu BigQuery koordynowanego przez Apache Airflow. Użycie Apache Superset jako rozwiązania BI.

- Opracowanie niestandardowego połączenia Apache Airflow z Magento 2 z uwierzytelnianiem OAuth 1.0a (HMAC-SHA256), paginacją generatorową i logiką ponownych prób z wykładniczym opóźnieniem na wielu punktach końcowych REST API. Wyeksportowanie rekordów do GCS jako NDJSON z codziowym ładowaniem do BigQuery.
- Projektowanie pipeline'u ETL Google Ads integrującego Google Ads API z BigQuery poprzez staging w GCS. Projektowanie analitycznych tabel mapujących wydatek Google Ads do rzeczywistego zapasu klienta e-commerce dla wyświetlania w Apache Superset. Wykorzystanie dynamicznego szablonowania dat Jinja2 z inteligentnymi oknami lookback do właściwego radzenia sobie z późnymi przybyciami i deduplikacją.
- Dołączanie klientów e-commerce na platformę danych sterowaną konfiguracją. Wykorzystanie ramy generowania YAML-to-DAG do dynamicznego generowania DAG Airflow z deklaratywnych konfiguracji klientów.
- Wykonanie migracji wersji API Klaviyo bez przestoju obejmującej wieloletnią lukę wersji. Projektowanie i uruchamianie automatyzowanych testów walidacyjnych dla wielu kategorii (uwierzytelnianie, schematy subskrypcji, pola marketingowe, struktury zdarzeń, filtry kampanii, paginacja przepływów, typy metryk), potwierdzając brak łamiących zmian.
- Opracowanie niestandardowego makra dbt do normalizacji tekstu Unicode do rozwiązania problemów z mapowaniem ID produktów i deduplikacją spowodowanych znakami specjalnymi (polskie, rosyjskie i inne nielitere ASCII) w URLach produktów e-commerce. Standardizacja parsowania URL na jednolity schemacie ECOM obejmującym cztery platformy (np. Shopify, Shoper, WooCommerce i Magento), umożliwiając niezawodną deduplikację międzyplatformową.
- Użycie REST API Superset poprzez Superset MCP do programowego zapytywania konfiguracji paneli i wykresów dla automatycznych śledztw genealogii danych i następnych napraw.
- Prowadzenie rygorystycznych standardów jakości poprzez projektowanie kompleksowych zestawów testów walidacyjnych dla każdej tabeli i pipeline. Autorstwo testów SQL obejmujących spójność międzywarstwową (od stagingu przez przekształcone), analizę stopy NULL na wymaganach polach, unikalność klucza zastępczego, integralność referencyjną i porównanie starego-vs-nowego outputu API.
- Pipeline Danych Geoprzestrzennych Eurostat GISCO: Projektowanie i wdrożenie end-to-end pipeline'u ETL integrującego dane geoprzestrzenne Eurostat GISCO do platformy danych Airflow firmy. Zbudowanie niestandardowego wtyczki Airflow (operator + hook) pobierającego ~815 000 kodów pocztowych UE i 1 211 wielokątów NUTS3 z API GISCO, stagingu jako NDJSON w Google Cloud Storage i ładowania do BigQuery. Zaimplementowanie strumieniowania ijson do obsługi GeoJSON kodów pocztowych 350 MB w limitach pamięci kontenera. Stworzenie modeli dbt źródłowych i przekształconych z pełną hierarchią NUTS (kraj/NUTS1/NUTS2/NUTS3). Zarejestrowanie pipeline w ramie generatora DAG do umożliwienia automatycznego wdrożenia na środowiskach. Dane służą wizualizacjom mapowym Superset dla 31 krajów UE/EOG/EFTA.
- Backfill i Migracja Schematu Kanału Sprzedaży: Prowadzenie inicjatywy backfillu danych do integracji historycznych danych zamówień z aplikacji mobilnej do pipeline'u analitycznego głównego klienta e-commerce. Rozszerzenie schematu stagingu BigQuery i modeli dbt (warstwy źródłowe i przekształcone) na nową kolumnę kanału sprzedaży, umożliwiając filtrowanie między zamówieniami internetowymi a aplikacyjnymi na wszystkich warstwach raportowania. Zarządzanie kompatybilnością wsteczną dla 2+ lat plików CSV brakujących nowej kolumny przy jednoczesnym zapewnieniu płynnego wgrzywania nowych plików zawierających oba typy kanałów. Koordynowanie zmian schematu między wgrzywaniem GCS-to-BQ, inkrementalnymi modelami dbt i panelami Superset downstream.

#### B2B Consultant | Crestt sp. z o.o. (Santander Bank Polska S.A.) | 04.2025 - 08.2025

Wsparcie w rozwoju aplikacji Oracle APEX. Współpraca z analitykami biznesowymi w asystowaniu przy rozwoju narzędzia raportowania dla ESRS (Europejskie Standardy Raportowania Zrównoważonego Rozwoju). Projektowanie i wdrożenie funkcjonalności BI do aplikacji APEX używając PL/SQL. Wykonywanie modyfikacji do modelu raportowania gdy było to potrzebne. Wykorzystanie PL/SQL do generowania wyświetlanych raportów. Wnoszenie pomysłów i dostarczanie opinii stosując moją ekspertyzę i wiedzę w zadaniach raportowania.

#### Data Analytics & Engineering Consultant | Public Sector | 08.2024 - 02.2025

Zależnie od skali analizy, raportowanie danych krajowych używając albo Oracle SQL albo Oracle PL/SQL. Rozwój aplikacji PoC do obliczania i wizualizacji najbliższych tras między kontrolowaną jednostką a dziesięcioma najbliższymi kontrolerami (pracownicy sektora publicznego). Problem graficzny na dużą skalę danych. Użycie Pythona i SQL.

#### B2B Consultant | B2B.NET S.A. (BNP Paribas Bank Polska S.A.) | 07.2023 - 03.2024

Rozwój pipeline'ów ELT danych dla obszaru Open Banking. W tym spłaszczenie, deduplikacja i normalizacja źródła danych JSON do tabel Hive. Przetwarzanie danych półstrukturyzowanych i strukturyzowanych. Technologie użyte: MongoDB, HDFS, HiveSQL, Python, Airflow i GitLab dla CICD. Ad-hoc analiza aktywności klientów w obszarze Open Banking.

#### Big Data Developer | Crestt sp. z o.o. (Bank Pekao S.A., Nationale-Nederlanden S.A.) | 02.2021 - 06.2022

Rozwój rozwiązań przetwarzania partii danych dla jednej z największych banków w Polsce. Procesy ELT dla Data Lake były projektowane używając Airflow, Python, PySpark i Hive w on-premise Cloudera Data Platform. Rozwój i operacjonalizacja klasyfikatora churnu dla firmy ubezpieczeniowej. Dodanie funkcjonalności do oceny i monitorowania nowych danych. Rozwój i operacjonalizacja klasyfikatorów dla firmy VR training. Projektowanie i rozwój demo dashboardu HR z użyciem SAS Viya.

#### Business Intelligence Analyst | PZU S.A. | 10.2020 - 01.2021

Tester tabel outputu stworzonych przez Deweloperów SAS. Prowadzenie dokumentacji w Obszarze Ubezpieczeń Mienia.

#### SAS Analyst | ITFS Sp. z o. o. (PZU S.A.) | 05.2020 - 09.2020

Współodpowiedzialny za migrację raportów SAS Visual Analytics do środowiska SAS Viya dla największego ubezpieczyciela w Polsce. Zadania obejmowały importowanie dashboardów do Viya, naprawę schematów XML, projektowanie układów dashboardów dla ulepszonej UX, tworzenie globalnych Themes, rozwijanie formularzy XML/HTML i przetwarzanie plików JSON używając Pythona.

#### Junior Data Scientist | Crestt sp. z o. o. (Polkomtel sp. z o. o., TVP S.A.) | 03.2019 - 04.2020

Jako konsultant w dużym polskim telekomie, uczestniczenie w projektach do modernizacji procesów przeliczania data martów. Rozwój skryptów SAS gotowych do produkcji skupiających na 4GL i SQL do przetwarzania danych. Obsługa zbierania danych i segmentacji używając Pythona. Wkład w rozwój dashboardów używając Shiny i Tableau.

#### Data Analyst | Bank Pocztowy S.A. | 11.2015 - 11.2016

Automatyzacja raportowania używając SAS Guide i SAS VA. Rozwój dashboardów do oceny wydajności oddziałów bankowych, ułatwiając statystyczną i wizualną analizę wydanych pożyczek.

#### Junior Reporting Specialist | ASB Poland Sp. z o. o. | 07.2015 - 09.2015

Przetwarzanie danych finansowych, aktualizacja sprawozdań finansowych i wsparcie migracji danych między bazami danych.

#### Intern, Credit Portfolio Analysis | Bank BPH S.A., GE Capital | 03.2014 - 02.2015

Wsparcie rozwoju modelu predykcyjnego używanego do szacowania parametru LGD w Zespole Standardów i Raportowania Walurowego.

---

## 📦 Projekty

### SQL Playground using NYC Taxi Data

**Technologie:** Python, PostgreSQL, Superset, Docker, Claude Code
**Opis:** Środowisko do nauki SQL na danych z nowojorskich taksówek (NYC Taxi). Skonteneryzowane PostgreSQL, pgAdmin i Superset. Inicjalizacja bazy, backfill oraz ładowanie danych są wstępnie skonfigurowane i gotowe do użycia. Szybki start z analityką.
**[Zobacz kod](https://github.com/KonuTech/sql-playgrounds)**

---

### Classify stock growth for trading

**Technologie:** Python, Docker, PostgreSQL, Apache Airflow, XGBoost, React, TypeScript, JavaScript, Jinja, Claude Code
**Opis:** Codzienny ETL i ML z wykorzystaniem Dockera, PostgreSQL, Airflow oraz XGBoost na wybranych spółkach giełdowych. Na koniec aplikacja webowa w React. Całość zbudowana z użyciem Claude Code.
**[Zobacz kod](https://github.com/KonuTech/classify-stock-growth-for-trading)**

---

### Data Engineering Zoomcamp Capstone

**Technologie:** Python, Docker, Apache Airflow, Kafka, PySpark, PostgreSQL, Streamlit
**Opis:** Skonteneryzowany potok danych w trybie mini-batch w cyklu 5-minutowym. Spark Structured Streaming: odczyt z Kafki do PostgreSQL jako bazy docelowej. Airflow, Kafka, PySpark, PostgreSQL, Streamlit.
**[Zobacz kod](https://github.com/KonuTech/data-engineering-zoomcamp-capstone-01)**

---

### LLM Zoomcamp Capstone

**Technologie:** Python, Elasticsearch, PostgreSQL, Flask, Docker, Grafana
**Opis:** Skonteneryzowana aplikacja RAG oparta na recenzjach gier PC pobranych ze sklepu Steam. Aplikacja Flask wykorzystująca wektorową bazę danych Elasticsearch. Dodatkowo PostgreSQL do logowania zdarzeń oraz Grafana do monitoringu.
**[Zobacz kod](https://github.com/KonuTech/llm-zoomcamp-capstone-01)**

---

### MLOps Zoomcamp Capstone

**Technologie:** GCP, Python, PySpark, Pandas, scikit-learn, XGBoost, Prefect, MLflow, FastAPI, Flask, Evidently AI
**Opis:** Kompleksowy MLOps na GCP — PySpark, Pandas, scikit-learn, XGBoost, Prefect, MLflow, FastAPI, Flask, Evidently AI.
**[Zobacz kod](https://github.com/KonuTech/mlops-zoomcamp-project)**

---

### Machine Learning Zoomcamp Capstone (Scoring klienta)

**Technologie:** Python, Pandas, scikit-learn, XGBoost, Flask, Docker
**Opis:** Skonteneryzowana usługa Flask — ocena prawdopodobieństwa, że klient nie spłaci zobowiązania. Pandas, scikit-learn, XGBoost, Flask, Docker.
**[Zobacz kod](https://github.com/KonuTech/machine-learning-zoomcamp-capstone-01)**

---

### Machine Learning Zoomcamp Capstone (Klasyfikator obrazów)

**Technologie:** Python, TensorFlow, Kubernetes, Docker, Kind cluster
**Opis:** TensorFlow, klasyfikator obrazów, transfer learning, serwowanie modelu, Docker, Kubernetes, klaster Kind.
**[Zobacz kod](https://github.com/KonuTech/machine-learning-zoomcamp-capstone-02)**

---

### Portfolio Website

**Technologie:** React, TypeScript, Tailwind CSS, Node.js
**Opis:** Osobista strona portfolio zbudowana w React i TypeScript, z nowoczesnym designem i responsywnym układem.
**[Zobacz kod](https://github.com/KonuTech/konrad-borowiec)**

---

## 🎯 Zainteresowania

### Poza pracą z przyjemnością oddaję się różnym pasjom i zainteresowaniom.

#### Motocykle 🏍️

Lubię odkrywać świat na dwóch kółkach. Motocyklowe wyprawy to dla mnie idealne połączenie przygody, wolności i kontaktu z naturą. Od krętych górskich serpentyn po nadmorskie szosy — każda podróż przynosi nowe perspektywy i niezapomniane wrażenia. Zajrzyj do mojej galerii zdjęć z ostatnich motocyklowych wypraw przez piękne krajobrazy, górskie drogi i nadmorskie trasy!

#### Kolarstwo 🚴

Kolarstwo to kolejna moja pasja, która pozwala mi zachować aktywność i jednocześnie odkrywać piękne krajobrazy. Niezależnie od tego, czy jest to krótki przejazd po lokalnych trasach, czy całodniowa wyprawa za miasto — rower zapewnia mi zarówno ruch fizyczny, jak i odświeżenie umysłu.

#### Analytics Engineering i technologia 📊

Poza pracą zawodową żywo interesuję się postępami w dziedzinie inżynierii danych i analytics engineering. Lubię pracować z nowoczesnymi platformami danych, poznawać nowe narzędzia do modelowania i transformacji danych, optymalizować potoki danych oraz eksperymentować ze sposobami na to, by dane były bardziej niezawodne, skalowalne i użyteczne biznesowo. Śledzę również najnowsze trendy w infrastrukturze chmurowej dla danych, procesach ELT/ETL oraz technikach wizualizacji, żeby być na bieżąco w tej dziedzinie. Moja lista lektur technicznych odzwierciedla tę pasję — nieustannie staram się poszerzać wiedzę i umiejętności w tych dynamicznie rozwijających się obszarach.

#### Historia, architektura i ekonomia 🏛️

Głęboko interesuję się historią, architekturą i ekonomią — to one w dużej mierze kształtują sposób, w jaki odkrywam świat. Poznawanie różnych cywilizacji, ich osiągnięć architektonicznych i systemów gospodarczych pomaga mi zrozumieć ewolucję ludzkich społeczeństw i kultury. Te zainteresowania są w gruncie rzeczy motorem moich motocyklowych wypraw i kolarskich przygód. Pozwalają mi z bliska obcować z miejscami historycznymi, doceniać różnorodność stylów architektonicznych i obserwować różnice gospodarcze między regionami — co tworzy głębszą więź z odwiedzanymi miejscami.

#### Rynki finansowe 💰

Moja przygoda z rynkami finansowymi to przemyślane, długoterminowe podejście inwestycyjne, a nie krótkoterminowy trading. Kilka lat temu zaczynałem od konserwatywnych instrumentów — obligacji antyinflacyjnych i ETF-ów — by stopniowo poszerzać portfel o polskie spółki dywidendowe. Obecnie utrzymuję zdywersyfikowany portfel na rynku polskim i amerykańskim, stosując systematyczną strategię inwestycyjną, która przynosi satysfakcjonujące wyniki. To praktyczne doświadczenie dało mi cenne spojrzenie na dynamikę rynków i zasady inwestowania.

**Osobom, które chcą poszerzać wiedzę inwestycyjną, w szczególności polskojęzycznym, polecam [inwestomat.eu](https://inwestomat.eu) — wyjątkowe źródło wiedzy oferujące edukację finansową na poziomie akademickim w przystępnej formie.**

---

_Wygenerowano: 2026-05-11_
_© 2026 Konu-Tec Konrad Borowiec. Wszelkie prawa zastrzeżone._

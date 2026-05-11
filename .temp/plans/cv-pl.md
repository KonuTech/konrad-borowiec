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

- Studia podyplomowe z inżynierii dużych zbiorów danych. W ramach pracy końcowej zbudowanie systemu rekomendacji filmów w Pythonie.
- Studia podyplomowe. Ocena metod Reject Inference zaimplementowanych w SAS Enterprise Miner z wykorzystaniem kart scoringowych zbudowanych na losowo wygenerowanych danych portfela consumer finance.
- Specjalizacja: Międzynarodowe Rynki Finansowe. Praca dyplomowa: wykorzystanie modelu regresji logistycznej do szacowania prawdopodobieństwa korekty polskiego rachunku bieżącego w oparciu o determinanty polskiego bilansu płatniczego.
- Program wymiany studenckiej.
- Analiza budżetu państwa w latach 2006–2010.

### Doświadczenie

Utrzymanie produkcyjnej infrastruktury danych zasilającej analitykę dla klientów e-commerce — przetwarzanie danych z wielu platform do ujednoliconej hurtowni BigQuery, orkiestrowane przez Apache Airflow. Jako rozwiązanie BI wykorzystywany Apache Superset.

• Stworzenie autorskiego konektora Apache Airflow do Magento 2 z uwierzytelnianiem OAuth 1.0a (HMAC-SHA256), paginacją opartą na generatorach oraz logiką ponawiania z wykładniczym wycofywaniem (exponential backoff) na wielu endpointach REST API. Pobieranie rekordów do GCS w formacie NDJSON z codziennym ładowaniem do BigQuery.

• Zaprojektowanie potoku ETL dla Google Ads, integrującego Google Ads API z BigQuery poprzez warstwę staging w GCS. Stworzenie tabel analitycznych mapujących wydatki w Google Ads na rzeczywisty stan magazynowy klienta e-commerce, prezentowanych w Apache Superset. Wykorzystanie dynamicznego szablonowania dat w Jinja2 z inteligentnymi oknami lookback, aby poprawnie obsłużyć opóźnione dane i deduplikację.

• Onboardowanie klientów e-commerce na platformę danych sterowaną konfiguracją. Wykorzystanie frameworka generującego DAG-i z plików YAML do dynamicznego tworzenia DAG-ów Airflow na podstawie deklaratywnych konfiguracji klientów.

• Przeprowadzenie migracji wersji API Klaviyo bez przestoju (zero-downtime), obejmującej wieloletnią różnicę wersji. Zaprojektowanie i uruchomienie automatycznych testów walidacyjnych w wielu kategoriach (uwierzytelnianie, schematy subskrypcji, pola marketingowe, struktury zdarzeń, filtry kampanii, paginacja flow, typy metryk), potwierdzających brak zmian łamiących kompatybilność.

• Stworzenie autorskiego makra dbt do normalizacji tekstu w Unicode, rozwiązującego problemy z mapowaniem identyfikatorów produktów i deduplikacją wynikające ze znaków specjalnych (polskich, rosyjskich i innych spoza ASCII) w adresach URL produktów e-commerce. Ujednolicenie parsowania URL-i w ramach wspólnego schematu encji ECOM obejmującego cztery platformy (Shopify, Shoper, WooCommerce i Magento), co umożliwiło niezawodną deduplikację międzyplatformową.

• Wykorzystanie REST API Superset poprzez Superset MCP do programowego odpytywania konfiguracji dashboardów i wykresów na potrzeby zautomatyzowanej analizy lineage'u danych i kolejnych poprawek.

• Utrzymywanie wysokich standardów jakości poprzez projektowanie kompleksowych zestawów testów walidacyjnych dla każdej tabeli i potoku. Tworzenie testów SQL obejmujących spójność między warstwami (od staging po transformed), analizę odsetka wartości NULL w polach obowiązkowych, unikalność kluczy zastępczych (surrogate keys), integralność referencyjną oraz porównanie wyników starego i nowego API.

• Potok danych geoprzestrzennych Eurostat GISCO: zaprojektowanie i wdrożenie kompleksowego potoku ETL integrującego dane geoprzestrzenne Eurostat GISCO z firmową platformą danych opartą na Airflow. Zbudowanie autorskiego pluginu Airflow (operator + hook) pobierającego ok. 815 000 kodów pocztowych UE oraz 1 211 wielokątów granic NUTS3 z API GISCO, zapisującego je w formacie NDJSON w Google Cloud Storage i ładującego do BigQuery. Zastosowanie strumieniowego parsowania ijson do obsługi 350 MB pliku GeoJSON z kodami pocztowymi w ramach limitów pamięci kontenera. Utworzenie modeli source i transformed w dbt z pełną hierarchią NUTS (kraj/NUTS1/NUTS2/NUTS3). Zarejestrowanie potoku we frameworku generatora DAG-ów, co umożliwiło automatyczne wdrażanie na różnych środowiskach. Dane zasilają wizualizacje mapowe w Superset dla 31 krajów UE/EOG/EFTA.

• Backfill kanału sprzedaży i migracja schematu: poprowadzenie inicjatywy backfillu danych w celu integracji historycznych danych z zamówień z aplikacji mobilnej w potoku analitycznym kluczowego klienta e-commerce. Rozszerzenie schematu staging w BigQuery oraz modeli dbt (warstw source i transformed) o nową kolumnę kanału sprzedaży, co umożliwiło filtrowanie zamówień webowych i z aplikacji we wszystkich warstwach raportowych. Zarządzanie kompatybilnością wsteczną dla ponad dwóch lat historycznych plików CSV bez nowej kolumny przy jednoczesnym zapewnieniu płynnego ładowania nowych plików zawierających oba typy kanałów. Skoordynowanie zmian schematu w warstwach ładowania GCS-do-BQ, modelach inkrementalnych dbt oraz zależnych dashboardach w Superset.

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

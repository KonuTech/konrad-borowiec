#!/bin/bash

LOCALES_DIR="/mnt/c/Users/borow/VSC/projects/konrad-borowiec/client/src/i18n/locales"

# Define translations for each locale
declare -A TRANSLATIONS=(
  ["ar"]="title=تحميل السيرة الذاتية|description=خبير في حلول البيانات مقره في وارسو بولندا.|download=تحميل السيرة الذاتية"
  ["de"]="title=CV herunterladen|description=Fachmann für Datenlösungen mit Sitz in Warschau, Polen.|download=CV herunterladen"
  ["en"]="title=Download CV|description=Professional data solutions specialist based in Warsaw, Poland.|download=Download CV"
  ["es"]="title=Descargar CV|description=Especialista en soluciones de datos con sede en Varsovia, Polonia.|download=Descargar CV"
  ["fr"]="title=Télécharger le CV|description=Spécialiste des solutions de données basé à Varsovie, Pologne.|download=Télécharger le CV"
  ["hi"]="title=सिरा الذاتية डौनलोड करें|description=वार्शो, पोलैंड में स्थित पेशेवर डेटा समाधान विशेषज्ञ।|download=सिरा الذاتية डौनलोड करें"
  ["id"]="title=Unduh CV|description=Spesialis solusi data yang berbasis di Warsawa, Polandia.|download=Unduh CV"
  ["ja"]="title=CV をダウンロード|description=ワルシャワ、ポーランドに拠点を置くデータソリューション専門家。|download=CV をダウンロード"
  ["ko"]="title=이력서 다운로드|description=폴란드 바르샤바에 기반을 둔 전문 데이터 솔루션 전문가.|download=이력서 다운로드"
  ["pl"]="title=Pobierz CV|description=Specjalista od rozwiązań danych z siedzibą w Warszawie, Polska.|download=Pobierz CV"
  ["pt"]="title=Baixar CV|description=Especialista em soluções de dados com sede em Varsóvia, Polônia.|download=Baixar CV"
  ["tr"]="title=CV İndir|description=Polonya, Varşova'ya dayanan profesyonel veri çözüm uzmanı.|download=CV İndir"
  ["zh"]="title=下载简历|description=总部位于波兰华沙的专业数据解决方案专家。|download=下载简历"
)

for lang in "${!TRANSLATIONS[@]}"; do
  file="$LOCALES_DIR/$lang/translation.json"
  
  if [ -f "$file" ]; then
    # Extract translation values
    IFS='|' read -r title description download <<< "${TRANSLATIONS[$lang]}"
    
    # Use Python for reliable JSON manipulation
    python3 << PYEOF
import json

with open("$file", "r", encoding="utf-8") as f:
    data = json.load(f)

data["about"]["contact"]["pdf"] = {
    "title": "$title",
    "description": "$description",
    "download": "$download"
}

with open("$file", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ Updated {lang}")
PYEOF
  fi
done

echo ""
echo "All locale files updated!"

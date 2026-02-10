# ☁️ Moderní Weather App

Interaktivní webová aplikace pro sledování počasí, která dynamicky mění svůj vzhled podle aktuálních podmínek, teploty a denní doby.

## 🚀 Funkce
- **Geolokace:** Automatické načtení počasí podle aktuální polohy uživatele.
- **Dynamické pozadí:** Pozadí celé stránky se mění podle stavu počasí (jasno, déšť, sníh, bouřka) a denní doby (noc).
- **Teplotní režimy:** Karta počasí mění svou barvu/průhlednost podle teploty (mráz, horko, mírné pásmo).
- **Hodinová předpověď:** Přehledné zobrazení vývoje počasí na nejbližších 15 hodin (v intervalech po 3 hodinách).
- **Responzivní design:** Optimalizováno pro zobrazení na mobilních zařízeních i desktopu.
- **Uživatelský komfort:** Podpora vyhledávání pomocí klávesy Enter a automatické čištění vstupu.

## 🛠️ Použité technologie
* **HTML5** - sémantická struktura.
* **CSS3** - moderní layout, Glassmorphism design, plynulé animace a responzivita.
* **JavaScript (ES6+)** - Fetch API pro komunikaci s OpenWeather, Geolocation API, manipulace s DOM.
* **OpenWeather API** - zdroj reálných meteorologických dat.

## 📦 Instalace a spuštění
1. Stáhněte si projekt nebo naklonujte repozitář:
   ```bash
   git clone [https://github.com/TVOJE-UZIVATELSKE-JMENO/weather-app.git](https://github.com/TVOJE-UZIVATELSKE-JMENO/weather-app.git)
2. Otevřete soubor index.html v libovolném moderním prohlížeči.

## 🔑 Poznámka k API
Aplikace využívá bezplatné rozhraní OpenWeatherMap. Pro vlastní testování je nutné mít v souboru script.js nastaven vlastní apiKey.

## 📈 Plány do budoucna

[ ] Přidat vícedenní předpověď (5-7 dní).

[ ] Možnost přepínání jednotek Celsius / Fahrenheit.

[ ] Ukládání naposledy hledaného města do localStorage.

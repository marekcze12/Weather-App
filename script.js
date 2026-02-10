const apiKey = "3f3e607b7ffd88a3d94c660c1905227e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=cz";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=cz";

const searchBox = document.querySelector(".najit input");
const searchBtn = document.querySelector(".najit button");
const weatherIcon = document.querySelector(".pocasi-icon");
const card = document.querySelector(".karta");

// --- 1. AKTUALIZACE UI (HLAVNÍ KARTA + DYNAMICKÉ POZADÍ) ---
function updateUI(data) {
    console.log("Data přijata:", data);

    const weatherBox = document.querySelector(".pocasi");
    const errorBox = document.querySelector(".chyba");

    // Definice proměnných hned na začátku, aby se předešlo chybám
    const temp = data.main.temp;
    const stav = data.weather[0].main; 
    const iconCode = data.weather[0].icon;
    const isNight = iconCode.includes('n');

    // --- LOGIKA DYNAMICKÉHO POZADÍ (Zohledňuje noc, mráz i stav) ---
    let bgUrl = "";

    if (isNight) {
        // NOC: Tmavá obloha/město
        bgUrl = "https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80&w=1918&auto=format&fit=crop";
    } else if (temp <= 0) {
        // MRÁZ: Zimní krajina (i když je jasno)
        bgUrl = "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=2070&auto=format&fit=crop";
    } else {
        // DEN (nad nulou): Podle stavu počasí
        switch (stav) {
            case "Clear":
                bgUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop";
                break;
            case "Clouds":
                bgUrl = "https://images.unsplash.com/photo-1483977399921-6cf94f6fdc3a?q=80&w=2086&auto=format&fit=crop";
                break;
            case "Rain":
            case "Drizzle":
            case "Thunderstorm":
                bgUrl = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1974&auto=format&fit=crop";
                break;
            default:
                bgUrl = "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop";
        }
    }
    document.body.style.backgroundImage = `url('${bgUrl}')`;

    // --- BARVA KARTY (Průhledné zabarvení) ---
    if (isNight) {
        card.style.background = "rgba(25, 25, 112, 0.75)";
    } else if (temp > 25) {
        card.style.background = "rgba(255, 123, 0, 0.6)"; 
    } else if (temp < 0) {
        card.style.background = "rgba(41, 128, 185, 0.8)";
    } else {
        card.style.background = "rgba(0, 0, 0, 0.6)"; 
    }

    // --- VYPLNĚNÍ TEXTŮ ---
    document.querySelector(".mesto").innerHTML = data.name;
    document.querySelector(".teplota").innerHTML = Math.round(temp) + "°C";
    document.querySelector(".vlhkost").innerHTML = data.main.humidity + "%";
    document.querySelector(".vitr").innerHTML = Math.round(data.wind.speed) + " km/h";
    document.querySelector(".pocitova").innerHTML = Math.round(data.main.feels_like) + "°C";
    
    const popis = data.weather[0].description;
    document.querySelector(".popis-pocasi").innerHTML = popis.charAt(0).toUpperCase() + popis.slice(1);

    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    document.querySelector(".datum").innerHTML = now.toLocaleDateString('cs-CZ', options);

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    errorBox.style.display = "none";
    weatherBox.style.display = "block";
}

// --- 2. PŘEDPOVĚĎ NA NEJBLIŽŠÍ HODINY ---
async function getForecast(mesto) {
    try {
        const response = await fetch(`${forecastUrl}&q=${mesto}&appid=${apiKey}`);
        const data = await response.json();
        
        const seznamElem = document.querySelector(".predpoved-seznam");
        seznamElem.innerHTML = ""; 

        for (let i = 0; i < 5; i++) {
            const f = data.list[i];
            const cas = new Date(f.dt * 1000).getHours() + ":00";
            const ikona = f.weather[0].icon;
            const teplota = Math.round(f.main.temp);

            const polozkaHtml = `
                <div class="predpoved-polozka">
                    <p>${cas}</p>
                    <img src="https://openweathermap.org/img/wn/${ikona}.png">
                    <p class="predpoved-temp">${teplota}°C</p>
                </div>
            `;
            seznamElem.innerHTML += polozkaHtml;
        }
    } catch (error) {
        console.error("Chyba předpovědi:", error);
    }
}

// --- 3. HLAVNÍ FUNKCE VYHLEDÁVÁNÍ ---
async function checkWeather(mesto) {
    if (!mesto) return;

    try {
        const response = await fetch(`${apiUrl}&q=${mesto}&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".chyba").style.display = "block";
            document.querySelector(".pocasi").style.display = "none";
        } else {
            const data = await response.json();
            updateUI(data);
            getForecast(data.name);
            searchBox.value = ""; 
        }
    } catch (error) {
        console.error("Chyba:", error);
    }
}

// --- 4. GEOLOKACE (Poloha uživatele) ---
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const response = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
                    const data = await response.json();
                    updateUI(data);
                    getForecast(data.name);
                } catch (error) {
                    checkWeather("Praha");
                }
            },
            () => { checkWeather("Praha"); }
        );
    } else {
        checkWeather("Praha");
    }
}

// --- 5. EVENTY ---
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(searchBox.value);
});

// Start
getUserLocation();
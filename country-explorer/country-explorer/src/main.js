console.log("<-- Welcome to Country Explorer using API -->");

const loader = document.querySelector("#loader");
const error = document.querySelector("#error");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const countryDetails = document.getElementById("countryDetails");
const mapArea = document.getElementById("map");
let map;

searchBtn.addEventListener("click",async () => {
  const country = searchInput.value.trim();

  if (!country) return;

  await fetchCountry(country);
});

async function fetchCountry(name) {

  error.classList.add("hidden");
  loader.classList.remove("hidden");

  countryDetails.innerHTML = "";

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    const data = await response.json();

    const country = data[0];

    if (!country) {
      throw new Error("Invaild Country Name");
    }

    const language = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    countryDetails.innerHTML = `
        <div class="p-4 border rounded shadow">
            <img src="${country.flags.svg}" alt="flag" class="w-32 mb-2" />
            <h2 class="text-xl font-bold">${country.name.common}</h2>
            <p><strong>Region : </strong> ${country.region}</p>
            <p><strong>Capital : </strong>${country.capital}</p>
            <p><strong>Population : </strong> ${country.population.toLocaleString()}</p>
            <p><strong>languages : </strong>${language}</p>
            <p><strong>Timezone : </strong>${country.timezones}</p>
        </div>
    `;

    console.log(country.latlng);
    drawMap(country.latlng, country.name.common);
    
    // console.log(data[0]?.name?.common);
  } catch (err) {
    error.classList.remove("hidden");
    error.textContent = err.message || "Failed to fetch the country info";
  } finally {
    loader.classList.add("hidden");
  }
}

let marker;

function drawMap(latlang, name) {
  const [lat, lng] = latlang;

  if (!map) {
    map = L.map("map").setView([lat, lng], 5);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  } else {
    map.setView([lat, lng], 5);
  }

  // remove old marker (optional but recommended)
  if (marker) {
    map.removeLayer(marker);
  }

  // add marker properly
  marker = L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();
}



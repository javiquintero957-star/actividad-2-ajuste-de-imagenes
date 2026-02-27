const container = document.getElementById('list-container');
const houseFilter = document.getElementById('houseFilter');

let allCharacters = [];

async function getCharacters() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();

        allCharacters = data.filter(c => c.image !== "");
        renderCharacters(allCharacters);

    } catch (error) {
        console.error("Error cargando la API:", error);
    }
}

function renderCharacters(characters) {
    container.innerHTML = "";

    characters.slice(0, 20).forEach(char => {
        createRow(char);
    });
}

function createRow(char) {
    const row = document.createElement('div');
    row.className = 'row-card';

    row.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <div class="info">
            <h2>${char.name}</h2>
            <p><b>Casa:</b> ${char.house || 'Ninguna'}</p>
            <p><b>Actor:</b> ${char.actor || 'Desconocido'}</p>
        </div>
    `;

    container.appendChild(row);
}

/* 🔎 FILTRO */
houseFilter.addEventListener("change", (e) => {
    const selectedHouse = e.target.value;

    if (selectedHouse === "all") {
        renderCharacters(allCharacters);
    } else {
        const filtered = allCharacters.filter(
            char => char.house === selectedHouse
        );
        renderCharacters(filtered);
    }
});

getCharacters();

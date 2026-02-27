const container = document.getElementById('list-container');
let allCharacters = [];

async function getCharacters() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();

        allCharacters = data.filter(c => c.image !== "");

        renderCharacters(allCharacters);

    } catch (error) {
        console.error("Error cargando API:", error);
    }
}

function renderCharacters(data) {
    container.innerHTML = "";
    data.forEach(createRow);
}

function createRow(char) {
    const row = document.createElement('div');
    row.className = 'row-card';

    row.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <div class="info">
            <h2>${char.name}</h2>
            <p><b>Casa:</b> ${char.house || 'Ninguna'}</p>
            <p><b>Actor:</b> ${char.actor}</p>
        </div>
    `;

row.addEventListener("click", () => {
    document.body.classList.remove("loaded");

    setTimeout(() => {
        window.location.href = `pages/detail.html?name=${encodeURIComponent(char.name)}`;
    }, 300);
});
    container.appendChild(row);
}

function showPreview(char) {
    const preview = document.getElementById("preview");

    preview.innerHTML = `
        <div class="preview-content">
            <h2>${char.name}</h2>
            <img src="${char.image}">
            <p><b>Casa:</b> ${char.house || 'Ninguna'}</p>
            <p><b>Actor:</b> ${char.actor}</p>
            <p><b>Especie:</b> ${char.species}</p>
            <button onclick="closePreview()">Cerrar</button>
        </div>
    `;

    preview.classList.remove("hidden");
}

function closePreview() {
    document.getElementById("preview").classList.add("hidden");
}

function filterHouse(house) {
    if (!house) {
        renderCharacters(allCharacters);
        return;
    }

    if (house === "Sin casa") {
        const filtered = allCharacters.filter( c => !c.house || c.house === "");
        renderCharacters(filtered);
        return;
    }

    const filtered = allCharacters.filter(c => c.house === house);
    renderCharacters(filtered);
}

getCharacters();

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

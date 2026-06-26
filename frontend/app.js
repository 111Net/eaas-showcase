const API = "http://192.168.111.129:8001";

async function checkHealth() {
    const r = await fetch(`${API}/health`);
    const d = await r.json();
    document.getElementById("output").textContent =
        JSON.stringify(d, null, 2);
}

async function loadFeatures() {
    const r = await fetch(`${API}/features`);
    const d = await r.json();

    document.getElementById("output").textContent =
        JSON.stringify(d, null, 2);

    document.getElementById("features").innerHTML =
        d.features.join("<br>");
}

async function loadAbout() {
    const r = await fetch(`${API}/about`);
    const d = await r.json();

    document.getElementById("output").textContent =
        JSON.stringify(d, null, 2);
}

async function loadRoadmap() {
    const r = await fetch(`${API}/roadmap`);
    const d = await r.json();

    document.getElementById("output").textContent =
        JSON.stringify(d, null, 2);
}

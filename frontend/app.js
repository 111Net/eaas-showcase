const API = "http://192.168.111.129:8001";

/*
==========================================
EAAS Showcase v1.4.0
Infrastructure Dashboard
==========================================
*/

async function api(endpoint) {

    const response = await fetch(API + endpoint);

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();
}

/*
==========================================
Dashboard
==========================================
*/

async function updateDashboard() {

    try {

        const system = await api("/system");

        document.getElementById("backend-status").textContent =
            system.backend === "online"
                ? "🟢 Online"
                : "🔴 Offline";

        document.getElementById("database-status").textContent =
            system.database === "connected"
                ? "🟢 Connected"
                : "🔴 Disconnected";

        document.getElementById("cpu").textContent =
            system.cpu_percent + " %";

        document.getElementById("memory").textContent =
            system.memory_percent + " %";

        document.getElementById("disk").textContent =
            system.disk_percent + " %";

        document.getElementById("version").textContent =
            "EAAS Showcase v" + system.version;

    }

    catch {

        document.getElementById("backend-status").textContent = "🔴 Offline";
        document.getElementById("database-status").textContent = "🔴 Offline";
    }

    try {

        const stats = await api("/stats");

        document.getElementById("total-feedback").textContent =
            stats.total_feedback;

        document.getElementById("unique-users").textContent =
            stats.unique_users;

        document.getElementById("latest-submission").textContent =
            stats.latest_submission ?? "--";

    }

    catch {}

    try {

        const latest = await api("/feedback/latest");

        let text = "";

        latest.forEach(item => {

            text +=
                item.created_at +
                "\n" +
                item.name +
                "\n" +
                item.message +
                "\n\n";

        });

        document.getElementById("recent-feedback").textContent = text;

    }

    catch {

        document.getElementById("recent-feedback").textContent =
            "Unable to load feedback.";

    }

}

/*
==========================================
API Tester
==========================================
*/

async function checkHealth() {

    const data = await api("/health");

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);

}

async function loadFeatures() {

    const data = await api("/features");

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);

    document.getElementById("features").innerHTML =
        data.features.join("<br>");

}

async function loadAbout() {

    const data = await api("/about");

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);

}

async function loadRoadmap() {

    const data = await api("/roadmap");

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);

}

/*
==========================================
Feedback
==========================================
*/

async function submitFeedback() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const status = document.getElementById("feedback-status");

    if (!name || !email || !message) {

        status.textContent = "Please complete all fields.";

        return;

    }

    status.textContent = "Submitting...";

    try {

        const response = await fetch(API + "/feedback", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                message
            })

        });

        const result = await response.json();

        if (!response.ok) {

            throw new Error(result.detail);

        }

        status.textContent =
            "✅ Feedback submitted successfully.";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

        await updateDashboard();

    }

    catch (err) {

        status.textContent = "❌ " + err.message;

    }

}

/*
==========================================
Startup
==========================================
*/

window.onload = async function () {

    await updateDashboard();

    try {

        const data = await api("/features");

        document.getElementById("features").innerHTML =
            data.features.join("<br>");

    }

    catch {

        document.getElementById("features").innerHTML =
            "Unable to load features.";

    }

};

setInterval(updateDashboard, 10000);

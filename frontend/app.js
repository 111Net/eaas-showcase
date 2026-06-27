/*
====================================================
EAAS Showcase v1.3.1
Energy As A Service
Frontend Dashboard
====================================================
*/

const API = "http://192.168.111.129:8001";

/*
====================================================
Generic API Helper
====================================================
*/

async function api(endpoint) {

    const response = await fetch(API + endpoint);

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();

}

/*
====================================================
Dashboard
====================================================
*/

async function updateDashboard() {

    /* Backend Status */

    try {

        const health = await api("/health");

        document.getElementById("backend-status").textContent =
            health.status === "healthy"
                ? "🟢 Online"
                : "🔴 Offline";

    }

    catch {

        document.getElementById("backend-status").textContent =
            "🔴 Offline";

    }

    /* Database Status */

    try {

        await api("/stats");

        document.getElementById("database-status").textContent =
            "🟢 Connected";

    }

    catch {

        document.getElementById("database-status").textContent =
            "🔴 Offline";

    }

    /* Statistics */

    try {

        const stats = await api("/stats");

        document.getElementById("total-feedback").textContent =
            stats.total_feedback;

        document.getElementById("unique-users").textContent =
            stats.unique_users;

        document.getElementById("latest-submission").textContent =
            stats.latest_submission ?? "--";

    }

    catch {

        document.getElementById("total-feedback").textContent = "--";
        document.getElementById("unique-users").textContent = "--";
        document.getElementById("latest-submission").textContent = "--";

    }

    /* Last Refresh */

    document.getElementById("last-refresh").textContent =
        new Date().toLocaleString();

}

/*
====================================================
Recent Feedback
====================================================
*/

async function loadRecentFeedback() {

    const container =
        document.getElementById("recent-feedback");

    try {

        const rows =
            await api("/feedback/latest");

        if (rows.length === 0) {

            container.innerHTML =
                "<p>No feedback available.</p>";

            return;

        }

        container.innerHTML = "";

        rows.forEach(row => {

            container.innerHTML += `

            <div class="feedback-card">

                <strong>${row.name}</strong>

                <br>

                ${row.message}

                <br>

                <small>${row.created_at}</small>

            </div>

            `;

        });

    }

    catch {

        container.innerHTML =
            "<p>Unable to load feedback.</p>";

    }

}

/*
====================================================
API Tester
====================================================
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
====================================================
Feedback Form
====================================================
*/

async function submitFeedback() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const status =
        document.getElementById("feedback-status");

    const button =
        document.querySelector("button[onclick='submitFeedback()']");

    if (!name || !email || !message) {

        status.textContent =
            "Please complete all fields.";

        return;

    }

    button.disabled = true;

    status.textContent =
        "Submitting...";

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

        const result =
            await response.json();

        if (!response.ok) {

            throw new Error(
                result.detail || "Submission failed."
            );

        }

        status.textContent =
            "✅ Feedback submitted successfully.";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

        await updateDashboard();
        await loadRecentFeedback();

    }

    catch (err) {

        status.textContent =
            "❌ " + err.message;

    }

    finally {

        button.disabled = false;

    }

}

/*
====================================================
Startup
====================================================
*/

window.onload = async function () {

    await updateDashboard();

    await loadRecentFeedback();

    try {

        const data =
            await api("/features");

        document.getElementById("features").innerHTML =
            data.features.join("<br>");

    }

    catch {

        document.getElementById("features").innerHTML =
            "Unable to load features.";

    }

};

setInterval(async () => {

    await updateDashboard();

    await loadRecentFeedback();

}, 30000);

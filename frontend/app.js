const API = "http://192.168.111.129:8001";

/*
==========================================
EAAS Showcase v1.2.0
Frontend Dashboard
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

        const health = await api("/health");

        document.getElementById("backend-status").textContent =
            health.status === "healthy"
                ? "🟢 Online"
                : "🔴 Offline";

    } catch {

        document.getElementById("backend-status").textContent =
            "🔴 Offline";

    }

    try {

        const stats = await api("/stats");

        document.getElementById("total-feedback").textContent =
            stats.total_feedback;

        document.getElementById("unique-users").textContent =
            stats.unique_users;

        document.getElementById("latest-submission").textContent =
            stats.latest_submission ?? "--";

    } catch {

        document.getElementById("total-feedback").textContent = "--";

        document.getElementById("unique-users").textContent = "--";

        document.getElementById("latest-submission").textContent = "--";

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
        "Submitting feedback...";

    try {

        const response = await fetch(
            API + "/feedback",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })

            }
        );

        const result = await response.json();

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

setInterval(updateDashboard, 30000);

const API = "http://192.168.111.129:8001";

async function checkHealth() {
    const response = await fetch(`${API}/health`);
    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}

async function loadFeatures() {
    const response = await fetch(`${API}/features`);
    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);

    document.getElementById("features").innerHTML =
        data.features.join("<br>");
}

async function loadAbout() {
    const response = await fetch(`${API}/about`);
    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}

async function loadRoadmap() {
    const response = await fetch(`${API}/roadmap`);
    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}

async function submitFeedback() {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const status = document.getElementById("feedback-status");

    const submitButton =
        document.querySelector("button[onclick='submitFeedback()']");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Step 3 — Frontend Validation
    if (!name || !email || !message) {

        status.textContent = "Please complete all fields.";

        return;
    }

    // Step 5 — Loading Message
    status.textContent = "Submitting feedback...";

    // Step 6 — Disable Double Submission
    if (submitButton) {
        submitButton.disabled = true;
    }

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
            throw new Error(result.detail || "Submission failed.");
        }

        // Step 4 — Success Message
        status.textContent = "✅ Feedback submitted successfully.";

        // Step 7 — Clear the Form
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        console.log(result);

    }
    catch (error) {

        console.error(error);

        status.textContent =
            error.message || "❌ Submission failed.";

    }
    finally {

        if (submitButton) {
            submitButton.disabled = false;
        }

    }
}

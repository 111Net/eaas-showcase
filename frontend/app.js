async function checkHealth() {

    document.getElementById("status").innerHTML =
        "Checking API...";

    try {

        const response = await fetch(
            "http://192.168.111.129:8000/health",
            {
                method: "GET",
                mode: "cors"
            }
        );

        const data = await response.json();

        document.getElementById("status").innerHTML =
            "API Status: " + data.status;

    } catch (error) {

        console.log(error);

        document.getElementById("status").innerHTML =
            "Backend unavailable";

    }

}

window.onload = checkHealth;

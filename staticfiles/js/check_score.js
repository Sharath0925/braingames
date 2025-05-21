document.addEventListener("DOMContentLoaded", function () {
    const pending = localStorage.getItem("pending_score");
    if (pending) {
        const data = JSON.parse(pending);
        const formData = new FormData();
        formData.append("game", data.game);
        formData.append("score", data.score);

        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        fetch("/submit-score/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrfToken
            },
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === "success") {
                localStorage.removeItem("pending_score");
                window.location.href = "/view_scores/";
            } else {
                alert("Failed to save score: " + result.message);
            }
        });
    } else {
        window.location.href = "/view_scores/";
    }
});

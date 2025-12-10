// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/Quizzone/service-worker.js");
}

// Redirect to custom 404 page
fetch(window.location.href).then(resp => {
    if (!resp.ok) window.location.href = "/Quizzone/Errors/404.htm";
});

// Install Button Enable
let installPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installPrompt = e;

    let btn = document.getElementById("installAppBtn");
    if (btn) btn.style.display = "inline-block";

    btn.onclick = () => {
        installPrompt.prompt();
        installPrompt.userChoice.then(() => installPrompt = null);
    };
});
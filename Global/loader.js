// Inject Navbar
fetch("/Quizzone/Global/navbar.htm")
    .then(res => res.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
    });

// Inject Footer
fetch("/Quizzone/Global/footer.htm")
    .then(res => res.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
    });

// Navigation Functions
function goHome(){ window.location.href = "/Quizzone/Home/index.htm"; }
function goDashboard(){ window.location.href = "/Quizzone/Home/Dashboard.htm"; }
function goDisciplines(){ window.location.href = "/Quizzone/Disciplines/index.htm"; }
function goCompetency(){ window.location.href = "../Competency Quizes Set/index.html"; }
function goSettings(){ window.location.href = "../Home/Settings.html"; }

function logout(){
    localStorage.removeItem("ActiveQuizzoneUser");
    window.location.href = "/Quizzone/Home/index.htm";
}
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
function goCompetency(){ window.location.href = "/Quizzone/CompetancyTest/index.htm"; }
function goSettings(){ window.location.href = "/Quizzone/Home/Setting.htm"; }

function logout(){
    localStorage.removeItem("ActiveQuizzoneUser");
    window.location.href = "/Quizzone/Home/SignIn.htm";
}

fetch(window.location.href)
  .then(res => {
    if (!res.ok) window.location.href = "/Quizzone/Errors/404.htm";
  })
  .catch(() => window.location.href = "/Quizzone/Errors/404.htm");
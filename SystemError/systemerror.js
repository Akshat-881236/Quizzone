/* =========================================================
   QUIZZONE SYSTEM ERROR JAVASCRIPT
   File : systemerror.js
   ========================================================= */


/* =========================================================
   GLOBAL RUNTIME OBJECT
========================================================= */

const QZ_RUNTIME = {

    version : "1.0.0",

    app : "Quizzone Recovery Engine",

    redirectDelay : 10,

    countdown : 10,

    redirectURL : "/Quizzone/index.htm",

    particles : [],

    device : "Unknown",

    online : navigator.onLine,

    currentURL : location.href,

    currentPath : location.pathname,

    referrer : document.referrer || "No Referrer",

    params : new URLSearchParams(location.search),

    error : {}

};


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

document.addEventListener("DOMContentLoaded", ()=>{

    initializeSystem();

});


/* =========================================================
   MAIN INITIALIZER
========================================================= */

function initializeSystem(){

    detectDevice();

    classifyError();

    injectRuntimeMeta();

    renderRuntimeData();

    initializeButtons();

    initializeTimeline();

    initializeParticles();

    initializeSmartRedirect();

    initializeRecoveryStorage();

    initializeKeyboardShortcuts();

    initializeNetworkListeners();

    initializeGeometricEffects();

    console.log(
        "%cQuizzone Recovery Runtime Active",
        "color:#00c3ff;font-size:16px;font-weight:bold;"
    );

}


/* =========================================================
   DEVICE DETECTION ENGINE
========================================================= */

function detectDevice(){

    const width = window.innerWidth;

    if(width < 240){

        QZ_RUNTIME.device = "Keypad Phone";

    }

    else if(width < 360){

        QZ_RUNTIME.device = "Small Phone";

    }

    else if(width < 576){

        QZ_RUNTIME.device = "Smartphone";

    }

    else if(width < 992){

        QZ_RUNTIME.device = "Tablet";

    }

    else if(width < 1440){

        QZ_RUNTIME.device = "Laptop / PC";

    }

    else if(width < 2560){

        QZ_RUNTIME.device = "UltraWide Display";

    }

    else{

        QZ_RUNTIME.device = "SmartBoard";

    }

}


/* =========================================================
   ERROR CLASSIFICATION ENGINE
========================================================= */

function classifyError(){

    const path = QZ_RUNTIME.currentPath.toLowerCase();

    const query = QZ_RUNTIME.params;

    const ERROR_TYPES = {

        DISCIPLINE : {
            code : "QZ-404-DISC",
            title : "Discipline Not Found",
            description :
            "The requested discipline does not exist in Quizzone.",
            color : "#ff4d6d"
        },

        QUIZ : {
            code : "QZ-404-QUIZ",
            title : "Quiz Not Found",
            description :
            "The requested quiz resource could not be located.",
            color : "#00c3ff"
        },

        TOPIC : {
            code : "QZ-404-TOPIC",
            title : "Topic Not Found",
            description :
            "The requested learning topic is unavailable.",
            color : "#ffaa00"
        },

        OFFLINE : {
            code : "QZ-503-OFFLINE",
            title : "Offline Recovery Required",
            description :
            "You are offline and the requested page is unavailable.",
            color : "#00ffb3"
        },

        DEFAULT : {
            code : "QZ-404",
            title : "Page Not Found",
            description :
            "The requested route does not exist inside Quizzone.",
            color : "#0d6efd"
        }

    };


    /* OFFLINE */

    if(!navigator.onLine){

        QZ_RUNTIME.error = ERROR_TYPES.OFFLINE;

    }

    /* DISCIPLINE */

    else if(path.includes("discipline")){

        QZ_RUNTIME.error = ERROR_TYPES.DISCIPLINE;

    }

    /* QUIZ */

    else if(path.includes("quiz")){

        QZ_RUNTIME.error = ERROR_TYPES.QUIZ;

    }

    /* TOPIC */

    else if(path.includes("topic")){

        QZ_RUNTIME.error = ERROR_TYPES.TOPIC;

    }

    /* URL PARAM */

    else if(query.get("error") === "quiz"){

        QZ_RUNTIME.error = ERROR_TYPES.QUIZ;

    }

    else{

        QZ_RUNTIME.error = ERROR_TYPES.DEFAULT;

    }


    /* GENERATE UNIQUE ERROR ID */

    QZ_RUNTIME.error.id = generateErrorID();

}


/* =========================================================
   GENERATE ERROR ID
========================================================= */

function generateErrorID(){

    const now = Date.now();

    const random =
        Math.random()
        .toString(36)
        .substring(2,8)
        .toUpperCase();

    return `QZ-${now}-${random}`;

}


/* =========================================================
   INJECT RUNTIME META
========================================================= */

function injectRuntimeMeta(){

    document.title =
        `${QZ_RUNTIME.error.title} • Quizzone`;

    updateMeta(
        "description",
        QZ_RUNTIME.error.description
    );

    updateMeta(
        "error-id",
        QZ_RUNTIME.error.id
    );

    updateMeta(
        "error-code",
        QZ_RUNTIME.error.code
    );

    updateMeta(
        "error-title",
        QZ_RUNTIME.error.title
    );

    updateMeta(
        "device-class",
        QZ_RUNTIME.device
    );

    updateMeta(
        "network-state",
        navigator.onLine ? "ONLINE" : "OFFLINE"
    );

    updateMeta(
        "last-route",
        QZ_RUNTIME.referrer
    );

    updateMeta(
        "runtime-status",
        "ACTIVE"
    );

}


/* =========================================================
   META HELPER
========================================================= */

function updateMeta(name,value){

    const meta =
        document.querySelector(
            `meta[name="${name}"]`
        );

    if(meta){

        meta.setAttribute("content",value);

    }

}


/* =========================================================
   RENDER RUNTIME DATA
========================================================= */

function renderRuntimeData(){

    $("#runtime-error-code")
        .text(QZ_RUNTIME.error.code);

    $("#runtime-error-title")
        .text(QZ_RUNTIME.error.title);

    $("#runtime-error-description")
        .text(QZ_RUNTIME.error.description);

    $("#runtime-error-id")
        .text(QZ_RUNTIME.error.id);

    $("#runtime-device")
        .text(QZ_RUNTIME.device);

    $("#runtime-network")
        .text(
            navigator.onLine
            ? "ONLINE"
            : "OFFLINE"
        );

    $("#runtime-route")
        .text(QZ_RUNTIME.currentPath);

    $("#runtime-referrer")
        .text(QZ_RUNTIME.referrer);

}


/* =========================================================
   BUTTON ENGINE
========================================================= */

function initializeButtons(){

    $("#go-back-btn").on("click",()=>{

        smartGoBack();

    });

    $("#home-btn").on("click",()=>{

        window.location.href =
            "/Quizzone/index.htm";

    });

    $("#reload-btn").on("click",()=>{

        location.reload();

    });

}


/* =========================================================
   SMART GO BACK
========================================================= */

function smartGoBack(){

    if(document.referrer &&
       document.referrer.includes(location.hostname)){

        history.back();

    }

    else{

        const lastPage =
            localStorage.getItem(
                "QZ_LAST_ROUTE"
            );

        if(lastPage){

            location.href = lastPage;

        }

        else{

            location.href =
                "/Quizzone/index.htm";

        }

    }

}


/* =========================================================
   TIMELINE ENGINE
========================================================= */

function initializeTimeline(){

    const steps =
        document.querySelectorAll(
            ".timeline-step"
        );

    steps.forEach((step,index)=>{

        setTimeout(()=>{

            step.classList.add("active");

        },index * 1500);

    });

}


/* =========================================================
   AUTO REDIRECT
========================================================= */

function initializeSmartRedirect(){

    const counter =
        document.getElementById(
            "redirect-counter"
        );

    let timer =
        QZ_RUNTIME.redirectDelay;

    const interval = setInterval(()=>{

        timer--;

        counter.textContent = timer;

        if(timer <= 0){

            clearInterval(interval);

            performSmartRedirect();

        }

    },1000);

}


/* =========================================================
   SMART REDIRECT ENGINE
========================================================= */

function performSmartRedirect(){

    if(document.referrer &&
       document.referrer.includes(location.hostname)){

        history.back();

    }

    else{

        const saved =
            localStorage.getItem(
                "QZ_LAST_ROUTE"
            );

        if(saved){

            location.href = saved;

        }

        else{

            location.href =
                "/Quizzone/index.htm";

        }

    }

}


/* =========================================================
   LOCAL STORAGE RECOVERY
========================================================= */

function initializeRecoveryStorage(){

    localStorage.setItem(
        "QZ_LAST_ERROR",
        JSON.stringify({

            timestamp : new Date(),

            route : location.href,

            error : QZ_RUNTIME.error

        })
    );

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboardShortcuts(){

    document.addEventListener(
        "keydown",
        (event)=>{

            /* HOME */

            if(event.key === "h"){

                location.href =
                    "/Quizzone/index.htm";

            }

            /* BACK */

            if(event.key === "b"){

                smartGoBack();

            }

            /* RELOAD */

            if(event.key === "r"){

                location.reload();

            }

        }
    );

}


/* =========================================================
   NETWORK STATUS LISTENER
========================================================= */

function initializeNetworkListeners(){

    window.addEventListener(
        "offline",
        ()=>{

            $("#runtime-network")
                .text("OFFLINE");

        }
    );

    window.addEventListener(
        "online",
        ()=>{

            $("#runtime-network")
                .text("ONLINE");

        }
    );

}


/* =========================================================
   PARTICLE ENGINE
========================================================= */

function initializeParticles(){

    const canvas =
        document.getElementById(
            "particle-canvas"
        );

    if(!canvas) return;

    const ctx =
        canvas.getContext("2d");

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    function resizeCanvas(){

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    /* CREATE PARTICLES */

    for(let i=0;i<80;i++){

        QZ_RUNTIME.particles.push({

            x : Math.random() * canvas.width,

            y : Math.random() * canvas.height,

            radius : Math.random() * 2,

            speedX : (Math.random() - .5),

            speedY : (Math.random() - .5)

        });

    }


    /* ANIMATION */

    function animate(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle =
            "rgba(0,123,255,.7)";

        QZ_RUNTIME.particles.forEach(p=>{

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if(p.x < 0 || p.x > canvas.width)
                p.speedX *= -1;

            if(p.y < 0 || p.y > canvas.height)
                p.speedY *= -1;

        });

        requestAnimationFrame(animate);

    }

    animate();

}


/* =========================================================
   GEOMETRIC EFFECTS
========================================================= */

function initializeGeometricEffects(){

    document.addEventListener(
        "mousemove",
        (e)=>{

            const orb =
                document.querySelector(
                    ".orb-2"
                );

            if(!orb) return;

            orb.style.transform =
                `translate(
                    ${e.clientX * 0.01}px,
                    ${e.clientY * 0.01}px
                )`;

        }
    );

}


/* =========================================================
   URL PARAM ANALYZER
========================================================= */

(function analyzeURLParams(){

    const params =
        QZ_RUNTIME.params;

    if(params.has("redirect")){

        QZ_RUNTIME.redirectURL =
            params.get("redirect");

    }

    if(params.has("code")){

        $("#runtime-error-code")
            .text(params.get("code"));

    }

})();


/* =========================================================
   ROUTE TRACKING
========================================================= */

window.addEventListener(
    "beforeunload",
    ()=>{

        localStorage.setItem(
            "QZ_LAST_ROUTE",
            location.href
        );

    }
);


/* =========================================================
   ACCESSIBILITY IMPROVEMENT
========================================================= */

(function accessibilityMode(){

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if(prefersReducedMotion){

        document.body.classList.add(
            "reduce-motion"
        );

    }

})();


/* =========================================================
   CONSOLE RUNTIME INFO
========================================================= */

console.table({

    APP : QZ_RUNTIME.app,

    VERSION : QZ_RUNTIME.version,

    DEVICE : QZ_RUNTIME.device,

    NETWORK :
        navigator.onLine
        ? "ONLINE"
        : "OFFLINE",

    ERROR : QZ_RUNTIME.error.code

});
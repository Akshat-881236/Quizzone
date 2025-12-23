/* =========================================================
   QuizzoneAI – Dynamic SEO Meta Loader
   Author: Akshat Prasad
   ========================================================= */

(function loadSEOMeta(){

  const metaData = [
    { name: "description", content: "QuizzoneAI is an AI-powered learning and quiz platform that helps students practice MCQs, understand concepts, and prepare smarter using intelligent commands and AI assistance." },

    { name: "keywords", content: "QuizzoneAI, AI quiz platform, online quiz system, AI learning assistant, MCQ practice, student quiz app, AI education tool, smart quiz app, exam preparation AI, learning with AI" },

    { name: "author", content: "Akshat Prasad" },
    { name: "creator", content: "Akshat Prasad" },
    { name: "publisher", content: "QuizzoneAI" },

    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "bingbot", content: "index, follow" },

    { name: "revisit-after", content: "7 days" },
    { name: "rating", content: "general" },
    { name: "distribution", content: "global" },
    { name: "language", content: "English" },

    { property: "og:title", content: "QuizzoneAI – Smart AI Quiz & Learning Platform" },
    { property: "og:description", content: "Learn smarter with QuizzoneAI. Practice quizzes, MCQs, and get AI-powered explanations designed for students and self-learners." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: window.location.href="https://akshat-881236.github.io/Quizzone/Home/QuizzoneAI.htm" },
    { property: "og:site_name", content: "QuizzoneAI" },

    { property: "og:image", content: "https://akshat-881236.github.io/Quizzone/icons/QuizzoneLogo.png" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "QuizzoneAI – AI Powered Quiz System" },
    { name: "twitter:description", content: "AI-based quiz and learning assistant for students. Practice, learn, and grow with QuizzoneAI." },
    { name: "twitter:creator", content: "@AkshatPrasad" },

    { name: "theme-color", content: "#2B59FF" },
    { name: "msapplication-TileColor", content: "#2B59FF" },

    { name: "application-name", content: "QuizzoneAI" },
    { name: "apple-mobile-web-app-title", content: "QuizzoneAI" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },

    { name: "mobile-web-app-capable", content: "yes" },
    { name: "format-detection", content: "phone=7838250289" },

    { name: "classification", content: "Education, AI, Quiz Platform" },
    { name: "coverage", content: "Worldwide" },
    { name: "target", content: "students, learners, developers" },

    { httpEquiv: "X-UA-Compatible", content: "IE=edge" }
  ];

  metaData.forEach(data => {
    const meta = document.createElement("meta");

    if (data.name) meta.setAttribute("name", data.name);
    if (data.property) meta.setAttribute("property", data.property);
    if (data.httpEquiv) meta.setAttribute("http-equiv", data.httpEquiv);

    meta.setAttribute("content", data.content);
    document.head.appendChild(meta);
  });

})();

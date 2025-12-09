(function () {

    // 1) Extract path to identify discipline, chapter, topic
    const path = window.location.pathname.split("/").filter(Boolean);
    const fileName = path[path.length - 1].replace(".html", "");

    // Default fallback values
    let pageTitle = "Quizzone | Learn, Practice & Master Knowledge";
    let pageDesc = "Quizzone is a global platform featuring MCQ quizzes, blogs, CBT tests, coding challenges and subject-wise analytics.";
    let pageKeywords = "Quizzone, Quiz Platform, MCQ, GK, Coding, AI, ML, Science, Maths, Learning Zone";
    let pageType = "General Page";

    // 2) Auto-detect based on folder structure
    let discipline = path.includes("Disciplines") ? path[path.indexOf("Disciplines")+1] : null;
    let category = path.includes("Blogs") ? "Blog" :
                   path.includes("Quizes") ? "Quiz" :
                   path.includes("Competency") ? "Competency Test" : null;

    let chapter = path.find(p => p.toLowerCase().includes("chapter")) || null;
    let topic = fileName.toLowerCase().includes("topic") ? fileName : null;

    // 3) Build dynamic titles
    if(discipline && category && chapter && topic){
        pageTitle = `Quizzone | ${discipline} → ${chapter} → ${topic}`;
        pageDesc  = `Study ${discipline} | ${chapter} | ${topic}. Learn deeply through structured blogs and smart quizzes with score analytics.`;
        pageKeywords += `, ${discipline}, ${chapter}, ${topic}`;
        pageType = `${category} Page`;
    }
    else if(discipline && category && chapter){
        pageTitle = `Quizzone | ${discipline} | ${chapter}`;
        pageDesc  = `${discipline} ${chapter}: Explore topics, quizzes and detailed explanations.`;
        pageKeywords += `, ${discipline}, ${chapter}`;
        pageType = `${category} Chapter Page`;
    }
    else if(discipline && category){
        pageTitle = `Quizzone | ${discipline} ${category}`;
        pageDesc  = `${discipline} ${category}: Learn, practice and test your understanding.`;
        pageKeywords += `, ${discipline}, ${category}`;
        pageType = `${category} Overview Page`;
    }
    else if(discipline){
        pageTitle = `Quizzone | ${discipline}`;
        pageDesc  = `Explore ${discipline}. Learn topics, attempt quizzes and track progress.`;
        pageKeywords += `, ${discipline}`;
        pageType = `${discipline} Index Page`;
    }

    // 4) Inject into <head>
    const head = document.head;

    const metaTags = [
        { name:"title", content: pageTitle },
        { name:"description", content: pageDesc },
        { name:"keywords", content: pageKeywords },
        { name:"author", content:"Quizzone Team" },
        { name:"license", content:"MIT LICENSE" },
        { name:"page-type", content: pageType },

        // Open Graph
        { property:"og:title", content: pageTitle },
        { property:"og:description", content: pageDesc },
        { property:"og:type", content:"website" },

        // Twitter
        { name:"twitter:card", content:"summary_large_image" },
        { name:"twitter:title", content: pageTitle },
        { name:"twitter:description", content: pageDesc }
    ];

    metaTags.forEach(tag => {
        const m = document.createElement("meta");
        Object.entries(tag).forEach(([k,v]) => m.setAttribute(k,v));
        head.appendChild(m);
    });

    // Set document title
    document.title = pageTitle;

})();
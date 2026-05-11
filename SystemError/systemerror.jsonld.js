/* =========================================================
   QUIZZONE SYSTEM ERROR JSONLD
   File : systemerror.jsonld.js
   ========================================================= */


/* =========================================================
   JSON-LD RUNTIME ENGINE
========================================================= */

(function(){

    "use strict";

    injectOrganizationSchema();

    injectWebPageSchema();

    injectWebSiteSchema();

    injectBreadcrumbSchema();

    injectSoftwareSchema();

    injectTechArticleSchema();

})();


/* =========================================================
   COMMON HELPERS
========================================================= */

function appendJSONLD(schemaObject){

    const script =
        document.createElement("script");

    script.type = "application/ld+json";

    script.text =
        JSON.stringify(schemaObject,null,2);

    document.head.appendChild(script);

}


/* =========================================================
   RUNTIME VARIABLES
========================================================= */

const QZ_SCHEMA_RUNTIME = {

    url : location.href,

    path : location.pathname,

    title : document.title,

    description :
        document.querySelector(
            'meta[name="description"]'
        )?.content ||

        "Quizzone Recovery System",

    image :
        "https://akshat-881236.github.io/Quizzone/icons/QuizzoneLogo.png",

    date :
        new Date().toISOString(),

    organization :
        "Quizzone",

    creator :
        "Akshat Prasad"

};


/* =========================================================
   ORGANIZATION SCHEMA
========================================================= */

function injectOrganizationSchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "Organization",

        "name" : "Quizzone",

        "url" :
            "https://akshat-881236.github.io/Quizzone/",

        "logo" :
            "https://akshat-881236.github.io/Quizzone/icons/QuizzoneLogo.png",

        "founder" : {

            "@type" : "Person",

            "name" : "Akshat Prasad"

        },

        "sameAs" : [

            "https://github.com/Akshat-881236",

            "https://akshat-881236.github.io/AkshatNetworkHub/"

        ],

        "description" :
            "Quizzone is an intelligent educational and assessment ecosystem powered by Akshat Network Hub."

    };

    appendJSONLD(schema);

}


/* =========================================================
   WEBPAGE SCHEMA
========================================================= */

function injectWebPageSchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "WebPage",

        "name" :
            QZ_SCHEMA_RUNTIME.title,

        "url" :
            QZ_SCHEMA_RUNTIME.url,

        "description" :
            QZ_SCHEMA_RUNTIME.description,

        "isPartOf" : {

            "@type" : "WebSite",

            "name" : "Quizzone",

            "url" :
                "https://akshat-881236.github.io/Quizzone/"

        },

        "primaryImageOfPage" : {

            "@type" : "ImageObject",

            "url" :
                QZ_SCHEMA_RUNTIME.image

        },

        "datePublished" :
            QZ_SCHEMA_RUNTIME.date,

        "dateModified" :
            QZ_SCHEMA_RUNTIME.date,

        "inLanguage" :
            "en-IN"

    };

    appendJSONLD(schema);

}


/* =========================================================
   WEBSITE SCHEMA
========================================================= */

function injectWebSiteSchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "WebSite",

        "name" : "Quizzone",

        "url" :
            "https://akshat-881236.github.io/Quizzone/",

        "description" :
            "Advanced quiz and discipline management ecosystem.",

        "publisher" : {

            "@type" : "Organization",

            "name" : "Quizzone"

        },

        "potentialAction" : {

            "@type" : "SearchAction",

            "target" :
                "https://akshat-881236.github.io/Quizzone/?search={search_term_string}",

            "query-input" :
                "required name=search_term_string"

        }

    };

    appendJSONLD(schema);

}


/* =========================================================
   BREADCRUMB SCHEMA
========================================================= */

function injectBreadcrumbSchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "BreadcrumbList",

        "itemListElement" : [

            {

                "@type" : "ListItem",

                "position" : 1,

                "name" : "Home",

                "item" :
                    "https://akshat-881236.github.io/Quizzone/"

            },

            {

                "@type" : "ListItem",

                "position" : 2,

                "name" : "Recovery System",

                "item" :
                    QZ_SCHEMA_RUNTIME.url

            }

        ]

    };

    appendJSONLD(schema);

}


/* =========================================================
   SOFTWARE APPLICATION SCHEMA
========================================================= */

function injectSoftwareSchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "SoftwareApplication",

        "name" :
            "Quizzone Recovery Runtime",

        "applicationCategory" :
            "EducationalApplication",

        "operatingSystem" :
            "Web Browser",

        "creator" : {

            "@type" : "Person",

            "name" :
                "Akshat Prasad"

        },

        "offers" : {

            "@type" : "Offer",

            "price" : "0",

            "priceCurrency" : "INR"

        },

        "softwareVersion" :
            "1.0.0",

        "url" :
            "https://akshat-881236.github.io/Quizzone/",

        "description" :
            "Advanced runtime recovery and navigation engine for Quizzone."

    };

    appendJSONLD(schema);

}


/* =========================================================
   TECH ARTICLE SCHEMA
========================================================= */

function injectTechArticleSchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "TechArticle",

        "headline" :
            document.title,

        "description" :
            QZ_SCHEMA_RUNTIME.description,

        "author" : {

            "@type" : "Person",

            "name" :
                "Akshat Prasad"

        },

        "publisher" : {

            "@type" : "Organization",

            "name" :
                "Quizzone"

        },

        "datePublished" :
            QZ_SCHEMA_RUNTIME.date,

        "dateModified" :
            QZ_SCHEMA_RUNTIME.date,

        "mainEntityOfPage" :
            QZ_SCHEMA_RUNTIME.url,

        "image" :
            QZ_SCHEMA_RUNTIME.image

    };

    appendJSONLD(schema);

}


/* =========================================================
   ERROR PAGE SPECIALIZED SCHEMA
========================================================= */

(function injectErrorSchema(){

    const errorCode =
        document.querySelector(
            'meta[name="error-code"]'
        )?.content ||

        "QZ-404";

    const errorTitle =
        document.querySelector(
            'meta[name="error-title"]'
        )?.content ||

        "Page Not Found";

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "WebPage",

        "specialty" :
            "Error Recovery",

        "name" :
            errorTitle,

        "identifier" :
            errorCode,

        "description" :
            "Advanced intelligent recovery system for Quizzone routes.",

        "url" :
            location.href

    };

    appendJSONLD(schema);

})();


/* =========================================================
   FAQ SCHEMA
========================================================= */

(function injectFAQSchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "FAQPage",

        "mainEntity" : [

            {

                "@type" : "Question",

                "name" :
                    "Why am I seeing this page?",

                "acceptedAnswer" : {

                    "@type" : "Answer",

                    "text" :
                        "The requested route does not exist or is unavailable."

                }

            },

            {

                "@type" : "Question",

                "name" :
                    "Will I be redirected automatically?",

                "acceptedAnswer" : {

                    "@type" : "Answer",

                    "text" :
                        "Yes. Quizzone Recovery Runtime automatically redirects users."

                }

            },

            {

                "@type" : "Question",

                "name" :
                    "Can offline mode trigger this page?",

                "acceptedAnswer" : {

                    "@type" : "Answer",

                    "text" :
                        "Yes. Offline network conditions may activate recovery mode."

                }

            }

        ]

    };

    appendJSONLD(schema);

})();


/* =========================================================
   ACCESSIBILITY SCHEMA
========================================================= */

(function injectAccessibilitySchema(){

    const schema = {

        "@context" : "https://schema.org",

        "@type" : "CreativeWork",

        "accessMode" : [

            "textual",

            "visual"

        ],

        "accessModeSufficient" : [

            "textual",

            "visual"

        ],

        "accessibilityFeature" : [

            "highContrastDisplay",

            "responsiveDesign",

            "largePrint",

            "readingOrder"

        ],

        "accessibilitySummary" :
            "Quizzone Recovery Runtime supports responsive accessibility and adaptive rendering."

    };

    appendJSONLD(schema);

})();


/* =========================================================
   CONSOLE INFO
========================================================= */

console.log(

    "%cJSON-LD Runtime Injection Complete",

    "color:#00ffb3;font-weight:bold;font-size:14px;"

);
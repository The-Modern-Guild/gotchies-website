(function() {
    // Get the current URL
    const currentURL = window.location.href;

    // Define your QA and Production file URLs from JSDelivr
    const cdnFiles = {
        "qa": "https://cdn.jsdelivr.net/gh/The-Modern-Guild/gotchies-website@qa/script.js",
        "prod": "https://cdn.jsdelivr.net/gh/The-Modern-Guild/gotchies-website@main/script.js"
    };

    // Determine environment based on URL pattern
    let scriptSrc;
    if (currentURL.includes("gotchies.webflow.io")) {
        scriptSrc = cdnFiles.qa;  // Load QA version
    } else {
        scriptSrc = cdnFiles.prod; // Load Production version (default)
    }

    // Dynamically create script tag
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    script.async = true;
    document.head.appendChild(script);

    console.log("Loaded script from:", scriptSrc);
})();
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ DOMContentLoaded event fired!");

    // Example: Hide all `.article-div` elements
    document.querySelectorAll('.article-div').forEach((element) => {
        element.style.display = 'none';
    });

    // Get the hash from the URL and show the relevant section
    const hashValue = window.location.hash.substring(1);
    if (hashValue && document.getElementById(hashValue)) {
        document.getElementById(hashValue).style.display = 'flex';
        console.log("✅ Showing section:", hashValue);
    } else {
        console.warn("⚠️ No matching section found for hash:", hashValue);
    }

    // Listen for hash changes
    window.addEventListener("hashchange", function() {
        console.log("🔄 Hash changed:", window.location.hash);

        document.querySelectorAll('.article-div').forEach((element) => {
            element.style.display = 'none';
        });

        const newHash = window.location.hash.substring(1);
        if (newHash && document.getElementById(newHash)) {
            document.getElementById(newHash).style.display = 'flex';
        }
    });
});

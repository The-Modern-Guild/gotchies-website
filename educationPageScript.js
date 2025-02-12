function handleHashChange() {
    const hashValue = window.location.hash.substring(1); // Removes "#"
    console.log("Hash changed:", hashValue);

    // Hide all `.article-div` elements
    document.querySelectorAll('.article-div').forEach((element) => {
        element.style.display = 'none';
    });

    // Ensure the hash is not empty and the target element exists
    if (hashValue && document.getElementById(hashValue)) {
        document.getElementById(hashValue).style.display = 'flex';
    }
}

// Ensure script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    handleHashChange(); // Run on page load
    window.addEventListener("hashchange", handleHashChange); // Run when hash changes
});

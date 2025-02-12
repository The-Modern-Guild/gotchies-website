  function handleHashChange() {
      const hashValue = window.location.hash.substring(1); // Removes "#"
      console.log("Hash changed:", hashValue);

      document.querySelectorAll('.article-div').forEach((element) => {
        element.style.display = 'none';
      })

      document.getElementById(hashValue).style.display = 'flex';
  }

  // Run when the page loads
  document.addEventListener("DOMContentLoaded", handleHashChange);

  // Listen for hash changes
  window.addEventListener("hashchange", handleHashChange);
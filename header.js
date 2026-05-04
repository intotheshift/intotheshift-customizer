document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;

  const currentPage = window.location.pathname.split("/").pop() || "home.html";

  function active(page) {
    return currentPage === page ? "active" : "";
  }

  header.innerHTML = `
    <div class="topbar">
      <div class="logo" onclick="window.location.href='home.html'">
        <img src="into-the-shift-logo.png" alt="Into The Shift" class="logo-img">
      </div>

      <nav class="main-nav">
        <a class="${active("home.html")}" href="home.html">Accueil</a>
        <a class="${active("index.html")}" href="index.html">Bibliothèque</a>
        <a class="${active("questions.html")}" href="questions.html">Création</a>
        <a class="${active("parametrage.html")}" href="parametrage.html">Paramétrage</a>
        <a class="${active("campagne.html")}" href="campagne.html">Campagne</a>
        <a class="${active("validation.html")}" href="validation.html">Transmission</a>
      </nav>

      <div class="tb-sp"></div>
    </div>
  `;
});

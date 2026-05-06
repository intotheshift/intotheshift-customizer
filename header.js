document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;

  const currentPage = window.location.pathname.split("/").pop() || "home.html";

  function active(page) {
    return currentPage === page ? "active" : "";
  }

  function isLoggedIn() {
    return localStorage.getItem("its_logged_in") === "true";
  }

  function logout() {
    localStorage.removeItem("its_logged_in");
    localStorage.removeItem("its_user_firstname");
    window.location.href = "home.html";
  }

  const loggedIn = isLoggedIn();
  const firstName = localStorage.getItem("its_user_firstname") || "Mon espace";

  const visitorNav = `
    <a class="${active("home.html")}" href="home.html">Accueil</a>
    <a class="${active("index.html")}" href="index.html">Bibliothèque</a>
    <a class="${active("login.html")}" href="login.html">Se connecter</a>
    <a href="register.html" class="btn-register">Première connexion</a>
  `;

  const userNav = `
    <a class="${active("dashboard.html")}" href="dashboard.html">Mon Dashboard</a>
    <a class="${active("index.html")}" href="index.html">Bibliothèque</a>
    <a class="${active("questions.html")}" href="questions.html">Création</a>
    <a class="${active("parametrage.html")}" href="parametrage.html">Paramétrage</a>
    <a class="${active("campagne.html")}" href="campagne.html">Campagne</a>
    <a class="${active("validation.html")}" href="validation.html">Transmission</a>
  `;

  header.innerHTML = `
    <div class="topbar">
      <div class="logo" onclick="window.location.href='${loggedIn ? "dashboard.html" : "home.html"}'">
        <img src="into-the-shift-logo.png" alt="Into The Shift" class="logo-img">
      </div>

      <nav class="main-nav">
        ${loggedIn ? userNav : visitorNav}
      </nav>

      <div class="tb-sp"></div>

      ${
        loggedIn
          ? `
            <button class="logout-btn" id="logout-btn" type="button">
              Se déconnecter
            </button>
          `
          : ""
      }
    </div>
  `;

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;

  const currentPage = window.location.pathname.split("/").pop() || "home.html";

  function active(page) {
    return currentPage === page ? "active" : "";
  }

  function getToken() {
    return (
      localStorage.getItem("its_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("auth_token") ||
      ""
    );
  }

  function getRoleFromToken() {
    const token = getToken();
    if (!token || !token.includes(".")) return null;

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      return payload.role || null;
    } catch (e) {
      return null;
    }
  }

  function getUserRole() {
    const storedRole = localStorage.getItem("its_user_role");
    if (storedRole) return storedRole;

    const tokenRole = getRoleFromToken();
    if (tokenRole) {
      localStorage.setItem("its_user_role", tokenRole);
      return tokenRole;
    }

    return null;
  }

  function isLoggedIn() {
    return localStorage.getItem("its_logged_in") === "true" || !!getToken();
  }

  function isAdmin() {
    return getUserRole() === "admin";
  }

  function logout() {
    localStorage.removeItem("its_logged_in");
    localStorage.removeItem("its_user_firstname");
    localStorage.removeItem("its_user_role");
    localStorage.removeItem("its_user");
    localStorage.removeItem("its_token");
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");
    window.location.href = "home.html";
  }

  window.itsLogout = logout;

  const adminLink = isAdmin()
    ? `<a class="nav-link ${active("admin.html")}" href="admin.html">Admin</a>`
    : "";

  const authLinks = isLoggedIn()
    ? `
      ${adminLink}
      <a class="nav-link ${active("dashboard.html")}" href="dashboard.html">Mon espace</a>
      <button class="nav-link nav-btn" type="button" onclick="window.itsLogout()">Déconnexion</button>
    `
    : `
      <a class="nav-link ${active("login.html")}" href="login.html">Se connecter</a>
      <a class="btn-register ${active("register.html")}" href="register.html">Première connexion</a>
    `;

  header.innerHTML = `
    <div class="topbar">
      <a class="logo" href="index.html" aria-label="Into The Shift">
        <img src="into-the-shift-logo.png" alt="Into The Shift" class="logo-img">
      </a>

      <nav class="main-nav" aria-label="Navigation principale">
        <a class="nav-link ${active("index.html")}" href="index.html">Bibliothèque</a>
        <a class="nav-link ${active("questions.html")}" href="questions.html">Créer</a>
        <a class="nav-link ${active("parametrage.html")}" href="parametrage.html">Paramétrer</a>
        <a class="nav-link ${active("campagne.html")}" href="campagne.html">Préparer</a>
        <a class="nav-link ${active("validation.html")}" href="validation.html">Transmettre</a>
        ${authLinks}
      </nav>
    </div>
  `;
});

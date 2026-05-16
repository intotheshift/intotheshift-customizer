document.addEventListener("DOMContentLoaded", function () {

  const header = document.getElementById("header");
  if (!header) return;

  const currentPage =
    window.location.pathname.split("/").pop() || "home.html";

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

  function decodeToken() {
    const token = getToken();

    if (!token || !token.includes(".")) return null;

    try {
      return JSON.parse(
        atob(
          token
            .split(".")[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );
    } catch (e) {
      return null;
    }
  }

  function getRoleFromUserObject() {
    try {
      const rawUser = localStorage.getItem("its_user");

      if (!rawUser) return null;

      const user = JSON.parse(rawUser);

      return user.role || user.user_role || null;

    } catch (e) {
      return null;
    }
  }

  function getUserRole() {

    const storedRole = localStorage.getItem("its_user_role");

    if (storedRole) return storedRole;

    const objectRole = getRoleFromUserObject();

    if (objectRole) {
      localStorage.setItem("its_user_role", objectRole);
      return objectRole;
    }

    const tokenData = decodeToken();

    if (tokenData?.role) {
      localStorage.setItem("its_user_role", tokenData.role);
      return tokenData.role;
    }

    return "client";
  }

  function isLoggedIn() {
    return (
      localStorage.getItem("its_logged_in") === "true" ||
      !!getToken()
    );
  }

  function isAdmin() {
    return getUserRole() === "admin";
  }

  function isPartner() {
    return getUserRole() === "partner";
  }

  function isClient() {
    return getUserRole() === "client";
  }

  function logout() {

    [
      "its_logged_in",
      "its_user_firstname",
      "its_user_role",
      "its_user",
      "its_token",
      "token",
      "auth_token",
      "its_selected_partner_client_id"
    ].forEach(key => localStorage.removeItem(key));

    window.location.href = "home.html";
  }

  window.itsLogout = logout;

  const logged = isLoggedIn();
  const admin = isAdmin();
  const partner = isPartner();
  const client = isClient();

  const hiddenPages = [
    "partner-folder.html",
    "client-folder.html"
  ];

  if (hiddenPages.includes(currentPage) && !admin && !partner) {
    window.location.href = "dashboard.html";
    return;
  }

  const accueilLink = !logged
    ? `<a class="nav-link ${active("home.html")}" href="home.html">Accueil</a>`
    : "";

  const dashboardLink = logged
    ? `<a class="nav-link ${active("dashboard.html")}" href="dashboard.html">Mon dashboard</a>`
    : "";

  const mesAdLink = logged && !admin && !partner
    ? `<a class="nav-link ${active("mes-autodiagnostics.html")}" href="mes-autodiagnostics.html">Mes AD</a>`
    : "";

  const adminLink = admin
    ? `<a class="nav-link ${active("admin.html")}" href="admin.html">Admin</a>`
    : "";

  const partnerLink =
    (partner || admin)
      ? `<a class="nav-link ${active("partner.html")}" href="partner.html">${admin ? "Vue partner" : "Mes clients"}</a>`
      : "";

  const accountLink = logged
    ? `<a class="nav-link ${active("account.html")}" href="account.html">Mon compte</a>`
    : "";

  const libraryLink = `
    <a class="nav-link ${active("index.html")}" href="index.html">
      Bibliothèque
    </a>
  `;

  const creationLinks = logged
    ? `
      <a class="nav-link ${active("questions.html")}" href="questions.html">Créer</a>
      <a class="nav-link ${active("parametrage.html")}" href="parametrage.html">Paramétrer</a>
      <a class="nav-link ${active("campagne.html")}" href="campagne.html">Préparer</a>
      <a class="nav-link ${active("validation.html")}" href="validation.html">Transmettre</a>
    `
    : "";

  const authLinks = logged
    ? `
      <a class="nav-link logout-link" href="#"
         onclick="event.preventDefault(); window.itsLogout();">
         Déconnexion
      </a>
    `
    : `
      <a class="nav-link ${active("login.html")}" href="login.html">
        Connexion
      </a>

      <a class="btn-register ${active("register.html")}" href="register.html">
        Première connexion
      </a>
    `;

  let homeTarget = "home.html";

  if (logged) {

    if (admin) {
      homeTarget = "admin.html";
    } else if (partner) {
      homeTarget = "partner.html";
    } else {
      homeTarget = "dashboard.html";
    }
  }

  header.innerHTML = `
    <div class="topbar compact-topbar">

      <a class="logo" href="${homeTarget}" aria-label="Into The Shift">
        <img
          src="into-the-shift-logo.png"
          alt="Into The Shift"
          class="logo-img"
        >
      </a>

      <nav class="main-nav compact-nav" aria-label="Navigation principale">

        ${accueilLink}

        ${dashboardLink}

        ${mesAdLink}

        ${adminLink}

        ${partnerLink}

        ${libraryLink}

        ${creationLinks}

        ${accountLink}

        ${authLinks}

      </nav>

    </div>
  `;
});

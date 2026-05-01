document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;

  header.innerHTML = `
    <div class="topbar">
      <div class="logo" onclick="window.location.href='index-bibliotheque.html'">
        <img src="into-the-shift-logo.png" alt="Into The Shift" class="logo-img">
      </div>

      <div class="tb-spacer"></div>

      <div class="account-pill">
        <div class="avatar">SR</div>
        <span>Sonora RH</span>
      </div>
    </div>
  `;
});

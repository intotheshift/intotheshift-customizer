document.addEventListener("DOMContentLoaded", function () {
  const faq = document.getElementById("faq");
  if (!faq) return;

  faq.innerHTML = `
<section id="mode-emploi" class="faq-section">
  <div class="faq-wrap">
    <div class="faq-header">
      <span class="faq-kicker">Questions fréquentes</span>
      <h2>Comment fonctionne le Shift Studio de Into The Shift ?</h2>
      <p>
        Créez un autodiagnostic — simulateur comportemental basé sur des situations concrètes —
        à partir d’une base existante ou entièrement de zéro.
      </p>
    </div>

    <div class="faq-list">
      <details class="faq-item" open>
        <summary>Qu’est-ce qu’un autodiagnostic Into The Shift ?</summary>
        <p>C’est un simulateur comportemental composé de situations concrètes. Il permet d’explorer les réactions, pratiques et perceptions des répondants sur un sujet donné. Il permet à chacun de prendre conscience de ses pratiques et de pouvoir ainsi bouger ses lignes !</p>
      </details>

      <details class="faq-item">
        <summary>Puis-je partir d’une base existante ?</summary>
        <p>Oui. Vous pouvez choisir une base de travail prête à adapter, puis modifier les situations, les réponses, les thématiques et les formulations selon votre contexte. Les bases sont construites par l'IA dont on connaît tous les limites. Cela permet d'avoir une bonne base pour commencer, à vous d'y ajouter votre expertise et la subtilité requise par l'exercice de l'autodiagnostic !</p>
      </details>

      <details class="faq-item">
        <summary>Puis-je créer mon autodiagnostic de zéro ?</summary>
        <p>Oui. Vous pouvez construire votre autodiagnostic entièrement, en ajoutant vos propres thématiques, questions, situations et profils de résultats.</p>
      </details>

      <details class="faq-item">
        <summary>Que se passe-t-il après validation ?</summary>
        <p>Une fois votre configuration validée, nos équipes préparent la mise en ligne définitive de votre autodiagnostic et vous adressent le lien de votre autodiagnostic personnalisé.</p>
      </details>

      <details class="faq-item">
        <summary>Quand recevrai-je mon lien de passation ?</summary>
        <p>Vous recevez votre lien définitif de passation sous quelques jours, au maximum sous <strong>4 jours ouvrés</strong> après validation.</p>
      </details>

      <details class="faq-item">
        <summary>Comment pourrai-je diffuser l’autodiagnostic ?</summary>
        <p>Vous pourrez partager le lien par email, intranet, messagerie interne ou QR code. Le QR code pourra être utilisé sur vos supports de communication. Into The Shift peut également vous fournir des visuels : affiche, banners, vidéo en motion design, etc.</p>
      </details>

      <details class="faq-item">
        <summary>Les réponses sont-elles anonymes ?</summary>
        <p>Oui. Les réponses sont exploitées de manière agrégée afin d’identifier des tendances collectives, sans pouvoir retrouver les réponses individuelles des répondants, si le nombre de données socio-démo demandées au départ ne permet pas de recoupement. Il n'y a aucun cookie, aucun tracking d'IP, ni login ou mot de passe pour passer l'autodiagnostic. La passation est conforme au RGPD.</p>
      </details>

      <details class="faq-item">
        <summary>Into The Shift est-il responsable des contenus créés par des experts ?</summary>
        <p>Certains contenus peuvent être conçus par des experts partenaires. Into The Shift fournit un cadre de création et de diffusion, mais ne saurait être tenu responsable de l’usage, de l’interprétation ou de l’adaptation des contenus par des tiers.</p>
      </details>
    </div>
  </div>
</section>
  `;
});

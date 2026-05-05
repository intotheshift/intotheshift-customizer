(function () {

  // ─────────────────────────────────────────────────────────────────────────
  //  BADGES
  // ─────────────────────────────────────────────────────────────────────────

  const BADGES = {
  IA:      "Base assistée par IA",
  REVIEW:  "Relecture obligatoire",
  AIDE:    "Aide à la rédaction",
  TBF:     "Conçu par The Big Factory"
};

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — réponses génériques
  // ─────────────────────────────────────────────────────────────────────────

  function answerSets(domain, seed) {
    const sets = {
      securite: [
        [
          { text: "Je laisse faire, car l'équipe connaît sûrement la situation.", score: 0 },
          { text: "Je fais une remarque rapide si le risque me semble important.", score: 1 },
          { text: "Je signale le point avec des faits précis et sans accuser.", score: 2 },
          { text: "Je contribue à clarifier la règle pour éviter que cela se reproduise.", score: 2 }
        ],
        [
          { text: "Je privilégie l'avancement, la vérification pourra attendre.", score: 0 },
          { text: "Je vérifie seulement les points qui me semblent les plus critiques.", score: 1 },
          { text: "Je maintiens l'étape de sécurité même si cela prend plus de temps.", score: 2 }
        ],
        [
          { text: "Je considère que chacun est responsable de ses propres gestes.", score: 0 },
          { text: "J'alerte discrètement si je suis directement concerné·e.", score: 1 },
          { text: "J'interviens avec tact pour éviter qu'un risque collectif s'installe.", score: 2 }
        ]
      ],
      qvt: [
        [
          { text: "Je laisse la personne gérer, chacun a sa manière de travailler.", score: 0 },
          { text: "Je prends des nouvelles de manière informelle si l'occasion se présente.", score: 1 },
          { text: "Je propose un échange factuel sur la charge ou les priorités.", score: 2 }
        ],
        [
          { text: "Je m'adapte, même si cela désorganise mon travail.", score: 0 },
          { text: "Je signale que c'est compliqué, sans forcément demander d'arbitrage.", score: 1 },
          { text: "Je clarifie les priorités et les délais avant de m'engager.", score: 2 }
        ],
        [
          { text: "J'évite d'intervenir pour ne pas créer de tension.", score: 0 },
          { text: "Je temporise et j'attends de voir si la situation se calme.", score: 1 },
          { text: "Je contribue à remettre les faits et les besoins au centre de l'échange.", score: 2 },
          { text: "Je mobilise un relais si la situation dépasse le cadre habituel.", score: 2 }
        ]
      ],
      management: [
        [
          { text: "J'avance avec les informations disponibles, quitte à ajuster plus tard.", score: 0 },
          { text: "Je demande quelques précisions mais sans formaliser le cadre.", score: 1 },
          { text: "Je clarifie les attendus, les rôles et les prochaines étapes.", score: 2 }
        ],
        [
          { text: "Je donne mon avis directement, même si la personne peut mal le prendre.", score: 0 },
          { text: "Je formule un retour général pour éviter d'être trop frontal·e.", score: 1 },
          { text: "Je m'appuie sur des faits précis et une piste d'amélioration concrète.", score: 2 }
        ],
        [
          { text: "Je considère que les personnes doivent s'adapter d'elles-mêmes.", score: 0 },
          { text: "J'accompagne ponctuellement quand une difficulté apparaît.", score: 1 },
          { text: "Je crée des repères réguliers pour soutenir l'autonomie et l'engagement.", score: 2 }
        ]
      ],
      environnement: [
        [
          { text: "Je fais comme d'habitude, l'impact est probablement limité.", score: 0 },
          { text: "Je choisis l'option la plus simple si elle reste raisonnable.", score: 1 },
          { text: "Je questionne l'impact réel et propose une option plus sobre.", score: 2 }
        ],
        [
          { text: "Je préfère éviter le sujet pour ne pas passer pour moralisateur·rice.", score: 0 },
          { text: "Je suggère une alternative si elle ne complique pas trop l'organisation.", score: 1 },
          { text: "Je propose un ajustement concret, réaliste et mesurable.", score: 2 }
        ],
        [
          { text: "Je traite l'urgence sans intégrer le critère environnemental.", score: 0 },
          { text: "Je cherche un compromis mais sans remettre en cause la demande.", score: 1 },
          { text: "J'intègre l'impact environnemental dans l'arbitrage dès le départ.", score: 2 }
        ]
      ],
      ethique: [
        [
          { text: "Je règle la situation rapidement, puisqu'elle paraît mineure.", score: 0 },
          { text: "Je demande un avis informel à une personne de confiance.", score: 1 },
          { text: "Je vérifie le cadre applicable avant de décider.", score: 2 },
          { text: "Je trace ou signale le point si le risque est réel.", score: 2 }
        ],
        [
          { text: "Je garde l'information pour moi afin d'éviter de compliquer la relation.", score: 0 },
          { text: "J'attends de voir si la situation se confirme.", score: 1 },
          { text: "Je documente les faits et j'utilise le bon canal de conseil ou d'alerte.", score: 2 }
        ],
        [
          { text: "Je me fie à mon intuition, car les règles ne couvrent pas tout.", score: 0 },
          { text: "Je cherche une solution prudente sans forcément formaliser.", score: 1 },
          { text: "Je clarifie le risque, les personnes concernées et la règle à appliquer.", score: 2 }
        ]
      ],
      sec_nucl: [
        [
          { text: "Je fais confiance au retour de l'équipe et poursuis l'opération.", score: 0 },
          { text: "Je note le point et le signale en fin d'opération.", score: 1 },
          { text: "Je stoppe, signale formellement et attends une validation avant de reprendre.", score: 2 }
        ],
        [
          { text: "Je m'appuie sur l'expérience collective — la procédure peut être adaptée.", score: 0 },
          { text: "J'interpelle le responsable sans bloquer l'opération.", score: 1 },
          { text: "Je remonte le point formellement et n'avance pas sans validation claire.", score: 2 }
        ],
        [
          { text: "Je laisse passer : l'écart est mineur et n'a pas eu de conséquence.", score: 0 },
          { text: "J'en parle informellement à un collègue pour avoir son avis.", score: 1 },
          { text: "Je déclenche le processus de signalement prévu, même pour un écart apparemment mineur.", score: 2 },
          { text: "Je documente et contribue à l'analyse de retour d'expérience.", score: 2 }
        ]
      ],
      sec_btp: [
        [
          { text: "Je continue : la pression du planning ne laisse pas d'autre choix.", score: 0 },
          { text: "Je signale verbalement mais ne bloque pas les travaux.", score: 1 },
          { text: "Je stoppe l'activité concernée jusqu'à correction de la situation.", score: 2 }
        ],
        [
          { text: "Je laisse l'encadrement gérer : ce n'est pas directement ma zone.", score: 0 },
          { text: "J'alerte verbalement la personne concernée.", score: 1 },
          { text: "Je signale formellement et m'assure que la correction est effectuée.", score: 2 },
          { text: "Je contribue à trouver une solution immédiate et documente le problème.", score: 2 }
        ],
        [
          { text: "Je finalise la tâche en cours avant d'agir.", score: 0 },
          { text: "Je vérifie l'urgence réelle avant d'intervenir.", score: 1 },
          { text: "Je réagis immédiatement pour éviter toute aggravation.", score: 2 }
        ]
      ]
    };
    const selected = sets[domain] || sets.management;
    return selected[seed % selected.length];
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — profils génériques
  //  Seuils : 0 → 0.99 → 1.59 → 2 (bornes jointes)
  // ─────────────────────────────────────────────────────────────────────────

  function makeProfiles(chapterTitle) {
    return [
      {
        level: "Repères à consolider",
        min: 0, max: 0.99,
        title: "Repères à consolider — " + chapterTitle,
        summary: "Les réflexes existent, mais restent encore irréguliers.",
        description: "Sur cette dimension, les repères ne sont pas encore assez stables pour guider les décisions dans les situations moins évidentes. L'enjeu est de mieux identifier les situations sensibles et de s'appuyer davantage sur le cadre, les faits ou les bons relais."
      },
      {
        level: "Pratiques en construction",
        min: 0.99, max: 1.59,
        title: "Pratiques en construction — " + chapterTitle,
        summary: "Les pratiques sont présentes, mais peuvent se fragiliser dans les zones grises.",
        description: "Sur cette dimension, les bases sont présentes. L'enjeu est maintenant de gagner en constance, de mieux formaliser les arbitrages et de ne pas rester seul·e face aux situations ambiguës."
      },
      {
        level: "Réflexes installés",
        min: 1.59, max: 2,
        title: "Réflexes installés — " + chapterTitle,
        summary: "Les réflexes sont structurés et mobilisables dans le quotidien.",
        description: "Sur cette dimension, les comportements sont installés. Ils peuvent devenir un point d'appui pour le collectif, notamment pour clarifier les règles, sécuriser les pratiques et encourager des décisions plus responsables."
      }
    ];
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  V2 — VARIATION PAR AUTODIAG
  //  Calcule un offset déterministe à partir du préfixe (ID de l'AD)
  //  pour que chaque autodiag pioche dans une zone différente de la bank
  // ─────────────────────────────────────────────────────────────────────────

  const VARIANT_OFFSETS = {
    "culture-securite-terrain":    0,
    "presquaccidents-signalement":  5,
    "acces-sites-surete":          10,
    "managers-securite":           15,
    "coactivite-sous-traitance":    20,
    "epi-gestes-securite":          25,
    "securite-manager-arbitrage":   30,
    "securite-nucleaire":            0,
    "securite-chantier-btp":         0,
    "rps-signaux-faibles":          0,
    "charge-priorites":             5,
    "cooperation-climat":          10,
    "manager-qvt-rps":             15,
    "teletravail-hybridation":     20,
    "epuisement-prevention":       30,
    "retour-apres-absence":        35,
    "manager-signaux-rps":         40,
    "changement-reflexes":          0,
    "feedback-managerial":          5,
    "manager-engageant-tbf":       10,
    "pilotage-projet":             15,
    "conduite-changement":         20,
    "arbitrage-priorisation":      25,
    "collaboration-interequipes":  31,
    "responsabilisation-equipe":   40,
    "transformation-digitale":     50,
    "sobriete-quotidien":           0,
    "dechets-ressources":           5,
    "achats-responsables":         10,
    "manager-transition-eco":      15,
    "numerique-responsable":       20,
    "deplacements-sobriete":       25,
    "achats-impact":               30,
    "engagement-rse":              37,
    "manager-rse-equipe":          44,
    "conflits-interets":            0,
    "cadeaux-invitations":          5,
    "alerte-ethique":              10,
    "manager-compliance":          15
  };

  function makeVariantOffset(prefix) {
    return VARIANT_OFFSETS[prefix] || 0;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  V2 — TAGS MÉTIER PAR CHAPITRE
  //  Enrichit chaque question avec des tags spécifiques au domaine et au
  //  chapitre, utiles pour le filtrage, les analytics et les futures IA
  // ─────────────────────────────────────────────────────────────────────────

  function chaptersTags(domain, chapterIndex) {
    var map = {
      securite: [
        ["Risque terrain", "Observation", "Prévention", "EPI", "Détection"],
        ["Gestes sûrs", "Pression opérationnelle", "Réflexes", "Procédure", "EPI"],
        ["Collectif", "Intervention", "Culture sécurité", "Coactivité", "Sous-traitance"],
        ["Signalement", "Alerte", "REX", "Presqu'accident", "Urgence opérationnelle"]
      ],
      sec_nucl: [
        ["Nucléaire", "Questioning attitude", "Rigueur", "Sûreté"],
        ["Nucléaire", "Procédure", "Référentiel", "Gamme opératoire"],
        ["Nucléaire", "Situation imprévue", "Escalade", "Sûreté"],
        ["Nucléaire", "Déclaration", "REX", "Culture de sûreté"]
      ],
      sec_btp: [
        ["BTP", "Chantier", "EPI", "EPC", "Risque terrain"],
        ["BTP", "Coactivité", "Corps de métier", "Coordination chantier"],
        ["BTP", "PPSPS", "Permis de travail", "Habilitation"],
        ["BTP", "Incident chantier", "Urgence", "Signalement"]
      ],
      qvt: [
        ["Signaux faibles", "RPS", "Vigilance", "Isolement", "Prévention"],
        ["Charge de travail", "Priorisation", "Urgences", "Épuisement professionnel", "Droit à la déconnexion"],
        ["Relations", "Coopération", "Tensions", "Climat de travail", "Télétravail"],
        ["Relais RH", "Alerte", "Soutien", "Retour d'absence", "Orientation"]
      ],
      management: [
        ["Cadre", "Clarté", "Rôles", "Changement", "Transformation"],
        ["Incertitude", "Coopération", "Agilité", "Résistance au changement", "Arbitrage"],
        ["Feedback", "Communication", "Retour", "Responsabilisation", "Engagement"],
        ["Pratiques", "Ancrage", "Autonomie", "Collaboration interéquipes", "Transformation digitale"]
      ],
      environnement: [
        ["RSE", "Impact", "Gestes quotidiens", "Empreinte", "Énergie"],
        ["Sobriété", "Arbitrage", "Choix", "Déchets", "Numérique responsable"],
        ["Coopération", "Achats responsables", "Déplacements", "Engagement", "Fournisseurs"],
        ["Durabilité", "Habitudes", "Long terme", "Managers", "Transition"]
      ],
      ethique: [
        ["Zone grise",    "Conformité",        "Risque"],
        ["Conseil",       "Doute",             "Conflit d'intérêts"],
        ["Documentation", "Alerte",            "Protection"],
        ["Culture",       "Règles",            "Vigilance"]
      ]
    };
    var domainTags = map[domain] || map.management;
    return domainTags[chapterIndex % domainTags.length] || [];
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — banques de questions
  // ─────────────────────────────────────────────────────────────────────────

  const questionBanks = {
    securite: [
      "Une intervention prend du retard et l'équipe envisage de raccourcir une étape de vérification. Que faites-vous ?",
      "Vous remarquez qu'un équipement de protection est mal porté dans une zone active. Quelle réaction adoptez-vous ?",
      "Un prestataire externe intervient sans connaître clairement les règles du site. Que faites-vous ?",
      "Un presque-accident vient de se produire mais personne ne semble vouloir le signaler. Que faites-vous ?",
      "Une porte d'accès reste ouverte alors qu'elle devrait être fermée. Comment réagissez-vous ?",
      "Une personne inconnue circule dans une zone où l'accès est habituellement contrôlé. Que faites-vous ?",
      "Un collègue contourne une consigne pour gagner quelques minutes. Quelle est votre réaction ?",
      "Un objet encombre une zone de passage utilisée par plusieurs personnes. Que faites-vous ?",
      "Une alerte est minimisée avec la phrase : ça arrive souvent ici. Comment vous positionnez-vous ?",
      "Un matériel semble défectueux mais reste utilisé pour terminer une tâche. Que faites-vous ?",
      "Vous observez une situation dangereuse mais vous n'êtes pas directement responsable de l'activité. Que faites-vous ?",
      "Une consigne de sécurité vient de changer mais tout le monde n'a pas l'air informé. Quelle réaction adoptez-vous ?",
      "Une urgence opérationnelle pousse l'équipe à travailler dans la précipitation. Que privilégiez-vous ?",
      "Un signalement précédent n'a pas donné lieu à un retour visible. Comment réagissez-vous la fois suivante ?",
      "Vous constatez un écart répété entre la procédure et la pratique réelle. Que faites-vous ?",
      "Une personne nouvelle dans l'équipe hésite à poser une question sur une règle de sécurité. Que faites-vous ?",
      "Une zone est mal rangée après une intervention. Quelle réaction adoptez-vous ?",
      "Un accès badge est prêté pour dépanner quelqu'un. Que faites-vous ?",
      "Un briefing sécurité est écourté car la journée est chargée. Comment réagissez-vous ?",
      "Vous identifiez un risque qui concerne plusieurs équipes. Que faites-vous ?",
      "Deux équipes travaillent simultanément dans la même zone sans avoir coordonné leurs interventions. Que faites-vous ?",
      "Un sous-traitant réalise une tâche sans avoir reçu le plan de prévention. Quelle est votre réaction ?",
      "Un EPI obligatoire est inconfortable et ralentit l'exécution de la tâche. Comment réagissez-vous ?",
      "Un équipement de protection collectif a été déplacé sans raison apparente. Que faites-vous ?",
      "Une zone balisée est franchie par des personnes qui ne participent pas à l'intervention. Que faites-vous ?",
      "Un intervenant externe ne connaît pas les consignes de sécurité du site. Comment réagissez-vous ?",
      "Une tâche nécessite une habilitation spécifique, mais la personne disponible ne l'a pas. Que faites-vous ?",
      "Vous constatez qu'un EPI est endommagé mais encore utilisé. Quelle réaction adoptez-vous ?",
      "Un permis de travail est en cours mais les conditions ont changé depuis sa délivrance. Que faites-vous ?",
      "Une procédure d'urgence est affichée mais peu de personnes semblent la connaître. Comment réagissez-vous ?",
      "Un travailleur isolé n'a pas déclenché sa vérification périodique depuis un moment. Que faites-vous ?",
      "Vous observez de la fatigue visible chez un collègue qui doit réaliser une tâche à risque. Que faites-vous ?",
      "Un mode opératoire n'a pas été actualisé après un changement d'équipement. Quelle réaction adoptez-vous ?",
      "Une situation d'urgence survient mais le responsable sécurité n'est pas joignable. Que faites-vous ?",
      "Une consigne de sécurité semble inadaptée à la réalité du terrain. Comment vous positionnez-vous ?",
      "Un incident implique à la fois votre équipe et un prestataire. Qui doit prendre en charge le signalement ?",
      "Un exercice d'évacuation est programmé pendant une période de forte activité. Comment réagissez-vous ?",
      "Une étiquette de signalisation est illisible ou absente sur un équipement potentiellement dangereux. Que faites-vous ?",
      "Un accès à une zone dangereuse est possible sans habilitation requise en raison d'un défaut de balisage. Que faites-vous ?"
    ],
    sec_nucl: [
      "Vous constatez un écart entre la procédure écrite et la pratique réelle lors d'une opération. Que faites-vous ?",
      "Une déviation technique mineure survient en cours d'opération. L'équipe pense pouvoir la gérer sans escalade. Que faites-vous ?",
      "Vous avez un doute sur l'interprétation d'un référentiel technique mais la pression de délai est forte. Comment réagissez-vous ?",
      "Une gamme d'intervention comporte une étape ambiguë. Votre collègue l'interprète différemment de vous. Que faites-vous ?",
      "Un événement significatif de sûreté semble s'être produit mais aucun dommage n'est visible. Quelle réaction adoptez-vous ?",
      "Le chef de chantier vous demande de commencer une intervention avant que la consignation soit complète. Que faites-vous ?",
      "Vous êtes témoin d'un contournement de procédure qui n'a entraîné aucun incident. Comment vous positionnez-vous ?",
      "Une situation non prévue par les procédures se présente lors d'une opération. Que faites-vous ?",
      "Un collègue minimise l'importance d'un signalement car il pense que ça n'a pas de conséquence réelle. Quelle est votre réaction ?",
      "Vous identifiez un signal faible qui pourrait être précurseur d'un problème plus grave. Que faites-vous ?",
      "La pression de remise en service d'un équipement est forte, mais une question technique reste ouverte. Comment réagissez-vous ?",
      "Un prestataire habituel semble moins rigoureux dans l'application des règles. Que faites-vous ?",
      "Vous constatez qu'une modification temporaire d'installation n'a pas été correctement documentée. Que faites-vous ?",
      "Un retour d'expérience d'un autre site mentionne un incident similaire à une situation rencontrée chez vous. Comment réagissez-vous ?",
      "Vous avez eu un doute en cours d'opération mais avez continué. L'opération s'est bien passée. Que faites-vous a posteriori ?",
      "Un opérateur expérimenté déclare qu'une vérification systématique est inutile dans ce cas précis. Que faites-vous ?",
      "Une nouvelle recrue signale une anomalie que personne d'autre n'avait remarquée. Quelle réaction adoptez-vous ?",
      "Vous êtes fatigué en fin de poste et devez encore réaliser une vérification documentée. Que faites-vous ?",
      "Une situation ambiguë se présente entre une règle formelle et une pratique acceptée de longue date. Comment vous positionnez-vous ?",
      "Un défaut d'information pourrait induire un autre intervenant en erreur sur l'état d'un équipement. Que faites-vous ?"
    ],
    sec_btp: [
      "Vous débutez une journée sur chantier et constatez que le balisage de la veille a été modifié sans information. Que faites-vous ?",
      "Un engin de chantier manœuvre dans une zone piétonne sans signalement préalable. Quelle réaction adoptez-vous ?",
      "Une fouille est ouverte sans étaiement alors que le terrain est instable. Que faites-vous ?",
      "Vous devez travailler en hauteur mais le harnais disponible n'a pas été vérifié récemment. Comment réagissez-vous ?",
      "Deux corps de métier se trouvent simultanément dans la même zone sans coordination préalable. Que faites-vous ?",
      "Un chef de chantier demande d'avancer les travaux avant que les protections collectives ne soient en place. Quelle est votre réaction ?",
      "Un intérimaire commence une tâche risquée sans avoir reçu l'accueil sécurité chantier. Que faites-vous ?",
      "Les conditions météo se dégradent et rendent dangereuse la poursuite de certains travaux. Comment vous positionnez-vous ?",
      "Un matériel de levage est utilisé sans vérification périodique à jour. Quelle réaction adoptez-vous ?",
      "Les protections contre les chutes ne couvrent pas l'ensemble de la zone concernée. Que faites-vous ?",
      "Un sous-traitant ne respecte pas les consignes de sécurité spécifiques au chantier. Comment réagissez-vous ?",
      "Des travaux de soudure sont réalisés à proximité de matériaux inflammables non protégés. Que faites-vous ?",
      "Le délai est avancé et plusieurs équipes travaillent en même temps dans un espace réduit. Quelle réaction adoptez-vous ?",
      "Un permis de feu a expiré mais les travaux n'ont pas encore été terminés. Que faites-vous ?",
      "Vous constatez qu'une canalisation ou un câble n'est pas à l'endroit indiqué sur les plans. Comment réagissez-vous ?",
      "Un opérateur travaille seul dans une tranchée sans dispositif de surveillance. Quelle réaction adoptez-vous ?",
      "Des déchets de chantier sont stockés sur un cheminement d'évacuation d'urgence. Que faites-vous ?",
      "Un incident mineur survient mais l'équipe préfère ne pas le signaler pour ne pas ralentir le chantier. Comment vous positionnez-vous ?",
      "La réception de travaux révèle que certaines protections définitives n'ont pas été posées. Que faites-vous ?",
      "Un nouvel arrivant sur le chantier n'a pas eu de présentation des risques spécifiques de la zone. Quelle réaction adoptez-vous ?"
    ],
    qvt: [
      "Vous constatez qu'une personne répond régulièrement très tard le soir. Que faites-vous ?",
      "Une réunion est ajoutée à la dernière minute sur un créneau déjà saturé. Quelle réaction adoptez-vous ?",
      "Un livrable urgent crée des tensions entre deux équipes. Que faites-vous ?",
      "Vous avez du mal à tenir vos priorités mais personne ne semble disponible pour en parler. Comment réagissez-vous ?",
      "Un collègue semble s'isoler progressivement des échanges collectifs. Que faites-vous ?",
      "Une personne fait une remarque sèche en réunion après plusieurs semaines tendues. Quelle réaction adoptez-vous ?",
      "Une urgence est présentée comme prioritaire alors que tout est déjà prioritaire. Que faites-vous ?",
      "Vous recevez plusieurs demandes contradictoires dans la même journée. Comment vous positionnez-vous ?",
      "Un irritant récurrent crée de la fatigue dans l'équipe mais personne ne le traite. Que faites-vous ?",
      "Une personne minimise sa surcharge en disant qu'elle va tenir encore un peu. Quelle réaction adoptez-vous ?",
      "Une réunion déborde régulièrement sur les temps de pause ou de fin de journée. Que faites-vous ?",
      "Un désaccord de fond se transforme en tension personnelle. Comment réagissez-vous ?",
      "Une personne prend beaucoup de tâches supplémentaires sans demander d'aide. Que faites-vous ?",
      "Vous sentez que votre charge devient difficile à absorber durablement. Quelle réaction adoptez-vous ?",
      "Une décision organisationnelle crée de l'incompréhension et des rumeurs. Que faites-vous ?",
      "Un collègue vous confie une difficulté mais vous ne savez pas quoi répondre. Comment réagissez-vous ?",
      "Une équipe voisine sollicite souvent votre aide dans l'urgence. Que faites-vous ?",
      "Un canal de discussion devient le lieu de remarques tendues ou passives-agressives. Quelle réaction adoptez-vous ?",
      "Une personne revient après une absence et semble vouloir reprendre trop vite. Que faites-vous ?",
      "Une charge invisible repose toujours sur les mêmes personnes. Comment réagissez-vous ?",
      "En télétravail, vous finissez régulièrement votre journée bien après l'horaire habituel. Que faites-vous ?",
      "Un collègue en distanciel est de moins en moins réactif lors des réunions d'équipe. Quelle réaction adoptez-vous ?",
      "Vous constatez que les personnes en présentiel ont plus facilement accès aux décisions que celles à distance. Que faites-vous ?",
      "Une réunion hybride crée régulièrement un déséquilibre entre participants en salle et ceux à distance. Comment réagissez-vous ?",
      "Vous n'arrivez plus à déconnecter en fin de journée lors des semaines entièrement en télétravail. Quelle réaction adoptez-vous ?",
      "Un collègue en hybride semble moins bien informé que les autres des décisions prises en présentiel. Que faites-vous ?",
      "Votre espace de télétravail ne vous permet pas de travailler dans de bonnes conditions. Comment vous positionnez-vous ?",
      "Vous ressentez une forme d'isolement lors des semaines entièrement à distance. Que faites-vous ?",
      "Un désaccord surgit entre collègues sur le nombre de jours de présence attendus dans l'équipe. Quelle réaction adoptez-vous ?",
      "Vous observez que certains membres de l'équipe évitent systématiquement les jours en présentiel. Que faites-vous ?",
      "Vous vous réveillez régulièrement fatigué·e avant même de commencer la journée. Que faites-vous ?",
      "Des tâches qui vous plaisaient habituellement vous semblent désormais pesantes et difficiles. Quelle réaction adoptez-vous ?",
      "Vous avez du mal à vous souvenir des dernières fois où vous avez réellement récupéré. Que faites-vous ?",
      "Un collègue revient d'un arrêt maladie et semble vouloir rattraper immédiatement tout ce qu'il a manqué. Que faites-vous ?",
      "Vous sentez que vous n'arrivez plus à vous investir comme avant dans votre travail. Comment vous positionnez-vous ?",
      "Une personne en retour d'absence semble éviter de parler de ce qui s'est passé. Quelle réaction adoptez-vous ?",
      "Vous avez pris l'habitude de ne jamais refuser une demande supplémentaire, même quand vous êtes déjà saturé·e. Que faites-vous ?",
      "Un collègue vous confie qu'il envisage de prendre un arrêt mais qu'il hésite par peur du regard des autres. Que faites-vous ?",
      "Vous sentez que vos limites ne sont pas respectées dans l'organisation de votre charge. Comment réagissez-vous ?",
      "Une personne de retour après une longue absence est confrontée à des changements importants dans son équipe. Que faites-vous ?",
      "Un membre de votre équipe semble de moins en moins impliqué sans raison apparente. Que faites-vous ?",
      "Lors d'un échange, un collègue vous dit qu'il ne se sent plus à sa place dans l'équipe. Comment réagissez-vous ?",
      "Deux personnes de votre équipe ont visiblement des tensions mais personne n'en parle ouvertement. Que faites-vous ?",
      "Un collaborateur traverse une période personnelle difficile qui commence à affecter son travail. Comment vous positionnez-vous ?",
      "Vous constatez qu'un collègue fait des erreurs inhabituelles depuis quelques semaines. Quelle réaction adoptez-vous ?",
      "Un collègue vous demande si vous pouvez alléger sa charge. Vous n'avez pas de marge immédiate. Que faites-vous ?",
      "Lors d'une réunion, quelqu'un fond en larmes brièvement. Comment réagissez-vous ?",
      "Vous suspectez qu'un collègue est en épuisement professionnel mais il nie toute difficulté. Que faites-vous ?",
      "Un collègue vous indique qu'il se sent mal dans l'équipe sans pouvoir préciser pourquoi. Comment réagissez-vous ?",
      "La charge de votre équipe dépasse ce qui est tenable mais vous n'avez pas d'arbitrage de votre hiérarchie. Que faites-vous ?",
      "Un membre de l'équipe signale qu'il ne peut pas tenir un délai sans explication supplémentaire. Quelle réaction adoptez-vous ?",
      "Un collègue orienté vers les ressources RH revient vous voir sans avoir contacté personne. Que faites-vous ?",
      "Vous observez un changement progressif dans le comportement d'un collègue depuis une réorganisation. Comment réagissez-vous ?",
      "Une personne est clairement en difficulté mais refuse toute aide formelle. Que faites-vous ?",
      "Votre équipe sort d'une période de forte pression. Certains semblent ne pas décompresser. Quelle réaction adoptez-vous ?",
      "Un collègue ne prend jamais ses congés et semble en tirer une certaine fierté. Que faites-vous ?",
      "Lors du retour d'absence d'un collègue, l'équipe n'avait pas vraiment préparé son accueil. Que faites-vous ?",
      "Vous sentez que vous n'avez pas les ressources suffisantes pour accompagner la situation difficile d'un collègue. Comment réagissez-vous ?",
      "Un collègue développe une dépendance au travail qui commence à inquiéter l'entourage. Que faites-vous ?",
      "Vous constatez que votre équipe fonctionne à flux tendu depuis trop longtemps sans régulation. Comment vous positionnez-vous ?"
    ],
    management: [
      "Deux personnes n'ont pas la même compréhension du livrable attendu. Que faites-vous ?",
      "Une demande urgente remet en cause les priorités de la semaine. Quelle réaction adoptez-vous ?",
      "Une personne avec qui vous travaillez contourne le nouveau process pour gagner du temps. Que faites-vous ?",
      "Une réunion projet se termine sans décision claire sur les prochaines étapes. Comment réagissez-vous ?",
      "Vous recevez un feedback direct sur votre manière d'animer un échange. Que faites-vous ?",
      "Un collègue vous remet un livrable incomplet juste avant une échéance. Quelle réaction adoptez-vous ?",
      "Une personne demande un retour mais semble sensible aux critiques. Comment formulez-vous votre feedback ?",
      "Un changement d'outil crée des résistances dans l'équipe projet. Que faites-vous ?",
      "Un objectif est fixé mais les moyens disponibles ne semblent pas alignés. Comment réagissez-vous ?",
      "Une personne attend une validation sur chaque décision, même mineure. Que faites-vous ?",
      "Un projet avance mais les rôles deviennent flous. Quelle réaction adoptez-vous ?",
      "Une difficulté est connue mais chacun pense qu'elle relève de quelqu'un d'autre. Que faites-vous ?",
      "Une décision change en cours de route sans être clairement expliquée. Comment vous positionnez-vous ?",
      "Une personne très impliquée prend toute la place dans les échanges projet. Que faites-vous ?",
      "Un retard apparaît mais personne n'ose le dire clairement. Quelle réaction adoptez-vous ?",
      "Un retour d'expérience est organisé mais chacun reste général et prudent. Que faites-vous ?",
      "Une nouvelle méthode est lancée alors que l'ancienne n'est pas totalement stabilisée. Comment réagissez-vous ?",
      "Un contributeur dit oui à tout mais ne tient pas ses engagements. Que faites-vous ?",
      "Une tension apparaît entre qualité attendue et délai disponible. Quelle réaction adoptez-vous ?",
      "Après plusieurs feedbacks, les mêmes difficultés reviennent. Que faites-vous ?",
      "Un nouveau process est déployé sans que les équipes n'aient été consultées. Comment réagissez-vous ?",
      "Une réorganisation est annoncée mais les nouvelles responsabilités ne sont pas clarifiées. Que faites-vous ?",
      "Vous constatez que les résistances au changement se manifestent par des retards répétés plutôt que par des refus explicites. Quelle réaction adoptez-vous ?",
      "Un outil numérique est imposé mais il ne correspond pas aux usages réels de votre équipe. Que faites-vous ?",
      "Une transformation importante est lancée alors que l'équipe est déjà en surcharge. Comment vous positionnez-vous ?",
      "Une décision stratégique vous semble peu adaptée au terrain mais vous devez la relayer. Que faites-vous ?",
      "Un projet de transformation avance mais une partie de l'équipe n'a pas encore compris ce qui va changer pour elle. Quelle réaction adoptez-vous ?",
      "Vous percevez que certaines personnes feignent l'adhésion au changement sans vraiment y croire. Que faites-vous ?",
      "Un changement de processus crée des erreurs en période de transition. Comment réagissez-vous ?",
      "Une personne exprime publiquement son désaccord sur une décision déjà actée. Quelle réaction adoptez-vous ?",
      "Deux équipes ont des pratiques différentes pour accomplir la même tâche, ce qui crée des frictions. Comment réagissez-vous ?",
      "Une collaboration interéquipes échoue à produire un résultat parce que chacun attend que l'autre avance. Que faites-vous ?",
      "Vous constatez qu'une équipe partenaire ne respecte pas les engagements pris conjointement. Quelle réaction adoptez-vous ?",
      "Un projet implique plusieurs équipes mais personne ne semble coordonner l'ensemble. Que faites-vous ?",
      "Une information importante n'est pas partagée entre équipes, ce qui crée des doublons ou des incohérences. Comment vous positionnez-vous ?",
      "Une collaboration est bloquée par une rivalité tacite entre deux équipes. Que faites-vous ?",
      "Vous devez travailler avec une personne d'une autre équipe dont les méthodes sont très différentes des vôtres. Quelle réaction adoptez-vous ?",
      "Un partenaire interne ne tient pas ses délais mais il est dans une autre chaîne hiérarchique. Que faites-vous ?",
      "Un projet interéquipes avance mais les décisions sont prises sans toujours associer les bonnes personnes. Comment réagissez-vous ?",
      "Une personne vous demande systématiquement de valider ses décisions même mineures. Que faites-vous ?",
      "Vous avez délégué une tâche importante mais la personne ne semble pas avancer. Comment réagissez-vous ?",
      "Quelqu'un prend une initiative hors de son périmètre sans en avoir parlé. Quelle réaction adoptez-vous ?",
      "Vous constatez qu'une personne compétente ne s'investit plus comme avant. Que faites-vous ?",
      "Un collaborateur refuse une mission qu'il estime en dehors de son rôle. Comment vous positionnez-vous ?",
      "Vous devez arbitrer entre deux projets urgents avec des ressources limitées. Que faites-vous ?",
      "Une priorité définie collectivement est remise en question en cours de route par un membre de l'équipe. Quelle réaction adoptez-vous ?",
      "Plusieurs demandes urgentes arrivent simultanément et vous ne pouvez pas tout traiter. Comment réagissez-vous ?",
      "Un arbitrage difficile doit être rendu sans que toutes les informations soient disponibles. Que faites-vous ?",
      "Vous vous rendez compte que vous avez accepté trop d'engagements simultanément. Quelle réaction adoptez-vous ?",
      "Un collaborateur fait régulièrement des efforts supplémentaires sans les valoriser lui-même. Que faites-vous ?",
      "Vous observez que l'engagement collectif dans votre équipe diminue progressivement. Comment réagissez-vous ?",
      "Une personne semble très investie mais au détriment de sa propre santé. Quelle réaction adoptez-vous ?",
      "Une décision que vous avez prise ne produit pas les effets attendus. Que faites-vous ?",
      "Votre équipe fonctionne bien mais semble manquer d'élan ou d'ambition collective. Comment vous positionnez-vous ?",
      "Un collaborateur développe une expertise que vous ne maîtrisez pas vous-même. Quelle réaction adoptez-vous ?",
      "Vous constatez que certaines réunions d'équipe n'apportent plus rien de concret. Que faites-vous ?",
      "Un retour d'expérience collectif révèle une erreur partiellement attribuable à une décision que vous avez prise. Comment réagissez-vous ?",
      "Vous sentez que votre équipe attend de vous que vous preniez toutes les décisions à leur place. Quelle réaction adoptez-vous ?",
      "Un collègue extérieur à votre équipe vous sollicite fréquemment pour des arbitrages qui devraient relever de son propre manager. Que faites-vous ?",
      "Un outil adopté récemment est contourné par la majorité de l'équipe qui revient aux anciennes habitudes. Comment réagissez-vous ?"
    ],
    environnement: [
      "Une réunion courte est prévue en présentiel alors que plusieurs personnes doivent se déplacer loin. Que faites-vous ?",
      "Un support imprimé est demandé pour un événement alors qu'une version digitale existe. Quelle réaction adoptez-vous ?",
      "Vous devez choisir entre une livraison express et une option moins impactante. Que faites-vous ?",
      "Une pratique peu durable est installée dans l'équipe mais personne ne la remet en question. Comment réagissez-vous ?",
      "Un achat est renouvelé automatiquement alors que le besoin réel a diminué. Que faites-vous ?",
      "Un matériel encore utilisable est remplacé par habitude. Quelle réaction adoptez-vous ?",
      "Un événement interne prévoit beaucoup de goodies peu utiles. Que faites-vous ?",
      "Un déplacement professionnel est organisé sans comparer les alternatives. Comment vous positionnez-vous ?",
      "Un fichier très lourd est envoyé à de nombreuses personnes alors qu'un lien suffirait. Que faites-vous ?",
      "Une demande client semble encourager une solution plus coûteuse et plus impactante. Quelle réaction adoptez-vous ?",
      "Une équipe veut lancer une action environnementale très visible mais peu utile. Que faites-vous ?",
      "Un fournisseur moins cher présente peu de garanties environnementales. Comment réagissez-vous ?",
      "Un usage numérique génère beaucoup de stockage inutile. Que faites-vous ?",
      "Un arbitrage oppose confort immédiat et réduction d'impact. Quelle réaction adoptez-vous ?",
      "Une règle de tri existe mais elle est peu suivie. Comment vous positionnez-vous ?",
      "Une personne propose une amélioration sobre mais elle est perçue comme contraignante. Que faites-vous ?",
      "Un process oblige à produire des documents rarement consultés. Quelle réaction adoptez-vous ?",
      "Une initiative écologique repose toujours sur les mêmes volontaires. Que faites-vous ?",
      "Une contrainte environnementale est vécue comme une injonction de plus. Comment réagissez-vous ?",
      "Une décision rapide risque d'entraîner des achats ou déplacements évitables. Que faites-vous ?",
      "Votre ordinateur ou téléphone professionnel fonctionne encore bien mais un renouvellement est prévu. Que faites-vous ?",
      "Vous avez accumulé plusieurs centaines de mails non lus dans votre boîte professionnelle. Quelle réaction adoptez-vous ?",
      "Un dossier numérique de plusieurs gigaoctets est envoyé en pièce jointe alors qu'un lien suffirait. Que faites-vous ?",
      "Plusieurs applications restent ouvertes sur vos appareils sans utilisation réelle. Comment réagissez-vous ?",
      "Des réunions en visio sont organisées alors que tout le monde est dans le même bâtiment. Quelle réaction adoptez-vous ?",
      "Un espace de stockage cloud partagé déborde de fichiers obsolètes. Que faites-vous ?",
      "Une réunion est planifiée à distance pour un sujet qui nécessite peu d'échanges. Comment vous positionnez-vous ?",
      "Vous utilisez la visioconférence depuis un espace ouvert sans nécessité. Que faites-vous ?",
      "Des notifications permanentes vous empêchent de travailler sans connexion continue. Quelle réaction adoptez-vous ?",
      "Vous devez vous déplacer pour une réunion de deux heures à 300 km. Comment vous positionnez-vous ?",
      "Un véhicule est utilisé pour un court trajet facilement réalisable autrement. Quelle réaction adoptez-vous ?",
      "Un vol est réservé sans que les options train ou visio n'aient été étudiées. Que faites-vous ?",
      "Une politique de déplacements existe dans votre organisation mais elle est peu appliquée. Quelle réaction adoptez-vous ?",
      "Des billets d'avion ont été achetés pour un trajet qui aurait pu être en train. Que faites-vous a posteriori ?",
      "Un fournisseur retenu ne publie aucune information sur ses pratiques environnementales. Que faites-vous ?",
      "Un achat groupé réduirait l'empreinte logistique mais demande une coordination supplémentaire. Comment réagissez-vous ?",
      "Un produit moins impactant coûte 15 % de plus. La décision vous appartient. Que faites-vous ?",
      "Des fournitures sont commandées fréquemment en petites quantités, générant des livraisons répétées. Quelle réaction adoptez-vous ?",
      "Un prestataire propose une offre compétitive mais ses conditions de travail semblent floues. Que faites-vous ?",
      "Un achat est justifié par le budget disponible plutôt que par le besoin réel. Comment vous positionnez-vous ?",
      "Des emballages non recyclables sont utilisés systématiquement pour les envois internes. Que faites-vous ?",
      "Vous devez choisir entre un fournisseur local plus cher et un fournisseur importé moins coûteux. Que faites-vous ?",
      "Un équipement de bureau est en panne mais réparable. Un remplacement neuf serait plus rapide. Comment réagissez-vous ?",
      "Une démarche RSE est lancée mais repose entièrement sur des volontaires. Que faites-vous ?",
      "Un collègue remarque que les efforts individuels sont dérisoires face aux émissions industrielles. Comment réagissez-vous ?",
      "Une initiative environnementale peine à trouver des participants au-delà du cercle habituel. Quelle réaction adoptez-vous ?",
      "Votre organisation affiche des engagements RSE ambitieux mais les pratiques internes ne sont pas alignées. Que faites-vous ?",
      "Un client vous demande l'empreinte carbone de votre offre. Vous n'avez pas de données précises. Comment réagissez-vous ?",
      "Une action collective RSE s'ajoute à une charge déjà lourde. Quelle réaction adoptez-vous ?",
      "Une habitude d'équipe génère un impact que personne ne questionne. Que faites-vous ?",
      "Un bilan carbone révèle que les émissions viennent surtout des déplacements et du numérique. Quelle réaction adoptez-vous ?",
      "Vous êtes sollicité pour porter un projet RSE transverse hors de votre cœur de mission. Que faites-vous ?"
    ],
    ethique: [
      "Un fournisseur vous propose une invitation personnelle avant un renouvellement de contrat. Que faites-vous ?",
      "Vous découvrez qu'un proche travaille pour une entreprise candidate à un appel d'offres. Quelle réaction adoptez-vous ?",
      "Une information confidentielle est évoquée dans un espace informel. Que faites-vous ?",
      "Une décision vous semble discutable mais vous n'êtes pas sûr·e du niveau d'alerte. Comment réagissez-vous ?",
      "Un cadeau reçu paraît modeste mais arrive au moment d'une négociation. Que faites-vous ?",
      "Une personne vous demande de modifier une date ou une information pour simplifier un dossier. Quelle réaction adoptez-vous ?",
      "Un collègue vous confie une situation sensible en vous demandant de ne rien dire. Que faites-vous ?",
      "Une pratique habituelle semble contraire à l'esprit d'une règle interne. Comment vous positionnez-vous ?",
      "Un avantage est proposé à certaines personnes sans critère clair. Que faites-vous ?",
      "Une pression commerciale pousse à présenter une information de manière ambiguë. Quelle réaction adoptez-vous ?",
      "Un document contient une erreur qui pourrait arranger l'équipe si elle n'est pas corrigée. Que faites-vous ?",
      "Un client demande une faveur qui sort du cadre prévu. Comment réagissez-vous ?",
      "Une remarque laisse penser qu'une décision pourrait être influencée par une relation personnelle. Que faites-vous ?",
      "Une alerte passée a été mal reçue et vous hésitez à signaler un nouveau point. Quelle réaction adoptez-vous ?",
      "Une règle compliance est perçue comme trop lourde par l'équipe. Comment vous positionnez-vous ?",
      "Une dépense est présentée de manière floue dans un dossier. Que faites-vous ?",
      "Une personne vous demande de valider un document que vous n'avez pas réellement vérifié. Quelle réaction adoptez-vous ?",
      "Une situation n'est pas illégale en apparence mais vous met mal à l'aise. Que faites-vous ?",
      "Un partenaire insiste pour obtenir une information non nécessaire à sa mission. Comment réagissez-vous ?",
      "Une décision sensible est prise oralement sans trace claire. Que faites-vous ?"
    ]
  };

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — génération de questions (V2)
  //  - offset déterministe par AD via makeVariantOffset
  //  - tags enrichis via chaptersTags
  // ─────────────────────────────────────────────────────────────────────────

  function makeQuestions(prefix, domain, chapterIndex, extraTags) {
    const bank   = questionBanks[domain] || questionBanks.management;
    const offset = makeVariantOffset(prefix);
    const base   = extraTags || [BADGES.IA, BADGES.AIDE, BADGES.REVIEW];
    const ctags  = chaptersTags(domain, chapterIndex);

    return Array.from({ length: 5 }, function (_, i) {
      const k = offset + chapterIndex * 5 + i;
      return {
        id:      prefix + "-q" + (chapterIndex + 1) + "-" + (i + 1),
        type:    "choix",
        text:    bank[k % bank.length],
        answers: answerSets(domain, k),
        tags:    base.concat([domain]).concat(ctags).concat(["Mise en situation"])
      };
    });
  }

  function makeChapters(prefix, domain, chapters, tags) {
    return chapters.map(function (c, i) {
      return {
        id:          prefix + "-chap-" + (i + 1),
        title:       c[0],
        description: c[1],
        questions:   makeQuestions(prefix, domain, i, tags),
        profiles:    makeProfiles(c[0])
      };
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — templates
  // ─────────────────────────────────────────────────────────────────────────

  const templates = {
    securiteSurete: {
      domain: "securite",
      chapters: [
        ["Identifier les risques",             "Observer son environnement et repérer les situations sensibles avant qu'elles ne s'aggravent."],
        ["Appliquer les bons réflexes",        "Maintenir les gestes utiles même sous pression opérationnelle."],
        ["Contribuer à la sécurité collective","Intervenir avec tact et soutenir les pratiques sûres dans le collectif."],
        ["Réagir et signaler",                 "Faire remonter les incidents, anomalies et signaux faibles sans banaliser."]
            ]
    },
    securiteSignalement: {
      domain: "securite",
      chapters: [
        ["Repérer les signaux faibles", "Identifier les anomalies, écarts et situations qui pourraient annoncer un incident."],
        ["Oser signaler sans attendre", "Dépasser les freins liés à la peur de déranger, d’accuser ou de ralentir l’activité."],
        ["Décrire les faits utilement", "Formuler un signalement factuel, exploitable et sans jugement."],
        ["Transformer le signalement en action", "Faire du retour d’expérience un levier d’amélioration collective."]
      ]
    },
    securiteAccesSites: {
      domain: "securite",
      chapters: [
        ["Contrôler les accès sensibles", "Repérer les situations où une entrée, un badge ou une zone nécessitent une vigilance particulière."],
        ["Réagir face à une présence inhabituelle", "Adopter la bonne posture face à une personne, un objet ou un comportement atypique."],
        ["Protéger les zones et les informations", "Limiter les risques liés aux portes ouvertes, documents visibles ou circulations non maîtrisées."],
        ["Alerter sans dramatiser", "Mobiliser les bons relais en cas de doute sur une intrusion ou une situation suspecte."]
      ]
    },
    securiteManagers: {
      domain: "securite",
      chapters: [
        ["Faire vivre les règles au quotidien", "Installer des repères clairs sans transformer la sécurité en contrôle permanent."],
        ["Traiter les écarts sans culpabiliser", "Comprendre les causes d’un contournement et agir de manière constructive."],
        ["Arbitrer sous pression opérationnelle", "Maintenir les exigences de sécurité face aux délais, urgences et contraintes terrain."],
        ["Animer une culture de vigilance", "Encourager les remontées, les échanges et les apprentissages collectifs."]
      ]    
    },
    qvtRps: {
      domain: "qvt",
      chapters: [
        ["Repérer les signaux faibles",       "Identifier fatigue, tensions, isolement et alertes relationnelles."],
        ["Réguler la charge",                 "Prioriser, demander de l'aide et clarifier les urgences."],
        ["Préserver les relations de travail","Désamorcer les irritants et maintenir un dialogue constructif."],
        ["Mobiliser les bons relais",         "Savoir quand et comment alerter sans exposer inutilement."]
      ]
    },
    securiteCoactivite: {
      domain: "securite",
      chapters: [
        ["Préparer une intervention en coactivité",  "Identifier les risques liés à la présence simultanée de plusieurs équipes ou prestataires."],
        ["Coordonner les zones et les accès",        "Gérer les interférences entre activités parallèles, baliser et vérifier les habilitations."],
        ["Intégrer les intervenants externes",       "Accueillir, informer et contrôler les prestataires et sous-traitants présents sur le site."],
        ["Réagir à un incident en coactivité",       "Alerter, sécuriser et gérer les responsabilités quand plusieurs équipes sont impliquées."]
      ]
    },
    securiteEPI: {
      domain: "securite",
      chapters: [
        ["Choisir et vérifier ses EPI",              "Identifier les équipements de protection requis, vérifier leur état avant toute utilisation."],
        ["Maintenir ses réflexes sous contrainte",   "Conserver les bons gestes même sous pression opérationnelle, par fatigue ou en urgence."],
        ["Signaler une anomalie matérielle",         "Détecter une défaillance d'EPI ou d'équipement de protection collectif et réagir sans délai."],
        ["Contribuer à une culture EPI collective",  "Encourager les bonnes pratiques autour de soi sans créer de tensions ou de postures de contrôle."]
      ]
    },
    securiteManagerArbitrage: {
      domain: "securite",
      chapters: [
        ["Tenir les exigences face à la pression",       "Maintenir les standards de sécurité quand la production, les délais ou la hiérarchie créent une pression forte."],
        ["Traiter les écarts de façon constructive",     "Analyser les causes d'un non-respect de consigne sans culpabiliser, pour agir efficacement sur les causes réelles."],
        ["Animer la vigilance dans les périodes calmes", "Maintenir l'attention sécurité de l'équipe entre deux incidents, quand la routine tend à s'installer."],
        ["Détecter les glissements silencieux",          "Repérer les dérives progressives de pratique avant qu'elles ne créent une situation grave."]
      ]
    },
    securiteNucleaire: {
      domain: "sec_nucl",
      chapters: [
        ["Adopter une posture de questionnement",  "Exercer une questioning attitude, ne jamais laisser passer un doute sans le formaliser."],
        ["Appliquer la rigueur procédurale",       "Respecter les gammes et modes opératoires sans raccourci, même sous pression de délai ou d'expérience."],
        ["Gérer les situations non prévues",       "Adopter la bonne posture face à une situation non couverte par les référentiels."],
        ["Déclarer et tirer les enseignements",    "Signaler les écarts et événements précurseurs dans une culture de sûreté ouverte."]
      ]
    },
    securiteChantierBTP: {
      domain: "sec_btp",
      chapters: [
        ["Sécuriser son poste avant de démarrer", "Analyser les risques, baliser sa zone, vérifier les EPC et les EPI avant toute intervention."],
        ["Gérer la coactivité sur chantier",       "Coordonner avec les autres corps de métier, signaler les interférences et les zones partagées."],
        ["Appliquer et faire respecter le PPSPS", "Vérifier les habilitations, les permis de travail et les protections collectives prévues au plan."],
        ["Réagir à un accident ou incident",       "Donner l'alerte, sécuriser les personnes et préserver les conditions pour l'analyse."]
      ]
    },
    qvtTeletravail: {
      domain: "qvt",
      chapters: [
        ["Organiser son temps et son espace à distance",   "Structurer sa journée en télétravail, poser des limites et éviter le glissement des horaires."],
        ["Maintenir le lien avec son collectif",           "Rester visible et contributeur à distance, prévenir le sentiment d'isolement ou de mise à l'écart."],
        ["Communiquer efficacement en mode hybride",       "Adapter ses pratiques d'échange pour que distance et présentiel n'induisent pas d'inégalités."],
        ["Gérer les irritants de l'hybridation",           "Identifier et traiter les frictions propres au travail hybride sans laisser s'installer les non-dits."]
      ]
    },
    qvtEpuisement: {
      domain: "qvt",
      chapters: [
        ["Reconnaître ses propres signaux d'alerte",       "Identifier les signes précoces de fatigue ou de surcharge avant qu'ils ne s'aggravent."],
        ["Réguler sa charge dans la durée",                "Agir sur les leviers concrets : hiérarchiser, dire non, déléguer sans culpabiliser."],
        ["Préserver son énergie au quotidien",             "Créer des routines de récupération, maintenir des frontières saines et exercer le droit à la déconnexion."],
        ["Oser en parler et chercher un appui",            "Identifier les bons interlocuteurs et franchir le pas sans attendre d'être en difficulté réelle."]
      ]
    },
    qvtRetourAbsence: {
      domain: "qvt",
      chapters: [
        ["Préparer les conditions du retour",              "Anticiper les ajustements nécessaires et identifier ce qui a changé pendant l'absence."],
        ["Réintégrer son collectif de travail",            "Reprendre le fil avec ses collègues, gérer les décalages accumulés et les non-dits."],
        ["Réguler la reprise en charge",                   "Éviter la surcompensation, calibrer ses engagements et signaler ce qui ne tient pas."],
        ["Détecter les signaux qui persistent",            "Reconnaître quand le retour ne se stabilise pas et identifier le bon moment pour en parler."]
      ]
    },
    qvtManagerSignaux: {
      domain: "qvt",
      chapters: [
        ["Repérer les signaux faibles dans son équipe",    "Observer sans sur-interpréter, distinguer l'exceptionnel du structurel sans s'ériger en thérapeute."],
        ["Intervenir de façon factuelle",                  "Agir sur le travail — pas sur la personne — et créer les conditions pour qu'un échange soit possible."],
        ["Orienter vers les bons relais",                  "Savoir quand passer la main sans se défausser : RH, médecin du travail, dispositif d'écoute."],
        ["Prévenir par l'organisation",                    "Agir en amont sur la charge, les rôles et le cadre plutôt que de gérer les symptômes individuels."]
      ]
    },
    management: {
      domain: "management",
      chapters: [
        ["Clarifier le cadre",                   "Identifier les attendus, les rôles, les priorités et les zones de flou."],
        ["Coopérer dans l'incertitude",          "Avancer avec des informations incomplètes sans désorganiser le collectif."],
        ["Donner et recevoir du feedback utile", "Formuler et accueillir des retours concrets, recevables et orientés action."],
        ["Ancrer les nouvelles pratiques",       "Transformer les intentions en habitudes professionnelles observables."]
      ]
  },
 mgmtFeedback: {
   domain: "management",
   chapters: [
     ["Créer les conditions d’un feedback utile", "Installer un cadre propice à des retours réguliers, concrets et recevables."],
     ["Formuler un retour factuel", "S’appuyer sur des faits observables plutôt que sur des jugements ou impressions générales."],
     ["Recevoir un feedback sans se fermer", "Accueillir un retour, même inconfortable, pour en faire un levier d’apprentissage."],
     ["Ancrer les apprentissages", "Transformer les retours reçus en ajustements visibles dans les pratiques."]
  ]
},
  mgmtManagerEngageant: {
    domain: "management",
    chapters: [
      ["Créer un cadre mobilisateur", "Clarifier les attentes, le sens et les marges de manœuvre de l’équipe."],
      ["Responsabiliser sans surcontrôler", "Développer l’autonomie sans abandonner l’accompagnement."],
      ["Soutenir l’engagement au quotidien", "Reconnaître les efforts, traiter les irritants et maintenir l’énergie collective."],
      ["Faire évoluer sa posture managériale", "Ajuster ses pratiques pour renforcer confiance, coopération et initiative."]
    ]
  },
  mgmtProjet: {
    domain: "management",
    chapters: [
      ["Clarifier le besoin et le périmètre", "Comprendre les attentes, les rôles et les livrables avant d’agir."],
      ["Coopérer dans un cadre mouvant", "Avancer avec plusieurs interlocuteurs malgré les imprévus et zones de flou."],
      ["Anticiper les risques et dépendances", "Identifier ce qui peut bloquer le projet et alerter au bon moment."],
      ["Contribuer jusqu’à la livraison", "Tenir ses engagements, ajuster les priorités et capitaliser sur l’expérience."]
     ]
   },
   mgmtChangement: {
     domain: "management",
     chapters: [
       ["Comprendre les résistances au changement", "Distinguer l'opposition de fond du besoin d'information, et agir en conséquence sans forcer l'adhésion."],
       ["Relayer et incarner la transformation",    "Transmettre un changement décidé sans l'avoir choisi tout en préservant sa crédibilité de proximité."],
       ["Accompagner les transitions individuelles","Repérer les personnes qui décrochent et créer les conditions d'un soutien sans paternalisme ni contrôle."],
       ["Ancrer les nouvelles pratiques dans la durée", "Empêcher que les anciennes habitudes reprennent le dessus une fois l'attention de la direction retombée."]
      ]
    },
    mgmtResponsabilisation: {
      domain: "management",
      chapters: [
        ["Déléguer sans abandonner",                "Confier une responsabilité réelle tout en restant disponible sans reprendre la main à la moindre difficulté."],
        ["Développer l'autonomie de décision",      "Créer les conditions pour que les arbitrages se prennent au bon niveau, sans créer de dépendance."],
        ["Valoriser l'initiative et l'engagement",  "Reconnaître ce qui mérite de l'être, de façon cohérente et sans créer de hiérarchies informelles."],
        ["Gérer les erreurs sans bloquer la prise de risque", "Traiter une erreur de façon à préserver la confiance et l'envie d'agir sans remettre en cause la délégation."]
      ]
    },
    mgmtCollaboration: {
      domain: "management",
      chapters: [
        ["Coopérer avec d'autres équipes",           "Identifier les points de friction interéquipes et créer les conditions d'une vraie collaboration au quotidien."],
        ["Gérer les dépendances et les attentes",    "Clarifier ce qu'on peut attendre des autres et ce qu'on s'engage à livrer soi-même, sans ambiguïté."],
        ["Dépasser les logiques de silos",           "Agir pour que les intérêts d'équipe ne prennent pas le dessus sur la cohérence globale de l'organisation."],
        ["Construire des pratiques communes",        "Aligner les méthodes de travail entre équipes sans imposer ni diluer ce qui fonctionne."]
      ]
    },
    mgmtDigital: {
      domain: "management",
      chapters: [
        ["Adopter un nouveau processus ou outil",    "Trouver sa posture face à une transformation qui change les habitudes sans effacer les compétences existantes."],
        ["Accompagner les moins à l'aise",           "Soutenir les personnes en difficulté avec les outils numériques sans s'y substituer ni créer de dépendance."],
        ["Questionner la pertinence des usages",     "Évaluer si les outils et processus numériques servent vraiment le travail ou créent de la complexité inutile."],
        ["Gérer la transition entre ancien et nouveau", "Maintenir la continuité du travail pendant une période de changement d'outil ou de méthode."]
      ]
    },
    mgmtArbitrage: {
      domain: "management",
      chapters: [
        ["Hiérarchiser face à l'urgence",            "Décider quoi faire et quoi ne pas faire quand tout semble prioritaire en même temps."],
        ["Gérer les injonctions contradictoires",    "Trouver une position cohérente et tenable quand les demandes reçues sont incompatibles entre elles."],
        ["Expliquer et tenir ses arbitrages",        "Communiquer une décision d'arbitrage de façon à ne pas créer de frustration inutile ni fragiliser la confiance."],
        ["Revoir ses priorités sans déstabiliser",   "Adapter le plan en cours de route sans perdre la confiance de l'équipe ni créer un sentiment d'instabilité."]
      ]
    },
    envNumerique: {
      domain: "environnement",
      chapters: [
        ["Réduire son empreinte numérique",              "Questionner les habitudes de stockage, d'envoi et de communication."],
        ["Arbitrer entre distanciel et présentiel",      "Décider quand organiser une réunion physique ou la remplacer à distance."],
        ["Allonger la durée de vie de ses équipements",  "Retarder le renouvellement et éviter les remplacements par défaut."],
        ["Réduire le bruit numérique collectif",         "Contribuer à un environnement numérique sobre en réduisant les échanges superflus."]
      ]
    },
    envDeplacements: {
      domain: "environnement",
      chapters: [
        ["Questionner la nécessité d'un déplacement",        "Évaluer si un trajet est réellement nécessaire ou si une alternative existe."],
        ["Choisir le mode de déplacement le moins impactant", "Comparer les options sans attendre que la politique de l'organisation le demande."],
        ["Organiser ses déplacements avec sobriété",          "Regrouper les trajets et réduire les allers-retours inutiles."],
        ["Contribuer à une culture sobre des déplacements",   "Partager ses pratiques et questionner les habitudes collectives sans moraliser."]
      ]
    },
    envAchats: {
      domain: "environnement",
      chapters: [
        ["Questionner le besoin avant d'acheter",             "Distinguer le besoin réel du besoin perçu et explorer la réutilisation."],
        ["Évaluer l'impact de ses choix fournisseurs",        "Intégrer les critères environnementaux dans les décisions d'achat."],
        ["Réduire les emballages et la logistique inutile",   "Agir sur la fréquence des commandes et les modes de livraison."],
        ["Ancrer les achats responsables dans les pratiques", "Rendre les critères RSE praticables dans les décisions du quotidien."]
      ]
    },
    envEngagement: {
      domain: "environnement",
      chapters: [
        ["Situer son propre engagement RSE",                "Identifier ce qui motive à agir, ce qui freine et à quel niveau on se reconnaît."],
        ["Agir sans attendre une politique formalisée",     "Trouver les marges de manœuvre à son niveau sans cadre institutionnel complet."],
        ["Embarquer ses collègues sans les culpabiliser",   "Partager des pratiques et créer de l'envie sans être donneur de leçon."],
        ["Tenir dans la durée malgré les contraintes",      "Maintenir des gestes cohérents quand la pression opérationnelle reprend le dessus."]
      ]
    },
    envManagerRSE: {
      domain: "environnement",
      chapters: [
        ["Incarner la transition sans surjouer",             "Montrer l'exemple sans créer de pression ni décalage entre discours et pratiques."],
        ["Créer les conditions d'un engagement collectif",   "Faciliter l'appropriation des enjeux RSE sans imposer ni infantiliser."],
        ["Arbitrer entre performance et impact",             "Tenir une position tenable quand contraintes économiques et enjeux environnementaux s'affrontent."],
        ["Faire vivre la RSE dans les rituels d'équipe",     "Intégrer les questions d'impact dans les pratiques habituelles sans en faire un sujet à part."]
      ]
    },
    environnement: {
      domain: "environnement",
      chapters: [
        ["Identifier les impacts",        "Relier les gestes du quotidien à des effets environnementaux concrets."],
        ["Arbitrer sobrement",            "Faire des choix réalistes sans culpabilisation ni affichage."],
        ["Coopérer autour des pratiques", "Faire évoluer les usages avec les collègues, clients et prestataires."],
        ["Faire durer les changements",   "Installer des réflexes simples et mesurables dans le temps."]
      ]
    },
          envDechets: {
      domain: "environnement",
      chapters: [
        ["Identifier les sources de gaspillage", "Repérer les déchets, consommations inutiles et pertes de ressources dans les pratiques du quotidien."],
        ["Réduire à la source", "Agir avant même la production du déchet : besoins réels, volumes, réutilisation et sobriété."],
        ["Trier sans complexifier", "Installer des gestes simples, compréhensibles et réellement applicables par le collectif."],
        ["Ancrer les nouvelles habitudes", "Faire durer les pratiques de réduction des déchets sans dépendre uniquement de la bonne volonté individuelle."]
      ]
    },

    envAchatsResponsables: {
      domain: "environnement",
      chapters: [
        ["Questionner le besoin réel", "Distinguer l’achat nécessaire de l’achat automatique, confortable ou budgétaire."],
        ["Comparer les impacts fournisseurs", "Intégrer les critères environnementaux, sociaux et logistiques dans les choix."],
        ["Arbitrer entre coût, usage et impact", "Décider sans réduire l’achat responsable à une opposition entre prix et conviction."],
        ["Sécuriser les pratiques d’achat", "Formaliser des repères simples pour rendre les choix responsables plus réguliers."]
      ]
    },

    envManagerTransition: {
      domain: "environnement",
      chapters: [
        ["Donner du sens sans culpabiliser", "Expliquer les enjeux environnementaux sans injonction, moralisation ou affichage."],
        ["Créer des marges d’action réalistes", "Identifier ce que l’équipe peut réellement changer dans son quotidien professionnel."],
        ["Arbitrer les tensions opérationnelles", "Gérer les contradictions entre délais, performance, confort et réduction d’impact."],
        ["Installer une dynamique collective", "Faire vivre la transition dans les rituels, décisions et habitudes de l’équipe."]
      ]
    },
    ethique: {
      domain: "ethique",
      chapters: [
        ["Identifier les zones grises",    "Repérer ce qui n'est pas illégal en apparence mais peut poser problème."],
        ["Demander conseil au bon moment", "Ne pas rester seul·e face à un doute, une pression ou un conflit d'intérêts."],
        ["Documenter et alerter",          "Décrire les faits, protéger les personnes et utiliser le bon canal."],
        ["Créer une culture de vigilance", "Rendre les règles compréhensibles, applicables et discutables au quotidien."]
      ]
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  //  CYBERSÉCURITÉ — questions écrites, scoring subtil
  //  ⚠ NE PAS MODIFIER — logique non générative, contenu validé
  // ═════════════════════════════════════════════════════════════════════════

  const CT = [BADGES.IA, BADGES.AIDE, BADGES.REVIEW];

  function lq(id, text) {
    return {
      id, type: "likert", text,
      answers: [
        { text: "Jamais",   score: 0   },
        { text: "Rarement", score: 0.5 },
        { text: "Parfois",  score: 1   },
        { text: "Souvent",  score: 1.5 },
        { text: "Toujours", score: 2   }
      ],
      tags: CT
    };
  }

  function cq(id, text, answers) {
    return { id, type: "choix", text, answers, tags: CT };
  }

  const CYBER_PROFILES = {
    "reperer-signaux": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "La détection des signaux numériques sensibles est encore à construire",
        summary: "Les tentatives de manipulation bien construites passent encore souvent sous votre radar.",
        description: "Reconnaître une tentative de phishing ou d'ingénierie sociale demande une sensibilisation spécifique — ces attaques sont conçues pour contourner la vigilance ordinaire. Ce n'est pas un manque d'attention, c'est un manque d'outillage qui se corrige avec la pratique.",
        keywords: ["Détection à renforcer", "Formation utile", "Signaux manqués"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Vous repérez l'évident, mais les attaques sophistiquées vous exposent encore",
        summary: "Votre vigilance est présente face aux tentatives grossières, mais les signaux subtils vous échappent parfois.",
        description: "Vous réagissez correctement face aux tentatives évidentes, mais certains contextes favorables — expéditeur connu, timing plausible, urgence crédible — peuvent encore faire baisser votre garde. C'est précisément là que se concentrent les attaques les plus efficaces.",
        keywords: ["Vigilance conditionnelle", "Signaux subtils", "Contexte influençant"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vous lisez les signaux numériques avec précision",
        summary: "Votre vigilance s'applique même quand le contexte rend la demande plausible.",
        description: "Vous avez internalisé les signaux qui distinguent une sollicitation légitime d'une tentative de manipulation : urgence artificielle, domaine légèrement modifié, canal inhabituel. Cette vigilance calibrée — ni alarmiste, ni aveugle — est un atout réel pour votre organisation.",
        keywords: ["Vigilance active", "Signal faible perçu", "Discernement"]
      }
    ],
    "proteger-acces": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "Des habitudes à risque persistent dans votre quotidien numérique",
        summary: "Certains comportements courants — mot de passe partagé, poste non verrouillé, 2FA ignoré — créent des vulnérabilités réelles.",
        description: "Ce n'est pas une question de mauvaise volonté : ces habitudes sont le reflet d'une routine construite avant que la sensibilisation cyber ne devienne prioritaire. Les corriger demande peu d'effort individuel mais un appui collectif clair.",
        keywords: ["Habitudes à risque", "Automatisme absent", "Vulnérabilités courantes"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Vos pratiques de protection sont présentes mais pas encore automatiques",
        summary: "Vous connaissez les bonnes pratiques et les appliquez quand vous y pensez — mais elles ne sont pas encore systématiques.",
        description: "La différence entre une posture intermédiaire et une posture solide, c'est souvent l'automatisme. Vous avez les connaissances — l'enjeu est de les transformer en réflexes indépendants du contexte, de la pression du moment ou de la confiance accordée à l'environnement.",
        keywords: ["Pratiques connues", "Automatisme partiel", "Contextuel"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vos réflexes de protection des accès sont ancrés",
        summary: "Verrouillage systématique, partage refusé, 2FA activé — ces habitudes forment votre première ligne de défense.",
        description: "Vous avez automatisé les comportements qui semblent anodins mais qui sont décisifs : verrouiller son poste, refuser de partager sa session, utiliser des mots de passe forts et uniques. Ces réflexes sont invisibles quand ils fonctionnent — et précieux quand ils sont absents.",
        keywords: ["Réflexes ancrés", "Verrouillage systématique", "2FA actif"]
      }
    ],
    "partager-discernement": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "Le partage d'information est encore peu maîtrisé",
        summary: "La frontière entre ce qui est partageable et ce qui est sensible reste floue dans les échanges du quotidien.",
        description: "Des informations sensibles sont probablement partagées sans contrôle — non par négligence, mais parce que les critères et les canaux ne sont pas encore clairs. C'est l'un des vecteurs de fuite les plus fréquents et des plus accessibles à corriger.",
        keywords: ["Frontière floue", "Fuite non intentionnelle", "Procédures à clarifier"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Votre discernement est présent mais conditionnel",
        summary: "Vous faites attention dans les situations formelles, mais les contextes informels et les demandes urgentes créent des zones de relâchement.",
        description: "Vous êtes prudent quand vous y pensez — mais les échanges informels, la pression temporelle et la confiance relationnelle peuvent encore vous amener à partager plus que nécessaire. Travailler la systématisation de ces vérifications renforcerait significativement votre posture.",
        keywords: ["Prudence formelle", "Relâchement informel", "Urgence influençante"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vous partagez l'information avec rigueur et discernement",
        summary: "Vous ne vous fiez pas à la confiance relationnelle pour décider ce que vous partagez — vous vérifiez les procédures, les canaux et les droits.",
        description: "Votre approche du partage d'information est structurée par le contenu, pas par la relation. Vous choisissez le bon canal, limitez les données aux stricts besoins et vérifiez les autorisations — même avec des partenaires habituels.",
        keywords: ["Rigueur informationnelle", "Canal approprié", "Droits vérifiés"]
      }
    ],
    "reagir-signaler": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "La réaction aux incidents numériques est encore difficile",
        summary: "Plusieurs freins sont actifs : incertitude sur la gravité, gêne d'avoir provoqué l'incident, canal de signalement inconnu.",
        description: "Ne pas savoir quoi faire face à un incident numérique est très courant. La gêne, l'incertitude et la peur de l'escalade sont les freins les plus documentés. Un cadre clair et une culture d'équipe sans culpabilisation font toute la différence.",
        keywords: ["Canal inconnu", "Gêne bloquante", "Freins actifs"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Vous signalez dans les cas clairs mais hésitez dans l'ambiguïté",
        summary: "Votre réaction est rapide face aux incidents évidents, mais l'incertitude sur la gravité freine votre passage à l'acte.",
        description: "La fenêtre de temps entre un incident numérique et son signalement est souvent critique. Vous avez les bons réflexes dans les situations nettes — l'enjeu est d'élargir ce réflexe aux situations ambiguës, qui sont précisément les plus fréquentes.",
        keywords: ["Hésitation dans l'ambiguïté", "Attente de certitude", "Réactivité à accélérer"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vous réagissez vite et sans attendre la certitude",
        summary: "Vous n'évaluez pas seul l'ampleur d'un incident — vous alertez et laissez les spécialistes qualifier.",
        description: "Votre posture face aux incidents numériques est celle qui protège le mieux votre organisation : signaler sans attendre d'être certain, documenter ce qui s'est passé, mobiliser les bons canaux. Un signalement sans suite est infiniment moins grave qu'un incident non signalé.",
        keywords: ["Réaction immédiate", "Signal sans certitude", "Bons canaux"]
      }
    ]
  };

  const CQ = {
    "reflexes-cybersecurite": {
      "reperer-signaux": [
        cq("rc-1-1", "Vous recevez un email urgent de votre direction demandant un virement vers un nouveau compte fournisseur, avec la mention « ne pas en parler à la comptabilité ». Quelle est votre réaction ?",
          [{ text: "Je traite rapidement — la direction a ses raisons.", score: 0 },
           { text: "Je vérifie l'adresse email et rappelle le signataire pour confirmer.", score: 1 },
           { text: "Je refuse d'agir et signale — urgence et confidentialité combinées sont un signal classique de fraude.", score: 2 }]),
        lq("rc-1-2", "À quelle fréquence prenez-vous le temps de lire l'adresse email complète de l'expéditeur, et pas seulement le nom affiché ?"),
        cq("rc-1-3", "Un SMS vous informe que votre colis est bloqué en douane — 1,90 € à régler via un lien. Vous attendez effectivement une livraison. Que faites-vous ?",
          [{ text: "Je clique et règle — la somme est dérisoire et le timing coïncide.", score: 0 },
           { text: "Je vérifie l'URL du lien avant de cliquer.", score: 1 },
           { text: "Je contacte le transporteur directement via son site officiel pour vérifier.", score: 2 }]),
        cq("rc-1-4", "Un collègue vous envoie une pièce jointe « à traiter en urgence ». Son adresse email est correcte, mais son style d'écriture est inhabituellement bref. Que faites-vous ?",
          [{ text: "J'ouvre — l'adresse email est la bonne.", score: 0 },
           { text: "Je lui réponds pour vérifier si c'est bien lui qui a envoyé ce message.", score: 1 },
           { text: "Je l'appelle directement pour confirmer avant d'ouvrir quoi que ce soit.", score: 2 }]),
        lq("rc-1-5", "Lorsqu'une demande numérique vous met sous pression temporelle, à quelle fréquence prenez-vous quand même le temps d'en vérifier la légitimité ?")
      ],
      "proteger-acces": [
        cq("rc-2-1", "Vous partez en réunion pour 30 minutes. Votre session est ouverte sur des documents internes sensibles. Que faites-vous ?",
          [{ text: "Je minimise les fenêtres — je reviens vite.", score: 0 },
           { text: "Je verrouille si j'y pense.", score: 1 },
           { text: "Je verrouille systématiquement, quelle que soit la durée.", score: 2 }]),
        lq("rc-2-2", "À quelle fréquence verrouillez-vous votre poste de travail dès que vous vous en éloignez ?"),
        cq("rc-2-3", "Un collègue vous demande de lui « prêter votre session » deux minutes pendant que la sienne est en maintenance. Que faites-vous ?",
          [{ text: "Je lui prête — c'est un collègue de confiance.", score: 0 },
           { text: "Je reste à côté pendant qu'il utilise ma session.", score: 0 },
           { text: "Je refuse et l'oriente vers le support IT pour un accès temporaire.", score: 1 },
           { text: "Je refuse catégoriquement — prêter sa session expose ses accès et ses traces d'activité.", score: 2 }]),
        cq("rc-2-4", "Vous trouvez une clé USB non identifiée dans l'espace commun. Que faites-vous ?",
          [{ text: "Je la branche pour identifier son propriétaire.", score: 0 },
           { text: "Je la dépose à l'accueil.", score: 1 },
           { text: "Je la remets à la sécurité informatique sans la brancher.", score: 2 }]),
        cq("rc-2-5", "Un email vous invite à renouveler votre mot de passe. Comment créez-vous le nouveau ?",
          [{ text: "Je change uniquement un caractère — la règle est respectée.", score: 0 },
           { text: "Je crée un mot de passe proche de l'ancien, avec une variation reconnaissable.", score: 0 },
           { text: "Je crée un nouveau mot de passe complexe, sans lien avec le précédent.", score: 1 },
           { text: "Je génère un mot de passe fort et unique, stocké dans un gestionnaire.", score: 2 }])
      ],
      "partager-discernement": [
        cq("rc-3-1", "Vous devez transmettre un document confidentiel à un partenaire externe. Comment procédez-vous ?",
          [{ text: "Je l'envoie en pièce jointe par email — c'est le plus rapide.", score: 0 },
           { text: "Je vérifie bien l'adresse du destinataire avant d'envoyer.", score: 1 },
           { text: "J'utilise le canal sécurisé ou l'espace partagé préconisé par mon organisation.", score: 2 }]),
        lq("rc-3-2", "À quelle fréquence vérifiez-vous la liste des destinataires avant d'envoyer un fichier interne ?"),
        cq("rc-3-3", "Un partenaire habituel demande par email un extrait de votre base clients pour préparer une proposition commerciale. Que faites-vous ?",
          [{ text: "Je lui envoie un extrait — c'est un partenaire de confiance.", score: 0 },
           { text: "Je lui envoie des données anonymisées.", score: 1 },
           { text: "Je vérifie si un accord encadrant le partage de données est en place avant d'envoyer quoi que ce soit.", score: 2 }]),
        cq("rc-3-4", "Vous partagez un document sur un outil collaboratif. Par défaut, il est accessible à toute l'organisation. Que faites-vous ?",
          [{ text: "Je laisse les droits par défaut — ça facilite la collaboration.", score: 0 },
           { text: "Je vérifie si le contenu justifie une restriction d'accès.", score: 1 },
           { text: "Je définis systématiquement les droits d'accès selon le contenu, avant de partager.", score: 2 }]),
        lq("rc-3-5", "Lorsque vous participez à une réunion vidéo depuis un espace ouvert, à quelle fréquence vérifiez-vous que personne ne peut vous entendre ?")
      ],
      "reagir-signaler": [
        cq("rc-4-1", "Vous pensez avoir cliqué sur un lien malveillant. Rien n'est apparu visuellement. Que faites-vous ?",
          [{ text: "Je ne fais rien — si rien ne s'est passé visuellement, il n'y a probablement pas de problème.", score: 0 },
           { text: "Je ferme le navigateur et lance un antivirus.", score: 1 },
           { text: "J'alerte immédiatement, déconnecte mon poste du réseau si possible et décris précisément ce qui s'est passé.", score: 2 }]),
        lq("rc-4-2", "À quelle fréquence signalez-vous un incident numérique, même mineur, plutôt que de le gérer seul ?"),
        cq("rc-4-3", "Un incident numérique vous implique directement. Aucune conséquence visible pour l'instant. Que faites-vous ?",
          [{ text: "J'attends de voir si des conséquences apparaissent.", score: 0 },
           { text: "J'en parle discrètement à un collègue technique de confiance.", score: 1 },
           { text: "Je signale immédiatement à la sécurité informatique, en documentant précisément ce qui s'est passé.", score: 2 }]),
        cq("rc-4-4", "Un appel prétendument du support IT vous demande votre mot de passe pour résoudre un problème critique. L'interlocuteur connaît votre nom et votre manager. Que faites-vous ?",
          [{ text: "Je donne le mot de passe — il connaît des détails internes.", score: 0 },
           { text: "Je refuse et rappelle le numéro officiel du support pour vérifier.", score: 1 },
           { text: "Je refuse catégoriquement, raccroche et signale l'appel immédiatement.", score: 2 }]),
        lq("rc-4-5", "À quelle fréquence savez-vous exactement quel canal ou quelle personne contacter en cas d'incident numérique dans votre organisation ?")
      ]
    },
    "fraude-phishing": {
      "reperer-signaux": [
        cq("fp-1-1", "Un email prétend venir d'un service interne avec le logo de votre entreprise, mais le domaine est légèrement différent (@mon-entreprise.net au lieu de @mon-entreprise.fr). Que faites-vous ?",
          [{ text: "Je réponds — le logo et le contenu semblent authentiques.", score: 0 },
           { text: "Je vérifie le domaine mais suppose que c'est une erreur d'affichage.", score: 1 },
           { text: "Je ne donne pas suite et signale l'email à la sécurité informatique.", score: 2 }]),
        lq("fp-1-2", "À quelle fréquence vérifiez-vous l'URL d'un site avant d'y saisir vos identifiants ?"),
        cq("fp-1-3", "Une demande urgente vous arrive via un canal inhabituel — email personnel au lieu des outils d'entreprise. L'expéditeur semble connu. Que faites-vous ?",
          [{ text: "Je traite — une panne technique peut expliquer l'utilisation d'un canal alternatif.", score: 0 },
           { text: "Je traite prudemment sans partager d'informations sensibles.", score: 1 },
           { text: "Je refuse d'agir via ce canal — un canal inhabituel est en lui-même un signal d'alarme.", score: 2 }]),
        cq("fp-1-4", "Lors d'un test de phishing interne, vous avez cliqué sur le faux lien. Comment réagissez-vous ?",
          [{ text: "Je suis gêné et préfère ne pas en parler.", score: 0 },
           { text: "Je regarde le corrigé pour comprendre ce que j'ai manqué.", score: 1 },
           { text: "Je regarde le corrigé, en tire un apprentissage et le partage avec mes collègues.", score: 2 }]),
        lq("fp-1-5", "À quelle fréquence remettez-vous en question la légitimité d'une demande numérique, même si elle vient d'une personne de confiance ?")
      ],
      "proteger-acces": [
        cq("fp-2-1", "Un email de votre « banque professionnelle » signale une activité suspecte et vous demande de vous connecter via un lien pour confirmer vos accès. Que faites-vous ?",
          [{ text: "Je clique et me reconnecte — mieux vaut vérifier rapidement.", score: 0 },
           { text: "Je vérifie l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je me connecte directement via mon signet habituel, sans utiliser le lien de l'email.", score: 2 }]),
        lq("fp-2-2", "À quelle fréquence vérifiez-vous qu'un site est bien sécurisé (HTTPS) avant d'y saisir des identifiants ?"),
        cq("fp-2-3", "Vous recevez un code de double authentification alors que vous ne vous connectez pas. Que faites-vous ?",
          [{ text: "Je valide — c'est peut-être une mise à jour système automatique.", score: 0 },
           { text: "J'ignore le message et attends de voir.", score: 1 },
           { text: "Je ne valide pas et signale immédiatement à la sécurité informatique.", score: 2 }]),
        cq("fp-2-4", "On vous propose de « tester une nouvelle fonctionnalité » de votre outil habituel via un lien. Rien n'a été annoncé en interne. Que faites-vous ?",
          [{ text: "Je clique et teste — ça semble pratique.", score: 0 },
           { text: "Je vérifie l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je signale le message à la sécurité informatique sans y donner suite.", score: 2 }]),
        lq("fp-2-5", "À quelle fréquence mettez-vous à jour vos mots de passe professionnels sans attendre d'y être obligé ?")
      ],
      "partager-discernement": [
        cq("fp-3-1", "Un interlocuteur inconnu prétend être le nouveau responsable d'un compte client et vous demande de mettre à jour ses coordonnées bancaires. Que faites-vous ?",
          [{ text: "Je mets à jour — ce type de changement arrive régulièrement.", score: 0 },
           { text: "Je lui demande de confirmer par email depuis l'adresse officielle de l'entreprise.", score: 1 },
           { text: "J'appelle le client via le numéro enregistré dans nos systèmes pour confirmer le changement.", score: 2 }]),
        lq("fp-3-2", "À quelle fréquence utilisez-vous un canal de vérification indépendant de la demande elle-même pour confirmer l'identité d'un interlocuteur ?"),
        cq("fp-3-3", "Une demande urgente est accompagnée d'une preuve — capture d'écran ou PDF officiel. Comment la traitez-vous ?",
          [{ text: "Je l'accepte — une pièce justificative renforce la légitimité.", score: 0 },
           { text: "Je la prends en compte sans m'y fier entièrement.", score: 1 },
           { text: "Je vérifie directement auprès de la source — les preuves numériques se falsifient facilement.", score: 2 }]),
        cq("fp-3-4", "Votre organisation vient d'envoyer une communication officielle. Le lendemain, un email « complémentaire » arrive avec un lien vers les nouvelles directives. Que faites-vous ?",
          [{ text: "Je clique — le timing avec la communication officielle est convaincant.", score: 0 },
           { text: "Je cherche dans mes emails la communication officielle pour comparer.", score: 1 },
           { text: "J'accède aux directives via les canaux internes officiels, sans utiliser le lien de cet email.", score: 2 }]),
        lq("fp-3-5", "À quelle fréquence prenez-vous conscience que la confiance accordée à un interlocuteur habituel peut être exploitée par quelqu'un qui a fait ses recherches ?")
      ],
      "reagir-signaler": [
        cq("fp-4-1", "Une tentative de phishing bien construite vous a presque eu — vous avez cliqué mais arrêté à temps. Comment réagissez-vous ?",
          [{ text: "Je suis gêné et n'en parle pas.", score: 0 },
           { text: "J'en parle à un collègue de confiance.", score: 1 },
           { text: "Je le signale à la sécurité informatique pour qu'ils alertent les autres.", score: 2 }]),
        lq("fp-4-2", "À quelle fréquence partagez-vous avec vos collègues les tentatives de phishing que vous avez reçues ?"),
        cq("fp-4-3", "Vous avez traité une demande urgente qui s'avère être une tentative de fraude. Comment réagissez-vous face à vous-même ?",
          [{ text: "Je m'en veux — j'aurais dû voir.", score: 0 },
           { text: "Je l'accepte — ces attaques sont de mieux en mieux construites.", score: 1 },
           { text: "J'analyse factuellement ce qui s'est passé et en fais un apprentissage partagé avec mon équipe.", score: 2 }]),
        cq("fp-4-4", "Suite à un incident cyber, de nouvelles consignes de sécurité contraignantes sont diffusées. Quelle est votre réaction ?",
          [{ text: "Je les applique mollement en attendant qu'elles soient allégées.", score: 0 },
           { text: "Je les applique strictement pendant la période critique.", score: 1 },
           { text: "Je les applique et contribue aux retours d'expérience pour les améliorer si elles s'avèrent inadaptées.", score: 2 }]),
        lq("fp-4-5", "À quelle fréquence participez-vous aux exercices de phishing ou simulations d'incidents organisés dans votre structure ?")
      ]
    },
    "mots-de-passe-acces": {
      "reperer-signaux": [
        cq("mp-1-1", "Vous recevez un email de « votre service IT » vous demandant de réinitialiser votre mot de passe suite à une mise à jour critique. Que faites-vous ?",
          [{ text: "Je clique sur le lien et réinitialise — le service IT envoie ce genre de demandes.", score: 0 },
           { text: "Je vérifie l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je contacte le service IT via l'intranet ou le téléphone pour confirmer avant toute action.", score: 2 }]),
        lq("mp-1-2", "À quelle fréquence vérifiez-vous que les demandes liées à vos accès viennent bien des canaux officiels ?"),
        cq("mp-1-3", "Vous constatez des tentatives de connexion inhabituelles sur votre compte professionnel — heure décalée, localisation étrangère. Que faites-vous ?",
          [{ text: "Je surveille quelques jours pour voir si ça recommence.", score: 0 },
           { text: "Je change mon mot de passe en guise de précaution.", score: 1 },
           { text: "Je change immédiatement mon mot de passe, active le 2FA si ce n'est pas fait et signale à la sécurité informatique.", score: 2 }]),
        cq("mp-1-4", "Un email vous annonce que votre compte sera désactivé dans 24h si vous ne cliquez pas sur un lien de validation. Que faites-vous ?",
          [{ text: "Je clique rapidement pour éviter la désactivation.", score: 0 },
           { text: "Je vérifie attentivement l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je contacte directement le service IT via l'intranet, sans utiliser aucun lien de l'email.", score: 2 }]),
        lq("mp-1-5", "À quelle fréquence vous interrogez-vous sur la façon dont vos accès pourraient être compromis, indépendamment de tout incident récent ?")
      ],
      "proteger-acces": [
        cq("mp-2-1", "Vous utilisez le même mot de passe « fort » sur plusieurs outils professionnels parce qu'il est complexe à retenir. Quelle est votre position sur cette pratique ?",
          [{ text: "C'est raisonnable — un mot de passe fort vaut mieux que plusieurs faibles.", score: 0 },
           { text: "Ce n'est pas idéal, mais les outils internes sont suffisamment sécurisés.", score: 0 },
           { text: "Je le sais problématique et compte diversifier prochainement.", score: 1 },
           { text: "Je diversifie activement et utilise un gestionnaire de mots de passe.", score: 2 }]),
        lq("mp-2-2", "À quelle fréquence utilisez-vous un gestionnaire de mots de passe pour vos accès professionnels ?"),
        cq("mp-2-3", "En télétravail, vous vous connectez depuis un réseau non maîtrisé — café, hôtel. Quelle est votre pratique ?",
          [{ text: "Je me connecte directement — les outils d'entreprise ont leur propre chiffrement.", score: 0 },
           { text: "J'évite les contenus les plus sensibles sur ces réseaux.", score: 1 },
           { text: "J'active systématiquement le VPN de l'entreprise avant toute connexion depuis un réseau non maîtrisé.", score: 2 }]),
        cq("mp-2-4", "On vous demande de créer un mot de passe pour un nouvel outil professionnel. Quelle est votre approche ?",
          [{ text: "Je crée un mot de passe mémorisable basé sur des informations personnelles — prénom, date.", score: 0 },
           { text: "Je mélange lettres, chiffres et caractères spéciaux sur un mot personnel.", score: 1 },
           { text: "Je génère un mot de passe long et aléatoire, stocké dans un gestionnaire dédié.", score: 2 }]),
        lq("mp-2-5", "À quelle fréquence activez-vous le 2FA sur les outils où il est disponible, sans attendre qu'on vous le demande ?")
      ],
      "partager-discernement": [
        cq("mp-3-1", "Un nouveau prestataire a besoin d'accéder temporairement à un outil interne. Comment gérez-vous cela ?",
          [{ text: "Je lui crée un accès avec mes propres identifiants — c'est plus rapide.", score: 0 },
           { text: "Je lui crée un compte temporaire personnel.", score: 1 },
           { text: "Je fais la demande d'un accès nominatif via le processus officiel, avec des droits limités à ses besoins.", score: 2 }]),
        lq("mp-3-2", "À quelle fréquence supprimez-vous les accès dont vous n'avez plus besoin, sans attendre qu'on vous le demande ?"),
        cq("mp-3-3", "En fin de collaboration avec un prestataire, vous oubliez de supprimer son accès. Vous le réalisez deux semaines plus tard. Que faites-vous ?",
          [{ text: "Vous laissez — le prestataire est de confiance.", score: 0 },
           { text: "Vous supprimez l'accès sans en parler.", score: 1 },
           { text: "Vous supprimez l'accès, vérifiez les logs d'activité et signalez l'oubli à votre responsable.", score: 2 }]),
        cq("mp-3-4", "Un collègue vous dit utiliser le même mot de passe sur tous ses outils professionnels parce qu'il est « complexe ». Que faites-vous ?",
          [{ text: "Vous ne dites rien — c'est sa responsabilité.", score: 0 },
           { text: "Vous lui expliquez brièvement pourquoi c'est risqué.", score: 1 },
           { text: "Vous lui expliquez les risques concrets et lui recommandez un gestionnaire de mots de passe.", score: 2 }]),
        lq("mp-3-5", "À quelle fréquence vérifiez-vous que les accès que vous détenez sont encore justifiés par vos missions actuelles ?")
      ],
      "reagir-signaler": [
        cq("mp-4-1", "Vous suspectez que votre mot de passe professionnel a été compromis — quelqu'un a peut-être vu votre écran. Que faites-vous ?",
          [{ text: "Je surveille quelques jours pour voir si quelque chose d'anormal se produit.", score: 0 },
           { text: "Je change immédiatement mon mot de passe.", score: 1 },
           { text: "Je change immédiatement mon mot de passe et en informe la sécurité informatique.", score: 2 }]),
        lq("mp-4-2", "À quelle fréquence signalez-vous immédiatement une suspicion de compromission de vos accès, sans attendre d'en être certain ?"),
        cq("mp-4-3", "Vous avez partagé un accès professionnel en situation d'urgence et réalisez ensuite que c'était une erreur. Que faites-vous ?",
          [{ text: "Vous ne dites rien — la situation était exceptionnelle et tout s'est bien passé.", score: 0 },
           { text: "Vous changez votre mot de passe en guise de précaution.", score: 1 },
           { text: "Vous changez le mot de passe, signalez l'incident et attendez une validation avant de reprendre l'outil.", score: 2 }]),
        cq("mp-4-4", "Un email de phishing ciblant les mots de passe est en circulation dans votre organisation. Un collègue ne semble pas au courant. Que faites-vous ?",
          [{ text: "Vous espérez que les équipes IT l'ont prévenu.", score: 0 },
           { text: "Vous lui signalez rapidement l'existence de la menace.", score: 1 },
           { text: "Vous lui signalez et lui transmettez les caractéristiques concrètes pour qu'il puisse reconnaître l'email.", score: 2 }]),
        lq("mp-4-5", "À quelle fréquence vous tenez-vous informé des nouvelles menaces liées aux mots de passe et aux accès ?")
      ]
    },
    "donnees-confidentielles": {
      "reperer-signaux": [
        cq("dc-1-1", "Un partenaire vous demande par email des informations sur les processus internes de votre organisation, en invoquant un audit de conformité. Que faites-vous ?",
          [{ text: "Je réponds — l'audit de conformité est une démarche normale.", score: 0 },
           { text: "Je transmets les informations générales sans entrer dans les détails sensibles.", score: 1 },
           { text: "Je vérifie l'identité du demandeur et la légitimité de la démarche avant toute réponse.", score: 2 }]),
        lq("dc-1-2", "À quelle fréquence identifiez-vous le degré de sensibilité d'une information avant de la transmettre ?"),
        cq("dc-1-3", "Un prestataire habituel vous demande, pour aller plus vite, des données auxquelles il n'a normalement pas accès. Que faites-vous ?",
          [{ text: "Je lui communique — c'est un partenaire de confiance.", score: 0 },
           { text: "Je lui donne accès à une partie des données demandées.", score: 1 },
           { text: "Je refuse, l'oriente vers le canal officiel et signale la demande atypique à mon responsable.", score: 2 }]),
        cq("dc-1-4", "Lors d'un déplacement, vous réalisez que quelqu'un photographie discrètement les plans affichés dans votre salle de réunion. Que faites-vous ?",
          [{ text: "Vous l'ignorez — les plans affichés ne semblent pas sensibles.", score: 0 },
           { text: "Vous lui demandez discrètement ce qu'il fait.", score: 1 },
           { text: "Vous interrompez la prise de vue et en informez immédiatement le responsable de la réunion.", score: 2 }]),
        lq("dc-1-5", "À quelle fréquence signalez-vous une demande d'information qui vous semble excessive ou hors cadre ?")
      ],
      "proteger-acces": [
        cq("dc-2-1", "Des plans ou schémas sensibles sont affichés dans une salle de réunion accessible aux visiteurs. Que faites-vous ?",
          [{ text: "Vous n'y prêtez pas attention — si c'est affiché, c'est acceptable.", score: 0 },
           { text: "Vous y pensez mais ne faites rien — ce n'est pas directement votre responsabilité.", score: 1 },
           { text: "Vous signalez la situation au responsable des lieux avant toute réunion avec des visiteurs.", score: 2 }]),
        lq("dc-2-2", "À quelle fréquence vérifiez-vous qu'aucun document sensible n'est visible par des personnes non habilitées depuis votre espace de travail ?"),
        cq("dc-2-3", "En open space, un visiteur accompagné circule dans la zone pendant que vous traitez des données sensibles. Comment réagissez-vous ?",
          [{ text: "Je continue normalement — il est accompagné.", score: 0 },
           { text: "Je retourne les documents les plus sensibles.", score: 1 },
           { text: "Je réduis systématiquement l'exposition des données sensibles dès qu'une personne non habilitée est présente.", score: 2 }]),
        cq("dc-2-4", "Vous êtes en télétravail et rejoignez une réunion vidéo sensible depuis un espace partagé. Que faites-vous ?",
          [{ text: "Je rejoins normalement — je suis dans un espace de travail professionnel.", score: 0 },
           { text: "Je baisse le son et veille à ne pas afficher de documents sensibles.", score: 1 },
           { text: "Je reporte ou quitte l'espace partagé avant de rejoindre la réunion.", score: 2 }]),
        lq("dc-2-5", "À quelle fréquence adaptez-vous vos pratiques de travail en fonction du niveau de sensibilité des données que vous traitez ?")
      ],
      "partager-discernement": [
        cq("dc-3-1", "Un client vous demande une copie des données personnelles le concernant. Que faites-vous ?",
          [{ text: "Je lui envoie directement les données demandées — c'est son droit.", score: 0 },
           { text: "Je vérifie son identité avant d'envoyer.", score: 1 },
           { text: "Je vérifie son identité et suis la procédure prévue pour ce type de demande (droits RGPD).", score: 2 }]),
        lq("dc-3-2", "À quelle fréquence consultez-vous le cadre applicable (politique interne, RGPD, contrat) avant de transmettre des données à un tiers ?"),
        cq("dc-3-3", "Vous devez partager des données personnelles avec un sous-traitant. Comment procédez-vous ?",
          [{ text: "Je lui envoie les données par email — il traite régulièrement avec nous.", score: 0 },
           { text: "Je chiffre le fichier avant de l'envoyer.", score: 1 },
           { text: "Je m'assure de l'accord de traitement, utilise le canal sécurisé préconisé et limite les données aux stricts besoins.", score: 2 }]),
        cq("dc-3-4", "Un collègue vous demande d'accéder à des données clients auxquelles il n'a normalement pas accès, pour une situation exceptionnelle. Que faites-vous ?",
          [{ text: "Je lui donne accès — je lui fais confiance et la situation le justifie.", score: 0 },
           { text: "Je lui donne accès en notant la situation.", score: 1 },
           { text: "Je refuse et l'oriente vers la procédure de demande d'accès exceptionnel prévue.", score: 2 }]),
        lq("dc-3-5", "À quelle fréquence vous assurez-vous que les données que vous traitez ne restent pas accessibles plus longtemps que nécessaire ?")
      ],
      "reagir-signaler": [
        cq("dc-4-1", "Vous réalisez avoir envoyé un email contenant des données sensibles au mauvais destinataire. Que faites-vous ?",
          [{ text: "J'envoie un email au mauvais destinataire pour lui demander de l'ignorer.", score: 0 },
           { text: "Je contacte le mauvais destinataire et préviens mon responsable.", score: 1 },
           { text: "Je contacte le mauvais destinataire, préviens mon responsable et signale l'incident via la procédure prévue (DPO si nécessaire).", score: 2 }]),
        lq("dc-4-2", "À quelle fréquence signalez-vous un incident de données, même mineur, via les canaux prévus plutôt que de le gérer seul ?"),
        cq("dc-4-3", "Lors d'un audit, vous réalisez que des données personnelles sont stockées dans un outil non autorisé depuis des mois. Que faites-vous ?",
          [{ text: "Vous régularisez en silence — ça n'a causé aucun problème visible.", score: 0 },
           { text: "Vous migrez les données et en informez votre responsable.", score: 1 },
           { text: "Vous migrez les données, informez votre responsable et signalez l'incident selon la procédure de gestion des incidents de données.", score: 2 }]),
        cq("dc-4-4", "Votre organisation subit une fuite de données. On vous demande de recenser vos partages récents avec des tiers. Comment procédez-vous ?",
          [{ text: "Je reconstitue de mémoire autant que possible.", score: 0 },
           { text: "Je cherche dans mes emails et documents les transmissions des dernières semaines.", score: 1 },
           { text: "Je reconstitue méthodiquement à partir des emails, des outils de partage et des logs d'accès disponibles.", score: 2 }]),
        lq("dc-4-5", "À quelle fréquence tenez-vous un suivi de ce que vous partagez avec des tiers, permettant de le retracer en cas d'incident ?")
      ]
    }
  };

  const CYBER_CHAPTER_DEFS_BY_AD = {
  "reflexes-cybersecurite": [
    ["reperer-signaux", "Repérer les situations à risque", "Identifier les signaux numériques sensibles dans les situations du quotidien."],
    ["proteger-acces", "Adopter les bons réflexes de protection", "Protéger ses accès, ses appareils et ses habitudes numériques."],
    ["partager-discernement", "Partager sans exposer inutilement", "Limiter les risques liés aux documents, destinataires et canaux de partage."],
    ["reagir-signaler", "Réagir sans paniquer", "Savoir quoi faire en cas de doute, d’erreur ou d’incident numérique."]
  ],

  "fraude-phishing": [
    ["reperer-signaux", "Détecter une tentative de manipulation", "Repérer les faux signaux de confiance, les demandes atypiques et les indices de fraude."],
    ["proteger-acces", "Résister aux pièges de connexion", "Éviter de saisir ses identifiants sur de faux liens ou de faux espaces sécurisés."],
    ["partager-discernement", "Vérifier avant d’agir", "Confirmer une identité, une demande urgente ou une preuve numérique avant toute action."],
    ["reagir-signaler", "Signaler et apprendre de l’incident", "Transformer une tentative de fraude ou un clic à risque en apprentissage collectif."]
  ],

  "mots-de-passe-acces": [
    ["reperer-signaux", "Repérer les alertes sur ses accès", "Identifier les demandes suspectes, connexions inhabituelles et signaux de compromission."],
    ["proteger-acces", "Créer et sécuriser ses mots de passe", "Utiliser des mots de passe robustes, uniques et protégés par les bons outils."],
    ["partager-discernement", "Gérer les droits et accès temporaires", "Limiter les accès aux besoins réels, éviter les partages et supprimer les accès inutiles."],
    ["reagir-signaler", "Réagir à une compromission", "Changer, signaler et sécuriser ses accès dès qu’un doute apparaît."]
  ],

  "donnees-confidentielles": [
    ["reperer-signaux", "Identifier les informations sensibles", "Reconnaître les données, documents ou demandes qui nécessitent une vigilance particulière."],
    ["proteger-acces", "Limiter l’exposition des données", "Éviter que des informations sensibles soient visibles, accessibles ou partagées hors cadre."],
    ["partager-discernement", "Choisir le bon canal de transmission", "Partager les données avec les bons droits, les bons destinataires et les bons outils."],
    ["reagir-signaler", "Réagir à une fuite ou une erreur de partage", "Signaler rapidement une erreur d’envoi, un accès non autorisé ou un incident de données."]
  ]
};

function buildCyberChapters(adId) {
  const defs = CYBER_CHAPTER_DEFS_BY_AD[adId] || CYBER_CHAPTER_DEFS_BY_AD["reflexes-cybersecurite"];

  return defs.map(function (def, i) {
    return {
      id:          adId + "-chap-" + (i + 1),
      title:       def[1],
      description: def[2],
      questions:   CQ[adId][def[0]],
      profiles:    CYBER_PROFILES[def[0]]
    };
  });
}

  // ─────────────────────────────────────────────────────────────────────────
  //  CATALOGUE RAW
  // ─────────────────────────────────────────────────────────────────────────

const CUSTOM_QUESTIONS = {

  "culture-securite-terrain": {
    0: [
        {
          text: "Vous arrivez sur un poste de travail qu'un collègue vient de quitter. Il dit que tout est en ordre. Que faites-vous avant de démarrer ?",
          answers: [
          {text: "Je fais confiance à son évaluation et commence directement.", score: 0},
          {text: "Je fais un tour d'œil rapide sur les points qui me semblent essentiels.", score: 1},
          {text: "Je réalise ma propre vérification systématique, quelle que soit l'information transmise.", score: 2}
          ]
        },
        {
          text: "En cours d'opération, vous remarquez que l'éclairage de votre zone a baissé significativement. Ce n'est pas dangereux immédiatement, mais c'est inhabituellement sombre. Quelle est votre réaction ?",
          answers: [
          {text: "Je continue — ce n'est pas un risque direct.", score: 0},
          {text: "Je note le problème pour en parler à la fin de mon poste.", score: 1},
          {text: "Je signale immédiatement et attends que la situation soit clarifiée avant de reprendre.", score: 2}
          ]
        },
        {
          text: "Vous observez qu'un produit chimique est stocké à côté d'un équipement électrique, contrairement aux consignes. Personne d'autre ne semble y prêter attention. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — ce n'est pas ma zone directe.", score: 0},
          {text: "J'en parle à un collègue proche sans formaliser.", score: 1},
          {text: "Je signale l'anomalie et m'assure qu'elle est corrigée ou remontée.", score: 2}
          ]
        },
        {
          text: "Un collègue vous explique qu'il a modifié légèrement une procédure pour gagner du temps. Selon lui, le résultat est identique et c'est plus pratique. Quelle est votre réaction ?",
          answers: [
          {text: "Je l'imite si la méthode semble efficace.", score: 0},
          {text: "Je l'écoute mais continue avec la procédure officielle sans intervenir.", score: 1},
          {text: "Je lui signale que tout écart à la procédure doit être validé avant d'être appliqué.", score: 2}
          ]
        },
        {
          text: "Une zone habituellement interdite est accessible car le cadenas est cassé. Vous devez passer à côté. Que faites-vous ?",
          answers: [
          {text: "Je passe sans m'arrêter — je ne vais pas y entrer.", score: 0},
          {text: "Je fais attention en passant et en informe un collègue.", score: 1},
          {text: "Je signale immédiatement que l'accès n'est plus sécurisé.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous portez vos EPI depuis plusieurs heures. Ils sont inconfortables et vous avez chaud. Vous êtes seul dans la zone pour quelques minutes. Que faites-vous ?",
          answers: [
          {text: "Je retire ce qui me gêne le plus — juste quelques minutes.", score: 0},
          {text: "Je tiens encore un peu mais c'est difficile.", score: 1},
          {text: "Je maintiens l'ensemble de mes EPI : l'inconfort ne justifie pas de s'exposer.", score: 2}
          ]
        },
        {
          text: "Votre responsable vous demande d'accélérer pour rattraper le retard du planning. Une étape de vérification prend habituellement 10 minutes. Il dit qu'on peut l'alléger cette fois. Que faites-vous ?",
          answers: [
          {text: "J'allège la vérification pour tenir le délai.", score: 0},
          {text: "Je fais une vérification rapide sans appliquer toute la procédure.", score: 1},
          {text: "Je maintiens la procédure complète et informe mon responsable du délai que ça implique.", score: 2}
          ]
        },
        {
          text: "Vous devez réaliser une tâche avec un équipement que vous connaissez bien mais dont la vérification périodique est dépassée de quelques jours. L'équipement fonctionne normalement. Que faites-vous ?",
          answers: [
          {text: "Je l'utilise — il a l'air en bon état.", score: 0},
          {text: "Je l'utilise en faisant attention et signale le problème après.", score: 1},
          {text: "Je refuse de l'utiliser et remonte la situation avant de démarrer.", score: 2}
          ]
        },
        {
          text: "Lors d'une intervention en hauteur, vous réalisez que votre harnais n'est pas correctement ajusté. Vous avez déjà commencé à monter. Que faites-vous ?",
          answers: [
          {text: "Je fais attention et redescends dès que j'ai terminé.", score: 0},
          {text: "Je m'arrête à mi-hauteur et tente de réajuster sur place.", score: 1},
          {text: "Je redescends immédiatement pour ajuster l'équipement avant de remonter.", score: 2}
          ]
        },
        {
          text: "Un outil que vous utilisez régulièrement présente un léger défaut que vous avez appris à contourner. Personne d'autre n'est au courant. Que faites-vous ?",
          answers: [
          {text: "Je continue avec mon habitude de contournement — ça marche.", score: 0},
          {text: "J'en parle à un collègue mais sans le remonter officiellement.", score: 1},
          {text: "Je signale le défaut et utilise un autre outil jusqu'à réparation.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous êtes le plus expérimenté de votre équipe et un junior hésite à signaler une situation qu'il trouve risquée. Il vous demande si c'est vraiment nécessaire. Que lui répondez-vous ?",
          answers: [
          {text: "Je lui dis que si ça ne semble pas grave, inutile d'en faire une montagne.", score: 0},
          {text: "Je lui dis que c'est à lui de décider.", score: 1},
          {text: "Je l'encourage à signaler et l'aide à formuler son observation.", score: 2}
          ]
        },
        {
          text: "Votre équipe a développé une habitude informelle de ne pas faire le point sécurité quand la journée est chargée. Tout le monde a l'air de trouver ça normal. Quelle est votre position ?",
          answers: [
          {text: "Je m'aligne — si tout le monde fait pareil, c'est que c'est raisonnable.", score: 0},
          {text: "Je continue à faire mon propre point sans intervenir sur la dynamique collective.", score: 1},
          {text: "Je signale cette dérive à mon responsable ou la soulève lors d'un moment collectif.", score: 2}
          ]
        },
        {
          text: "Vous observez qu'un collègue réalise une tâche sans les protections adaptées. Il est plus ancien que vous et semble agacé quand on lui en parle. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — il connaît mieux le métier que moi.", score: 0},
          {text: "Je lui en parle rapidement sans insister.", score: 1},
          {text: "Je lui signale le risque de façon factuelle et, si nécessaire, je remonte la situation.", score: 2}
          ]
        },
        {
          text: "Après un incident mineur sans blessure, votre équipe reprend le travail rapidement. Personne ne parle de signalement. Que faites-vous ?",
          answers: [
          {text: "Je reprends le travail comme tout le monde.", score: 0},
          {text: "J'en parle discrètement à mon responsable.", score: 1},
          {text: "Je propose que l'incident soit formellement signalé, même sans blessure.", score: 2}
          ]
        },
        {
          text: "Un visiteur ou stagiaire dans votre zone ne porte pas ses EPI. Son accompagnateur ne réagit pas. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — ce n'est pas mon rôle de gérer les visiteurs.", score: 0},
          {text: "Je regarde si l'accompagnateur finit par intervenir.", score: 1},
          {text: "J'interpelle poliment le visiteur ou l'accompagnateur pour corriger la situation.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous avez observé une situation potentiellement dangereuse mais vous n'êtes pas certain qu'elle le soit vraiment. Vous hésitez à la signaler par peur de sembler alarmiste. Que faites-vous ?",
          answers: [
          {text: "Je ne signale pas — si je n'en suis pas sûr, mieux vaut ne rien dire.", score: 0},
          {text: "J'en parle informellement à un collègue.", score: 1},
          {text: "Je signale quand même en précisant mon niveau de certitude — c'est aux experts d'évaluer.", score: 2}
          ]
        },
        {
          text: "Vous signalez une anomalie et on vous répond que c'est connu et pas prioritaire. L'anomalie est toujours là deux semaines plus tard. Que faites-vous ?",
          answers: [
          {text: "J'attends — la décision appartient à la hiérarchie.", score: 0},
          {text: "J'en reparle à mon responsable en passant.", score: 1},
          {text: "Je relance formellement et demande un retour sur le traitement du signalement.", score: 2}
          ]
        },
        {
          text: "Lors d'un retour d'expérience collectif, l'ambiance pousse à ne pas trop creuser pour ne pas embarrasser quelqu'un. Comment réagissez-vous ?",
          answers: [
          {text: "Je reste silencieux — le collectif a décidé de passer à autre chose.", score: 0},
          {text: "Je soulève mon point discrètement après la réunion.", score: 1},
          {text: "J'insiste pour que les causes réelles soient examinées, même si c'est inconfortable.", score: 2}
          ]
        },
        {
          text: "Un presqu'accident s'est produit dans votre équipe et personne ne veut le mettre par écrit de peur des conséquences. Que faites-vous ?",
          answers: [
          {text: "Je respecte la décision collective — ce n'est pas à moi de prendre ce risque seul.", score: 0},
          {text: "Je le signale anonymement si je peux.", score: 1},
          {text: "Je signale formellement et explique à mes collègues pourquoi c'est important.", score: 2}
          ]
        },
        {
          text: "Votre entreprise a mis en place un outil de signalement numérique mais personne ne s'en sert vraiment. Que faites-vous ?",
          answers: [
          {text: "Je fais comme tout le monde et ne l'utilise pas.", score: 0},
          {text: "Je l'utilise pour moi mais n'en parle pas aux autres.", score: 1},
          {text: "Je l'utilise et partage avec mes collègues pourquoi ça aide l'équipe entière.", score: 2}
          ]
        }
    ],
  },

  "presquaccidents-signalement": {
    0: [
        {
          text: "Vous glissez légèrement sur le sol mouillé mais vous vous rattrapez sans vous blesser. Personne n'a vu. Que faites-vous ?",
          answers: [
          {text: "Rien — je ne me suis pas blessé.", score: 0},
          {text: "J'en parle à un collègue de façon informelle.", score: 1},
          {text: "Je signale formellement l'anomalie (sol glissant non signalé) pour prévenir un futur incident.", score: 2}
          ]
        },
        {
          text: "Vous oubliez de réenclencher un dispositif de sécurité après une intervention. Vous vous en rendez compte quelques minutes plus tard après l'avoir réactivé. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — j'ai corrigé moi-même.", score: 0},
          {text: "J'en parle à mon responsable de façon informelle.", score: 1},
          {text: "Je le consigne formellement comme presqu'accident pour que l'analyse soit faite.", score: 2}
          ]
        },
        {
          text: "Votre collègue vous raconte qu'une machine a failli lui tomber dessus mais qu'il a eu le bon réflexe. Il rigole en en parlant. Quelle est votre réaction ?",
          answers: [
          {text: "Je ris avec lui — tout va bien.", score: 0},
          {text: "Je lui dis qu'il a eu de la chance mais je n'insiste pas.", score: 1},
          {text: "Je l'encourage à signaler l'incident même si tout va bien — la chance n'est pas une barrière de sécurité.", score: 2}
          ]
        },
        {
          text: "Lors d'une opération, vous devez utiliser un équipement dont la sécurité n'était pas enclenchée. L'opération s'est bien passée. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — l'opération a réussi.", score: 0},
          {text: "Je m'assure de bien l'enclencher la prochaine fois.", score: 1},
          {text: "Je documente la situation comme presqu'accident pour analyser pourquoi la sécurité n'était pas en place.", score: 2}
          ]
        },
        {
          text: "Votre équipe vient de terminer un chantier sans accident. Vous vous souvenez d'au moins deux situations qui auraient pu mal tourner. Que faites-vous dans le bilan final ?",
          answers: [
          {text: "Je ne les mentionne pas — tout s'est bien terminé.", score: 0},
          {text: "J'en mentionne une, la plus sérieuse.", score: 1},
          {text: "Je les mentionne toutes les deux avec les détails utiles à l'analyse.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous voulez signaler un presqu'accident mais vous savez que ça va ralentir le planning du jour et votre responsable est sous pression. Que faites-vous ?",
          answers: [
          {text: "Je reporte le signalement à plus tard pour ne pas aggraver la situation.", score: 0},
          {text: "Je le signale mais en minimisant les détails pour que ça passe vite.", score: 1},
          {text: "Je le signale normalement — l'urgence opérationnelle ne change pas l'obligation de documenter.", score: 2}
          ]
        },
        {
          text: "Vous avez failli blesser un collègue par inattention. Il dit que ce n'est pas grave et qu'il n'y a pas besoin d'en faire une histoire. Que faites-vous ?",
          answers: [
          {text: "Je respecte son souhait — il est concerné au premier chef.", score: 0},
          {text: "Je lui demande de reconsidérer mais je m'arrête si il insiste.", score: 1},
          {text: "Je signale quand même l'incident — le signalement n'est pas une sanction, c'est une précaution.", score: 2}
          ]
        },
        {
          text: "Vous connaissez une zone à risque récurrent dans votre environnement de travail. Personne ne l'a encore officiellement signalé. Que faites-vous ?",
          answers: [
          {text: "J'attends qu'il y ait un incident pour que le signalement soit pris au sérieux.", score: 0},
          {text: "Je le mentionne verbalement à mon responsable.", score: 1},
          {text: "Je le documente formellement comme signal de risque récurrent.", score: 2}
          ]
        },
        {
          text: "Un prestataire dit ne pas être au courant qu'il devait remplir une fiche de signalement après un incident mineur. Que faites-vous ?",
          answers: [
          {text: "Je le laisse repartir — c'est à lui de connaître les règles.", score: 0},
          {text: "Je lui dis qu'il aurait dû mais ne l'aide pas davantage.", score: 1},
          {text: "Je lui explique le process et l'aide à remplir le document nécessaire.", score: 2}
          ]
        },
        {
          text: "Vous hésitez à signaler une situation parce que vous n'êtes pas sûr qu'elle entre dans la définition d'un presqu'accident. Que faites-vous ?",
          answers: [
          {text: "Je ne signale pas — mieux vaut ne pas créer de faux positifs.", score: 0},
          {text: "Je note l'information pour moi-même, sans la transmettre.", score: 1},
          {text: "Je signale en indiquant mon incertitude — c'est à la personne compétente de qualifier.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous devez rédiger un signalement mais vous ne vous souvenez plus précisément de certains détails. Que faites-vous ?",
          answers: [
          {text: "J'attends de me souvenir mieux avant de remplir le document.", score: 0},
          {text: "Je remplis avec ce dont je me souviens sans préciser les zones d'incertitude.", score: 1},
          {text: "Je remplis avec ce que je sais et j'indique clairement ce que je ne suis pas certain de mémoriser exactement.", score: 2}
          ]
        },
        {
          text: "Dans votre signalement, vous devez mentionner qu'un collègue n'avait pas appliqué une procédure. Il est ami avec votre responsable. Que faites-vous ?",
          answers: [
          {text: "Je n'en fais pas mention pour préserver la relation.", score: 0},
          {text: "Je mentionne l'écart de façon vague pour ne pas trop engager quelqu'un.", score: 1},
          {text: "Je décris les faits tels qu'ils se sont passés — factuel, sans jugement sur la personne.", score: 2}
          ]
        },
        {
          text: "Vous relisez un signalement rempli par un collègue et vous réalisez que des causes probables ont été omises. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — ce n'est pas mon signalement.", score: 0},
          {text: "Je lui signale en privé qu'il a oublié des éléments.", score: 1},
          {text: "Je lui propose de compléter ensemble pour que l'analyse soit exploitable.", score: 2}
          ]
        },
        {
          text: "Vous signalez un presqu'accident et votre responsable vous demande de retirer certains éléments qui 'pourraient mal passer'. Que faites-vous ?",
          answers: [
          {text: "Je modifie le document — mon responsable a le dernier mot.", score: 0},
          {text: "Je modifie en faisant une version moins détaillée.", score: 1},
          {text: "Je maintiens les éléments factuels et signale si nécessaire que ma description est contestée.", score: 2}
          ]
        },
        {
          text: "Vous avez rédigé un signalement mais vous ne savez pas à qui l'envoyer ni comment. Que faites-vous ?",
          answers: [
          {text: "Je laisse le document de côté en attendant de savoir.", score: 0},
          {text: "Je l'envoie à la première personne que je trouve.", score: 1},
          {text: "Je prends le temps de trouver le bon canal avant d'envoyer — même si ça prend un peu de temps.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Un incident a été signalé il y a plusieurs semaines mais aucune action corrective n'a été visible. Que faites-vous ?",
          answers: [
          {text: "J'attends — les décisions appartiennent à la direction.", score: 0},
          {text: "J'en parle à mon responsable en passant.", score: 1},
          {text: "Je relance formellement et demande un retour sur le suivi du signalement.", score: 2}
          ]
        },
        {
          text: "Un retour d'expérience est organisé mais l'analyse reste en surface et personne ne questionne les causes profondes. Que faites-vous ?",
          answers: [
          {text: "Je suis le rythme de la réunion — ce n'est pas à moi de pousser plus loin.", score: 0},
          {text: "Je pose une question supplémentaire mais sans insister.", score: 1},
          {text: "Je propose d'explorer les causes systémiques plutôt que de s'arrêter à la cause immédiate.", score: 2}
          ]
        },
        {
          text: "Vous participez à un retour d'expérience et vous avez un élément d'analyse qui met en cause une décision collective. Vous hésitez à le dire. Que faites-vous ?",
          answers: [
          {text: "Je ne le dis pas — ça risque de froisser des gens.", score: 0},
          {text: "Je le dis de façon très indirecte pour ne pas vexer.", score: 1},
          {text: "Je l'exprime factuellement : l'objectif est d'apprendre, pas de trouver un coupable.", score: 2}
          ]
        },
        {
          text: "Après un accident, votre entreprise met en place une nouvelle procédure que votre équipe trouve trop contraignante. Que faites-vous ?",
          answers: [
          {text: "Je me range à l'avis de l'équipe — si tout le monde la trouve inutile, elle l'est probablement.", score: 0},
          {text: "Je l'applique pour moi mais je ne soutiens pas la décision auprès des autres.", score: 1},
          {text: "Je l'applique et propose par les voies officielles une révision si elle n'est pas adaptée.", score: 2}
          ]
        },
        {
          text: "Vous avez contribué à un REX et les recommandations ont été archivées sans suite. Que faites-vous dans cette situation ?",
          answers: [
          {text: "J'arrête de participer — c'est une perte de temps.", score: 0},
          {text: "Je continue à participer mais sans trop m'investir.", score: 1},
          {text: "Je pose la question du suivi des recommandations lors d'une prochaine réunion.", score: 2}
          ]
        }
    ],
  },

  "acces-sites-surete": {
    0: [
        {
          text: "Une personne que vous ne reconnaissez pas se tient devant une porte d'accès sécurisée et attend que quelqu'un lui ouvre. Elle semble attendre un interlocuteur interne. Que faites-vous ?",
          answers: [
          {text: "Je lui ouvre — elle attend quelqu'un, ça semble normal.", score: 0},
          {text: "Je lui demande qui elle attend et si elle a un badge.", score: 1},
          {text: "Je la redirige vers l'accueil et l'informe qu'elle doit passer par là pour tout accès.", score: 2}
          ]
        },
        {
          text: "Votre badge d'accès est en cours de renouvellement depuis plusieurs jours. En attendant, vous entrez grâce à un collègue qui vous ouvre. Quelle est votre attitude ?",
          answers: [
          {text: "Je me débrouille avec l'aide des collègues — c'est temporaire.", score: 0},
          {text: "J'utilise l'aide des collègues mais je relance le service concerné.", score: 1},
          {text: "Je traite cela comme une priorité : un accès non sécurisé est un problème, même temporaire.", score: 2}
          ]
        },
        {
          text: "Vous trouvez un badge d'accès sur le sol dans un couloir. Que faites-vous ?",
          answers: [
          {text: "Je le pose sur un bureau visible pour que le propriétaire le retrouve.", score: 0},
          {text: "Je le dépose à la réception.", score: 1},
          {text: "Je le remets à la sécurité ou à la personne compétente en signalant où je l'ai trouvé.", score: 2}
          ]
        },
        {
          text: "Un visiteur attendu vous contacte depuis l'extérieur pour que vous veniez l'accueillir directement sans passer par l'accueil officiel. Quelle est votre réponse ?",
          answers: [
          {text: "Je vais le chercher — c'est plus pratique et je le connais.", score: 0},
          {text: "Je lui demande d'aller à l'accueil et vais le rejoindre là-bas.", score: 1},
          {text: "Je lui explique que la procédure d'enregistrement est obligatoire, même pour les visiteurs connus.", score: 2}
          ]
        },
        {
          text: "Vous devez travailler tard et constatez qu'une porte coupe-feu est maintenue ouverte avec un objet pour faciliter les allées et venues. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — c'est pratique pour tout le monde.", score: 0},
          {text: "Je retire l'objet sans en parler à personne.", score: 1},
          {text: "Je retire l'objet et signale la situation pour qu'elle ne se reproduise pas.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous êtes dans une zone sécurisée et vous voyez une personne que vous ne connaissez pas qui travaille sans accompagnateur visible. Elle semble concentrée. Que faites-vous ?",
          answers: [
          {text: "Je continue ma route — elle a l'air de savoir ce qu'elle fait.", score: 0},
          {text: "Je l'observe depuis à distance pour voir si quelqu'un la rejoint.", score: 1},
          {text: "Je l'interpelle poliment pour vérifier si elle est bien autorisée à être dans cette zone.", score: 2}
          ]
        },
        {
          text: "Un technicien de maintenance que vous ne connaissez pas dit être attendu pour une intervention urgente. Il n'a pas de badge visible et son nom n'apparaît pas dans le planning. Que faites-vous ?",
          answers: [
          {text: "Je le laisse entrer — une intervention urgente, ça ne se reporte pas.", score: 0},
          {text: "Je lui demande sa carte de visite avant de lui ouvrir.", score: 1},
          {text: "Je contacte le responsable concerné pour confirmer l'intervention avant tout accès.", score: 2}
          ]
        },
        {
          text: "Vous quittez rapidement votre bureau et oubliez de verrouiller votre écran sur lequel sont affichées des informations confidentielles. Vous vous en rendez compte dans le couloir. Que faites-vous ?",
          answers: [
          {text: "Je continue — je reviens dans deux minutes.", score: 0},
          {text: "Je reviens mais sans y accorder trop d'importance.", score: 1},
          {text: "Je reviens immédiatement pour verrouiller l'écran.", score: 2}
          ]
        },
        {
          text: "Lors d'un événement interne, des visiteurs ont accès à des zones où sont affichés des organigrammes et plans internes. Vous remarquez cela. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas sensible — les visiteurs peuvent voir ça.", score: 0},
          {text: "Je note l'observation mentalement sans agir.", score: 1},
          {text: "Je signale la situation pour que les documents soient retirés ou la zone sécurisée.", score: 2}
          ]
        },
        {
          text: "Un collègue vous demande votre code d'accès car il a oublié le sien. Il est en urgence. Que faites-vous ?",
          answers: [
          {text: "Je lui donne — il est fiable et c'est une urgence.", score: 0},
          {text: "Je lui ouvre moi-même la porte sans lui donner le code.", score: 1},
          {text: "Je lui ouvre si nécessaire, mais je signale qu'il doit renouveler ses accès plutôt que de partager les miens.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous avez des documents imprimés contenant des informations sensibles sur votre bureau. Vous partez en réunion pour deux heures. Que faites-vous ?",
          answers: [
          {text: "Je les laisse sur mon bureau — je reviens dans l'après-midi.", score: 0},
          {text: "Je les retourne face contre table.", score: 1},
          {text: "Je les range dans un tiroir verrouillé ou dans un endroit sécurisé.", score: 2}
          ]
        },
        {
          text: "Lors d'une conversation informelle avec un prestataire, il vous pose des questions sur l'organisation interne de votre équipe et les responsables en poste. Quelle est votre réaction ?",
          answers: [
          {text: "Je réponds normalement — c'est des informations relativement accessibles.", score: 0},
          {text: "Je reste vague sur les détails sensibles.", score: 1},
          {text: "Je signale mentalement le caractère inhabituel de ces questions et en informe mon responsable si elles se précisent.", score: 2}
          ]
        },
        {
          text: "Vous devez envoyer un document interne confidentiel à un partenaire externe. Quelle est votre pratique ?",
          answers: [
          {text: "Je l'envoie par email comme d'habitude.", score: 0},
          {text: "Je demande à mon responsable si c'est OK avant d'envoyer.", score: 1},
          {text: "J'utilise le canal sécurisé prévu pour ce type de partage et je vérifie les droits du destinataire.", score: 2}
          ]
        },
        {
          text: "En télétravail, vous participez à une réunion sensible depuis un espace partagé (café, espace de coworking). Que faites-vous ?",
          answers: [
          {text: "Je participe normalement — je suis discret.", score: 0},
          {text: "Je baisse le son et évite d'afficher des documents à l'écran.", score: 1},
          {text: "Je préfère déplacer la réunion ou trouver un espace privé — les conversations sensibles ne se tiennent pas dans des espaces publics.", score: 2}
          ]
        },
        {
          text: "Votre ordinateur professionnel contient des données confidentielles. Vous le laissez dans votre voiture pendant deux heures pour une réunion. Que faites-vous ?",
          answers: [
          {text: "Je le laisse dans la voiture — c'est une courte durée.", score: 0},
          {text: "Je le laisse mais je m'assure qu'il est verrouillé et dans le coffre.", score: 1},
          {text: "Je l'emporte avec moi — les données sensibles ne restent pas sans surveillance.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous avez un doute sur une personne vue dans une zone restreinte mais vous n'êtes pas certain. Vous avez peur de vous tromper et de créer un incident pour rien. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — si ce n'est pas certain, mieux vaut ne pas réagir.", score: 0},
          {text: "J'en parle à un collègue pour avoir son avis avant d'agir.", score: 1},
          {text: "Je signale mon observation en précisant mes doutes — c'est à la sécurité de qualifier, pas à moi.", score: 2}
          ]
        },
        {
          text: "Vous avez signalé une situation suspecte qui s'avère anodine. Votre responsable le prend de façon neutre mais vous sentez que certains collègues trouvent cela excessif. Comment réagissez-vous ?",
          answers: [
          {text: "Je décide d'être plus discret la prochaine fois pour ne pas me faire remarquer.", score: 0},
          {text: "Je me dis que j'aurais peut-être dû attendre d'en savoir plus.", score: 1},
          {text: "Je maintiens ma posture : signaler un doute est la bonne attitude même si l'issue est anodine.", score: 2}
          ]
        },
        {
          text: "Un badge d'accès a été perdu mais le collaborateur concerné n'a pas encore signalé sa perte. Il pense le retrouver. Que faites-vous si vous l'apprenez ?",
          answers: [
          {text: "J'attends qu'il retrouve ou signale lui-même.", score: 0},
          {text: "Je lui conseille de signaler mais sans insister.", score: 1},
          {text: "Je lui rappelle l'obligation de signalement immédiat et lui propose de l'aider à le faire.", score: 2}
          ]
        },
        {
          text: "Votre site n'a pas eu d'incident de sécurité depuis longtemps. L'équipe est moins vigilante sur les procédures d'accès. Quelle est votre position ?",
          answers: [
          {text: "Si ça fait longtemps que tout va bien, c'est que les procédures allégées suffisent.", score: 0},
          {text: "Je maintiens mes propres habitudes sans chercher à influencer les autres.", score: 1},
          {text: "Je signale cette tendance à mon responsable — la tranquillité passée ne garantit rien pour l'avenir.", score: 2}
          ]
        },
        {
          text: "Votre entreprise vient de renforcer les procédures de contrôle d'accès. Certains collègues les trouvent excessives et les contournent. Que faites-vous ?",
          answers: [
          {text: "Je m'aligne — si tout le monde trouve ça excessif, c'est que c'est probablement le cas.", score: 0},
          {text: "Je les applique pour moi mais je ne dis rien sur les pratiques des autres.", score: 1},
          {text: "Je les applique et explique si on me le demande pourquoi ces procédures existent.", score: 2}
          ]
        }
    ],
  },

  "managers-securite": {
    0: [
        {
          text: "Votre équipe démarre chaque journée sans que vous fassiez un point sécurité formalisé. La réunion de chantier se concentre sur la production. Que faites-vous ?",
          answers: [
          {text: "Je laisse les choses comme elles sont — tout le monde connaît les règles.", score: 0},
          {text: "Je glisse un mot sur la sécurité quand une situation particulière le justifie.", score: 1},
          {text: "J'intègre un point sécurité systématique dans les rituels d'équipe, même court.", score: 2}
          ]
        },
        {
          text: "Une nouvelle règle de sécurité vient d'être introduite. Elle est contraignante et votre équipe ne comprend pas pourquoi elle existe. Que faites-vous ?",
          answers: [
          {text: "Je leur dis d'appliquer sans poser de question — c'est la règle.", score: 0},
          {text: "Je leur explique que c'est obligatoire sans rentrer dans les détails.", score: 1},
          {text: "Je leur explique le contexte et la raison de cette règle pour qu'ils l'appliquent en comprenant.", score: 2}
          ]
        },
        {
          text: "Vous constatez que deux procédures de sécurité sont contradictoires dans leur formulation. Votre équipe les applique de façons différentes selon les personnes. Que faites-vous ?",
          answers: [
          {text: "Je laisse chaque personne faire comme elle l'entend.", score: 0},
          {text: "Je tranche moi-même pour harmoniser la pratique.", score: 1},
          {text: "Je remonte l'incohérence au service compétent pour qu'une clarification officielle soit apportée.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande si une règle de sécurité s'applique vraiment à son cas précis. Vous n'êtes pas sûr. Que faites-vous ?",
          answers: [
          {text: "Je lui dis d'appliquer par précaution sans chercher à vérifier.", score: 0},
          {text: "Je lui donne mon interprétation personnelle.", score: 1},
          {text: "Je cherche la réponse auprès du bon interlocuteur avant de trancher.", score: 2}
          ]
        },
        {
          text: "Votre équipe applique correctement les règles de sécurité. Personne ne les questionne. Vous avez l'impression que c'est par conformisme plutôt que par conviction. Que faites-vous ?",
          answers: [
          {text: "Peu importe la raison — le résultat est bon.", score: 0},
          {text: "Je continue comme ça — la conformité est suffisante.", score: 1},
          {text: "Je cherche à créer des moments d'échange sur le sens des règles pour ancrer une vraie culture.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un collaborateur expérimenté ne met pas son EPI dans une zone où c'est obligatoire. Il dit que dans son cas c'est inutile. Que faites-vous ?",
          answers: [
          {text: "Je lui fais confiance — il connaît les risques mieux que moi.", score: 0},
          {text: "Je lui rappelle la règle sans trop insister.", score: 1},
          {text: "Je lui rappelle la règle fermement et cherche à comprendre ce qui rend l'EPI inconfortable pour lui.", score: 2}
          ]
        },
        {
          text: "Un écart de procédure vous est signalé par un membre de votre équipe. En enquêtant, vous réalisez que cet écart est collectif et ancien. Que faites-vous ?",
          answers: [
          {text: "Je sanctionne la personne qui a signalé pour que ça s'arrête.", score: 0},
          {text: "Je rappelle la règle à tout le monde.", score: 1},
          {text: "Je cherche à comprendre pourquoi cet écart s'est installé avant de décider comment agir.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous dit avoir commis un écart de sécurité par erreur. Il est visiblement gêné. Comment gérez-vous ce moment ?",
          answers: [
          {text: "Je le reprends sèchement pour que le message soit clair.", score: 0},
          {text: "Je note l'incident et lui rappelle la règle.", score: 1},
          {text: "Je commence par comprendre ce qui s'est passé avant d'aborder les conséquences.", score: 2}
          ]
        },
        {
          text: "Votre équipe a eu un accident sans gravité. L'ambiance est tendue. Certains se renvoient la responsabilité. Que faites-vous en premier ?",
          answers: [
          {text: "J'identifie le responsable pour clarifier les choses.", score: 0},
          {text: "Je calme les tensions et remets la discussion à plus tard.", score: 1},
          {text: "Je stabilise l'ambiance et oriente vers une analyse collective des causes sans chercher à désigner quelqu'un.", score: 2}
          ]
        },
        {
          text: "Un collaborateur contourne régulièrement une procédure mais ses résultats sont bons et sans incident. Vous le savez depuis un moment. Que faites-vous ?",
          answers: [
          {text: "Je ferme les yeux — il s'en sort bien.", score: 0},
          {text: "Je lui en parle discrètement sans formaliser.", score: 1},
          {text: "J'aborde le sujet clairement : les bons résultats ne valident pas un écart de procédure.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Votre hiérarchie vous demande d'accélérer sur un chantier qui accumule du retard. La pression est forte. Une étape de sécurité va prendre du temps. Que faites-vous ?",
          answers: [
          {text: "J'allège l'étape de sécurité pour tenir le délai.", score: 0},
          {text: "Je fais l'étape de sécurité mais plus rapidement.", score: 1},
          {text: "Je maintiens l'étape de sécurité et signale à ma hiérarchie l'arbitrage que ça implique.", score: 2}
          ]
        },
        {
          text: "Un client ou une direction vous pousse à prendre une décision opérationnelle qui, selon vous, met en jeu la sécurité. Que faites-vous ?",
          answers: [
          {text: "Je m'exécute — la pression extérieure est légitime.", score: 0},
          {text: "Je soulève la question mais je cède si la pression persiste.", score: 1},
          {text: "Je maintiens ma position et escalade si nécessaire — la sécurité ne se négocie pas.", score: 2}
          ]
        },
        {
          text: "Votre équipe est en pleine activité et un collaborateur vient vous signaler une anomalie mineure. Vous êtes très occupé. Que faites-vous ?",
          answers: [
          {text: "Je lui dis de revenir plus tard.", score: 0},
          {text: "Je l'écoute rapidement et lui dis de gérer.", score: 1},
          {text: "Je prends le temps d'évaluer l'information même si je suis sous pression.", score: 2}
          ]
        },
        {
          text: "Un pic d'activité force votre équipe à travailler dans des conditions dégradées depuis plusieurs jours. Que faites-vous ?",
          answers: [
          {text: "Je gère l'urgence et on analysera les conditions après.", score: 0},
          {text: "Je surveille de près mais j'attends que la charge diminue.", score: 1},
          {text: "Je signale à ma hiérarchie que les conditions dégradées créent un risque sécurité croissant.", score: 2}
          ]
        },
        {
          text: "Un sous-traitant travaille dans votre zone sans avoir reçu les consignes de sécurité spécifiques au site. Son responsable n'est pas joignable. Que faites-vous ?",
          answers: [
          {text: "Je le laisse travailler — ce n'est pas ma responsabilité.", score: 0},
          {text: "Je lui donne quelques consignes de base rapidement.", score: 1},
          {text: "Je l'informe qu'il ne peut pas démarrer sans les consignes complètes et je gère la situation.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre site n'a pas eu d'incident depuis 6 mois. L'équipe est fière mais commence à relâcher certaines vigilances. Que faites-vous ?",
          answers: [
          {text: "Je laisse faire — les bons résultats parlent d'eux-mêmes.", score: 0},
          {text: "Je rappelle les règles en réunion sans lier ça à la baisse de vigilance.", score: 1},
          {text: "Je nomme la dynamique observée et crée un moment d'échange sur ce que l'absence d'incident ne garantit pas.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous dit que les points sécurité hebdomadaires sont redondants et inutiles. Il suggère de les supprimer. Que faites-vous ?",
          answers: [
          {text: "Je les supprime si l'équipe est d'accord.", score: 0},
          {text: "Je maintiens mais en réduisant la durée.", score: 1},
          {text: "J'utilise cette question comme opportunité de retravailler le format pour le rendre plus utile.", score: 2}
          ]
        },
        {
          text: "Après plusieurs mois calmes, vous observez de petits glissements : EPI mal portés, vérifications bâclées. Personne ne dit rien. Quelle est votre réaction ?",
          answers: [
          {text: "J'attends un événement déclencheur pour agir.", score: 0},
          {text: "J'en parle en réunion de façon générale.", score: 1},
          {text: "Je nomme les comportements observés et remets le sujet sur la table avant qu'un incident se produise.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous remonte qu'un collègue a eu peur lors d'une opération mais n'a rien dit par gêne. Que faites-vous ?",
          answers: [
          {text: "Je ne fais rien — si rien ne s'est passé, c'est que c'était géré.", score: 0},
          {text: "Je parle à ce collègue pour voir s'il va bien.", score: 1},
          {text: "J'en fais l'occasion d'un échange d'équipe sur le droit d'exprimer un doute sans crainte.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que votre équipe signale moins qu'avant, sans raison apparente. Que faites-vous ?",
          answers: [
          {text: "J'attends de voir si ça se confirme dans le temps.", score: 0},
          {text: "Je rappelle l'obligation de signalement en réunion.", score: 1},
          {text: "Je cherche à comprendre ce qui a changé et si quelque chose freine la parole.", score: 2}
          ]
        }
    ],
  },

  "coactivite-sous-traitance": {
    0: [
        {
          text: "Deux équipes doivent intervenir dans la même zone le même jour. Personne n'a formalisé qui intervient en premier ni les zones de chacun. Que faites-vous ?",
          answers: [
          {text: "Je démarre de mon côté et on s'arrange au fil de l'eau.", score: 0},
          {text: "Je contacte le responsable de l'autre équipe pour s'organiser oralement.", score: 1},
          {text: "Je demande qu'un plan de coactivité soit établi avant tout démarrage.", score: 2}
          ]
        },
        {
          text: "Vous découvrez au dernier moment qu'un prestataire doit intervenir dans votre zone pendant que vous travaillez. Il n'a pas été annoncé. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte — la coordination se fera naturellement.", score: 0},
          {text: "Je préviens mon responsable et travaille en faisant attention.", score: 1},
          {text: "Je demande que son intervention soit officiellement planifiée et intégrée à mon plan de travail.", score: 2}
          ]
        },
        {
          text: "Un sous-traitant vous demande d'accéder à une zone où vous travaillez sans avoir le plan de prévention correspondant. Il dit que ça ne devrait pas prendre longtemps. Que faites-vous ?",
          answers: [
          {text: "Je le laisse entrer — c'est court et il semble compétent.", score: 0},
          {text: "Je lui pose quelques questions et l'oriente vers la zone la moins risquée.", score: 1},
          {text: "Je lui explique qu'il ne peut pas entrer sans le plan de prévention validé.", score: 2}
          ]
        },
        {
          text: "Vous animez un point de coordination de chantier avec plusieurs intervenants. L'un d'eux ne s'est pas présenté. Que faites-vous ?",
          answers: [
          {text: "Je commence sans lui — l'équipe présente est suffisante.", score: 0},
          {text: "Je l'appelle rapidement et continue sans attendre trop.", score: 1},
          {text: "Je m'assure qu'il est bien informé des décisions avant que son équipe intervienne.", score: 2}
          ]
        },
        {
          text: "Deux prestataires ont des pratiques incompatibles pour une même opération. Aucun ne veut changer. Que faites-vous ?",
          answers: [
          {text: "Je les laisse trouver un arrangement entre eux.", score: 0},
          {text: "Je tranche moi-même en choisissant la méthode qui me semble la meilleure.", score: 1},
          {text: "Je remonte la situation au coordinateur de site pour qu'une décision formelle soit prise.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Votre zone de travail n'est pas clairement balisée par rapport à celle du prestataire qui intervient en parallèle. Que faites-vous ?",
          answers: [
          {text: "On voit bien la limite de façon intuitive — pas besoin de balisage supplémentaire.", score: 0},
          {text: "Je fais un balisage sommaire avec ce que j'ai sous la main.", score: 1},
          {text: "Je mets en place un balisage conforme et l'indique aux deux équipes.", score: 2}
          ]
        },
        {
          text: "Un prestataire entre dans votre zone sans s'annoncer, pensant que c'était libre. Vous êtes en cours d'opération. Que faites-vous ?",
          answers: [
          {text: "Je le laisse faire — il a l'air de savoir ce qu'il fait.", score: 0},
          {text: "Je l'arrête et lui demande de faire attention.", score: 1},
          {text: "Je l'arrête, explique la situation et organise une coordination avant toute reprise.", score: 2}
          ]
        },
        {
          text: "Vous avez un doute sur les habilitations d'un sous-traitant pour une zone spécifique. Il affirme être qualifié. Que faites-vous ?",
          answers: [
          {text: "Je le crois sur parole — il est responsable de ses habilitations.", score: 0},
          {text: "Je vérifie rapidement avec son responsable.", score: 1},
          {text: "Je vérifie les documents avant de l'autoriser à accéder à la zone.", score: 2}
          ]
        },
        {
          text: "Un prestataire n'a pas été informé d'une modification de dernière minute dans les conditions d'accès à la zone. Vous le savez. Que faites-vous ?",
          answers: [
          {text: "Je suppose que son responsable l'a informé.", score: 0},
          {text: "Je lui dis rapidement ce qui a changé.", score: 1},
          {text: "Je m'assure qu'il reçoit l'information formellement et qu'il a tout ce dont il a besoin pour adapter son intervention.", score: 2}
          ]
        },
        {
          text: "Deux équipes présentent des vitesses d'avancement très différentes, créant des zones d'interférence non prévues. Que faites-vous ?",
          answers: [
          {text: "On adapte au fil de l'eau.", score: 0},
          {text: "J'en informe mon responsable.", score: 1},
          {text: "Je propose une réunion de coordination pour réviser le planning et les zones.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un sous-traitant intervenant sur votre site ne parle pas la même langue que vos équipes. Les consignes de sécurité n'ont pas été traduites. Que faites-vous ?",
          answers: [
          {text: "Je suppose que son chef d'équipe lui a expliqué.", score: 0},
          {text: "Je tente de communiquer par gestes pour les points importants.", score: 1},
          {text: "Je remonte la situation pour que des consignes adaptées soient fournies avant toute intervention.", score: 2}
          ]
        },
        {
          text: "Un prestataire vous demande d'utiliser vos équipements car les siens sont défectueux. Que faites-vous ?",
          answers: [
          {text: "Je lui prête — il en a besoin et c'est logique de s'entraider.", score: 0},
          {text: "Je lui prête un équipement basique en lui expliquant comment l'utiliser.", score: 1},
          {text: "Je refuse et remonte la situation à mon responsable — les équipements du prestataire doivent être conformes avant intervention.", score: 2}
          ]
        },
        {
          text: "Vous découvrez qu'un prestataire a utilisé une entrée de secours pour accéder au site car la principale était encombrée. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas grave — il a trouvé une solution pratique.", score: 0},
          {text: "Je lui explique que ce n'est pas la bonne voie mais je ne formalise pas.", score: 1},
          {text: "Je signale l'accès non contrôlé et demande que les voies d'accès soient clarifiées.", score: 2}
          ]
        },
        {
          text: "Un interlocuteur prestataire est remplacé en urgence par quelqu'un qui ne connaît pas le site. Que faites-vous ?",
          answers: [
          {text: "Je le laisse se débrouiller — il est professionnel.", score: 0},
          {text: "Je lui donne les grandes lignes rapidement.", score: 1},
          {text: "Je m'assure qu'il reçoit un accueil sécurité complet avant de démarrer, même si ça prend du temps.", score: 2}
          ]
        },
        {
          text: "La fin de chantier approche et plusieurs prestataires travaillent en parallèle. La coordination se fait moins rigoureusement. Que faites-vous ?",
          answers: [
          {text: "C'est normal en fin de chantier — tout le monde accélère.", score: 0},
          {text: "Je reste prudent de mon côté mais sans intervenir sur les autres.", score: 1},
          {text: "Je propose une coordination renforcée pour la phase finale, qui est souvent la plus risquée.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Un incident se produit dans une zone partagée entre votre équipe et un prestataire. Les deux parties se renvoient la responsabilité. Que faites-vous ?",
          answers: [
          {text: "Je défends la position de mon équipe.", score: 0},
          {text: "Je laisse les responsables gérer.", score: 1},
          {text: "Je documente les faits tels qu'ils se sont passés et coopère à l'analyse sans chercher à désigner un coupable.", score: 2}
          ]
        },
        {
          text: "Suite à un incident impliquant un sous-traitant, son entreprise demande à accéder aux données du signalement. Que faites-vous ?",
          answers: [
          {text: "Je leur communique le document complet.", score: 0},
          {text: "J'en parle à mon responsable avant de décider.", score: 1},
          {text: "Je transmets la demande à la personne compétente et n'agis pas de façon unilatérale.", score: 2}
          ]
        },
        {
          text: "Un prestataire a été blessé sur votre site dans une zone dont vous étiez responsable. Quelle est votre première réaction ?",
          answers: [
          {text: "Je sécurise la zone et attends les instructions.", score: 0},
          {text: "Je préviens les secours et mon responsable.", score: 1},
          {text: "Je préviens les secours, sécurise la zone, préserve les éléments de l'incident et contacte immédiatement les personnes compétentes.", score: 2}
          ]
        },
        {
          text: "Après un incident de coactivité, le prestataire propose d'arranger les choses informellement pour éviter des complications administratives. Que faites-vous ?",
          answers: [
          {text: "J'accepte si ça simplifie la situation pour tout le monde.", score: 0},
          {text: "Je refuse mais sans en faire une affaire.", score: 1},
          {text: "Je refuse clairement et maintiens les procédures de déclaration qui s'imposent.", score: 2}
          ]
        },
        {
          text: "Un prestataire quitte le site avant d'avoir fait le bilan de clôture d'intervention prévu. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — il devait partir.", score: 0},
          {text: "J'en informe mon responsable pour information.", score: 1},
          {text: "Je signale l'absence de bilan et demande qu'il soit réalisé même tardivement.", score: 2}
          ]
        }
    ],
  },

  "epi-gestes-securite": {
    0: [
        {
          text: "Vous êtes à court d'un EPI spécifique et devez attendre son réapprovisionnement. Votre tâche est urgente. Que faites-vous ?",
          answers: [
          {text: "Je réalise la tâche — l'urgence prime.", score: 0},
          {text: "Je fais la tâche en faisant davantage attention.", score: 1},
          {text: "Je suspends la tâche et signale le manque d'EPI avant de reprendre.", score: 2}
          ]
        },
        {
          text: "Vous vérifiez un EPI avant utilisation et vous trouvez un défaut mineur. L'EPI est encore fonctionnel selon vous. Que faites-vous ?",
          answers: [
          {text: "Je l'utilise — le défaut est mineur.", score: 0},
          {text: "Je l'utilise mais je signale le défaut après ma tâche.", score: 1},
          {text: "Je le mets de côté et en prends un en bon état avant de démarrer.", score: 2}
          ]
        },
        {
          text: "Votre EPI habituel est inconfortable et vous ralentit. Un collègue ne porte pas le sien et semble travailler sans difficulté. Que faites-vous ?",
          answers: [
          {text: "Je retire également le mien — l'inconfort n'est pas justifié.", score: 0},
          {text: "Je garde le mien mais je comprends la position du collègue.", score: 1},
          {text: "Je garde le mien et, si la gêne est réelle, je le signale pour qu'une solution soit trouvée.", score: 2}
          ]
        },
        {
          text: "Vous êtes pressé de démarrer une tâche et l'EPI requis prend du temps à enfiler correctement. Que faites-vous ?",
          answers: [
          {text: "Je le mets rapidement sans trop vérifier l'ajustement.", score: 0},
          {text: "Je le mets correctement mais plus vite que d'habitude.", score: 1},
          {text: "Je prends le temps nécessaire pour l'enfiler correctement même si ça retarde le démarrage.", score: 2}
          ]
        },
        {
          text: "Un EPI est disponible mais n'est pas obligatoire pour votre tâche selon les procédures, bien qu'il apporte une protection supplémentaire. Que faites-vous ?",
          answers: [
          {text: "Je ne le mets pas — ce n'est pas obligatoire.", score: 0},
          {text: "Je l'utilise quand je sens que le risque est plus élevé.", score: 1},
          {text: "J'évalue si l'utilisation est pertinente et je l'utilise si elle améliore ma protection sans créer d'autres risques.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Lors d'une opération difficile et physiquement éprouvante, vous avez l'habitude d'enlever certains EPI dans les moments de pause même si vous restez dans la zone. Quelle est votre pratique ?",
          answers: [
          {text: "Je les enlève — la pause est un moment de récupération.", score: 0},
          {text: "J'enlève les plus contraignants mais garde les essentiels.", score: 1},
          {text: "Je maintiens l'ensemble de mes EPI tant que je suis dans la zone concernée.", score: 2}
          ]
        },
        {
          text: "Vous réalisez une tâche identique à celle d'hier mais dans un contexte légèrement différent (météo, luminosité, sol). Vos EPI sont les mêmes. Que faites-vous avant de démarrer ?",
          answers: [
          {text: "Je démarre directement — c'est la même tâche.", score: 0},
          {text: "Je vérifie rapidement si le contexte change quelque chose.", score: 1},
          {text: "J'évalue si le changement de conditions nécessite des adaptations dans mes protections.", score: 2}
          ]
        },
        {
          text: "Un EPI collectif (garde-corps, bâche, écran) a été enlevé ou déplacé par une autre équipe pendant votre pause. Que faites-vous ?",
          answers: [
          {text: "Je travaille en faisant attention.", score: 0},
          {text: "Je le remets en place si je peux facilement.", score: 1},
          {text: "Je le remets en place et signale son déplacement non autorisé.", score: 2}
          ]
        },
        {
          text: "Vous observez qu'un EPI collectif n'est plus adapté à la configuration du chantier après une modification. Que faites-vous ?",
          answers: [
          {text: "Je continue — les autres n'ont pas l'air de voir de problème.", score: 0},
          {text: "Je le signale à mon responsable directement.", score: 1},
          {text: "Je signale la non-conformité et suspends les travaux dans la zone jusqu'à correction.", score: 2}
          ]
        },
        {
          text: "En fin de journée, vous êtes fatigué et il reste une petite tâche. Vous avez déjà rangé vos EPI. Que faites-vous ?",
          answers: [
          {text: "Je fais la tâche rapidement — c'est court.", score: 0},
          {text: "Je réfléchis au risque et décide au cas par cas.", score: 1},
          {text: "Je remet mes EPI avant de réaliser la tâche, quelle qu'en soit la durée.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous constatez qu'un EPI présent dans votre zone n'a pas été vérifié depuis longtemps. Il n'est pas en cours d'utilisation. Que faites-vous ?",
          answers: [
          {text: "Je le laisse — personne n'en a besoin pour l'instant.", score: 0},
          {text: "Je le mets de côté pour qu'il ne soit pas utilisé.", score: 1},
          {text: "Je le signale et déclenche sa mise en vérification.", score: 2}
          ]
        },
        {
          text: "Un extincteur dans votre zone a sa date de contrôle dépassée. Ce n'est pas votre mission principale de le surveiller. Que faites-vous ?",
          answers: [
          {text: "Je n'en fais pas mention — ce n'est pas ma responsabilité.", score: 0},
          {text: "Je l'indique à mon responsable en passant.", score: 1},
          {text: "Je le signale formellement pour qu'une vérification soit déclenchée rapidement.", score: 2}
          ]
        },
        {
          text: "Vous découvrez qu'un équipement de protection collective a été accidentellement endommagé lors d'une opération et qu'il n'a pas encore été signalé. Que faites-vous ?",
          answers: [
          {text: "J'attends que quelqu'un d'autre le signale.", score: 0},
          {text: "Je le signale verbalement à mon responsable.", score: 1},
          {text: "Je le signale immédiatement et m'assure que la zone concernée est sécurisée en attendant la réparation.", score: 2}
          ]
        },
        {
          text: "Lors d'un contrôle, un EPI qui ne vous appartient pas est identifié comme défectueux. Son propriétaire n'est pas là. Que faites-vous ?",
          answers: [
          {text: "Je le laisse — le propriétaire le verra quand il reviendra.", score: 0},
          {text: "Je le mets de côté pour qu'il ne soit pas utilisé par erreur.", score: 1},
          {text: "Je le mets de côté, le signale et préviens le propriétaire dès que possible.", score: 2}
          ]
        },
        {
          text: "Un EPI de remplacement que vous avez trouvé n'est pas exactement le même modèle que le vôtre. Il semble adapté mais vous n'en êtes pas sûr. Que faites-vous ?",
          answers: [
          {text: "Je l'utilise — il couvre la même zone et semble équivalent.", score: 0},
          {text: "Je l'utilise mais je le signale après.", score: 1},
          {text: "Je vérifie sa conformité avec les exigences du poste avant de l'utiliser.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous êtes le seul à porter systématiquement ses EPI dans votre équipe. Les autres vous taquinent. Quelle est votre réaction ?",
          answers: [
          {text: "Je prends cela avec légèreté et m'interroge sur ma propre rigidité.", score: 0},
          {text: "Je maintiens mes pratiques sans rien dire.", score: 1},
          {text: "Je maintiens mes pratiques et, si c'est le bon moment, j'explique pourquoi je le fais.", score: 2}
          ]
        },
        {
          text: "Un collaborateur junior vous demande si les EPI sont vraiment nécessaires pour une tâche courte. Que lui répondez-vous ?",
          answers: [
          {text: "Je lui dis que c'est à lui de juger selon la situation.", score: 0},
          {text: "Je lui dis que c'est obligatoire sans expliquer davantage.", score: 1},
          {text: "Je lui explique pourquoi les EPI sont importants même pour les tâches courtes et l'aide à les porter correctement.", score: 2}
          ]
        },
        {
          text: "Vous observez qu'un collègue porte son casque de façon incorrecte (courroie non attachée). C'est habituel chez lui. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — il sait ce qu'il fait.", score: 0},
          {text: "Je lui en parle une fois mais sans insister.", score: 1},
          {text: "Je lui signale de façon factuelle et m'assure qu'il comprend l'importance de l'ajustement.", score: 2}
          ]
        },
        {
          text: "Votre équipe a pris l'habitude de ranger les EPI dans un endroit peu pratique, ce qui décourage leur utilisation. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte comme tout le monde.", score: 0},
          {text: "Je range les miens à un endroit accessible pour moi.", score: 1},
          {text: "Je propose une solution d'organisation plus pratique pour faciliter leur usage par tous.", score: 2}
          ]
        },
        {
          text: "Un prestataire travaillant dans votre zone n'a pas les EPI adaptés à votre site. Il dit que les siens sont équivalents. Que faites-vous ?",
          answers: [
          {text: "Je le laisse travailler — il est responsable de ses propres EPI.", score: 0},
          {text: "Je lui signale que ses EPI devraient être vérifiés.", score: 1},
          {text: "Je remonte la situation à mon responsable pour que la conformité soit vérifiée avant qu'il continue.", score: 2}
          ]
        }
    ],
  },

  "securite-manager-arbitrage": {
    0: [
        {
          text: "Un délai client est avancé de deux jours et votre hiérarchie vous demande d'absorber cette contrainte. Une étape de vérification sécurité risque d'être sacrifiée. Que faites-vous ?",
          answers: [
          {text: "Je supprime la vérification — le client est prioritaire.", score: 0},
          {text: "Je la raccourcis pour gagner du temps.", score: 1},
          {text: "Je maintiens la vérification et signale à ma hiérarchie l'arbitrage qu'implique ce délai.", score: 2}
          ]
        },
        {
          text: "Votre équipe a pris du retard à cause d'aléas extérieurs. La pression est forte pour rattraper le temps perdu. Des opérations qui nécessitent normalement deux personnes sont réalisées seul pour aller plus vite. Quelle est votre position ?",
          answers: [
          {text: "J'accepte — c'est une situation exceptionnelle.", score: 0},
          {text: "Je tolère pour certaines tâches mais pas pour les plus risquées.", score: 1},
          {text: "Je maintiens les effectifs requis pour toute opération identifiée comme nécessitant deux personnes.", score: 2}
          ]
        },
        {
          text: "Un directeur de site vous dit que le niveau de vigilance de vos équipes est 'excessif' et ralentit la production. Que faites-vous ?",
          answers: [
          {text: "Je cherche comment alléger les procédures.", score: 0},
          {text: "J'écoute mais ne change rien sans avoir analysé ce qui est réellement excessif.", score: 1},
          {text: "Je défends la pertinence des pratiques actuelles et propose un échange factuel sur les arbitrages.", score: 2}
          ]
        },
        {
          text: "Vous êtes sollicité pour valider une opération qui respecte la lettre des procédures mais qui vous semble risquée dans les conditions du jour. Que faites-vous ?",
          answers: [
          {text: "Je valide — les procédures ont été respectées.", score: 0},
          {text: "Je valide avec des réserves orales.", score: 1},
          {text: "Je refuse de valider et explique pourquoi les conditions du jour changent le niveau de risque.", score: 2}
          ]
        },
        {
          text: "Un de vos collaborateurs vous propose une méthode plus rapide pour une opération. Elle ne viole pas les règles mais vous n'êtes pas sûr qu'elle ait été validée. Que faites-vous ?",
          answers: [
          {text: "Je l'autorise — si ce n'est pas interdit, c'est permis.", score: 0},
          {text: "Je l'autorise avec prudence en demandant qu'on reste attentifs.", score: 1},
          {text: "Je vérifie si cette méthode a été évaluée avant de l'autoriser.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Votre équipe a eu un comportement à risque qui n'a pas causé d'incident. Comment traitez-vous le sujet ?",
          answers: [
          {text: "Je ne dis rien — il n'y a pas eu de conséquences.", score: 0},
          {text: "Je fais un rappel général lors d'une réunion.", score: 1},
          {text: "J'aborde le sujet directement avec les personnes concernées en cherchant à comprendre ce qui s'est passé.", score: 2}
          ]
        },
        {
          text: "Un collaborateur a réalisé une opération seul en dehors du cadre prévu. Il l'a bien gérée. Comment réagissez-vous ?",
          answers: [
          {text: "Je le félicite pour l'initiative.", score: 0},
          {text: "Je lui rappelle qu'il n'aurait pas dû faire seul.", score: 1},
          {text: "Je cherche d'abord à comprendre pourquoi il a pris cette décision avant de traiter l'écart.", score: 2}
          ]
        },
        {
          text: "Vous découvrez qu'une pratique courante dans votre équipe ne respecte pas strictement une procédure, sans que ça n'ait posé de problème jusqu'ici. Que faites-vous ?",
          answers: [
          {text: "Je laisse faire — l'expérience montre que ça marche.", score: 0},
          {text: "Je rappelle la procédure sans analyser pourquoi l'écart s'est installé.", score: 1},
          {text: "J'analyse pourquoi l'écart s'est installé et je remonte si la procédure doit être révisée.", score: 2}
          ]
        },
        {
          text: "Un collaborateur a fait une erreur qui a failli causer un accident. Il est très affecté. Comment gérez-vous le moment ?",
          answers: [
          {text: "Je lui explique clairement l'erreur commise pour que ce soit clair.", score: 0},
          {text: "Je gère la situation administrative d'abord et parle à la personne ensuite.", score: 1},
          {text: "Je m'assure d'abord qu'elle va bien, puis j'analyse la situation ensemble dans un cadre constructif.", score: 2}
          ]
        },
        {
          text: "Deux membres de votre équipe ont des interprétations différentes d'une procédure et se disputent sur le sujet. Que faites-vous ?",
          answers: [
          {text: "Je tranche en faveur de l'un des deux.", score: 0},
          {text: "Je leur demande de se mettre d'accord entre eux.", score: 1},
          {text: "Je clarifie la procédure officielle et, si elle est ambiguë, je remonte pour qu'elle soit précisée.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Votre équipe est fatiguée après plusieurs semaines de forte activité. Les incidents n'ont pas augmenté mais vous ressentez une baisse d'attention. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — tout le monde est fatigué par moment.", score: 0},
          {text: "J'en parle informellement lors d'une réunion.", score: 1},
          {text: "Je nomme la situation à mon équipe et prends des mesures concrètes pour soulager la pression.", score: 2}
          ]
        },
        {
          text: "Sur les deux derniers mois, votre équipe n'a signalé aucun incident ni presqu'accident. Vous trouvez cela suspect. Que faites-vous ?",
          answers: [
          {text: "Je suis satisfait — les bons résultats parlent d'eux-mêmes.", score: 0},
          {text: "J'en parle lors d'une réunion pour rappeler l'importance du signalement.", score: 1},
          {text: "Je cherche activement à comprendre pourquoi les signalements ont diminué.", score: 2}
          ]
        },
        {
          text: "Votre site traverse une phase de grands travaux avec beaucoup de rotation d'intervenants. La vigilance collective baisse. Que faites-vous ?",
          answers: [
          {text: "Je renforce les contrôles sans changer les rituels.", score: 0},
          {text: "J'augmente la fréquence des rappels sécurité.", score: 1},
          {text: "Je renforce les rituels de coordination ET je crée des moments spécifiques pour maintenir l'attention dans ce contexte particulier.", score: 2}
          ]
        },
        {
          text: "Un collaborateur très expérimenté a commencé à s'épargner certaines vérifications. Il dit qu'avec son expérience, il sait quand c'est vraiment nécessaire. Que faites-vous ?",
          answers: [
          {text: "Je le laisse faire — son expérience est un argument valable.", score: 0},
          {text: "Je lui rappelle les règles sans approfondir.", score: 1},
          {text: "J'aborde le sujet directement : l'expérience ne remplace pas les procédures, elle aide à les appliquer mieux.", score: 2}
          ]
        },
        {
          text: "Vous revenez de congés et constatez que plusieurs petits glissements se sont produits pendant votre absence. Votre remplaçant n'en a pas parlé. Que faites-vous ?",
          answers: [
          {text: "Je reprends là où je suis et laisse passer — ce qui est fait est fait.", score: 0},
          {text: "Je recadre discrètement les comportements observés.", score: 1},
          {text: "Je fais un point équipe pour remettre les pratiques à niveau et comprendre pourquoi ces glissements ont eu lieu.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre équipe réalise des opérations de façon légèrement différente de la procédure écrite depuis des mois. Le résultat est bon. Vous venez de vous en rendre compte. Que faites-vous ?",
          answers: [
          {text: "Je laisse faire — si la pratique fonctionne, c'est qu'elle est adaptée.", score: 0},
          {text: "Je remets la procédure officielle en application sans chercher à comprendre.", score: 1},
          {text: "Je documente la pratique réelle et remonte pour que la procédure soit révisée si elle est pertinente.", score: 2}
          ]
        },
        {
          text: "Un nouveau collaborateur pose des questions sur des pratiques que l'équipe a habituellement 'normalisées'. Il trouve certaines choses étranges. Quelle est votre réaction ?",
          answers: [
          {text: "Je lui explique que c'est comme ça que ça marche ici.", score: 0},
          {text: "Je prends note de ses questions sans y donner suite immédiatement.", score: 1},
          {text: "Je prends ses observations comme un point de vue extérieur précieux et examine s'il a raison.", score: 2}
          ]
        },
        {
          text: "Votre équipe a tendance à minimiser les presqu'accidents en disant que 'ça fait partie du métier'. Que faites-vous ?",
          answers: [
          {text: "Je partage cet état d'esprit — certains risques sont inhérents au métier.", score: 0},
          {text: "Je rappelle que tout doit être signalé mais sans aborder la culture sous-jacente.", score: 1},
          {text: "Je travaille sur la culture de signalement pour que les presqu'accidents soient vus comme des opportunités d'apprentissage.", score: 2}
          ]
        },
        {
          text: "Vous détectez qu'une personne de votre équipe dissimule des informations par peur de la sanction. Comment réagissez-vous ?",
          answers: [
          {text: "Je lui rappelle ses obligations sans aborder la question de la peur.", score: 0},
          {text: "Je lui explique qu'il n'y aura pas de sanction pour ce cas précis.", score: 1},
          {text: "Je travaille à créer un environnement où la transparence est valorisée et le signalement, sans conséquence pour l'erreur non intentionnelle.", score: 2}
          ]
        },
        {
          text: "Vous avez signalé à plusieurs reprises des situations à risque à votre hiérarchie sans retour. Que faites-vous ?",
          answers: [
          {text: "J'arrête de signaler — ça ne sert à rien.", score: 0},
          {text: "Je continue à signaler mais sans espérer de retour.", score: 1},
          {text: "Je demande formellement un retour sur mes signalements et escalade si nécessaire.", score: 2}
          ]
        }
    ],
  },

  "securite-nucleaire": {
    0: [
        {
          text: "Vous réalisez une opération que vous connaissez parfaitement depuis des années. La gamme indique une étape que vous avez toujours faite de façon légèrement différente sans conséquence. Que faites-vous ?",
          answers: [
          {text: "J'applique ma méthode habituelle — l'expérience prime.", score: 0},
          {text: "J'applique la gamme mais je note mentalement la différence.", score: 1},
          {text: "J'applique la gamme telle qu'elle est écrite et remonte l'écart si ma pratique semble meilleure.", score: 2}
          ]
        },
        {
          text: "Lors d'une opération, vous avez un doute sur l'interprétation d'un paramètre. Votre collègue, plus expérimenté, vous dit que c'est normal. Que faites-vous ?",
          answers: [
          {text: "Je lui fais confiance et continue.", score: 0},
          {text: "Je note le paramètre mais continue en restant attentif.", score: 1},
          {text: "Je stoppe et cherche une confirmation formelle avant de reprendre.", score: 2}
          ]
        },
        {
          text: "Une vérification de routine vous semble donner un résultat légèrement en dehors de la plage habituelle, mais toujours dans les limites admissibles. Que faites-vous ?",
          answers: [
          {text: "Je continue — c'est dans les limites.", score: 0},
          {text: "Je note l'écart dans mon calepin personnel.", score: 1},
          {text: "Je le documente formellement et le signale pour analyse de tendance.", score: 2}
          ]
        },
        {
          text: "En prenant votre poste, votre collègue vous dit qu'il y a eu une 'petite anomalie' qu'il a gérée mais pas signalée. Que faites-vous ?",
          answers: [
          {text: "Je prends note pour moi mais respecte sa décision.", score: 0},
          {text: "Je lui suggère de le signaler sans insister.", score: 1},
          {text: "Je lui explique pourquoi c'est important et l'aide à faire le signalement si nécessaire.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que la gamme que vous utilisez n'a pas été mise à jour suite à une modification technique récente. L'opération vous semble maîtrisée quand même. Que faites-vous ?",
          answers: [
          {text: "Je réalise l'opération — je connais la modification.", score: 0},
          {text: "Je réalise l'opération en tenant compte de la modification mentalement.", score: 1},
          {text: "Je stoppe et remonte que la gamme doit être mise à jour avant toute utilisation.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "La pression de remise en service est forte. Une question technique reste ouverte mais tout le monde pense que c'est sans conséquence. Votre responsable vous demande de continuer. Que faites-vous ?",
          answers: [
          {text: "Je continue — la pression est légitime et la question est probablement mineure.", score: 0},
          {text: "Je continue mais je documente ma réserve.", score: 1},
          {text: "Je refuse de continuer tant que la question technique n'est pas formellement tranchée.", score: 2}
          ]
        },
        {
          text: "Une situation non prévue dans la gamme se présente. Vous pensez avoir la solution mais elle n'est pas documentée. Que faites-vous ?",
          answers: [
          {text: "J'applique ma solution — c'est ce pour quoi je suis formé.", score: 0},
          {text: "J'applique ma solution et le documente après.", score: 1},
          {text: "Je stoppe, documente la situation non prévue et attends une décision formelle avant de reprendre.", score: 2}
          ]
        },
        {
          text: "Vous réalisez qu'un équipement que vous venez de remettre en service a peut-être une configuration incertaine. L'essai de démarrage semblait normal. Que faites-vous ?",
          answers: [
          {text: "Je le laisse en service — le démarrage était normal.", score: 0},
          {text: "Je note l'incertitude et continue sous surveillance.", score: 1},
          {text: "Je remets l'équipement en arrêt et éclaircis la configuration avant de remettre en service.", score: 2}
          ]
        },
        {
          text: "Un chef d'équipe vous demande de commencer une étape avant la fin de la consignation pour gagner du temps. Il dit être sûr que c'est sécurisé. Que faites-vous ?",
          answers: [
          {text: "Je commence — il est responsable et il connaît le sujet.", score: 0},
          {text: "Je commence prudemment en restant attentif.", score: 1},
          {text: "Je refuse de commencer avant que la consignation soit complète et formellement validée.", score: 2}
          ]
        },
        {
          text: "Votre équipe a trouvé une façon plus rapide de réaliser une opération. Elle ne viole pas de règle explicite. Tout le monde l'utilise. Que faites-vous ?",
          answers: [
          {text: "J'utilise la méthode de l'équipe — elle a fait ses preuves.", score: 0},
          {text: "Je continue à utiliser la méthode officielle sans intervenir.", score: 1},
          {text: "J'utilise la méthode officielle et propose que la nouvelle méthode soit formellement évaluée et intégrée si elle est validée.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Lors d'une opération, vous rencontrez une configuration qui n'est pas exactement celle décrite dans la gamme. La situation semble maîtrisable. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte — je connais suffisamment bien le système.", score: 0},
          {text: "J'adapte et je le note pour en parler après.", score: 1},
          {text: "Je stoppe et traite la situation comme une dérive de gamme à remonter avant toute décision.", score: 2}
          ]
        },
        {
          text: "Une équipe extérieure intervient sur un équipement que vous supervisiez. Leur intervention modifie légèrement l'état du système. Ils disent que c'est prévu. Que faites-vous ?",
          answers: [
          {text: "Je les crois — ils sont compétents.", score: 0},
          {text: "Je vérifie que leur intervention était prévue.", score: 1},
          {text: "Je vérifie la traçabilité de l'autorisation avant de remettre le système dans son état nominal.", score: 2}
          ]
        },
        {
          text: "Vous constatez que deux gammes donnent des instructions contradictoires pour une même situation. Que faites-vous ?",
          answers: [
          {text: "J'applique celle qui me semble la plus logique.", score: 0},
          {text: "J'en parle à mon responsable avant de continuer.", score: 1},
          {text: "Je stoppe et remonte immédiatement l'incohérence pour qu'une décision formelle soit prise.", score: 2}
          ]
        },
        {
          text: "Lors d'une inspection, un point de contrôle donne un résultat à la limite de l'acceptable. Votre responsable dit que c'est OK. Que faites-vous ?",
          answers: [
          {text: "Je suis son avis — il a le niveau pour décider.", score: 0},
          {text: "Je note ma réserve mais je continue.", score: 1},
          {text: "Je documente formellement que le résultat est à la limite et demande une décision écrite.", score: 2}
          ]
        },
        {
          text: "Un prestataire suggère une modification sur un équipement pour simplifier une opération future. La proposition semble intéressante. Que faites-vous ?",
          answers: [
          {text: "J'autorise — si c'est pertinent, autant le faire maintenant.", score: 0},
          {text: "Je lui dis de soumettre ça à mon responsable.", score: 1},
          {text: "Je lui explique que toute modification doit suivre le processus de gestion des modifications, même si elle semble simple.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Un événement significatif de sûreté vient de se produire dans votre équipe. Votre responsable pense que ça peut ne pas être déclaré. Que faites-vous ?",
          answers: [
          {text: "Je lui fais confiance — il a l'expérience pour juger.", score: 0},
          {text: "Je note ma réserve mais respecte sa décision.", score: 1},
          {text: "Je maintiens que la déclaration est nécessaire si les critères sont remplis, quelle que soit la pression.", score: 2}
          ]
        },
        {
          text: "Vous réalisez a posteriori qu'une opération réalisée la semaine dernière aurait dû être documentée comme écart. Personne ne s'en souvient clairement. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — c'est trop tard.", score: 0},
          {text: "J'en parle informellement à mon responsable.", score: 1},
          {text: "Je documente ce dont je me souviens et remonte l'information, même tardivement.", score: 2}
          ]
        },
        {
          text: "L'analyse d'un événement conclut à une 'erreur humaine' mais vous pensez que des facteurs organisationnels ont contribué. Que faites-vous ?",
          answers: [
          {text: "J'accepte la conclusion — les experts ont décidé.", score: 0},
          {text: "Je note ma réserve sans la formuler.", score: 1},
          {text: "Je formule ma perspective dans les échanges de REX pour que l'analyse soit complète.", score: 2}
          ]
        },
        {
          text: "Votre équipe a une culture où les questions sont mal vues. Vous constatez que les agents hésitent à formuler des doutes. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte à la culture en place.", score: 0},
          {text: "Je continue à poser des questions moi-même sans intervenir sur la dynamique.", score: 1},
          {text: "Je nommer le problème auprès de mon responsable et cherche à créer un espace où la questioning attitude est valorisée.", score: 2}
          ]
        },
        {
          text: "Suite à un REX, des actions correctives ont été définies mais elles ne sont pas mises en œuvre. Que faites-vous ?",
          answers: [
          {text: "J'attends que la hiérarchie reprenne le sujet.", score: 0},
          {text: "Je relance informellement.", score: 1},
          {text: "Je demande formellement un état d'avancement et escalade si nécessaire.", score: 2}
          ]
        }
    ],
  },

  "securite-chantier-btp": {
    0: [
        {
          text: "Vous arrivez sur votre poste de travail le matin et le balisage installé la veille a été modifié ou déplacé. Que faites-vous avant de démarrer ?",
          answers: [
          {text: "Je démarre — le chantier évolue chaque jour.", score: 0},
          {text: "Je replace le balisage et commence.", score: 1},
          {text: "Je stoppe et vérifie qui a modifié le balisage et pour quelle raison avant de reprendre.", score: 2}
          ]
        },
        {
          text: "Vous devez travailler à une hauteur de 3 mètres. Le point d'ancrage prévu est difficilement accessible. Que faites-vous ?",
          answers: [
          {text: "Je m'accroche au point le plus proche disponible.", score: 0},
          {text: "Je travaille sans m'accrocher — c'est une intervention courte.", score: 1},
          {text: "Je stoppe et demande un ajustement de l'installation d'ancrage avant de démarrer.", score: 2}
          ]
        },
        {
          text: "Le sol de votre zone de travail est détrempé après une nuit de pluie. La tâche prévue nécessite de se déplacer. Que faites-vous ?",
          answers: [
          {text: "Je fais attention et commence.", score: 0},
          {text: "Je demande si des planches ou passages temporaires peuvent être posés.", score: 1},
          {text: "Je signale la situation et attends qu'une décision soit prise sur les conditions de travail avant de démarrer.", score: 2}
          ]
        },
        {
          text: "Votre chef d'équipe vous demande de démarrer des terrassements alors que le marquage de réseaux souterrains n'a pas encore été réalisé. Il dit que dans ce secteur il n'y a pas de réseau. Que faites-vous ?",
          answers: [
          {text: "Je démarre — il connaît le chantier.", score: 0},
          {text: "Je commence prudemment en restant attentif.", score: 1},
          {text: "Je refuse de démarrer les terrassements sans le marquage préalable.", score: 2}
          ]
        },
        {
          text: "Une livraison de matériaux est déposée dans votre zone de circulation. Le chauffeur est déjà reparti. Que faites-vous ?",
          answers: [
          {text: "Je travaille autour — on n'a pas le temps de déplacer ça maintenant.", score: 0},
          {text: "Je déplace moi-même la livraison.", score: 1},
          {text: "Je signale la situation et organise le déplacement de façon coordonnée avec les responsables.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un engin de chantier manœuvre dans votre zone sans signalement préalable. Le chauffeur vous voit. Que faites-vous ?",
          answers: [
          {text: "Je me déplace pour lui laisser de la place.", score: 0},
          {text: "Je l'arrête et lui demande de faire attention.", score: 1},
          {text: "Je le fais stopper et signale que la coordination des engins n'a pas été faite.", score: 2}
          ]
        },
        {
          text: "Deux corps de métier travaillent en parallèle dans une zone restreinte sans coordination visible. Des interférences commencent à apparaître. Que faites-vous ?",
          answers: [
          {text: "Je continue — les autres s'arrangeront.", score: 0},
          {text: "Je parle directement au responsable de l'autre équipe.", score: 1},
          {text: "Je remonte au coordinateur de chantier pour qu'une coordination formelle soit organisée.", score: 2}
          ]
        },
        {
          text: "Un autre intervenant abandonne un outil dans votre zone sans le sécuriser. Que faites-vous ?",
          answers: [
          {text: "Je le range à un endroit qui me convient.", score: 0},
          {text: "Je le signale à son propriétaire.", score: 1},
          {text: "Je le sécurise et signale la situation pour éviter que ça se reproduise.", score: 2}
          ]
        },
        {
          text: "Une fouille est ouverte dans votre zone et des personnes passent près du bord sans protection. Vous n'êtes pas responsable de cette fouille. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas ma fouille — c'est au responsable de gérer.", score: 0},
          {text: "Je dis aux personnes de faire attention.", score: 1},
          {text: "Je signale immédiatement au responsable de la fouille pour que la zone soit sécurisée.", score: 2}
          ]
        },
        {
          text: "Vous devez travailler sur une toiture pendant qu'une autre équipe travaille en dessous. Aucune protection contre la chute d'objets n'est en place. Que faites-vous ?",
          answers: [
          {text: "Je fais attention en travaillant.", score: 0},
          {text: "Je préviens l'équipe en dessous de se tenir à l'écart.", score: 1},
          {text: "Je stoppe et demande qu'une protection contre la chute d'objets soit mise en place avant de reprendre.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un intérimaire nouveau sur le chantier n'a pas reçu l'accueil sécurité. Il attend ses instructions de travail. Que faites-vous ?",
          answers: [
          {text: "Je lui donne ses instructions — on manque de temps.", score: 0},
          {text: "Je lui donne un accueil rapide sur les points essentiels.", score: 1},
          {text: "Je m'assure qu'il reçoit l'accueil sécurité complet avant de démarrer la moindre tâche.", score: 2}
          ]
        },
        {
          text: "Vous constatez qu'un permis de travail a expiré mais les travaux n'ont pas encore repris. L'équipe attend votre feu vert. Que faites-vous ?",
          answers: [
          {text: "Je les autorise à reprendre — le permis était valide et les conditions n'ont pas changé.", score: 0},
          {text: "Je leur demande d'attendre que le permis soit renouvelé.", score: 1},
          {text: "Je stoppe toute activité et m'assure que le permis est renouvelé avant toute reprise.", score: 2}
          ]
        },
        {
          text: "Le PPSPS prévoit un nombre minimum de personnes pour une opération. Ce matin, vous êtes en sous-effectif. Que faites-vous ?",
          answers: [
          {text: "Je commence avec l'équipe disponible — on fera attention.", score: 0},
          {text: "Je commence avec les tâches qui peuvent se faire seul.", score: 1},
          {text: "Je ne démarre pas l'opération qui nécessite un effectif minimum et remonte la situation.", score: 2}
          ]
        },
        {
          text: "Vous devez réaliser des travaux nécessitant une habilitation que vous n'avez pas. Le titulaire de l'habilitation est absent. Que faites-vous ?",
          answers: [
          {text: "Je réalise les travaux — j'en suis capable même sans habilitation formelle.", score: 0},
          {text: "Je commence la préparation et attends le titulaire pour la phase critique.", score: 1},
          {text: "Je ne réalise pas les travaux et remonte la situation pour qu'une solution soit trouvée.", score: 2}
          ]
        },
        {
          text: "Le plan de prévention prévoit des mesures pour des travaux par points chauds. Vous réalisez que les moyens de lutte contre l'incendie sont insuffisants par rapport au plan. Que faites-vous ?",
          answers: [
          {text: "Je commence avec ce que j'ai — les risques semblent limités.", score: 0},
          {text: "Je fais les travaux et compense par plus d'attention.", score: 1},
          {text: "Je stoppe et demande que les moyens prévus au plan de prévention soient mis en place avant de démarrer.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Un accident survient sur votre zone. Plusieurs personnes regardent. Que faites-vous en premier ?",
          answers: [
          {text: "J'évalue la gravité avant d'appeler les secours.", score: 0},
          {text: "J'appelle les secours et préviens mon responsable.", score: 1},
          {text: "Je sécurise la zone, appelle les secours, ne déplace pas la victime sauf danger immédiat et préserve les éléments de l'incident.", score: 2}
          ]
        },
        {
          text: "Après un incident, votre chef de chantier vous demande de reprendre rapidement pour ne pas perdre davantage de temps. Que faites-vous ?",
          answers: [
          {text: "Je reprends — la situation est stabilisée.", score: 0},
          {text: "Je reprends mais en faisant très attention.", score: 1},
          {text: "Je refuse de reprendre tant qu'une analyse de la situation n'a pas été faite et que les conditions de reprise ne sont pas définies.", score: 2}
          ]
        },
        {
          text: "Votre chantier a eu un incident et vous devez témoigner auprès des enquêteurs. Que faites-vous ?",
          answers: [
          {text: "Je dis ce qui arrange le mieux la situation de l'équipe.", score: 0},
          {text: "Je dis les choses telles que je les ai vécues.", score: 1},
          {text: "Je témoigne avec précision sur les faits, en distinguant ce que j'ai observé de ce que j'interprète.", score: 2}
          ]
        },
        {
          text: "Suite à un incident, une procédure est modifiée. La nouvelle procédure est plus contraignante. Votre équipe se plaint. Que faites-vous ?",
          answers: [
          {text: "Je leur dis qu'ils ont raison — la procédure est peut-être excessive.", score: 0},
          {text: "Je leur dis que c'est obligatoire et qu'ils doivent s'adapter.", score: 1},
          {text: "Je leur explique le lien entre la procédure et l'incident, et je remonte si elle est vraiment inadaptée.", score: 2}
          ]
        },
        {
          text: "Un incident s'est produit sur un chantier voisin avec des conditions similaires au vôtre. Que faites-vous ?",
          answers: [
          {text: "Je m'en informe mais mon chantier est différent.", score: 0},
          {text: "Je prends note des informations disponibles.", score: 1},
          {text: "J'analyse si des mesures préventives doivent être prises sur mon chantier en lien avec cet incident.", score: 2}
          ]
        }
    ],
  },

  "rps-signaux-faibles": {
    0: [
        {
          text: "Vous êtes habituellement quelqu'un d'impliqué. Depuis quelques semaines, vous avez du mal à vous concentrer et les tâches simples vous prennent deux fois plus de temps. Que faites-vous ?",
          answers: [
          {text: "Je pousse encore un peu — c'est probablement temporaire.", score: 0},
          {text: "J'en parle à un proche mais pas dans le contexte professionnel.", score: 1},
          {text: "Je prends cela comme un signal sérieux et cherche à en comprendre la cause.", score: 2}
          ]
        },
        {
          text: "Vous observez qu'un collègue habituellement positif fait des remarques de plus en plus acerbes en réunion depuis plusieurs semaines. Que faites-vous ?",
          answers: [
          {text: "Je lui dis de se calmer.", score: 0},
          {text: "Je note le changement mais n'interviens pas.", score: 1},
          {text: "Je prends un moment pour lui demander comment il va, en dehors des réunions.", score: 2}
          ]
        },
        {
          text: "Vous sentez une tension latente dans votre équipe depuis quelques semaines. Les échanges sont cordiaux en surface mais les non-dits s'accumulent. Que faites-vous ?",
          answers: [
          {text: "J'attends que ça se désamorce seul.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je cherche à créer un espace où les vrais sujets peuvent être mis sur la table.", score: 2}
          ]
        },
        {
          text: "Un collègue que vous voyez tous les jours s'est isolé progressivement. Il mange seul et répond de façon courte. Que faites-vous ?",
          answers: [
          {text: "Je respecte son besoin d'espace.", score: 0},
          {text: "Je lui demande rapidement si tout va bien.", score: 1},
          {text: "Je crée une occasion d'échange non forcée et reste disponible sur la durée.", score: 2}
          ]
        },
        {
          text: "Vous avez du mal à récupérer le week-end. Le dimanche soir, vous êtes déjà épuisé à l'idée du lundi. Que faites-vous ?",
          answers: [
          {text: "C'est la période — ça va passer.", score: 0},
          {text: "Je cherche à mieux gérer mon temps le week-end.", score: 1},
          {text: "Je prends cela comme un signal de surcharge durable et cherche à en parler.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vos priorités changent deux fois par semaine et vous ne savez plus quoi traiter en premier. Que faites-vous ?",
          answers: [
          {text: "Je jongle avec tout et m'adapte.", score: 0},
          {text: "Je reviens vers mon responsable pour qu'il tranche.", score: 1},
          {text: "Je clarifie avec mon responsable les critères de priorisation pour les semaines à venir.", score: 2}
          ]
        },
        {
          text: "Vous avez dit oui à trop de demandes cette semaine. Vous êtes saturé. Que faites-vous ?",
          answers: [
          {text: "Je travaille plus longtemps pour tout tenir.", score: 0},
          {text: "Je préviens les personnes concernées que j'aurai du retard.", score: 1},
          {text: "Je priorise avec mon responsable et reviens vers les demandeurs pour redéfinir les délais.", score: 2}
          ]
        },
        {
          text: "Une urgence imprévue tombe alors que vous avez déjà une journée chargée. Votre manager vous demande d'absorber. Que faites-vous ?",
          answers: [
          {text: "J'absorbe — c'est mon rôle d'être flexible.", score: 0},
          {text: "Je demande ce qui peut être décalé pour intégrer l'urgence.", score: 1},
          {text: "Je lui expose l'impact sur les autres engagements et demande qu'un arbitrage soit fait.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous avez beaucoup de tâches qui durent depuis longtemps sans avancer vraiment, faute de temps pour les traiter. Que faites-vous ?",
          answers: [
          {text: "Je les garde dans ma liste en espérant trouver du temps.", score: 0},
          {text: "Je les délègue à quelqu'un de disponible.", score: 1},
          {text: "Je les remets sur la table avec mon responsable pour décider lesquelles sont encore pertinentes.", score: 2}
          ]
        },
        {
          text: "Votre charge de travail a augmenté progressivement sans que les ressources évoluent. Vous tenez mais à la limite. Que faites-vous ?",
          answers: [
          {text: "Je continue — si ça tenait jusqu'ici, ça peut durer.", score: 0},
          {text: "J'en parle à mon responsable en passant.", score: 1},
          {text: "Je formalise la situation et demande un échange dédié pour trouver une solution durable.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Deux collègues ont une tension ouverte depuis une semaine et ça affecte le travail de toute l'équipe. Que faites-vous ?",
          answers: [
          {text: "Je les laisse gérer entre eux.", score: 0},
          {text: "Je parle à l'un des deux pour l'aider.", score: 1},
          {text: "Je leur propose un espace de discussion factuel sur les points qui bloquent leur coopération.", score: 2}
          ]
        },
        {
          text: "Lors d'une réunion, un collègue vous coupe la parole systématiquement. Ça arrive régulièrement. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte et attends qu'il ait fini.", score: 0},
          {text: "Je lui en parle discrètement après la réunion.", score: 1},
          {text: "Je lui en parle directement avec des faits précis et en cherchant à comprendre sa perspective.", score: 2}
          ]
        },
        {
          text: "Une décision vient d'être prise sans que votre équipe soit consultée. Les réactions sont vives. Que faites-vous ?",
          answers: [
          {text: "J'attends que l'agitation se calme.", score: 0},
          {text: "J'exprime ma frustration à mes collègues.", score: 1},
          {text: "Je cherche à comprendre le contexte de la décision et crée un espace pour que l'équipe puisse s'exprimer de façon constructive.", score: 2}
          ]
        },
        {
          text: "Votre équipe traverse une période difficile et le climat est tendu. Vous avez vous-même du mal à rester positif. Que faites-vous ?",
          answers: [
          {text: "Je mets de côté mes propres émotions pour être disponible pour les autres.", score: 0},
          {text: "Je me concentre sur ce que je peux contrôler directement.", score: 1},
          {text: "Je cherche à la fois un appui pour moi et des façons de soutenir le collectif sans porter seul le poids de l'ambiance.", score: 2}
          ]
        },
        {
          text: "Vous constatez qu'une personne de l'équipe est souvent la cible de remarques ironiques lors des réunions. Personne ne réagit. Que faites-vous ?",
          answers: [
          {text: "Je n'interviens pas — c'est entre eux.", score: 0},
          {text: "Je lui exprime mon soutien en privé.", score: 1},
          {text: "Je nomme les comportements que j'observe et recadre dans le moment si c'est possible.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous traversez une période difficile et avez besoin d'aide mais vous ne savez pas à qui vous adresser. Que faites-vous ?",
          answers: [
          {text: "Je gère seul — ce sont des affaires personnelles.", score: 0},
          {text: "Je cherche quelqu'un de confiance dans mon entourage proche.", score: 1},
          {text: "Je me renseigne sur les dispositifs d'écoute disponibles dans mon organisation.", score: 2}
          ]
        },
        {
          text: "Un collègue vous confie qu'il pense à démissionner à cause du stress. Vous le trouvez vraiment épuisé. Que faites-vous ?",
          answers: [
          {text: "Je l'écoute et lui dis que ça va passer.", score: 0},
          {text: "Je lui conseille de prendre des congés.", score: 1},
          {text: "Je l'écoute vraiment et l'oriente vers les ressources adaptées tout en lui laissant la décision.", score: 2}
          ]
        },
        {
          text: "Votre responsable est disponible mais vous avez peur que signaler votre charge soit perçu comme un manque de compétence. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien pour éviter d'être jugé.", score: 0},
          {text: "Je laisse entendre que c'est chargé sans formaliser.", score: 1},
          {text: "Je me prépare à formuler clairement la situation en termes factuels et je demande un échange dédié.", score: 2}
          ]
        },
        {
          text: "Vous avez alerté votre responsable il y a deux semaines sur une situation difficile. Rien n'a changé. Que faites-vous ?",
          answers: [
          {text: "Je lâche l'affaire — il n'y a rien à faire.", score: 0},
          {text: "J'en reparle informellement.", score: 1},
          {text: "Je relance formellement et clarifie ce dont j'ai besoin.", score: 2}
          ]
        },
        {
          text: "Vous sentez que vous avez besoin de soutien psychologique mais vous ne savez pas si votre organisation le propose. Que faites-vous ?",
          answers: [
          {text: "Je ne cherche pas — c'est une démarche personnelle qui n'a pas à passer par l'entreprise.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je me renseigne auprès des RH sur ce qui existe sans forcément exposer ma situation.", score: 2}
          ]
        }
    ],
  },

  "charge-priorites": {
    0: [
        {
          text: "Votre to-do list est pleine et tout semble urgent. Quelle est votre première réaction ?",
          answers: [
          {text: "Je prends la première tâche et j'avance.", score: 0},
          {text: "Je fais une rapide sélection des tâches les plus importantes.", score: 1},
          {text: "Je prends un moment pour hiérarchiser en distinguant urgent, important et ni l'un ni l'autre.", score: 2}
          ]
        },
        {
          text: "Vous finissez régulièrement votre journée sans avoir traité les tâches que vous aviez prévues le matin. Que faites-vous ?",
          answers: [
          {text: "C'est normal — l'imprévu fait partie du travail.", score: 0},
          {text: "Je reste plus tard pour rattraper le retard.", score: 1},
          {text: "J'analyse ce qui génère cet écart et cherche à mieux protéger du temps pour mes priorités.", score: 2}
          ]
        },
        {
          text: "Vous avez des réunions qui se succèdent sans pause. En fin de journée, vous n'avez rien produit de concret. Que faites-vous ?",
          answers: [
          {text: "Je rattrape le travail le lendemain matin.", score: 0},
          {text: "Je réduis ma participation à certaines réunions.", score: 1},
          {text: "Je remets en question mon planning de réunions et cherche à dégager des plages de travail.", score: 2}
          ]
        },
        {
          text: "Plusieurs personnes vous sollicitent en parallèle pour des urgences différentes. Que faites-vous ?",
          answers: [
          {text: "Je réponds à tout dans l'ordre d'arrivée.", score: 0},
          {text: "Je sélectionne celle qui me semble la plus urgente.", score: 1},
          {text: "Je demande à chacun un délai réel et je priorise en conséquence.", score: 2}
          ]
        },
        {
          text: "Une tâche longue et complexe avance peu car vous êtes constamment interrompu. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte — les interruptions font partie du travail.", score: 0},
          {text: "J'essaie de trouver un endroit plus calme pour travailler.", score: 1},
          {text: "Je pose des créneaux bloqués dans mon agenda pour avancer sur la tâche sans interruption.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous avez trois deadlines majeures la même semaine. Vous ne pourrez pas tout tenir. Que faites-vous ?",
          answers: [
          {text: "Je fais de mon mieux sur les trois.", score: 0},
          {text: "J'en choisis une et je demande un délai sur les autres sans expliquer.", score: 1},
          {text: "J'alerte les parties prenantes en amont et propose des solutions concrètes pour chaque deadline.", score: 2}
          ]
        },
        {
          text: "Votre responsable ajoute une nouvelle tâche urgente à votre liste déjà pleine. Que faites-vous ?",
          answers: [
          {text: "J'absorbe — c'est mon rôle.", score: 0},
          {text: "Je lui dis que c'est beaucoup mais je prends la tâche.", score: 1},
          {text: "Je lui expose ma charge actuelle et lui demande d'arbitrer entre les priorités.", score: 2}
          ]
        },
        {
          text: "Votre charge de travail a doublé suite à un départ dans l'équipe. Aucun remplacement n'est prévu à court terme. Que faites-vous ?",
          answers: [
          {text: "Je fais ce que je peux.", score: 0},
          {text: "Je signale à mon responsable que la situation est difficile.", score: 1},
          {text: "Je fais un bilan factuel de ce qui n'est plus tenable et demande un arbitrage sur les activités à prioriser.", score: 2}
          ]
        },
        {
          text: "Un projet important est bloqué en attente d'une décision d'une autre équipe. Vous perdez du temps à attendre. Que faites-vous ?",
          answers: [
          {text: "J'attends — ce n'est pas de mon ressort.", score: 0},
          {text: "Je relance l'autre équipe régulièrement.", score: 1},
          {text: "Je cherche ce que je peux faire avancer en parallèle et je remonte le blocage à mon responsable.", score: 2}
          ]
        },
        {
          text: "En fin de semaine, vous réalisez que vous avez travaillé principalement sur des urgences et rien sur les sujets de fond importants. Que faites-vous ?",
          answers: [
          {text: "C'est normal — les urgences passent toujours avant.", score: 0},
          {text: "Je planifie du temps pour les sujets de fond la semaine suivante.", score: 1},
          {text: "J'analyse si cette situation est récurrente et cherche à construire un rythme qui protège les deux types de travail.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Votre équipe est sous pression et les tensions montent entre membres. Vous observez des conflits sur les priorités. Que faites-vous ?",
          answers: [
          {text: "Je laisse chaque personne gérer ses propres urgences.", score: 0},
          {text: "Je clarifie mes propres priorités sans intervenir sur les autres.", score: 1},
          {text: "Je propose un moment de synchronisation collective pour aligner les priorités de l'équipe.", score: 2}
          ]
        },
        {
          text: "Deux collègues vous sollicitent en même temps pour des demandes légitimes mais incompatibles. Que faites-vous ?",
          answers: [
          {text: "Je réponds au premier qui m'a contacté.", score: 0},
          {text: "Je fais la moitié de chaque.", score: 1},
          {text: "Je les mets en relation pour qu'ils trouvent un accord sur ce qui est prioritaire.", score: 2}
          ]
        },
        {
          text: "La charge de votre équipe empêche toute remontée d'information vers les autres équipes. Des problèmes s'accumulent en silence. Que faites-vous ?",
          answers: [
          {text: "Je gère mon côté — la communication, c'est pour les managers.", score: 0},
          {text: "Je cherche à envoyer des mises à jour sommaires.", score: 1},
          {text: "Je signale à mon responsable que la surcharge génère des risques d'information et de coordination.", score: 2}
          ]
        },
        {
          text: "Un collègue dit qu'il gère bien alors qu'il accumule visiblement du retard et du stress. Que faites-vous ?",
          answers: [
          {text: "Je le crois — c'est à lui de dire si ça ne va pas.", score: 0},
          {text: "Je lui demande si je peux l'aider.", score: 1},
          {text: "Je lui offre un espace pour parler de sa charge de façon factuelle, sans jugement.", score: 2}
          ]
        },
        {
          text: "Votre équipe a des réunions qui pourraient être des emails. Elles mobilisent beaucoup de temps. Que faites-vous ?",
          answers: [
          {text: "Je continue à participer — c'est décidé par la hiérarchie.", score: 0},
          {text: "Je manque certaines réunions si elles ne me concernent pas directement.", score: 1},
          {text: "Je propose une revue du format et de la fréquence pour récupérer du temps de travail.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous êtes régulièrement le dernier à partir et le premier à arriver. Vos collègues font des journées normales. Que faites-vous ?",
          answers: [
          {text: "C'est mon rythme — je suis plus efficace ainsi.", score: 0},
          {text: "Je me demande si je pourrais être plus efficace.", score: 1},
          {text: "Je prends cela comme un signal et cherche à comprendre si ma charge est réellement différente ou si c'est mon organisation qui est à revoir.", score: 2}
          ]
        },
        {
          text: "Votre responsable n'est jamais disponible pour prioriser avec vous. Vous décidez seul en permanence. Que faites-vous ?",
          answers: [
          {text: "Je fais de mon mieux avec les informations disponibles.", score: 0},
          {text: "Je lui envoie des emails pour le tenir informé.", score: 1},
          {text: "Je formalise une demande d'entretien régulier et explique pourquoi c'est important pour la qualité de mon travail.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous n'avez pas pris une vraie pause depuis des semaines. Que faites-vous ?",
          answers: [
          {text: "Je continue — je rattrapais un retard important.", score: 0},
          {text: "Je prends une demi-journée quand je peux.", score: 1},
          {text: "Je pose une vraie période de déconnexion et en informe mon entourage professionnel.", score: 2}
          ]
        },
        {
          text: "Vous avez fait remonter votre surcharge à votre responsable et rien n'a changé deux semaines plus tard. Que faites-vous ?",
          answers: [
          {text: "J'arrête de signaler — ça ne sert à rien.", score: 0},
          {text: "Je relance à nouveau.", score: 1},
          {text: "Je fais une demande formelle d'arbitrage en précisant les conséquences concrètes de la surcharge.", score: 2}
          ]
        },
        {
          text: "Votre charge ne diminue pas et vous commencez à faire des erreurs inhabituelles. Que faites-vous ?",
          answers: [
          {text: "Je fais encore plus attention.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je traite cela comme un signal d'alarme sérieux et prends les mesures nécessaires, même si c'est inconfortable.", score: 2}
          ]
        }
    ],
  },

  "cooperation-climat": {
    0: [
        {
          text: "Vous ressentez une atmosphère moins agréable dans votre équipe depuis une décision récente que certains ont mal vécue. Que faites-vous ?",
          answers: [
          {text: "J'attends que ça passe.", score: 0},
          {text: "J'exprime ma propre opinion sur la décision.", score: 1},
          {text: "Je cherche à créer un espace où les ressentis peuvent être exprimés de façon constructive.", score: 2}
          ]
        },
        {
          text: "Deux collègues ne se parlent plus depuis un désaccord la semaine dernière. L'équipe fait comme si de rien n'était. Que faites-vous ?",
          answers: [
          {text: "Je m'aligne sur la norme collective : on n'en parle pas.", score: 0},
          {text: "Je parle à l'un d'eux discrètement.", score: 1},
          {text: "Je propose à l'équipe un moment pour clarifier la situation.", score: 2}
          ]
        },
        {
          text: "Lors d'une réunion, quelqu'un fait une remarque qui blesse visiblement un collègue mais tout le monde continue comme si rien ne s'était passé. Que faites-vous ?",
          answers: [
          {text: "Je continue aussi — ce n'est pas le moment de créer un incident.", score: 0},
          {text: "Je vérifie que mon collègue va bien après la réunion.", score: 1},
          {text: "Je nomme ce que j'ai observé dans le moment, de façon factuelle et calme.", score: 2}
          ]
        },
        {
          text: "Le ton des échanges dans votre équipe est devenu de plus en plus sec et formel depuis quelques semaines. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte au ton du groupe.", score: 0},
          {text: "Je continue à être chaleureux dans mes propres échanges.", score: 1},
          {text: "Je propose un moment informel pour recréer du lien.", score: 2}
          ]
        },
        {
          text: "Vous constatez qu'une personne de votre équipe est régulièrement mise à l'écart des échanges informels. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle de gérer ça.", score: 0},
          {text: "Je l'inclus dans mes propres échanges.", score: 1},
          {text: "J'essaie de comprendre ce qui crée cette mise à l'écart et agis en conséquence.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous avez un désaccord professionnel avec un collègue qui devient un peu personnel. Que faites-vous ?",
          answers: [
          {text: "Je maintiens ma position sans me préoccuper du relationnel.", score: 0},
          {text: "Je recule pour préserver la relation.", score: 1},
          {text: "Je cherche à séparer le désaccord professionnel de la relation personnelle et à traiter les deux.", score: 2}
          ]
        },
        {
          text: "Un membre de l'équipe qui a du retard rejette la faute sur les autres en réunion. L'accusation est injuste. Que faites-vous ?",
          answers: [
          {text: "Je ne réagis pas — pas la peine de créer un conflit.", score: 0},
          {text: "Je rectifie les faits calmement.", score: 1},
          {text: "Je rectifie les faits et propose de traiter le problème de fond ensemble.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous avez contribué à une tension avec un collègue par une réaction un peu sèche. Que faites-vous ?",
          answers: [
          {text: "J'attends que ça se passe tout seul.", score: 0},
          {text: "Je lui dis que je n'avais pas l'intention d'être sec.", score: 1},
          {text: "Je reviens vers lui pour reconnaître ma réaction et m'assurer que ça n'a pas affecté notre relation de travail.", score: 2}
          ]
        },
        {
          text: "Une décision collective a été prise mais vous n'y adhérez pas vraiment. Que faites-vous ?",
          answers: [
          {text: "Je fais semblant d'adhérer pour que ça avance.", score: 0},
          {text: "Je continue à défendre ma position après la décision.", score: 1},
          {text: "Je m'engage à appliquer la décision tout en gardant un espace pour faire remonter mon point de vue par les voies appropriées.", score: 2}
          ]
        },
        {
          text: "Votre équipe a du mal à prendre des décisions collectives : les réunions tournent en rond. Que faites-vous ?",
          answers: [
          {text: "Je laisse les choses se décanter naturellement.", score: 0},
          {text: "Je prends la main et impose une décision.", score: 1},
          {text: "Je propose une méthode pour structurer la prise de décision et avancer.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Les échanges dans votre équipe restent très superficiels. Les vrais problèmes ne sont jamais nommés. Que faites-vous ?",
          answers: [
          {text: "Je m'accommode — c'est le style de l'équipe.", score: 0},
          {text: "Je pose les vrais sujets quand l'occasion se présente.", score: 1},
          {text: "Je propose un espace dédié pour que les sujets de fond puissent être abordés.", score: 2}
          ]
        },
        {
          text: "Une friction récurrente entre deux personnes de l'équipe nuit à la qualité du travail. Tout le monde le sait mais personne n'intervient. Que faites-vous ?",
          answers: [
          {text: "Je laisse les managers gérer.", score: 0},
          {text: "Je parle à chacun séparément pour les aider.", score: 1},
          {text: "Je nomme la situation à l'équipe ou au responsable selon le contexte et propose d'y travailler.", score: 2}
          ]
        },
        {
          text: "Un bon résultat collectif n'est pas reconnu. Les personnes qui ont contribué semblent déçues. Que faites-vous ?",
          answers: [
          {text: "C'est à la hiérarchie de reconnaître — pas à moi.", score: 0},
          {text: "Je félicite mes proches collaborateurs.", score: 1},
          {text: "Je cherche à rendre visible la contribution collective, à mon niveau.", score: 2}
          ]
        },
        {
          text: "Votre équipe a tendance à se plaindre collectivement mais sans jamais chercher à changer les choses. Que faites-vous ?",
          answers: [
          {text: "Je me plains avec eux — ça aide à évacuer.", score: 0},
          {text: "Je ne me plains pas mais je n'interviens pas non plus.", score: 1},
          {text: "Je cherche à transformer les plaintes en problèmes à résoudre.", score: 2}
          ]
        },
        {
          text: "Vous observez que certains membres de l'équipe font plus d'efforts que d'autres. L'inégalité crée des tensions silencieuses. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon problème à régler.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "J'essaie de comprendre les causes de cet écart et d'agir à mon niveau sur ce qui est de mon ressort.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Un conflit dans l'équipe dépasse ce que vous pouvez gérer seul. Que faites-vous ?",
          answers: [
          {text: "Je tente encore de gérer de mon côté.", score: 0},
          {text: "J'en informe le responsable.", score: 1},
          {text: "Je remonte la situation clairement et demande un soutien approprié — RH, médiation, responsable.", score: 2}
          ]
        },
        {
          text: "Votre équipe traverse une crise et vous vous sentez seul à essayer de maintenir le cap. Que faites-vous ?",
          answers: [
          {text: "Je continue à porter le collectif de mon mieux.", score: 0},
          {text: "Je cherche du soutien auprès d'un collègue de confiance.", score: 1},
          {text: "Je cherche un appui adapté — responsable, RH — pour ne pas porter seul une situation qui dépasse mon périmètre.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que le problème de coopération dans votre équipe est lié à un problème organisationnel plus profond (rôles flous, objectifs contradictoires). Que faites-vous ?",
          answers: [
          {text: "Je m'adapte — je ne peux pas changer l'organisation.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je formule clairement l'analyse et la remonte pour que les causes structurelles soient traitées.", score: 2}
          ]
        },
        {
          text: "Une personne de votre équipe vous confie être épuisée et penser à s'arrêter. Que faites-vous ?",
          answers: [
          {text: "Je l'écoute et lui dis que tout le monde traverse des phases difficiles.", score: 0},
          {text: "Je lui conseille de prendre des vacances.", score: 1},
          {text: "Je l'écoute vraiment, l'encourage à chercher un soutien professionnel et, avec son accord, en informe le responsable.", score: 2}
          ]
        },
        {
          text: "Vous avez été le relais d'un problème de l'équipe auprès de la hiérarchie et rien n'a changé. Votre crédibilité en souffre. Que faites-vous ?",
          answers: [
          {text: "Je cesse d'être le relais — c'est trop risqué.", score: 0},
          {text: "Je continue mais je préviens l'équipe que les changements prennent du temps.", score: 1},
          {text: "Je relance la hiérarchie avec des éléments plus précis et plus concrets sur les conséquences de l'inaction.", score: 2}
          ]
        }
    ],
  },

  "manager-qvt-rps": {
    0: [
        {
          text: "Un membre de votre équipe a un comportement inhabituel depuis quelques jours : moins disponible, plus irritable, travail moins soigné. Que faites-vous ?",
          answers: [
          {text: "J'attends de voir si c'est passager.", score: 0},
          {text: "Je lui demande directement si tout va bien.", score: 1},
          {text: "Je crée une occasion naturelle d'échange en dehors du flux habituel de travail.", score: 2}
          ]
        },
        {
          text: "Deux membres de votre équipe sont en tension ouverte. L'ambiance générale en pâtit. Que faites-vous ?",
          answers: [
          {text: "Je les laisse régler ça entre eux.", score: 0},
          {text: "Je parle à chacun séparément pour les calmer.", score: 1},
          {text: "Je rencontre chacun, comprends les enjeux et propose un cadre pour traiter le problème.", score: 2}
          ]
        },
        {
          text: "Lors d'une réunion d'équipe, le silence sur un sujet sensible est éloquent. Personne ne s'exprime. Que faites-vous ?",
          answers: [
          {text: "Je passe au point suivant — le silence signifie accord.", score: 0},
          {text: "Je pose une question ouverte pour relancer.", score: 1},
          {text: "Je nomme le silence et crée les conditions pour que les personnes puissent s'exprimer si elles le souhaitent.", score: 2}
          ]
        },
        {
          text: "Vous constatez qu'un collaborateur très impliqué ne délègue rien et accumule. Il dit que tout va bien. Que faites-vous ?",
          answers: [
          {text: "Je le laisse gérer — il est adulte.", score: 0},
          {text: "Je lui propose de l'aide ponctuellement.", score: 1},
          {text: "J'ouvre un échange sur sa charge réelle et l'aide à réfléchir à comment mieux répartir.", score: 2}
          ]
        },
        {
          text: "Un membre de l'équipe fait régulièrement des heures supplémentaires non demandées. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — si c'est son choix, c'est son droit.", score: 0},
          {text: "Je lui dis que ce n'est pas nécessaire.", score: 1},
          {text: "Je comprends pourquoi il fait ces heures et j'agis sur les causes si elles sont organisationnelles.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Votre équipe est en surcharge depuis trois semaines. Vous attendez une décision de la direction pour alléger. Elle n'arrive pas. Que faites-vous ?",
          answers: [
          {text: "J'attends la décision — je ne peux rien faire seul.", score: 0},
          {text: "Je protège mes collaborateurs des sollicitations les plus évitables.", score: 1},
          {text: "Je prends des mesures provisoires à mon niveau ET je remonte avec insistance le besoin de décision.", score: 2}
          ]
        },
        {
          text: "Vous devez donner une charge supplémentaire à quelqu'un de votre équipe déjà chargée. Que faites-vous ?",
          answers: [
          {text: "Je lui donne — c'est la meilleure personne pour cette tâche.", score: 0},
          {text: "Je lui explique que c'est temporaire et important.", score: 1},
          {text: "J'explique le contexte, je donne la tâche ET je retrace avec lui ce qui peut être décalé ou délégué pour compenser.", score: 2}
          ]
        },
        {
          text: "Un projet est en retard et vous devez demander un effort supplémentaire à votre équipe. Comment le faites-vous ?",
          answers: [
          {text: "Je leur dis simplement ce qui est attendu.", score: 0},
          {text: "Je leur explique pourquoi c'est important.", score: 1},
          {text: "J'explique pourquoi, je reconnais l'effort demandé et je cherche avec eux ce qui peut être allégé ailleurs.", score: 2}
          ]
        },
        {
          text: "Votre équipe travaille sous pression depuis longtemps sans reconnaissance visible. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle de compenser les silences de la direction.", score: 0},
          {text: "Je les remercie personnellement.", score: 1},
          {text: "Je cherche à rendre visible leur travail auprès de la direction ET je leur témoigne ma reconnaissance directement.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que certains membres de votre équipe portent une charge invisible (coordination, soutien aux autres) non reconnue. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — cette charge fait partie du travail en équipe.", score: 0},
          {text: "Je les remercie en privé.", score: 1},
          {text: "Je rends cette contribution visible, la nomme collectivement et cherche à équilibrer la charge si elle est excessive.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un collaborateur a un conflit avec un autre service. Il vous demande d'intervenir. Que faites-vous ?",
          answers: [
          {text: "Je l'envoie gérer seul — il est adulte.", score: 0},
          {text: "Je l'écoute et interviens à sa demande.", score: 1},
          {text: "Je comprends les enjeux, évalue si mon intervention est la bonne réponse et agis en conséquence.", score: 2}
          ]
        },
        {
          text: "Un collaborateur exprime ouvertement qu'il n'est plus motivé. Que faites-vous ?",
          answers: [
          {text: "Je lui rappelle ses obligations professionnelles.", score: 0},
          {text: "Je cherche à comprendre ce qui ne va pas.", score: 1},
          {text: "Je crée un vrai espace d'échange sur ses attentes, ses difficultés et les marges de manœuvre disponibles.", score: 2}
          ]
        },
        {
          text: "Lors d'un entretien individuel, un collaborateur évoque des tensions avec un collègue. Que faites-vous ?",
          answers: [
          {text: "Je note l'information et passe à autre chose.", score: 0},
          {text: "Je lui demande de gérer directement avec l'autre personne.", score: 1},
          {text: "J'explore le sujet pour comprendre si c'est une tension ponctuelle ou quelque chose qui doit être traité.", score: 2}
          ]
        },
        {
          text: "Vous êtes vous-même sous pression et ne vous sentez pas en état d'accompagner votre équipe comme vous le souhaiteriez. Que faites-vous ?",
          answers: [
          {text: "Je gère les deux en parallèle — c'est mon rôle.", score: 0},
          {text: "Je priorise l'équipe et je gère ma propre charge après.", score: 1},
          {text: "Je cherche du soutien pour ma propre situation ET j'adapte mon disponibilité à ce qui est réellement tenable.", score: 2}
          ]
        },
        {
          text: "Un collaborateur demande une mutation interne parce qu'il ne se sent plus bien dans l'équipe. Que faites-vous ?",
          answers: [
          {text: "Je l'aide dans sa démarche — s'il veut partir, c'est son choix.", score: 0},
          {text: "Je cherche à le retenir.", score: 1},
          {text: "Je comprends les raisons profondes, cherche si quelque chose est réparable ET respecte sa décision si ce n'est pas le cas.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Un collaborateur en souffrance vous demande de garder la situation confidentielle. Vous êtes préoccupé. Que faites-vous ?",
          answers: [
          {text: "Je respecte sa demande — la confidentialité est sacrée.", score: 0},
          {text: "Je lui dis que je dois en parler à quelqu'un.", score: 1},
          {text: "J'évalue la gravité de la situation et agis en conséquence, en lui expliquant clairement ce que je peux et ne peux pas garder pour moi.", score: 2}
          ]
        },
        {
          text: "Vous pensez qu'un collaborateur a besoin d'un soutien psychologique mais il refuse toute aide. Que faites-vous ?",
          answers: [
          {text: "Je respecte son refus.", score: 0},
          {text: "Je continue à insister pour l'aider.", score: 1},
          {text: "Je reste disponible, lui laisse l'information sur ce qui existe et, si la situation se dégrade, je consulte les RH ou le médecin du travail.", score: 2}
          ]
        },
        {
          text: "Votre propre hiérarchie minimise les signaux de mal-être que vous remontez sur votre équipe. Que faites-vous ?",
          answers: [
          {text: "Je cesse de remonter — inutile d'insister.", score: 0},
          {text: "Je continue à remonter informellement.", score: 1},
          {text: "Je documente les signaux et les remonte formellement, en demandant une position claire.", score: 2}
          ]
        },
        {
          text: "Un membre de l'équipe est en arrêt depuis plusieurs semaines. L'équipe n'en parle pas mais c'est présent. Que faites-vous ?",
          answers: [
          {text: "Je laisse les choses se dérouler naturellement.", score: 0},
          {text: "Je prépare son retour quand il sera prêt.", score: 1},
          {text: "Je prépare les conditions du retour ET je gère l'absence de façon équitable et transparente avec le reste de l'équipe.", score: 2}
          ]
        },
        {
          text: "Votre équipe accumule des signaux de fatigue collective depuis des mois. Vous êtes convaincu qu'une décision organisationnelle est nécessaire. Que faites-vous ?",
          answers: [
          {text: "J'attends — les décisions organisationnelles ne dépendent pas de moi.", score: 0},
          {text: "Je remonte le problème.", score: 1},
          {text: "Je construis un argumentaire factuel et demande une décision formelle avec des délais clairs.", score: 2}
          ]
        }
    ],
  },

  "teletravail-hybridation": {
    0: [
        {
          text: "En télétravail, vous finissez régulièrement votre journée deux heures après l'horaire habituel sans que rien ne l'exige vraiment. Que faites-vous ?",
          answers: [
          {text: "Je profite de l'absence de transport pour travailler plus.", score: 0},
          {text: "Je remarque le phénomène mais ne change pas mes habitudes.", score: 1},
          {text: "Je pose des limites horaires claires et les tiens comme si j'étais au bureau.", score: 2}
          ]
        },
        {
          text: "Votre espace de télétravail n'est pas adapté (bruit, manque de lumière, espace insuffisant). Que faites-vous ?",
          answers: [
          {text: "Je m'adapte — c'est temporaire.", score: 0},
          {text: "Je signale le problème à mon responsable.", score: 1},
          {text: "Je cherche une solution concrète (autre lieu, équipement) et informe mon responsable des contraintes.", score: 2}
          ]
        },
        {
          text: "Vous avez du mal à démarrer la journée en télétravail — vous repoussez les tâches et perdez du temps le matin. Que faites-vous ?",
          answers: [
          {text: "J'attends d'être dans l'élan.", score: 0},
          {text: "Je commence par les tâches les plus faciles pour démarrer.", score: 1},
          {text: "Je mets en place un rituel de démarrage pour structurer ma journée à distance.", score: 2}
          ]
        },
        {
          text: "Les notifications de vos outils de travail vous distraient en permanence en télétravail. Que faites-vous ?",
          answers: [
          {text: "Je les laisse actives — je dois être disponible.", score: 0},
          {text: "Je les coupe pendant mes plages de travail focalisé.", score: 1},
          {text: "J'organise ma disponibilité de façon explicite et j'informe mon équipe de mes plages de concentration.", score: 2}
          ]
        },
        {
          text: "En fin de semaine de télétravail, vous réalisez que vous avez encore moins bien récupéré que lors des semaines au bureau. Que faites-vous ?",
          answers: [
          {text: "J'accepte — le télétravail est plus fatiguant pour moi.", score: 0},
          {text: "Je cherche à faire plus de pauses.", score: 1},
          {text: "J'analyse ce qui génère cette fatigue supplémentaire et cherche à modifier mes habitudes.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "En semaine entièrement à distance, vous n'avez eu aucun échange informel avec vos collègues. Que faites-vous ?",
          answers: [
          {text: "Je me concentre sur le travail — les échanges informels ne sont pas prioritaires.", score: 0},
          {text: "Je profite d'une réunion pour glisser un échange informel.", score: 1},
          {text: "Je crée délibérément des occasions d'échange informel avec mes collègues.", score: 2}
          ]
        },
        {
          text: "Vous avez l'impression de passer sous le radar en télétravail. Votre travail n'est pas visible. Que faites-vous ?",
          answers: [
          {text: "Je travaille plus pour compenser.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je prends des initiatives pour rendre mon travail visible sans avoir besoin de me sur-justifier.", score: 2}
          ]
        },
        {
          text: "Lors d'une réunion hybride, les participants à distance n'ont pas accès aux mêmes informations que ceux en présentiel (tableau, conversations de couloir). Que faites-vous ?",
          answers: [
          {text: "J'essaie de suivre du mieux que je peux.", score: 0},
          {text: "Je demande à quelqu'un de retranscrire les informations importantes.", score: 1},
          {text: "Je nomme le problème et propose une organisation qui équilibre la participation entre présents et distants.", score: 2}
          ]
        },
        {
          text: "Vous êtes à distance et votre équipe prend des décisions sans vous lors de réunions informelles au bureau. Que faites-vous ?",
          answers: [
          {text: "J'accepte — ce n'est pas évitable.", score: 0},
          {text: "Je demande à être tenu informé.", score: 1},
          {text: "Je propose un cadre de décision qui inclut explicitement les personnes à distance.", score: 2}
          ]
        },
        {
          text: "Vous sentez que votre engagement est moins perceptible depuis que vous êtes davantage à distance. Que faites-vous ?",
          answers: [
          {text: "J'envoie plus de messages pour montrer que je travaille.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je cherche à contribuer de façon visible sur les sujets importants sans surinvestir en quantité.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "En mode hybride, vous constatez que certains échanges se passent en français pour les présents et en anglais pour les distants — métaphoriquement : deux niveaux d'information. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte — c'est inévitable.", score: 0},
          {text: "Je mets en place mes propres canaux d'information.", score: 1},
          {text: "Je propose que les canaux de communication soient uniformisés pour que tout le monde ait le même niveau d'accès.", score: 2}
          ]
        },
        {
          text: "Vous avez du mal à vous faire entendre lors des réunions hybrides. Votre temps de parole est réduit. Que faites-vous ?",
          answers: [
          {text: "Je fais des efforts pour m'imposer.", score: 0},
          {text: "Je compense en envoyant mes contributions par écrit.", score: 1},
          {text: "Je nomme le problème en réunion et propose des ajustements de format.", score: 2}
          ]
        },
        {
          text: "Les messages écrits dans vos outils collaboratifs sont souvent mal interprétés par rapport à ce que vous souhaitiez dire. Que faites-vous ?",
          answers: [
          {text: "Je fais plus attention à la formulation.", score: 0},
          {text: "Je passe au téléphone quand les sujets sont sensibles.", score: 1},
          {text: "Je réfléchis à quels sujets méritent un échange oral et lesquels peuvent rester à l'écrit, et j'adapte.", score: 2}
          ]
        },
        {
          text: "Un désaccord naît par message interposé et s'emballe. Que faites-vous ?",
          answers: [
          {text: "Je continue à argumenter par écrit pour clarifier ma position.", score: 0},
          {text: "Je propose de faire un point téléphonique.", score: 1},
          {text: "Je stoppe l'échange écrit et propose un appel rapide pour clarifier de vive voix.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous passez votre journée à répondre à des messages en temps réel et n'avancez plus sur vos sujets de fond. Que faites-vous ?",
          answers: [
          {text: "Je réponds en temps réel — c'est ce qu'on attend de moi.", score: 0},
          {text: "Je coupe les notifications par moments.", score: 1},
          {text: "Je clarifie avec mon équipe mes temps de disponibilité et mes plages de travail focalisé.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "L'organisation hybride crée des tensions entre ceux qui viennent souvent et ceux qui viennent peu. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — ce n'est pas mon rôle de gérer les frustrations des autres.", score: 0},
          {text: "Je pose la question à mon responsable.", score: 1},
          {text: "Je nomme le sujet et propose un échange collectif sur les attentes et les règles du jeu.", score: 2}
          ]
        },
        {
          text: "Vous n'arrivez pas à déconnecter le week-end à cause des outils collaboratifs accessibles en permanence. Que faites-vous ?",
          answers: [
          {text: "Je reste connecté — c'est la réalité du travail aujourd'hui.", score: 0},
          {text: "Je désactive les notifications le week-end.", score: 1},
          {text: "Je pose des règles claires de disponibilité et les communique à mon entourage professionnel.", score: 2}
          ]
        },
        {
          text: "Un collègue vous sollicite régulièrement en dehors des heures de travail via les outils collaboratifs. Que faites-vous ?",
          answers: [
          {text: "Je réponds — il a peut-être une bonne raison.", score: 0},
          {text: "Je réponds quand je le veux mais sans explication.", score: 1},
          {text: "Je lui explique mes règles de disponibilité et cherche à comprendre pourquoi il contacte en dehors des heures habituelles.", score: 2}
          ]
        },
        {
          text: "L'organisation hybride génère chez vous un sentiment de ne jamais être vraiment ni au bureau ni chez vous. Que faites-vous ?",
          answers: [
          {text: "J'accepte — c'est le prix du télétravail.", score: 0},
          {text: "Je cherche à mieux séparer les deux environnements.", score: 1},
          {text: "J'analyse ce qui crée ce flou et cherche à construire des rituels qui délimitent clairement les deux espaces.", score: 2}
          ]
        },
        {
          text: "Vous vous sentez moins bien dans l'équipe depuis que l'organisation hybride est en place. Le lien est moins fort. Que faites-vous ?",
          answers: [
          {text: "J'attends que les choses s'arrangent.", score: 0},
          {text: "J'en parle à quelqu'un de confiance.", score: 1},
          {text: "Je l'exprime à mon équipe ou à mon responsable et propose des pistes pour recréer du lien.", score: 2}
          ]
        }
    ],
  },

  "epuisement-prevention": {
    0: [
        {
          text: "Depuis plusieurs semaines, vous êtes épuisé dès le matin et les journées vous semblent interminables. Vous vous dites que c'est la période. Que faites-vous ?",
          answers: [
          {text: "Je pousse encore — ça va passer.", score: 0},
          {text: "Je cherche à me ménager un peu plus.", score: 1},
          {text: "Je prends ce signal au sérieux et cherche à en comprendre les causes réelles.", score: 2}
          ]
        },
        {
          text: "Vous avez du mal à vous souvenir de la dernière fois où vous vous êtes senti vraiment récupéré. Que faites-vous ?",
          answers: [
          {text: "Je note que je suis fatigué et continue.", score: 0},
          {text: "Je cherche à mieux dormir.", score: 1},
          {text: "Je vois cela comme un signe d'épuisement cumulatif et cherche à agir sur les causes.", score: 2}
          ]
        },
        {
          text: "Les tâches que vous trouviez stimulantes il y a quelques mois vous semblent maintenant sans intérêt. Que faites-vous ?",
          answers: [
          {text: "Je fais le minimum pour avancer.", score: 0},
          {text: "Je cherche à retrouver de la motivation.", score: 1},
          {text: "Je prends cela comme un signal de burnout possible et cherche à en parler.", score: 2}
          ]
        },
        {
          text: "Votre irritabilité augmente au travail. Des situations habituellement neutres vous agacent fortement. Que faites-vous ?",
          answers: [
          {text: "Je m'excuse après coup et continue.", score: 0},
          {text: "Je cherche à mieux gérer mes réactions.", score: 1},
          {text: "J'interprète cela comme un signe de surcharge et cherche à agir en amont.", score: 2}
          ]
        },
        {
          text: "Vous faites des erreurs inhabituelles dans votre travail depuis quelques semaines. Que faites-vous ?",
          answers: [
          {text: "Je redouble d'attention.", score: 0},
          {text: "Je prends note et cherche à m'organiser différemment.", score: 1},
          {text: "Je prends ce signal au sérieux : des erreurs inhabituelles peuvent indiquer un épuisement cognitif.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous avez du mal à dire non à de nouvelles demandes même quand vous êtes déjà saturé. Que faites-vous ?",
          answers: [
          {text: "Je continue à dire oui — refuser m'est difficile.", score: 0},
          {text: "Je dis oui mais en précisant que ce sera pour plus tard.", score: 1},
          {text: "Je cherche à formuler un refus respectueux et à en comprendre les raisons qui me retiennent.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous ne prenez jamais de pause dans la journée. Que faites-vous ?",
          answers: [
          {text: "Les pauses me font perdre du temps.", score: 0},
          {text: "Je prends une pause quand j'ai fini une tâche.", score: 1},
          {text: "Je planifie des pauses dans ma journée comme des engagements non négociables.", score: 2}
          ]
        },
        {
          text: "Votre charge a augmenté mais vous n'avez pas revu vos priorités ni demandé un arbitrage. Que faites-vous ?",
          answers: [
          {text: "J'absorbe — c'est mon rôle de m'adapter.", score: 0},
          {text: "Je signale que c'est beaucoup.", score: 1},
          {text: "Je demande explicitement un arbitrage avec des éléments concrets sur ce qui n'est plus tenable.", score: 2}
          ]
        },
        {
          text: "Vous travaillez souvent le soir et le week-end pour tenir votre charge. Que faites-vous ?",
          answers: [
          {text: "C'est nécessaire pour livrer ce qui est attendu.", score: 0},
          {text: "Je cherche à être plus efficace pendant les heures de travail.", score: 1},
          {text: "Je prends cela comme un signal que ma charge dépasse ma capacité normale et j'en parle à mon responsable.", score: 2}
          ]
        },
        {
          text: "Vous n'avez pas pris de congés depuis plusieurs mois et vous ne savez pas quand vous pourrez en prendre. Que faites-vous ?",
          answers: [
          {text: "Quand la charge baisse, je prendrai des congés.", score: 0},
          {text: "Je pose quelques jours quand c'est possible.", score: 1},
          {text: "Je pose des congés comme une nécessité, pas comme une récompense, et j'anticipe l'organisation.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous savez que vous devriez récupérer mais dès que vous avez un moment libre, vous pensez au travail. Que faites-vous ?",
          answers: [
          {text: "Je laisse aller — c'est difficile à contrôler.", score: 0},
          {text: "Je cherche des activités pour m'occuper l'esprit.", score: 1},
          {text: "Je travaille à créer des espaces de déconnexion réels — activité physique, limites numériques.", score: 2}
          ]
        },
        {
          text: "Votre sommeil est perturbé par des pensées liées au travail depuis plusieurs semaines. Que faites-vous ?",
          answers: [
          {text: "Je m'y habitue — c'est une période tendue.", score: 0},
          {text: "Je prends des médicaments pour dormir.", score: 1},
          {text: "Je vois cela comme un signal sérieux et cherche un appui : médecin, psychologue, employeur.", score: 2}
          ]
        },
        {
          text: "Vous continuez à aller travailler alors que vous vous sentez vraiment au bout du rouleau. Que faites-vous ?",
          answers: [
          {text: "Je tiens — les congés arrivent bientôt.", score: 0},
          {text: "Je travaille à mi-régime sans le dire.", score: 1},
          {text: "Je prends le problème au sérieux et consulte un médecin pour évaluer ma situation.", score: 2}
          ]
        },
        {
          text: "Vous avez l'habitude de ne jamais demander d'aide même quand vous en avez besoin. Que faites-vous face à une surcharge importante ?",
          answers: [
          {text: "Je gère seul — c'est ma façon de fonctionner.", score: 0},
          {text: "Je cherche à me débrouiller avec les ressources disponibles.", score: 1},
          {text: "Je travaille à dépasser cet automatisme et à formuler une demande d'aide explicite.", score: 2}
          ]
        },
        {
          text: "Des activités qui vous ressourçaient habituellement ne vous font plus d'effet. Que faites-vous ?",
          answers: [
          {text: "J'attends que ça revienne.", score: 0},
          {text: "Je cherche de nouvelles activités.", score: 1},
          {text: "Je vois cela comme un signe d'épuisement avancé et cherche un soutien professionnel.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous savez que vous avez besoin d'aide mais vous avez honte de l'admettre. Que faites-vous ?",
          answers: [
          {text: "Je gère seul et personne ne sait.", score: 0},
          {text: "J'en parle à un proche hors travail.", score: 1},
          {text: "Je cherche à mettre de côté la honte et à accéder à un soutien adapté, professionnel ou médical.", score: 2}
          ]
        },
        {
          text: "Vous pensez à consulter un médecin ou un psychologue mais vous vous demandez si votre situation est vraiment assez grave. Que faites-vous ?",
          answers: [
          {text: "J'attends que ça empire pour être sûr.", score: 0},
          {text: "J'en parle à un proche pour avoir son avis.", score: 1},
          {text: "Je consulte — l'anticipation est toujours plus efficace que l'attente.", score: 2}
          ]
        },
        {
          text: "Vous n'êtes pas sûr que votre organisation dispose de ressources d'accompagnement psychologique. Que faites-vous ?",
          answers: [
          {text: "Je suppose qu'il n'y a rien et je ne cherche pas.", score: 0},
          {text: "J'en parle à un collègue.", score: 1},
          {text: "Je me renseigne directement auprès des RH ou du service de santé au travail.", score: 2}
          ]
        },
        {
          text: "Vous traversez un épuisement sérieux et votre responsable ne l'a pas remarqué. Que faites-vous ?",
          answers: [
          {text: "J'attends qu'il le voie.", score: 0},
          {text: "Je lui laisse entendre que ça va mieux de toute façon.", score: 1},
          {text: "Je prends l'initiative d'en parler directement à mon responsable ou aux RH.", score: 2}
          ]
        },
        {
          text: "Vous êtes revenu d'un arrêt maladie lié à l'épuisement mais vous ne sentez pas les conditions changer. Que faites-vous ?",
          answers: [
          {text: "Je reprends comme avant — ça s'est passé, je passe à autre chose.", score: 0},
          {text: "Je signale que les conditions n'ont pas changé.", score: 1},
          {text: "Je prends le temps de redéfinir avec mon responsable les conditions de reprise pour éviter une rechute.", score: 2}
          ]
        }
    ],
  },

  "retour-apres-absence": {
    0: [
        {
          text: "Vous revenez d'un arrêt de plusieurs semaines. Votre boîte mail contient des centaines de messages. Que faites-vous ?",
          answers: [
          {text: "Je traite tout du premier jour pour être à jour rapidement.", score: 0},
          {text: "Je trie les messages les plus importants et traite le reste au fil de l'eau.", score: 1},
          {text: "Je commence par demander à mon responsable quelles sont les priorités avant de plonger dans ma messagerie.", score: 2}
          ]
        },
        {
          text: "Vous revenez d'une longue absence et réalisez que certains de vos projets ont évolué sans vous. Que faites-vous ?",
          answers: [
          {text: "Je reprends le pilotage comme avant.", score: 0},
          {text: "Je me tiens informé de ce qui a changé.", score: 1},
          {text: "Je prends le temps de comprendre les évolutions avant de prendre des décisions.", score: 2}
          ]
        },
        {
          text: "À votre retour, votre périmètre a légèrement changé sans que vous en ayez été informé. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte sans poser de questions.", score: 0},
          {text: "J'en prends note et attends de voir comment ça se passe.", score: 1},
          {text: "Je demande un point clair sur les nouvelles attentes avant de reprendre pleinement.", score: 2}
          ]
        },
        {
          text: "À votre retour, vos collègues vous traitent comme si vous n'aviez jamais été absent. Ça vous met mal à l'aise. Que faites-vous ?",
          answers: [
          {text: "Je fais pareil et reprends le rythme.", score: 0},
          {text: "Je leur signale discrètement que j'ai besoin d'un peu de temps.", score: 1},
          {text: "Je m'accorde le droit de reprendre progressivement et je le communique clairement.", score: 2}
          ]
        },
        {
          text: "Au retour de votre absence, votre responsable vous charge dès le premier jour. Il semble ne pas réaliser l'impact. Que faites-vous ?",
          answers: [
          {text: "Je prends tout — je veux montrer que je suis de retour.", score: 0},
          {text: "Je fais ce que je peux sans le dire.", score: 1},
          {text: "J'expose clairement ce que je peux absorber dans un premier temps.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous revenez d'une longue absence et vous n'êtes plus tout à fait sûr de vos compétences sur certains sujets qui ont évolué. Que faites-vous ?",
          answers: [
          {text: "Je fais comme si j'étais à jour.", score: 0},
          {text: "Je me mets à niveau discrètement.", score: 1},
          {text: "Je reconnais clairement ce dont j'ai besoin pour être opérationnel et demande un accompagnement.", score: 2}
          ]
        },
        {
          text: "Des décisions ont été prises pendant votre absence que vous n'auriez peut-être pas prises de la même façon. Que faites-vous ?",
          answers: [
          {text: "Je les remets en question.", score: 0},
          {text: "Je les accepte sans en parler.", score: 1},
          {text: "Je les accepte et, si elles ont un impact important, j'ouvre une discussion constructive sur les adaptations possibles.", score: 2}
          ]
        },
        {
          text: "Au retour, vous réalisez que certaines relations de travail ont changé pendant votre absence. Que faites-vous ?",
          answers: [
          {text: "Je reprends là où j'étais — les relations se reconstruisent d'elles-mêmes.", score: 0},
          {text: "Je m'y adapte au fil du temps.", score: 1},
          {text: "Je prends des initiatives pour reconstruire les liens importants.", score: 2}
          ]
        },
        {
          text: "Vous devez rattraper un retard professionnel mais vous sentez que votre capacité de travail n'est pas encore à 100%. Que faites-vous ?",
          answers: [
          {text: "Je compense par du volume horaire.", score: 0},
          {text: "Je priorise l'essentiel.", score: 1},
          {text: "Je suis honnête avec mon responsable sur mon état réel et je propose un plan de reprise réaliste.", score: 2}
          ]
        },
        {
          text: "Votre équipe vous sollicite beaucoup à votre retour. C'est valorisant mais épuisant. Que faites-vous ?",
          answers: [
          {text: "Je réponds à tout — je suis de retour.", score: 0},
          {text: "Je gère au cas par cas selon mon énergie.", score: 1},
          {text: "Je pose des limites claires sur ma disponibilité dans les premiers jours.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous avez du mal à retrouver votre rythme de travail après votre absence. Que faites-vous ?",
          answers: [
          {text: "Je force et ça finit par venir.", score: 0},
          {text: "Je me fixe des objectifs simples pour les premiers jours.", score: 1},
          {text: "Je construis une reprise progressive et en parle ouvertement à mon responsable.", score: 2}
          ]
        },
        {
          text: "À votre retour, vous avez l'impression de ne plus être dans la boucle et d'avoir raté des choses importantes. Que faites-vous ?",
          answers: [
          {text: "Je remonte aux derniers emails importants.", score: 0},
          {text: "Je demande à un collègue de me mettre à jour.", score: 1},
          {text: "Je demande un point structuré à mon responsable sur les évolutions importantes et les priorités actuelles.", score: 2}
          ]
        },
        {
          text: "Vous vous surcompensez pour montrer que vous êtes pleinement opérationnel, mais vous vous épuisez à nouveau. Que faites-vous ?",
          answers: [
          {text: "Je continue — il faut que je sois à la hauteur.", score: 0},
          {text: "Je lève le pied discrètement.", score: 1},
          {text: "Je reconnais cette dynamique et agis pour casser le cercle vicieux.", score: 2}
          ]
        },
        {
          text: "Au retour, un collègue vous pose des questions sur les raisons de votre absence. Vous ne souhaitez pas en parler. Que faites-vous ?",
          answers: [
          {text: "Je lui donne une réponse vague et change de sujet.", score: 0},
          {text: "Je lui dis que c'était personnel sans aller plus loin.", score: 1},
          {text: "Je pose clairement une limite, de façon calme : il n'est pas nécessaire que je m'en explique.", score: 2}
          ]
        },
        {
          text: "Vous êtes revenu mais vous ne vous sentez pas vraiment prêt. Que faites-vous ?",
          answers: [
          {text: "Je fais bonne figure — ça reviendra.", score: 0},
          {text: "Je travaille à mi-régime sans le dire.", score: 1},
          {text: "J'en parle à mon médecin et à mon responsable pour définir des conditions de reprise adaptées.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Plusieurs semaines après votre retour, vous sentez que votre énergie ne remonte pas vraiment. Que faites-vous ?",
          answers: [
          {text: "J'attends encore — le retour prend du temps.", score: 0},
          {text: "Je prends des congés supplémentaires.", score: 1},
          {text: "Je consulte à nouveau un médecin : ce signal n'est pas à ignorer.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que les conditions qui ont causé votre absence n'ont pas changé. Que faites-vous ?",
          answers: [
          {text: "Je reprends en espérant que ça se passe mieux.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je formalise clairement les conditions nécessaires à un retour durable et demande un engagement concret.", score: 2}
          ]
        },
        {
          text: "À votre retour, votre responsable vous charge progressivement plus vite que vous ne le souhaiteriez. Que faites-vous ?",
          answers: [
          {text: "Je tiens — il faut montrer que je suis capable.", score: 0},
          {text: "Je lui dis que c'est un peu tôt.", score: 1},
          {text: "J'exprime clairement mon rythme de reprise et les limites que je dois respecter pour ne pas rechuter.", score: 2}
          ]
        },
        {
          text: "Vous avez encore des moments difficiles ponctuels depuis votre retour. Vous ne savez pas si vous devez en parler. Que faites-vous ?",
          answers: [
          {text: "Je garde ça pour moi — ça peut faire peur aux autres.", score: 0},
          {text: "J'en parle à quelqu'un de confiance hors travail.", score: 1},
          {text: "J'en parle à la personne la plus adaptée selon la nature du problème : médecin, RH, ou responsable.", score: 2}
          ]
        },
        {
          text: "Une situation similaire à celle qui vous a causé votre absence se reproduit. Que faites-vous ?",
          answers: [
          {text: "J'essaie de la gérer autrement cette fois.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "J'agis rapidement pour ne pas laisser la situation s'installer : signalement, ajustement de charge, demande d'aide.", score: 2}
          ]
        }
    ],
  },

  "manager-signaux-rps": {
    0: [
        {
          text: "Un collaborateur qui était toujours à l'heure commence à arriver en retard régulièrement. Il ne donne pas d'explication. Que faites-vous ?",
          answers: [
          {text: "Je note le retard et lui rappelle les règles.", score: 0},
          {text: "Je lui demande si tout va bien.", score: 1},
          {text: "Je crée un espace pour échanger sur sa situation sans le mettre en difficulté.", score: 2}
          ]
        },
        {
          text: "Un collaborateur habitué à contribuer activement en réunion ne dit plus rien depuis deux semaines. Que faites-vous ?",
          answers: [
          {text: "J'attends de voir si ça change.", score: 0},
          {text: "Je lui pose la question en réunion pour le faire participer.", score: 1},
          {text: "Je crée un moment en dehors des réunions pour lui demander comment il se sent.", score: 2}
          ]
        },
        {
          text: "Vous constatez que la qualité du travail d'un collaborateur a baissé sans raison apparente. Que faites-vous ?",
          answers: [
          {text: "Je lui fais un retour sur la qualité de son travail.", score: 0},
          {text: "Je lui demande si quelque chose le perturbe.", score: 1},
          {text: "Je crée un espace d'échange sur sa charge et son vécu avant d'aborder la performance.", score: 2}
          ]
        },
        {
          text: "Un collaborateur est de plus en plus absent pour des arrêts courts et répétitifs. Que faites-vous ?",
          answers: [
          {text: "Je note les absences et les suis administrativement.", score: 0},
          {text: "Je lui demande si quelque chose ne va pas.", score: 1},
          {text: "Je crée un espace d'échange bienveillant et, si nécessaire, je l'oriente vers le médecin du travail.", score: 2}
          ]
        },
        {
          text: "Un collaborateur est de plus en plus irritable avec ses collègues. Ça commence à affecter l'ambiance. Que faites-vous ?",
          answers: [
          {text: "Je lui rappelle l'importance du respect dans l'équipe.", score: 0},
          {text: "Je l'aborde sur l'impact de son comportement.", score: 1},
          {text: "Je l'aborde d'abord sur comment il va lui, avant de parler de l'impact sur l'équipe.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un collaborateur vous dit que tout va bien mais son comportement dit le contraire. Que faites-vous ?",
          answers: [
          {text: "Je le crois sur parole.", score: 0},
          {text: "Je continue à observer sans intervenir.", score: 1},
          {text: "Je lui reflète ce que j'observe de façon factuelle et lui laisse l'espace de s'exprimer.", score: 2}
          ]
        },
        {
          text: "Vous avez la conviction qu'un collaborateur est en souffrance mais il nie toute difficulté. Que faites-vous ?",
          answers: [
          {text: "Je respecte sa version.", score: 0},
          {text: "J'insiste pour qu'il reconnaisse la situation.", score: 1},
          {text: "Je reste disponible, lui fais savoir que la porte est ouverte et reste attentif à la situation.", score: 2}
          ]
        },
        {
          text: "Un collaborateur partage avec vous une difficulté personnelle qui affecte son travail. Que faites-vous ?",
          answers: [
          {text: "Je l'écoute et lui dis d'essayer de séparer vie personnelle et vie professionnelle.", score: 0},
          {text: "Je l'écoute et lui propose de prendre des congés.", score: 1},
          {text: "Je l'écoute vraiment, j'évalue avec lui ce que l'organisation peut faire et je l'oriente vers les bons relais si nécessaire.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande de ne rien dire à personne d'une situation difficile qu'il traverse. Que faites-vous ?",
          answers: [
          {text: "Je respecte sa demande totalement.", score: 0},
          {text: "Je lui promets la confidentialité et respecte cela.", score: 1},
          {text: "Je l'écoute, lui explique ce que je peux et ne peux pas garder pour moi selon la gravité, et je prends une décision responsable.", score: 2}
          ]
        },
        {
          text: "Vous intervenez sur la situation d'un collaborateur et vous réalisez que ça dépasse vos compétences. Que faites-vous ?",
          answers: [
          {text: "Je continue à gérer — c'est mon rôle de manager.", score: 0},
          {text: "Je lui suggère de consulter un médecin.", score: 1},
          {text: "Je passe clairement la main au bon interlocuteur (médecin du travail, RH) en lui expliquant pourquoi.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous voulez orienter un collaborateur vers le médecin du travail mais il vit cela comme une mise à l'écart. Que faites-vous ?",
          answers: [
          {text: "Je renonce — il n'est pas prêt.", score: 0},
          {text: "Je lui explique que c'est obligatoire.", score: 1},
          {text: "Je lui explique le rôle du médecin du travail et en quoi c'est une ressource pour lui, pas une sanction.", score: 2}
          ]
        },
        {
          text: "Vous avez des doutes sur un collaborateur mais vous ne voulez pas le stigmatiser en intervenant trop tôt. Que faites-vous ?",
          answers: [
          {text: "J'attends d'être certain.", score: 0},
          {text: "J'observe plus attentivement.", score: 1},
          {text: "Je trouve une façon d'ouvrir la discussion sans poser de diagnostic, de façon naturelle et factuelle.", score: 2}
          ]
        },
        {
          text: "Le service RH que vous devriez solliciter n'est pas facilement accessible. Que faites-vous ?",
          answers: [
          {text: "Je gère seul.", score: 0},
          {text: "Je cherche une autre personne de confiance.", score: 1},
          {text: "Je cherche le bon canal formel et j'insiste pour accéder aux ressources nécessaires.", score: 2}
          ]
        },
        {
          text: "Votre propre hiérarchie vous dit de ne pas trop chercher à comprendre les difficultés personnelles des collaborateurs. Que faites-vous ?",
          answers: [
          {text: "Je suis la consigne — je ne veux pas créer de conflit.", score: 0},
          {text: "Je continue discrètement à être attentif.", score: 1},
          {text: "Je défends ma vision de ce qu'implique mon rôle et j'explique en quoi ignorer ces signaux a des conséquences.", score: 2}
          ]
        },
        {
          text: "Vous avez orienté un collaborateur vers un soutien externe mais il ne s'y est pas rendu. Que faites-vous ?",
          answers: [
          {text: "Je laisse — c'est son choix.", score: 0},
          {text: "Je lui redemande d'y aller.", score: 1},
          {text: "Je comprends ce qui l'a empêché d'y aller et je cherche à lever les obstacles avec lui.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "L'organisation de votre équipe génère structurellement de la surcharge. Que faites-vous au-delà de gérer les symptômes individuels ?",
          answers: [
          {text: "Je gère les cas au fil de l'eau.", score: 0},
          {text: "Je remonte la situation à ma hiérarchie.", score: 1},
          {text: "Je construis une analyse factuelle des causes organisationnelles et demande une décision sur la structure.", score: 2}
          ]
        },
        {
          text: "Votre équipe a des objectifs qui conduisent mécaniquement à des situations de surcharge. Que faites-vous ?",
          answers: [
          {text: "J'aide chacun à s'organiser mieux.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je formalise le lien entre objectifs et surcharge et demande un arbitrage sur les objectifs eux-mêmes.", score: 2}
          ]
        },
        {
          text: "Vous vous rendez compte que vous n'avez pas les connaissances suffisantes pour détecter les signaux de RPS correctement. Que faites-vous ?",
          answers: [
          {text: "Je fais de mon mieux avec ce que je sais.", score: 0},
          {text: "Je cherche des informations en ligne.", score: 1},
          {text: "Je demande une formation ou un appui à ma hiérarchie ou aux RH.", score: 2}
          ]
        },
        {
          text: "Vous constatez que les alertes RPS dans votre équipe se multiplient et que les ressources disponibles sont insuffisantes. Que faites-vous ?",
          answers: [
          {text: "Je gère avec ce que j'ai.", score: 0},
          {text: "J'en informe les RH.", score: 1},
          {text: "Je construis un argumentaire factuel pour demander des ressources supplémentaires adaptées.", score: 2}
          ]
        },
        {
          text: "Vous avez géré plusieurs situations difficiles de RPS en peu de temps. Vous êtes vous-même épuisé. Que faites-vous ?",
          answers: [
          {text: "Je continue — les collaborateurs ont besoin de moi.", score: 0},
          {text: "Je cherche à déléguer certaines responsabilités.", score: 1},
          {text: "Je cherche un soutien pour moi-même : ma hiérarchie, les RH, ou un professionnel.", score: 2}
          ]
        }
    ],
  },

  "changement-reflexes": {
    0: [
        {
          text: "Votre organisation annonce un changement important. Les informations sont incomplètes. Que faites-vous ?",
          answers: [
          {text: "J'attends d'avoir toutes les informations avant de m'impliquer.", score: 0},
          {text: "Je pose des questions à mon responsable pour comprendre.", score: 1},
          {text: "Je cherche à clarifier ce qui concerne directement mon périmètre et j'agis sur ce que je maîtrise.", score: 2}
          ]
        },
        {
          text: "Un nouveau processus est introduit. Il est moins efficace que votre méthode actuelle dans certains cas. Que faites-vous ?",
          answers: [
          {text: "Je continue avec ma méthode — elle est plus efficace.", score: 0},
          {text: "J'applique le nouveau processus en faisant des ajustements informels.", score: 1},
          {text: "J'applique le nouveau processus et je remonte formellement les cas où il pose problème.", score: 2}
          ]
        },
        {
          text: "Votre rôle évolue et certaines compétences que vous maîtrisez bien deviennent moins centrales. Que faites-vous ?",
          answers: [
          {text: "Je me concentre sur ce que je sais faire.", score: 0},
          {text: "J'observe comment les autres gèrent la transition.", score: 1},
          {text: "Je cherche activement à développer les compétences dont j'aurai besoin dans le nouveau contexte.", score: 2}
          ]
        },
        {
          text: "Un changement d'outil vous est imposé alors que vous êtes très à l'aise avec l'ancien. Que faites-vous ?",
          answers: [
          {text: "Je résiste passivement en continuant à utiliser l'ancien quand je peux.", score: 0},
          {text: "J'adopte le nouvel outil mais j'exprime ma réticence.", score: 1},
          {text: "J'adopte le nouvel outil et cherche à en comprendre les avantages avant de le juger.", score: 2}
          ]
        },
        {
          text: "Vous devez changer votre façon de travailler avec vos collègues suite à une réorganisation. Les frontières sont floues. Que faites-vous ?",
          answers: [
          {text: "J'attends que ça se clarifie tout seul.", score: 0},
          {text: "Je m'adapte au fil des interactions.", score: 1},
          {text: "Je propose une discussion avec les personnes concernées pour clarifier les nouvelles interfaces.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous devez avancer sur un projet alors que des décisions importantes ne sont pas encore prises. Que faites-vous ?",
          answers: [
          {text: "J'attends les décisions avant de démarrer.", score: 0},
          {text: "Je commence sur les parties qui ne dépendent d'aucune décision.", score: 1},
          {text: "Je clarifie ce que je peux avancer de façon autonome, je le fais, et je signale les blocages.", score: 2}
          ]
        },
        {
          text: "Une information contradictoire circule dans votre équipe sur un changement en cours. Que faites-vous ?",
          answers: [
          {text: "J'attends que la bonne information arrive.", score: 0},
          {text: "Je partage ce que je sais.", score: 1},
          {text: "Je cherche à vérifier la source et à clarifier formellement pour éviter que l'incertitude ne s'installe.", score: 2}
          ]
        },
        {
          text: "Vous devez prendre une décision opérationnelle dans un contexte où les priorités ne sont pas clairement définies. Que faites-vous ?",
          answers: [
          {text: "Je décide en fonction de ce qui me semble logique.", score: 0},
          {text: "Je demande à mon responsable avant d'agir.", score: 1},
          {text: "Je décide avec les informations disponibles et documente mes hypothèses pour les ajuster si besoin.", score: 2}
          ]
        },
        {
          text: "Un projet prend une direction différente de ce qui avait été prévu. Votre travail est partiellement remis en question. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte sans poser de question.", score: 0},
          {text: "J'exprime ma frustration mais je suis la nouvelle direction.", score: 1},
          {text: "J'essaie de comprendre la raison du changement et je clarifie ce qui est désormais attendu de moi.", score: 2}
          ]
        },
        {
          text: "Des personnes de votre équipe ont des informations différentes sur un même sujet. Que faites-vous ?",
          answers: [
          {text: "Je leur dis de chercher par eux-mêmes.", score: 0},
          {text: "Je partage ce que je sais à ceux qui me demandent.", score: 1},
          {text: "Je m'assure qu'une version alignée et fiable soit partagée avec tout le monde.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un collègue vous fait un retour que vous trouvez injuste sur votre façon de travailler. Que faites-vous ?",
          answers: [
          {text: "Je le conteste immédiatement.", score: 0},
          {text: "Je l'écoute mais ne change pas ma façon de travailler.", score: 1},
          {text: "Je l'écoute vraiment, cherche ce qui peut être utile dedans et décide ensuite comment y donner suite.", score: 2}
          ]
        },
        {
          text: "Votre responsable vous fait un retour direct que vous percevez comme maladroit dans la forme. Que faites-vous ?",
          answers: [
          {text: "Je me braque sur la forme et n'entends pas le fond.", score: 0},
          {text: "Je l'écoute poliment sans vraiment retenir le message.", score: 1},
          {text: "Je dépasse la forme pour accéder au fond du retour et l'utilise comme une information utile.", score: 2}
          ]
        },
        {
          text: "Vous réalisez après coup qu'un feedback que vous avez donné a été mal reçu. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — c'est à lui de s'adapter.", score: 0},
          {text: "Je lui explique que ce n'est pas ce que j'avais voulu dire.", score: 1},
          {text: "Je reviens vers lui pour comprendre comment il l'a perçu et ajuste ma communication.", score: 2}
          ]
        },
        {
          text: "Votre équipe vous demande un feedback sur leur travail mais vous n'avez pas toutes les informations pour évaluer correctement. Que faites-vous ?",
          answers: [
          {text: "Je donne un feedback général et positif.", score: 0},
          {text: "Je reporte le feedback à plus tard.", score: 1},
          {text: "Je donne un feedback sur ce que j'ai pu observer et suis transparent sur les zones où je manque d'information.", score: 2}
          ]
        },
        {
          text: "Vous donnez régulièrement du feedback à vos collègues mais vous recevez rarement de retour sur votre propre travail. Que faites-vous ?",
          answers: [
          {text: "Je considère que l'absence de retour négatif est un signe positif.", score: 0},
          {text: "J'attends que quelqu'un prenne l'initiative.", score: 1},
          {text: "Je sollicite explicitement des retours sur mon travail de manière régulière.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous avez adopté une nouvelle pratique de travail mais vous revenez aux anciennes habitudes dès que vous êtes sous pression. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas grave — la pression force les anciens réflexes.", score: 0},
          {text: "Je me rappelle à l'ordre et recommence.", score: 1},
          {text: "J'identifie ce qui déclenche le retour en arrière et travaille sur ce point précis.", score: 2}
          ]
        },
        {
          text: "Votre équipe adopte formellement une nouvelle pratique mais la réalité reste différente. Que faites-vous ?",
          answers: [
          {text: "Je les laisse s'adapter à leur rythme.", score: 0},
          {text: "Je rappelle l'importance de la nouvelle pratique.", score: 1},
          {text: "Je cherche à comprendre ce qui empêche l'ancrage réel et j'agis sur les causes.", score: 2}
          ]
        },
        {
          text: "Une pratique que vous aviez abandonnée revient dans votre équipe parce que la nouvelle n'est pas encore fluide. Que faites-vous ?",
          answers: [
          {text: "J'accepte — c'est une transition normale.", score: 0},
          {text: "J'essaie de trouver un équilibre entre les deux.", score: 1},
          {text: "Je traite cela comme un signal d'ajustement et cherche à rendre la nouvelle pratique plus accessible.", score: 2}
          ]
        },
        {
          text: "Vous avez mis en place une nouvelle façon de travailler qui a bien fonctionné au départ mais perd en vigueur. Que faites-vous ?",
          answers: [
          {text: "J'attends que les personnes se remobilisent d'elles-mêmes.", score: 0},
          {text: "Je rappelle l'importance de la pratique.", score: 1},
          {text: "Je cherche à revitaliser la démarche, peut-être en l'ajustant si elle n'est plus adaptée.", score: 2}
          ]
        },
        {
          text: "Une habitude collective nuisible a été identifiée et des alternatives proposées, mais elle persiste. Que faites-vous ?",
          answers: [
          {text: "Je laisse faire — le changement prend du temps.", score: 0},
          {text: "Je signale à nouveau le problème.", score: 1},
          {text: "Je cherche pourquoi l'alternative n'est pas adoptée et si c'est la bonne solution ou si elle doit être révisée.", score: 2}
          ]
        }
    ],
  },

  "feedback-managerial": {
    0: [
        {
          text: "Vous souhaitez faire un feedback à un collaborateur sur une situation récente. Il est occupé. Que faites-vous ?",
          answers: [
          {text: "Je lui fais le feedback entre deux portes.", score: 0},
          {text: "J'attends une réunion d'équipe pour aborder le sujet.", score: 1},
          {text: "Je prends le temps de trouver un moment approprié, en tête à tête, pour ce type d'échange.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vient de terminer une mission difficile. Vous voulez lui donner un retour. Le contexte est tendu. Que faites-vous ?",
          answers: [
          {text: "Je reporte le feedback à quand l'atmosphère sera meilleure.", score: 0},
          {text: "Je donne le feedback rapidement pour que ce soit fait.", score: 1},
          {text: "Je choisis soigneusement le moment et le lieu pour que le feedback soit réellement reçu.", score: 2}
          ]
        },
        {
          text: "Vous avez du feedback positif et des points d'amélioration à donner. Comment les ordonnez-vous ?",
          answers: [
          {text: "Je commence toujours par le positif pour adoucir la critique.", score: 0},
          {text: "Je donne le plus important en premier, qu'il soit positif ou non.", score: 1},
          {text: "J'adapte l'ordre selon la personne et le contexte pour que le message principal soit clairement entendu.", score: 2}
          ]
        },
        {
          text: "Vous savez qu'un collaborateur est sensible aux critiques. Vous avez un feedback difficile à lui donner. Que faites-vous ?",
          answers: [
          {text: "Je l'édulcore pour qu'il soit mieux reçu.", score: 0},
          {text: "Je donne le feedback clairement mais en restant prudent.", score: 1},
          {text: "Je pense à comment formuler le feedback pour qu'il soit utile sans le retenir ou le transformer.", score: 2}
          ]
        },
        {
          text: "Lors d'un entretien, un collaborateur vous demande un feedback direct sur son travail. Vous n'avez pas tout observé. Que faites-vous ?",
          answers: [
          {text: "Je donne un feedback global positif.", score: 0},
          {text: "Je lui donne un feedback sur ce que j'ai pu observer.", score: 1},
          {text: "Je suis transparent sur mes zones d'observation et lui donne un feedback factuel sur ce que je sais.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous devez donner un feedback négatif à un collaborateur. Il travaille bien en général mais a fait une erreur sérieuse. Comment le formulez-vous ?",
          answers: [
          {text: "Je nomme l'erreur clairement et lui dis ce qu'il doit corriger.", score: 0},
          {text: "Je contextualise avec ses bons points puis j'aborde l'erreur.", score: 1},
          {text: "Je m'appuie sur les faits observés, explique l'impact et oriente vers une piste d'amélioration concrète.", score: 2}
          ]
        },
        {
          text: "Vous observez qu'un collaborateur a des comportements qui freinent la coopération dans l'équipe. Que faites-vous ?",
          answers: [
          {text: "J'en parle à l'équipe de façon générale sans le cibler.", score: 0},
          {text: "Je lui dis qu'il doit mieux coopérer.", score: 1},
          {text: "Je lui donne des exemples concrets de comportements observés et de leur impact sur l'équipe.", score: 2}
          ]
        },
        {
          text: "Votre feedback à un collaborateur n'a pas produit de changement après deux semaines. Que faites-vous ?",
          answers: [
          {text: "Je répète le même feedback.", score: 0},
          {text: "Je lui dis que les choses n'ont pas changé.", score: 1},
          {text: "Je cherche à comprendre ce qui empêche le changement et j'adapte mon approche.", score: 2}
          ]
        },
        {
          text: "Vous avez donné un feedback que le collaborateur a contesté vigoureusement. Que faites-vous ?",
          answers: [
          {text: "Je maintiens ma position.", score: 0},
          {text: "Je réévalue si j'ai tort.", score: 1},
          {text: "J'écoute vraiment ses arguments, distingue ce qui est une perspective utile de ce qui est une défensive, et ajuste si besoin.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande un feedback sur un travail dont vous n'avez pas eu le temps de vérifier les détails. Que faites-vous ?",
          answers: [
          {text: "Je lui donne un retour global.", score: 0},
          {text: "Je reporte le feedback.", score: 1},
          {text: "Je lui explique que mon retour sera limité par le temps que j'ai eu pour l'examiner et je lui donne ce que je peux.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un collaborateur vous donne un retour critique sur votre façon de communiquer. Vous ne l'avez pas sollicité. Que faites-vous ?",
          answers: [
          {text: "Je le recadre — ce n'était pas une invitation à me critiquer.", score: 0},
          {text: "Je l'écoute poliment.", score: 1},
          {text: "Je l'accueille avec curiosité même si c'est inconfortable.", score: 2}
          ]
        },
        {
          text: "Votre responsable vous fait un feedback que vous trouvez injuste. Que faites-vous ?",
          answers: [
          {text: "J'accepte sans répondre.", score: 0},
          {text: "Je le conteste immédiatement.", score: 1},
          {text: "J'écoute, prends le temps de digérer, puis engage un échange construit si je pense qu'il y a un malentendu.", score: 2}
          ]
        },
        {
          text: "Vous recevez un feedback anonyme via un outil RH. Vous pensez savoir qui l'a formulé. Que faites-vous ?",
          answers: [
          {text: "Je cherche à identifier la personne.", score: 0},
          {text: "Je tente de comprendre ce qui a pu motiver ce feedback.", score: 1},
          {text: "Je prends le feedback pour ce qu'il est et travaille sur le fond, sans chercher à l'attribuer.", score: 2}
          ]
        },
        {
          text: "Votre équipe vous donne des feedbacks en collectif lors d'une rétrospective. Certains vous surprennent. Que faites-vous ?",
          answers: [
          {text: "Je défends mes choix.", score: 0},
          {text: "J'écoute et note sans réagir.", score: 1},
          {text: "Je pose des questions pour comprendre ce qui est derrière chaque point et j'en tiens compte.", score: 2}
          ]
        },
        {
          text: "Vous recevez un feedback très positif. Vous avez tendance à le minimiser. Que faites-vous ?",
          answers: [
          {text: "Je le relativise — il n'est peut-être pas sincère.", score: 0},
          {text: "Je le reçois mais je ne lui accorde pas trop d'importance.", score: 1},
          {text: "Je le reçois pleinement et cherche à comprendre ce qui, dans mon comportement, est perçu positivement.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous avez reçu un feedback important il y a un mois. Vous n'avez pas encore ajusté votre comportement. Que faites-vous ?",
          answers: [
          {text: "Je l'avais noté mais d'autres priorités ont pris le dessus.", score: 0},
          {text: "Je cherche à le mettre en pratique dans les prochaines semaines.", score: 1},
          {text: "Je reconnais que je ne l'ai pas appliqué et j'identifie concrètement ce que je vais changer et quand.", score: 2}
          ]
        },
        {
          text: "Un feedback que vous avez reçu a changé votre façon de travailler. Comment vous en assurez-vous dans la durée ?",
          answers: [
          {text: "Je fais confiance à mes nouvelles habitudes.", score: 0},
          {text: "Je reste attentif à ne pas revenir aux anciens comportements.", score: 1},
          {text: "Je demande à mon interlocuteur de continuer à me donner des retours pour valider que le changement s'est ancré.", score: 2}
          ]
        },
        {
          text: "Vous vous rendez compte qu'un feedback que vous avez reçu il y a longtemps était juste mais que vous ne l'aviez pas entendu à l'époque. Que faites-vous ?",
          answers: [
          {text: "Je l'oublie — ce qui est passé est passé.", score: 0},
          {text: "Je repense à la situation mais sans agir.", score: 1},
          {text: "Je reviens vers la personne pour lui signifier que son feedback a finalement eu de l'impact.", score: 2}
          ]
        },
        {
          text: "Une pratique que vous avez ajustée suite à un feedback revient à l'ancienne sous la pression. Que faites-vous ?",
          answers: [
          {text: "Je l'accepte — la pression force les réflexes.", score: 0},
          {text: "Je me recadre quand je m'en aperçois.", score: 1},
          {text: "Je traite cette régression comme un signal : le changement n'est pas encore ancré et j'ai besoin de travail supplémentaire.", score: 2}
          ]
        },
        {
          text: "Vous avez l'habitude de ne pas partager vos propres apprentissages avec votre équipe. Que faites-vous ?",
          answers: [
          {text: "Ce sont mes apprentissages personnels — pas nécessaire de les partager.", score: 0},
          {text: "Je les partage quand l'occasion se présente.", score: 1},
          {text: "Je cherche activement à partager mes apprentissages : ça renforce la culture d'amélioration continue.", score: 2}
          ]
        }
    ],
  },

  "manager-engageant-tbf": {
    0: [
        {
          text: "Votre équipe démarre un projet mais les rôles et les attentes ne sont pas clairement définis. Que faites-vous ?",
          answers: [
          {text: "Je laisse chacun trouver sa place naturellement.", score: 0},
          {text: "Je donne des indications générales au démarrage.", score: 1},
          {text: "Je prends le temps de clarifier les rôles, les objectifs et les marges de décision de chacun.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande la raison d'une décision que vous avez prise. Que faites-vous ?",
          answers: [
          {text: "Je lui dis que c'est une décision que j'ai prise et qu'il doit la suivre.", score: 0},
          {text: "Je lui explique brièvement.", score: 1},
          {text: "Je lui explique le contexte et les critères qui ont guidé ma décision.", score: 2}
          ]
        },
        {
          text: "Votre équipe travaille sur un projet mais le sens de la contribution de chacun n'est pas clair. Que faites-vous ?",
          answers: [
          {text: "Je suppose que chacun comprend sa valeur ajoutée.", score: 0},
          {text: "Je leur rappelle les objectifs du projet.", score: 1},
          {text: "Je crée un moment pour relier le travail de chacun à un enjeu plus large.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande plus d'autonomie sur une décision. Vous n'êtes pas sûr qu'il soit prêt. Que faites-vous ?",
          answers: [
          {text: "Je refuse — il faut qu'il fasse ses preuves d'abord.", score: 0},
          {text: "Je lui donne l'autonomie en restant disponible.", score: 1},
          {text: "Je lui explique ce dont j'ai besoin de voir pour lui accorder cette autonomie et on en reparle.", score: 2}
          ]
        },
        {
          text: "Les membres de votre équipe ont des niveaux très différents sur certains sujets. Que faites-vous ?",
          answers: [
          {text: "Chacun travaille à son niveau — c'est naturel.", score: 0},
          {text: "Je pousse les moins bons à s'améliorer.", score: 1},
          {text: "Je cherche à créer des conditions d'apprentissage mutuel et à valoriser la complémentarité.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un collaborateur prend trop souvent vos décisions à votre place parce que vous n'êtes pas disponible. Que faites-vous ?",
          answers: [
          {text: "Je lui dis de vous consulter avant d'agir.", score: 0},
          {text: "Je lui délègue officiellement ces décisions.", score: 1},
          {text: "Je clarifie ce qu'il peut décider seul et dans quels cas il doit vous solliciter.", score: 2}
          ]
        },
        {
          text: "Votre équipe attend systématiquement votre validation avant d'agir, même sur des sujets simples. Que faites-vous ?",
          answers: [
          {text: "Je valide rapidement pour ne pas les bloquer.", score: 0},
          {text: "Je leur dis qu'ils peuvent décider.", score: 1},
          {text: "Je cherche à comprendre pourquoi ils n'osent pas décider et travaille à créer un environnement plus sécurisant.", score: 2}
          ]
        },
        {
          text: "Vous avez délégué une mission à un collaborateur. Il revient vers vous à chaque étape. Que faites-vous ?",
          answers: [
          {text: "Je réponds à chaque sollicitation — il a besoin de moi.", score: 0},
          {text: "Je lui dis de débrouiller seul.", score: 1},
          {text: "Je l'aide à prendre confiance en analysant avec lui ce qui l'empêche d'avancer seul.", score: 2}
          ]
        },
        {
          text: "Un collaborateur prend une initiative sans vous consulter. Elle est bonne mais hors de son périmètre habituel. Que faites-vous ?",
          answers: [
          {text: "Je lui rappelle qu'il aurait dû me consulter.", score: 0},
          {text: "Je valorise l'initiative et ne dis rien sur le périmètre.", score: 1},
          {text: "Je valorise l'initiative et clarifie ensemble les frontières de son périmètre de décision.", score: 2}
          ]
        },
        {
          text: "Vous constatez que votre présence dans le travail de votre équipe est parfois ressentie comme un contrôle. Que faites-vous ?",
          answers: [
          {text: "Je réduis ma présence.", score: 0},
          {text: "J'explique que ma présence n'est pas un contrôle.", score: 1},
          {text: "Je réfléchis à comment je me positionne dans leurs échanges et j'ajuste pour être un appui plutôt qu'un observateur.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Votre équipe traverse une période difficile. L'énergie est basse. Que faites-vous ?",
          answers: [
          {text: "Je les encourage à tenir encore un peu.", score: 0},
          {text: "Je cherche à soulager la pression.", score: 1},
          {text: "Je nommer ce que j'observe, je reconnais l'effort fourni et je cherche avec eux ce qui peut être allégé.", score: 2}
          ]
        },
        {
          text: "Un collaborateur qui s'investissait beaucoup semble moins impliqué. Que faites-vous ?",
          answers: [
          {text: "Je l'encourage à se remobiliser.", score: 0},
          {text: "Je lui demande si tout va bien.", score: 1},
          {text: "Je crée un espace d'échange sur son vécu de son travail et ce qui a pu changer.", score: 2}
          ]
        },
        {
          text: "L'équipe génère de bons résultats mais l'ambiance est mécanique. Que faites-vous ?",
          answers: [
          {text: "Les résultats sont bons — l'ambiance n'est pas prioritaire.", score: 0},
          {text: "Je cherche à créer des moments conviviaux.", score: 1},
          {text: "J'analyse ce qui crée ce fonctionnement mécanique et travaille sur les conditions qui permettraient plus d'engagement.", score: 2}
          ]
        },
        {
          text: "Certains membres de l'équipe sont très investis, d'autres beaucoup moins. Comment gérez-vous l'inégalité d'engagement ?",
          answers: [
          {text: "C'est naturel — les personnes s'investissent différemment.", score: 0},
          {text: "Je valorise ceux qui s'investissent.", score: 1},
          {text: "Je cherche à comprendre les raisons de l'inégalité et à créer les conditions qui permettraient à chacun de s'investir davantage.", score: 2}
          ]
        },
        {
          text: "Vous réalisez qu'un irritant récurrent dans votre équipe n'a jamais été traité. Que faites-vous ?",
          answers: [
          {text: "Je n'y avais pas pensé — je vais le noter.", score: 0},
          {text: "Je le signale à ma hiérarchie.", score: 1},
          {text: "Je prends l'initiative de le traiter ou d'expliquer pourquoi c'est compliqué à résoudre.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous réalisez que votre façon de manager est trop directionnelle. Certains collaborateurs sont peu autonomes. Que faites-vous ?",
          answers: [
          {text: "Je suis satisfait que les choses soient sous contrôle.", score: 0},
          {text: "Je cherche à être moins présent.", score: 1},
          {text: "Je travaille activement à transférer des espaces de décision et à valoriser l'autonomie progressive.", score: 2}
          ]
        },
        {
          text: "Un nouveau membre de l'équipe remet en question certaines pratiques habituelles. Que faites-vous ?",
          answers: [
          {text: "Je lui explique pourquoi ces pratiques existent.", score: 0},
          {text: "J'écoute ses questions sans m'engager.", score: 1},
          {text: "Je prends ses questions comme une opportunité d'examiner si ces pratiques méritent d'être remises en question.", score: 2}
          ]
        },
        {
          text: "Votre équipe vous apprécie mais ne vous dit jamais vraiment ce qui ne fonctionne pas. Que faites-vous ?",
          answers: [
          {text: "C'est bon signe — tout va bien.", score: 0},
          {text: "Je leur dis qu'ils peuvent m'en parler.", score: 1},
          {text: "Je travaille à créer les conditions pour que la critique constructive soit possible et bienvenue.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous ne faites jamais évoluer vos pratiques managériales. Que faites-vous ?",
          answers: [
          {text: "Si les résultats sont là, pas besoin de changer.", score: 0},
          {text: "Je cherche des inspirations pour évoluer.", score: 1},
          {text: "Je sollicite des feedbacks, expérimente et me forme régulièrement.", score: 2}
          ]
        },
        {
          text: "Vous avez du mal à céder du contrôle même sur des sujets où ce n'est pas nécessaire. Que faites-vous ?",
          answers: [
          {text: "Je garde le contrôle — c'est ma responsabilité.", score: 0},
          {text: "J'essaie de déléguer progressivement.", score: 1},
          {text: "Je travaille à comprendre ce qui génère ce besoin de contrôle et à le dépasser de façon consciente.", score: 2}
          ]
        }
    ],
  },

  "pilotage-projet": {
    0: [
        {
          text: "Vous rejoignez un projet mais personne ne vous a clairement expliqué ce qu'on attend de vous. Que faites-vous ?",
          answers: [
          {text: "J'observe comment les autres s'organisent et m'adapte.", score: 0},
          {text: "Je pose des questions à mon responsable.", score: 1},
          {text: "Je prends l'initiative de clarifier mon rôle, mes livrables et mes interactions clés avec les bonnes personnes.", score: 2}
          ]
        },
        {
          text: "Votre livrable est attendu vendredi mais personne ne vous a précisé les critères de validation. Que faites-vous ?",
          answers: [
          {text: "Je produis ce qui me semble logique.", score: 0},
          {text: "Je demande à mon responsable la veille.", score: 1},
          {text: "Je clarifie les critères dès le début pour ne pas avoir à refaire le travail.", score: 2}
          ]
        },
        {
          text: "En cours de projet, vous réalisez que votre périmètre d'action chevauche celui d'un autre interlocuteur. Que faites-vous ?",
          answers: [
          {text: "Je continue sur ma lancée en espérant que ça se régule.", score: 0},
          {text: "J'en informe mon responsable.", score: 1},
          {text: "Je prends contact avec l'autre interlocuteur pour clarifier la répartition.", score: 2}
          ]
        },
        {
          text: "Les livrables attendus de vous ont changé depuis le lancement du projet. Personne ne vous l'a formellement dit. Que faites-vous ?",
          answers: [
          {text: "Je continue avec les livrables initiaux.", score: 0},
          {text: "Je m'adapte à ce que je comprends des nouvelles attentes.", score: 1},
          {text: "Je demande une clarification formelle sur l'évolution des attentes avant de changer de direction.", score: 2}
          ]
        },
        {
          text: "Vous devez coopérer avec un interlocuteur dont les méthodes de travail sont très différentes des vôtres. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte entièrement à ses méthodes.", score: 0},
          {text: "Je défends mes méthodes.", score: 1},
          {text: "Je cherche à comprendre ses méthodes et propose un mode de fonctionnement commun.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un projet dont vous êtes partie prenante prend du retard à cause d'un autre contributeur. Que faites-vous ?",
          answers: [
          {text: "Je signale à mon responsable que le retard n'est pas de mon fait.", score: 0},
          {text: "J'essaie de rattraper par moi-même.", score: 1},
          {text: "Je contacte l'autre contributeur pour comprendre le blocage et cherche une solution avec lui.", score: 2}
          ]
        },
        {
          text: "Vous avez réalisé votre partie mais vous attendez une validation qui bloque la suite. Que faites-vous ?",
          answers: [
          {text: "J'attends — c'est à eux de prendre en charge la validation.", score: 0},
          {text: "Je relance de façon informelle.", score: 1},
          {text: "Je relance formellement, propose une date limite et informe mon responsable si le délai est critique.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que plusieurs interlocuteurs du projet ont des lectures différentes des objectifs. Que faites-vous ?",
          answers: [
          {text: "Je continue avec ma propre lecture.", score: 0},
          {text: "J'essaie d'aligner les personnes autour de moi.", score: 1},
          {text: "Je remonte le désalignement et propose une session de cadrage pour unifier la compréhension.", score: 2}
          ]
        },
        {
          text: "Un projet est ralenti par des décisions qui ne sont pas prises. Personne ne semble vouloir prendre la responsabilité. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte à l'inertie.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je formule la décision manquante, ses enjeux et les options disponibles pour faciliter le passage à l'acte.", score: 2}
          ]
        },
        {
          text: "Vous observez que le projet va dans une direction qui vous semble risquée mais ce n'est pas vous qui décidez. Que faites-vous ?",
          answers: [
          {text: "Je suis la direction — c'est aux décideurs de gérer.", score: 0},
          {text: "J'exprime mon inquiétude informellement.", score: 1},
          {text: "Je formalise ma préoccupation avec des éléments factuels et je la soumets aux bonnes personnes.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous anticipez un risque sur votre partie du projet. Que faites-vous ?",
          answers: [
          {text: "J'attends de voir si le risque se concrétise.", score: 0},
          {text: "Je le mentionne à mon responsable.", score: 1},
          {text: "Je documente le risque, évalue son impact et propose des mesures préventives.", score: 2}
          ]
        },
        {
          text: "Votre contribution dépend de celle d'un interlocuteur qui a du mal à livrer dans les délais. Que faites-vous ?",
          answers: [
          {text: "Je le signale à mon responsable pour qu'il gère.", score: 0},
          {text: "Je prends en compte le retard dans ma propre organisation.", score: 1},
          {text: "Je travaille avec lui pour comprendre les blocages et cherche comment contribuer à les débloquer.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous avez accepté plus d'engagements de projet que vous ne pouvez tenir. Que faites-vous ?",
          answers: [
          {text: "Je fais de mon mieux et espère tenir.", score: 0},
          {text: "Je préviens les parties prenantes qu'il y aura des retards.", score: 1},
          {text: "Je prends le problème tôt, je priorise et j'engage une conversation claire sur ce que je peux tenir et ce qui doit être revu.", score: 2}
          ]
        },
        {
          text: "Un interlocuteur externe ne remplit pas ses engagements de projet. Vous n'avez pas d'autorité sur lui. Que faites-vous ?",
          answers: [
          {text: "Je signale le problème à quelqu'un qui a de l'autorité.", score: 0},
          {text: "Je cherche à le relancer directement.", score: 1},
          {text: "Je remonte le problème avec des éléments factuels sur l'impact et propose une solution concrète.", score: 2}
          ]
        },
        {
          text: "Une dépendance externe crée de l'incertitude sur votre livraison. Que faites-vous ?",
          answers: [
          {text: "J'attends de voir ce que ça donne.", score: 0},
          {text: "J'informe les parties prenantes que ma livraison est incertaine.", score: 1},
          {text: "Je travaille avec les parties prenantes pour construire des plans B réalistes.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Le projet touche à sa fin et vous réalisez que certains apprentissages importants risquent d'être perdus. Que faites-vous ?",
          answers: [
          {text: "Je note les apprentissages pour moi.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je prends l'initiative d'organiser un moment de capitalisation avec les parties prenantes.", score: 2}
          ]
        },
        {
          text: "Vous avez livré votre part du projet mais vous n'avez pas eu de retour. Que faites-vous ?",
          answers: [
          {text: "Si rien n'est dit, c'est que ça convient.", score: 0},
          {text: "Je demande si tout va bien.", score: 1},
          {text: "Je sollicite explicitement un retour pour évaluer la qualité de ma contribution.", score: 2}
          ]
        },
        {
          text: "En fin de projet, vous réalisez que des choses auraient pu être mieux faites avec un cadrage initial différent. Que faites-vous ?",
          answers: [
          {text: "Je passe à la suite.", score: 0},
          {text: "Je note ces éléments pour moi.", score: 1},
          {text: "Je les documente et les partage pour que les prochains projets bénéficient de ces apprentissages.", score: 2}
          ]
        },
        {
          text: "Un projet se termine sans bilan formalisé. Que faites-vous ?",
          answers: [
          {text: "Je passe au prochain — les bilans sont souvent une formalité.", score: 0},
          {text: "Je propose un bilan informel.", score: 1},
          {text: "Je propose un bilan structuré même court pour capitaliser sur l'expérience.", score: 2}
          ]
        },
        {
          text: "Votre contribution à un projet n'a pas été reconnue dans le bilan final. Que faites-vous ?",
          answers: [
          {text: "Je l'accepte — la visibilité n'est pas l'essentiel.", score: 0},
          {text: "Je le signale discrètement.", score: 1},
          {text: "Je cherche à comprendre pourquoi et à établir des pratiques pour rendre les contributions visibles dans les futurs projets.", score: 2}
          ]
        }
    ],
  },

  "conduite-changement": {
    0: [
        {
          text: "Votre équipe résiste à un changement que vous n'avez pas choisi mais que vous devez relayer. Certains contestent ouvertement. Que faites-vous ?",
          answers: [
          {text: "Je leur dis que la décision est prise et qu'ils doivent s'y conformer.", score: 0},
          {text: "J'exprime moi aussi mon désaccord pour montrer que je les comprends.", score: 1},
          {text: "Je sépare clairement mon rôle de relais de mon opinion personnelle et je cherche à comprendre leurs inquiétudes réelles.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande si vous êtes personnellement convaincu par le changement en cours. Vous ne l'êtes pas totalement. Que faites-vous ?",
          answers: [
          {text: "Je mens pour maintenir la confiance.", score: 0},
          {text: "J'exprime mon désaccord.", score: 1},
          {text: "Je dis honnêtement ce que je peux partager tout en maintenant ma posture de relais responsable.", score: 2}
          ]
        },
        {
          text: "La résistance de votre équipe ralentit la mise en œuvre du changement. Votre hiérarchie pousse. Que faites-vous ?",
          answers: [
          {text: "Je force l'application — la hiérarchie attend des résultats.", score: 0},
          {text: "Je laisse davantage de temps à l'équipe.", score: 1},
          {text: "Je traduis les inquiétudes de l'équipe à ma hiérarchie ET j'accompagne l'équipe dans la transition.", score: 2}
          ]
        },
        {
          text: "Un changement arrive alors que votre équipe est déjà fatiguée par plusieurs transformations récentes. Que faites-vous ?",
          answers: [
          {text: "J'impose le changement — c'est inévitable.", score: 0},
          {text: "Je demande à ma hiérarchie de reporter.", score: 1},
          {text: "Je signale la fatigue de changement à ma hiérarchie tout en cherchant comment alléger la transition pour l'équipe.", score: 2}
          ]
        },
        {
          text: "Certains membres de votre équipe adhèrent au changement, d'autres s'y opposent. La fracture crée des tensions. Que faites-vous ?",
          answers: [
          {text: "Je valorise ceux qui adhèrent.", score: 0},
          {text: "Je cherche à convaincre ceux qui s'opposent.", score: 1},
          {text: "Je crée un espace pour que les deux positions puissent s'exprimer et je travaille à construire un terrain commun.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un changement vous est demandé de porter alors que vous n'avez presque pas été consulté. Que faites-vous ?",
          answers: [
          {text: "Je le porte — c'est décidé.", score: 0},
          {text: "J'exprime mon mécontentement d'abord.", score: 1},
          {text: "Je pose les questions nécessaires pour comprendre le contexte, puis je le relaye avec tout ce que j'ai appris.", score: 2}
          ]
        },
        {
          text: "Votre équipe vous demande si le changement est vraiment là pour durer ou si ça va changer encore. Que faites-vous ?",
          answers: [
          {text: "Je leur dis que oui, c'est définitif.", score: 0},
          {text: "Je leur dis que je n'en sais rien.", score: 1},
          {text: "Je suis honnête sur ce que je sais et ne sais pas, et je m'engage à les tenir informés si les choses évoluent.", score: 2}
          ]
        },
        {
          text: "Lors de la mise en œuvre d'un changement, vous réalisez que la communication initiale a créé des malentendus. Que faites-vous ?",
          answers: [
          {text: "Je corrige informellement les malentendus au fil des conversations.", score: 0},
          {text: "Je remonte à ma hiérarchie que la communication a mal fonctionné.", score: 1},
          {text: "Je clarifie activement les malentendus auprès de mon équipe et remonte le problème pour que la communication officielle soit ajustée.", score: 2}
          ]
        },
        {
          text: "Un changement impacte certains membres de votre équipe plus que d'autres. Que faites-vous ?",
          answers: [
          {text: "Je traite tout le monde pareil.", score: 0},
          {text: "Je porte une attention particulière aux plus touchés.", score: 1},
          {text: "Je gère individuellement selon l'impact réel de chacun et je crée les espaces d'expression adaptés.", score: 2}
          ]
        },
        {
          text: "La direction demande une mise en œuvre rapide d'un changement. Votre équipe a besoin de plus de temps. Que faites-vous ?",
          answers: [
          {text: "Je respecte le délai imposé.", score: 0},
          {text: "Je négocie un délai plus long.", score: 1},
          {text: "Je propose un plan de mise en œuvre réaliste avec des jalons clairs et j'explique les risques d'une mise en œuvre trop rapide.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un collaborateur est clairement en difficulté avec le changement. Il ne l'exprime pas ouvertement. Que faites-vous ?",
          answers: [
          {text: "J'attends qu'il le dise.", score: 0},
          {text: "Je lui demande si tout va bien.", score: 1},
          {text: "Je crée un espace d'échange individuel et lui donne les moyens de s'exprimer sans qu'il ait à le demander.", score: 2}
          ]
        },
        {
          text: "Votre équipe a formellement accepté le changement mais en pratique revient aux anciens modes. Que faites-vous ?",
          answers: [
          {text: "Je rappelle les nouvelles règles.", score: 0},
          {text: "J'attends que ça se stabilise.", score: 1},
          {text: "J'analyse ce qui empêche l'adoption réelle : est-ce un manque de compétence, de compréhension ou un problème d'organisation ?", score: 2}
          ]
        },
        {
          text: "Un collaborateur a de vraies difficultés avec la nouvelle méthode. Il met du temps à s'y adapter. Que faites-vous ?",
          answers: [
          {text: "Je lui laisse le temps — il finira par y arriver.", score: 0},
          {text: "Je lui propose de l'aide.", score: 1},
          {text: "Je comprends ce qui lui est difficile spécifiquement et cherche une forme d'appui adaptée.", score: 2}
          ]
        },
        {
          text: "Un collaborateur exprime que le changement l'a vraiment affecté dans son travail quotidien. Que faites-vous ?",
          answers: [
          {text: "Je lui dis que tout le monde s'y adapte.", score: 0},
          {text: "Je l'écoute et l'encourage.", score: 1},
          {text: "J'écoute, reconnais l'impact réel et cherche avec lui des façons concrètes de l'atténuer.", score: 2}
          ]
        },
        {
          text: "Vous êtes vous-même en difficulté pour incarner le changement que vous devez porter. Que faites-vous ?",
          answers: [
          {text: "Je porte le changement malgré tout.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je cherche le soutien nécessaire pour être crédible dans mon rôle de relais.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Six mois après la mise en œuvre, le changement semble acquis en surface mais certains glissements réapparaissent. Que faites-vous ?",
          answers: [
          {text: "Je laisse — le changement prend du temps.", score: 0},
          {text: "Je rappelle les nouvelles règles.", score: 1},
          {text: "J'analyse si c'est un problème d'ancrage ou si le nouveau mode n'est pas adapté et j'agis en conséquence.", score: 2}
          ]
        },
        {
          text: "La direction lance un nouveau changement alors que le précédent n'est pas encore stabilisé. Que faites-vous ?",
          answers: [
          {text: "Je m'y attelle — c'est ma mission.", score: 0},
          {text: "Je signale que c'est beaucoup.", score: 1},
          {text: "Je remonte formellement les risques liés à la superposition des changements avec des éléments concrets.", score: 2}
          ]
        },
        {
          text: "Le changement a été bien implémenté mais a créé de nouvelles rigidités non prévues. Que faites-vous ?",
          answers: [
          {text: "Je vis avec — ce sont les effets du changement.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je signale ces effets de bord avec des exemples factuels et propose des ajustements.", score: 2}
          ]
        },
        {
          text: "Vous réalisez qu'un changement que vous avez porté n'a finalement pas atteint ses objectifs. Que faites-vous ?",
          answers: [
          {text: "Je cherche à qui revient la responsabilité.", score: 0},
          {text: "J'en tire des leçons pour moi.", score: 1},
          {text: "Je contribue à une analyse honnête des raisons et propose des ajustements pour la suite.", score: 2}
          ]
        },
        {
          text: "Votre équipe a bien intégré le changement et est passée à autre chose. Mais un risque de réversion existe si le contexte change. Que faites-vous ?",
          answers: [
          {text: "J'attends que le risque se matérialise.", score: 0},
          {text: "Je note le risque mentalement.", score: 1},
          {text: "Je travaille à ancrer les nouveaux comportements de façon durable pour qu'ils résistent au changement de contexte.", score: 2}
          ]
        }
    ],
  },

  "responsabilisation-equipe": {
    0: [
        {
          text: "Vous avez délégué une tâche à un collaborateur. Après deux jours, il vous revient avec des questions sur chaque étape. Que faites-vous ?",
          answers: [
          {text: "Je réponds à toutes ses questions — il a besoin de moi.", score: 0},
          {text: "Je lui dis de débrouiller davantage.", score: 1},
          {text: "Je cherche à comprendre ce qui l'empêche d'avancer seul et je travaille avec lui sur ce point précis.", score: 2}
          ]
        },
        {
          text: "Un collaborateur réalise une tâche différemment de ce que vous auriez fait. Le résultat est correct. Que faites-vous ?",
          answers: [
          {text: "Je lui explique comment je l'aurais fait.", score: 0},
          {text: "J'accepte le résultat sans rien dire.", score: 1},
          {text: "Je valorise le résultat et, si sa méthode a des avantages, je l'encourage à la partager.", score: 2}
          ]
        },
        {
          text: "Vous êtes sur le point de corriger une erreur d'un collaborateur sans lui en parler. Que faites-vous ?",
          answers: [
          {text: "Je corrige discrètement — c'est plus rapide.", score: 0},
          {text: "Je lui signale l'erreur et je la corrige moi-même.", score: 1},
          {text: "Je lui signale l'erreur et lui laisse l'opportunité de la corriger lui-même.", score: 2}
          ]
        },
        {
          text: "Un collaborateur ne semble pas confiant pour prendre une décision qui est clairement dans son périmètre. Que faites-vous ?",
          answers: [
          {text: "Je prends la décision à sa place.", score: 0},
          {text: "Je lui dis qu'il peut décider.", score: 1},
          {text: "Je l'aide à structurer sa réflexion pour qu'il arrive à la décision par lui-même.", score: 2}
          ]
        },
        {
          text: "Vous constatez que vos collaborateurs ne viennent jamais avec des propositions — uniquement des problèmes. Que faites-vous ?",
          answers: [
          {text: "C'est normal — les propositions sont mon rôle.", score: 0},
          {text: "J'attends qu'ils évoluent.", score: 1},
          {text: "Je crée activement un environnement où les propositions sont valorisées et attendues.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un collaborateur prend une décision dans son périmètre qui aurait pu être meilleure. Il n'a pas fait d'erreur grave. Que faites-vous ?",
          answers: [
          {text: "Je lui explique ce qu'il aurait dû faire.", score: 0},
          {text: "Je ne dis rien — l'essentiel est que ça marche.", score: 1},
          {text: "J'utilise cela comme une occasion d'apprentissage, sans dévaloriser sa décision.", score: 2}
          ]
        },
        {
          text: "Vous avez délégué une mission mais vous êtes tenté de vérifier régulièrement comment ça avance. Que faites-vous ?",
          answers: [
          {text: "Je vérifie régulièrement — c'est ma responsabilité.", score: 0},
          {text: "Je me contiens et attends la livraison.", score: 1},
          {text: "Je pose un cadre de suivi clair en accord avec lui — ni surveillance ni abandon.", score: 2}
          ]
        },
        {
          text: "Un collaborateur ne semble pas développer son autonomie malgré vos efforts. Que faites-vous ?",
          answers: [
          {text: "Je lui donne plus d'instructions.", score: 0},
          {text: "J'accepte qu'il ait besoin d'un fort encadrement.", score: 1},
          {text: "Je cherche si quelque chose dans mon management freine son autonomie, et j'ajuste.", score: 2}
          ]
        },
        {
          text: "Un collaborateur a fait une erreur dans une mission déléguée. Que faites-vous ?",
          answers: [
          {text: "Je reprends le contrôle de la mission.", score: 0},
          {text: "Je lui explique son erreur et le laisse continuer.", score: 1},
          {text: "Je travaille avec lui pour comprendre l'erreur, définir comment y remédier, et maintenir la délégation.", score: 2}
          ]
        },
        {
          text: "La délégation à un collaborateur crée de l'inquiétude chez les autres membres de l'équipe qui ne la comprennent pas. Que faites-vous ?",
          answers: [
          {text: "Je leur explique ma décision de déléguer.", score: 0},
          {text: "Je laisse les choses se clarifier d'elles-mêmes.", score: 1},
          {text: "Je clarifie les critères qui guident mes décisions de délégation pour que tout le monde comprenne.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un collaborateur prend une initiative réussie sans vous le dire au préalable. Que faites-vous ?",
          answers: [
          {text: "Je lui rappelle qu'il aurait dû me consulter.", score: 0},
          {text: "Je valorise l'initiative.", score: 1},
          {text: "Je valorise l'initiative et clarifie ensemble dans quels cas il peut agir de façon autonome.", score: 2}
          ]
        },
        {
          text: "Deux collaborateurs ont réalisé un très bon travail collectif. Comment le valorisez-vous ?",
          answers: [
          {text: "Je les remercie discrètement.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je le rends visible collectivement et avec la hiérarchie si pertinent.", score: 2}
          ]
        },
        {
          text: "Un collaborateur est régulièrement en retrait lors des discussions d'équipe mais produit un excellent travail individuel. Que faites-vous ?",
          answers: [
          {text: "Je le laisse travailler comme il l'entend.", score: 0},
          {text: "Je l'encourage à s'exprimer davantage.", score: 1},
          {text: "Je cherche à comprendre comment valoriser sa contribution sans lui imposer un mode d'interaction qui ne lui correspond pas.", score: 2}
          ]
        },
        {
          text: "Votre équipe a produit un livrable collectif important. Votre hiérarchie ne reconnaît que votre rôle. Que faites-vous ?",
          answers: [
          {text: "J'accepte la reconnaissance — c'est ma mission.", score: 0},
          {text: "Je dis à ma hiérarchie que l'équipe a contribué.", score: 1},
          {text: "Je rends explicitement la contribution de l'équipe visible à ma hiérarchie.", score: 2}
          ]
        },
        {
          text: "Un collaborateur fait des progrès importants mais il ne le voit pas. Que faites-vous ?",
          answers: [
          {text: "Je suppose qu'il finira par s'en rendre compte.", score: 0},
          {text: "Je lui dis qu'il s'améliore.", score: 1},
          {text: "Je lui montre concrètement en quoi ses résultats actuels diffèrent de ceux d'avant.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous avez peur que déléguer une décision clé à un collaborateur crée une erreur difficile à corriger. Que faites-vous ?",
          answers: [
          {text: "Je garde la décision pour moi.", score: 0},
          {text: "Je lui délègue mais je vérifie avant l'exécution.", score: 1},
          {text: "J'évalue le risque réel et, s'il est acceptable, je lui délègue en créant un espace de sécurité pour l'erreur.", score: 2}
          ]
        },
        {
          text: "Un collaborateur fait une erreur dans une tâche déléguée. Cela a des conséquences visibles. Que faites-vous ?",
          answers: [
          {text: "Je reprends la responsabilité pour que ça soit corrigé rapidement.", score: 0},
          {text: "Je l'aide à corriger l'erreur.", score: 1},
          {text: "Je l'aide à corriger, j'analyse avec lui ce qui s'est passé et je maintiens la délégation en tirant les leçons.", score: 2}
          ]
        },
        {
          text: "Un collaborateur prend un risque calculé dans son périmètre qui ne paie pas. Que faites-vous ?",
          answers: [
          {text: "Je lui montre que prendre des risques n'était pas approprié.", score: 0},
          {text: "Je l'encourage malgré l'échec.", score: 1},
          {text: "J'analyse avec lui la qualité du raisonnement qui a conduit à la décision, pas seulement le résultat.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que vous avez repris une mission déléguée parce que vous la feriez mieux. Que faites-vous ?",
          answers: [
          {text: "Je la garde — c'est plus efficace.", score: 0},
          {text: "Je la lui redonne en lui expliquant comment faire.", score: 1},
          {text: "Je reconnais ce que ça dit de ma difficulté à lâcher et cherche à redonner réellement la mission.", score: 2}
          ]
        },
        {
          text: "Votre équipe est davantage autonome qu'avant. Votre rôle évolue. Que faites-vous ?",
          answers: [
          {text: "Je cherche à maintenir mon niveau d'implication habituel.", score: 0},
          {text: "J'accepte d'être moins dans le détail.", score: 1},
          {text: "Je réfléchis à comment mon rôle doit évoluer pour continuer à apporter de la valeur.", score: 2}
          ]
        }
    ],
  },

  "collaboration-interequipes": {
    0: [
        {
          text: "Vous avez besoin d'un livrable d'une autre équipe pour avancer. Elle est sous pression. Que faites-vous ?",
          answers: [
          {text: "Je relance régulièrement jusqu'à obtenir ce que je veux.", score: 0},
          {text: "J'attends que leur charge baisse.", score: 1},
          {text: "Je comprends leurs contraintes et cherche avec eux comment débloquer la situation de façon réaliste.", score: 2}
          ]
        },
        {
          text: "Une équipe partenaire ne respecte pas un engagement pris en réunion. Que faites-vous ?",
          answers: [
          {text: "Je le signale à ma hiérarchie.", score: 0},
          {text: "Je la relance directement.", score: 1},
          {text: "Je cherche d'abord à comprendre ce qui a empêché l'engagement d'être tenu avant d'agir.", score: 2}
          ]
        },
        {
          text: "Votre travail dépend d'une information que l'autre équipe ne transmet pas de façon fiable. Que faites-vous ?",
          answers: [
          {text: "Je travaille avec les informations disponibles.", score: 0},
          {text: "Je remonte le problème à mon responsable.", score: 1},
          {text: "Je propose à l'autre équipe de construire un mode de transmission plus fiable.", score: 2}
          ]
        },
        {
          text: "Vous constatez que vos attentes sur un livrable interéquipes étaient mal exprimées. L'autre équipe a livré autre chose. Que faites-vous ?",
          answers: [
          {text: "Je leur dis que leur livrable n'est pas ce que j'attendais.", score: 0},
          {text: "J'accepte leur livrable et m'adapte.", score: 1},
          {text: "Je reconnais ma part dans le malentendu et clarifie ensemble les attentes pour la suite.", score: 2}
          ]
        },
        {
          text: "Une autre équipe prend des décisions qui impactent votre travail sans vous consulter. Que faites-vous ?",
          answers: [
          {text: "Je les informe de l'impact après coup.", score: 0},
          {text: "Je remonte à ma hiérarchie.", score: 1},
          {text: "Je propose de créer un moment de coordination pour que ces décisions soient prises ensemble.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Deux équipes ont des objectifs qui entrent en conflit sur un sujet commun. Que faites-vous ?",
          answers: [
          {text: "Je défends les objectifs de mon équipe.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je propose un échange avec l'autre équipe pour identifier les zones de conflit et trouver un terrain commun.", score: 2}
          ]
        },
        {
          text: "Une autre équipe fait les choses différemment de vous sur un sujet partagé. Ce n'est pas faux, mais c'est différent. Que faites-vous ?",
          answers: [
          {text: "Je leur explique que notre méthode est meilleure.", score: 0},
          {text: "Je continue de mon côté sans intervenir.", score: 1},
          {text: "J'ouvre une discussion pour comprendre leurs raisons et voir si une harmonisation serait bénéfique.", score: 2}
          ]
        },
        {
          text: "Votre équipe a besoin de ressources d'une autre équipe. L'autre équipe n'est pas moteur. Que faites-vous ?",
          answers: [
          {text: "Je continue à demander jusqu'à obtenir.", score: 0},
          {text: "J'escalade si je n'obtiens rien.", score: 1},
          {text: "Je cherche à comprendre leurs contraintes et propose une formulation de la demande qui leur soit plus facile à traiter.", score: 2}
          ]
        },
        {
          text: "Un projet impliquant plusieurs équipes donne des résultats inégaux selon les zones. Que faites-vous ?",
          answers: [
          {text: "Je me concentre sur ma zone.", score: 0},
          {text: "Je partage mes bonnes pratiques.", score: 1},
          {text: "Je propose un échange entre équipes pour partager les apprentissages et ajuster collectivement.", score: 2}
          ]
        },
        {
          text: "Votre équipe a de meilleurs résultats qu'une équipe partenaire. Elle s'en attribue tout le crédit. Que faites-vous ?",
          answers: [
          {text: "Je laisse faire — les résultats parlent d'eux-mêmes.", score: 0},
          {text: "Je corrige en privé la perception.", score: 1},
          {text: "Je cherche à rendre visible la contribution collective pour que la comparaison soit juste.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Votre équipe a tendance à voir les autres équipes comme des obstacles plutôt que des partenaires. Que faites-vous ?",
          answers: [
          {text: "Je gère les effets de cette perception au cas par cas.", score: 0},
          {text: "J'encourage mon équipe à être plus collaborative.", score: 1},
          {text: "Je travaille à changer la représentation en cherchant des occasions de collaboration positive.", score: 2}
          ]
        },
        {
          text: "Vous constatez que votre équipe partage peu d'information avec les autres équipes. Que faites-vous ?",
          answers: [
          {text: "Si les autres ont besoin d'information, ils n'ont qu'à demander.", score: 0},
          {text: "J'encourage à partager quand c'est pertinent.", score: 1},
          {text: "Je cherche à comprendre pourquoi cette rétention existe et à créer des pratiques de partage systématiques.", score: 2}
          ]
        },
        {
          text: "Votre équipe est sollicitée par de nombreuses autres équipes et commence à se sentir débordée. Que faites-vous ?",
          answers: [
          {text: "Je gère les sollicitations au fil de l'eau.", score: 0},
          {text: "Je priorise les demandes les plus urgentes.", score: 1},
          {text: "Je clarifie avec ma hiérarchie les priorités d'interaction et j'organise la gestion des sollicitations.", score: 2}
          ]
        },
        {
          text: "Après un échange interéquipes difficile, des non-dits persistent. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — les tensions se résolvent avec le temps.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je propose un moment de clarification avec les bonnes personnes pour dépasser les non-dits.", score: 2}
          ]
        },
        {
          text: "Deux équipes travaillent en parallèle sur des solutions similaires sans se coordonner. Que faites-vous ?",
          answers: [
          {text: "Je les laisse avancer — la concurrence interne est stimulante.", score: 0},
          {text: "J'en informe ma hiérarchie.", score: 1},
          {text: "Je propose une mise en commun pour éviter les doublons et bénéficier des travaux de chacun.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre équipe défend ses méthodes même quand celles d'autres équipes semblent plus efficaces. Que faites-vous ?",
          answers: [
          {text: "Je laisse chaque équipe travailler à sa façon.", score: 0},
          {text: "J'encourage à s'intéresser aux pratiques des autres.", score: 1},
          {text: "Je crée des occasions d'apprentissage mutuel entre équipes.", score: 2}
          ]
        },
        {
          text: "Un processus partagé entre équipes est inefficace mais chacune attend que l'autre le change. Que faites-vous ?",
          answers: [
          {text: "J'attends que quelqu'un prenne l'initiative.", score: 0},
          {text: "Je prends l'initiative de proposer une réforme.", score: 1},
          {text: "Je fédère les équipes concernées pour construire une solution ensemble.", score: 2}
          ]
        },
        {
          text: "Une équipe partenaire a des pratiques que votre équipe juge inutilement complexes. Que faites-vous ?",
          answers: [
          {text: "Je les laisse — ce sont leurs pratiques.", score: 0},
          {text: "J'exprime mon point de vue informellement.", score: 1},
          {text: "Je propose un échange factuel pour comprendre leurs contraintes et voir si une simplification est possible.", score: 2}
          ]
        },
        {
          text: "Votre organisation a tendance à récompenser les performances individuelles des équipes plutôt que la collaboration. Que faites-vous ?",
          answers: [
          {text: "Je joue le jeu — c'est le système.", score: 0},
          {text: "Je cherche à collaborer malgré le système.", score: 1},
          {text: "Je contribue à rendre visibles les bénéfices de la collaboration pour influencer les pratiques d'évaluation.", score: 2}
          ]
        },
        {
          text: "Après avoir travaillé sur un projet interéquipes, votre équipe n'a pas tiré les apprentissages de cette collaboration. Que faites-vous ?",
          answers: [
          {text: "Je passe au suivant — le temps manque.", score: 0},
          {text: "Je note les apprentissages pour moi.", score: 1},
          {text: "Je prends l'initiative d'un temps de bilan collectif même court.", score: 2}
          ]
        }
    ],
  },

  "transformation-digitale": {
    0: [
        {
          text: "Un nouvel outil est déployé dans votre organisation. Il est moins intuitif que l'ancien mais plus puissant. Que faites-vous ?",
          answers: [
          {text: "Je continue avec l'ancien le plus longtemps possible.", score: 0},
          {text: "Je bascule sur le nouveau mais sans formation.", score: 1},
          {text: "Je cherche à comprendre ce que le nouvel outil apporte et à me former pour en tirer parti.", score: 2}
          ]
        },
        {
          text: "Un processus numérique remplace un processus manuel que vous maîtrisez bien. Que faites-vous ?",
          answers: [
          {text: "Je maintiens le processus manuel en parallèle par sécurité.", score: 0},
          {text: "Je bascule sur le numérique en faisant attention.", score: 1},
          {text: "Je bascule pleinement sur le numérique et signale les points qui semblent moins bien couverts.", score: 2}
          ]
        },
        {
          text: "Votre organisation déploie un outil dont vous ne voyez pas clairement l'utilité pour votre travail. Que faites-vous ?",
          answers: [
          {text: "Je l'adopte en surface sans vraiment l'utiliser.", score: 0},
          {text: "J'exprime mes doutes à mon responsable.", score: 1},
          {text: "J'essaie de comprendre quel problème il est censé résoudre avant de me forger un avis.", score: 2}
          ]
        },
        {
          text: "Un collègue dit que le nouvel outil va supprimer des tâches qui lui prenaient beaucoup de temps. Vous n'en êtes pas convaincu. Que faites-vous ?",
          answers: [
          {text: "Je continue à faire comme avant.", score: 0},
          {text: "Je teste pour voir.", score: 1},
          {text: "Je teste sérieusement et compare les résultats avant de conclure.", score: 2}
          ]
        },
        {
          text: "Votre hiérarchie vous demande de vous approprier un outil d'IA pour votre travail. Vous ne savez pas par où commencer. Que faites-vous ?",
          answers: [
          {text: "J'attends qu'une formation soit organisée.", score: 0},
          {text: "Je cherche des tutoriels en ligne.", score: 1},
          {text: "Je commence par identifier un cas d'usage concret et j'expérimente dessus.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un collègue a du mal avec un nouvel outil numérique. Il vous demande de l'aide. Vous êtes occupé. Que faites-vous ?",
          answers: [
          {text: "Je lui dis de contacter le support.", score: 0},
          {text: "Je l'aide rapidement entre deux choses.", score: 1},
          {text: "Je l'aide vraiment ou je lui trouve quelqu'un de disponible pour l'accompagner.", score: 2}
          ]
        },
        {
          text: "Vous réalisez qu'un collègue contourne un nouvel outil parce qu'il ne le maîtrise pas. Que faites-vous ?",
          answers: [
          {text: "Je le laisse — c'est son affaire.", score: 0},
          {text: "Je lui signale que le contournement crée des problèmes.", score: 1},
          {text: "Je cherche à comprendre ses difficultés et à l'aider à s'approprier l'outil.", score: 2}
          ]
        },
        {
          text: "Votre équipe est divisée entre ceux qui adoptent le nouvel outil et ceux qui résistent. Que faites-vous ?",
          answers: [
          {text: "Je laisse les choses évoluer naturellement.", score: 0},
          {text: "J'encourage les résistants à faire un effort.", score: 1},
          {text: "Je cherche à comprendre la résistance et à créer les conditions pour que l'adoption soit progressive et réelle.", score: 2}
          ]
        },
        {
          text: "Vous avez aidé un collègue sur un outil numérique mais il revient vers vous à chaque difficulté. Que faites-vous ?",
          answers: [
          {text: "Je continue à l'aider — il en a besoin.", score: 0},
          {text: "Je l'oriente vers le support.", score: 1},
          {text: "Je l'aide à gagner en autonomie plutôt qu'à créer une dépendance.", score: 2}
          ]
        },
        {
          text: "Le support numérique interne est difficile à joindre. Des collègues bloqués sur un outil perdent beaucoup de temps. Que faites-vous ?",
          answers: [
          {text: "Je laisse chacun se débrouiller.", score: 0},
          {text: "Je remonte le problème à mon responsable.", score: 1},
          {text: "Je cherche des solutions à court terme pour débloquer les collègues ET je remonte le problème structurel.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Votre organisation a adopté beaucoup d'outils numériques. Certains se chevauchent. Que faites-vous ?",
          answers: [
          {text: "J'utilise celui que je maîtrise le mieux.", score: 0},
          {text: "Je signale les chevauchements à mon responsable.", score: 1},
          {text: "Je cherche à clarifier les usages respectifs et, si nécessaire, propose une rationalisation.", score: 2}
          ]
        },
        {
          text: "Un outil numérique est censé améliorer la collaboration mais en pratique il crée plus de charge. Que faites-vous ?",
          answers: [
          {text: "Je continue à l'utiliser — c'est la règle.", score: 0},
          {text: "Je limite son usage au strict nécessaire.", score: 1},
          {text: "Je documente concrètement en quoi il crée de la charge et le remonte pour qu'une révision soit envisagée.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que votre équipe utilise un outil d'une façon qui ne correspond pas à son usage prévu. Que faites-vous ?",
          answers: [
          {text: "Je les laisse — si ça leur convient, tant mieux.", score: 0},
          {text: "Je les recadre vers l'usage prévu.", score: 1},
          {text: "Je cherche à comprendre pourquoi cet usage s'est développé et si l'usage prévu est réellement adapté.", score: 2}
          ]
        },
        {
          text: "Un nouvel outil génère des données que vous ne savez pas vraiment comment interpréter. Que faites-vous ?",
          answers: [
          {text: "Je regarde les données mais ne les utilise pas vraiment.", score: 0},
          {text: "Je cherche de la documentation.", score: 1},
          {text: "Je prends le temps de vraiment comprendre ce que ces données m'apportent et comment les intégrer à mon travail.", score: 2}
          ]
        },
        {
          text: "Votre organisation demande une adoption rapide d'un outil mais les formation prévues ne sont pas suffisantes. Que faites-vous ?",
          answers: [
          {text: "Je fais avec la formation disponible.", score: 0},
          {text: "J'exprime que la formation est insuffisante.", score: 1},
          {text: "Je remonte le gap entre les attentes et les ressources de formation de façon concrète.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "L'ancien et le nouveau système coexistent depuis trop longtemps. Des incohérences s'accumulent. Que faites-vous ?",
          answers: [
          {text: "Je vis avec — c'est une transition normale.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je documente les incohérences et propose un calendrier de bascule définitif.", score: 2}
          ]
        },
        {
          text: "Lors du basculement vers un nouvel outil, des données importantes de l'ancien système ont été perdues. Que faites-vous ?",
          answers: [
          {text: "Je reconstruis ce que je peux de mémoire.", score: 0},
          {text: "Je signale la perte à mon responsable.", score: 1},
          {text: "Je signale avec des éléments précis sur ce qui a été perdu et l'impact pour que la situation soit évaluée et traitée.", score: 2}
          ]
        },
        {
          text: "Vous constatez que votre organisation continue à investir dans un outil que très peu utilisent vraiment. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon problème.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je construis une analyse de l'utilisation réelle et la partage pour éclairer une décision.", score: 2}
          ]
        },
        {
          text: "Après l'adoption d'un outil, les pratiques manuelles parallèles persistent malgré la demande de basculement. Que faites-vous ?",
          answers: [
          {text: "Je les tolère — le temps que les gens s'adaptent.", score: 0},
          {text: "Je rappelle que le basculement est demandé.", score: 1},
          {text: "Je cherche pourquoi les pratiques parallèles persistent et traite les causes.", score: 2}
          ]
        },
        {
          text: "Un changement d'outil a créé une rupture dans les habitudes de travail. L'équipe est déstabilisée. Que faites-vous ?",
          answers: [
          {text: "Je leur dis de s'adapter — c'est inévitable.", score: 0},
          {text: "Je cherche à soutenir les personnes les plus en difficulté.", score: 1},
          {text: "Je crée les conditions pour que la transition soit progressive, accompagnée et que les apprentissages soient capitalisés.", score: 2}
          ]
        }
    ],
  },

  "arbitrage-priorisation": {
    0: [
        {
          text: "Tout est urgent dans votre liste. Vous devez avancer sur quelque chose. Par quoi commencez-vous ?",
          answers: [
          {text: "Par ce qui vient d'arriver — la dernière urgence prime.", score: 0},
          {text: "Par ce qui prend le moins de temps pour avancer vite.", score: 1},
          {text: "Par ce qui a l'impact le plus important si ça n'est pas traité.", score: 2}
          ]
        },
        {
          text: "Vous avez trois demandes urgentes simultanées. Vous ne pouvez pas tout faire en même temps. Que faites-vous ?",
          answers: [
          {text: "Je traite dans l'ordre d'arrivée.", score: 0},
          {text: "Je fais ce que je peux sur les trois en parallèle.", score: 1},
          {text: "Je contacte les trois demandeurs pour évaluer les vraies contraintes et décide en connaissance de cause.", score: 2}
          ]
        },
        {
          text: "Votre responsable vous ajoute une nouvelle priorité sans retirer les anciennes. Que faites-vous ?",
          answers: [
          {text: "J'absorbe — c'est mon rôle d'être flexible.", score: 0},
          {text: "Je lui dis que c'est beaucoup sans demander d'arbitrage.", score: 1},
          {text: "Je lui expose l'état de mes priorités et lui demande de m'aider à arbitrer.", score: 2}
          ]
        },
        {
          text: "Vous êtes sollicité pour plusieurs réunions en même temps. Vous ne pouvez aller qu'à une. Comment décidez-vous ?",
          answers: [
          {text: "Je vais à celle organisée par la personne la plus importante hiérarchiquement.", score: 0},
          {text: "Je vais à celle dont les sujets m'intéressent le plus.", score: 1},
          {text: "J'évalue laquelle a le plus besoin de ma présence et je décline les autres en proposant une alternative.", score: 2}
          ]
        },
        {
          text: "Une demande urgente d'un client interne tombe alors que vous êtes sur un livrable critique pour un client externe. Que faites-vous ?",
          answers: [
          {text: "Je gère le client interne d'abord — il est là.", score: 0},
          {text: "Je gère le client externe d'abord sans prévenir l'interne.", score: 1},
          {text: "J'informe les deux de la contrainte et je cherche un arbitrage avec mon responsable si nécessaire.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous avez deux projets stratégiques et les ressources pour un seul. Personne n'a encore décidé. Que faites-vous ?",
          answers: [
          {text: "J'avance sur les deux en mode minimal.", score: 0},
          {text: "J'attends que la décision tombe.", score: 1},
          {text: "Je formule l'arbitrage clairement — options, conséquences — et je le soumets à qui doit décider.", score: 2}
          ]
        },
        {
          text: "Vous êtes responsable d'un livrable mais vous recevez des demandes contradictoires de deux décideurs différents. Que faites-vous ?",
          answers: [
          {text: "Je suis les instructions du plus haut placé.", score: 0},
          {text: "Je cherche un compromis.", score: 1},
          {text: "Je mets les deux en relation pour qu'ils s'alignent et je ne livre qu'avec une position claire.", score: 2}
          ]
        },
        {
          text: "Une urgence vous est transmise par un collègue mais ce n'est pas clairement une urgence de votre point de vue. Que faites-vous ?",
          answers: [
          {text: "Je la traite par solidarité.", score: 0},
          {text: "Je lui demande pourquoi c'est urgent.", score: 1},
          {text: "Je prends le temps de valider si c'est réellement urgent pour mon propre agenda avant de traiter.", score: 2}
          ]
        },
        {
          text: "Votre to-do list accumule depuis des semaines des tâches non traitées. Que faites-vous ?",
          answers: [
          {text: "Je les garde — je les traiterai quand j'aurai le temps.", score: 0},
          {text: "Je cherche à en déléguer une partie.", score: 1},
          {text: "Je fais un tri radical : lesquelles sont encore pertinentes, lesquelles peuvent être abandonnées.", score: 2}
          ]
        },
        {
          text: "Deux demandes légitimes s'opposent : l'une vient de votre responsable, l'autre d'un client interne clé. Que faites-vous ?",
          answers: [
          {text: "Je suis mon responsable — c'est ma hiérarchie.", score: 0},
          {text: "Je gère les deux.", score: 1},
          {text: "Je signale le conflit à mon responsable et demande qu'il tranche.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous avez pris une décision d'arbitrage qui mécontente une partie de vos interlocuteurs. Que faites-vous ?",
          answers: [
          {text: "Je leur dis que c'était inévitable.", score: 0},
          {text: "Je leur explique brièvement ma décision.", score: 1},
          {text: "Je leur explique les critères qui ont guidé ma décision et l'impact que je cherchais à maximiser.", score: 2}
          ]
        },
        {
          text: "Votre arbitrage a créé une perception d'injustice dans votre équipe. Que faites-vous ?",
          answers: [
          {text: "Je leur rappelle que c'est mon rôle de décider.", score: 0},
          {text: "Je réévalue si j'ai mal décidé.", score: 1},
          {text: "Je crée un espace pour comprendre ce qui a créé la perception d'injustice et j'explique mes critères.", score: 2}
          ]
        },
        {
          text: "Votre arbitrage s'avère en partie erroné après coup. Que faites-vous ?",
          answers: [
          {text: "Je l'accepte — on fait des erreurs.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je reviens sur l'arbitrage, explique ce qui a changé dans mon analyse et propose un ajustement.", score: 2}
          ]
        },
        {
          text: "Une décision d'arbitrage a été remise en question par quelqu'un de haut placé. Vous êtes convaincu qu'elle est juste. Que faites-vous ?",
          answers: [
          {text: "Je reviens sur ma décision — il a plus d'autorité.", score: 0},
          {text: "Je maintiens ma position sans m'expliquer.", score: 1},
          {text: "Je défends ma décision avec des arguments factuels tout en restant ouvert à apprendre des éléments nouveaux.", score: 2}
          ]
        },
        {
          text: "Vous avez communiqué un arbitrage mais des interlocuteurs n'en sont toujours pas informés deux jours après. Que faites-vous ?",
          answers: [
          {text: "Ils finiront par l'apprendre.", score: 0},
          {text: "Je leur renvoie la communication.", score: 1},
          {text: "Je m'assure activement que tous les interlocuteurs concernés ont bien compris l'arbitrage et ses implications.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Le planning d'un projet doit être revu. Des arbitrages de délai sont nécessaires. Comment le gérez-vous ?",
          answers: [
          {text: "Je décide seul quelle date peut être repoussée.", score: 0},
          {text: "Je consulte les parties prenantes et je tranche.", score: 1},
          {text: "Je construis le scénario d'ajustement avec les parties prenantes en explicitant les choix faits.", score: 2}
          ]
        },
        {
          text: "Les priorités ont changé en cours de route. Certains engagements ne peuvent plus être tenus. Que faites-vous ?",
          answers: [
          {text: "J'essaie de tenir tous les engagements malgré tout.", score: 0},
          {text: "J'informe que certains engagements seront en retard.", score: 1},
          {text: "Je reviens vers les parties prenantes proactivement pour redéfinir les engagements de façon réaliste.", score: 2}
          ]
        },
        {
          text: "Une nouvelle priorité forte émergente va perturber un projet avancé. Que faites-vous ?",
          answers: [
          {text: "Je stoppe le projet en cours sans en parler.", score: 0},
          {text: "Je signale le problème à mon responsable.", score: 1},
          {text: "J'évalue l'impact, je le formalise et je propose plusieurs scénarios à mon responsable pour qu'il décide.", score: 2}
          ]
        },
        {
          text: "Votre équipe perd confiance parce que les priorités changent trop souvent. Que faites-vous ?",
          answers: [
          {text: "Je leur explique que c'est inévitable dans ce contexte.", score: 0},
          {text: "Je cherche à stabiliser les priorités à mon niveau.", score: 1},
          {text: "Je nomme la difficulté à mon équipe, je cherche à stabiliser ce que je peux et je remonte le coût humain des changements fréquents.", score: 2}
          ]
        },
        {
          text: "Vous avez dû renoncer à un projet important faute de ressources. L'équipe est déçue. Que faites-vous ?",
          answers: [
          {text: "Je leur explique que c'était inévitable.", score: 0},
          {text: "Je leur promets que le projet sera repris.", score: 1},
          {text: "Je leur explique honnêtement les contraintes qui ont conduit à cette décision et ce que j'ai fait pour explorer les alternatives.", score: 2}
          ]
        }
    ],
  },

  "sobriete-quotidien": {
    0: [
        {
          text: "Vous avez oublié d'éteindre la lumière en quittant une pièce commune. Vous vous en rendez compte en passant devant. Que faites-vous ?",
          answers: [
          {text: "Je la laisse — quelqu'un d'autre le fera.", score: 0},
          {text: "Je l'éteins.", score: 1},
          {text: "Je l'éteins et propose d'installer un système automatique si ce n'est pas déjà le cas.", score: 2}
          ]
        },
        {
          text: "Le chauffage de votre bureau est réglé trop haut. Tout le monde s'y est habitué. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — c'est confortable comme ça.", score: 0},
          {text: "Je baisse moi-même le thermostat.", score: 1},
          {text: "J'en parle à l'équipe et propose un réglage adapté à la saison.", score: 2}
          ]
        },
        {
          text: "Vous imprimez régulièrement des documents qui pourraient rester numériques. Que faites-vous ?",
          answers: [
          {text: "Je continue — j'ai besoin du papier pour travailler.", score: 0},
          {text: "Je réduis les impressions quand je pense à le faire.", score: 1},
          {text: "Je revois systématiquement mes habitudes d'impression et passe au numérique quand c'est possible.", score: 2}
          ]
        },
        {
          text: "Un équipement de bureau reste allumé en permanence alors qu'il n'est utilisé que quelques heures par jour. Que faites-vous ?",
          answers: [
          {text: "Je le laisse — l'éteindre et le rallumer n'est pas pratique.", score: 0},
          {text: "Je l'éteins quand je l'ai moi-même utilisé.", score: 1},
          {text: "Je signale la situation et propose une procédure d'extinction systématique en fin de journée.", score: 2}
          ]
        },
        {
          text: "Votre organisation consomme beaucoup de gobelets jetables pour le café. Que faites-vous ?",
          answers: [
          {text: "Je continue à en utiliser — c'est la pratique en place.", score: 0},
          {text: "J'utilise ma propre tasse.", score: 1},
          {text: "J'utilise ma propre tasse et propose une alternative collective pour réduire les gobelets.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous devez choisir entre prendre l'ascenseur ou les escaliers pour monter deux étages. Vous n'êtes pas pressé. Que faites-vous ?",
          answers: [
          {text: "Je prends l'ascenseur — c'est plus simple.", score: 0},
          {text: "Je prends les escaliers si je n'ai pas de charge.", score: 1},
          {text: "Je prends les escaliers par défaut — c'est à la fois plus sobre et meilleur pour moi.", score: 2}
          ]
        },
        {
          text: "Votre organisation propose de bons de covoiturage mais vous n'avez jamais pris le temps de les utiliser. Que faites-vous ?",
          answers: [
          {text: "Je n'y pense pas vraiment.", score: 0},
          {text: "Je les utilise quand l'occasion se présente naturellement.", score: 1},
          {text: "Je prends l'initiative de chercher des covoitureurs dans mon entourage professionnel.", score: 2}
          ]
        },
        {
          text: "Vous pouvez faire une livraison express ou standard. Le délai standard est acceptable. Que faites-vous ?",
          answers: [
          {text: "Je choisis l'express — c'est plus pratique.", score: 0},
          {text: "Je choisis le standard si ça ne pose pas de problème.", score: 1},
          {text: "Je choisis systématiquement le standard quand le délai le permet.", score: 2}
          ]
        },
        {
          text: "Un repas de travail est organisé. L'offre végétarienne est disponible mais moins mise en avant. Que faites-vous ?",
          answers: [
          {text: "Je choisis ce qui me fait envie sans me poser la question.", score: 0},
          {text: "Je regarde l'offre végétarienne si elle me correspond.", score: 1},
          {text: "Je considère l'option végétarienne comme la première option par défaut.", score: 2}
          ]
        },
        {
          text: "Votre organisation recycle les déchets mais les bacs sont mal identifiés et personne ne les utilise correctement. Que faites-vous ?",
          answers: [
          {text: "Je trie comme je le comprends — je ne peux pas faire mieux.", score: 0},
          {text: "Je cherche à mieux trier mes propres déchets.", score: 1},
          {text: "Je signale le problème d'identification et propose une solution concrète.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un collègue dit que ses gestes individuels ne changent rien à l'échelle du problème. Que lui répondez-vous ?",
          answers: [
          {text: "Je suis d'accord avec lui.", score: 0},
          {text: "Je lui dis qu'il a tort mais sans argumenter vraiment.", score: 1},
          {text: "J'engage une discussion sur le lien entre comportements individuels et culture collective sans le moraliser.", score: 2}
          ]
        },
        {
          text: "Une habitude collective de votre équipe a un impact environnemental que personne ne remet en question. Que faites-vous ?",
          answers: [
          {text: "Je la suis — ce n'est pas mon rôle de changer les pratiques collectives.", score: 0},
          {text: "Je pose la question lors d'un moment informel.", score: 1},
          {text: "Je trouve un moment adapté pour mettre le sujet sur la table de façon constructive.", score: 2}
          ]
        },
        {
          text: "Vous constatez qu'un prestataire de votre organisation a des pratiques environnementales très mauvaises. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle d'évaluer les prestataires.", score: 0},
          {text: "J'en parle informellement à mon responsable.", score: 1},
          {text: "Je remonte l'information formellement à la personne en charge des achats ou de la relation fournisseurs.", score: 2}
          ]
        },
        {
          text: "Votre organisation a un engagement RSE officiel mais les pratiques internes ne semblent pas alignées. Que faites-vous ?",
          answers: [
          {text: "Je laisse cela aux personnes en charge.", score: 0},
          {text: "Je pointe l'incohérence informellement.", score: 1},
          {text: "Je cherche à identifier une action concrète à mon niveau et à contribuer à l'alignement.", score: 2}
          ]
        },
        {
          text: "Un collègue prend l'initiative d'une action environnementale dans votre équipe. Elle n'est pas parfaite mais c'est un début. Que faites-vous ?",
          answers: [
          {text: "Je laisse faire — ce n'est pas vraiment utile à cette échelle.", score: 0},
          {text: "Je participe si je suis sollicité.", score: 1},
          {text: "Je soutiens activement l'initiative et cherche comment l'améliorer ou l'élargir.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Une action environnementale que votre équipe a mise en place perd en vigueur avec le temps. Que faites-vous ?",
          answers: [
          {text: "J'attends que quelqu'un reprenne le flambeau.", score: 0},
          {text: "Je relance l'idée.", score: 1},
          {text: "Je cherche à comprendre pourquoi l'action s'est essoufflée et à la remettre sur les rails différemment.", score: 2}
          ]
        },
        {
          text: "Votre organisation lance une initiative RSE mais sans la soutenir vraiment sur la durée. Que faites-vous ?",
          answers: [
          {text: "Je participe au lancement et je vois comment ça évolue.", score: 0},
          {text: "Je continue à appliquer les pratiques même si l'élan retombe.", score: 1},
          {text: "Je continue les pratiques et propose des façons de maintenir la dynamique dans le temps.", score: 2}
          ]
        },
        {
          text: "Vous avez changé certaines de vos habitudes professionnelles mais vous retombez dans les anciens réflexes sous pression. Que faites-vous ?",
          answers: [
          {text: "Je l'accepte — la pression force les anciens réflexes.", score: 0},
          {text: "Je me recadre quand je m'en aperçois.", score: 1},
          {text: "J'identifie les contextes de décrochage et cherche à y ancrer des alternatives concrètes.", score: 2}
          ]
        },
        {
          text: "Un indicateur environnemental de votre organisation montre que les progrès sont réels mais insuffisants. Que faites-vous ?",
          answers: [
          {text: "Je laisse l'équipe RSE gérer.", score: 0},
          {text: "Je m'interroge sur ce que je peux faire de plus.", score: 1},
          {text: "Je cherche à identifier une ou deux actions supplémentaires à mon niveau qui auraient un impact mesurable.", score: 2}
          ]
        },
        {
          text: "Un programme d'engagement RSE de votre organisation est chronophage et peu de personnes s'y impliquent. Que faites-vous ?",
          answers: [
          {text: "Je n'y participe pas — j'ai d'autres priorités.", score: 0},
          {text: "J'y participe ponctuellement.", score: 1},
          {text: "J'évalue ce que je peux contribuer de façon réaliste et je le fais de façon régulière plutôt qu'exceptionnelle.", score: 2}
          ]
        }
    ],
  },

  "dechets-ressources": {
    0: [
        {
          text: "Vous imprimez un document de 30 pages dont vous n'avez besoin que de 5. Que faites-vous ?",
          answers: [
          {text: "Je l'imprime entièrement — c'est plus simple.", score: 0},
          {text: "Je sélectionne les pages dont j'ai besoin.", score: 1},
          {text: "Je n'imprime que les pages nécessaires et, si possible, je reste en numérique.", score: 2}
          ]
        },
        {
          text: "Un équipement fonctionnel mais obsolète est sur le point d'être remplacé automatiquement. Que faites-vous ?",
          answers: [
          {text: "Je le laisse remplacer — le nouveau sera meilleur.", score: 0},
          {text: "Je signale qu'il fonctionne encore.", score: 1},
          {text: "Je questionne si le remplacement est vraiment nécessaire maintenant.", score: 2}
          ]
        },
        {
          text: "Vous avez commandé plus de fournitures que nécessaire par précaution. Que faites-vous la prochaine fois ?",
          answers: [
          {text: "Je recommande autant — au cas où.", score: 0},
          {text: "J'ajuste la quantité à ce que je pense utiliser réellement.", score: 1},
          {text: "J'évalue précisément mes besoins réels avant de commander.", score: 2}
          ]
        },
        {
          text: "Des documents confidentiels qui ne sont plus nécessaires s'accumulent dans votre bureau. Que faites-vous ?",
          answers: [
          {text: "Je les laisse — je pourrais en avoir besoin.", score: 0},
          {text: "Je les jette quand j'ai le temps.", score: 1},
          {text: "Je mets en place un système régulier de destruction sécurisée.", score: 2}
          ]
        },
        {
          text: "Votre organisation achète des produits emballés individuellement alors qu'une option en vrac existe à coût comparable. Que faites-vous ?",
          answers: [
          {text: "Je ne me mêle pas des décisions d'achat.", score: 0},
          {text: "J'en parle à quelqu'un en passant.", score: 1},
          {text: "Je remonte l'alternative en vrac à la personne en charge des achats avec les éléments de comparaison.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Lors d'un événement d'équipe, des restes alimentaires vont être jetés. Que faites-vous ?",
          answers: [
          {text: "Je laisse les organisateurs gérer.", score: 0},
          {text: "Je propose que les restes soient partagés.", score: 1},
          {text: "Je prends l'initiative de proposer une redistribution ou un don avant de jeter.", score: 2}
          ]
        },
        {
          text: "Vous devez choisir entre deux emballages pour un achat : l'un recyclable, l'autre moins cher mais non recyclable. Quelle est votre approche ?",
          answers: [
          {text: "Je choisis le moins cher — c'est le budget qui compte.", score: 0},
          {text: "Je choisis le recyclable si l'écart de prix est faible.", score: 1},
          {text: "Je prends en compte l'emballage comme un critère de choix à part entière.", score: 2}
          ]
        },
        {
          text: "Votre équipe gaspille régulièrement du papier lors des impressions (mauvais paramétrage, erreurs de format). Que faites-vous ?",
          answers: [
          {text: "Je gère mes propres impressions et laisse les autres faire.", score: 0},
          {text: "Je rappelle de faire attention.", score: 1},
          {text: "Je propose une solution concrète : paramétrage par défaut recto-verso, vérification avant impression.", score: 2}
          ]
        },
        {
          text: "Des ressources numériques (accès, licences, abonnements) ne sont plus utilisées mais restent actives. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon périmètre.", score: 0},
          {text: "Je le signale si quelqu'un me demande.", score: 1},
          {text: "Je signale proactivement les ressources inutilisées pour qu'elles soient désactivées.", score: 2}
          ]
        },
        {
          text: "Un collègue imprime systématiquement ses emails pour les annoter. Que faites-vous ?",
          answers: [
          {text: "Je ne dis rien — c'est sa façon de travailler.", score: 0},
          {text: "Je lui mentionne qu'il existe des outils d'annotation numérique.", score: 1},
          {text: "Je lui propose concrètement de l'aider à trouver une alternative numérique.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Le tri des déchets dans votre espace de travail est incorrect. Les bacs sont mélangés. Que faites-vous ?",
          answers: [
          {text: "Je trie dans mon bac sans m'occuper des autres.", score: 0},
          {text: "Je remets les bacs en ordre.", score: 1},
          {text: "Je remets les bacs en ordre et propose une signalétique plus claire.", score: 2}
          ]
        },
        {
          text: "Votre organisation trie mais les déchets sont finalement regroupés avant d'être collectés. Que faites-vous ?",
          answers: [
          {text: "Je continue à trier — c'est un geste symbolique.", score: 0},
          {text: "Je me demande si le tri sert vraiment à quelque chose ici.", score: 1},
          {text: "Je remonte l'incohérence pour qu'elle soit vérifiée et traitée.", score: 2}
          ]
        },
        {
          text: "Des collègues ne trient pas leurs déchets malgré les consignes. Que faites-vous ?",
          answers: [
          {text: "Je trie les miens et ne dis rien.", score: 0},
          {text: "Je leur rappelle les consignes.", score: 1},
          {text: "Je cherche à comprendre ce qui empêche le tri et propose une solution plus accessible.", score: 2}
          ]
        },
        {
          text: "Votre équipe génère beaucoup de déchets lors d'un projet de transformation (câbles, packaging, mobilier). Que faites-vous ?",
          answers: [
          {text: "Je laisse les prestataires gérer.", score: 0},
          {text: "J'identifie ce qui peut être réutilisé ou recyclé.", score: 1},
          {text: "Je prends l'initiative de prévoir une filière de valorisation avant que les déchets soient générés.", score: 2}
          ]
        },
        {
          text: "Vous avez de vieux équipements fonctionnels mais inutilisés. Que faites-vous ?",
          answers: [
          {text: "Je les laisse dans un coin — au cas où.", score: 0},
          {text: "Je les mets à disposition d'autres collègues.", score: 1},
          {text: "Je cherche une filière de reconditionnement ou de don plutôt que de les laisser prendre la poussière.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre organisation n'a pas encore de politique claire sur la gestion des déchets. Que faites-vous ?",
          answers: [
          {text: "J'attends qu'elle soit mise en place.", score: 0},
          {text: "Je fais de mon mieux avec les ressources disponibles.", score: 1},
          {text: "Je propose à la personne compétente de travailler sur une politique simple et applicable.", score: 2}
          ]
        },
        {
          text: "Une initiative de réduction des déchets a bien fonctionné le premier mois puis a été oubliée. Que faites-vous ?",
          answers: [
          {text: "J'attends que quelqu'un la relance.", score: 0},
          {text: "Je continue à appliquer les pratiques moi-même.", score: 1},
          {text: "Je prends l'initiative de relancer avec un bilan de ce qui a fonctionné et des ajustements.", score: 2}
          ]
        },
        {
          text: "Un fournisseur livre systématiquement avec trop d'emballage. Que faites-vous ?",
          answers: [
          {text: "Je subis — je n'ai pas d'influence sur leurs pratiques.", score: 0},
          {text: "J'en parle informellement à l'acheteur.", score: 1},
          {text: "Je formule une demande précise à l'acheteur pour que les critères d'emballage soient intégrés au contrat.", score: 2}
          ]
        },
        {
          text: "Vous avez réduit vos déchets personnels au travail mais l'impact collectif reste limité. Que faites-vous ?",
          answers: [
          {text: "Je maintiens mes pratiques — c'est déjà bien.", score: 0},
          {text: "Je cherche à convaincre d'autres personnes.", score: 1},
          {text: "Je cherche un levier systémique : processus, achat, sensibilisation collective.", score: 2}
          ]
        },
        {
          text: "Des habitudes durables ont été prises dans votre équipe. Comment les maintenez-vous dans le temps ?",
          answers: [
          {text: "J'espère que chacun continue.", score: 0},
          {text: "Je rappelle de temps en temps l'importance de ces pratiques.", score: 1},
          {text: "Je les intègre aux routines d'équipe pour qu'elles ne dépendent pas de la vigilance individuelle.", score: 2}
          ]
        }
    ],
  },

  "achats-responsables": {
    0: [
        {
          text: "Vous avez besoin d'un article déjà présent dans les stocks de votre organisation. La demande prend du temps. Que faites-vous ?",
          answers: [
          {text: "J'achète directement le mien pour gagner du temps.", score: 0},
          {text: "J'attends la réponse du stock.", score: 1},
          {text: "Je vérifie les stocks disponibles et je m'organise en conséquence.", score: 2}
          ]
        },
        {
          text: "Un achat est disponible en version reconditionnée à -40%. La version neuve est privilégiée par habitude. Que faites-vous ?",
          answers: [
          {text: "Je commande la version neuve — c'est la procédure.", score: 0},
          {text: "Je propose la version reconditionnée si quelqu'un est d'accord.", score: 1},
          {text: "Je compare et propose l'option reconditionnée avec une justification claire.", score: 2}
          ]
        },
        {
          text: "Vous devez commander une quantité d'articles dont vous avez besoin de 30% en réalité. Que faites-vous ?",
          answers: [
          {text: "Je commande la quantité standard — c'est plus pratique.", score: 0},
          {text: "Je commande un peu moins que la quantité standard.", score: 1},
          {text: "Je commande exactement ce dont j'ai besoin en m'appuyant sur une estimation réelle.", score: 2}
          ]
        },
        {
          text: "Un achat nouveau est proposé pour remplacer quelque chose qui fonctionne encore. Que faites-vous ?",
          answers: [
          {text: "Je valide — le nouveau sera sûrement mieux.", score: 0},
          {text: "Je pose la question de l'utilité du remplacement.", score: 1},
          {text: "J'évalue objectivement si le remplacement crée de la valeur réelle avant de valider.", score: 2}
          ]
        },
        {
          text: "Votre organisation peut opter pour un service externalisé au lieu d'acheter du matériel. Vous n'avez pas d'opinion arrêtée. Que faites-vous ?",
          answers: [
          {text: "Je laisse l'acheteur décider.", score: 0},
          {text: "Je pose quelques questions.", score: 1},
          {text: "Je contribue à l'analyse en fournissant des éléments sur les usages réels.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un fournisseur habituel ne documente pas ses pratiques sociales et environnementales. Que faites-vous ?",
          answers: [
          {text: "Je continue avec lui — il est fiable et pas cher.", score: 0},
          {text: "Je mentionne à l'acheteur que ce serait bien d'avoir ces infos.", score: 1},
          {text: "Je remonte formellement la question et demande qu'un critère de documentation RSE soit ajouté à l'évaluation fournisseur.", score: 2}
          ]
        },
        {
          text: "Deux fournisseurs sont comparables sur la qualité et le prix. L'un a une politique RSE documentée, l'autre non. Que faites-vous ?",
          answers: [
          {text: "Je choisis en fonction d'autres critères pratiques.", score: 0},
          {text: "Je signale la différence RSE à l'acheteur.", score: 1},
          {text: "J'inclus le critère RSE dans la recommandation de choix.", score: 2}
          ]
        },
        {
          text: "Un appel d'offres intègre un critère RSE mais il est peu pondéré. Vous pensez qu'il devrait peser davantage. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte aux critères existants.", score: 0},
          {text: "J'exprime oralement que je pense que ça devrait peser plus.", score: 1},
          {text: "Je propose formellement une révision de la pondération avec des arguments.", score: 2}
          ]
        },
        {
          text: "Un prestataire vous propose un rabais important en échange d'une commande plus grosse que vos besoins réels. Que faites-vous ?",
          answers: [
          {text: "Je profite du rabais — c'est une bonne affaire.", score: 0},
          {text: "J'hésite mais je résiste au rabais.", score: 1},
          {text: "Je décline et explique que ma commande correspond à mon besoin réel.", score: 2}
          ]
        },
        {
          text: "Vous constatez qu'un fournisseur ne respecte pas les engagements RSE qu'il avait annoncés lors de sa sélection. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas ma responsabilité de le vérifier.", score: 0},
          {text: "Je le signale informellement.", score: 1},
          {text: "Je le remonte formellement pour que la relation fournisseur soit révisée.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Une commande urgente peut être livrée en express (plus polluant) ou en standard (2 jours de plus). Que faites-vous ?",
          answers: [
          {text: "Je commande en express — l'urgence prime.", score: 0},
          {text: "Je commande en express mais j'en prends note.", score: 1},
          {text: "Je vérifie si le délai standard est réellement incompatible avec le besoin avant de choisir.", score: 2}
          ]
        },
        {
          text: "Vous devez choisir entre un produit local plus cher et un produit importé moins cher mais avec une empreinte logistique importante. Que faites-vous ?",
          answers: [
          {text: "Je choisis en fonction du prix.", score: 0},
          {text: "Je mentionne le critère environnemental mais je prends la décision courante.", score: 1},
          {text: "Je soumets les deux options avec leurs impacts respectifs pour qu'une décision éclairée soit prise.", score: 2}
          ]
        },
        {
          text: "Un achat urgent est nécessaire. La procédure normale prendrait trop de temps. Que faites-vous ?",
          answers: [
          {text: "J'achète en dehors de la procédure — c'est urgent.", score: 0},
          {text: "J'utilise la procédure simplifiée si elle existe.", score: 1},
          {text: "Je cherche d'abord si le besoin peut être couvert autrement avant de contourner la procédure.", score: 2}
          ]
        },
        {
          text: "Un prestataire vous propose une offre qui économise du budget mais avec des conditions de livraison moins sobres. Que faites-vous ?",
          answers: [
          {text: "Je prends l'offre — l'économie est réelle.", score: 0},
          {text: "Je demande si on peut modifier les conditions de livraison.", score: 1},
          {text: "Je négocie les conditions de livraison comme partie intégrante de l'accord.", score: 2}
          ]
        },
        {
          text: "Vous achetez souvent de petites quantités en urgence alors qu'une meilleure planification permettrait des commandes groupées. Que faites-vous ?",
          answers: [
          {text: "Je continue — l'urgence ne se planifie pas.", score: 0},
          {text: "Je cherche à anticiper davantage.", score: 1},
          {text: "Je propose un processus d'anticipation des besoins pour permettre des commandes groupées moins fréquentes.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre organisation n'a pas de politique d'achat responsable formalisée. Que faites-vous ?",
          answers: [
          {text: "Je laisse la direction s'en occuper.", score: 0},
          {text: "J'applique mes propres critères à mon niveau.", score: 1},
          {text: "Je propose à la personne compétente des éléments pour construire une politique simple.", score: 2}
          ]
        },
        {
          text: "Une politique d'achat responsable existe mais peu de personnes la connaissent vraiment. Que faites-vous ?",
          answers: [
          {text: "Je la connais pour moi — c'est l'essentiel.", score: 0},
          {text: "Je la partage si quelqu'un me pose la question.", score: 1},
          {text: "Je cherche à rendre la politique plus accessible à mon niveau.", score: 2}
          ]
        },
        {
          text: "Les critères RSE dans les achats créent des délais supplémentaires. Certains les contournent. Que faites-vous ?",
          answers: [
          {text: "Je comprends — les délais sont une vraie contrainte.", score: 0},
          {text: "Je les applique pour moi.", score: 1},
          {text: "J'applique les critères ET j'analyse si le process peut être simplifié pour réduire les délais.", score: 2}
          ]
        },
        {
          text: "Votre organisation évalue rarement les fournisseurs après la signature du contrat. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle.", score: 0},
          {text: "J'en parle informellement à l'acheteur.", score: 1},
          {text: "Je propose l'intégration d'un suivi post-contractuel des critères RSE.", score: 2}
          ]
        },
        {
          text: "Une décision d'achat prise avant que vous arriviez a des conséquences environnementales négatives. Que faites-vous ?",
          answers: [
          {text: "Je l'accepte — c'est décidé.", score: 0},
          {text: "Je signale les conséquences.", score: 1},
          {text: "Je formule une proposition d'amélioration pour les prochains cycles.", score: 2}
          ]
        }
    ],
  },

  "manager-transition-eco": {
    0: [
        {
          text: "Vous devez présenter un objectif RSE à votre équipe. Certains vont trouver ça abstrait. Que faites-vous ?",
          answers: [
          {text: "Je leur présente les chiffres et les objectifs officiels.", score: 0},
          {text: "Je cherche des exemples parlants pour illustrer.", score: 1},
          {text: "Je traduis l'objectif en gestes concrets de leur quotidien pour le rendre tangible.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande à quoi sert vraiment l'engagement RSE de l'entreprise. Il est sceptique. Que faites-vous ?",
          answers: [
          {text: "Je lui dis que c'est la politique de l'entreprise.", score: 0},
          {text: "Je lui donne les arguments RSE officiels.", score: 1},
          {text: "Je prends sa question au sérieux et engage une vraie discussion sur les enjeux réels.", score: 2}
          ]
        },
        {
          text: "Votre équipe pense que leurs gestes individuels au bureau ne changent rien. Que faites-vous ?",
          answers: [
          {text: "Je leur dis qu'ils ont en partie raison mais qu'il faut quand même agir.", score: 0},
          {text: "Je leur explique l'importance symbolique des gestes individuels.", score: 1},
          {text: "Je cherche à relier leurs actions à des changements systémiques concrets pour rendre la connexion visible.", score: 2}
          ]
        },
        {
          text: "Vous devez relayer un message RSE que vous ne trouvez pas entièrement crédible. Que faites-vous ?",
          answers: [
          {text: "Je le transmets tel quel.", score: 0},
          {text: "Je le transmets avec mes réserves personnelles.", score: 1},
          {text: "Je cherche ce qui est crédible dans le message et je le transmets de façon authentique, sans surjouer.", score: 2}
          ]
        },
        {
          text: "Un collaborateur remarque une incohérence entre le discours RSE de l'organisation et ses pratiques. Que faites-vous ?",
          answers: [
          {text: "Je lui dis que tout ne peut pas changer du jour au lendemain.", score: 0},
          {text: "Je reconnais l'incohérence mais je reste positif.", score: 1},
          {text: "Je reconnais l'incohérence, cherche ce qui peut être amélioré à mon niveau et remonte l'observation.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Votre équipe veut lancer une action RSE mais manque de temps pour la préparer sérieusement. Que faites-vous ?",
          answers: [
          {text: "Je les encourage mais sans leur accorder du temps dédié.", score: 0},
          {text: "Je leur accorde un peu de temps.", score: 1},
          {text: "Je cherche comment intégrer l'action dans le flux habituel de travail plutôt que de l'ajouter par-dessus.", score: 2}
          ]
        },
        {
          text: "Vous avez identifié un changement de pratique simple qui réduirait l'impact environnemental de votre équipe. Il demande un effort initial. Que faites-vous ?",
          answers: [
          {text: "J'attends que l'équipe soit disponible.", score: 0},
          {text: "Je propose le changement lors d'une réunion.", score: 1},
          {text: "Je le prépare concrètement et je le propose avec un plan de mise en œuvre réaliste.", score: 2}
          ]
        },
        {
          text: "Votre équipe applique les gestes RSE mais sans vraiment comprendre pourquoi. Que faites-vous ?",
          answers: [
          {text: "Le résultat est là — la compréhension n'est pas prioritaire.", score: 0},
          {text: "Je donne des explications quand on me pose la question.", score: 1},
          {text: "Je crée des moments pour relier les gestes aux enjeux concrets.", score: 2}
          ]
        },
        {
          text: "Une action RSE que vous voulez mettre en place nécessite un accord de votre hiérarchie. Elle tarde à répondre. Que faites-vous ?",
          answers: [
          {text: "J'attends.", score: 0},
          {text: "Je relance.", score: 1},
          {text: "Je relance avec des éléments concrets sur l'impact attendu et le coût de l'inaction.", score: 2}
          ]
        },
        {
          text: "Vous constatez que votre équipe a de bonnes pratiques RSE mais qu'elles varient fortement d'une personne à l'autre. Que faites-vous ?",
          answers: [
          {text: "Je laisse chacun faire à sa façon.", score: 0},
          {text: "Je partage les meilleures pratiques en réunion.", score: 1},
          {text: "Je cherche à créer des pratiques communes et accessibles à tous.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous devez arbitrer entre une décision qui est bonne pour la performance à court terme et une qui est meilleure pour l'impact environnemental. Que faites-vous ?",
          answers: [
          {text: "Je priorise la performance — c'est mon indicateur principal.", score: 0},
          {text: "Je cherche un compromis.", score: 1},
          {text: "Je rends l'arbitrage visible pour que la décision soit prise en conscience, au bon niveau.", score: 2}
          ]
        },
        {
          text: "Un client demande une livraison accélérée qui implique un transport plus polluant. Que faites-vous ?",
          answers: [
          {text: "Je satisfais la demande — c'est le client.", score: 0},
          {text: "Je pose la question de l'impact avant de valider.", score: 1},
          {text: "Je propose au client une alternative moins impactante en expliquant le contexte.", score: 2}
          ]
        },
        {
          text: "Votre équipe est sous pression et les pratiques RSE passent à la trappe. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — la pression est réelle.", score: 0},
          {text: "Je rappelle l'importance de maintenir les pratiques.", score: 1},
          {text: "J'identifie les pratiques RSE qui peuvent tenir même sous pression et je les préserve.", score: 2}
          ]
        },
        {
          text: "Un arbitrage économique et un objectif RSE entrent en conflit direct. Personne ne veut trancher. Que faites-vous ?",
          answers: [
          {text: "J'applique la décision économique — c'est la norme.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je formalise le conflit avec ses enjeux et demande une décision explicite à la bonne personne.", score: 2}
          ]
        },
        {
          text: "Votre organisation fixe des objectifs RSE mais sans y allouer de ressources. Que faites-vous ?",
          answers: [
          {text: "Je fais ce que je peux avec ce que j'ai.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je remonte la dissonance entre objectifs et moyens de façon formelle avec des exemples concrets.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre équipe a pris de bonnes habitudes RSE. Comment les maintenez-vous dans la durée ?",
          answers: [
          {text: "J'espère que ça dure d'elle-même.", score: 0},
          {text: "Je rappelle l'importance des pratiques de temps en temps.", score: 1},
          {text: "Je les intègre aux rituels d'équipe pour qu'elles ne dépendent pas de la vigilance de chacun.", score: 2}
          ]
        },
        {
          text: "Un changement organisationnel perturbe les pratiques RSE mises en place. Que faites-vous ?",
          answers: [
          {text: "Je laisse les pratiques s'adapter naturellement.", score: 0},
          {text: "Je signale que les pratiques ont été perturbées.", score: 1},
          {text: "Je cherche comment adapter les pratiques au nouveau contexte pour préserver l'essentiel.", score: 2}
          ]
        },
        {
          text: "Votre équipe a du mal à se remettre sur les rails RSE après une période de forte pression. Que faites-vous ?",
          answers: [
          {text: "J'attends que l'énergie revienne.", score: 0},
          {text: "Je relance les pratiques.", score: 1},
          {text: "Je propose un moment de bilan pour identifier ce qui a fonctionné et ce qui a craqué sous la pression.", score: 2}
          ]
        },
        {
          text: "Vous êtes convaincu que la dynamique RSE de votre équipe peut s'étendre à l'équipe voisine. Que faites-vous ?",
          answers: [
          {text: "Je laisse chaque équipe évoluer à son rythme.", score: 0},
          {text: "Je partage nos pratiques si quelqu'un me demande.", score: 1},
          {text: "Je cherche une occasion concrète de partager nos apprentissages avec les autres équipes.", score: 2}
          ]
        },
        {
          text: "Votre organisation mesure les résultats RSE mais les indicateurs ne semblent pas refléter ce que votre équipe fait réellement. Que faites-vous ?",
          answers: [
          {text: "Je laisse les experts RSE gérer les indicateurs.", score: 0},
          {text: "Je remonte l'information.", score: 1},
          {text: "Je propose des indicateurs complémentaires qui rendraient visibles les efforts réels.", score: 2}
          ]
        }
    ],
  },

  "numerique-responsable": {
    0: [
        {
          text: "Votre boîte mail contient 8 000 emails dont la plupart sont inutiles. Que faites-vous ?",
          answers: [
          {text: "Je les laisse — ils ne prennent pas de place visible.", score: 0},
          {text: "Je supprime les plus anciens quand j'en ai le temps.", score: 1},
          {text: "Je consacre un moment à nettoyer ma boîte de façon systématique.", score: 2}
          ]
        },
        {
          text: "Vous recevez une pièce jointe lourde que vous avez déjà. Vous la sauvegardez. Que faites-vous à la place ?",
          answers: [
          {text: "Je sauvegarde par sécurité.", score: 0},
          {text: "Je vérifie si j'ai déjà le fichier avant de sauvegarder.", score: 1},
          {text: "Je travaille depuis un lien partagé plutôt que de multiplier les copies.", score: 2}
          ]
        },
        {
          text: "Votre espace de stockage cloud est plein de fichiers dupliqués et de versions obsolètes. Que faites-vous ?",
          answers: [
          {text: "Je laisse — ça ne coûte pas grand chose.", score: 0},
          {text: "Je nettoie les fichiers dont je suis sûr d'être le propriétaire.", score: 1},
          {text: "Je consacre un temps régulier à nettoyer et archiver mes fichiers.", score: 2}
          ]
        },
        {
          text: "Vous laissez votre ordinateur allumé toute la nuit de façon habituelle. Que faites-vous ?",
          answers: [
          {text: "Je le laisse — l'extinction et le redémarrage prennent du temps.", score: 0},
          {text: "Je le laisse en veille.", score: 1},
          {text: "Je l'éteins systématiquement en fin de journée.", score: 2}
          ]
        },
        {
          text: "Vous avez des dizaines d'onglets ouverts en permanence dans votre navigateur. Que faites-vous ?",
          answers: [
          {text: "C'est ma façon de travailler.", score: 0},
          {text: "Je ferme les onglets inutiles de temps en temps.", score: 1},
          {text: "Je travaille avec un nombre limité d'onglets et j'utilise d'autres méthodes pour garder les informations importantes.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Une réunion de 30 minutes avec 3 personnes peut se tenir en visio ou en présentiel. Tous sont dans le même bâtiment. Que faites-vous ?",
          answers: [
          {text: "Je convoque en visio — c'est pratique.", score: 0},
          {text: "Je laisse chacun décider.", score: 1},
          {text: "Je propose le présentiel par défaut pour ce type de réunion courte.", score: 2}
          ]
        },
        {
          text: "Vous devez présenter un document à une réunion. Vous pouvez le projeter ou l'imprimer. Que faites-vous ?",
          answers: [
          {text: "Je l'imprime pour que tout le monde l'ait sous les yeux.", score: 0},
          {text: "Je projette si la salle le permet.", score: 1},
          {text: "Je projette et partage le lien numérique en amont.", score: 2}
          ]
        },
        {
          text: "Une réunion hybride est planifiée alors qu'une réunion entièrement en visio suffirait. Que faites-vous ?",
          answers: [
          {text: "J'accepte le format proposé.", score: 0},
          {text: "Je propose la visio si c'est possible.", score: 1},
          {text: "J'évalue objectivement si le déplacement de certains est vraiment nécessaire.", score: 2}
          ]
        },
        {
          text: "Vous participez à une visio depuis un espace bruyant. La caméra est allumée. Que faites-vous ?",
          answers: [
          {text: "Je continue — ça ne change pas grand chose.", score: 0},
          {text: "Je coupe le micro quand je ne parle pas.", score: 1},
          {text: "Je passe en audio uniquement ou je cherche un espace plus adapté.", score: 2}
          ]
        },
        {
          text: "Un événement interne peut être organisé en présentiel ou en distanciel. Le présentiel serait plus agréable. Que faites-vous ?",
          answers: [
          {text: "Je propose le présentiel — l'expérience en vaut la peine.", score: 0},
          {text: "Je prends en compte l'impact environnemental dans mon analyse.", score: 1},
          {text: "Je compare les options avec leurs impacts et formule une recommandation explicite.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Votre organisation renouvelle systématiquement ses équipements tous les 3 ans, même s'ils fonctionnent. Que faites-vous ?",
          answers: [
          {text: "Je profite du renouvellement — le nouveau est toujours mieux.", score: 0},
          {text: "Je signale que mon équipement fonctionne encore.", score: 1},
          {text: "Je demande à prolonger la durée de vie de mon équipement et je remonte la pratique de renouvellement systématique.", score: 2}
          ]
        },
        {
          text: "Votre ordinateur ralentit. On vous propose un remplacement. Que faites-vous ?",
          answers: [
          {text: "J'accepte le remplacement.", score: 0},
          {text: "Je demande si une réparation ou une mise à niveau est possible.", score: 1},
          {text: "Je demande une analyse technique avant toute décision et favorise la réparation si elle est efficace.", score: 2}
          ]
        },
        {
          text: "Des équipements fonctionnels sont stockés inutilisés dans votre organisation. Que faites-vous ?",
          answers: [
          {text: "Je laisse le service informatique gérer.", score: 0},
          {text: "Je signale leur existence.", score: 1},
          {text: "Je cherche s'ils peuvent être réattribués ou reconditionnés plutôt que stockés.", score: 2}
          ]
        },
        {
          text: "Un logiciel ou outil numérique que vous utilisez génère plus de stockage que nécessaire (données brutes, logs, archives). Que faites-vous ?",
          answers: [
          {text: "Je laisse — le stockage est géré par l'équipe IT.", score: 0},
          {text: "Je fais le ménage dans les fichiers dont je suis responsable.", score: 1},
          {text: "Je cherche à optimiser les paramètres pour réduire la génération de données inutiles.", score: 2}
          ]
        },
        {
          text: "Un fournisseur de solutions numériques n'a aucune politique environnementale. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas un critère pour moi.", score: 0},
          {text: "J'en prends note pour la prochaine évaluation.", score: 1},
          {text: "Je remonte ce critère lors de l'évaluation du fournisseur.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre organisation envoie des newsletters internes que peu de personnes lisent. Que faites-vous ?",
          answers: [
          {text: "Je continue à les recevoir — ça ne me dérange pas.", score: 0},
          {text: "Je me désabonne.", score: 1},
          {text: "Je me désabonne ET propose une réflexion sur la pertinence de ce canal.", score: 2}
          ]
        },
        {
          text: "Les réunions en visio de votre organisation sont souvent beaucoup trop longues. Que faites-vous ?",
          answers: [
          {text: "Je les subis.", score: 0},
          {text: "Je propose de raccourcir lors de certaines réunions.", score: 1},
          {text: "Je propose une révision du format de ces réunions avec des critères de durée et d'ordre du jour.", score: 2}
          ]
        },
        {
          text: "Votre équipe envoie des emails pour des sujets qui pourraient être traités en 30 secondes à l'oral. Que faites-vous ?",
          answers: [
          {text: "Je réponds par email comme tout le monde.", score: 0},
          {text: "Je préfère parfois passer par téléphone.", score: 1},
          {text: "Je propose des normes d'équipe sur le bon canal selon le type de message.", score: 2}
          ]
        },
        {
          text: "Un outil de collaboration génère beaucoup de notifications qui épuisent l'attention collective. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte.", score: 0},
          {text: "Je coupe mes propres notifications.", score: 1},
          {text: "Je propose une charte d'utilisation qui réduit le bruit pour tout le monde.", score: 2}
          ]
        },
        {
          text: "Votre organisation investit dans un nouvel outil numérique mais n'a pas évalué l'utilité de l'ancien. Que faites-vous ?",
          answers: [
          {text: "Je laisse l'IT gérer.", score: 0},
          {text: "Je mentionne que l'ancien outil mériterait d'être évalué.", score: 1},
          {text: "Je contribue à l'évaluation comparative et propose de rationaliser avant d'ajouter.", score: 2}
          ]
        }
    ],
  },

  "deplacements-sobriete": {
    0: [
        {
          text: "Vous devez vous rendre à une réunion de 1h à 200 km. Aucun autre collègue n'a soulevé la question du format. Que faites-vous ?",
          answers: [
          {text: "Je réserve mon billet — c'est prévu.", score: 0},
          {text: "Je vérifie si une participation en visio est possible.", score: 1},
          {text: "Je propose activement une visio et explique pourquoi c'est suffisant pour ce cas.", score: 2}
          ]
        },
        {
          text: "Une réunion hebdomadaire est systématiquement en présentiel. Elle pourrait souvent se tenir en visio. Que faites-vous ?",
          answers: [
          {text: "Je viens — c'est le format décidé.", score: 0},
          {text: "Je participe en distanciel quand c'est accepté.", score: 1},
          {text: "Je propose de revoir le format de façon régulière pour ne tenir en présentiel que quand c'est vraiment utile.", score: 2}
          ]
        },
        {
          text: "Vous avez plusieurs rendez-vous clients dans une même ville cette semaine. Vous n'avez pas coordonné les dates. Que faites-vous ?",
          answers: [
          {text: "J'organise mes rendez-vous séparément selon les disponibilités.", score: 0},
          {text: "J'essaie de regrouper si c'est pratique.", score: 1},
          {text: "Je regroupe systématiquement les rendez-vous dans la même zone géographique pour limiter les déplacements.", score: 2}
          ]
        },
        {
          text: "Un trajet aller-retour de 3h vous attend pour une réunion de 45 minutes. Que faites-vous ?",
          answers: [
          {text: "Je fais le trajet — c'est important d'être là.", score: 0},
          {text: "Je demande si une connexion en distanciel est possible.", score: 1},
          {text: "Je propose une visio et j'explique que le ratio déplacement/utilité est disproportionné.", score: 2}
          ]
        },
        {
          text: "Votre organisation n'a pas de politique claire sur les déplacements professionnels. Que faites-vous ?",
          answers: [
          {text: "Je fais comme mes collègues.", score: 0},
          {text: "J'applique mes propres critères.", score: 1},
          {text: "Je propose à la personne compétente de réfléchir à des critères simples et partagés.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous devez choisir entre le train et l'avion pour un déplacement. Le train prend 1h de plus. Que faites-vous ?",
          answers: [
          {text: "Je prends l'avion — 1h de gagné, c'est précieux.", score: 0},
          {text: "Je prends le train si l'organisation me le permet.", score: 1},
          {text: "Je prends le train par défaut et profite du temps de trajet pour travailler.", score: 2}
          ]
        },
        {
          text: "Votre organisation rembourse mieux les déplacements en voiture solo qu'en covoiturage. Que faites-vous ?",
          answers: [
          {text: "Je prends ma voiture — c'est plus avantageux financièrement.", score: 0},
          {text: "Je covoiture si quelqu'un propose.", score: 1},
          {text: "Je covoiture et signale que la politique de remboursement mériterait d'être révisée.", score: 2}
          ]
        },
        {
          text: "Vous devez participer à un congrès à l'étranger. Vous pourriez suivre à distance. Que faites-vous ?",
          answers: [
          {text: "Je vais sur place — le réseau et l'ambiance valent le déplacement.", score: 0},
          {text: "Je compare les deux options.", score: 1},
          {text: "J'évalue si ma présence physique apporte une valeur ajoutée réelle par rapport à la participation à distance.", score: 2}
          ]
        },
        {
          text: "Votre client préfère des réunions en présentiel mais vous pensez que la visio suffirait. Que faites-vous ?",
          answers: [
          {text: "Je me déplace — c'est ce que le client veut.", score: 0},
          {text: "Je propose la visio de temps en temps.", score: 1},
          {text: "Je propose une conversation sur les formats selon les étapes, pour ne se déplacer que quand c'est vraiment utile.", score: 2}
          ]
        },
        {
          text: "Un collègue fait régulièrement des allers-retours qui pourraient être évités avec un meilleur planning. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon affaire.", score: 0},
          {text: "Je lui suggère de mieux planifier.", score: 1},
          {text: "Je cherche si je peux contribuer à une meilleure coordination collective pour éviter les déplacements inutiles.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous partez en déplacement et avez une journée sans réunion. Que faites-vous ?",
          answers: [
          {text: "Je profite de la journée libre.", score: 0},
          {text: "Je cherche des contacts à rencontrer sur place.", score: 1},
          {text: "J'évalue si je peux avancer le départ ou reculer le retour pour réduire les nuits d'hôtel.", score: 2}
          ]
        },
        {
          text: "Vous organisez un événement qui nécessitera des déplacements pour de nombreuses personnes. Que faites-vous ?",
          answers: [
          {text: "Je choisis le lieu le plus pratique pour l'organisation.", score: 0},
          {text: "Je cherche le lieu le plus central pour les participants.", score: 1},
          {text: "Je cherche le lieu qui minimise les déplacements globaux tout en restant pratique.", score: 2}
          ]
        },
        {
          text: "Des déplacements fréquents sont prévus pour un projet qui pourrait être géré en grande partie à distance. Que faites-vous ?",
          answers: [
          {text: "Je suis le plan de déplacements prévu.", score: 0},
          {text: "Je propose de réduire certains déplacements.", score: 1},
          {text: "Je propose un plan alternatif basé sur une présence physique ciblée aux moments clés seulement.", score: 2}
          ]
        },
        {
          text: "Votre organisation demande une présence physique hebdomadaire pour une raison peu claire. Que faites-vous ?",
          answers: [
          {text: "Je me déplace — c'est demandé.", score: 0},
          {text: "Je me déplace mais j'exprime ma réserve.", score: 1},
          {text: "Je questionne la raison de cette exigence et propose une alternative fondée sur les besoins réels.", score: 2}
          ]
        },
        {
          text: "Vous revenez d'un déplacement et réalisez qu'il aurait pu être évité. Que faites-vous ?",
          answers: [
          {text: "Je passe à autre chose.", score: 0},
          {text: "Je note mentalement pour la prochaine fois.", score: 1},
          {text: "Je prends le temps d'en tirer une leçon concrète pour les déplacements futurs similaires.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre culture d'organisation valorise implicitement la présence physique. Que faites-vous ?",
          answers: [
          {text: "Je m'adapte à la culture.", score: 0},
          {text: "J'applique mes propres critères en restant discret.", score: 1},
          {text: "Je cherche à influencer la culture par l'exemple et par des propositions concrètes.", score: 2}
          ]
        },
        {
          text: "Votre organisation n'a pas d'objectif chiffré sur les déplacements. Que faites-vous ?",
          answers: [
          {text: "Je laisse l'équipe RSE gérer.", score: 0},
          {text: "J'applique mes propres critères.", score: 1},
          {text: "Je propose un indicateur simple à suivre à l'échelle de mon équipe.", score: 2}
          ]
        },
        {
          text: "Des collègues font des déplacements nombreux pour des raisons qui semblent plus liées aux habitudes qu'aux besoins. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon affaire.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je cherche à créer un espace de réflexion collective sur quand se déplacer vraiment.", score: 2}
          ]
        },
        {
          text: "Votre politique de déplacements existe mais elle est ignorée par beaucoup. Que faites-vous ?",
          answers: [
          {text: "Je l'applique pour moi.", score: 0},
          {text: "Je rappelle la politique si quelqu'un me demande.", score: 1},
          {text: "Je cherche à comprendre pourquoi elle est ignorée et propose comment la rendre plus applicable.", score: 2}
          ]
        },
        {
          text: "Votre équipe a réduit ses déplacements depuis un an mais les habitudes anciennes reviennent progressivement. Que faites-vous ?",
          answers: [
          {text: "J'attends de voir si ça revient vraiment.", score: 0},
          {text: "Je maintiens mes propres pratiques.", score: 1},
          {text: "Je propose un bilan et une réflexion collective pour éviter le retour aux anciens réflexes.", score: 2}
          ]
        }
    ],
  },

  "achats-impact": {
    0: [
        {
          text: "Vous avez besoin d'un article. Il est disponible en prêt interne. Que faites-vous ?",
          answers: [
          {text: "J'achète le mien — c'est plus pratique.", score: 0},
          {text: "J'emprunte si c'est facile.", score: 1},
          {text: "Je commence systématiquement par vérifier si un prêt interne est possible.", score: 2}
          ]
        },
        {
          text: "Un achat habituel devient disponible en version éco-certifiée à prix équivalent. Que faites-vous ?",
          answers: [
          {text: "Je continue avec la référence habituelle.", score: 0},
          {text: "Je bascule si on me demande de le faire.", score: 1},
          {text: "Je bascule proactivement et signale la nouvelle option.", score: 2}
          ]
        },
        {
          text: "Vous avez besoin d'un matériel pour une courte durée. Il peut être loué ou acheté. Que faites-vous ?",
          answers: [
          {text: "J'achète — c'est plus pratique sur le long terme.", score: 0},
          {text: "Je loue si c'est simple à organiser.", score: 1},
          {text: "Je loue par défaut pour les besoins ponctuels.", score: 2}
          ]
        },
        {
          text: "Un achat urgent arrive. La procédure normale est trop lente. Que faites-vous ?",
          answers: [
          {text: "Je commande en dehors de la procédure.", score: 0},
          {text: "J'utilise la procédure d'urgence si elle existe.", score: 1},
          {text: "Je vérifie d'abord si le besoin peut être couvert autrement avant de contourner la procédure.", score: 2}
          ]
        },
        {
          text: "Plusieurs fournisseurs répondent à votre besoin. L'un est local, les autres plus lointains. Que faites-vous ?",
          answers: [
          {text: "Je choisis le moins cher.", score: 0},
          {text: "Je prends en compte la proximité comme un critère.", score: 1},
          {text: "Je l'intègre explicitement dans ma comparaison avec les autres critères.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un fournisseur n'a pas de politique RSE mais est 20% moins cher. Que faites-vous ?",
          answers: [
          {text: "Je choisis le moins cher.", score: 0},
          {text: "Je signale l'absence de politique RSE.", score: 1},
          {text: "Je demande des critères comparatifs sur les deux options pour éclairer la décision.", score: 2}
          ]
        },
        {
          text: "Vous découvrez qu'un fournisseur sous-traite à des entreprises dont les conditions de travail sont douteuses. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon périmètre.", score: 0},
          {text: "Je le signale à l'acheteur.", score: 1},
          {text: "Je remonte l'information formellement et demande une vérification.", score: 2}
          ]
        },
        {
          text: "Un achat groupé avec d'autres équipes réduirait l'empreinte logistique mais nécessite de coordonner. Que faites-vous ?",
          answers: [
          {text: "Je commande de mon côté — coordonner prend trop de temps.", score: 0},
          {text: "Je propose si quelqu'un est motivé.", score: 1},
          {text: "Je prends l'initiative de coordonner.", score: 2}
          ]
        },
        {
          text: "Un critère RSE dans un appel d'offres n'a pas été vérifié après l'attribution. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle.", score: 0},
          {text: "Je le signale informellement.", score: 1},
          {text: "Je propose qu'un suivi post-contractuel soit organisé.", score: 2}
          ]
        },
        {
          text: "Un fournisseur propose une option moins polluante mais moins connue. Que faites-vous ?",
          answers: [
          {text: "Je reste sur la référence connue.", score: 0},
          {text: "Je pose des questions sur l'option alternative.", score: 1},
          {text: "Je prends le temps d'évaluer sérieusement l'option alternative avant de décider.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un emballage réduit est disponible mais nécessite un ajustement de présentation. Que faites-vous ?",
          answers: [
          {text: "Je garde l'emballage habituel — l'ajustement est contraignant.", score: 0},
          {text: "Je teste si l'ajustement est vraiment problématique.", score: 1},
          {text: "Je fais l'ajustement si l'emballage réduit est viable.", score: 2}
          ]
        },
        {
          text: "Des achats fréquents et dispersés pourraient être rationalisés. Personne ne l'a initié. Que faites-vous ?",
          answers: [
          {text: "Je laisse les acheteurs gérer.", score: 0},
          {text: "Je propose une rationalisation si quelqu'un me demande.", score: 1},
          {text: "Je prends l'initiative de proposer une analyse des achats et des pistes de rationalisation.", score: 2}
          ]
        },
        {
          text: "Un article livré a un emballage excessif. Que faites-vous ?",
          answers: [
          {text: "Je le jette.", score: 0},
          {text: "Je le signale mentalement.", score: 1},
          {text: "Je le signale au fournisseur ou à l'acheteur pour que le conditionnement soit revu.", score: 2}
          ]
        },
        {
          text: "Vous devez choisir entre deux options équivalentes en performance. L'une est réparable, l'autre non. Que faites-vous ?",
          answers: [
          {text: "Je choisis selon le prix.", score: 0},
          {text: "Je prends en compte la réparabilité comme critère secondaire.", score: 1},
          {text: "La réparabilité est un critère principal dans mon choix.", score: 2}
          ]
        },
        {
          text: "Des pratiques d'achat irresponsables ont été identifiées dans votre équipe. Personne ne les a encore adressées. Que faites-vous ?",
          answers: [
          {text: "Je m'occupe de mes propres pratiques.", score: 0},
          {text: "J'en parle informellement.", score: 1},
          {text: "Je remonte le sujet de façon structurée avec des exemples et des propositions.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre organisation n'a pas revu ses critères d'achat depuis longtemps. Que faites-vous ?",
          answers: [
          {text: "Je laisse les acheteurs gérer.", score: 0},
          {text: "Je suggère une mise à jour si l'occasion se présente.", score: 1},
          {text: "Je propose formellement une révision et propose des critères actualisés.", score: 2}
          ]
        },
        {
          text: "Les pratiques d'achat responsables de votre équipe sont bonnes mais peu documentées. Que faites-vous ?",
          answers: [
          {text: "Je continue comme ça — ça fonctionne.", score: 0},
          {text: "Je les note pour moi.", score: 1},
          {text: "Je cherche à les formaliser pour qu'elles soient transmissibles et durables.", score: 2}
          ]
        },
        {
          text: "Un collaborateur qui gère les achats ne prend pas en compte les critères RSE. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle d'intervenir.", score: 0},
          {text: "Je lui suggère de les prendre en compte.", score: 1},
          {text: "Je cherche à comprendre pourquoi et à lui proposer des outils concrets.", score: 2}
          ]
        },
        {
          text: "Votre organisation a de bons achats responsables sur le papier mais les écarts en pratique sont nombreux. Que faites-vous ?",
          answers: [
          {text: "Je laisse l'équipe RSE gérer.", score: 0},
          {text: "J'applique les critères pour mes propres achats.", score: 1},
          {text: "Je contribue à un état des lieux factuel et propose des actions correctives.", score: 2}
          ]
        },
        {
          text: "Les critères RSE dans les achats créent une charge administrative supplémentaire. Que faites-vous ?",
          answers: [
          {text: "J'accepte la charge.", score: 0},
          {text: "Je la minimise dans la mesure du possible.", score: 1},
          {text: "Je cherche à simplifier le processus pour que les critères RSE soient praticables sans alourdir.", score: 2}
          ]
        }
    ],
  },

  "engagement-rse": {
    0: [
        {
          text: "Vous ne savez pas vraiment quel est l'engagement RSE de votre organisation. Que faites-vous ?",
          answers: [
          {text: "Je laisse ça aux personnes dédiées.", score: 0},
          {text: "Je m'informe si l'occasion se présente.", score: 1},
          {text: "Je cherche à comprendre concrètement ce qui existe et ce qui s'applique à mon quotidien.", score: 2}
          ]
        },
        {
          text: "Vous voudriez agir pour l'environnement au travail mais vous ne savez pas par où commencer. Que faites-vous ?",
          answers: [
          {text: "J'attends qu'un programme soit lancé.", score: 0},
          {text: "Je fais des gestes simples sans les formaliser.", score: 1},
          {text: "Je commence par identifier un ou deux leviers concrets à mon niveau et je m'y tiens.", score: 2}
          ]
        },
        {
          text: "Vous pensez être peu légitime pour agir sur les sujets RSE sans en être expert. Que faites-vous ?",
          answers: [
          {text: "Je laisse les experts agir.", score: 0},
          {text: "Je fais de petits gestes sans m'afficher.", score: 1},
          {text: "Je me concentre sur mon périmètre réel — je n'ai pas besoin d'être expert pour agir.", score: 2}
          ]
        },
        {
          text: "Votre niveau d'engagement RSE personnel est modeste. Vous vous demandez si ça vaut la peine d'essayer de faire plus. Que faites-vous ?",
          answers: [
          {text: "Je continue au niveau actuel — c'est déjà quelque chose.", score: 0},
          {text: "Je cherche une ou deux actions supplémentaires réalistes.", score: 1},
          {text: "Je prends le temps d'identifier ce qui me freine vraiment et je travaille sur un point précis.", score: 2}
          ]
        },
        {
          text: "Vous n'êtes pas convaincu que les actions RSE dans votre organisation aient un impact réel. Que faites-vous ?",
          answers: [
          {text: "Je continue par conformisme.", score: 0},
          {text: "Je pose la question lors d'une réunion.", score: 1},
          {text: "Je cherche à comprendre comment les actions sont mesurées et si l'évaluation est fiable.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Une action RSE concrète à votre niveau vous demande un effort initial mais serait bénéfique. Que faites-vous ?",
          answers: [
          {text: "Je la reporte — j'ai d'autres priorités.", score: 0},
          {text: "Je la fais si j'ai le temps.", score: 1},
          {text: "Je la planifie concrètement pour ne pas la laisser en intention.", score: 2}
          ]
        },
        {
          text: "Votre organisation ne vous donne pas de signal clair sur ce qu'elle attend de vous en matière de RSE. Que faites-vous ?",
          answers: [
          {text: "J'attends une politique claire.", score: 0},
          {text: "Je fais ce qui me semble logique.", score: 1},
          {text: "Je cherche des marges d'action à mon niveau sans attendre un cadre complet.", score: 2}
          ]
        },
        {
          text: "Vous avez envie de réduire votre empreinte numérique professionnelle mais vous ne savez pas par où commencer. Que faites-vous ?",
          answers: [
          {text: "J'attends un guide ou une formation.", score: 0},
          {text: "Je commence par ce qui me semble évident.", score: 1},
          {text: "Je choisis un seul geste concret, je le mets en place, puis j'en ajoute un autre.", score: 2}
          ]
        },
        {
          text: "Votre organisation propose des actions RSE mais elles ne semblent pas prioritaires pour votre équipe. Que faites-vous ?",
          answers: [
          {text: "Je laisse tomber — ce n'est pas le bon moment.", score: 0},
          {text: "Je participe de façon minimale.", score: 1},
          {text: "Je cherche quelles actions sont réellement compatibles avec notre rythme de travail.", score: 2}
          ]
        },
        {
          text: "Une action RSE que vous souhaitez mettre en place à votre niveau nécessite une validation. Elle tarde. Que faites-vous ?",
          answers: [
          {text: "Je renonce.", score: 0},
          {text: "J'attends.", score: 1},
          {text: "Je relance en montrant concrètement ce que l'action apporte.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un collègue est indifférent aux sujets RSE. Que faites-vous ?",
          answers: [
          {text: "Je le laisse — c'est son droit.", score: 0},
          {text: "Je partage mes convictions.", score: 1},
          {text: "Je cherche un angle qui l'intéresse vraiment, sans l'assommer de discours.", score: 2}
          ]
        },
        {
          text: "Vous voulez embarquer votre équipe dans une démarche RSE mais vous ne voulez pas avoir l'air de donner des leçons. Que faites-vous ?",
          answers: [
          {text: "Je n'aborde pas le sujet.", score: 0},
          {text: "Je mentionne mes propres gestes sans chercher à les étendre.", score: 1},
          {text: "Je cherche une approche par l'action concrète et partagée plutôt que par la conviction.", score: 2}
          ]
        },
        {
          text: "Un collègue vous reproche d'être trop sensible aux sujets RSE. Que faites-vous ?",
          answers: [
          {text: "Je recule pour ne pas créer de tension.", score: 0},
          {text: "Je maintiens mes pratiques sans répondre.", score: 1},
          {text: "Je réponds calmement et factuellement, sans moraliser.", score: 2}
          ]
        },
        {
          text: "Votre équipe a lancé une démarche RSE que vous trouvez trop superficielle. Que faites-vous ?",
          answers: [
          {text: "Je participe quand même — quelque chose vaut mieux que rien.", score: 0},
          {text: "Je propose des actions plus ambitieuses.", score: 1},
          {text: "Je contribue à l'initiative ET propose des améliorations concrètes pour aller plus loin.", score: 2}
          ]
        },
        {
          text: "Des collègues prêts à agir attendent un signal ou une opportunité. Que faites-vous ?",
          answers: [
          {text: "Je les laisse attendre le bon moment.", score: 0},
          {text: "Je leur partage mes pratiques.", score: 1},
          {text: "Je prends l'initiative de créer l'opportunité pour qu'on agisse ensemble.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vos actions RSE personnelles vous coûtent du temps mais ne sont pas reconnues. Que faites-vous ?",
          answers: [
          {text: "Je réduis mes efforts.", score: 0},
          {text: "Je continue sans me soucier de la reconnaissance.", score: 1},
          {text: "Je continue ET cherche à rendre les efforts collectifs plus visibles pour que leur valeur soit reconnue.", score: 2}
          ]
        },
        {
          text: "Vous maintenez des pratiques RSE depuis longtemps. Comment les tenez-vous dans la durée ?",
          answers: [
          {text: "Je fais attention de ne pas glisser.", score: 0},
          {text: "Je me rappelle régulièrement pourquoi c'est important.", score: 1},
          {text: "Je les ai intégrées à mes routines de façon à ne pas dépendre de la motivation du moment.", score: 2}
          ]
        },
        {
          text: "Une période de forte pression vous a fait abandonner certains gestes RSE. Que faites-vous après ?",
          answers: [
          {text: "Je les reprends progressivement si j'y pense.", score: 0},
          {text: "Je reprends là où j'étais.", score: 1},
          {text: "J'identifie quels gestes ont résisté à la pression et je renforce ceux-là en priorité.", score: 2}
          ]
        },
        {
          text: "Vous avez sensibilisé des collègues qui ont pris de bonnes pratiques, mais elles se perdent avec le temps. Que faites-vous ?",
          answers: [
          {text: "J'accepte — le changement de comportement prend du temps.", score: 0},
          {text: "Je rappelle l'importance des pratiques.", score: 1},
          {text: "Je cherche à intégrer ces pratiques dans des rituels collectifs pour les rendre durables.", score: 2}
          ]
        },
        {
          text: "Vous vous sentez parfois découragé par l'ampleur des enjeux environnementaux par rapport à l'échelle de vos actions. Que faites-vous ?",
          answers: [
          {text: "Je continue par principe, même si c'est décourageant.", score: 0},
          {text: "Je me concentre sur ce que je peux contrôler.", score: 1},
          {text: "Je me rappelle le lien entre les comportements individuels et la culture collective, et j'agis en conséquence.", score: 2}
          ]
        }
    ],
  },

  "manager-rse-equipe": {
    0: [
        {
          text: "Vous portez le discours RSE auprès de votre équipe mais vous n'appliquez pas vous-même certaines pratiques que vous demandez. Que faites-vous ?",
          answers: [
          {text: "Je continue — le rôle de relais est distinct du rôle d'exemple.", score: 0},
          {text: "Je cherche à être plus cohérent progressivement.", score: 1},
          {text: "Je priorise l'exemplarité : mon équipe observera mes pratiques avant d'écouter mes discours.", score: 2}
          ]
        },
        {
          text: "Votre équipe vous voit faire des gestes RSE mais ne comprend pas pourquoi. Que faites-vous ?",
          answers: [
          {text: "Je laisse mes gestes parler d'eux-mêmes.", score: 0},
          {text: "J'explique si quelqu'un pose la question.", score: 1},
          {text: "Je crée des occasions de partager le sens de ces gestes sans transformer ça en leçon.", score: 2}
          ]
        },
        {
          text: "Vous avez des engagements RSE personnels que vous ne souhaitez pas imposer à votre équipe. Comment gérez-vous cela ?",
          answers: [
          {text: "Je les garde pour moi.", score: 0},
          {text: "Je les partage de façon informelle si ça vient naturellement.", score: 1},
          {text: "Je montre l'exemple sans en faire une attente — chacun a son propre cheminement.", score: 2}
          ]
        },
        {
          text: "Votre organisation valorise le discours RSE mais peu les actes réels. Que faites-vous ?",
          answers: [
          {text: "Je m'aligne sur la culture dominante.", score: 0},
          {text: "Je continue mes pratiques sans les mettre en avant.", score: 1},
          {text: "Je maintiens mes pratiques et cherche à rendre les actes concrets plus visibles.", score: 2}
          ]
        },
        {
          text: "Vous avez du mal à expliquer le lien entre le travail de votre équipe et les enjeux RSE globaux. Que faites-vous ?",
          answers: [
          {text: "Je laisse tomber — le lien n'est pas évident.", score: 0},
          {text: "J'utilise les communications officielles de l'organisation.", score: 1},
          {text: "Je construis un lien local et concret entre leur activité quotidienne et un impact mesurable.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous voulez embarquer votre équipe dans une démarche RSE mais certains membres résistent. Que faites-vous ?",
          answers: [
          {text: "Je les convaincs que c'est important.", score: 0},
          {text: "Je laisse chacun choisir son niveau d'engagement.", score: 1},
          {text: "Je cherche ce qui résonne concrètement pour les résistants et je pars de là.", score: 2}
          ]
        },
        {
          text: "Votre équipe participe formellement à des actions RSE mais sans vraiment y croire. Que faites-vous ?",
          answers: [
          {text: "La participation formelle suffit — les convictions viennent avec le temps.", score: 0},
          {text: "Je cherche à animer davantage les actions.", score: 1},
          {text: "Je cherche à comprendre ce qui génère ce décalage entre forme et fond.", score: 2}
          ]
        },
        {
          text: "Vous voulez créer un moment de sensibilisation RSE pour votre équipe. Elle est déjà surchargée. Que faites-vous ?",
          answers: [
          {text: "Je reporte — ce n'est pas le bon moment.", score: 0},
          {text: "Je crée un moment court et optionnel.", score: 1},
          {text: "Je cherche à intégrer la sensibilisation dans un moment qui existe déjà plutôt que d'en créer un nouveau.", score: 2}
          ]
        },
        {
          text: "Des membres de votre équipe ont des idées RSE mais ne savent pas comment les porter. Que faites-vous ?",
          answers: [
          {text: "Je les encourage à les partager en réunion.", score: 0},
          {text: "Je les aide à les formaliser.", score: 1},
          {text: "Je crée un espace dédié pour que ces idées soient accueillies et évaluées sérieusement.", score: 2}
          ]
        },
        {
          text: "L'engagement RSE de votre équipe varie beaucoup selon les personnes. Que faites-vous ?",
          answers: [
          {text: "Je laisse chacun à son niveau.", score: 0},
          {text: "Je valorise ceux qui s'engagent le plus.", score: 1},
          {text: "Je cherche des pratiques communes accessibles à tous, sans pénaliser ceux qui s'engagent davantage.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un projet de votre équipe a un impact environnemental que personne ne mesure. Que faites-vous ?",
          answers: [
          {text: "Si personne ne le mesure, c'est que ce n'est pas prioritaire.", score: 0},
          {text: "Je cherche à l'évaluer de façon informelle.", score: 1},
          {text: "Je propose d'intégrer un indicateur simple dans le pilotage du projet.", score: 2}
          ]
        },
        {
          text: "Votre hiérarchie vous demande des résultats rapides sur un projet qui nécessiterait des pratiques plus sobres. Que faites-vous ?",
          answers: [
          {text: "Je priorise les résultats — c'est ce qu'on attend de moi.", score: 0},
          {text: "Je cherche un compromis.", score: 1},
          {text: "Je rends l'arbitrage visible et je demande une décision explicite à ma hiérarchie.", score: 2}
          ]
        },
        {
          text: "Votre budget RSE est très faible par rapport aux objectifs. Que faites-vous ?",
          answers: [
          {text: "Je fais ce que je peux avec ce que j'ai.", score: 0},
          {text: "J'en parle à ma hiérarchie.", score: 1},
          {text: "Je construis un argumentaire sur le décalage entre objectifs et moyens et je demande un arbitrage.", score: 2}
          ]
        },
        {
          text: "Un partenaire ou fournisseur de votre équipe a des pratiques RSE contradictoires avec vos objectifs. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — ce n'est pas ma relation à gérer.", score: 0},
          {text: "J'en parle informellement à l'acheteur.", score: 1},
          {text: "Je remonte formellement la contradiction et propose des critères pour la prochaine évaluation.", score: 2}
          ]
        },
        {
          text: "Vous avez des objectifs RSE mais ils ne sont jamais abordés en revue de performance. Que faites-vous ?",
          answers: [
          {text: "Je les traite comme secondaires si personne n'en parle.", score: 0},
          {text: "Je les aborde moi-même lors de la revue.", score: 1},
          {text: "Je propose qu'ils soient intégrés structurellement dans les revues.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Les bonnes pratiques RSE de votre équipe sont peu durables. Elles s'essoufflent à chaque changement de contexte. Que faites-vous ?",
          answers: [
          {text: "J'accepte — le contexte évolue constamment.", score: 0},
          {text: "Je rappelle les pratiques après chaque changement.", score: 1},
          {text: "J'analyse pourquoi elles s'essoufflent et cherche à les ancrer dans des structures plus robustes.", score: 2}
          ]
        },
        {
          text: "Votre équipe a bien avancé sur la RSE mais les nouvelles personnes ne sont pas dans la dynamique. Que faites-vous ?",
          answers: [
          {text: "Je leur laisse le temps de s'intégrer.", score: 0},
          {text: "Je leur présente nos pratiques.", score: 1},
          {text: "J'intègre la sensibilisation RSE dans l'onboarding de façon naturelle et concrète.", score: 2}
          ]
        },
        {
          text: "L'engagement RSE de votre équipe est bon mais peu documenté. Que faites-vous ?",
          answers: [
          {text: "Je laisse les pratiques parler d'elles-mêmes.", score: 0},
          {text: "Je les note informellement.", score: 1},
          {text: "Je cherche à les documenter pour les rendre transmissibles et mesurables.", score: 2}
          ]
        },
        {
          text: "Votre équipe a intégré des pratiques RSE ambitieuses mais qui créent de la friction avec d'autres équipes. Que faites-vous ?",
          answers: [
          {text: "Je maintiens nos pratiques — chacun fait à sa façon.", score: 0},
          {text: "Je cherche un compromis.", score: 1},
          {text: "Je cherche à partager nos pratiques de façon à ce que d'autres puissent s'en inspirer sans se sentir jugés.", score: 2}
          ]
        },
        {
          text: "La direction vous demande un bilan de votre démarche RSE équipe. Que faites-vous ?",
          answers: [
          {text: "Je liste les actions menées.", score: 0},
          {text: "Je présente les actions et leurs retours.", score: 1},
          {text: "Je présente les actions, leurs impacts mesurés et les apprentissages pour la suite.", score: 2}
          ]
        }
    ],
  },

  "conflits-interets": {
    0: [
        {
          text: "Vous participez à une commission d'évaluation d'un prestataire. Votre conjoint(e) travaille pour ce prestataire. Que faites-vous ?",
          answers: [
          {text: "Je participe mais je reste objectif.", score: 0},
          {text: "Je le mentionne à mon responsable.", score: 1},
          {text: "Je me déclare en situation de conflit d'intérêts et je me retire de la commission.", score: 2}
          ]
        },
        {
          text: "Votre frère crée une société qui pourrait répondre à un appel d'offres de votre organisation. Que faites-vous ?",
          answers: [
          {text: "Je laisse le processus se dérouler — je ne vais pas influencer la décision.", score: 0},
          {text: "J'en parle à mon responsable avant que le processus démarre.", score: 1},
          {text: "Je déclare la situation à la personne compétente et je m'exclus de toute décision liée à ce dossier.", score: 2}
          ]
        },
        {
          text: "Vous avez un investissement personnel dans une société qui est en négociation avec votre organisation. Vous ne l'avez jamais déclaré. Que faites-vous ?",
          answers: [
          {text: "Je continue — mon investissement est minoritaire et je ne prends pas les décisions finales.", score: 0},
          {text: "Je surveille si la situation évolue vers un vrai conflit.", score: 1},
          {text: "Je déclare immédiatement l'investissement aux personnes compétentes.", score: 2}
          ]
        },
        {
          text: "Vous recrutez et un ami proche pose sa candidature. Il est qualifié. Que faites-vous ?",
          answers: [
          {text: "J'évalue sa candidature — il est qualifié comme les autres.", score: 0},
          {text: "Je le mentionne à mon responsable.", score: 1},
          {text: "Je me retire du processus de recrutement et laisse quelqu'un d'autre évaluer sa candidature.", score: 2}
          ]
        },
        {
          text: "Vous évaluez des projets et l'un d'eux est porté par un ancien collègue avec qui vous avez gardé une relation amicale forte. Que faites-vous ?",
          answers: [
          {text: "J'évalue tous les projets de la même façon — ma professionnalisme suffit.", score: 0},
          {text: "Je le mentionne de façon informelle.", score: 1},
          {text: "Je déclare la relation et demande si je dois m'exclure de l'évaluation de ce projet spécifique.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Une situation vous semble être un conflit d'intérêts mais vous n'en êtes pas certain. Que faites-vous ?",
          answers: [
          {text: "J'attends d'en être sûr pour agir.", score: 0},
          {text: "J'en parle à un collègue de confiance.", score: 1},
          {text: "Je consulte la personne compétente (déontologue, compliance) dès que j'ai un doute.", score: 2}
          ]
        },
        {
          text: "Un responsable vous demande de participer à une décision où vous avez un intérêt indirect. Vous pensez pouvoir rester objectif. Que faites-vous ?",
          answers: [
          {text: "Je participe — je suis capable de rester objectif.", score: 0},
          {text: "Je mentionne l'intérêt indirect mais je participe si le responsable le valide.", score: 1},
          {text: "Je déclare la situation et laisse la décision sur la participation à quelqu'un d'autre.", score: 2}
          ]
        },
        {
          text: "Vous avez déclaré un conflit d'intérêts mais votre responsable dit que ce n'est pas grave et vous demande de continuer. Que faites-vous ?",
          answers: [
          {text: "Je continue — mon responsable a validé.", score: 0},
          {text: "Je note l'échange par précaution.", score: 1},
          {text: "Je documente la situation et cherche une confirmation de la position du responsable par écrit, au cas où.", score: 2}
          ]
        },
        {
          text: "Une situation de conflit d'intérêts vous concerne mais elle est difficile à prouver. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — sans preuve, mieux vaut ne pas signaler.", score: 0},
          {text: "J'en parle à quelqu'un de confiance.", score: 1},
          {text: "Je signale avec les éléments factuels que j'ai, même s'ils sont incomplets.", score: 2}
          ]
        },
        {
          text: "Vous devez conseiller votre organisation sur un sujet où vous avez un intérêt financier personnel non déclaré. Que faites-vous ?",
          answers: [
          {text: "Je donne le meilleur conseil possible — mes intérêts financiers n'influencent pas ma recommandation.", score: 0},
          {text: "Je minimise mon implication dans ce dossier.", score: 1},
          {text: "Je déclare l'intérêt financier avant de me positionner sur ce sujet.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous avez identifié une situation de conflit d'intérêts. Que documentez-vous ?",
          answers: [
          {text: "Je note la situation dans un email à moi-même.", score: 0},
          {text: "Je remplis le registre prévu si je le connais.", score: 1},
          {text: "Je documente les faits précis, les relations en jeu, les décisions potentiellement affectées et je transmets aux personnes compétentes.", score: 2}
          ]
        },
        {
          text: "Vous avez signalé un conflit d'intérêts mais rien n'a changé dans le processus de décision. Que faites-vous ?",
          answers: [
          {text: "J'ai fait ma part — le reste appartient à la hiérarchie.", score: 0},
          {text: "Je relance.", score: 1},
          {text: "Je demande une confirmation formelle du traitement de ma déclaration.", score: 2}
          ]
        },
        {
          text: "Un collègue vous confie être dans une situation de conflit d'intérêts. Il ne sait pas quoi faire. Que faites-vous ?",
          answers: [
          {text: "Je lui conseille d'en parler à son responsable.", score: 0},
          {text: "Je l'aide à évaluer si c'est réellement un conflit.", score: 1},
          {text: "Je lui explique la procédure de déclaration et l'oriente vers la personne compétente.", score: 2}
          ]
        },
        {
          text: "Vous êtes dans une situation de conflit d'intérêts que vous avez déclarée. Votre organisation prend du temps à statuer. Que faites-vous ?",
          answers: [
          {text: "Je continue à agir en attendant.", score: 0},
          {text: "Je limite mon implication dans le dossier.", score: 1},
          {text: "Je ne prends aucune décision sur le dossier concerné jusqu'à avoir une réponse formelle.", score: 2}
          ]
        },
        {
          text: "Vous avez déclaré une situation mais la réponse de votre organisation vous semble incomplète. Que faites-vous ?",
          answers: [
          {text: "J'accepte la réponse — j'ai fait ce qu'il fallait.", score: 0},
          {text: "Je pose des questions supplémentaires.", score: 1},
          {text: "Je m'assure que la réponse couvre vraiment la situation et relance si nécessaire.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre équipe ne semble pas connaître les règles sur les conflits d'intérêts. Que faites-vous ?",
          answers: [
          {text: "Je laisse le service compliance s'en occuper.", score: 0},
          {text: "Je sensibilise de façon informelle.", score: 1},
          {text: "Je cherche à intégrer le sujet dans un moment d'équipe de façon concrète.", score: 2}
          ]
        },
        {
          text: "Les règles sur les conflits d'intérêts de votre organisation sont vagues. Que faites-vous ?",
          answers: [
          {text: "J'interprète les règles selon mon jugement.", score: 0},
          {text: "Je demande des précisions à la compliance.", score: 1},
          {text: "Je demande des précisions et propose des exemples concrets pour clarifier l'application.", score: 2}
          ]
        },
        {
          text: "Un collègue minimise l'importance de déclarer ses conflits d'intérêts. Que faites-vous ?",
          answers: [
          {text: "Je le laisse — c'est sa responsabilité.", score: 0},
          {text: "Je lui explique brièvement pourquoi c'est important.", score: 1},
          {text: "J'engage une discussion factuelle sur les risques réels pour lui et pour l'organisation.", score: 2}
          ]
        },
        {
          text: "Vous avez eu une situation de conflit d'intérêts passée non déclarée. Que faites-vous maintenant ?",
          answers: [
          {text: "Je laisse passer — c'est du passé.", score: 0},
          {text: "Je prends note pour l'avenir.", score: 1},
          {text: "Je consulte la compliance pour comprendre si je dois régulariser la situation.", score: 2}
          ]
        },
        {
          text: "Votre organisation n'a pas de registre formel des conflits d'intérêts. Que faites-vous ?",
          answers: [
          {text: "Je fais de mon mieux avec ce qui existe.", score: 0},
          {text: "Je demande si un registre pourrait être créé.", score: 1},
          {text: "Je propose concrètement comment mettre en place un registre simple.", score: 2}
          ]
        }
    ],
  },

  "cadeaux-invitations": {
    0: [
        {
          text: "Un fournisseur vous offre un cadeau modeste (bouteille de vin, chocolats) lors d'une visite de fin d'année. Que faites-vous ?",
          answers: [
          {text: "J'accepte — c'est un geste habituel.", score: 0},
          {text: "J'accepte mais je le signale à mon responsable.", score: 1},
          {text: "Je vérifie la politique de mon organisation avant d'accepter ou de refuser.", score: 2}
          ]
        },
        {
          text: "Vous recevez une invitation à un événement sportif haut de gamme de la part d'un prestataire en cours de négociation. Que faites-vous ?",
          answers: [
          {text: "J'accepte — c'est une opportunité de renforcer la relation.", score: 0},
          {text: "Je refuse par précaution.", score: 1},
          {text: "Je refuse et le signale à la compliance — le timing crée un risque réel d'influence.", score: 2}
          ]
        },
        {
          text: "Un fournisseur vous offre un cadeau dont la valeur dépasse clairement les seuils de votre politique. Que faites-vous ?",
          answers: [
          {text: "Je l'accepte — refuser serait gênant.", score: 0},
          {text: "Je le prends et en informe mon responsable.", score: 1},
          {text: "Je le refuse poliment en expliquant la politique de mon organisation.", score: 2}
          ]
        },
        {
          text: "Lors d'un déplacement chez un client, il vous offre un cadeau de valeur. Vous n'avez pas votre politique en tête. Que faites-vous ?",
          answers: [
          {text: "J'accepte et je vérifierai plus tard.", score: 0},
          {text: "Je le prends en précisant que je dois vérifier si c'est conforme.", score: 1},
          {text: "Je reporte l'acceptation au lendemain le temps de vérifier.", score: 2}
          ]
        },
        {
          text: "Un cadeau vous est offert par un partenaire dans un contexte culturel où c'est la norme. Que faites-vous ?",
          answers: [
          {text: "J'accepte — les normes culturelles justifient l'exception.", score: 0},
          {text: "J'accepte mais je note la situation.", score: 1},
          {text: "J'accepte si la valeur est raisonnable et je le déclare à la compliance en précisant le contexte.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous avez organisé un événement client avec une hospitalité généreuse. Votre responsable vous questionne. Que faites-vous ?",
          answers: [
          {text: "Je défends mes choix — c'est dans l'intérêt de la relation client.", score: 0},
          {text: "Je m'explique en précisant le contexte.", score: 1},
          {text: "Je fournis les éléments de justification et m'assure que cela a été validé par les bonnes personnes en amont.", score: 2}
          ]
        },
        {
          text: "Vous êtes invité à un voyage professionnel offert par un partenaire. Votre conjoint(e) peut vous accompagner aux frais du partenaire. Que faites-vous ?",
          answers: [
          {text: "J'accepte — c'est une pratique courante dans ce secteur.", score: 0},
          {text: "J'accepte pour moi mais pas pour mon conjoint(e).", score: 1},
          {text: "Je vérifie la politique de mon organisation et je n'accepte que ce qui est clairement autorisé.", score: 2}
          ]
        },
        {
          text: "Un client vous propose de vous rembourser un voyage personnel en échange d'un service. Que faites-vous ?",
          answers: [
          {text: "J'évalue si c'est vraiment problématique.", score: 0},
          {text: "Je refuse mais sans explication.", score: 1},
          {text: "Je refuse clairement et documente la proposition reçue.", score: 2}
          ]
        },
        {
          text: "Vous invitez un partenaire à un événement d'entreprise de valeur. Votre politique ne précise pas si c'est permis pour ce type d'événement. Que faites-vous ?",
          answers: [
          {text: "Je l'invite — si ce n'est pas interdit, c'est permis.", score: 0},
          {text: "Je demande à mon responsable.", score: 1},
          {text: "Je consulte la compliance ou la politique pour m'assurer que l'invitation est conforme.", score: 2}
          ]
        },
        {
          text: "Vous voulez offrir un cadeau de fin d'année à un client. Vous ne savez pas si sa politique lui permet de l'accepter. Que faites-vous ?",
          answers: [
          {text: "Je l'envoie — s'il ne peut pas l'accepter, il me le dira.", score: 0},
          {text: "Je lui demande avant d'envoyer.", score: 1},
          {text: "Je vérifie sa politique ou je choisis un cadeau symbolique qui ne pose pas de problème.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous avez reçu un cadeau que vous pensiez pouvoir accepter. En le redéclarant à votre service compliance, ils disent qu'il dépasse le seuil. Que faites-vous ?",
          answers: [
          {text: "Je le garde — je l'avais accepté de bonne foi.", score: 0},
          {text: "Je propose de le reverser à une association.", score: 1},
          {text: "Je suis les instructions de la compliance sur la façon de gérer la situation.", score: 2}
          ]
        },
        {
          text: "Vous pensez que votre organisation est trop restrictive sur les cadeaux et invitations. Que faites-vous ?",
          answers: [
          {text: "J'applique les règles mais avec réticence.", score: 0},
          {text: "J'exprime mon désaccord et applique quand même.", score: 1},
          {text: "J'applique les règles et propose une révision via les voies appropriées si je pense qu'elles peuvent être améliorées.", score: 2}
          ]
        },
        {
          text: "Un partenaire offre un cadeau à votre équipe (pas à vous personnellement). Que faites-vous ?",
          answers: [
          {text: "Je laisse l'équipe gérer.", score: 0},
          {text: "Je m'assure que le cadeau est modeste.", score: 1},
          {text: "Je traite ça comme si c'était un cadeau personnel — je vérifie la conformité et déclare si nécessaire.", score: 2}
          ]
        },
        {
          text: "Vous avez refusé une invitation et votre partenaire l'a mal vécu. Que faites-vous ?",
          answers: [
          {text: "Je regrette mon refus — la relation est plus importante.", score: 0},
          {text: "J'explique ma position sans m'excuser.", score: 1},
          {text: "Je lui explique honnêtement les contraintes de ma politique sans sous-entendre que les règles sont excessives.", score: 2}
          ]
        },
        {
          text: "Vous avez accepté une invitation qui rétrospectivement dépasse les limites admissibles. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — ce qui est fait est fait.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je le déclare à la compliance et propose comment gérer la situation.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre équipe ne connaît pas vraiment les règles sur les cadeaux et invitations. Que faites-vous ?",
          answers: [
          {text: "Je laisse le service compliance gérer la formation.", score: 0},
          {text: "Je leur explique les grandes lignes.", score: 1},
          {text: "Je crée un moment concret pour partager des exemples pratiques et les aider à naviguer.", score: 2}
          ]
        },
        {
          text: "Les règles de votre organisation sur les cadeaux sont complexes et personne ne les applique vraiment. Que faites-vous ?",
          answers: [
          {text: "Je fais comme tout le monde.", score: 0},
          {text: "J'applique pour moi en restant prudent.", score: 1},
          {text: "Je remonte la situation à la compliance avec des exemples pour qu'une simplification soit envisagée.", score: 2}
          ]
        },
        {
          text: "Un collègue accepte régulièrement des invitations qui semblent dépasser les seuils. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle de surveiller les autres.", score: 0},
          {text: "Je lui en parle discrètement.", score: 1},
          {text: "Je l'aborde de façon factuelle ou en réfère à la compliance si le sujet est sérieux.", score: 2}
          ]
        },
        {
          text: "Votre secteur a une culture d'hospitalité forte qui entre en tension avec votre politique interne. Que faites-vous ?",
          answers: [
          {text: "J'adapte mes pratiques à la culture du secteur.", score: 0},
          {text: "J'applique ma politique interne même si c'est inconfortable.", score: 1},
          {text: "J'applique ma politique et cherche des façons de maintenir la relation sans franchir les limites.", score: 2}
          ]
        },
        {
          text: "Vous n'avez jamais eu de formation sur les règles cadeaux et invitations. Que faites-vous ?",
          answers: [
          {text: "Je me débrouille avec mon bon sens.", score: 0},
          {text: "Je cherche la politique interne.", score: 1},
          {text: "Je cherche la politique ET je demande à la compliance de me clarifier les points ambigus.", score: 2}
          ]
        }
    ],
  },

  "alerte-ethique": {
    0: [
        {
          text: "Vous observez une situation potentiellement illégale dans votre organisation mais vous n'en êtes pas certain. Que faites-vous ?",
          answers: [
          {text: "J'attends d'être certain avant d'agir.", score: 0},
          {text: "J'en parle à un collègue de confiance.", score: 1},
          {text: "Je consulte le dispositif d'alerte ou la compliance pour décrire ce que j'ai observé.", score: 2}
          ]
        },
        {
          text: "Vous suspectez une fraude mineure dans votre équipe. Les faits sont fragmentaires. Que faites-vous ?",
          answers: [
          {text: "J'attends d'avoir plus d'éléments.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je signale les éléments que j'ai via le canal prévu, en précisant leur caractère fragmentaire.", score: 2}
          ]
        },
        {
          text: "Vous avez observé quelque chose d'inquiétant mais vous craignez de vous tromper et de nuire à quelqu'un injustement. Que faites-vous ?",
          answers: [
          {text: "Je ne signale pas — le risque d'injustice est trop grand.", score: 0},
          {text: "J'en parle anonymement.", score: 1},
          {text: "Je signale en étant transparent sur mes doutes et les limites de ce que j'ai observé.", score: 2}
          ]
        },
        {
          text: "Vous avez identifié une pratique illégale. Elle implique votre responsable direct. Que faites-vous ?",
          answers: [
          {text: "Je ne signale pas — ma hiérarchie directe est concernée.", score: 0},
          {text: "Je cherche quelqu'un d'autre à alerter dans ma hiérarchie.", score: 1},
          {text: "Je signale via un canal indépendant de ma hiérarchie directe (compliance, référent éthique).", score: 2}
          ]
        },
        {
          text: "Vous voyez quelque chose d'anormal mais vous ne connaissez pas le canal de signalement. Que faites-vous ?",
          answers: [
          {text: "Je ne signale pas faute de savoir comment.", score: 0},
          {text: "Je cherche quelqu'un à qui en parler.", score: 1},
          {text: "Je prends le temps de trouver le bon canal avant de me décourager.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Vous souhaitez signaler mais vous craignez des représailles. Que faites-vous ?",
          answers: [
          {text: "Je renonce — les représailles sont trop risquées.", score: 0},
          {text: "Je signale anonymement.", score: 1},
          {text: "Je me renseigne sur les protections auxquelles j'ai droit avant de décider.", score: 2}
          ]
        },
        {
          text: "Vous avez signalé et votre responsable vous a demandé d'expliquer d'où venait votre information. Que faites-vous ?",
          answers: [
          {text: "Je lui explique en détail.", score: 0},
          {text: "Je minimise les informations partagées.", score: 1},
          {text: "Je rappelle que la confidentialité du signalement doit être respectée et que je ne peux pas en dire plus.", score: 2}
          ]
        },
        {
          text: "Un collègue a également observé la situation et hésite à signaler. Que faites-vous ?",
          answers: [
          {text: "Je le laisse décider.", score: 0},
          {text: "Je l'encourage à signaler.", score: 1},
          {text: "Je lui explique le dispositif disponible et les protections qui existent, et je lui laisse la décision.", score: 2}
          ]
        },
        {
          text: "Vous avez signalé mais vous n'avez aucun retour depuis plusieurs semaines. Que faites-vous ?",
          answers: [
          {text: "J'attends — les procédures prennent du temps.", score: 0},
          {text: "Je relance informellement.", score: 1},
          {text: "Je relance formellement pour demander une confirmation de la prise en compte de mon signalement.", score: 2}
          ]
        },
        {
          text: "Vous avez signalé une situation mais les faits sont difficiles à documenter. Que faites-vous ?",
          answers: [
          {text: "Je retire mon signalement — sans preuve, il est fragile.", score: 0},
          {text: "Je maintiens mon signalement tel quel.", score: 1},
          {text: "Je maintiens mon signalement en précisant clairement les limites de ce que je peux prouver.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Vous devez mettre par écrit votre observation pour le signalement. Que faites-vous ?",
          answers: [
          {text: "Je décris la situation telle que je la comprends globalement.", score: 0},
          {text: "Je note les faits principaux.", score: 1},
          {text: "Je décris uniquement les faits observés directement, en séparant les faits de mes interprétations.", score: 2}
          ]
        },
        {
          text: "Vous avez des éléments à l'appui de votre signalement (documents, emails). Que faites-vous ?",
          answers: [
          {text: "Je les garde — je ne sais pas si je dois les fournir.", score: 0},
          {text: "Je les transmets avec mon signalement.", score: 1},
          {text: "Je les conserve de façon sécurisée et je les transmets uniquement via le canal prévu.", score: 2}
          ]
        },
        {
          text: "Votre signalement pourrait exposer des informations confidentielles. Que faites-vous ?",
          answers: [
          {text: "Je ne signale pas pour protéger la confidentialité.", score: 0},
          {text: "Je signale sans les informations confidentielles.", score: 1},
          {text: "Je consulte la compliance sur la façon de signaler sans compromettre la confidentialité nécessaire.", score: 2}
          ]
        },
        {
          text: "Vous hésitez à mettre votre nom sur un signalement. Que faites-vous ?",
          answers: [
          {text: "Je ne signale pas — je ne veux pas être identifié.", score: 0},
          {text: "Je signale anonymement.", score: 1},
          {text: "Je m'informe sur les options disponibles : signalement anonyme, canal confidentiel, référent éthique.", score: 2}
          ]
        },
        {
          text: "Vous avez signalé une situation. On vous demande de garder le silence pendant l'enquête. Que faites-vous ?",
          answers: [
          {text: "Je continue à en parler à mes proches de confiance.", score: 0},
          {text: "J'accepte de garder le silence.", score: 1},
          {text: "J'accepte et je demande à quelle échéance je peux espérer un retour.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Vous avez signalé une situation qui s'avère finalement non fondée après enquête. Que faites-vous ?",
          answers: [
          {text: "Je regrette d'avoir signalé — c'était une erreur.", score: 0},
          {text: "Je prends la décision au sérieux pour l'avenir.", score: 1},
          {text: "Je maintiens que signaler était la bonne décision — l'enquête a fait son travail.", score: 2}
          ]
        },
        {
          text: "Votre organisation traite peu visiblement les alertes éthiques reçues. Que faites-vous ?",
          answers: [
          {text: "Je perds confiance dans le dispositif.", score: 0},
          {text: "Je signale quand même en cas de besoin.", score: 1},
          {text: "Je signale l'opacité à la compliance ou aux instances compétentes.", score: 2}
          ]
        },
        {
          text: "Vous constatez que peu de personnes dans votre organisation connaissent le dispositif d'alerte. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon rôle de le diffuser.", score: 0},
          {text: "Je le mentionne informellement.", score: 1},
          {text: "Je cherche une occasion de le faire connaître concrètement dans mon entourage.", score: 2}
          ]
        },
        {
          text: "Vous avez utilisé le dispositif d'alerte et l'expérience a été difficile. Que faites-vous a posteriori ?",
          answers: [
          {text: "Je me dis que je ne recommencerai pas.", score: 0},
          {text: "J'en tire des leçons pour moi.", score: 1},
          {text: "Je cherche à comprendre ce qui aurait pu être mieux géré et je partage ce retour si je peux.", score: 2}
          ]
        },
        {
          text: "Un collègue vous demande votre avis sur sa décision de signaler ou non. Que faites-vous ?",
          answers: [
          {text: "Je lui donne mon opinion sur la situation.", score: 0},
          {text: "Je l'encourage à signaler.", score: 1},
          {text: "Je l'aide à clarifier ce qu'il a observé et l'oriente vers le bon canal — sans décider à sa place.", score: 2}
          ]
        }
    ],
  },

  "manager-compliance": {
    0: [
        {
          text: "Votre équipe est confrontée à une zone grise éthique. Personne ne sait quelle règle s'applique. Que faites-vous ?",
          answers: [
          {text: "Je tranche selon mon jugement.", score: 0},
          {text: "Je cherche la règle applicable moi-même.", score: 1},
          {text: "Je contacte la compliance pour obtenir une interprétation officielle.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous signale une situation qui lui semble douteuse mais il hésite à qualifier. Que faites-vous ?",
          answers: [
          {text: "Je le rassure que tout va bien.", score: 0},
          {text: "Je l'écoute et je décide si c'est vraiment un problème.", score: 1},
          {text: "Je l'aide à décrire les faits objectivement et je l'oriente vers le bon canal.", score: 2}
          ]
        },
        {
          text: "Votre équipe est confrontée à une demande d'un client qui semble en tension avec les règles de compliance. Que faites-vous ?",
          answers: [
          {text: "J'essaie de satisfaire le client dans les limites que je comprends.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je consulte la compliance avant de répondre au client.", score: 2}
          ]
        },
        {
          text: "Une règle de compliance semble excessive à votre équipe et personne ne la respecte vraiment. Que faites-vous ?",
          answers: [
          {text: "Je m'aligne sur la pratique collective — si tout le monde fait pareil, c'est que la règle est inadaptée.", score: 0},
          {text: "Je l'applique pour moi sans intervenir sur l'équipe.", score: 1},
          {text: "Je l'applique et propose via les voies officielles une révision si elle est vraiment inadaptée.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous dit qu'une règle de compliance ne s'applique pas à son cas précis. Vous n'en êtes pas sûr. Que faites-vous ?",
          answers: [
          {text: "Je lui fais confiance — il connaît mieux son activité.", score: 0},
          {text: "Je cherche la réponse moi-même.", score: 1},
          {text: "Je cherche la confirmation auprès de la compliance avant de valider son interprétation.", score: 2}
          ]
        }
    ],
    1: [
        {
          text: "Un collaborateur vous consulte avant de prendre une décision qui pourrait poser un problème éthique. Que faites-vous ?",
          answers: [
          {text: "Je lui donne mon avis personnel.", score: 0},
          {text: "Je l'aide à réfléchir mais sans l'orienter vers un expert.", score: 1},
          {text: "Je lui pose des questions pour clarifier la situation et je l'oriente vers la compliance si nécessaire.", score: 2}
          ]
        },
        {
          text: "Un collaborateur vous demande s'il doit signaler une situation qu'il a observée. Que faites-vous ?",
          answers: [
          {text: "Je lui dis que c'est à lui de décider.", score: 0},
          {text: "Je l'encourage à signaler.", score: 1},
          {text: "Je l'aide à évaluer objectivement la situation et je lui explique comment signaler si c'est la bonne décision.", score: 2}
          ]
        },
        {
          text: "Votre équipe traite des informations confidentielles et vous avez un doute sur si les pratiques actuelles respectent les règles. Que faites-vous ?",
          answers: [
          {text: "Je laisse passer — les pratiques ont toujours été comme ça.", score: 0},
          {text: "J'en parle à mon responsable.", score: 1},
          {text: "Je consulte la compliance pour vérifier la conformité des pratiques.", score: 2}
          ]
        },
        {
          text: "Un collaborateur refuse de se plier à une règle de compliance qu'il trouve injuste. Que faites-vous ?",
          answers: [
          {text: "Je lui laisse le choix — la règle est effectivement discutable.", score: 0},
          {text: "Je lui dis qu'il doit s'y conformer.", score: 1},
          {text: "Je lui explique pourquoi la règle existe, je l'écoute et je propose de remonter son retour par les voies officielles.", score: 2}
          ]
        },
        {
          text: "Votre équipe est confrontée à une pression commerciale qui l'incite à assouplir certaines règles. Que faites-vous ?",
          answers: [
          {text: "Je cherche un compromis.", score: 0},
          {text: "Je maintiens les règles sans explication.", score: 1},
          {text: "Je maintiens les règles ET j'alerte ma hiérarchie sur la pression subie.", score: 2}
          ]
        }
    ],
    2: [
        {
          text: "Un problème éthique que vous aviez identifié dans votre équipe a été signalé à votre place par quelqu'un d'autre. Que faites-vous ?",
          answers: [
          {text: "Je suis soulagé — quelqu'un d'autre a géré.", score: 0},
          {text: "Je regarde comment la situation est traitée.", score: 1},
          {text: "Je coopère pleinement avec l'enquête et j'examine pourquoi je n'avais pas encore agi.", score: 2}
          ]
        },
        {
          text: "Un signalement concerne un comportement dans votre équipe. On vous interroge. Que faites-vous ?",
          answers: [
          {text: "Je défends mon équipe.", score: 0},
          {text: "Je coopère à l'enquête en répondant aux questions.", score: 1},
          {text: "Je coopère pleinement, je fournis les faits objectivement et je reste neutre dans mes interprétations.", score: 2}
          ]
        },
        {
          text: "Vous identifiez une pratique non conforme dans votre équipe que vous n'avez pas initiée vous-même. Que faites-vous ?",
          answers: [
          {text: "Je ferme les yeux — je n'en suis pas responsable.", score: 0},
          {text: "J'en parle informellement au collaborateur concerné.", score: 1},
          {text: "Je traite la non-conformité formellement, quelle que soit son origine.", score: 2}
          ]
        },
        {
          text: "Une non-conformité dans votre équipe remonte à avant votre prise de poste. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas mon problème — c'était avant moi.", score: 0},
          {text: "Je corrige la pratique pour l'avenir.", score: 1},
          {text: "Je déclare la situation à la compliance et je traite le passé comme le présent.", score: 2}
          ]
        },
        {
          text: "Vous devez donner un feedback à un collaborateur sur un comportement éthiquement limite. Que faites-vous ?",
          answers: [
          {text: "Je lui exprime mes valeurs personnelles.", score: 0},
          {text: "Je lui rappelle les règles.", score: 1},
          {text: "Je m'appuie sur des faits précis, je lui explique l'impact et je lui indique le cadre applicable.", score: 2}
          ]
        }
    ],
    3: [
        {
          text: "Votre équipe ne parle jamais d'éthique dans les réunions. Que faites-vous ?",
          answers: [
          {text: "Ce n'est pas le bon cadre pour ce type de discussion.", score: 0},
          {text: "Je soulève le sujet quand une occasion se présente.", score: 1},
          {text: "Je cherche à intégrer le sujet dans les rituels d'équipe de façon naturelle et concrète.", score: 2}
          ]
        },
        {
          text: "Des collaborateurs pensent que les règles de compliance ne s'appliquent pas à eux ou à leur activité. Que faites-vous ?",
          answers: [
          {text: "Je les laisse s'auto-réguler.", score: 0},
          {text: "Je leur rappelle que les règles sont universelles.", score: 1},
          {text: "Je crée un moment pour traiter des cas concrets liés à leur activité spécifique.", score: 2}
          ]
        },
        {
          text: "Les ressources de la compliance sont peu accessibles pour votre équipe. Que faites-vous ?",
          answers: [
          {text: "Je gère de mon mieux avec ce que j'ai.", score: 0},
          {text: "Je cherche le bon contact.", score: 1},
          {text: "Je remonte le problème d'accessibilité et facilite le lien entre mon équipe et les ressources compétentes.", score: 2}
          ]
        },
        {
          text: "Votre équipe a eu un incident éthique. Comment vous en assurez-vous que ça ne se reproduise pas ?",
          answers: [
          {text: "Je rappelle les règles après l'incident.", score: 0},
          {text: "Je cherche la cause de l'incident.", score: 1},
          {text: "J'analyse les causes profondes et j'intègre des garde-fous concrets dans les pratiques de l'équipe.", score: 2}
          ]
        },
        {
          text: "Vous réalisez que les comportements éthiques sont surtout présents quand quelqu'un surveille. Que faites-vous ?",
          answers: [
          {text: "Je maintiens la surveillance — c'est efficace.", score: 0},
          {text: "Je cherche à réduire les opportunités de comportements non éthiques.", score: 1},
          {text: "Je travaille à créer une culture où les comportements éthiques sont internalisés, pas seulement conformes.", score: 2}
          ]
        }
    ],
  },

};

// Patch minimal de makeQuestions pour utiliser CUSTOM_QUESTIONS quand disponible
const _origMakeQuestions = makeQuestions;
function makeQuestions(prefix, domain, chapterIndex, extraTags) {
  if (CUSTOM_QUESTIONS[prefix] && CUSTOM_QUESTIONS[prefix][chapterIndex]) {
    const base  = extraTags || [BADGES.IA, BADGES.VALIDATION];
    const ctags = chaptersTags(domain, chapterIndex);
    return CUSTOM_QUESTIONS[prefix][chapterIndex].map(function(q, i) {
      return {
        id:      prefix + "-q" + (chapterIndex + 1) + "-" + (i + 1),
        type:    "choix",
        text:    q.text,
        answers: q.answers,
        tags:    base.concat([domain]).concat(ctags).concat(["Mise en situation"])
      };
    });
  }
  return _origMakeQuestions(prefix, domain, chapterIndex, extraTags);
}

  const raw = [
    ["cybersecurite", "Cybersécurité", "🔐", [
      ["reflexes-cybersecurite",  "Vos réflexes de cybersécurité au quotidien",     "Tous publics",   "Identifier les situations de cybersécurité sensibles, réagir sans paniquer et protéger les informations utiles.",       { built: buildCyberChapters("reflexes-cybersecurite") }],
      ["fraude-phishing",         "Détecter les tentatives de fraude numérique",    "Tous publics",   "Repérer les sollicitations douteuses, les demandes urgentes et les faux signaux de confiance.",                        { built: buildCyberChapters("fraude-phishing") }],
      ["mots-de-passe-acces",     "Gérer ses accès et ses mots de passe",           "Tous publics",   "Adopter les bons réflexes sur les mots de passe, le partage d'accès et les connexions.",                              { built: buildCyberChapters("mots-de-passe-acces") }],
      ["donnees-confidentielles", "Protéger les données et informations sensibles", "Collaborateurs", "Faire les bons arbitrages face aux documents, transferts, exports et accès aux données.",                             { built: buildCyberChapters("donnees-confidentielles") }]
    ]],
    ["securite-surete", "Sécurité & sûreté au travail", "🦺", [
      ["culture-securite-terrain",   "Sécurité & culture de sûreté au quotidien",          "Équipes terrain", "Identifier les risques, respecter les consignes et signaler les situations sensibles.", templates.securiteSurete],
      ["presquaccidents-signalement","Signaler les incidents et presqu'accidents",          "Tous publics", "Transformer les signaux faibles en actions utiles, sans culpabiliser ni banaliser.", templates.securiteSignalement],
      ["acces-sites-surete",         "Sûreté des sites, accès et comportements inhabituels","Tous publics", "Réagir face aux accès non autorisés, intrusions, objets suspects ou situations atypiques.", templates.securiteAccesSites],
      ["managers-securite",          "Manager la sécurité sans créer de tension",          "Managers", "Faire vivre les règles, traiter les écarts et soutenir les équipes dans les moments à risque.", templates.securiteManagers],
      ["coactivite-sous-traitance",  "Travailler en coactivité et gérer les prestataires",  "Équipes terrain",          "Coordonner les interventions simultanées, intégrer les sous-traitants et gérer les zones partagées.",    templates.securiteCoactivite],
      ["epi-gestes-securite",        "EPI et gestes de sécurité au quotidien",              "Collaborateurs",           "Porter les bons équipements, maintenir ses réflexes sous contrainte et signaler les anomalies matérielles.", templates.securiteEPI],
      ["securite-manager-arbitrage", "Arbitrer entre sécurité et pression opérationnelle",  "Managers / Encadrants",    "Tenir les exigences de sécurité face aux délais, traiter les écarts et détecter les dérives silencieuses.", templates.securiteManagerArbitrage],
      ["securite-nucleaire",         "Culture de sûreté en environnement nucléaire",        "Tous publics — Nucléaire", "Adopter la posture de questionnement, appliquer la rigueur procédurale et déclarer les événements précurseurs.", templates.securiteNucleaire],
      ["securite-chantier-btp",      "Sécurité sur chantier BTP",                          "Équipes terrain — BTP",    "Sécuriser son poste, gérer la coactivité chantier, respecter le PPSPS et réagir aux incidents.",          templates.securiteChantierBTP]
    ]],
    ["qvt-rps", "QVT & RPS", "🌿", [
      ["rps-signaux-faibles",    "Repérer les signaux faibles de RPS",                      "Tous publics",          "Identifier les tensions, alertes et situations d'isolement dans le quotidien professionnel.",                  templates.qvtRps],
      ["charge-priorites",       "Charge de travail et priorisation",                       "Tous publics",          "Prendre du recul sur l'urgence, les arbitrages et les limites soutenables.",                                  templates.qvtRps],
      ["cooperation-climat",     "Coopération et climat de travail",                        "Collaborateurs",        "Agir dans les irritants du quotidien, désamorcer et préserver la qualité relationnelle.",                      templates.qvtRps],
      ["manager-qvt-rps",        "Manager la charge et les tensions d'équipe",              "Managers",              "Identifier, réguler et orienter sans porter seul les situations sensibles.",                                   templates.qvtRps],
      ["teletravail-hybridation","Télétravail et travail hybride",                          "Collaborateurs",        "Organiser sa présence à distance, maintenir le lien collectif et gérer les irritants de l'hybridation.",       templates.qvtTeletravail],
      ["epuisement-prevention",  "Prévenir l'épuisement professionnel",                    "Collaborateurs",        "Reconnaître ses signaux d'alerte, réguler sa charge dans la durée et oser chercher un appui.",                  templates.qvtEpuisement],
      ["retour-apres-absence",   "Reprendre le travail après une absence",                  "Tous publics",          "Préparer son retour, réintégrer son collectif et calibrer la reprise en charge sans surcompenser.",             templates.qvtRetourAbsence],
      ["manager-signaux-rps",    "Détecter et orienter sans psychologiser",                 "Managers / Encadrants", "Repérer les signaux faibles, intervenir sur le travail et orienter vers les bons relais sans se substituer aux spécialistes.", templates.qvtManagerSignaux]
    ]],
    ["management", "Transformation & management", "🔄", [
      ["changement-reflexes",        "Changer sans se crisper",              "Tous publics",   "Comprendre ses réflexes face aux changements de méthode, d'outil ou d'organisation.", templates.management],
      ["feedback-managerial",        "Donner et recevoir du feedback utile", "Managers",       "Installer des échanges réguliers, factuels et mobilisables sans créer de posture défensive.", templates.mgmtFeedback],
      ["manager-engageant-tbf",      "Êtes-vous un manager engageant ?",      "Managers",       "Questionner sa posture d'engagement, de responsabilisation et de soutien au collectif.", templates.mgmtManagerEngageant, BADGES.TBF],
      ["pilotage-projet",            "Contribuer efficacement à un projet",   "Collaborateurs", "Clarifier les rôles, gérer les imprévus et coopérer dans un cadre mouvant.", templates.mgmtProjet],
      ["conduite-changement",        "Accompagner son équipe dans la transformation",       "Managers",              "Comprendre les résistances, relayer les décisions et ancrer les nouvelles pratiques dans la durée.",                templates.mgmtChangement],
      ["responsabilisation-equipe",  "Responsabiliser sans contrôler",                     "Managers",              "Déléguer avec confiance, développer l'autonomie de décision et valoriser l'initiative sans créer de dépendance.",  templates.mgmtResponsabilisation],
      ["collaboration-interequipes", "Coopérer avec les autres équipes",                   "Tous publics",          "Identifier les frictions interéquipes, gérer les dépendances et dépasser les logiques de silos.",                  templates.mgmtCollaboration],
      ["transformation-digitale",    "S'adapter aux nouveaux outils et méthodes",          "Tous publics",          "Trouver sa posture face aux transformations numériques, accompagner les moins à l'aise et questionner les usages.", templates.mgmtDigital],
      ["arbitrage-priorisation",     "Prioriser et arbitrer quand tout est urgent",         "Managers / Encadrants", "Hiérarchiser les demandes, gérer les injonctions contradictoires et tenir ses arbitrages dans la durée.",           templates.mgmtArbitrage]
    ]],
    ["environnement", "RSE — environnement", "🌍", [
      ["sobriete-quotidien",     "Sobriété environnementale au quotidien",           "Tous publics",     "Identifier ses arbitrages concrets sur l'énergie, les déplacements, les achats et les usages.", templates.environnement],
      ["dechets-ressources",     "Réduire les déchets et préserver les ressources", "Tous publics",     "Agir sur les petits gestes sans tomber dans l'affichage ou la culpabilisation.", templates.envDechets],
      ["achats-responsables",    "Achats et choix responsables",                     "Fonctions support", "Interroger les choix fournisseurs, volumes, usages et impacts dans les décisions courantes.", templates.envAchatsResponsables],
      ["manager-transition-eco", "Manager la transition environnementale",           "Managers",          "Faire évoluer les pratiques de l'équipe sans injonction ni greenwashing.", templates.envManagerTransition],
      ["numerique-responsable",  "Réduire son empreinte numérique",                    "Tous publics",     "Questionner ses usages numériques, arbitrer présentiel et distanciel, allonger la durée de vie des équipements.", templates.envNumerique],
      ["deplacements-sobriete",  "Déplacements professionnels et sobriété",            "Tous publics",     "Questionner la nécessité des déplacements, choisir les options les moins impactantes et réduire les trajets inutiles.", templates.envDeplacements],
      ["achats-impact",          "Achats responsables et impact fournisseurs",          "Fonctions support", "Questionner le besoin, évaluer les fournisseurs sur leurs critères RSE et réduire la logistique inutile.",   templates.envAchats],
      ["engagement-rse",         "S’engager dans la transition sans se décourager",    "Collaborateurs",   "Situer son propre niveau d’engagement, agir à son niveau et embarquer ses collègues sans culpabiliser.",      templates.envEngagement],
      ["manager-rse-equipe",     "Animer la RSE dans son équipe",                      "Managers",          "Incarner la transition sans surjouer, créer un engagement collectif et arbitrer entre performance et impact.", templates.envManagerRSE]
    ]],
    ["ethique", "Éthique & compliance", "⚖️", [
      ["conflits-interets",  "Repérer les conflits d'intérêts",       "Tous publics", "Identifier les zones grises, déclarer et demander conseil avant que la situation ne s'installe.", templates.ethique],
      ["cadeaux-invitations","Cadeaux, invitations et avantages",      "Tous publics", "Savoir arbitrer entre relation professionnelle, usage courant et risque de dépendance.",         templates.ethique],
      ["alerte-ethique",     "Alerter face à une situation sensible",  "Tous publics", "Réagir à un doute, documenter les faits et mobiliser le bon canal sans dramatiser.",             templates.ethique],
      ["manager-compliance", "Faire vivre l'éthique dans son équipe", "Managers",     "Traiter les dilemmes, protéger la parole et installer des repères concrets.",                    templates.ethique]
    ]]
  ];

  // ─────────────────────────────────────────────────────────────────────────
  //  POPULATION
  // ─────────────────────────────────────────────────────────────────────────

  window.ITS_CATALOGUE = [];
  window.ITS_THEMES    = [];

  raw.forEach(function (theme) {
    window.ITS_THEMES.push({ key: theme[0], label: theme[1], icon: theme[2] });

    theme[3].forEach(function (ad) {
      const template      = ad[4];
      const specificBadge = ad[5];
      const tags = specificBadge
  ? [specificBadge, BADGES.AIDE, BADGES.REVIEW]
  : [BADGES.IA, BADGES.AIDE, BADGES.REVIEW];

      const chapters = template.built
        ? template.built
        : makeChapters(ad[0], template.domain, template.chapters, tags);

      window.ITS_CATALOGUE.push({
        id:          ad[0],
        themeKey:    theme[0],
        theme:       theme[1],
        icon:        theme[2],
        title:       ad[1],
        audience:    ad[2],
        description: ad[3],
        tags:        tags,
        duration:    "8 à 12 min",
        intro:       "Bienvenue dans cet autodiagnostic consacré à " + ad[1].toLowerCase() + ". Il vous propose des situations concrètes du quotidien professionnel pour vous aider à identifier vos réflexes, vos points d'appui et vos axes de progression. Cet autodiagnostic est entièrement anonyme : aucun login, aucun mot de passe, aucun cookie, aucun suivi d'adresse IP. Les résultats seront analysés de manière agrégée.",
        chapters:    chapters
      });
    });
  });

})();

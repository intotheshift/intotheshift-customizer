# Into The Shift Customizer — V1

Prototype front-end autonome pour personnaliser un autodiagnostic multi-sujets.

## Pages
- `index.html` : choix de la thématique et de la base d’autodiagnostic
- `builder.html` : paramétrage général et ressources client
- `questions.html` : édition des situations, réponses, scores et commentaires
- `scoring.html` : profils et seuils par chapitre
- `campagne.html` : dates et messages de lancement
- `recap.html` : récapitulatif + export Excel/JSON

## Données
La bibliothèque est dans `intotheshift-data.js`.
Elle contient des contenus génériques multi-sujets et ne doit pas être confondue avec la bibliothèque propriétaire Me&YouToo.

## Export
L’export Excel utilise SheetJS via CDN sur la page `recap.html`.


(function(){
  const pages=[
    ['index.html','Accueil'],
    ['builder.html','Paramétrage'],
    ['questions.html','Situations'],
    ['scoring.html','Scoring & profils'],
    ['campagne.html','Campagne'],
    ['recap.html','Récap & export']
  ];
  const current=location.pathname.split('/').pop()||'index.html';
  document.write(`
    <header class="topbar">
      <a class="brand" href="index.html"><span class="brand-mark">↗</span><span>Into The Shift Customizer</span></a>
      <nav class="nav">${pages.map(p=>`<a class="${p[0]===current?'active':''}" href="${p[0]}">${p[1]}</a>`).join('')}</nav>
    </header>
  `);
})();

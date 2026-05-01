
const ITS_KEY = "intotheshift_customizer_state_v1";

function clone(o){ return JSON.parse(JSON.stringify(o)); }
function lib(){ return window.INTOTHESHIFT_LIBRARY; }
function qs(s){ return document.querySelector(s); }
function qsa(s){ return [...document.querySelectorAll(s)]; }
function uid(){ return "id_" + Math.random().toString(36).slice(2,10); }

function defaultState(){
  const firstTheme = lib().themes[0];
  const firstAd = firstTheme.autodiags[0];
  return buildState(firstTheme.id, firstAd.id);
}

function getState(){
  const raw=localStorage.getItem(ITS_KEY);
  if(raw){ try{return JSON.parse(raw)}catch(e){} }
  const s=defaultState(); saveState(s); return s;
}
function saveState(s){ localStorage.setItem(ITS_KEY, JSON.stringify(s)); }
function findTheme(themeId){ return lib().themes.find(t=>t.id===themeId) || lib().themes[0]; }
function findAd(themeId, adId){
  const th=findTheme(themeId);
  return th.autodiags.find(a=>a.id===adId) || th.autodiags[0];
}
function buildState(themeId, adId){
  const theme=findTheme(themeId), ad=findAd(themeId, adId);
  return {
    themeId, adId,
    title: ad.title,
    clientName:"",
    campaignOwner:"",
    launchDate:"",
    closeDate:"",
    relaunchDate:"",
    language:"Français",
    resources:[],
    chapters: ad.chapters.map(c=>({
      id:c.id, title:c.title, goal:c.goal,
      situations:c.situations.filter(x=>x.defaultSelected).map(clone),
      bank:c.situations.filter(x=>!x.defaultSelected).map(clone),
      profiles:clone(c.profiles)
    })),
    campaignMessages:{
      launch:"Bonjour,\n\nNous lançons un autodiagnostic court pour mieux comprendre les réflexes professionnels sur ce sujet. Il ne s’agit pas d’un test de connaissances, mais d’une mise en situation concrète.\n\nMerci de prendre quelques minutes pour y répondre.",
      relaunch:"Bonjour,\n\nL’autodiagnostic est toujours ouvert. Votre participation nous aide à disposer d’une lecture plus juste des pratiques du quotidien.\n\nMerci pour votre contribution.",
      teams:"L’autodiagnostic est ouvert. Il dure quelques minutes et s’appuie sur des situations très concrètes. Le lien de participation sera partagé par votre organisation.",
      intranet:"Participez à notre autodiagnostic : quelques situations professionnelles pour mieux comprendre les pratiques, les repères et les besoins d’accompagnement.",
      lastChance:"Dernière relance : l’autodiagnostic sera bientôt clôturé. Votre réponse compte pour affiner la restitution collective."
    },
    teamNotes:""
  }
}
function setSelection(themeId, adId){
  const s=buildState(themeId, adId); saveState(s); return s;
}
function stepGuard(){
  if(!localStorage.getItem(ITS_KEY)){ saveState(defaultState()); }
}
function progress(step){
  const pct = Math.round((step/5)*100);
  return `<div class="progress" title="${pct}%"><span style="--w:${pct}%"></span></div>`;
}
function escapeHtml(str){
  return String(str??"").replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' }[m]));
}

function initHome(){
  const root=qs("#app"); const s=getState();
  root.innerHTML=`
    <section class="hero">
      <div>
        <span class="pill">V1 commerciale semi-autonome</span>
        <h1>Préparer un autodiagnostic personnalisé sans attendre le grand backoffice.</h1>
        <p>Le client choisit une base, adapte les situations, ajuste les réponses, prépare la campagne, puis transmet un brief exploitable à l’équipe qui finalise la mise en ligne.</p>
        <div class="row" style="margin-top:22px">
          <a class="btn coral" href="builder.html">Commencer</a>
          <a class="btn ghost" href="recap.html">Voir l’export</a>
        </div>
      </div>
      <div class="hero-card">
        <h3>Ce que cette V1 permet</h3>
        <p>Plusieurs autodiagnostics par grande thématique, une banque de situations, des suggestions préparées “façon IA”, des profils par chapitre et un export Excel pour reprise interne.</p>
      </div>
    </section>
    <div class="section-title"><div><h2>Choisir une grande thématique</h2><p>Chaque carte contient plusieurs bases d’autodiagnostic prêtes à personnaliser.</p></div></div>
    <div class="grid grid-3" id="themes"></div>
    <div class="section-title"><div><h2>Bases disponibles</h2><p>Sélectionnez une base de départ. Vous pourrez ensuite modifier, ajouter ou retirer des situations.</p></div></div>
    <div class="grid grid-3" id="ads"></div>
  `;
  renderThemes(s.themeId);
  renderAds(s.themeId, s.adId);
}
function renderThemes(activeId){
  const el=qs("#themes");
  el.innerHTML=lib().themes.map(t=>`
    <article class="card theme-card ${t.id===activeId?'selected':''}" data-theme="${t.id}">
      <span class="badge">${t.autodiags.length} bases</span>
      <h3>${escapeHtml(t.label)}</h3>
      <p>${escapeHtml(t.description)}</p>
    </article>`).join("");
  qsa(".theme-card").forEach(card=>card.onclick=()=>{
    const themeId=card.dataset.theme;
    const adId=findTheme(themeId).autodiags[0].id;
    const s=setSelection(themeId, adId);
    renderThemes(themeId); renderAds(themeId, adId);
  });
}
function renderAds(themeId, activeAd){
  const theme=findTheme(themeId), el=qs("#ads");
  el.innerHTML=theme.autodiags.map(a=>`
    <article class="card ad-card ${a.id===activeAd?'selected':''}">
      <span class="badge">${escapeHtml(theme.label)}</span>
      <h3>${escapeHtml(a.title)}</h3>
      <p>${escapeHtml(a.shortDescription)}</p>
      <button class="btn ${a.id===activeAd?'secondary':'coral'}" data-ad="${a.id}">${a.id===activeAd?'Base sélectionnée':'Choisir cette base'}</button>
    </article>`).join("");
  qsa("[data-ad]").forEach(btn=>btn.onclick=()=>{
    const s=setSelection(themeId, btn.dataset.ad);
    location.href="builder.html";
  });
}

function initBuilder(){
  stepGuard();
  const s=getState(), theme=findTheme(s.themeId);
  qs("#app").innerHTML=`
    ${progress(1)}
    <div class="section-title"><div><h2>Paramétrage général</h2><p>${escapeHtml(theme.label)} · ${escapeHtml(s.title)}</p></div><a class="btn secondary" href="index.html">Changer de base</a></div>
    <div class="grid grid-2">
      <section class="card">
        <h3>Informations client</h3>
        <div class="field"><label>Titre de l’autodiagnostic</label><input id="title" value="${escapeHtml(s.title)}"></div>
        <div class="field"><label>Organisation cliente</label><input id="clientName" value="${escapeHtml(s.clientName)}" placeholder="Ex. ACME France"></div>
        <div class="field"><label>Référent·e campagne</label><input id="campaignOwner" value="${escapeHtml(s.campaignOwner)}" placeholder="Nom / service"></div>
        <div class="field"><label>Langue principale</label><input id="language" value="${escapeHtml(s.language)}"></div>
      </section>
      <section class="card">
        <h3>Ressources du client</h3>
        <p>Ajoutez les liens utiles qui pourront apparaître dans la campagne ou dans la restitution.</p>
        <div id="resources"></div>
        <button class="btn secondary small" id="addResource">+ Ajouter une ressource</button>
      </section>
    </div>
    <section class="card" style="margin-top:18px">
      <h3>Chapitres retenus</h3>
      <div class="grid grid-2">${s.chapters.map((c,i)=>`
        <div class="card" style="box-shadow:none;background:#f8fafc">
          <div class="field"><label>Chapitre ${i+1}</label><input data-chapter-title="${i}" value="${escapeHtml(c.title)}"></div>
          <div class="field"><label>Intention de mesure</label><textarea data-chapter-goal="${i}">${escapeHtml(c.goal)}</textarea></div>
        </div>`).join("")}</div>
    </section>
    <div class="footer-actions"><div class="row"><button class="btn coral" id="saveNext">Enregistrer et passer aux situations</button><a class="btn secondary" href="questions.html">Aller aux situations</a></div></div>
  `;
  renderResources();
  ["title","clientName","campaignOwner","language"].forEach(id=>qs("#"+id).oninput=e=>{const st=getState(); st[id]=e.target.value; saveState(st);});
  qsa("[data-chapter-title]").forEach(inp=>inp.oninput=e=>{const st=getState(); st.chapters[+inp.dataset.chapterTitle].title=e.target.value; saveState(st);});
  qsa("[data-chapter-goal]").forEach(inp=>inp.oninput=e=>{const st=getState(); st.chapters[+inp.dataset.chapterGoal].goal=e.target.value; saveState(st);});
  qs("#addResource").onclick=()=>{const st=getState(); st.resources.push({label:"Nouvelle ressource",url:"https://"}); saveState(st); renderResources();};
  qs("#saveNext").onclick=()=>location.href="questions.html";
}
function renderResources(){
  const s=getState(), el=qs("#resources");
  el.innerHTML=s.resources.map((r,i)=>`
    <div class="card" style="padding:12px;margin:10px 0;box-shadow:none;background:#f8fafc">
      <div class="field"><label>Nom</label><input data-res-label="${i}" value="${escapeHtml(r.label)}"></div>
      <div class="field"><label>Lien</label><input data-res-url="${i}" value="${escapeHtml(r.url)}"></div>
      <button class="btn ghost small" data-del-res="${i}">Supprimer</button>
    </div>`).join("") || `<p>Aucune ressource ajoutée pour le moment.</p>`;
  qsa("[data-res-label]").forEach(inp=>inp.oninput=e=>{const st=getState(); st.resources[+inp.dataset.resLabel].label=e.target.value; saveState(st);});
  qsa("[data-res-url]").forEach(inp=>inp.oninput=e=>{const st=getState(); st.resources[+inp.dataset.resUrl].url=e.target.value; saveState(st);});
  qsa("[data-del-res]").forEach(btn=>btn.onclick=()=>{const st=getState(); st.resources.splice(+btn.dataset.delRes,1); saveState(st); renderResources();});
}

let activeChapter=0;
function initQuestions(){
  stepGuard();
  const s=getState();
  qs("#app").innerHTML=`
    ${progress(2)}
    <div class="section-title"><div><h2>Situations et réponses</h2><p>Modifiez, ajoutez ou retirez. Les propositions “IA” sont une réserve construite à l’avance.</p></div><button class="btn secondary" id="openAi">Suggestions IA préparées</button></div>
    <div class="chapter-tabs">${s.chapters.map((c,i)=>`<button data-tab="${i}" class="${i===0?'active':''}">${escapeHtml(c.title)}</button>`).join("")}</div>
    <section id="questionPanel"></section>
    <aside class="drawer" id="aiDrawer"></aside>
    <div class="footer-actions"><div class="row"><a class="btn secondary" href="builder.html">Retour</a><a class="btn coral" href="scoring.html">Passer au scoring</a></div></div>
  `;
  qsa("[data-tab]").forEach(b=>b.onclick=()=>{activeChapter=+b.dataset.tab;qsa("[data-tab]").forEach(x=>x.classList.toggle("active",x===b));renderQuestionPanel();});
  qs("#openAi").onclick=()=>toggleAi(true);
  renderQuestionPanel();
}
function renderQuestionPanel(){
  const s=getState(), c=s.chapters[activeChapter];
  qs("#questionPanel").innerHTML=`
    <div class="notice">Objectif du chapitre : ${escapeHtml(c.goal)}</div>
    <div class="row" style="margin:16px 0"><button class="btn secondary small" id="addBlank">+ Ajouter une situation vide</button><button class="btn ghost small" id="addFromBank">+ Ajouter depuis la réserve</button></div>
    ${c.situations.map((q,i)=>questionHtml(q,i)).join("")}
  `;
  qs("#addBlank").onclick=()=>{const st=getState(); st.chapters[activeChapter].situations.push({id:uid(),text:"Nouvelle situation à adapter.",answers:[{text:"Réponse possible",score:1},{text:"Réponse possible",score:2},{text:"Réponse possible",score:3}],clientComment:"",resourceLinks:[]}); saveState(st); renderQuestionPanel();};
  qs("#addFromBank").onclick=()=>toggleAi(true);
  bindQuestionEvents();
}
function questionHtml(q,i){
  return `<article class="question">
    <div class="question-head"><strong>Situation ${i+1}</strong><button class="btn ghost small" data-del-q="${i}">Retirer</button></div>
    <div class="field"><label>Texte de la situation</label><textarea data-q-text="${i}">${escapeHtml(q.text)}</textarea></div>
    <div><label>Réponses et scores</label>${q.answers.map((a,j)=>`
      <div class="answer">
        <input data-a-text="${i}-${j}" value="${escapeHtml(a.text)}">
        <input type="number" min="0" max="3" step="1" data-a-score="${i}-${j}" value="${Number(a.score)}">
        <button class="btn ghost small" data-del-a="${i}-${j}">×</button>
      </div>`).join("")}</div>
    <button class="btn secondary small" data-add-a="${i}">+ Ajouter une réponse</button>
    <div class="field"><label>Commentaire client / adaptation souhaitée</label><textarea data-q-comment="${i}" placeholder="Ex. adapter au vocabulaire interne, préciser le métier concerné…">${escapeHtml(q.clientComment||"")}</textarea></div>
  </article>`;
}
function bindQuestionEvents(){
  qsa("[data-q-text]").forEach(el=>el.oninput=()=>{const st=getState(); st.chapters[activeChapter].situations[+el.dataset.qText].text=el.value; saveState(st);});
  qsa("[data-q-comment]").forEach(el=>el.oninput=()=>{const st=getState(); st.chapters[activeChapter].situations[+el.dataset.qComment].clientComment=el.value; saveState(st);});
  qsa("[data-a-text]").forEach(el=>el.oninput=()=>{const [i,j]=el.dataset.aText.split("-").map(Number); const st=getState(); st.chapters[activeChapter].situations[i].answers[j].text=el.value; saveState(st);});
  qsa("[data-a-score]").forEach(el=>el.oninput=()=>{const [i,j]=el.dataset.aScore.split("-").map(Number); const st=getState(); st.chapters[activeChapter].situations[i].answers[j].score=Number(el.value); saveState(st);});
  qsa("[data-del-q]").forEach(b=>b.onclick=()=>{const st=getState(); st.chapters[activeChapter].situations.splice(+b.dataset.delQ,1); saveState(st); renderQuestionPanel();});
  qsa("[data-add-a]").forEach(b=>b.onclick=()=>{const st=getState(); st.chapters[activeChapter].situations[+b.dataset.addA].answers.push({text:"Nouvelle réponse",score:1}); saveState(st); renderQuestionPanel();});
  qsa("[data-del-a]").forEach(b=>b.onclick=()=>{const [i,j]=b.dataset.delA.split("-").map(Number); const st=getState(); st.chapters[activeChapter].situations[i].answers.splice(j,1); saveState(st); renderQuestionPanel();});
}
function toggleAi(open){
  const d=qs("#aiDrawer"); if(!d)return;
  if(open){ renderAiDrawer(); d.classList.add("open"); } else d.classList.remove("open");
}
function renderAiDrawer(){
  const s=getState(), c=s.chapters[activeChapter];
  qs("#aiDrawer").innerHTML=`
    <div class="row" style="justify-content:space-between"><h3>Réserve de situations</h3><button class="btn ghost small" id="closeAi">Fermer</button></div>
    <p>Ces propositions ne sont pas générées en direct : elles sont préparées dans la bibliothèque de départ.</p>
    ${c.bank.map((q,i)=>`
      <article class="card" style="box-shadow:none;margin:10px 0;background:#f8fafc">
        <p>${escapeHtml(q.text)}</p>
        <button class="btn small coral" data-use-bank="${i}">Ajouter</button>
      </article>`).join("") || "<p>La réserve de ce chapitre est vide.</p>"}
  `;
  qs("#closeAi").onclick=()=>toggleAi(false);
  qsa("[data-use-bank]").forEach(b=>b.onclick=()=>{const st=getState(); const q=st.chapters[activeChapter].bank.splice(+b.dataset.useBank,1)[0]; st.chapters[activeChapter].situations.push(q); saveState(st); renderQuestionPanel(); renderAiDrawer();});
}

function initScoring(){
  stepGuard();
  const s=getState();
  qs("#app").innerHTML=`
    ${progress(3)}
    <div class="section-title"><div><h2>Scoring et profils</h2><p>Le score final est une moyenne par chapitre. Les seuils sont modifiables.</p></div></div>
    <div id="profilePanels"></div>
    <div class="footer-actions"><div class="row"><a class="btn secondary" href="questions.html">Retour</a><a class="btn coral" href="campagne.html">Préparer la campagne</a></div></div>
  `;
  renderProfiles();
}
function renderProfiles(){
  const s=getState();
  qs("#profilePanels").innerHTML=s.chapters.map((c,ci)=>`
    <section class="card" style="margin-bottom:18px">
      <h3>${escapeHtml(c.title)}</h3>
      <table class="table">
        <thead><tr><th>Niveau</th><th>Seuil min</th><th>Seuil max</th><th>Titre</th><th>Résumé</th></tr></thead>
        <tbody>${c.profiles.map((p,pi)=>`
          <tr>
            <td>${escapeHtml(p.level)}</td>
            <td><input type="number" step=".01" data-p-min="${ci}-${pi}" value="${p.min}"></td>
            <td><input type="number" step=".01" data-p-max="${ci}-${pi}" value="${p.max}"></td>
            <td><input data-p-title="${ci}-${pi}" value="${escapeHtml(p.title)}"></td>
            <td><textarea data-p-summary="${ci}-${pi}">${escapeHtml(p.summary)}</textarea></td>
          </tr>
          <tr><td colspan="5"><label>Description</label><textarea data-p-desc="${ci}-${pi}">${escapeHtml(p.description)}</textarea></td></tr>`).join("")}</tbody>
      </table>
    </section>`).join("");
  qsa("[data-p-min]").forEach(e=>e.oninput=()=>{const [ci,pi]=e.dataset.pMin.split("-").map(Number); const st=getState(); st.chapters[ci].profiles[pi].min=Number(e.value); saveState(st);});
  qsa("[data-p-max]").forEach(e=>e.oninput=()=>{const [ci,pi]=e.dataset.pMax.split("-").map(Number); const st=getState(); st.chapters[ci].profiles[pi].max=Number(e.value); saveState(st);});
  qsa("[data-p-title]").forEach(e=>e.oninput=()=>{const [ci,pi]=e.dataset.pTitle.split("-").map(Number); const st=getState(); st.chapters[ci].profiles[pi].title=e.value; saveState(st);});
  qsa("[data-p-summary]").forEach(e=>e.oninput=()=>{const [ci,pi]=e.dataset.pSummary.split("-").map(Number); const st=getState(); st.chapters[ci].profiles[pi].summary=e.value; saveState(st);});
  qsa("[data-p-desc]").forEach(e=>e.oninput=()=>{const [ci,pi]=e.dataset.pDesc.split("-").map(Number); const st=getState(); st.chapters[ci].profiles[pi].description=e.value; saveState(st);});
}

function initCampagne(){
  stepGuard();
  const s=getState();
  qs("#app").innerHTML=`
    ${progress(4)}
    <div class="section-title"><div><h2>Préparer la campagne</h2><p>Dates, relances, messages et ressources à transmettre.</p></div></div>
    <div class="grid grid-2">
      <section class="card">
        <h3>Calendrier</h3>
        <div class="field"><label>Date de lancement</label><input type="date" id="launchDate" value="${escapeHtml(s.launchDate)}"></div>
        <div class="field"><label>Date de relance</label><input type="date" id="relaunchDate" value="${escapeHtml(s.relaunchDate)}"></div>
        <div class="field"><label>Date de clôture</label><input type="date" id="closeDate" value="${escapeHtml(s.closeDate)}"></div>
        <button class="btn secondary small" id="autoDates">Calculer relance J+14 et clôture J+21</button>
      </section>
      <section class="card">
        <h3>Notes pour l’équipe</h3>
        <textarea id="teamNotes">${escapeHtml(s.teamNotes)}</textarea>
      </section>
    </div>
    <section class="card" style="margin-top:18px">
      <h3>Messages de campagne</h3>
      ${Object.entries(s.campaignMessages).map(([k,v])=>`<div class="field"><label>${labelMsg(k)}</label><textarea data-msg="${k}">${escapeHtml(v)}</textarea></div>`).join("")}
    </section>
    <div class="footer-actions"><div class="row"><a class="btn secondary" href="scoring.html">Retour</a><a class="btn coral" href="recap.html">Voir le récapitulatif</a></div></div>
  `;
  ["launchDate","relaunchDate","closeDate","teamNotes"].forEach(id=>qs("#"+id).oninput=e=>{const st=getState(); st[id]=e.target.value; saveState(st);});
  qsa("[data-msg]").forEach(e=>e.oninput=()=>{const st=getState(); st.campaignMessages[e.dataset.msg]=e.value; saveState(st);});
  qs("#autoDates").onclick=()=>{const st=getState(); if(!st.launchDate){alert("Choisissez d’abord une date de lancement."); return;} const d=new Date(st.launchDate+"T00:00:00"); const r=new Date(d); r.setDate(r.getDate()+14); const c=new Date(d); c.setDate(c.getDate()+21); st.relaunchDate=r.toISOString().slice(0,10); st.closeDate=c.toISOString().slice(0,10); saveState(st); initCampagne();};
}
function labelMsg(k){return {launch:"Email de lancement",relaunch:"Email de relance",teams:"Message Teams / Slack",intranet:"Post intranet",lastChance:"Message dernière chance"}[k]||k}

function initRecap(){
  stepGuard(); const s=getState(), theme=findTheme(s.themeId);
  const totalQ=s.chapters.reduce((a,c)=>a+c.situations.length,0);
  const totalA=s.chapters.reduce((a,c)=>a+c.situations.reduce((b,q)=>b+q.answers.length,0),0);
  qs("#app").innerHTML=`
    ${progress(5)}
    <div class="section-title"><div><h2>Récapitulatif et export</h2><p>Brief final à transmettre à l’équipe pour paramétrage manuel dans le backoffice actuel.</p></div></div>
    <div class="grid grid-3">
      <div class="card kpi"><strong>${totalQ}</strong><span>situations retenues</span></div>
      <div class="card kpi"><strong>${totalA}</strong><span>réponses scorées</span></div>
      <div class="card kpi"><strong>${s.chapters.length}</strong><span>chapitres</span></div>
    </div>
    <section class="card" style="margin-top:18px">
      <h3>${escapeHtml(s.title)}</h3>
      <p><strong>Thématique :</strong> ${escapeHtml(theme.label)}<br><strong>Client :</strong> ${escapeHtml(s.clientName||"Non renseigné")}<br><strong>Lancement :</strong> ${escapeHtml(s.launchDate||"Non renseigné")} · <strong>Relance :</strong> ${escapeHtml(s.relaunchDate||"Non renseigné")} · <strong>Clôture :</strong> ${escapeHtml(s.closeDate||"Non renseigné")}</p>
      <div class="row"><button class="btn coral" id="exportXlsx">Exporter en Excel</button><button class="btn secondary" id="exportJson">Exporter en JSON</button><button class="btn ghost" id="reset">Réinitialiser</button></div>
    </section>
    <section class="card" style="margin-top:18px"><h3>Détail</h3>${s.chapters.map(c=>`<h4>${escapeHtml(c.title)}</h4><ol>${c.situations.map(q=>`<li>${escapeHtml(q.text)}</li>`).join("")}</ol>`).join("")}</section>
    <div class="footer-actions"><div class="row"><a class="btn secondary" href="campagne.html">Retour</a></div></div>
  `;
  qs("#exportJson").onclick=downloadJson;
  qs("#exportXlsx").onclick=exportXlsx;
  qs("#reset").onclick=()=>{ if(confirm("Réinitialiser le customizer ?")){ localStorage.removeItem(ITS_KEY); location.href="index.html"; } };
}
function downloadJson(){
  const blob=new Blob([JSON.stringify(getState(),null,2)],{type:"application/json"});
  downloadBlob(blob, fileBase()+".json");
}
function fileBase(){
  const s=getState();
  return ("intotheshift-brief-"+(s.clientName||"client")+"-"+s.title).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,90);
}
function downloadBlob(blob,name){
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; a.click(); URL.revokeObjectURL(a.href);
}
function exportXlsx(){
  const s=getState(), theme=findTheme(s.themeId);
  if(!window.XLSX){ alert("La librairie Excel n’est pas chargée. Utilisez l’export JSON ou réessayez en ligne."); return; }
  const rows=[["Thématique","Autodiagnostic","Chapitre","Situation","Réponse A","Score A","Réponse B","Score B","Réponse C","Score C","Réponse D","Score D","Commentaire client"]];
  s.chapters.forEach(c=>c.situations.forEach(q=>{
    const ans=[...q.answers];
    while(ans.length<4) ans.push({text:"",score:""});
    rows.push([theme.label,s.title,c.title,q.text,ans[0].text,ans[0].score,ans[1].text,ans[1].score,ans[2].text,ans[2].score,ans[3].text,ans[3].score,q.clientComment||""]);
  }));
  const profiles=[["Chapitre","Niveau","Seuil min","Seuil max","Titre","Résumé","Description"]];
  s.chapters.forEach(c=>c.profiles.forEach(p=>profiles.push([c.title,p.level,p.min,p.max,p.title,p.summary,p.description])));
  const resources=[["Nom","URL"], ...s.resources.map(r=>[r.label,r.url])];
  const campaign=[["Champ","Contenu"],["Client",s.clientName],["Référent",s.campaignOwner],["Date lancement",s.launchDate],["Date relance",s.relaunchDate],["Date clôture",s.closeDate],["Notes équipe",s.teamNotes],...Object.entries(s.campaignMessages).map(([k,v])=>[labelMsg(k),v])];
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), "Situations");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(profiles), "Profils");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(campaign), "Campagne");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(resources), "Ressources");
  XLSX.writeFile(wb, fileBase()+".xlsx");
}

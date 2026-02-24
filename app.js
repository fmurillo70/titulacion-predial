// app.js (COMPLETO) ✅ Postulante + núcleo familiar dinámico + bandeja offline
(() => {
  const $ = (id) => document.getElementById(id);

  // =========================
  // DIVIPOLI (desde tu Excel: ZONA, SECTOR, TIPO, NOMBRE)
  // =========================
  const DIVIPOLI = [{"zona":"URBANO","sector":"Pueblo Nuevo","tipo":"BARRIO","nombre":"Muelle los pescadores"},{"zona":"URBANO","sector":"Pueblo Nuevo","tipo":"BARRIO","nombre":"Pueblo Nuevo"},{"zona":"URBANO","sector":"Pueblo Nuevo","tipo":"BARRIO","nombre":"Club Amas de Casa"},{"zona":"URBANO","sector":"Pueblo Nuevo","tipo":"BARRIO","nombre":"Estrada"},{"zona":"URBANO","sector":"Pueblo Nuevo","tipo":"BARRIO","nombre":"Esmeralda Londoño"},{"zona":"URBANO","sector":"Pueblo Nuevo","tipo":"BARRIO","nombre":"Cristo Rey"},{"zona":"URBANO","sector":"Pueblo Nuevo","tipo":"BARRIO","nombre":"Siete de Julio"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"Torcoroma"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"El parmar"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"Altos del Tamarindo"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"Altos del Paraíso"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"Parnaso"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"Bosque"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"La Pradera"},{"zona":"URBANO","sector":"Cerros","tipo":"BARRIO","nombre":"Los Cerros"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Centro"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Gaitán"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Progreso"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Portal"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Villa Ángela"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"La Esperanza"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Primero de Mayo"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"La Floresta"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Brisas del Magdalena"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Las Brisas"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Jardín"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Villas del Norte"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Altos del Norte"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Jorge Eliécer Gaitán"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Santa Teresita"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Primavera"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Rosario"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"La Victoria"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Mirador"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Triunfo"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Monterrey"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"La Unión"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Bosque"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"La Playa"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"La Candelaria"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Carmen"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"La Ceiba"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"San Martín"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"San José"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"El Porvenir"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Las Américas"},{"zona":"URBANO","sector":"Cabecera","tipo":"BARRIO","nombre":"Villa del Carmen"},{"zona":"RURAL","sector":"RURAL","tipo":"CORREGIMIENTO","nombre":"Vasconia - Puerto Serviez"},{"zona":"RURAL","sector":"RURAL","tipo":"CORREGIMIENTO","nombre":"puerto pinzon"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"Ermitaño"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"Palagua"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"Calderon"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"velasquez"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"puerto niño"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la pizarra"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"guanero"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"las pavas"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"puerto gutierrez"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"marañal"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"buenos aires"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"carimagua"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"el banquito"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la uribe"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"quimbo"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la cascajera"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"el venado"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la esmeralda"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la india"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"piedras blancas"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"san miguel"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"san josé de oriente"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la ceiba"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la osalina"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"la quiebra"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"matarredonda"},{"zona":"RURAL","sector":"RURAL","tipo":"VEREDA","nombre":"san jose del pino"},{"zona":"RURAL","sector":"RURAL","tipo":"CENTRO POBLADO","nombre":"puerto serviez"},{"zona":"RURAL","sector":"RURAL","tipo":"CENTRO POBLADO","nombre":"puerto gutierrez"},{"zona":"RURAL","sector":"RURAL","tipo":"CENTRO POBLADO","nombre":"puerto pinzon"},{"zona":"RURAL","sector":"RURAL","tipo":"CENTRO POBLADO","nombre":"el pescado"},{"zona":"RURAL","sector":"RURAL","tipo":"CENTRO POBLADO","nombre":"el trique"},{"zona":"RURAL","sector":"RURAL","tipo":"OTRO","nombre":"OTRO"}];

  // ====== Helpers ======
  function uniq(arr){ return Array.from(new Set(arr.filter(Boolean))); }
  function escapeHtml(s){
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function csvSafe(v){
    const s = String(v ?? "");
    return `"${s.replaceAll('"', '""')}"`;
  }
  function norm(s){ return String(s || "").trim().toUpperCase(); }

  function calcEdad(fechaISO){
    if (!fechaISO) return "";
    const dob = new Date(fechaISO + "T00:00:00");
    if (isNaN(dob.getTime())) return "";
    const hoy = new Date();
    let e = hoy.getFullYear() - dob.getFullYear();
    const m = hoy.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < dob.getDate())) e--;
    return (e >= 0 && e <= 120) ? e : "";
  }



  // ====== Paso 3 (Hogar): cálculos automáticos ======
  function autoCalcularHogar(){
    const numPersonasEl = $("numPersonas");
    const numMenoresEl = $("numMenores");
    if (!numPersonasEl || !numMenoresEl) return;

    // Preferimos la grilla (núcleo familiar). Si aún no existe, usamos el número digitado en Paso 2.
    const integrantes = readGridToArray();
    const total = integrantes.length || Number($("post_integrantesHogar")?.value || 0) || 0;

    numPersonasEl.value = total ? String(total) : "";

    let menores = 0;
    for (const r of integrantes){
      const e = Number(r.edad ?? "");
      if (!Number.isNaN(e) && e < 18) menores++;
    }
    // Si no hay edades (aún), dejamos 0 para mantener consistencia en export.
    numMenoresEl.value = String(menores);
  }

  

  // ====== Paso 4 (Checklist): adjuntos condicionales ======
  function _fileToObj(file, fallbackName){
    if (!file) return null;
    return { blob: file, name: file.name || fallbackName || "archivo", type: file.type || "", size: file.size || 0 };
  }

  function setWrapVisible(id, show){
    const el = $(id);
    if (!el) return;
    el.style.display = show ? "block" : "none";
  }

  function updateChecklistDocsUI(){
    const habita = $("chkHabita")?.checked || false;
    const otraVivienda = $("chkOtraVivienda")?.checked || false;
    const servicios = $("chkServicioPublico")?.checked || false;
    const predial = $("chkPredial")?.checked || false;
    const dispuesto = $("chkDispuestoPagar")?.checked || false;

    setWrapVisible("wrapDocHabita", habita);
    setWrapVisible("wrapDocServicios", servicios);

    // Opción A: si NO tiene otra vivienda (checkbox sin marcar) => pedir carta extrajuicio
    setWrapVisible("wrapDocExtrajuicio", !otraVivienda);

    setWrapVisible("wrapDocPazysalvo", predial);

    // Si NO está al día en predial y SÍ está dispuesto a ponerse al día => carta de compromiso
    setWrapVisible("wrapDocCompromiso", (!predial && dispuesto));
  }
// ====== Steps ======
  const form = $("formEncuesta");
  const steps = Array.from(document.querySelectorAll(".step"));
  const progressBar = $("progressBar");
  const totalSteps = 5;

  function showStep(n){
    steps.forEach(s => s.classList.remove("active"));
    const target = steps.find(s => Number(s.dataset.step) === n);
    if (target) target.classList.add("active");
    const pct = Math.round((n / totalSteps) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (n === 5) setTimeout(() => initMapIfPossible(), 80);
    if (n === 3) setTimeout(() => autoCalcularHogar(), 50);
    if (n === 4) setTimeout(() => updateChecklistDocsUI(), 50);
  }

  [["btnNext1",2],["btnBack2",1],["btnNext2",3],["btnBack3",2],["btnNext3",4],["btnBack4",3],["btnNext4",5],["btnBack5",4]]
    .forEach(([id,to]) => $(id)?.addEventListener("click", () => showStep(to)));

  // Paso 4: mostrar/ocultar adjuntos según selección
  ["chkHabita","chkOtraVivienda","chkServicioPublico","chkPredial","chkDispuestoPagar"].forEach(id => {
    $(id)?.addEventListener("change", updateChecklistDocsUI);
  });

  // ===== Mensajes =====
  const msgId = "msgEstadoGuardar";
  function ensureMsgBox(){
    let el = $(msgId);
    if (!el){
      el = document.createElement("div");
      el.id = msgId;
      el.style.marginTop = "10px";
      el.style.padding = "10px";
      el.style.borderRadius = "10px";
      el.style.border = "1px solid #e5e7eb";
      el.style.background = "#fff";
      el.style.display = "none";
      const step5 = document.querySelector('.step[data-step="5"]');
      if (step5) step5.insertBefore(el, step5.querySelector(".nav"));
      else document.body.appendChild(el);
    }
    return el;
  }
  function setMsg(text, type="info"){
    const el = ensureMsgBox();
    el.style.display = "block";
    el.textContent = text;
    el.style.borderColor = (type === "ok") ? "#22c55e" : (type === "bad") ? "#ef4444" : "#e5e7eb";
  }
  function hideMsg(){ const el=$(msgId); if (el) el.style.display="none"; }

  // =========================
  // DIVIPOLI UI: zona -> sector -> barrio/vereda + OTRO
  // =========================
  const zonaSel = $("zona");
  const sectorSel = $("sector");
  const barrioSel = $("barrio");
  const wrapBarrioOtro = $("wrapBarrioOtro");
  const barrioOtro = $("barrioOtro");

  function clearSelect(el, placeholder){
    if (!el) return;
    el.innerHTML = `<option value="">${placeholder}</option>`;
  }
  function setDisabled(el, v){ if (el) el.disabled = !!v; }

  function populateSector(){
    const z = norm(zonaSel?.value);
    if (!sectorSel || !barrioSel) return;

    if (!z){
      clearSelect(sectorSel, "Seleccione zona...");
      clearSelect(barrioSel, "Seleccione zona...");
      setDisabled(sectorSel, true);
      setDisabled(barrioSel, true);
      wrapBarrioOtro && (wrapBarrioOtro.style.display="none");
      barrioOtro && (barrioOtro.value="");
      return;
    }

    if (z === "RURAL"){
      sectorSel.innerHTML = `<option value="RURAL">RURAL</option>`;
      sectorSel.value = "RURAL";
      setDisabled(sectorSel, true);
      populateBarrio();
      return;
    }

    const sectors = uniq(DIVIPOLI.filter(x => x.zona === "URBANO").map(x => x.sector))
      .sort((a,b)=>a.localeCompare(b,"es"));
    sectorSel.innerHTML = `<option value="">Seleccione...</option>` +
      sectors.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
    sectorSel.value = "";
    setDisabled(sectorSel,false);

    clearSelect(barrioSel, "Seleccione sector...");
    setDisabled(barrioSel,true);

    wrapBarrioOtro && (wrapBarrioOtro.style.display="none");
    barrioOtro && (barrioOtro.value="");
  }

  function populateBarrio(){
    const z = norm(zonaSel?.value);
    if (!barrioSel || !sectorSel) return;
    if (!z) return;

    let list = [];

    if (z === "RURAL"){
      list = DIVIPOLI.filter(x=>x.zona==="RURAL").map(x=>({value:x.nombre,tipo:x.tipo}));
      clearSelect(barrioSel, "Seleccione...");
      setDisabled(barrioSel,false);
    } else {
      const sec = String(sectorSel.value || "");
      if (!sec){
        clearSelect(barrioSel, "Seleccione sector...");
        setDisabled(barrioSel,true);
        return;
      }
      list = DIVIPOLI.filter(x=>x.zona==="URBANO" && x.sector===sec).map(x=>({value:x.nombre,tipo:x.tipo}));
      clearSelect(barrioSel, "Seleccione...");
      setDisabled(barrioSel,false);
    }

    list.sort((a,b)=>(a.value||"").localeCompare(b.value||"","es"));

    const opts = list.map(x=>{
      const label = `${x.tipo}: ${x.value}`;
      return `<option value="${escapeHtml(x.value)}" data-tipo="${escapeHtml(x.tipo)}">${escapeHtml(label)}</option>`;
    }).join("");

    barrioSel.innerHTML = `<option value="">Seleccione...</option>` + opts + `<option value="OTRO" data-tipo="OTRO">OTRO (escribir)</option>`;
    barrioSel.value = "";

    wrapBarrioOtro && (wrapBarrioOtro.style.display="none");
    barrioOtro && (barrioOtro.value="");
  }

  zonaSel?.addEventListener("change", populateSector);
  sectorSel?.addEventListener("change", populateBarrio);
  barrioSel?.addEventListener("change", () => {
    const v = barrioSel.value || "";
    if (v === "OTRO") wrapBarrioOtro && (wrapBarrioOtro.style.display="block");
    else {
      wrapBarrioOtro && (wrapBarrioOtro.style.display="none");
      barrioOtro && (barrioOtro.value="");
    }
  });

  // =========================
  // Paso 2: Postulante + Núcleo familiar dinámico
  // =========================
  const tbodyIntegrantes = $("tbodyIntegrantes");

  function integranteRowTemplate(idx, isPostulante){
    const tr = document.createElement("tr");
    tr.dataset.idx = String(idx);

    tr.innerHTML = `
      <td style="padding:8px; border:1px solid #e5e7eb; text-align:center; white-space:nowrap;">${idx+1}</td>

      <td style="padding:6px; border:1px solid #e5e7eb;">
        <select class="fam_tipoDoc" ${isPostulante ? "disabled" : ""} style="min-width:84px;">
          <option value="">...</option>
          <option value="CC">CC</option>
          <option value="TI">TI</option>
          <option value="CE">CE</option>
          <option value="PA">PA</option>
          <option value="OTRO">OTRO</option>
        </select>
      </td>

      <td style="padding:6px; border:1px solid #e5e7eb;">
        <input class="fam_numDoc" type="text" ${isPostulante ? "readonly" : ""} style="min-width:140px;">
      </td>

      <td style="padding:6px; border:1px solid #e5e7eb;">
        <input class="fam_nombre" type="text" ${isPostulante ? "readonly" : ""} placeholder="Nombre completo" style="min-width:220px;">
      </td>

      <td style="padding:6px; border:1px solid #e5e7eb;">
        <input class="fam_fechaNac" type="date" ${isPostulante ? "readonly" : ""} style="min-width:150px;">
      </td>

      <td style="padding:6px; border:1px solid #e5e7eb;">
        <input class="fam_edad" type="number" readonly style="width:90px;">
      </td>

      <td style="padding:6px; border:1px solid #e5e7eb;">
        <select class="fam_parentesco" ${isPostulante ? "disabled" : ""} style="min-width:140px;">
          <option value="">...</option>
          <option value="Postulante">Postulante</option>
          <option value="Cónyuge">Cónyuge</option>
          <option value="Hijo/a">Hijo/a</option>
          <option value="Padre/Madre">Padre/Madre</option>
          <option value="Otro">Otro</option>
        </select>
      </td>

      <td style="padding:6px; border:1px solid #e5e7eb;">
        ${isPostulante
          ? `<span class="sub">Usa el adjunto del postulante</span>`
          : `<input class="fam_doc" type="file" accept="image/*,.pdf,application/pdf">`
        }
      </td>
    `;

    const fechaEl = tr.querySelector(".fam_fechaNac");
    const edadEl = tr.querySelector(".fam_edad");

    function recalc(){
      const e = calcEdad(fechaEl.value);
      edadEl.value = (e === "") ? "" : String(e);
    }
    fechaEl?.addEventListener("change", recalc);
    fechaEl?.addEventListener("input", recalc);

    return tr;
  }

  function readGridToArray(){
    if (!tbodyIntegrantes) return [];
    const rows = Array.from(tbodyIntegrantes.querySelectorAll("tr"));
    return rows.map(tr => {
      const tipoDoc = tr.querySelector(".fam_tipoDoc")?.value || "";
      const numDoc = tr.querySelector(".fam_numDoc")?.value?.trim() || "";
      const nombre = tr.querySelector(".fam_nombre")?.value?.trim() || "";
      const fechaNac = tr.querySelector(".fam_fechaNac")?.value || "";
      const edad = tr.querySelector(".fam_edad")?.value || "";
      const parentesco = tr.querySelector(".fam_parentesco")?.value || "";
      return { tipoDoc, numDoc, nombre, fechaNac, edad, parentesco };
    });
  }

  function rebuildGrid(total){
    if (!tbodyIntegrantes) return;

    const prev = readGridToArray();
    const want = Math.max(0, Number(total) || 0);

    tbodyIntegrantes.innerHTML = "";

    for (let i=0; i<want; i++) {
      const isPost = (i === 0);
      const tr = integranteRowTemplate(i, isPost);
      tbodyIntegrantes.appendChild(tr);

      const old = prev[i] || null;
      if (old) {
        tr.querySelector(".fam_tipoDoc") && (tr.querySelector(".fam_tipoDoc").value = old.tipoDoc || "");
        tr.querySelector(".fam_numDoc") && (tr.querySelector(".fam_numDoc").value = old.numDoc || "");
        tr.querySelector(".fam_nombre") && (tr.querySelector(".fam_nombre").value = old.nombre || "");
        tr.querySelector(".fam_fechaNac") && (tr.querySelector(".fam_fechaNac").value = old.fechaNac || "");
        tr.querySelector(".fam_edad") && (tr.querySelector(".fam_edad").value = old.edad || "");
        tr.querySelector(".fam_parentesco") && (tr.querySelector(".fam_parentesco").value = old.parentesco || "");
      }

      if (isPost) {
        const p = tr.querySelector(".fam_parentesco");
        if (p) p.value = "Postulante";
      }
    }

    syncPostulanteToRow1();
  }

  function syncPostulanteToRow1(){
    if (!tbodyIntegrantes) return;
    const row1 = tbodyIntegrantes.querySelector("tr");
    if (!row1) return;

    const tipo = $("post_tipoDoc")?.value || "";
    const num = $("post_numDoc")?.value?.trim() || "";
    const nom = `${$("post_nombres")?.value?.trim() || ""} ${$("post_apellidos")?.value?.trim() || ""}`.trim();
    const fn = $("post_fechaNac")?.value || "";
    const edad = calcEdad(fn);

    const tipoEl = row1.querySelector(".fam_tipoDoc");
    const numEl = row1.querySelector(".fam_numDoc");
    const nomEl = row1.querySelector(".fam_nombre");
    const fnEl = row1.querySelector(".fam_fechaNac");
    const edadEl = row1.querySelector(".fam_edad");
    const parEl = row1.querySelector(".fam_parentesco");

    if (tipoEl) tipoEl.value = tipo;
    if (numEl) numEl.value = num;
    if (nomEl) nomEl.value = nom;
    if (fnEl) fnEl.value = fn;
    if (edadEl) edadEl.value = (edad === "") ? "" : String(edad);
    if (parEl) parEl.value = "Postulante";

    const postEdadEl = $("post_edad");
    if (postEdadEl) postEdadEl.value = (edad === "") ? "" : String(edad);
  }

  $("post_integrantesHogar")?.addEventListener("input", (e) => {
    rebuildGrid(Number(e.target.value || 0));
  });

  ["post_tipoDoc","post_numDoc","post_nombres","post_apellidos","post_fechaNac"].forEach(id => {
    $(id)?.addEventListener("input", syncPostulanteToRow1);
    $(id)?.addEventListener("change", syncPostulanteToRow1);
  });

  // =========================
  // GPS + FOTOS (4) + MAPA + FIRMAS (Paso 5)
  // =========================
  let gpsActual = null;

  // 4 fotos (opcional). Se guardan como blobs en IndexedDB.
  const fotoBlobs = [null, null, null, null];
  const fotoUrls = ["", "", "", ""];

  const btnGPS = $("btnGPS");
  const gpsInfo = $("gpsInfo");

  const fotoInputs = [$("foto1"), $("foto2"), $("foto3"), $("foto4")];
  const fotoPreviews = [$("fotoPrev1"), $("fotoPrev2"), $("fotoPrev3"), $("fotoPrev4")];

  // Firmas
  const canvasFirmaEncuestado = $("firmaEncuestado");
  const canvasFirmaEncuestador = $("firmaEncuestador");
  const btnClearFirmaEncuestado = $("btnClearFirmaEncuestado");
  const btnClearFirmaEncuestador = $("btnClearFirmaEncuestador");

  let map = null;
  let marker = null;
  let mapReady = false;

  function initMapIfPossible(){
    const mapEl = $("map");
    if (!mapEl || mapReady) return;
    if (typeof window.L === "undefined") return;

    map = L.map("map").setView([4.711, -74.0721], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    mapReady = true;
    if (gpsActual) setPoint(gpsActual.lat, gpsActual.lng);
  }
  function setPoint(lat,lng){
    if (!mapReady) initMapIfPossible();
    if (!mapReady) return;
    map.setView([lat,lng], 18);
    if (!marker) marker = L.marker([lat,lng]).addTo(map);
    else marker.setLatLng([lat,lng]);
  }

  btnGPS?.addEventListener("click", () => {
    hideMsg();
    if (!navigator.geolocation){
      gpsInfo && (gpsInfo.textContent = "GPS: navegador no soporta geolocalización");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        gpsActual = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy, ts: Date.now() };
        gpsInfo && (gpsInfo.textContent = `GPS: ${gpsActual.lat.toFixed(6)}, ${gpsActual.lng.toFixed(6)}  ±${Math.round(gpsActual.accuracy)}m`);
        setPoint(gpsActual.lat, gpsActual.lng);
        setMsg("✅ GPS capturado.", "ok");
      },
      (err) => {
        gpsInfo && (gpsInfo.textContent = `GPS: error (${err.message})`);
        setMsg(`❌ GPS: ${err.message}`, "bad");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });

  function setFoto(idx, file){
    if (idx < 0 || idx > 3) return;
    // limpiar anterior
    if (fotoUrls[idx]) URL.revokeObjectURL(fotoUrls[idx]);
    fotoUrls[idx] = "";
    fotoBlobs[idx] = null;

    const prev = fotoPreviews[idx];
    if (prev){
      prev.src = "";
      prev.style.display = "none";
    }

    if (!file) return;

    fotoBlobs[idx] = file;
    fotoUrls[idx] = URL.createObjectURL(file);
    if (prev){
      prev.src = fotoUrls[idx];
      prev.style.display = "block";
    }
  }

  fotoInputs.forEach((inp, idx) => {
    inp?.addEventListener("change", (e) => {
      hideMsg();
      const file = e.target.files?.[0];
      setFoto(idx, file || null);
      if (file) setMsg(`✅ Foto ${idx+1} cargada.`, "ok");
    });
  });

  // -------- Firmas (sin librerías) --------
  function setupSignaturePad(canvas, clearBtn){
    if (!canvas) return { isEmpty: () => true, clear: () => {}, toBlob: async () => null };

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let drawing = false;
    let hasInk = false;

    function getPos(evt){
      const rect = canvas.getBoundingClientRect();
      const clientX = (evt.touches && evt.touches[0]) ? evt.touches[0].clientX : evt.clientX;
      const clientY = (evt.touches && evt.touches[0]) ? evt.touches[0].clientY : evt.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function start(evt){
      evt.preventDefault();
      drawing = true;
      const p = getPos(evt);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    function move(evt){
      if (!drawing) return;
      evt.preventDefault();
      const p = getPos(evt);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      hasInk = true;
    }
    function end(evt){
      if (!drawing) return;
      evt.preventDefault();
      drawing = false;
      ctx.closePath();
    }

    // Mouse / Pointer
    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener("pointerleave", end);

    // Touch fallback (algunos dispositivos)
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end, { passive: false });

    function clear(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasInk = false;
    }

    clearBtn?.addEventListener("click", clear);

    async function toBlob(){
      return await new Promise((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/png");
      });
    }

    return { isEmpty: () => !hasInk, clear, toBlob };
  }

  const padEncuestado = setupSignaturePad(canvasFirmaEncuestado, btnClearFirmaEncuestado);
  const padEncuestador = setupSignaturePad(canvasFirmaEncuestador, btnClearFirmaEncuestador);


  // =========================
  // Guardar
  // =========================
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMsg();

    try {
      const fechaDiligenciamiento = $("fechaDiligenciamiento")?.value || "";
      const numeroEncuesta = $("numeroEncuesta")?.value?.trim() || "";
      const zona = norm($("zona")?.value || "");
      const direccion = $("direccion")?.value?.trim() || "";
      const sector = $("sector")?.value || "";

      if (!fechaDiligenciamiento) { showStep(1); setMsg("❌ Falta Fecha de diligenciamiento.", "bad"); return; }
      if (!numeroEncuesta) { showStep(1); setMsg("❌ Falta Número de encuesta.", "bad"); return; }
      if (!zona) { showStep(1); setMsg("❌ Falta Zona.", "bad"); return; }
      if (!direccion) { showStep(1); setMsg("❌ Falta Dirección del predio.", "bad"); return; }

      let barrio = $("barrio")?.value || "";
      let tipoLugar = $("barrio")?.selectedOptions?.[0]?.dataset?.tipo || "";

      if (barrio === "OTRO"){
        const escrito = $("barrioOtro")?.value?.trim() || "";
        if (!escrito) { showStep(1); setMsg("❌ Seleccionó OTRO: debe escribir barrio/vereda.", "bad"); return; }
        barrio = escrito;
        tipoLugar = "OTRO";
      }

      // Paso 2 - Postulante
      const post_tipoDoc = $("post_tipoDoc")?.value || "";
      const post_numDoc = $("post_numDoc")?.value?.trim() || "";
      const post_nombres = $("post_nombres")?.value?.trim() || "";
      const post_apellidos = $("post_apellidos")?.value?.trim() || "";
      const post_estadoCivil = $("post_estadoCivil")?.value || "";
      const post_fechaNac = $("post_fechaNac")?.value || "";
      const post_edad = calcEdad(post_fechaNac);
      const post_telefono = $("post_telefono")?.value?.trim() || "";
      const post_cabezaHogar = $("post_cabezaHogar")?.value || "";
      const post_integrantesHogar = Number($("post_integrantesHogar")?.value || 0);

      if (!post_tipoDoc) { showStep(2); setMsg("❌ Falta Tipo de documento.", "bad"); return; }
      if (!post_numDoc) { showStep(2); setMsg("❌ Falta Número de documento.", "bad"); return; }
      if (!post_nombres) { showStep(2); setMsg("❌ Falta Nombres.", "bad"); return; }
      if (!post_apellidos) { showStep(2); setMsg("❌ Falta Apellidos.", "bad"); return; }
      if (!post_estadoCivil) { showStep(2); setMsg("❌ Falta Estado civil.", "bad"); return; }
      if (!post_fechaNac) { showStep(2); setMsg("❌ Falta Fecha de nacimiento.", "bad"); return; }
      if (post_edad === "") { showStep(2); setMsg("❌ Fecha de nacimiento inválida.", "bad"); return; }
      if (!post_telefono) { showStep(2); setMsg("❌ Falta Teléfono de contacto.", "bad"); return; }
      if (!post_cabezaHogar) { showStep(2); setMsg("❌ Falta indicar si es cabeza de hogar.", "bad"); return; }
      if (!post_integrantesHogar || post_integrantesHogar < 1) { showStep(2); setMsg("❌ Falta número de integrantes del hogar.", "bad"); return; }

      if (tbodyIntegrantes && tbodyIntegrantes.children.length !== post_integrantesHogar) rebuildGrid(post_integrantesHogar);
      syncPostulanteToRow1();

      const integrantes = readGridToArray();
      if (integrantes.length !== post_integrantesHogar) {
        showStep(2); setMsg("❌ La grilla no coincide con integrantes.", "bad"); return;
      }

      for (let i=0; i<integrantes.length; i++) {
        const r = integrantes[i];

        if (i === 0) {
          // Fila 1 = postulante (obligatorio)
          if (!r.tipoDoc || !r.numDoc || !r.nombre || !r.fechaNac || !r.parentesco) {
            showStep(2); setMsg(`❌ Falta información del postulante en la grilla.`, "bad"); return;
          }
          const e2 = calcEdad(r.fechaNac);
          if (e2 === "") { showStep(2); setMsg(`❌ Fecha de nacimiento inválida del postulante en la grilla.`, "bad"); return; }
          r.edad = String(e2);
          continue;
        }

        // Filas 2..N: "libre" (no obligatorias). Si dejan la fila en blanco, no pasa nada.
        const todoVacio = !r.tipoDoc && !r.numDoc && !r.nombre && !r.fechaNac && !r.parentesco;
        if (todoVacio) {
          r.edad = "";
          continue;
        }

        // Si empiezan a diligenciar, pedimos lo básico
        if (!r.nombre || !r.parentesco) {
          showStep(2);
          setMsg(`❌ En el integrante #${i+1}: si diligencia la fila, debe indicar al menos Nombre completo y Parentesco.`, "bad");
          return;
        }

        if (r.fechaNac) {
          const e2 = calcEdad(r.fechaNac);
          if (e2 === "") { showStep(2); setMsg(`❌ Fecha de nacimiento inválida en integrante #${i+1}.`, "bad"); return; }
          r.edad = String(e2);
        } else {
          r.edad = "";
        }
      }

      // Adjuntos documentos
      const postDocFile = $("post_docAdjunto")?.files?.[0] || null;
      const postDoc = postDocFile ? { blob: postDocFile, name: postDocFile.name || "doc_postulante", type: postDocFile.type || "", size: postDocFile.size || 0 } : null;

      const integranteDocs = [];
      if (tbodyIntegrantes) {
        const rows = Array.from(tbodyIntegrantes.querySelectorAll("tr"));
        rows.forEach((tr, idx) => {
          if (idx === 0) return;
          const f = tr.querySelector(".fam_doc")?.files?.[0] || null;
          integranteDocs[idx] = f ? { blob: f, name: f.name || `doc_integrante_${idx+1}`, type: f.type || "", size: f.size || 0 } : null;
        });
      }



      // Paso 4 - Adjuntos del checklist (PDF o foto)
      const fileHabita = $("docHabita")?.files?.[0] || null;
      const fileServicios = $("docServicios")?.files?.[0] || null;
      const fileExtrajuicio = $("docExtrajuicio")?.files?.[0] || null;
      const filePazysalvo = $("docPazysalvo")?.files?.[0] || null;
      const fileCompromiso = $("docCompromiso")?.files?.[0] || null;

      const chkHabita = $("chkHabita")?.checked ? "Si" : "No";
      const chkOtraVivienda = $("chkOtraVivienda")?.checked ? "Si" : "No";
      const chkServicioPublico = $("chkServicioPublico")?.checked ? "Si" : "No";
      const chkPredial = $("chkPredial")?.checked ? "Si" : "No";
      const chkDispuestoPagar = $("chkDispuestoPagar")?.checked ? "Si" : "No";

      // Validaciones condicionales ("debe pedir")
      if (chkHabita === "Si" && !fileHabita) { showStep(4); setMsg("❌ Marcó 'Habita actualmente el predio': debe adjuntar carta de compraventa / resolución / certificación JAC.", "bad"); return; }
      if (chkServicioPublico === "Si" && !fileServicios) { showStep(4); setMsg("❌ Marcó 'Tiene recibos/servicios como prueba': debe adjuntar un recibo de servicio público.", "bad"); return; }
      // Opción A: si NO tiene otra vivienda (checkbox sin marcar) => carta extrajuicio
      if (chkOtraVivienda === "No" && !fileExtrajuicio) { showStep(4); setMsg("❌ Si NO tiene otra vivienda, debe adjuntar carta extrajuicio.", "bad"); return; }
      if (chkPredial === "Si" && !filePazysalvo) { showStep(4); setMsg("❌ Marcó 'Está al día en predial': debe adjuntar paz y salvo.", "bad"); return; }
      if (chkPredial === "No" && chkDispuestoPagar === "Si" && !fileCompromiso) { showStep(4); setMsg("❌ Si NO está al día en predial y está dispuesto a ponerse al día, debe adjuntar carta de compromiso.", "bad"); return; }

      const checklistDocs = {
        habita: _fileToObj(fileHabita, "habita_predio"),
        servicios: _fileToObj(fileServicios, "recibo_servicio_publico"),
        extrajuicio: _fileToObj(fileExtrajuicio, "carta_extrajuicio"),
        pazysalvo: _fileToObj(filePazysalvo, "paz_y_salvo_predial"),
        compromiso: _fileToObj(fileCompromiso, "carta_compromiso"),
      };

      // Firmas (obligatorias)
      if (padEncuestado.isEmpty()) { showStep(5); setMsg("❌ Falta la firma del encuestado.", "bad"); return; }
      if (padEncuestador.isEmpty()) { showStep(5); setMsg("❌ Falta la firma del encuestador.", "bad"); return; }

      const firmaEncBlob = await padEncuestado.toBlob();
      const firmaEncrBlob = await padEncuestador.toBlob();
      if (!firmaEncBlob) { showStep(5); setMsg("❌ No se pudo generar la imagen de la firma del encuestado.", "bad"); return; }
      if (!firmaEncrBlob) { showStep(5); setMsg("❌ No se pudo generar la imagen de la firma del encuestador.", "bad"); return; }

      const firmasObj = {
        encuestado: { blob: firmaEncBlob, name: "firma_encuestado.png", type: "image/png", size: firmaEncBlob.size || 0 },
        encuestador: { blob: firmaEncrBlob, name: "firma_encuestador.png", type: "image/png", size: firmaEncrBlob.size || 0 }
      };

      const data = {
        fechaDiligenciamiento,
        numeroEncuesta,
        zona,
        sector,
        tipoLugar,
        barrio,

        depto: $("depto")?.value || "",
        municipio: $("municipio")?.value || "",
        direccion,
        cedulaCatastral: $("cedulaCatastral")?.value || "",
        fmi: $("fmi")?.value || "",
        otroIdentificador: $("otroIdentificador")?.value?.trim() || "",
        usoInmueble: $("usoInmueble")?.value || "",

        post_tipoDoc,
        post_numDoc,
        post_nombres,
        post_apellidos,
        post_estadoCivil,
        post_fechaNac,
        post_edad,
        post_telefono,
        post_cabezaHogar,
        post_integrantesHogar,

        integrantes,

        // Paso 3
        numPersonas: $("numPersonas")?.value || "",
        numMenores: $("numMenores")?.value || "",
        ingresos: $("ingresos")?.value || "",
        subsidioVivienda: $("subsidioVivienda")?.value || "",
        otrosPredios: $("otrosPredios")?.value || "",

        // Paso 4
        chkHabita: chkHabita,
        chkOtraVivienda: chkOtraVivienda,
        chkServicioPublico: chkServicioPublico,
        chkPredial: chkPredial,
        chkDispuestoPagar: chkDispuestoPagar,
        
        obsChecklist: $("obsChecklist")?.value || "",

        // Paso 5
        observaciones: $("observaciones")?.value || "",
      };

      const item = {
        id: `enc_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        createdAt: Date.now(),
        status: "PENDIENTE_SYNC",
        data,
        gps: gpsActual,
        fotos: fotoBlobs.filter(Boolean).map((b, i) => ({ blob: b, name: b.name || `foto_${i+1}.jpg`, type: b.type || "image/jpeg", size: b.size || 0 })),
        // Compatibilidad: mantenemos "foto" como la primera foto si existe
        foto: fotoBlobs.find(Boolean) ? { blob: fotoBlobs.find(Boolean), name: (fotoBlobs.find(Boolean).name || "foto_1.jpg"), type: (fotoBlobs.find(Boolean).type || "image/jpeg"), size: (fotoBlobs.find(Boolean).size || 0) } : null,
        docs: {
          postulante: postDoc,
          integrantes: integranteDocs,
          checklist: checklistDocs
        }
      };

      await window.DB.add(item);

      form.reset();
      populateSector();
      if (tbodyIntegrantes) tbodyIntegrantes.innerHTML = "";

      gpsActual = null;
      gpsInfo && (gpsInfo.textContent = "GPS: sin capturar");

      for (let i=0; i<4; i++) {
        setFoto(i, null);
        if (fotoInputs[i]) fotoInputs[i].value = "";
      }

      // limpiar firmas
      padEncuestado.clear();
      padEncuestador.clear();
setMsg("✅ Encuesta guardada offline correctamente.", "ok");
      showStep(1);
      await renderLista();
    } catch (err) {
      console.error(err);
      setMsg("❌ No guardó. Error: " + (err?.message || err), "bad");
    }
  });

  // ====== Bandeja ======
  const btnRefrescar = $("btnRefrescar");
  const btnBorrarTodo = $("btnBorrarTodo");
  const btnExportar = $("btnExportar");
  const lista = $("lista");

  const modalFoto = $("modalFoto");
  const btnCerrarFoto = $("btnCerrarFoto");
  const imgModalFoto = $("imgModalFoto");

  const modalMapa = $("modalMapa");
  const btnCerrarMapa = $("btnCerrarMapa");

  let mapModal = null;
  let markerModal = null;

  btnCerrarFoto?.addEventListener("click", closeFoto);
  modalFoto?.addEventListener("click", (e) => { if (e.target === modalFoto) closeFoto(); });

  btnCerrarMapa?.addEventListener("click", closeMapa);
  modalMapa?.addEventListener("click", (e) => { if (e.target === modalMapa) closeMapa(); });

  function closeFoto(){
    if (!modalFoto) return;
    modalFoto.style.display = "none";
    imgModalFoto && (imgModalFoto.src = "");
  }
  function closeMapa(){
    if (!modalMapa) return;
    modalMapa.style.display = "none";
  }

  btnRefrescar?.addEventListener("click", renderLista);

  btnBorrarTodo?.addEventListener("click", async () => {
    const ok = confirm("¿Borrar todo lo guardado local? (solo pruebas)");
    if (!ok) return;
    await window.DB.clear();
    await renderLista();
    setMsg("🗑️ Se borró todo lo local.", "ok");
  });

  btnExportar?.addEventListener("click", async () => {
    const all = await window.DB.all();
    exportCSV(all);
  });

  async function renderLista(){
    if (!lista) return;
    const all = await window.DB.all();

    if (!all.length){
      lista.innerHTML = `<div class="sub">Sin registros.</div>`;
      return;
    }

    lista.innerHTML = all.map((x) => {
      const d = x.data || {};
      const nombre = `${(d.post_nombres||"").trim()} ${(d.post_apellidos||"").trim()}`.trim() || "(sin postulante)";
      const doc = d.post_numDoc ? ` • ${escapeHtml(d.post_tipoDoc||"")} ${escapeHtml(d.post_numDoc)}` : "";
      const direccion = d.direccion?.trim() || "";
      const fecha = new Date(x.createdAt).toLocaleString();
      const tieneGPS = !!x.gps;
      const nFotos = (x.fotos?.length || (x.foto ? 1 : 0));
      const tieneFoto = nFotos > 0;
      const tieneDocPost = !!x.docs?.postulante;
      const nInt = Number(d.post_integrantesHogar || d.integrantes?.length || 0);

      const chips = `
        <span style="padding:4px 10px;border-radius:999px;border:1px solid #e5e7eb;background:#f8fafc;font-size:12px;">
          ${escapeHtml(x.status || "")}
        </span>
        ${tieneGPS ? `<span style="padding:4px 10px;border-radius:999px;border:1px solid #bbf7d0;background:#f0fdf4;font-size:12px;">📍 GPS</span>` : ``}
        ${tieneFoto ? `<span style="padding:4px 10px;border-radius:999px;border:1px solid #bfdbfe;background:#eff6ff;font-size:12px;">📷 Foto${nFotos>1 ? " "+nFotos : ""}</span>` : ``}
        ${tieneDocPost ? `<span style="padding:4px 10px;border-radius:999px;border:1px solid #fde68a;background:#fffbeb;font-size:12px;">🪪 Doc</span>` : ``}
        ${nInt ? `<span style="padding:4px 10px;border-radius:999px;border:1px solid #ddd6fe;background:#faf5ff;font-size:12px;">👨‍👩‍👧‍👦 ${nInt}</span>` : ``}
      `;

      const acciones = `
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">
          ${tieneFoto ? `<button class="btn ghost" type="button" data-act="verFoto" data-id="${x.id}">Ver foto</button>` : `<button class="btn ghost" type="button" disabled>Ver foto</button>`}
          ${tieneGPS ? `<button class="btn ghost" type="button" data-act="verMapa" data-id="${x.id}">Ver mapa</button>` : `<button class="btn ghost" type="button" disabled>Ver mapa</button>`}
          <button class="btn" type="button" data-act="detalle" data-id="${x.id}">Detalle</button>
        </div>
      `;

      return `
        <div style="border:1px solid #e5e7eb;border-radius:16px;padding:14px;margin-top:12px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.04);">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;">
            <div>
              <div style="font-weight:700;font-size:16px;">${escapeHtml(nombre)}${doc}</div>
              <div class="sub" style="margin-top:2px;">${escapeHtml(fecha)}</div>
              ${direccion ? `<div class="sub" style="margin-top:6px;">📌 ${escapeHtml(direccion)}</div>` : ``}
              <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">${chips}</div>
            </div>
            <div>${acciones}</div>
          </div>
        </div>
      `;
    }).join("");

    lista.onclick = async (e) => {
      const btn = e.target.closest("button[data-act]");
      if (!btn) return;
      const act = btn.getAttribute("data-act");
      const id = btn.getAttribute("data-id");
      const all2 = await window.DB.all();
      const item = all2.find((r) => r.id === id);
      if (!item) return;

      if (act === "verFoto") return openFoto(item);
      if (act === "verMapa") return openMapa(item);
      if (act === "detalle") return openDetalle(item);
    };
  }

  function openDetalle(item){
    const d = item.data || {};
    const gps = item.gps ? `${item.gps.lat}, ${item.gps.lng} (±${Math.round(item.gps.accuracy)}m)` : "No";
    const integrantes = d.integrantes || [];
    const nInt = Number(d.post_integrantesHogar || integrantes.length || 0);
    const listaNombres = integrantes.map((r,i)=>`${i+1}) ${r.nombre || ""} - ${r.parentesco || ""}`).join("\n");

    alert(
      `DETALLE\n\n` +
      `Postulante: ${d.post_nombres || ""} ${d.post_apellidos || ""}\n` +
      `Documento: ${d.post_tipoDoc || ""} ${d.post_numDoc || ""}\n` +
      `Estado civil: ${d.post_estadoCivil || ""}\n` +
      `Fecha nac.: ${d.post_fechaNac || ""}\n` +
      `Edad: ${d.post_edad ?? ""}\n` +
      `Teléfono: ${d.post_telefono || ""}\n` +
      `Cabeza de hogar: ${d.post_cabezaHogar || ""}\n` +
      `Integrantes hogar: ${d.post_integrantesHogar || ""}\n` +
      `Adjunto postulante: ${item.docs?.postulante ? "Sí" : "No"}\n\n` +
      `Núcleo familiar (${nInt}):\n` +
      (listaNombres ? listaNombres + "\n\n" : "(sin detalle)\n\n") +
      `Predio:\n` +
      `Zona: ${d.zona || ""}\n` +
      `Sector: ${d.sector || ""}\n` +
      `Barrio/Vereda: ${d.barrio || ""}\n` +
      `Dirección: ${d.direccion || ""}\n\n` +
      `GPS: ${gps}\n` +
      `Foto(s): ${(item.fotos?.length || (item.foto?1:0)) ? "Sí" : "No"}\n\n` +
      `Observaciones: ${d.observaciones || ""}`
    );
  }

  function openFoto(item){
    if (!modalFoto || !imgModalFoto) return;
    const blob = (item.fotos?.[0]?.blob) || item.foto?.blob;
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    imgModalFoto.src = url;
    modalFoto.style.display = "block";

    const prevClose = btnCerrarFoto?.onclick;
    btnCerrarFoto.onclick = () => {
      URL.revokeObjectURL(url);
      btnCerrarFoto.onclick = prevClose || null;
      closeFoto();
    };
  }

  function openMapa(item){
    if (!modalMapa) return;
    if (!item.gps) return;

    modalMapa.style.display = "block";

    setTimeout(() => {
      if (typeof window.L === "undefined") return;

      if (!mapModal){
        mapModal = L.map("mapModal").setView([item.gps.lat, item.gps.lng], 18);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap",
        }).addTo(mapModal);
        markerModal = L.marker([item.gps.lat, item.gps.lng]).addTo(mapModal);
      } else {
        mapModal.setView([item.gps.lat, item.gps.lng], 18);
        markerModal && markerModal.setLatLng([item.gps.lat, item.gps.lng]);
      }
      mapModal.invalidateSize();
    }, 120);
  }

  function exportCSV(rows){
    const SEP = ";";
    const headers = [
      "fecha_registro_app","status",
      "fecha_diligenciamiento","numero_encuesta",
      "zona","sector","tipo_lugar","barrio_vereda",
      "depto","municipio","direccion","cedula_catastral","fmi","otro_identificador","uso_inmueble",
      "post_tipo_doc","post_num_doc","post_nombres","post_apellidos",
      "post_estado_civil","post_fecha_nac","post_edad",
      "post_telefono","post_cabeza_hogar","post_integrantes_hogar",
      "tiene_doc_postulante",
      "integrantes_total",
      "integrantes_nombres",
      "integrantes_parentescos",
      "integrantes_tienen_doc",
      "num_personas","num_menores","ingresos","subsidio_vivienda","otros_predios",
      "chk_habita","chk_otra_vivienda","chk_servicio_publico","chk_predial","chk_dispuesto_pagar","obs_checklist",
      "observaciones",
      "gps_lat","gps_lng","gps_accuracy",
      "tiene_foto"
    ];

    const lines = [headers.map(csvSafe).join(SEP)];

    for (const r of rows){
      const d = r.data || {};
      const ints = d.integrantes || [];
      const nombres = ints.map(x=>x.nombre||"").join(" | ");
      const parentescos = ints.map(x=>x.parentesco||"").join(" | ");
      const docsArr = r.docs?.integrantes || [];
      const docsFlags = ints.map((_,i)=> (i===0 ? (r.docs?.postulante ? "SI" : "NO") : (docsArr[i] ? "SI" : "NO")) ).join(" | ");

      const vals = [
        new Date(r.createdAt).toLocaleString(), r.status || "",
        d.fechaDiligenciamiento || "", d.numeroEncuesta || "",
        d.zona || "", d.sector || "", d.tipoLugar || "", d.barrio || "",
        d.depto || "", d.municipio || "", d.direccion || "", d.cedulaCatastral || "", d.fmi || "", d.otroIdentificador || "", d.usoInmueble || "",
        d.post_tipoDoc || "", d.post_numDoc || "", d.post_nombres || "", d.post_apellidos || "",
        d.post_estadoCivil || "", d.post_fechaNac || "", d.post_edad ?? "",
        d.post_telefono || "", d.post_cabezaHogar || "", d.post_integrantesHogar || "",
        r.docs?.postulante ? "SI" : "NO",
        ints.length,
        nombres,
        parentescos,
        docsFlags,
        d.numPersonas || "", d.numMenores || "", d.ingresos || "", d.subsidioVivienda || "", d.otrosPredios || "",
        d.chkHabita || "", d.chkOtraVivienda || "", d.chkServicioPublico || "", d.chkPredial || "", d.chkDispuestoPagar || "", d.obsChecklist || "",
        d.observaciones || "",
        r.gps?.lat ?? "", r.gps?.lng ?? "", r.gps?.accuracy ?? "",
        (r.fotos?.length || r.foto) ? "SI" : "NO"
      ];
      lines.push(vals.map(csvSafe).join(SEP));
    }

    const csv = "\uFEFF" + lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `caracterizacion_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Init
  showStep(1);
  renderLista();
  populateSector();
  updateChecklistDocsUI();
})();

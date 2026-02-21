// app.js (COMPLETO - Bandeja PRO)
(() => {
  const $ = (id) => document.getElementById(id);

  // ====== Steps ======
  const form = $("formEncuesta");
  const steps = Array.from(document.querySelectorAll(".step"));
  const progressBar = $("progressBar");

  const totalSteps = 5;

  function showStep(n) {
    steps.forEach((s) => s.classList.remove("active"));
    const target = steps.find((s) => Number(s.dataset.step) === n);
    if (target) target.classList.add("active");

    const pct = Math.round((n / totalSteps) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;

    if (n === 5) setTimeout(() => initMapIfPossible(), 80);
  }

  // Navegación
  const navWires = [
    ["btnNext1", 2],
    ["btnBack2", 1],
    ["btnNext2", 3],
    ["btnBack3", 2],
    ["btnNext3", 4],
    ["btnBack4", 3],
    ["btnNext4", 5],
    ["btnBack5", 4],
  ];
  navWires.forEach(([id, to]) => {
    const btn = $(id);
    if (btn) btn.addEventListener("click", () => showStep(to));
  });

  // ===== Mensajes =====
  const msgId = "msgEstadoGuardar";
  function ensureMsgBox() {
    let el = $(msgId);
    if (!el) {
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
  function setMsg(text, type = "info") {
    const el = ensureMsgBox();
    el.style.display = "block";
    el.textContent = text;
    if (type === "ok") el.style.borderColor = "#22c55e";
    else if (type === "bad") el.style.borderColor = "#ef4444";
    else el.style.borderColor = "#e5e7eb";
  }
  function hideMsg() {
    const el = $(msgId);
    if (el) el.style.display = "none";
  }

  // ====== GPS + FOTO + MAPA (Paso 5) ======
  let gpsActual = null;
  let fotoBlob = null;
  let fotoUrl = "";

  const btnGPS = $("btnGPS");
  const gpsInfo = $("gpsInfo");
  const fotoInput = $("foto");
  const fotoPreview = $("fotoPreview");

  let map = null;
  let marker = null;
  let mapReady = false;

  function initMapIfPossible() {
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

  function setPoint(lat, lng) {
    if (!mapReady) initMapIfPossible();
    if (!mapReady) return;
    map.setView([lat, lng], 18);
    if (!marker) marker = L.marker([lat, lng]).addTo(map);
    else marker.setLatLng([lat, lng]);
  }

  btnGPS?.addEventListener("click", () => {
    hideMsg();
    if (!navigator.geolocation) {
      if (gpsInfo) gpsInfo.textContent = "GPS: navegador no soporta geolocalización";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        gpsActual = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          ts: Date.now(),
        };
        if (gpsInfo) {
          gpsInfo.textContent =
            `GPS: ${gpsActual.lat.toFixed(6)}, ${gpsActual.lng.toFixed(6)}  ±${Math.round(gpsActual.accuracy)}m`;
        }
        setPoint(gpsActual.lat, gpsActual.lng);
        setMsg("✅ GPS capturado.", "ok");
      },
      (err) => {
        if (gpsInfo) gpsInfo.textContent = `GPS: error (${err.message})`;
        setMsg(`❌ GPS: ${err.message}`, "bad");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });

  fotoInput?.addEventListener("change", (e) => {
    hideMsg();
    const file = e.target.files?.[0];
    if (!file) return;

    fotoBlob = file;
    if (fotoUrl) URL.revokeObjectURL(fotoUrl);
    fotoUrl = URL.createObjectURL(file);

    if (fotoPreview) {
      fotoPreview.src = fotoUrl;
      fotoPreview.style.display = "block";
    }
    setMsg("✅ Foto cargada.", "ok");
  });

  // ====== Guardar ======
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMsg();

    try {
      const direccion = $("direccion")?.value?.trim() || "";
      if (!direccion) {
        showStep(1);
        setMsg("❌ Falta la Dirección del predio (obligatoria).", "bad");
        return;
      }

      const data = {
        depto: $("depto")?.value || "",
        municipio: $("municipio")?.value || "",
        barrio: $("barrio")?.value || "",
        direccion,
        cedulaCatastral: $("cedulaCatastral")?.value || "",
        fmi: $("fmi")?.value || "",
        usoInmueble: $("usoInmueble")?.value || "",

        nombreOcupante: $("nombreOcupante")?.value || "",
        telefonoOcupante: $("telefonoOcupante")?.value || "",
        anioOcupacion: $("anioOcupacion")?.value || "",
        tipoOcupacion: $("tipoOcupacion")?.value || "",
        descripcionOcupacion: $("descripcionOcupacion")?.value || "",

        numPersonas: $("numPersonas")?.value || "",
        numMenores: $("numMenores")?.value || "",
        ingresos: $("ingresos")?.value || "",
        subsidioVivienda: $("subsidioVivienda")?.value || "",
        otrosPredios: $("otrosPredios")?.value || "",

        chkHabita: $("chkHabita")?.checked ? "Si" : "No",
        chkOtraVivienda: $("chkOtraVivienda")?.checked ? "Si" : "No",
        chkServicioPublico: $("chkServicioPublico")?.checked ? "Si" : "No",
        chkPredial: $("chkPredial")?.checked ? "Si" : "No",
        chkDispuestoPagar: $("chkDispuestoPagar")?.checked ? "Si" : "No",
        obsChecklist: $("obsChecklist")?.value || "",

        observaciones: $("observaciones")?.value || "",
      };

      const item = {
        id: `enc_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        createdAt: Date.now(),
        status: "PENDIENTE_SYNC",
        data,
        gps: gpsActual,
        foto: fotoBlob
          ? { blob: fotoBlob, name: fotoBlob.name || "foto.jpg", type: fotoBlob.type || "image/jpeg", size: fotoBlob.size || 0 }
          : null,
      };

      await window.DB.add(item);

      form.reset();

      gpsActual = null;
      if (gpsInfo) gpsInfo.textContent = "GPS: sin capturar";

      fotoBlob = null;
      if (fotoUrl) URL.revokeObjectURL(fotoUrl);
      fotoUrl = "";
      if (fotoPreview) {
        fotoPreview.src = "";
        fotoPreview.style.display = "none";
      }
      if (fotoInput) fotoInput.value = "";

      setMsg("✅ Encuesta guardada offline correctamente.", "ok");
      showStep(1);
      await renderLista();
    } catch (err) {
      console.error(err);
      setMsg("❌ No guardó. Error: " + (err?.message || err), "bad");
    }
  });

  // ====== Bandeja PRO ======
  const btnRefrescar = $("btnRefrescar");
  const btnBorrarTodo = $("btnBorrarTodo");
  const btnExportar = $("btnExportar");
  const lista = $("lista");

  // Modales
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

  function closeFoto() {
    if (!modalFoto) return;
    modalFoto.style.display = "none";
    if (imgModalFoto) imgModalFoto.src = "";
  }

  function closeMapa() {
    if (!modalMapa) return;
    modalMapa.style.display = "none";
    // Leaflet necesita invalidateSize al abrir, lo hacemos al abrir
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

  async function renderLista() {
    if (!lista) return;
    const all = await window.DB.all();

    if (!all.length) {
      lista.innerHTML = `<div class="sub">Sin registros.</div>`;
      return;
    }

    lista.innerHTML = all.map((x) => {
      const nombre = x.data?.nombreOcupante?.trim() || "(sin ocupante)";
      const direccion = x.data?.direccion?.trim() || "";
      const fecha = new Date(x.createdAt).toLocaleString();
      const tieneGPS = !!x.gps;
      const tieneFoto = !!x.foto;

      const chips = `
        <span style="padding:4px 10px;border-radius:999px;border:1px solid #e5e7eb;background:#f8fafc;font-size:12px;">
          ${escapeHtml(x.status || "")}
        </span>
        ${tieneGPS ? `<span style="padding:4px 10px;border-radius:999px;border:1px solid #bbf7d0;background:#f0fdf4;font-size:12px;">📍 GPS</span>` : ``}
        ${tieneFoto ? `<span style="padding:4px 10px;border-radius:999px;border:1px solid #bfdbfe;background:#eff6ff;font-size:12px;">📷 Foto</span>` : ``}
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
              <div style="font-weight:700;font-size:16px;">${escapeHtml(nombre)}</div>
              <div class="sub" style="margin-top:2px;">${escapeHtml(fecha)}</div>
              ${direccion ? `<div class="sub" style="margin-top:6px;">📌 ${escapeHtml(direccion)}</div>` : ``}
              <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">${chips}</div>
            </div>
            <div>${acciones}</div>
          </div>
        </div>
      `;
    }).join("");

    // Delegación de eventos (1 solo listener)
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

  function openDetalle(item) {
    const d = item.data || {};
    const gps = item.gps ? `${item.gps.lat}, ${item.gps.lng} (±${Math.round(item.gps.accuracy)}m)` : "No";
    alert(
      `DETALLE\n\n` +
      `Ocupante: ${d.nombreOcupante || ""}\n` +
      `Dirección: ${d.direccion || ""}\n` +
      `Uso: ${d.usoInmueble || ""}\n` +
      `GPS: ${gps}\n` +
      `Foto: ${item.foto ? "Sí" : "No"}\n\n` +
      `Observaciones: ${d.observaciones || ""}`
    );
  }

  function openFoto(item) {
    if (!modalFoto || !imgModalFoto) return;
    const blob = item.foto?.blob;
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    imgModalFoto.src = url;
    modalFoto.style.display = "block";

    // cuando cierre, liberamos url
    const prevClose = btnCerrarFoto?.onclick;
    btnCerrarFoto.onclick = () => {
      URL.revokeObjectURL(url);
      btnCerrarFoto.onclick = prevClose || null;
      closeFoto();
    };
  }

  function openMapa(item) {
    if (!modalMapa) return;
    if (!item.gps) return;

    modalMapa.style.display = "block";

    setTimeout(() => {
      if (typeof window.L === "undefined") return;

      if (!mapModal) {
        mapModal = L.map("mapModal").setView([item.gps.lat, item.gps.lng], 18);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap",
        }).addTo(mapModal);
        markerModal = L.marker([item.gps.lat, item.gps.lng]).addTo(mapModal);
      } else {
        mapModal.setView([item.gps.lat, item.gps.lng], 18);
        if (markerModal) markerModal.setLatLng([item.gps.lat, item.gps.lng]);
      }

      mapModal.invalidateSize();
    }, 120);
  }

  // Export con ; para Excel
  function exportCSV(rows) {
    const SEP = ";";
    const headers = [
      "fecha","status",
      "depto","municipio","barrio","direccion","cedulaCatastral","fmi","usoInmueble",
      "nombreOcupante","telefonoOcupante","anioOcupacion","tipoOcupacion","descripcionOcupacion",
      "numPersonas","numMenores","ingresos","subsidioVivienda","otrosPredios",
      "chkHabita","chkOtraVivienda","chkServicioPublico","chkPredial","chkDispuestoPagar",
      "obsChecklist","observaciones",
      "gps_lat","gps_lng","gps_accuracy",
      "tiene_foto"
    ];

    const lines = [headers.map(csvSafe).join(SEP)];

    for (const r of rows) {
      const d = r.data || {};
      const vals = [
        new Date(r.createdAt).toLocaleString(),
        r.status || "",
        d.depto||"", d.municipio||"", d.barrio||"", d.direccion||"", d.cedulaCatastral||"", d.fmi||"", d.usoInmueble||"",
        d.nombreOcupante||"", d.telefonoOcupante||"", d.anioOcupacion||"", d.tipoOcupacion||"", (d.descripcionOcupacion||""),
        d.numPersonas||"", d.numMenores||"", d.ingresos||"", d.subsidioVivienda||"", d.otrosPredios||"",
        d.chkHabita||"", d.chkOtraVivienda||"", d.chkServicioPublico||"", d.chkPredial||"", d.chkDispuestoPagar||"",
        (d.obsChecklist||""), (d.observaciones||""),
        r.gps?.lat ?? "", r.gps?.lng ?? "", r.gps?.accuracy ?? "",
        r.foto ? "SI" : "NO"
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

  function csvSafe(v) {
    const s = String(v ?? "");
    return `"${s.replaceAll('"', '""')}"`;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Init
  showStep(1);
  renderLista();
})();
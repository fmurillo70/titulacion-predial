// app.js - lógica de captura + mapa + export CSV
let latActual = null;
let lonActual = null;

let map = null;
let marker = null;

const $ = (id) => document.getElementById(id);

function initMapIfNeeded(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }
}

function mostrarMapa(lat, lon) {
  if (lat == null || lon == null) return;

  initMapIfNeeded(lat, lon);
  map.setView([lat, lon], 16);

  if (marker) marker.remove();
  marker = L.marker([lat, lon]).addTo(map);
}

function setGPSLabel() {
  if (latActual == null || lonActual == null) {
    $("gps").innerText = "GPS: (sin capturar)";
    return;
  }
  $("gps").innerText = `GPS: ${latActual.toFixed(6)} , ${lonActual.toFixed(6)}`;
}

function capturarGPS() {
  if (!navigator.geolocation) {
    alert("Este dispositivo/navegador no soporta GPS.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      latActual = pos.coords.latitude;
      lonActual = pos.coords.longitude;
      setGPSLabel();
      mostrarMapa(latActual, lonActual);
    },
    (err) => {
      alert("No pude obtener GPS. Activa ubicación/GPS y permisos.\n" + err.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result || "");
    reader.onerror = () => reject(new Error("No se pudo leer la foto"));
    reader.readAsDataURL(file);
  });
}

async function guardar() {
  const nombre = $("nombre").value.trim();
  const predio = $("predio").value.trim();
  const file = $("foto").files[0] || null;

  if (!nombre || !predio) {
    alert("Falta Nombre o Predio.");
    return;
  }

  // GPS recomendado, pero no obligatorio (por si no hay señal en rural)
  const lat = latActual;
  const lon = lonActual;

  let fotoBase64 = "";
  if (file) {
    fotoBase64 = await toBase64(file);
  }

  const registro = {
    nombre,
    predio,
    lat: lat ?? "",
    lon: lon ?? "",
    foto: fotoBase64,
    fecha: new Date().toISOString(),
  };

  await dbAdd(registro);

  // limpiar formulario (pero NO borro GPS por si van en la misma zona)
  $("nombre").value = "";
  $("predio").value = "";
  $("foto").value = "";

  alert("Guardado OFFLINE (IndexedDB).");
  await cargarLista();
}

function escapeCSV(value) {
  // CSV seguro para Excel
  const s = String(value ?? "");
  if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

async function exportarExcelCSV() {
  const datos = await dbAll();

  if (!datos.length) {
    alert("No hay registros para exportar.");
    return;
  }

  const headers = ["id", "nombre", "predio", "lat", "lon", "fecha"];
  let csv = headers.join(",") + "\n";

  for (const d of datos) {
    const row = [
      d.id,
      escapeCSV(d.nombre),
      escapeCSV(d.predio),
      escapeCSV(d.lat),
      escapeCSV(d.lon),
      escapeCSV(d.fecha),
    ];
    csv += row.join(",") + "\n";
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "encuestas.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function renderItem(d) {
  const div = document.createElement("div");
  div.className = "item";

  const fecha = d.fecha ? new Date(d.fecha).toLocaleString() : "";

  div.innerHTML = `
    <div class="title">
      <div>
        <b>${d.nombre}</b>
        <div><small>Predio: ${d.predio}</small></div>
        <div><small>${fecha}</small></div>
      </div>
      <div><small>#${d.id}</small></div>
    </div>

    <div class="btns">
      <button type="button" data-action="map">Ver mapa</button>
      <button type="button" data-action="foto">Ver foto</button>
      <button type="button" data-action="detalle">Detalle</button>
    </div>

    <div class="extra" style="display:none;"></div>
  `;

  const extra = div.querySelector(".extra");

  div.querySelector('[data-action="map"]').onclick = () => {
    const lat = d.lat === "" ? null : Number(d.lat);
    const lon = d.lon === "" ? null : Number(d.lon);

    if (lat == null || lon == null || Number.isNaN(lat) || Number.isNaN(lon)) {
      alert("Este registro no tiene GPS.");
      return;
    }
    mostrarMapa(lat, lon);
    extra.style.display = "none";
    extra.innerHTML = "";
  };

  div.querySelector('[data-action="foto"]').onclick = () => {
    if (!d.foto) {
      alert("Este registro no tiene foto.");
      return;
    }
    extra.style.display = "block";
    extra.innerHTML = `<img class="photo" src="${d.foto}" alt="Foto del predio"/>`;
  };

  div.querySelector('[data-action="detalle"]').onclick = () => {
    extra.style.display = "block";
    extra.innerHTML = `
      <div class="muted" style="margin-top:10px;">
        <div><b>Nombre:</b> ${d.nombre}</div>
        <div><b>Predio:</b> ${d.predio}</div>
        <div><b>Lat:</b> ${d.lat}</div>
        <div><b>Lon:</b> ${d.lon}</div>
        <div><b>Fecha:</b> ${fecha}</div>
      </div>
    `;
  };

  return div;
}

async function cargarLista() {
  const lista = $("lista");
  lista.innerHTML = "";

  const datos = await dbAll();
  if (!datos.length) {
    lista.innerHTML = `<p class="muted">Sin registros aún.</p>`;
    return;
  }

  // más nuevos arriba
  datos.sort((a, b) => (b.id || 0) - (a.id || 0));

  for (const d of datos) {
    lista.appendChild(renderItem(d));
  }
}

// Eventos UI
$("btnGPS").addEventListener("click", capturarGPS);
$("btnExport").addEventListener("click", exportarExcelCSV);

$("btnLimpiar").addEventListener("click", async () => {
  const ok = confirm("¿Seguro que quieres BORRAR TODO el almacenamiento offline?");
  if (!ok) return;
  await dbClear();
  await cargarLista();
  alert("Listo. Base offline vacía.");
});

$("formEncuesta").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await guardar();
  } catch (err) {
    alert("Error guardando: " + (err?.message || err));
  }
});

// Cuando DB está lista, cargamos bandeja
window.__onDBReady = () => {
  setGPSLabel();
  cargarLista();
};
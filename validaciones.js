// validaciones.js
(function () {

  function vacio(v) {
    return v === null || v === undefined || String(v).trim() === "" || v === "Seleccione...";
  }
  function getVal(id) { return document.getElementById(id)?.value ?? ""; }
  function getFile(id) { return document.getElementById(id)?.files?.[0] || null; }

  // ===== PASO 1 =====
  function validarPaso1() {
    const faltantes = [];

    const fecha = getVal("fechaDiligenciamiento");
    const numero = getVal("numeroEncuesta");
    const zona = getVal("zona");
    const depto = getVal("depto");
    const municipio = getVal("municipio");
    const sector = getVal("sector");
    const barrio = getVal("barrio");
    const direccion = getVal("direccion");
    const cedula = getVal("cedulaCatastral");
    const uso = getVal("usoInmueble");

    if (vacio(fecha)) faltantes.push("Falta Fecha de diligenciamiento");
    if (vacio(numero)) faltantes.push("Falta Número de encuesta");
    if (vacio(zona)) faltantes.push("Falta Zona");
    if (vacio(depto)) faltantes.push("Falta Departamento");
    if (vacio(municipio)) faltantes.push("Falta Municipio");
    if (vacio(sector)) faltantes.push("Falta Sector");
    if (vacio(barrio)) faltantes.push("Falta Barrio / Vereda / Centro poblado");
    if (vacio(direccion)) faltantes.push("Falta Dirección del predio");
    if (vacio(cedula)) faltantes.push("Falta Cédula catastral");
    if (vacio(uso)) faltantes.push("Falta Uso del inmueble");

    // FMI y Otro identificador NO obligatorios
    return { ok: faltantes.length === 0, faltantes };
  }

  // ===== PASO 2 =====
  function validarFilaIntegrante(tr) {
    const tipoDoc = tr.querySelector(".fam_tipoDoc")?.value || "";
    const numDoc = tr.querySelector(".fam_numDoc")?.value || "";
    const nombre = tr.querySelector(".fam_nombre")?.value || "";
    const fechaNac = tr.querySelector(".fam_fechaNac")?.value || "";
    const parentesco = tr.querySelector(".fam_parentesco")?.value || "";

    const falt = [];
    if (vacio(tipoDoc)) falt.push("Tipo Doc");
    if (vacio(numDoc)) falt.push("Número");
    if (vacio(nombre)) falt.push("Nombres y apellidos");
    if (vacio(fechaNac)) falt.push("Fecha Nac.");
    if (vacio(parentesco)) falt.push("Parentesco");
    // adjunto NO obligatorio
    return falt;
  }

  function validarPaso2() {
    const faltantes = [];

    const post_tipoDoc = getVal("post_tipoDoc");
    const post_numDoc = getVal("post_numDoc");
    const post_nombres = getVal("post_nombres");
    const post_apellidos = getVal("post_apellidos");
    const post_estadoCivil = getVal("post_estadoCivil");
    const post_fechaNac = getVal("post_fechaNac");
    const post_cabezaHogar = getVal("post_cabezaHogar");
    const post_integrantesHogar = getVal("post_integrantesHogar");

    if (vacio(post_tipoDoc)) faltantes.push("Falta Tipo de documento");
    if (vacio(post_numDoc)) faltantes.push("Falta Número de documento");
    if (vacio(post_nombres)) faltantes.push("Falta Nombres");
    if (vacio(post_apellidos)) faltantes.push("Falta Apellidos");
    if (vacio(post_estadoCivil)) faltantes.push("Falta Estado civil");
    if (vacio(post_fechaNac)) faltantes.push("Falta Fecha de nacimiento");
    if (vacio(post_cabezaHogar)) faltantes.push("Falta ¿Es cabeza de hogar?");
    if (vacio(post_integrantesHogar)) faltantes.push("Falta Número de integrantes del hogar");

    // Documento postulante obligatorio
    const docPost = getFile("post_docAdjunto");
    if (!docPost) faltantes.push("Falta adjuntar documento del postulante (foto o PDF)");

    const n = Number(post_integrantesHogar || 0);
    if (!n || n < 1) {
      faltantes.push("Número de integrantes del hogar debe ser 1 o más");
      return { ok: faltantes.length === 0, faltantes };
    }

    const tbody = document.getElementById("tbodyIntegrantes");
    if (!tbody) {
      faltantes.push("No se encontró la grilla de Núcleo familiar");
      return { ok: faltantes.length === 0, faltantes };
    }

    const rows = Array.from(tbody.querySelectorAll("tr"));
    if (rows.length !== n) {
      faltantes.push(`La grilla de Núcleo familiar no coincide con integrantes (${rows.length}/${n}).`);
      return { ok: faltantes.length === 0, faltantes };
    }

    // fila 1 obligatoria completa
    const falt1 = validarFilaIntegrante(rows[0]);
    if (falt1.length) faltantes.push("En Núcleo familiar (fila #1 - postulante) falta: " + falt1.join(", "));

    // filas 2..N obligatorias completas (sin adjunto)
    for (let i = 1; i < rows.length; i++) {
      const faltFi = validarFilaIntegrante(rows[i]);
      if (faltFi.length) faltantes.push(`En Núcleo familiar (fila #${i + 1}) falta: ${faltFi.join(", ")}`);
    }

    return { ok: faltantes.length === 0, faltantes };
  }

  // ===== PASO 3 =====
  function validarPaso3() {
    const faltantes = [];

    const numPersonas = getVal("numPersonas");
    const numMenores = getVal("numMenores");
    const ingresos = getVal("ingresos");
    const subsidioVivienda = getVal("subsidioVivienda");
    const otrosPredios = getVal("otrosPredios");

    if (vacio(numPersonas)) faltantes.push("Falta Número de personas en el hogar");
    if (vacio(numMenores)) faltantes.push("Falta Número de menores");

    if (vacio(ingresos)) {
      faltantes.push("Falta Ingresos del hogar (total)");
    } else {
      const ingNum = Number(String(ingresos).replace(/\./g, "").replace(/,/g, "."));
      if (Number.isNaN(ingNum)) faltantes.push("Ingresos del hogar debe ser un número");
      else if (ingNum < 0) faltantes.push("Ingresos del hogar debe ser mínimo 0");
    }

    if (vacio(subsidioVivienda)) faltantes.push("Falta ¿Recibió subsidio de vivienda? (Sí/No)");
    if (vacio(otrosPredios)) faltantes.push("Falta ¿Tiene otros predios / vivienda? (Sí/No)");

    return { ok: faltantes.length === 0, faltantes };
  }

  // ===== PASO 5 =====
  // GPS NO obligatorio
  // Fotos 1-4 SÍ obligatorias
  // Firmas (2 canvas) SÍ obligatorias

  function canvasVacio(canvasId) {
    const c = document.getElementById(canvasId);
    if (!c) return true;
    const ctx = c.getContext("2d");
    if (!ctx) return true;

    const w = c.width || 0;
    const h = c.height || 0;
    if (!w || !h) return true;

    const data = ctx.getImageData(0, 0, w, h).data;
    // si algún pixel tiene alpha > 0 => hubo trazo
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] !== 0) return false;
    }
    return true;
  }

  function validarPaso5() {
    const faltantes = [];

    // IDs esperados en tu index: foto1..foto4
    if (!getFile("foto1")) faltantes.push("Falta Foto 1");
    if (!getFile("foto2")) faltantes.push("Falta Foto 2");
    if (!getFile("foto3")) faltantes.push("Falta Foto 3");
    if (!getFile("foto4")) faltantes.push("Falta Foto 4");

    // IDs esperados de canvas: firmaEncuestado / firmaEncuestador
    if (canvasVacio("firmaEncuestado")) faltantes.push("Falta Firma del encuestado");
    if (canvasVacio("firmaEncuestador")) faltantes.push("Falta Firma del encuestador");

    return { ok: faltantes.length === 0, faltantes };
  }

  // ===== PUBLIC =====
  function validarPasoDOM(paso) {
    if (paso === 1) return validarPaso1();
    if (paso === 2) return validarPaso2();
    if (paso === 3) return validarPaso3();
    if (paso === 5) return validarPaso5();
    // Paso 4 no bloquea (según tu regla: adjuntos no obligatorios y checks se asumen NO si no marcados)
    return { ok: true, faltantes: [] };
  }

  window.ValidacionesPredial = { validarPasoDOM };

})();
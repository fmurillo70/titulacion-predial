// db.js - IndexedDB simple
let db = null;

const DB_NAME = "encuestasDB";
const STORE = "encuestas";
const VERSION = 1;

const req = indexedDB.open(DB_NAME, VERSION);

req.onupgradeneeded = (e) => {
  db = e.target.result;
  if (!db.objectStoreNames.contains(STORE)) {
    db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
  }
};

req.onsuccess = (e) => {
  db = e.target.result;
  // si app.js ya cargó, cargará la lista al arrancar
  if (typeof window.__onDBReady === "function") window.__onDBReady();
};

req.onerror = () => {
  alert("Error abriendo IndexedDB (almacenamiento offline).");
};

function dbAdd(data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add(data);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

function dbAll() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const r = tx.objectStore(STORE).getAll();
    r.onsuccess = () => resolve(r.result || []);
    r.onerror = () => reject(r.error);
  });
}

function dbClear() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const r = tx.objectStore(STORE).clear();
    r.onsuccess = () => resolve(true);
    r.onerror = () => reject(r.error);
  });
}
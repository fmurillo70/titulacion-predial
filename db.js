// db.js (COMPLETO) - crea window.DB con add/all/clear para IndexedDB
(() => {
  const DB_NAME = "caracterizacion_predial_db";
  const STORE = "encuestas";
  const VERSION = 1;

  let db = null;

  const req = indexedDB.open(DB_NAME, VERSION);

  req.onupgradeneeded = (e) => {
    const d = e.target.result;
    if (!d.objectStoreNames.contains(STORE)) {
      d.createObjectStore(STORE, { keyPath: "id" });
    }
  };

  req.onsuccess = (e) => {
    db = e.target.result;

    window.DB = {
      add(item) {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(STORE, "readwrite");
          tx.objectStore(STORE).put(item);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => reject(tx.error);
        });
      },

      all() {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(STORE, "readonly");
          const r = tx.objectStore(STORE).getAll();
          r.onsuccess = () => resolve(r.result || []);
          r.onerror = () => reject(r.error);
        });
      },

      clear() {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(STORE, "readwrite");
          const r = tx.objectStore(STORE).clear();
          r.onsuccess = () => resolve(true);
          r.onerror = () => reject(r.error);
        });
      }
    };
  };

  req.onerror = () => {
    console.error("Error abriendo IndexedDB:", req.error);
    alert("No se pudo abrir el almacenamiento offline (IndexedDB).");
  };
})();
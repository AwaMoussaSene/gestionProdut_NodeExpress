import express from "express";
import path from "path";
import fs from "fs/promises";

const app = express();
app.use(express.json());
const DB_PATH = path.join(process.cwd(), "db.json");

async function readDB() {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function nextId(list) {
  const max = list.reduce((m, x) => (x.id > m ? x.id : m), 0);
  return max + 1;
}

function ok(res, data) {
  return res.status(200).json({ success: true, data });
}
function created(res, data, location) {
  return res
    .status(201)
    .set("Location", location)
    .json({ success: true, data });
}
function noContent(res) {
  return res.status(204).send();
}
function error(res, status, code, message, details) {
  return res.status(status).json({
    success: false,
    error: { code, message, details },
  });
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}
function isInt(v) {
  return Number.isInteger(v);
}

app.post("/categories", async (req, res) => {
  const { libelle } = req.body;

  if (!isNonEmptyString(libelle) || libelle.trim().length < 2) {
    return error(res, 422, "VALIDATION_ERROR", "libelle invalide");
  }

  const db = await readDB();
  db.categories = db.categories ?? [];

  // 🔴 Vérifier unicité
  const exist = db.categories.find(
    (c) => c.libelle.toLowerCase() === libelle.trim().toLowerCase(),
  );

  if (exist) {
    return error(res, 409, "DUPLICATE", "Categorie existe déjà");
  }

  const newCat = {
    id: nextId(db.categories),
    libelle: libelle.trim(),
  };

  db.categories.push(newCat);
  await writeDB(db);

  return created(res, newCat, `/categories/${newCat.id}`);
});

app.get("/categories", async (req, res) => {
  const db = await readDB();
  db.categories = db.categories ?? [];


  const search = (req.query.search ?? "").toString().toLowerCase();


  const data = search
    ? db.categories.filter((c) => c.libelle.toLowerCase().includes(search))
    : db.categories;


  return ok(res, data);
});


app.get("/categories/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return error(res, 400, "BAD_REQUEST", "id invalide");


  const db = await readDB();
  db.categories = db.categories ?? [];


  const cat = db.categories.find((c) => c.id === id);
  if (!cat) return error(res, 404, "NOT_FOUND", "Categorie introuvable");


  return ok(res, cat);
});

app.delete("/categories/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return error(res, 400, "BAD_REQUEST", "id invalide");


  const db = await readDB();
  db.categories = db.categories ?? [];


  const before = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== id);


  if (db.categories.length === before) {
    return error(res, 404, "NOT_FOUND", "Categorie introuvable");
  }


  await writeDB(db);
  return noContent(res);
});


app.post("/fournisseurs", async (req, res) => {
  const { prenom, nom, email, adresse, telephone } = req.body;

  if (!telephone) {
    return error(res, 422, "VALIDATION_ERROR", "telephone obligatoire");
  }

  const db = await readDB();
  db.fournisseurs = db.fournisseurs ?? [];

  // 🔴 unicité téléphone
  const exist = db.fournisseurs.find(f => f.telephone === telephone);

  if (exist) {
    return error(res, 409, "DUPLICATE", "telephone deja utilisé");
  }

  const newFournisseur = {
    id: nextId(db.fournisseurs),
    prenom,
    nom,
    email,
    adresse,
    telephone
  };

  db.fournisseurs.push(newFournisseur);
  await writeDB(db);

  return created(res, newFournisseur, `/fournisseurs/${newFournisseur.id}`);
});

app.post("/produits", async (req, res) => {
  const {
    libelle,
    prixUnitaire,
    qteStock,
    dateExpiration,
    categorieId,
    fournisseurId
  } = req.body;

  if (!isNonEmptyString(libelle)) {
    return error(res, 422, "VALIDATION_ERROR", "libelle invalide");
  }

  if (prixUnitaire <= 0) {
    return error(res, 422, "VALIDATION_ERROR", "prix invalide");
  }

  if (qteStock < 0) {
    return error(res, 422, "VALIDATION_ERROR", "stock invalide");
  }

  const db = await readDB();

  // 🔴 vérifier categorie existe
  const cat = db.categories.find(c => c.id === categorieId);
  if (!cat) {
    return error(res, 404, "NOT_FOUND", "categorie inexistante");
  }

  // 🔴 vérifier fournisseur existe
  const four = db.fournisseurs.find(f => f.id === fournisseurId);
  if (!four) {
    return error(res, 404, "NOT_FOUND", "fournisseur inexistant");
  }

  db.produits = db.produits ?? [];

  const newProduit = {
    id: nextId(db.produits),
    libelle,
    prixUnitaire,
    qteStock,
    dateExpiration,
    categorieId,
    fournisseurId
  };

  db.produits.push(newProduit);
  await writeDB(db);

  return created(res, newProduit, `/produits/${newProduit.id}`);
});


app.get("/produits", async (req, res) => {
  const db = await readDB();
  db.produits = db.produits ?? [];


  const search = (req.query.search ?? "").toString().toLowerCase();


  const data = search
    ? db.produits.filter((c) => c.libelle.toLowerCase().includes(search))
    : db.produits;


  return ok(res, data);
});
app.use((_req, res) => error(res, 404, "NOT_FOUND", "Route introuvable"));
app.listen(3000, () => console.log("API running on http://localhost:3000"));

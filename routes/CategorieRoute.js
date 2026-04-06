import express from "express";
import fs from "fs/promises";
import path from "path";

import { isInt, error } from "../validation/common.schema.js";
import { validateCategorie } from "../validation/categorie.schema.js";

const router = express.Router();
const DB_PATH = path.join(process.cwd(), "db.json");

async function readDB() {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

function nextId(list) {
  const max = list.reduce((m, x) => (x.id > m ? x.id : m), 0);
  return max + 1;
}

router.post("/", async (req, res) => {

  const { libelle } = req.body;

  if (!validateCategorie(libelle)) {
    return error(res,422,"VALIDATION_ERROR","libelle invalide");
  }

  const db = await readDB();
  db.categories = db.categories ?? [];

  const exist = db.categories.find(
    c => c.libelle.toLowerCase() === libelle.trim().toLowerCase()
  );

  if (exist) {
    return error(res,409,"ALREADY_EXISTS","Categorie existe deja");
  }

  const newCat = {
    id: nextId(db.categories),
    libelle: libelle.trim()
  };

  db.categories.push(newCat);
  await writeDB(db);

  res.status(201).json(newCat);
});

router.get("/", async (req,res)=>{

  const db = await readDB();
  db.categories = db.categories ?? [];

  const { search } = req.query;

  let result = db.categories;

  if (search) {
    result = result.filter(c =>
      c.libelle.toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  res.json(result);

});

router.get("/:id", async (req,res)=>{

  const id = Number(req.params.id);

  if(!isInt(id)){
    return error(res,400,"BAD_REQUEST","id invalide");
  }

  const db = await readDB();
  const cat = db.categories.find(c=>c.id===id);

  if(!cat){
    return error(res,404,"NOT_FOUND","Categorie introuvable");
  }

  res.json(cat);
});

// router.delete("/:id", async (req,res)=>{

//   const id = Number(req.params.id);

//   if(!isInt(id)){
//     return error(res,400,"BAD_REQUEST","id invalide");
//   }

//   const db = await readDB();

//   const before = db.categories.length;
//   db.categories = db.categories.filter(c=>c.id!==id);

//   if(before === db.categories.length){
//     return error(res,404,"NOT_FOUND","Categorie introuvable");
//   }

//   await writeDB(db);

//   res.status(204).send();
// });
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id)) {
    return error(res, 400, "BAD_REQUEST", "id invalide");
  }

  const db = await readDB();

  const before = db.categories.length;
  db.categories = db.categories.filter(c => c.id !== id);

  if (before === db.categories.length) {
    return error(res, 404, "NOT_FOUND", "Categorie introuvable");
  }

  await writeDB(db);

  res.json({ message: "Categorie supprimée avec succès" });
});
export default router;
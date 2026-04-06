import express from "express";
import fs from "fs/promises";
import path from "path";

import { error } from "../validation/common.schema.js";
import { validateProduit } from "../validation/produit.schema.js";

const router = express.Router();
const DB_PATH = path.join(process.cwd(),"db.json");

async function readDB(){
  const raw = await fs.readFile(DB_PATH,"utf-8");
  return JSON.parse(raw);
}

async function writeDB(db){
  await fs.writeFile(DB_PATH,JSON.stringify(db,null,2));
}

function nextId(list){
  const max = list.reduce((m,x)=>(x.id>m?x.id:m),0);
  return max+1;
}

router.post("/",async(req,res)=>{

  if(!validateProduit(req.body)){
    return error(res,422,"VALIDATION_ERROR","produit invalide");
  }

  const db = await readDB();

  const cat = db.categories.find(c=>c.id===req.body.categorieId);
  const four = db.fournisseurs.find(f=>f.id===req.body.fournisseurId);

  if(!cat){
    return error(res,404,"NOT_FOUND","categorie inexistante");
  }

  if(!four){
    return error(res,404,"NOT_FOUND","fournisseur inexistant");
  }

  const newProd = {
    id: nextId(db.produits ?? []),
    ...req.body
  };

  db.produits = db.produits ?? [];
  db.produits.push(newProd);

  await writeDB(db);

  res.status(201).json(newProd);

});

router.get("/",async(req,res)=>{

  const db = await readDB();
  db.produits = db.produits ?? [];

  res.json(db.produits);

});

export default router;
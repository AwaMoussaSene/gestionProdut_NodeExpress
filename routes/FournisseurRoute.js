import express from "express";
import fs from "fs/promises";
import path from "path";

import { error, isInt } from "../validation/common.schema.js";
import { validateFournisseur } from "../validation/fournisseur.schema.js";

const router = express.Router();
const DB_PATH = path.join(process.cwd(), "db.json");

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

  if(!validateFournisseur(req.body)){
    return error(res,422,"VALIDATION_ERROR","donnees invalides");
  }

  const db = await readDB();
  db.fournisseurs = db.fournisseurs ?? [];

  const exist = db.fournisseurs.find(
    f => f.telephone === req.body.telephone
  );

  if(exist){
    return error(res,409,"ALREADY_EXISTS","telephone deja utilise");
  }

  const newF = {
    id: nextId(db.fournisseurs),
    ...req.body
  };

  db.fournisseurs.push(newF);
  await writeDB(db);

  res.status(201).json(newF);

});

router.get("/",async(req,res)=>{

  const db = await readDB();
  db.fournisseurs = db.fournisseurs ?? [];

  res.json(db.fournisseurs);

});

router.get("/:id",async(req,res)=>{

  const id = Number(req.params.id);

  if(!isInt(id)){
    return error(res,400,"BAD_REQUEST","id invalide");
  }

  const db = await readDB();
  const f = db.fournisseurs.find(x=>x.id===id);

  if(!f){
    return error(res,404,"NOT_FOUND","fournisseur introuvable");
  }

  res.json(f);

});

export default router;
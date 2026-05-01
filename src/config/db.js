import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

export async function readDB() {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

export function nextId(list) {
  const max = list.reduce((m, x) => (x.id > m ? x.id : m), 0);
  return max + 1;
}
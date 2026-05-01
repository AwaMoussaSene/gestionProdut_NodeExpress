import { readDB, writeDB, nextId } from "../config/db.js";

export class BaseRepo {
  constructor(collection) {
    this.collection = collection;
  }

  async _db() {
    const db = await readDB();
    db[this.collection] ??= [];
    return db;
  }

  async findAll() {
    const db = await this._db();
    return db[this.collection];
  }

  async findById(id) {
    const db = await this._db();
    return db[this.collection].find((item) => item.id === id) ?? null;
  }

  async findOne(predicate) {
    const db = await this._db();
    return db[this.collection].find(predicate) ?? null;
  }

  async create(data) {
    const db = await this._db();
    const newItem = { id: nextId(db[this.collection]), ...data };
    db[this.collection].push(newItem);
    await writeDB(db);
    return newItem;
  }


  async update(id, data) {
    const db = await this._db();
    const index = db[this.collection].findIndex((item) => item.id === id);
    if (index === -1) return null;
    db[this.collection][index] = { ...db[this.collection][index], ...data };
    await writeDB(db);
    return db[this.collection][index];
  }

  async delete(id) {
    const db = await this._db();
    const before = db[this.collection].length;
    db[this.collection] = db[this.collection].filter((item) => item.id !== id);
    if (db[this.collection].length === before) return false;
    await writeDB(db);
    return true;
  }
}
import fs from "fs/promises";
const DB_PATH = new URL("./db.json", import.meta.url).pathname;

// get a parsed version of the db
export async function getDB() {
    const db = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(db);
}
//
export async function saveDB(db) {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 4));
    return db;
}

export async function appendDB(newNote) {
    const db = await getDB();
    db.notes.push(newNote);
    await saveDB(db);
    return newNote;
}

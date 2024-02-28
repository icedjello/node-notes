import { getDB, saveDB, appendDB } from "../database/db.js";

export async function createNewNote(content, tags) {
    const newNote = {
        content,
        tags: tags,
        id: Date.now(),
    };
    await appendDB(newNote);
    return newNote;
}

export async function getAllNotes() {
    const { notes } = await getDB();
    return notes;
}
export async function findNote() {}
export async function deleteNote() {}
export async function deleteAllNotes() {}

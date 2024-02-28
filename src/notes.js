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

export async function findNotes(searchContent, searchTags) {
    let { notes: filteredNotes } = await getDB();

    if (searchTags && searchTags.length) {
        filteredNotes = filteredNotes.filter(({ tags }) =>
            searchTags.every((t) => tags.includes(t)),
        );
    }

    filteredNotes = filteredNotes.filter(({ content }) =>
        content.includes(searchContent),
    );

    return filteredNotes;
}
export async function deleteNote(id) {}
export async function deleteAllNotes() {}

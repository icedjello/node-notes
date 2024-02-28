import { jest } from "@jest/globals";

jest.unstable_mockModule("../database/db.js", () => ({
    saveDB: jest.fn(),
    getDB: jest.fn(),
    appendDB: jest.fn(),
}));

const { appendDB, getDB, saveDB } = await import("../database/db.js");
const { createNewNote, getAllNotes, deleteNote } = await import(
    "../src/notes.js"
);

beforeEach(() => {
    appendDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
});

test("createNewNote inserts data and returns the new note", async () => {
    const content = "create new note test";
    const tags = ["testing", "tags"];
    const testNote = {
        content,
        tags,
    };
    appendDB.mockResolvedValue(testNote);
    const result = await createNewNote(content, tags);
    expect(result.content).toBe(content);
    expect(result.tags).toBe(tags);
});

test("getAllNotes returns all notes in the db", async () => {
    const testDB = { notes: ["note 1", "note 2", "note 3"] };
    getDB.mockResolvedValue(testDB);
    const result = await getAllNotes();
    expect(result).toEqual(testDB.notes);
});

test("deleteNote returns notes sans deleted note", async () => {
    const note1 = { content: "note 1", id: 1 };
    const note2 = { content: "note 2", id: 2 };
    const note3 = { content: "note 3", id: 3 };

    const testDB = {
        notes: [note1, note2, note3],
    };
    saveDB.mockResolvedValue(testDB);
    const result = await deleteNote(4);
    expect(result).toBeNull();
});

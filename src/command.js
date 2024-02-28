import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
    createNewNote,
    getAllNotes,
    findNotes,
    deleteNote,
    deleteAllNotes,
} from "../src/notes.js";
import { printNote, printMultipleNotes } from "./utils.js";

yargs(hideBin(process.argv))
    .command(
        "new <note>",
        "Create a new note",
        (yargs) => {
            return yargs.positional("note", {
                type: "string",
                description: "The content of the note",
            });
        },
        async ({ note: content, tags }) => {
            const newNote = await createNewNote(content, tags);
            console.log("noted");
            printNote(newNote);
            return;
        },
    )
    .options("tags", {
        alias: "t",
        type: "array",
        description: "tags for organising",
    })
    .command(
        "all",
        "Get all notes",
        () => {},
        async () => {
            const allNotes = await getAllNotes();
            if (allNotes.length === 0) {
                console.log("no notes");
                return;
            }
            printMultipleNotes(allNotes);
            return;
        },
    )
    .command(
        "find <filter>",
        "get matching notes based on content & tags",
        (yargs) => {
            return yargs.positional("filter", {
                describe:
                    "The search term to filter notes by, will be applied to note.content",
                type: "string",
            });
        },
        async ({ filter: searchContent, tags: searchTags }) => {
            const foundNotes = await findNotes(searchContent, searchTags);
            if (foundNotes.length === 0) {
                console.log("found no notes");
                return;
            }
            printMultipleNotes(foundNotes);
            return;
        },
    )
    .command(
        "remove <id>",
        "remove a note by id",
        (yargs) => {
            return yargs.positional("id", {
                type: "number",
                description: "The id of the note you want to remove",
            });
        },
        async ({ id }) => {
            const removedNote = await deleteNote(id);

            if (removedNote === null) {
                console.log("could not find note");
                return;
            }
            console.log("removed:");
            printNote(removedNote);
            return;
        },
    )
    .command(
        "web [port]",
        "launch website to see notes",
        (yargs) => {
            return yargs.positional("port", {
                describe: "port to bind on",
                default: 5000,
                type: "number",
            });
        },
        async (argv) => {},
    )
    .command("clean", "remove all notes", async () => {
        await deleteAllNotes();
        console.log("removed all notes");
    })
    .demandCommand(1)
    .parse();

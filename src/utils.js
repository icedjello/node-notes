export function printNote({ id, tags, content }) {
    console.log("id: ", id);
    console.log("tags: ", tags.join(" "));
    console.log("note: ", content);
    console.log("\n");
    return;
}

export function printMultipleNotes(notes) {
    console.log("\n");
    notes.forEach((n) => {
        printNote(n);
    });
    return;
}

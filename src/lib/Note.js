import cheerio from 'cheerio';

const Note = {
    previewNotes(notes){
        const previews = [];
        for(let i = 0; i < notes.length; i++){
            const note = notes[i];
            const noteDate = note.date;
            const noteContent = this._parseNote(note.text);
            const noteSummary = this._cleanText(noteContent['body']);
            const notePreview = {
                title: noteContent['title'],
                summary: noteSummary.substring(0, 150),
                date: noteDate
            };
            previews.push(notePreview);
        }
        return previews;
    },
    readNote(html){

    },
    //Create html file which contain note content
    createNoteHtml(title, content){
        const noteHtml = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
            </head>
            <body>
                <h1 class="note-title">${title}</h1>
                <div class="note-content">
                  ${content}
                </div>
            </body>
        </html>`;
        return noteHtml;
    },
    //Parse downloaded html file to note.
    _parseNote(html){
        const $ = cheerio.load(html);
        const noteTitle = $('.note-title').text();
        const noteBody = $('.note-content').text();
        const noteContent = {
            title: noteTitle,
            body: noteBody,
        };
        return noteContent;
    },
    //Clean text before using for summary.
    _cleanText(text){
        let clearText = text.replace(/<(?:.|\n)*?>/gm, '');
        clearText = clearText.trim();
        const textArea = document.createElement('textarea');
        textArea.innerHTML = clearText;
        clearText = textArea.value;
        return clearText;  
    },
}

export default Note;
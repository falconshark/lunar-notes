import cheerio from 'cheerio';

const Note = {
    getNotebook(filePath){
        const notebookRegax = /(.+)\/(.+\.html)/;
        let notebook = notebookRegax.exec(filePath);
        //If notebook is null, mark it to 'uncategorized'.
        if(!notebook){
            return 'uncategorized';
        }
        notebook = notebookRegax.exec(filePath)[1];
        return notebook;
    },
    previewNotes(notes){
        const previews = [];
        for(let i = 0; i < notes.length; i++){
            const note = notes[i];
            const noteDate = note.date;
            const noteContent = this._parseNote(note.text);
            const noteSummary = this.cleanText(noteContent['body']);
            const notePreview = {
                title: noteContent['title'],
                path: note.path,
                summary: noteSummary.substring(0, 150),
                date: noteDate
            };
            previews.push(notePreview);
        }
        return previews;
    },
    //Load note content from html file
    loadNote(noteFile){
        const noteContent = this._parseNote(noteFile.text);
        const note = {
            title: noteContent.title,
            body: noteContent.body,
        }
        return note;
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
    //Sort Notes by last edit date.
    sortNotes(notes){
        notes.sort(function(a, b){
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        return notes;
    },
    //Parse downloaded html file to note.
    _parseNote(html){
        const $ = cheerio.load(html);
        const noteTitle = $('.note-title').text();
        const noteBody = $('.note-content').text();
        const noteContent = {
            title: noteTitle,
            body: noteBody.trim(),
        };
        return noteContent;
    },
    //Clean text before using for summary.
    cleanText(text){
        let clearText = text.replace(/<(?:.|\n)*?>/gm, '');
        clearText = clearText.trim();
        clearText = clearText.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
        const textArea = document.createElement('textarea');
        textArea.innerHTML = clearText;
        clearText = textArea.value;
        return clearText;  
    },
}

export default Note;
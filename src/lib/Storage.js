import queryString from 'query-string';

const Storage = {
    //Get refresh token code from url if exist
    getCodeFromUrl(){
        const query = queryString.parse(location.search);
        if(query){
            const accessCode = query.code;
            return accessCode;
        }
        return null;
    },
    async getTokenFromCode(dbx, code){
        const redirectUrl = `${import.meta.env.VITE_BASE_URL}/`;
        const codeVerifier = window.sessionStorage.getItem("codeVerifier");
        dbx.auth.setCodeVerifier(codeVerifier);
        const result = await dbx.auth.getAccessTokenFromCode(redirectUrl, code);
        return result;
    },
    async getDropboxAuthUrl(dbx){
        const redirectUrl = `${import.meta.env.VITE_BASE_URL}/`;
        try{
            const authUrl = await dbx.auth.getAuthenticationUrl(redirectUrl, undefined, 'code', 'offline', undefined, undefined, true);
            const codeVerifier = await dbx.auth.codeVerifier;
            window.sessionStorage.setItem("codeVerifier", codeVerifier);
            return authUrl;
        }catch(ex){
            console.error(ex);
        }
    },
    async listDropboxFiles(dbx){
        try{
            let dropboxLists = await dbx.filesListFolder({path: ''});
            dropboxLists = dropboxLists['result']['entries'];
            return dropboxLists;
        }catch(ex){
            console.log(ex);
        }
    },
    //Filter file and get html file (Notes) only.
    filterDropboxFiles(dropboxLists){
        const noteFiles = dropboxLists.filter((file) => {
            const fileTypeRegax = /^(.+)\.(html)$/;
            return file['.tag'] === 'file' && file['name'].match(fileTypeRegax)[2] === 'html';
        });
        return noteFiles;
    },
    async downloadDropboxFiles(dbx, noteFiles){
        const notes = [];
        for(let i = 0; i < noteFiles.length; i++){
            const noteFile = noteFiles[i];
            const fileUpdateDate = noteFile['client_modified'];
            const response = await dbx.filesDownload({path: noteFile['path_lower']});
            const fileBlob = response.result.fileBlob;
            const noteFileContent = {
                text: await fileBlob.text(),
                date: fileUpdateDate,
            };
            notes.push(noteFileContent);
        }
        return notes;
    },
}

export default Storage;
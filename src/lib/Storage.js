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
    //List all dropbox files in path.
    async listDropboxFiles(dbx, path){
        try{
            let dropboxLists = await dbx.filesListFolder({path: path});
            dropboxLists = dropboxLists['result']['entries'];
            return dropboxLists;
        }catch(ex){
            if(ex == 'DropboxResponseError: Response failed with a 409 code'){
                const error = {
                    'code': 409,
                    'message': ex,
                };
                throw error;
            }
        }
    },
    filterDropboxFolders(dropboxLists){
        const folders = dropboxLists.filter((file) => {
            return file['.tag'] === 'folder';
        });
        return folders;
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
            const noteDateRegax = /(^.+)-([0-9][0-9]{0,1}-[0-9][0-9]{0,1}-[0-9][0-9]{0,4})(\.html)/;
            const fileUpdateDate = noteDateRegax.exec(noteFile['path_lower'])[2];
            const response = await dbx.filesDownload({path: noteFile['path_lower']});
            const fileBlob = response.result.fileBlob;
            const noteFileContent = {
                name: noteFile['name'],
                text: await fileBlob.text(),
                path: noteFile['path_lower'],
                date: fileUpdateDate,
            };
            notes.push(noteFileContent);
        }
        return notes;
    },
    //Download single dropbox file
    async downloadDropboxFile(dbx, filePath){
        const response = await dbx.filesDownload({path: filePath });
        const fileBlob = response.result.fileBlob;
        const noteFileContent = {
            text: await fileBlob.text(),
        };
        return noteFileContent;
    },
    async createDropboxFolder(dbx, folderName){
        try{
            await dbx.filesCreateFolderV2({path: `/${folderName}`});
            return true;
        }catch(ex){
            return false;
        }
    },
    async updateDropboxFile(dbx, filename, content, mode){
        try{
            if(mode){
                const response = await dbx.filesUpload({path: filename, contents: content, mode});
                return response;
            }
            const response = await dbx.filesUpload({path: filename, contents: content});
            return response;
        }catch(ex){
            console.error(ex);
            return false;
        }
    },
}

export default Storage;
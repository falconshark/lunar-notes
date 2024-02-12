import { Dropbox } from 'dropbox';
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
    async loadDropboxContent(dbx){
        try{
            const dropboxLists = await dbx.filesListFolder({path: '/Apps/FalonNoteTaking'});
        }catch(ex){
            console.log(ex);
        }
    },
}

export default Storage;
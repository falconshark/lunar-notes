import { Dropbox } from 'dropbox';
import queryString from 'query-string';

const Storage = {
    //Get access token from url if exist
    getAccessTokenFromUrl(){
        if(window.location.hash && queryString.parse(window.location.hash).access_token){
            const query = queryString.parse(window.location.hash).access_token;
            return query;
        }
        return null;
    },
    async getDropboxAuthUrl(){
        const redirectUrl = `${import.meta.env.VITE_BASE_URL}/`;
        const clientId = import.meta.env.VITE_DROPBOX_APP_ID;
        const dbx = new Dropbox({ clientId: clientId });
        const authUrl = await dbx.auth.getAuthenticationUrl(redirectUrl);
        return authUrl;
    },
}

export default Storage;
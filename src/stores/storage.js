import { defineStore } from 'pinia'
import { Dropbox } from 'dropbox';

const clientId = import.meta.env.VITE_DROPBOX_APP_ID;
const dbx = new Dropbox({ clientId: clientId });

export const useStorageStore = defineStore('storage', {
  state: () => {
    return {
      dbx: dbx,
      authenticated: false,
    }
  },
  actions: {
    updateDropboxClient(dbx) {
      this.dbx = dbx;
    },
    setAuthenticated(){
      this.authenticated = true;
    },
  },
})

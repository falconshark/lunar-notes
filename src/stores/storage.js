import { defineStore } from 'pinia'

export const useStorageStore = defineStore('storage', {
  state: () => {
    return {
      dropboxAccessToken: null,
    }
  },
  actions: {
    setDropboxAccessToken(token) {
      this.dropboxAccessToken = token;
    },
  },
})

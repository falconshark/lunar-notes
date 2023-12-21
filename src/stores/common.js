import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      isLogin: false,
    }
  },
  actions: {
    login() {
      this.isLogin = true;
    },
  },
})

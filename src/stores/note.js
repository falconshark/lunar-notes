import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', {
  state: () => {
    return {
        notes: [],
    }
  },
  actions: {
    updateNoteList(notes) {
      this.notes = notes;
    },
  },
})
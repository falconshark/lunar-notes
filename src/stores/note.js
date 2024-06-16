import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', {
  state: () => {
    return {
        notes: [],
        currentNote: null,
    }
  },
  actions: {
    updateNoteList(notes) {
      this.notes = notes;
    },
    setCurrentNote(note){
      this.currentNote = note;
    }
  },
})
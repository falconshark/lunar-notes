<template>
  <div class="page-note">
    <div class="right-content">
      <NoteList />
      <NoteForm />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useStorageStore } from '@/stores/storage';
import { useNoteStore } from '@/stores/note';
import NoteList from '@/components/Note/NoteList.vue';
import NoteForm from '@/components/Note/NoteForm.vue';
import Common from '@/lib/Common';
import Storage from '@/lib/Storage';
import Note from '@/lib/Note';

export default {
  name: 'Note',
  components: {
    NoteList,
    NoteForm,
  },
  created() {
    this.loadNoteContent();
    this.$watch(() => this.$route.params, () =>{
      this.loadNoteContent();
    });
  },
  data() {
    return {
      readMode: true,
      note: null
    }
  },
  methods: {
    parseDate(dateString) {
      const date = Common.parseDate(dateString, 'Do MMM YYYY');
      return date;
    },
    async loadNoteContent() {
      const notebook = this.$route.params.notebook;
      const date = this.$route.params.date;
      const filename = `${this.$route.params.filename}-${date}`;
      let filePath = `/${notebook}/${filename}.html`;
      if (notebook === 'uncategorized') {
        filePath = `/${filename}.html`;
      } else {
        filePath = `/${notebook}/${filename}.html`;
      }
      const fileContent = await Storage.downloadDropboxFile(this.dbx, filePath);
      const note = Note.loadNote(fileContent);
      note['notebook'] = notebook;
      note['path'] = filePath;
      this.setCurrentNote(note);
    },
    ...mapActions(useNoteStore, ['setCurrentNote'])
  },
  computed: {
    ...mapState(useStorageStore, ['dbx', 'authenticated'])
  },
}
</script>

<style scoped lang="scss">
.page-note {
  .right-content {
    display: flex;
  }
}
</style>
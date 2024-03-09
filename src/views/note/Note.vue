<template>
    <div class="right-content">
      <div class="main-content">
        <div class="inner-content">
          <div class="note-readmode" v-if="readMode">
            <h2 class="page-header">
              <div class="header-text">{{ noteTitle }}</div>
              <div class="action-buttons">
                <button class="btn btn-primary btn-edit">Edit</button>
              </div>
            </h2>
            <div class="note-reader">
              {{ noteBody }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { mapState } from 'pinia';
  import { useStorageStore } from '@/stores/storage';
  import Loader from '@/components/Common/Loading.vue';
  import Common from '@/lib/Common';
  import Storage from '@/lib/Storage';
  import Note from '@/lib/Note';
  
  export default {
    name: 'Notes',
    components: {
      Loader
    },
    mounted() {
      this.loadNoteContent();
    },
    data() {
      return {
        readMode: true,
        noteTitle: '',
        noteBody: '',
        loading: true,
      }
    },
    methods: {
      parseDate(dateString) {
        const date = Common.parseDate(dateString, 'Do MMM YYYY');
        return date;
      },
      async loadNoteContent(){
        const notebook = this.$route.params.notebook;
        const date = this.$route.params.date;
        const filename = `${this.$route.params.filename}-${date}`;
        let filePath = `/${notebook}/${filename}.html`;
        if(notebook === 'uncategorized'){
          filePath = `/${filename}.html`;
        }else{
          filePath = `/${notebook}/${filename}.html`;
        }
        const fileContent = await Storage.downloadDropboxFile(this.dbx, filePath);
        const note = Note.loadNote(fileContent);
        this.noteBody = note.body;
        this.noteTitle = note.title;
      },
    },
    computed: {
      ...mapState(useStorageStore, ['dbx', 'authenticated'])
    },
  }
  </script>
    
  <style scoped lang="scss">
  .page-header {
    display: flex;
    .header-text{
      flex: 1;
    }
  }
  </style>
    
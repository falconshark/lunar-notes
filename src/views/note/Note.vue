<template>
    <div class="right-content">
      <div class="main-content">
        <div class="inner-content">
          <div class="note-wrapper">
            <h2 class="page-header">
              Note
            </h2>

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
        notes: [],
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
        const filename = this.$route.params.filename;
        let filePath = `/${notebook}/${filename}.html`;
        if(notebook === 'uncategorized'){
          const filePath = `/${filename}.html`;
        }
      },
    },
    computed: {
      ...mapState(useStorageStore, ['dbx', 'authenticated'])
    },
  }
  </script>
    
  <style scoped lang="scss">
  .page-subheader {
    margin-bottom: 30px;
  }
  </style>
    
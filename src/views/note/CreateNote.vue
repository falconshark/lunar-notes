<template>
  <div class="right-content">
    <div class="main-content">
      <div class="inner-content">
        <h1 class="page-header">
          <div class="action-buttons">
            <button class="btn btn-primary" @click="save">Save</button>
          </div>
        </h1>
        <div class="note-info-wrapper">
          <input id="note-title" class="input-text" v-model="noteTitle" placeholder="New Note" type="text" />
          <div class="notebook-select">
            <i class="bi bi-book"></i>
            Uncategorized
          </div>
        </div>
        <div class="note-editor">
          <QuillEditor ref="editor" theme="snow" />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';

  export default {
    name: 'CreateNote',
    components: {
        QuillEditor,
    },
    data(){
      return {
        noteTitle: '',
      };
    },
    methods: {
      async save(){
        const title = this.noteTitle;
        const content = this.$refs.editor.getHTML();
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .page-header{
    display: flex;
    align-items: center;
    .action-buttons{
      text-align: right;
      width: 100%;
      .btn{
        display: inline-block;
      }
    }
  }
  .note-info-wrapper{
    margin-bottom: 20px;
    .input-text{
      font-size: 1.5em;
      font-weight: bold;
      border: 0;
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .notebook-select{
    .bi{
      margin-top: 10px;
      font-size: 1.2em;
      color: rgb(127, 127, 127);
    }
  }

  </style>
  
<template>
  <div class="right-content">
    <div class="main-content">
      <div class="inner-content">
        <h1 class="page-header">
          <div class="header-text">Create Note</div>
          <div class="action-buttons">
            <button class="btn btn-primary">Save</button>
          </div>
        </h1>
        <div class="note-editor">
          <QuillEditor theme="snow" />
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
  }
  </script>
  
  <style lang="scss" scoped>
  .page-header{
    display: flex;
    align-items: center;
  }
  .header-text{
    flex: 1;
  }
  </style>
  
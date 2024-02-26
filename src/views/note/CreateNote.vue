<template>
  <div class="right-content">
    <div class="main-content">
      <div class="inner-content">
        <NoteForm action="create"/>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import NoteForm from '@/components/Note/NoteForm.vue';

  export default {
    name: 'CreateNote',
    components: {
        NoteForm,
    },
  }
  </script>
  
  <style lang="scss" scoped>
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
    margin-top: 10px;
    .bi{
      margin-top: 10px;
      font-size: 1.2em;
      color: rgb(127, 127, 127);
    }
  }

  </style>
  
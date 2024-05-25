<template>
  <div class="page-notes">
    <div class="right-content">
      <NoteList />
      <NoteForm action="create"/>
    </div>
  </div>
</template>
  
<script>
import NoteList from '@/components/Note/NoteList.vue';
import NoteForm from '@/components/Note/NoteForm.vue';

export default {
  name: 'Notes',
  components:{
    NoteList,
    NoteForm,
  },
}
</script>

<style scoped lang="scss">
.page-notes{
  .right-content{
    display: flex;
  }
}
</style>
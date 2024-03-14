<template>
  <div class="page-notes">
    <div class="right-content">
      <NoteList />
    </div>
  </div>
</template>
  
<script>
import NoteList from '@/components/Note/NoteList.vue';

export default {
  name: 'Notes',
  components:{
    NoteList,
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
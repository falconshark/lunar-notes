<template>
  <div class="right-content">
    <div class="main-content">
      <div class="inner-content">
         <NoteList />
      </div>
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
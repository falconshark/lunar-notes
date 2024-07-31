<template>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useStorageStore } from '@/stores/storage';
import { useNoteStore } from '@/stores/note';
import Common from '@/lib/Common';
import Storage from '@/lib/Storage';
import Note from '@/lib/Note';

export default {
    name: 'NotebookForm',
}
</script>
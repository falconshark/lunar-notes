<template>
  <div class="right-content">
    <div class="main-content">
      <div class="inner-content">
        <h1 class="page-header">Dashboard</h1>
        <ConnectDropbox v-if="!authenticated"/>
        <div class="dashboard" v-else>
          <div class="welcome-message">
            Welcome to Falcon Notes ! Let's start taking note.
            
          </div>
          <LatestNotes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useStorageStore } from '../stores/storage';
import ConnectDropbox from '@/components/Dashboard/ConnectDropbox.vue';
import LatestNotes from '@/components/Dashboard/LatestNotes.vue';

export default {
  name: 'Dashboard',
  components: {
    ConnectDropbox,
    LatestNotes
  },
  computed: {
    ...mapState(useStorageStore, ['authenticated'])
  },
}
</script>

<style scoped lang="scss">
.inner-content{
  background-color: white;
  padding: 50px;
}
</style>

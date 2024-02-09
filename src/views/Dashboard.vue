<template>
  <div class="right-content dashboard">
    <div class="main-content">
      <div class="inner-content">
        <ConnectDropbox v-if="!dropboxAccessToken"/>
        Hello ! Dropbox connected.
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useStorageStore } from '../stores/storage';
import ConnectDropbox from '@/components/ConnectDropbox.vue';

export default {
  name: 'Dashboard',
  components: {
    ConnectDropbox,
  },
  computed: {
    ...mapState(useStorageStore, ['dropboxAccessToken'])
  },
}
</script>

<style scoped lang="scss">
.inner-content{
  background-color: white;
  padding: 50px;
}
</style>

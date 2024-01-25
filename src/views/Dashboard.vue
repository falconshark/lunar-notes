<template>
  <div class="right-content dashboard">
    <div class="main-content">
      <ConnectDropbox />
    </div>
  </div>
</template>

<script>
import ConnectDropbox from '@/components/ConnectDropbox.vue';
export default {
  name: 'Dashboard',
  components: {
    ConnectDropbox,
  },
}
</script>

<style scoped lang="scss">

</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Sidemenu v-if="isLogin"/>
  <RouterView />
</template>

<script>
import Sidemenu from '@/components/Sidemenu.vue';

export default {
  name: 'App',
  data(){
    return {
      isLogin: false,  
    }
  },
  components: {
    Sidemenu,
  },
}
</script>

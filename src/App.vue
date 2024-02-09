<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Sidemenu/>
  <RouterView />
  <Footer />
</template>

<script>
import Cookies from 'js-cookie';
import { mapState, mapActions } from 'pinia'
import { useCommonStore } from './stores/common'
import Sidemenu from '@/components/Sidemenu.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Sidemenu,
    Footer,
  },
}
</script>

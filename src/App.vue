<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Sidemenu v-if="isLogin"/>
  <RouterView />
  <Footer v-if="isLogin"/>
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
  mounted(){
    const loginStatus = Cookies.get('loginStatus');
    if(loginStatus === 'true'){
      this.login();
      this.$router.push({ name: 'Dashboard'} );
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['login'])
  },
  computed: {
    ...mapState(useCommonStore, ['isLogin'])
  },
}
</script>

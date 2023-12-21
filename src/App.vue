<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Sidemenu v-if="isLogin"/>
  <RouterView />
</template>

<script>
import Cookies from 'js-cookie';
import { mapState, mapActions } from 'pinia'
import { useCommonStore } from './stores/common'
import Sidemenu from '@/components/Sidemenu.vue';

export default {
  name: 'App',
  components: {
    Sidemenu,
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

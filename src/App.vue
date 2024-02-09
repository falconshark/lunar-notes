<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <Sidemenu/>
  <RouterView />
  <Footer />
</template>

<script>
import { RouterView } from 'vue-router';
import Cookies from 'js-cookie';
import { mapState, mapActions } from 'pinia';
import { useStorageStore } from './stores/storage';
import Sidemenu from '@/components/Sidemenu.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Sidemenu,
    Footer,
  },
  mounted(){
    //Load saved access token from cookies
    const dropboxToken = Cookies.get('dropboxToken');
    if(dropboxToken){
      this.setDropboxAccessToken(dropboxToken);
    }
  },
  methods:{
    ...mapActions(useStorageStore, ['setDropboxAccessToken'])
  },
  computed: {
    ...mapState(useStorageStore, ['dropboxAccessToken'])
  },
}
</script>

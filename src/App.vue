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
    //Load saved refresh token from cookies, and save it.
    const dropboxToken = Cookies.get('dropboxToken');
    if(dropboxToken){
      this.dbx.auth.setRefreshToken(dropboxToken);
      this.updateDropboxClient(this.dbx);
      this.setAuthenticated();
    }
  },
  methods:{
    ...mapActions(useStorageStore, ['updateDropboxClient', 'setAuthenticated'])
  },
  computed: {
    ...mapState(useStorageStore, ['dbx'])
  },
}
</script>

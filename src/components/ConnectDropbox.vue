<template>
  <el-card class="box-card">
    <div class="connect-card-inner">
        <img class="img-fluid connect-card-icon" src="/images/dropbox.png"/> 
        <div class="connect-card-text">
            Oh! It's look like you had not connect any cloud drive yet. <br/>
            Connect it before start using.
            <button @click="conntectDropbox" class="btn btn-primary connect-button">Connect</button>
        </div>
    </div>
  </el-card>
</template>
  
  <script>
  import Cookies from 'js-cookie';
  import { mapState, mapActions } from 'pinia';
  import { useStorageStore } from '../stores/storage';
  import Storage from '../lib/Storage';

  export default {
    name: 'ConnectDropbox',
    mounted(){
      const accessToken = Storage.getAccessTokenFromUrl();
      if(accessToken){
        Cookies.set('dropboxToken', accessToken);
        this.setDropboxAccessToken(accessToken);
      }
    },
    methods:{
      async conntectDropbox(){
        const authUrl = await Storage.getDropboxAuthUrl();
        location.href = authUrl;
      },
      ...mapActions(useStorageStore, ['setDropboxAccessToken'])
    },
    computed: {
      ...mapState(useStorageStore, ['dropboxAccessToken'])
    },
  }
  </script>
  
  <style scoped lang="scss">
  .connect-card-icon{
    display: block;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
  .connect-card-text{
    text-align: center;
  }
  .connect-button{
    margin-top: 10px;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
  </style>
  
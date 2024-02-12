<template>
  <div class="connect-card-wrapper">
    <img class="img-fluid connect-card-icon" src="/images/dropbox.png"/> 
        <div class="connect-card-text">
            Oh! It's look like you had not connect any cloud drive yet. <br/>
            Connect it before start using.
            <button @click="conntectDropbox" class="btn btn-primary connect-button">Connect</button>
        </div>
  </div>
</template>
  
  <script>
  import Cookies from 'js-cookie';
  import { mapState, mapActions } from 'pinia';
  import { useStorageStore } from '@/stores/storage';
  import Storage from '@/lib/Storage';

  export default {
    name: 'ConnectDropbox',
    async mounted(){
      const accessCode = Storage.getCodeFromUrl(this.dbx);
      if(accessCode){
        const token = await this.getToken(accessCode);
        Cookies.set('dropboxToken', token['refresh_token'], { expires: 365 });
        this.dbx.auth.setRefreshToken(token['refresh_token']);
        this.updateDropboxClient(this.dbx);
      }
    },
    methods:{
      //Get token by code from Dropbox.
      async getToken(accessCode){
        const token = await Storage.getTokenFromCode(this.dbx, accessCode);
        const tokens = {
          'accessToken': token['result']['access_token'],
          'refresh_token': token['result']['refresh_token'],
        };
        return tokens;
      },
      async conntectDropbox(){
        const authUrl = await Storage.getDropboxAuthUrl(this.dbx);
        location.href = authUrl;
      },
      ...mapActions(useStorageStore, ['updateDropboxClient'])
    },
    computed: {
      ...mapState(useStorageStore, ['dbx'])
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
  
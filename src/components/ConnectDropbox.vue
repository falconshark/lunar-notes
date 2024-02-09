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
  import {Dropbox} from 'dropbox';
  export default {
    name: 'ConnectDropbox',
    methods:{
      async conntectDropbox(){
        const redirectUrl = `${import.meta.env.VITE_BASE_URL}/`;
        const clientId = import.meta.env.VITE_DROPBOX_APP_ID;
        const dbx = new Dropbox({ clientId: clientId });
        const authUrl = await dbx.auth.getAuthenticationUrl(redirectUrl);
        console.log(authUrl);
      },
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
  
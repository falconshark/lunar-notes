<template>
  <el-card class="box-card">
    <div class="connect-card-inner">
        <img class="img-fluid connect-card-icon" src="/images/dropbox.png"/> 
        <div class="connect-card-text">
            Oh! It's look like you had not connect any cloud drive yet. <br/>
            Connect it before start using.
            <a href="#" class="btn btn-primary connect-button">Connect</a>
        </div>
    </div>
  </el-card>
</template>
  
  <script>
  export default {
    name: 'Dashboard',
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
  
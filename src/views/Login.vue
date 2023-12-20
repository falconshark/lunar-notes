<template>
  <div class="login">
    <el-container class="login-wrapper">
      <el-main>
        <img class="img-fluid logo" src="../assets/logo.png" />
        <h1 class="main-title">Note Taking</h1>
        <div class="login-form">
          <el-form ref="form" :model="form">
            <el-form-item label="Username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <button class="btn btn-primary login-button" @click.prevent="login">Login</button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      form:{
        username: '',
        password: '',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
}
.main-title{
  margin-top: 20px;
}
.login-wrapper{
  position: relative;
  bottom: 90px;

  .page-title{
    color: black;
    margin-top: 20px;
  }

  .login-form{
    max-width: 510px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;


    .login-button{
      width: 100%;
      text-transform: uppercase;
      font-size: 1.3em;
      margin-top: 20px;
    }
  }
}
</style>

<template>
  <div class="login">
    <el-container class="login-wrapper">
      <el-main>
        <img class="img-fluid logo" src="../assets/logo.png" />
        <h1 class="main-title">Note Taking App</h1>
        <div class="login-form">
          <el-form ref="form" :model="form">
            <el-form-item label="Password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <button class="btn btn-primary login-button" @click.prevent="startLogin">Login</button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCommonStore } from '../stores/common'

export default {
  name: 'Login',
  data(){
    return{
      form:{
        password: '',
      },
    }
  },
  methods: {
    //Simple login function.
    startLogin(){
      const store = useCommonStore();
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
      const formPassword = this.form.password;
      if(adminPassword === formPassword){
        this.login();
        this.$router.push({ name: 'Dashboard'} );
      }
    },
    ...mapActions(useCommonStore, ['login'])
  },
  computed: {
    ...mapState(useCommonStore, ['isLogin'])
  },
}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  padding-top: 100px;
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

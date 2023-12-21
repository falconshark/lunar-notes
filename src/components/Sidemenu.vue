<template>
  <div class="sidemenu">
    <div class="logo-sidemenu">
      <div class="sidemenu-title">
        Falcon
      </div>
    </div>
    <el-menu
    :default-active="activeIndex"
    class="sidemenu-menu"
    background-color="#3E3F3A"
    text-color="#fff"
    active-text-color="#ffd04b">
    <div class="menu-item-wrapper" v-for="menuItem in menuItems">
      <router-link :to="menuItem.link" :key="menuItem.index" v-if="menuItem.type == 'menu-item'">
        <el-menu-item :index="menuItem.index">
          <i :class="menuItem.icon"></i>
          {{ menuItem.title }}
        </el-menu-item>
      </router-link>

      <el-submenu :index="menuItem.index" :key="menuItem.index" v-if="menuItem.type == 'submenu'">
        <template slot="title">
          <i :class="menuItem.icon"></i>
          <span slot="title">{{ $t(menuItem.title) }}</span>
        </template>
        <router-link :to="subItem.link" :index="subItem.index" :key="subItem.index" v-for="subItem in menuItem.submenu">
          <el-menu-item :index="subItem.index">
            {{ subItem.title }}
          </el-menu-item>
        </router-link>
      </el-submenu>
    </div>
  </el-menu>
</div>
</template>

<script>

export default {
  name: 'Sidebar',
  data(){
    return{
      activeIndex: '1',
      menuItems: [
        {
          'index': '1',
          'type': 'menu-item',
          'icon': 'el-icon-menu',
          'title': 'Dashboard',
          'link': '/dashboard',
        },
        {
          'index': '2',
          'type': 'submenu',
          'icon': 'el-icon-s-order',
          'title': 'Notes',
          'submenu': [
            {
              'index': '2-1',
              'title': 'Notes',
              'link': '/notes',
            },
            {
              'index': '2-2',
              'title': 'Notebook',
            },
          ],
        },
      ],
    };
  },
  mounted(){
    this.checkActive();
  },
  methods:{
    //Check current active menu item
    checkActive(){
      let activeIndex = '';
      const currentPath = window.location.pathname;
      for(let i = 0; i < this.menuItems.length; i++){
        const menuItem = this.menuItems[i];
        //If the menu item do not had submenu
        if(menuItem.type === 'menu-item'){
          if(menuItem.link === currentPath){
            activeIndex = menuItem.index;
            return;
          }
        }else{
          //If the menu item had submenu
          menuItem['submenu'].forEach(function(item){
            if(item.link === currentPath){
              activeIndex = item.index;
              return;
            }
          });
        }
      }
      this.activeIndex = activeIndex;
    },
  },
}
</script>

<style scoped lang="scss">
.logo-sidemenu{
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 25px;
  color: white;
  display: flex;
  align-items: center;
  img{
    width: 30%;
  }
}
.sidemenu{
  width: 270px;
  background: #3E3F3A;
  overflow: hidden;
  overflow-y: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh;

  a{
    color: white;
    &:hover{
      text-decoration: none;
    }
  }

  .sidemenu-menu{
    border-right: 0;
  }
}
</style>

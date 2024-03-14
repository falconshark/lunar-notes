<template>
  <div class="sidemenu">
    <ul class="sidemenu-links">
      <li class="sidemenu-link" v-for="menuItem in menuItems">
        <router-link :to="menuItem.link" v-if="menuItem.type === 'menu-item'" :title="menuItem.title">
          <i :class="menuItem.icon"></i>
          {{ menuItem.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Sidemenu',
  data() {
    return {
      activeIndex: '1',
      menuItems: [
        {
          'index': '1',
          'type': 'menu-item',
          'icon': 'bi bi-house-door-fill',
          'title': 'Home',
          'link': '/',
        },
        {
          'index': '2',
          'type': 'menu-item',
          'icon': 'bi bi-pencil-fill',
          'title': 'Notes',
          'link': '/notes',
        },
        {
          'index': '3',
          'type': 'menu-item',
          'icon': 'bi bi-book-fill',
          'title': 'Notebooks',
          'link': '/notebooks',
        },
        {
          'index': '4',
          'type': 'menu-item',
          'icon': 'bi bi-gear-fill',
          'title': 'Settings',
          'link': '/settings',
        },
      ],
    }
  },
  mounted() {
    this.checkActive();
  },
  methods: {
    //Check current active menu item
    checkActive() {
      let activeIndex = '';
      const currentPath = window.location.pathname;
      for (let i = 0; i < this.menuItems.length; i++) {
        const menuItem = this.menuItems[i];
        //If the menu item do not had submenu
        if (menuItem.type === 'menu-item') {
          if (menuItem.link === currentPath) {
            activeIndex = menuItem.index;
            return;
          }
        } else {
          //If the menu item had submenu
          menuItem['submenu'].forEach(function (item) {
            if (item.link === currentPath) {
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
.logo-sidemenu {
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 25px;
  color: white;
  font-size: 1.3em;
  font-weight: bold;
  display: flex;
  align-items: center;

  img {
    width: 30%;
  }
}

.sidemenu {
  width: 170px;
  background: #38434E;
  overflow: hidden;
  overflow-y: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh;
  padding-top: 20px;

  .sidemenu-links{
    padding-left: 15px;
    list-style: none;
    li{
      margin-bottom: 10px;
    }
  }

  a {
    color: white;
    font-size: 16px;
    display: block;
    width: 100%;

    &:hover {
      text-decoration: none;
    }
  }

  .bi {
    margin-right: 10px;
    font-size: 1.3em;

    &.bi-filter-square-fill {
      margin-right: 16px;
    }
  }

  .sidemenu-menu {
    border-right: 0;
  }
}
</style>

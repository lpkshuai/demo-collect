<template>
  <el-container class="container">
    <el-aside width="320px"><AsideMenu :menuData="menuData"></AsideMenu></el-aside>
    <el-main>
      <keep-alive :exclude="[]"><router-view></router-view></keep-alive>
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/AsideMenu.vue';
export default {
  name: 'MenuTest',
  components: {
    AsideMenu
  },
  data() {
    return {
      menuData: [
        {
          title: '菜单一',
          path: '/menutest/menu1',
          icon: require('@/assets/icons/apply.svg'),
          iconActive: require('@/assets/icons/apply_active.svg'),
          children: [
            {
              title: '子菜单一',
              path: '/menutest/menu1/menu1-1'
            },
            {
              title: '子菜单二',
              path: '/menutest/menu1/menu1-2'
            }
          ]
        },
        {
          title: '菜单二',
          path: '/menutest/menu2',
          icon: require('@/assets/icons/apply.svg'),
          iconActive: require('@/assets/icons/apply_active.svg'),
          // disabled: true,
          children: [
            {
              title: '子菜单一',
              path: '/menutest/menu2/menu2-1'
            },
            {
              title: '子菜单二',
              path: '/menutest/menu2/menu2-2',
              children: [
                {
                  title: '孙子菜单一',
                  path: '/menutest/menu2/menu2-2/menu2-1-1'
                },
                {
                  title: '孙子菜单二',
                  path: '/menutest/menu2/menu2-2/menu2-2-2'
                }
              ]
            },
            {
              title: '子菜单三',
              path: '/menutest/menu2/menu2-3'
            }
          ]
        },
        {
          title: '菜单三',
          path: '/menutest/menu3',
          icon: require('@/assets/icons/apply.svg'),
          iconActive: require('@/assets/icons/apply_active.svg'),
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 800px;
}
.el-main {
  padding: 32px 40px;
  box-sizing: border-box;
  background: #f5f5fa;
  overflow-y: auto;
}
</style>

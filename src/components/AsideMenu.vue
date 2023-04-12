<template>
  <aside class="wrap">
    <el-menu
      :default-active="activeMenu"
      router
      :class="'menu-left'"
      :default-openeds="openedsArr"
      text-color="#fff"
    >
      <AsideSubMenu :menuData="menuData"></AsideSubMenu>
    </el-menu>
  </aside>
</template>

<script>
// import { mapState } from "vuex";
import AsideSubMenu from "./AsideSubMenu.vue";
export default {
  name: "AsideMenu",
  components: {
    AsideSubMenu,
  },
  props: {
    menuData: {
      type: Array,
    },
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.matchPath) {
        return meta.matchPath;
      } else {
        return path;
      }
    },
    openedsArr() {
      // const arr = this.menuData.map((item) => {
      //   return item.title;
      // });
      // return arr;
      return [];
    },
    // ...mapState({
    //   currentTheme: (state) => {
    //     return state.common.currentTheme;
    //   },
    // }),
  },
};
</script>

<style scoped>
aside {
  height: 100%;
  text-align: center;
}
.el-menu {
  padding: 16px;
  box-sizing: border-box;
}
/* 深色 */
.menu-left,
.menu-left /deep/ .el-menu {
  min-height: 100%;
  background-color: #222653;
}
.menu-left .icon {
  width: 20px;
  margin-right: 9px;
}
.menu-left /deep/.el-submenu__title,
.menu-left /deep/.el-menu-item {
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: left;
  color: #b3c0e7 !important;
  background-color: #222653 !important;
}
.menu-left /deep/.el-submenu__title i {
  color: #b3c0e7 !important;
}
.menu-left /deep/.el-submenu__title {
  height: 54px;
  line-height: 54px;
  /* padding-left: 36px !important; */
}
.menu-left /deep/ .el-menu-item {
  height: 52px;
  line-height: 52px;
}
.menu-left /deep/.el-submenu .el-menu-item {
  padding-left: 45px !important;
}
/* 外层高亮 */
.menu-left /deep/.el-submenu.is-active,
.menu-left /deep/.el-submenu.is-active .el-menu-item,
.menu-left /deep/.el-submenu.is-active .el-submenu__title,
.menu-left /deep/.el-menu-item.is-active {
  background-color: #4880ff !important;
}
.menu-left /deep/.el-submenu.is-active {
  border-radius: 10px;
  overflow: hidden;
}
.menu-left /deep/ .el-menu-item.is-active {
  border-radius: 10px;
}
.menu-left /deep/ .el-menu--inline .el-menu-item.is-active,
.menu-left /deep/ .el-submenu.noIcon {
  border-radius: 0;
}
.menu-left /deep/ .el-submenu.noIcon .el-submenu__title {
  padding-left: 45px !important;
}
.menu-left /deep/ .el-submenu.noIcon .el-menu-item {
  padding-left: 58px !important;
}
.menu-left /deep/.el-submenu.is-active > .el-submenu__title,
.menu-left /deep/.el-submenu.is-active > .el-submenu__title i {
  color: #ffffff !important;
}
/* 内层高亮 */
.menu-left /deep/.el-menu-item:focus,
.menu-left /deep/.el-menu-item:hover,
.menu-left /deep/.el-menu-item.is-active {
  color: #ffffff !important;
  font-weight: 500;
}
.menu-left /deep/.el-menu-item.is-disabled {
  padding-left: 45px !important;
  color: #ffffff !important;
}

/* 浅色 */
/* .menu-left-light {
  height: 100%;
  background-color: #f8f8f8;
}
.menu-left-light .icon {
  width: 20px;
  margin-right: 9px;
}
.menu-left-light /deep/.el-submenu__title,
.menu-left-light /deep/.el-menu-item {
  box-sizing: border-box;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: left;
  color: #333333;
}
.menu-left-light /deep/.el-submenu__title {
  height: 52px;
  line-height: 52px;
  padding-left: 56px !important;
}
.menu-left-light /deep/.el-submenu__title:hover {
  background-color: #ffffff !important;
}
.menu-left-light /deep/.el-submenu__icon-arrow {
  right: 85px;
}
.menu-left-light /deep/.el-submenu__title i {
  color: #333333;
}
.menu-left-light /deep/.el-menu-item {
  height: 40px;
  line-height: 40px;
  padding-left: 82px !important;
  border-left: 4px solid #ffffff;
}
.menu-left-light /deep/.el-menu-item:focus,
.menu-left-light /deep/.el-menu-item:hover,
.menu-left-light /deep/.el-menu-item.is-active {
  background: rgba(31, 65, 219, 0.1) !important;
  color: #1f41db !important;
  border-color: #1f41db;
}
.menu-left-light /deep/.el-menu-item.is-disabled {
  background: #ffffff !important;
  color: #333333 !important;
} */
</style>

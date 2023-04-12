<template>
  <div>
    <template v-for="item in menuData">
      <el-submenu
        :key="item.path"
        v-if="item.children && item.children.length > 0"
        :index="item.path"
        :class="item.icon ? '' : 'noIcon'"
      >
        <template slot="title">
          <img
            class="icon mr-r-10"
            :src="
              curRoute.indexOf(item.path) != -1 ? item.iconActive : item.icon
            "
          />
          <span>{{ item.title }}</span>
        </template>
        <AsideSubMenu :menuData="item.children"></AsideSubMenu>
      </el-submenu>
      <el-menu-item
        :key="item.id"
        v-else
        :index="item.path"
        :disabled="item.disabled"
      >
        <template slot="title">
          <img
            class="icon mr-r-10"
            :src="
              curRoute.indexOf(item.path) != -1 ? item.iconActive : item.icon
            "
          />
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import AsideSubMenu from "./AsideSubMenu.vue";
export default {
  name: "AsideSubMenu",
  components: {
    AsideSubMenu,
  },
  props: {
    menuData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    curRoute() {
      return this.$route.path;
    },
  },
};
</script>
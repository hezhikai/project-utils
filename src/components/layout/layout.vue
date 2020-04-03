<template>
  <div class="flex_row layout">
    <div class="layout_sidebar">
      <base-menu></base-menu>
    </div>
    <div class="flex_column layout_body">
      <div class="layout_header">
        <base-navigation></base-navigation>
      </div>
      <div class="layout_tags">
        <tags-view></tags-view>
      </div>
      <div class="layout_main">
        <keep-alive>
          <router-view :key="$route.path"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import baseNavigation from './baseNavigation';
  import baseMenu from './baseMenu';
  import tagsView from './tagsView';

  export default {
    name: 'layout',
    components: {
      baseNavigation,
      baseMenu,
      tagsView
    },
    data() {
      return {};
    },
    mounted() {},
    methods: {}
  };
</script>
<style lang="less" scoped>
  .layout {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .layout_sidebar {
    width: 200px;
  }
  .layout_body {
    flex: 1;
  }
  .layout_header {
    height: 80px;
  }
  .layout_tags {
    height: 80px;
  }
  .layout_main {
    flex: 1;
  }
</style>

<template>
  <div class="flex_row layout">
    <div class="layout_sidebar" :class="{ isFold: isFold }">
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
        <keep-alive :include="visitedViews">
          <router-view :key="$route.path" id="router"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
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
      return {
        isFold: false //导航栏是否折叠
      };
    },
    computed: {
      ...mapGetters(['visitedViews'])
    },
    mounted() {
      window.subject.listen('foldTriggle', (isFold) => {
        this.isFold = isFold;
      });
    },
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
    position: relative;
    z-index: 1;
    width: 240px;
    min-height: 100%;
    background-color: #001529;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: all 0.2s;
    &.isFold {
      width: 64px;
    }
  }
  .layout_body {
    flex: 1;
    overflow: auto;
  }
  .layout_header {
    height: 64px;
  }
  .layout_tags {
    margin-top: 12px;
  }
  .layout_main {
    flex: 1;
  }
</style>

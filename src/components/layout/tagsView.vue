<template>
  <div class="tagsView">
    <el-tabs
      :value="curView"
      type="card"
      closable
      @tab-remove="removeViewTab"
      @tab-click="moveToViewTab"
      v-if="showTabs"
    >
      <el-tab-pane
        v-for="(item, index) in visitedViews"
        :key="item.path"
        :label="item.name"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'tagsView',
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['visitedViews', 'activeView']),
      curView() {
        return this.activeView ? this.activeView.path : '';
      },
      showTabs() {
        return (
          this.$route.name !== '首页' &&
          this.visitedViews &&
          this.visitedViews.length > 0
        );
      }
    },
    watch: {
      $route() {
        this.addViewTag();
      }
    },
    mounted() {
      this.addViewTag();
    },
    methods: {
      addViewTag() {
        this.$store.dispatch('changeActiveView', this.$route);
        if (this.$route.name !== '首页') {
          this.$store.dispatch('addVisitedViews', this.$route);
        }
      },
      moveToViewTab(view) {
        const formatView = {
          name: view.label,
          path: view.name,
          fullPath: view.name
        };
        this.$router.push(formatView.path);
        this.$store.dispatch('changeActiveView', formatView);
      },
      removeViewTab(name) {
        this.$store.dispatch('delVisitedView', { path: name });
      }
    }
  };
</script>

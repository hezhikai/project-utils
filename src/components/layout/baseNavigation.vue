<template>
  <div class="flex_row baseNavigation">
    <div class="baseNavigation_trigger" @click="triggle">
      <i :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
    <div class="flex_row baseNavigation_right">
      <div class="baseNavigation_item">
        <i class="el-icon-user"></i>
        <span>游客</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'baseNavigation',
    data() {
      return {
        isFold: false //导航栏是否折叠
      };
    },
    mounted() {},
    methods: {
      triggle() {
        this.isFold = !this.isFold;
        window.subject.trigger('foldTriggle', this.isFold);
      }
    }
  };
</script>
<style lang="less" scoped>
  .baseNavigation {
    align-items: center;
    height: 64px;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  .baseNavigation_trigger {
    height: 64px;
    padding: 0 24px;
    font-size: 24px;
    line-height: 64px;
    cursor: pointer;
    transition: all 0.3s, padding 0s;
  }
  .baseNavigation_right {
    float: right;
    height: 64px;
    margin-left: auto;
    overflow: hidden;
    font-size: 20px;
    line-height: 64px;
  }
  .baseNavigation_item {
    align-items: center;
    height: 100%;
    padding: 0 12px;
    // cursor: pointer;
    transition: all 0.3s;
    i {
      vertical-align: middle;
    }
    span {
      margin-left: 8px;
      font-size: 16px;
    }
  }
</style>

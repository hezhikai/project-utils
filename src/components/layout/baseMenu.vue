<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>word 工具</span>
      </template>
      <el-menu-item index="1-4-1">excel 工具</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    name: 'baseMenu',
    data() {
      return {
        activeIndex: '1'
      };
    }
  };
</script>

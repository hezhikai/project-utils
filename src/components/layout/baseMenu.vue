<template>
  <div class="baseMenu">
    <div class="flex_row baseMenu_title" @click="toHome">
      <img src="@/assets/images/utils.png" alt="" />
      <h1 v-if="!isFold">HE 工具库</h1>
    </div>
    <el-menu
      class="baseMenu_menu"
      :default-active="activeMenu"
      :collapse="isFold"
      :default-openeds="defaultOpeneds"
    >
      <el-submenu
        v-for="menu in menus"
        :index="menu.id"
        :popper-append-to-body="false"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          v-for="subMenu in menu.children"
          :index="subMenu.id"
          @click="routePush(subMenu)"
        >
          <i :class="subMenu.icon"></i>
          <span>{{ subMenu.name }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'baseMenu',
    data() {
      return {
        menus: [
          {
            name: 'Office 工具',
            id: '11',
            icon: 'el-icon-document',
            path: '/office',
            children: [
              {
                name: 'Excel工具',
                id: '1101',
                icon: 'el-icon-document-copy',
                path: '/office/excel'
              },
              {
                name: '其他工具',
                id: '1102',
                icon: 'el-icon-s-tools',
                path: '/office/other'
              }
            ]
          }
        ],
        activeMenu: '',
        defaultOpeneds: [],
        isFold: false
      };
    },
    computed: {
      ...mapGetters(['visitedViews', 'activeView'])
    },
    watch: {
      activeView(value) {
        if (value.path === this.$store.getters.homePage) {
          this.defaultOpeneds = [];
          this.activeMenu = '';
        }
        for (let i = 0; i < this.menus.length; i++) {
          if (value.path.split('/')[1] === this.menus[i].path.split('/')[1]) {
            this.defaultOpeneds = [this.menus[i].id];
          }
          for (let j = 0; j < this.menus[i].children.length; j++) {
            if (this.menus[i].children[j].path === value.path) {
              this.activeMenu = this.menus[i].children[j].id;
            }
          }
        }
      }
    },
    mounted() {
      window.subject.listen('foldTriggle', (isFold) => {
        this.isFold = isFold;
      });
    },
    methods: {
      toHome() {
        this.$router.push(this.$store.getters.homePage);
      },
      routePush(subMenu) {
        this.$router.push(subMenu.path);
      }
    }
  };
</script>
<style lang="less" scoped>
  @boardbackground: #001529;
  @itemBackground: #000c17;
  @activeColor: #1890ff;
  @fontColor: hsla(0, 0%, 100%, 0.65);
  @whiteColor: #fff;
  .baseMenu {
    height: 100%;
  }
  .baseMenu_title {
    position: relative;
    height: 64px;
    padding: 0 16px;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    background-color: @boardbackground;
    transition: all 0.3s;
    h1 {
      display: inline-block;
      margin: 0 0 0 12px;
      font-size: 20px;
      font-weight: 600;
      color: @whiteColor;
      vertical-align: middle;
      transition: all 0.2s;
    }
  }
  .baseMenu_menu {
    padding: 16px 0;
  }
  /deep/ .el-menu {
    background: @boardbackground;
    border: none;
    .el-submenu__title {
      color: @fontColor;
      &:hover {
        color: @whiteColor;
        background: @boardbackground;
      }
    }
    .el-menu-item {
      color: @fontColor;
      background: @itemBackground;
      &:hover {
        color: @whiteColor;
        background: @itemBackground;
      }
      &.is-active {
        color: @whiteColor;
        background-color: @activeColor;
      }
    }
  }
</style>

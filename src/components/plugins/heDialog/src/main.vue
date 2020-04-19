<template>
  <div class="heDialog">
    <re-dialog
      :visible="dialogVisible"
      @close="closeCallback"
      @closed="closed"
      @open="open"
      v-bind="dialogBind"
      v-on="filterListeners"
    >
      <template slot="title">
        <slot name="title">
          <span class="el-dialog__title">{{ title }}</span>
        </slot>
      </template>
      <div class="dj-dialog-content" v-if="isOpen">
        <slot></slot>
      </div>
      <div
        class="dj-dialog-footer"
        :class="hasFooter ? '' : 'has-footer'"
        slot="footer"
      >
        <slot name="footer" v-if="hasFooter">
          <el-button @click="closeCallback">取 消</el-button>
          <slot name="footer-confirm">
            <el-button type="primary" @click="confirm" :loading="loading"
              >确 认</el-button
            >
          </slot>
        </slot>
      </div>
    </re-dialog>
  </div>
</template>

<script>
  import reDialog from './reDialog';

  const DEFAULT_DIALOG_CONFIG = {
    top: '0',
    'close-on-click-modal': false,
    'append-to-body': true
  };

  export default {
    name: 'heDialog',
    provide() {
      return {
        dialog: this
      };
    },
    components: {
      reDialog
    },
    props: {
      // 弹窗插入的 dom 节点位置，与 element 源码逻辑一致；默认插入到路由的节点， false 时插入到 body
      appendElementId: {
        default: 'router'
      },
      title: {
        default: '标题'
      },
      hasFooter: {
        default: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        isOpen: false,
        appendElement: ''
      };
    },
    computed: {
      filterListeners() {
        return ['close', 'open'].reduce(
          (sum, key) => {
            delete sum[key];
            return sum;
          },
          { ...this.$listeners }
        );
      },
      dialogBind() {
        let _Bind = Object.assign({}, DEFAULT_DIALOG_CONFIG, this.$attrs);
        return _Bind;
      }
    },
    methods: {
      confirm() {
        this.$emit('confirm');
      },
      open() {
        this.dialogVisible = true;
        this.isOpen = true;
      },
      closed() {
        this.isOpen = false;
      },
      closeCallback() {
        this.dialogVisible && this.$emit('close');
      },
      close() {
        this.dialogVisible = false;
      }
    }
  };
</script>
<style lang="less" scoped>
  .heDialog {
    /deep/.el-dialog__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

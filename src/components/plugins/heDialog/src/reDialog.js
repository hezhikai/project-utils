import { Dialog } from 'element-ui'; //2.13.0
const _Dialog = Object.assign({}, Dialog);
// 重写 mounted、destroyed、watch 事件
delete _Dialog.mounted;
delete _Dialog.destroyed;
delete _Dialog.watch;

export default {
  extends: _Dialog,
  inject: ['dialog'],
  mounted() {
    this.dialog.appendElement = document.getElementById(
      this.dialog.appendElementId
    );
    // appendToBody 为 true，且 appendElement 存在，插入到 appendElement 中
    // appendToBody 为 true，且 appendElement 不存在，插入到 body 中
    // appendToBody 为 false，插入到父节点中
    if (this.appendToBody) {
      if (this.dialog.appendElement) {
        this.dialog.appendElement.appendChild(this.dialog.$el);
      } else {
        document.body.appendChild(this.dialog.$el);
      }
    }
    if (this.visible) {
      this.rendered = true;
      this.open();
    }
  },
  destroyed() {
    if (this.appendToBody && this.dialog.$el && this.dialog.$el.parentNode) {
      this.dialog.$el.parentNode.removeChild(this.dialog.$el);
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
        if (this.appendToBody) {
          if (this.dialog.appendElement) {
            this.dialog.appendElement.appendChild(this.dialog.$el);
          } else {
            document.body.appendChild(this.dialog.$el);
          }
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper);
        if (!this.closed) this.$emit('close');
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++;
          });
        }
      }
    }
  }
};

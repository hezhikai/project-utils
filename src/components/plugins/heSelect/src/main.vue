<template>
  <div class="heSelect">
    <span v-if="label">{{ label }}</span>
    <el-select
      :style="{ width: width + 'px' }"
      :value="query"
      :multiple="type === 'multiple'"
      v-bind="getBind()"
      v-on="filterListeners"
      @input="valueChange"
    >
      <el-option
        v-for="(item, index) in _options"
        :key="getLabel(item) + getValue(item) + index"
        :label="getLabel(item)"
        :value="getValue(item)"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
  const DEFAULT_SELECT_ATTRS = {
    clearable: true,
    size: 'medium'
  };
  const DEFAULT_KEYMAP = {
    label: 'label',
    value: 'value'
  };
  export default {
    name: 'heSelect',
    props: {
      value: {},
      label: {
        default: null
      },
      type: {
        default: 'single'
      },
      width: {
        type: Number,
        default: null
      },
      bindObject: {
        type: Boolean,
        default: false
      },
      default: {
        default: undefined
      },
      keyMap: {
        type: Object,
        default: () => {}
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        query: undefined
      };
    },
    computed: {
      filterListeners() {
        return ['input'].reduce(
          (sum, key) => {
            delete sum[key];
            return sum;
          },
          { ...this.$listeners }
        );
      },
      _options() {
        return this.options || [];
      },
      _keyMap() {
        return { ...DEFAULT_KEYMAP, ...this.keyMap };
      }
    },
    watch: {
      value() {
        if (this.type === 'multiple') {
          this.query = this.value || [];
        } else {
          this.query = this.value;
        }
      }
    },
    created() {
      if (this.type === 'multiple') {
        this.query =
          Array.isArray(this.value) && this.value.length
            ? this.value
            : this.default || [];
      } else {
        this.query = this.value !== undefined ? this.value : this.default;
      }
    },
    mounted() {
      if (this.value !== this.query) {
        this.$emit('change', this.query);
      }
    },
    methods: {
      getLabel(item) {
        if (item[this._keyMap.label] !== undefined) {
          return item[this._keyMap.label];
        } else if (item[this._keyMap.value] !== undefined) {
          return item[this._keyMap.value];
        } else {
          return item;
        }
      },
      getValue(item) {
        if (this.bindObject) {
          return item;
        } else if (item[this._keyMap.value] !== undefined) {
          return item[this._keyMap.value];
        } else {
          return item;
        }
      },
      getBind() {
        return {
          ...DEFAULT_SELECT_ATTRS,
          valueKey: this.bindObject ? this.keyMap_.value : undefined,
          ...this.$attrs
        };
      },
      valueChange(val) {
        console.log(val);
        this.$emit('input', val);
      }
    }
  };
</script>
<style lang="less" scoped>
  .heSelect {
    display: inline-block;
    margin-right: 24px;
    > span {
      margin-right: 12px;
    }
  }
</style>

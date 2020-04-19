<template>
  <div class="heTable">
    <el-table
      v-loading="loading"
      :data="data"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        v-for="column in columns"
      >
        <template slot-scope="scope">
          <component
            v-if="column.component"
            :is="column.component"
            v-bind="getBind(scope)"
            v-on="column.listeners"
          ></component>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  /**
   * 校验 columns
   * @param {array} arr column数组
   * @returns {boolean} 校验是否通过
   */
  function columnsValidator(arr) {
    let map = {};
    let lackProp = false;
    let reduplicateProp = false;
    for (let obj of arr) {
      if (!obj['prop']) {
        lackProp = true;
      } else {
        if (map[obj['prop']]) {
          reduplicateProp = true;
        } else {
          map[obj['prop']] = true;
        }
      }
    }
    if (lackProp) {
      console.warn(`tableColumns:缺少'prop'属性`);
      return false;
    }
    if (reduplicateProp) {
      console.warn(`tableColumns:'prop'属性的值必须唯一`);
      return false;
    }
    return true;
  }
  export default {
    name: 'heTable',
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        default: () => [],
        validator: columnsValidator
      }
    },
    data() {
      return {};
    },
    mounted() {},
    methods: {
      getBind(scope) {
        let { row, column, self, store } = scope;
        return { row, column, self, store };
      }
    }
  };
</script>
<style lang="less" scoped>
  .heTable {
  }
</style>

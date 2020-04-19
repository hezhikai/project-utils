<template>
  <he-dialog
    ref="heDialog"
    title="匹配相同列"
    :has-footer="false"
    @close="close"
    @closed="closed"
    width="80%"
  >
    <div class="flex_row">
      <he-select
        v-model="filterData"
        v-bind="filterOptions"
        @change="filterColumn"
      ></he-select>
      <div class="confirmPart">
        <he-select v-model="confirmData" v-bind="confirmOptions"></he-select>
        <el-button
          type="primary"
          :disabled="tableData.length === 0"
          @click="confirm"
          >复制所选字段</el-button
        >
      </div>
    </div>
    <he-table
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
    ></he-table>
  </he-dialog>
</template>
<script>
  export default {
    name: 'matchColumnDialog',
    props: {
      excelTables: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        filterData: '',
        filterOptions: {
          label: '筛选',
          options: this.excelTables[0].column,
          keyMap: {
            label: 'label',
            value: 'prop'
          }
        },
        confirmData: '',
        confirmOptions: {
          label: '选择复制字段',
          options: this.excelTables[1].column,
          keyMap: {
            label: 'label',
            value: 'prop'
          }
        },
        tableData: [],
        tableLoading: false
      };
    },
    computed: {
      tableColumns() {
        let columns = this.excelTables[1].column;
        let tableColumns = columns.map((item) => {
          return {
            prop: item.prop,
            label: item.label,
            component: {
              props: ['row', 'column'],
              render() {
                return (
                  <div>
                    <div>{this.row[this.column.property]}</div>
                    {this.row.otherRow.map((data) => {
                      return <div>{data[this.column.property]}</div>;
                    })}
                  </div>
                );
              }
            }
          };
        });
        tableColumns.unshift({
          prop: 'select',
          label: '选择',
          component: {
            props: ['row', 'column'],
            data() {
              return {
                radio: ''
              };
            },
            render() {
              if (this.row.onlyOne) {
                return <span></span>;
              } else {
                return (
                  <el-radio-group
                    value={this.radio}
                    on-input={this.changeRadio}>
                    <div>
                      <el-radio label={1}></el-radio>
                    </div>
                    {this.row.otherRow.map((item, index) => {
                      return (
                        <div>
                          <el-radio label={index + 2}></el-radio>
                        </div>
                      );
                    })}
                  </el-radio-group>
                );
              }
            },
            methods: {
              changeRadio(val) {
                this.radio = val;
                let selectedRow =
                  val === 1 ? this.row : this.row.otherRow[val - 2];
                this.$emit('input', selectedRow);
              }
            }
          },
          listeners: {
            input: (selectedRow) => {
              this.selectRadio(selectedRow);
            }
          }
        });
        return tableColumns;
      }
    },
    mounted() {
      this.$refs.heDialog.open();
      console.log(this.excelTables);
    },
    methods: {
      /**
       * 选择对比列信息
       * @param {string} val 所选列
       */
      filterColumn(val) {
        this.tableData = [];
        let map = {};
        let indexMap = {};
        this.excelTables[0].data.forEach((item) => {
          map[item[val]] = 1;
        });
        this.excelTables[1].data.forEach((item) => {
          // 找出相同的数据，第一条数据作为 row ，其他数据作为 otherRow 存放
          if (map[item[val]] === 1) {
            this.tableData.push({ ...item, onlyOne: true, otherRow: [] });
            indexMap[item[val]] = this.tableData.length - 1;
          } else if (map[item[val]] > 1) {
            let itemIndex = indexMap[item[val]];
            this.tableData[itemIndex].onlyOne = false;
            this.tableData[itemIndex].otherRow.push(item);
          }
          map[item[val]]++;
        });
      },
      /**
       * 选择行内单选框
       * @param {object} row 当前所选行
       */
      selectRadio(row) {
        for (let i = 0; i <= this.tableData.length; i++) {
          if (this.tableData[i][this.filterData] === row[this.filterData]) {
            this.tableData[i] = {
              ...this.tableData[i],
              selectedRow: row
            };
            return;
          }
        }
      },
      /**
       * 确认
       */
      confirm() {
        if (!this.confirmData) {
          this.$message({
            type: 'error',
            message: '请先选择复制字段'
          });
          return;
        }
        let selectedTableData = this.getSelectedTableData();
        if (selectedTableData.length > 0) {
          this.copyField(selectedTableData);
        }
      },
      /**
       * 获取已选的 table 数据
       * @returns {array} 已选的 table 数据
       */
      getSelectedTableData() {
        let selectedTableData = [];
        for (let i = 0; i < this.tableData.length; i++) {
          if (!this.tableData[i].onlyOne && !this.tableData[i].selectedRow) {
            this.$message({
              type: 'error',
              message: '存在单选框未选择！'
            });
            return [];
          } else if (this.tableData[i].onlyOne) {
            selectedTableData.push(this.tableData[i]);
          } else if (
            !this.tableData[i].onlyOne &&
            this.tableData[i].selectedRow
          ) {
            selectedTableData.push(this.tableData[i].selectedRow);
          }
        }
        console.log(selectedTableData);
        return selectedTableData;
      },
      /**
       * 复制字段
       * @param {array} selectedTableData 所选 table 数据
       */
      copyField(selectedTableData) {
        let selectedField = selectedTableData.map((item) => {
          return item[this.confirmData];
        });
        let lineFeedField = selectedField.join('\n');
        console.log(lineFeedField);
        this.$methods.copyText(lineFeedField);
      },
      close() {
        this.$refs.heDialog.close();
      },
      closed() {
        this.$emit('closed');
      }
    }
  };
</script>
<style lang="less" scoped>
  .confirmPart {
    flex: 1;
    text-align: right;
  }
</style>

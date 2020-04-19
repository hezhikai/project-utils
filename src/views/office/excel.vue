<template>
  <page-container>
    <div class="flex_row">
      <el-upload
        ref="upload"
        action="/"
        :auto-upload="false"
        :multiple="false"
        :show-file-list="false"
        :drag="true"
        :on-change="changeFile"
        accept=".xlsx, .xls"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <em>点击上传</em>
          <p>（支持 .xlsx, .xls 文件）</p>
        </div>
      </el-upload>
      <div class="btn_group">
        <el-button
          type="primary"
          @click="matchColumn"
          :disabled="excelTables.length === 0"
          >匹配相同列</el-button
        >
      </div>
    </div>
    <div class="flex_row">
      <he-table
        class="excelTable"
        v-for="table in excelTables"
        v-if="table.column"
        :data="table.data"
        :columns="table.column"
      ></he-table>
    </div>
    <match-column-dialog
      ref="matchColumnDialog"
      :excel-tables="excelTables"
      v-if="matchColumnFlag"
      @closed="matchColumnFlag = false"
    ></match-column-dialog>
  </page-container>
</template>

<script>
  import pageContainer from '@/components/pageContainer';
  import matchColumnDialog from './excelModules/matchColumnDialog';
  import XLSX from 'xlsx';

  export default {
    name: 'excel',
    components: {
      pageContainer,
      matchColumnDialog
    },
    data() {
      return {
        xlsxData: [],
        excelTables: [],
        matchColumnFlag: false
      };
    },
    mounted() {},
    methods: {
      /**
       * 本地文件上传
       * @param {object} 本地文件
       */
      changeFile(file) {
        let fileReader = new FileReader();
        fileReader.onload = this.readXlsx;
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file.raw);
      },
      /**
       * 解析 excel
       * @param {object} 二进制文件对象
       */
      readXlsx(event) {
        // 以二进制流方式读取得到整份excel表格对象
        let workbook = XLSX.read(event.target.result, {
          type: 'binary'
        });
        this.xlsxData = [];
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets[sheet]['!ref']) {
            let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            this.xlsxData.push(sheetData);
          }
        }
        this.transformTableData();
        console.log(this.xlsxData);
      },
      /**
       * 将 excel 数据转化成 table 数据
       */
      transformTableData() {
        let excelTables = this.xlsxData.map((items) => {
          let invalid = items.filter((item) => {
            let keys = Object.keys(item);
            // 存在 __EMPTY 列表示不符合 table 展示规则
            let hasEmpty = keys.filter((key) => {
              return key.indexOf('__EMPTY') > -1;
            });
            return hasEmpty.length > 0;
          });
          // 如果数据不满足 table 展示规则，则不展示 table
          if (invalid.length > 0) {
            return [];
          } else {
            return {
              column: Object.keys(items[0]).map((key) => {
                return {
                  prop: key,
                  label: key
                };
              }),
              data: items
            };
          }
        });
        this.excelTables = excelTables.filter((item) => {
          return item.column && item.data;
        });
      },
      /**
       * 匹配相同列
       */
      matchColumn() {
        this.matchColumnFlag = true;
      }
    }
  };
</script>
<style lang="less" scoped>
  .excelTable {
    flex: 1;
    padding: 8px;
  }
  .btn_group {
    margin: 0 6px;
  }
  .el-button {
    margin: 6px;
  }
</style>

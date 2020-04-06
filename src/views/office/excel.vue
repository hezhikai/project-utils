<template>
  <page-container>
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
        将文件拖到此处，或<em>点击上传</em>
        <p>（只能上传 .xlsx, .xls 文件）</p>
      </div>
    </el-upload>
  </page-container>
</template>

<script>
  import pageContainer from '@/components/pageContainer';
  import XLSX from 'xlsx';
  export default {
    name: 'excel',
    components: {
      pageContainer
    },
    data() {
      return {
        xlsxData: []
      };
    },
    mounted() {},
    methods: {
      changeFile(file) {
        let fileReader = new FileReader();
        fileReader.onload = this.readXlsx;
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file.raw);
      },
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
        console.log(this.xlsxData);
      }
    }
  };
</script>

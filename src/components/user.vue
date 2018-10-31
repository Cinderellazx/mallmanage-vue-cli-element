<template>
<div class="box-card">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="searchArea">
        <el-input placeholder="请输入内容" class="input-with-select searchInput">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary">添加用户</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="#" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
      </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get('users?pagenum=1&pagesize=10')
      console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        console.log(data.users)
        this.tableData = data.users
      }
    }
  }
}
</script>

<style>
.box-card {
    height: 100%;
}

.searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
}

.searchArea .searchInput {
    width: 350px;
}
</style>

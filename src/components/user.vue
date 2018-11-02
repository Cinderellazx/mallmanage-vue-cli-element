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
        <el-button type="primary" @click="showAddDia()">添加用户</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.create_time | fmtData}}
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="checkUserState(scope.row.id, scope.row.mg_state)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plant circle
            @click="open2(scope.row.id)"></el-button>
      </template>
        </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAddUser">
      <el-form :model="formData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddUser = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 2,
      total: 1,
      formLabelWidth: '120px',
      dialogFormVisibleAddUser: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    open2 (uId) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${uId}`)
        // console.log(res)
        const {msg} = res.data.meta
        this.loadTableData()
        this.$message({
          type: 'success',
          message: msg
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async addUser () {
      this.dialogFormVisibleAddUser = false
      const res = await this.$http.post('users', this.formData)
      // console.log(res)
      const {msg, status} = res.data.meta
      if (status === 201) {
        this.$message.success(msg)
        this.loadTableData()
      }
    },
    showAddDia () {
      this.dialogFormVisibleAddUser = true
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadTableData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadTableData()
    },
    async checkUserState (uId, state) {
      const res = await this.$http.put(`users/${uId}/state/${state}`)
      // console.log(res)
      const {status, msg} = res.data.meta
      if (status === 200) {
        this.$message.success(msg)
      }
    },
    async loadTableData () {
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?pagenum=${this.currentPage}&pagesize=${this.pageSize}`)
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.total = data.total
        // console.log(data.users)
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

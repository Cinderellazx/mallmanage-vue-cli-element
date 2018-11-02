<template>
  <div class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="addBtn">添加角色</el-button>
    <el-table
      :data="roles"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain circle></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            plain circle></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      roles: []
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get('roles')
      console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.roles = data
      }
    }
  }
}
</script>

<style>
.box-card {
    height: 100%;
}
.addBtn {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>

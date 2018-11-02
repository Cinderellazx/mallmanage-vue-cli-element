<template>
  <div class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
      <el-table
        :data="rights"
        border
        style="width: 100%">
        <el-table-column
          fixed
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级"
          width="180">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rights: []
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get('rights/list')
      console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.rights = data
      }
    }
  }
}
</script>

<style>

</style>

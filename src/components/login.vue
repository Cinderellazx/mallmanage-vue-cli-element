<template>
<div>
    <h2>用户登录</h2>
    <el-form label-position="top" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
            <el-input v-model="formdata.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="formdata.region"></el-input>
        </el-form-item>
        <el-button type="primary">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        name: '',
        password: ''
      }
    }
  }
}
</script>

<style>

</style>

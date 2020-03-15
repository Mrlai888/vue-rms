<template>
  <div class='login_page'>
    <div class="login_connect">
      <div class="login_container">
    <el-form
      :model='ruleForm'
      status-icon
      ref='ruleForm'
      class='demo-ruleForm'
    >
      <el-form-item
      prop='username'
      :rules="[
      { required: true, message: '用户名不能为空', trigger: 'blur'},
      { min: 4, max: 10, message: '用户不能少于4位大于10位', trigger: ['blur', 'change'] }

    ]"
      >
      <el-input v-model="ruleForm.username" autocomplete='off' aria-placeholder="请输入用户名"  prefix-icon="iconfont icon-yonghu">
      </el-input>
      </el-form-item>

      <el-form-item
      prop='password'
      :rules="[
      { required: true, message: '密码不能为空', trigger: 'blur'},
      { min: 6, message: '密码不能小于6位数', trigger: 'blur'},
      { max: 12, message: '密码不能大于12位数', trigger: 'blur'}
    ]"
      >
        <el-input type='password' v-model="ruleForm.password" autocomplete='off' aria-placeholder="请输入密码" prefix-icon="iconfont icon-mima">
        </el-input>
      </el-form-item>
      <el-form-item class="login_bottom">
        <el-button type='primary' @click="submitForm('ruleForm')" class="sub_button">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, FormItem, Input, Button, Message } from 'element-ui'
import Axios from 'axios'
import { showLoading, hideLoading } from '../api/loading'
Vue.prototype.$message = Message
Vue.use(Form).use(FormItem).use(Input).use(Button)
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      }

    }
  },
  methods: {
    submitForm (formName) {
      showLoading()
      this.$refs[formName].validate((valid, a) => {
        if (valid) {
          // alert('submit!')
          // console.log(this.ruleForm.username)
          Axios.post('login', this.ruleForm).then(res => {
            const { data } = res
            console.log(data)
            if (data.meta.status === 200) {
              window.sessionStorage.setItem('token', data.data.token)
              this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success',
                duration: 1000
              })
              setTimeout(() => {
                hideLoading()
              }, 1000)
              this.$router.push('/home')
              console.log(window.sessionStorage.getItem('token'))
            } else {
              // console.log('登录失败')
              this.$message({
                showClose: true,
                message: '登录失败',
                type: 'error',
                duration: 1000
              })
              setTimeout(() => {
                hideLoading()
              }, 1000)
            }
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
    body{
      height: 100%;
    .login_page{
      background: skyblue;
      min-height: 800px;
      // position: relative;
      .login_connect{
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 10px;
        background: white;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        .login_container{
        position: absolute;
        background: white;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width:90%;
          .demo-ruleForm{
            margin-top: 150px;
          }
        }
        .login_bottom{
          display: flex;
          align-items: flex-end;
          justify-content: flex-end
        }
      }
    }
    }
</style>

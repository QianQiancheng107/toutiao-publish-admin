<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-head">
        <h1>黑马头条文章发布系统</h1>
      </div>
      <el-form ref="form" :rules="rules" :model="user">
        <el-form-item prop="mobile">
          <el-input prefix-icon="el-icon-user" v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input prefix-icon="el-icon-unlock" v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已同意并阅读用户条款协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class='login-btn' type="primary" @click="onLogin('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        agree: false
      },
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }

        ]

      }

    }
  },
  created: {
  },
  methods: {
    onLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login () {
      login(this.user).then(res => {
        console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('登陆失败，手机号或验证码错误')
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/loginBg.png");
  .login-form {
    background: #fff;
    opacity: 0.7;
    padding: 10px 60px 50px;
    min-width: 300px;
    border-radius: 10px;
    box-shadow: 3px 5px 10px 16px rgb(255 255 255 / 40%) inset,
      5px 4px 10px rgb(0 0 0 / 30%);
    .login-head {
      color: dodgerblue;
      margin-bottom: 30px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="login-container">
    <div class="modal">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >

        <div class="title-container">
          <h3>Login Form</h3>
        </div>

        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="input"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-view"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
          >
            Login
          </el-button>
        </el-form-item>

        <div class="tips-container">
          <div class="tips">
            <span style="margin-right: 18px">Username : admin</span>
            <span>Password : any</span>
          </div>
          <div class="tips">
            <span style="margin-right: 18px">Username : normal</span>
            <span>Password : any</span>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vh;
  height: 100vh;
  margin: auto;
  .modal {
    width: 360px;
    height: 360px;
    box-shadow: 0 0 10px 5px #ddd;
    padding: 50px;
    border-radius: 5px;
    .login-form {
      .title-container {
        text-align: center;
      }

      .tips-container {
        padding: 0 10px;
        .tips {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>

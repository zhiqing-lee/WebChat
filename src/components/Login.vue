<template>

  <div class="login">
    <title-bar title="欢迎使用"></title-bar>

    <div class="login-form">
      <input type="email" placeholder="请输入您的邮箱" v-model="email">
      <input type='text' placeholder="请输入您的名字" v-model="name" v-show="status === 'register'">
      <input type="password" v-show="status === 'login' || status === 'register'" placeholder="请输入您的密码" v-model="password">
      <input type="password" placeholder="请再次输入您的密码" v-show="status === 'register'" v-model="rePassword">
      <a class="btn" href="#" @click="action">{{ button }}</a> 
    </div>

  </div>

</template>

<script>
import {
  LOGIN,
  REGISTER,
  CHECK_USER,
  SHOW_NOTICE,
} from '@/types/action-types';
import TitleBar from '@/components/common/TitleBar';
import util from '@/util';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      name: '',
      status: 'initial',
      password: '',
      rePassword: '',
      errorMessage: '',
    };
  },
  created() {
  },
  computed: {
    button() {
      let button = '开始';
      if (this.status === 'login') {
        button = '登录';
      }
      if (this.status === 'register') {
        button = '注册';
      }
      if (this.status === 'waiting') {
        button = '请等待...';
      }
      return button;
    },
    self() {
      return this.$store.state.self;
    },
  },
  methods: {
    action() {
      const vm = this;
      if (!vm.validateEmail()) return;
      if (vm.status === 'register') {
        if (!vm.validateName()) {
          return;
        }
      }
      if (vm.status === 'login' || vm.status === 'register') {
        if (!vm.password) {
          vm.warn('请输入密码！');
          return;
        }
      }
      if (vm.status === 'register') {
        if (vm.password !== vm.rePassword) {
          vm.warn('两次密码输入不一致！');
          return;
        }
      }
      const preStatus = vm.status;
      vm.status = 'waiting';
      if (preStatus === 'initial') {
        this.init();
      } else if (preStatus === 'login') {
        this.login();
      } else if (preStatus === 'register') {
        this.register();
      }
    },
    init() {
      const vm = this;
      vm.$store.dispatch(CHECK_USER, vm.email)
        .then((result) => {
          if (result === 'exist') {
            vm.status = 'login';
          } else {
            vm.status = 'register';
          }
        });
    },
    login() {
      const vm = this;
      vm.$store.dispatch(LOGIN, {
        email: vm.email,
        password: vm.password,
      }).then(() => {
        vm.loginSuccess();
      }).catch(() => {
        vm.status = 'initial';
      });
    },
    register() {
      const vm = this;
      vm.$store.dispatch(REGISTER, {
        email: vm.email,
        name: vm.name,
        password: vm.password,
      }).then(() => {
        vm.loginSuccess();
      }).catch((err) => {
        vm.errorMessage = err;
      });
    },
    loginSuccess() {
      this.$router.replace('/chat');
    },
    validateEmail() {
      const email = this.email;
      if (!email) {
        this.warn('请输入邮箱地址！');
        return false;
      }
      if (!util.validateEmail(this.email)) {
        this.warn('请输入正确的邮箱地址！');
        return false;
      }
      return true;
    },
    validateName() {
      const name = this.name;
      if (!name) {
        this.warn('请输入名称！');
        return false;
      }
      if (!util.validateName(this.name)) {
        this.warn('名称只能包含汉字、字母、数字与下划线，且长度在1~15之间！');
        return false;
      }
      return true;
    },
    warn(message) {
      this.$store.dispatch(SHOW_NOTICE, { message, type: 'warning', timeout: 3000 });
    },
  },
  components: {
    TitleBar,
  },

};
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-form {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  margin-bottom: 10px;
}
</style>



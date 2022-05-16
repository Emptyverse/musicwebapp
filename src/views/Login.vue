<template>
  <div class="login">
    <svg class="icon" aria-hidden="true" @click="backHome">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
//导入获取用户信息方法
import { getLoginUser } from "@/request/api/swiper.js";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    Login: async function () {
      //
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      console.log(res);
      //判断返回码是否为200  若为200成功跳转到个人中心里InfoUser
      if (res.data.code == 200) {
        //跳转前将个人中心的显示状态设为true
        this.$store.commit("updateIsLogin", true);
        //跳转前保存token
        this.$store.commit("updateToken", res.data.token);
        //跳转前获取用户信息
        let result = await getLoginUser(res.data.account.id);
        //把用户信息result提交到vuex的state中
        this.$store.commit("updateUser", result);
        sessionStorage.setItem("user", JSON.stringify(result));
        // console.log(result);
        //InfoUser中有v-show属性还需要修改该属性为true
        this.$router.push("/InfoUser");
      } else {
        alert("密码错误");
        //密码错误清空密码
        this.password = "";
      }
    },
    backHome: function() {
          this.$router.push('/')
      }
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 18rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn {
      width: 2rem;
      height: 0.6rem;
    }
  }
}
</style>

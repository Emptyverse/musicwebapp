<template>
  <div class="infoUserTop">
    <van-nav-bar class="navBar" fixed :border="false">
      <template #left>
        <van-icon name="arrow-left" class="icon" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-nav" class="icon" />
      </template>
    </van-nav-bar>
    <div class="infoUserBody">
      <img :src="user.data.profile.avatarUrl" alt="" class="profileimg" />
      <div class="name">{{ user.data.profile.nickname }}</div>
    </div>
    <div class="funList">
      <van-cell
        title="关于"
        icon-prefix="my-icon"
        icon="about"
        is-link
        to="/about"
      />
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";
export default {
  created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(this.user);
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    backHome: function () {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="less" scoped>
.infoUserTop {
  .navBar {
    position: sticky;
    transition: background-color 0.6s ease-in-out;
    top: 0;
    .icon {
      font-size: 0.5rem;
      color: #70acff;
    }
  }
  .infoUserBody {
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .profileimg {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .name {
      font-weight: 700;
      font-size: 0.4rem;
    }
  }
  .funList {
    width: 30%;
    border-radius: .32rem;
    background-color: #fff;
    margin: .4rem auto;
    overflow: hidden;
  }
}
</style>
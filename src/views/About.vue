<template>
  <div>
    <!-- 头部组件 -->
    <van-nav-bar fixed placeholder :border="false" class="navbar">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template v-slot:title> 关于Musicwebapp </template>
    </van-nav-bar>
    <!-- 主体内容 -->
    <div class="content">
      <div class="logo">
        <img src="../assets//lufei.jpg" />
      </div>
      <p>这个项目是使用<b>Vue3</b>版本编写的</p>
      <p>使用的UI框架为<b>Vant</b></p>
      <p>接口为<b>binaryify</b>大佬的网易云接口</p>
      <p>我只实现了部份功能，作为vue框架的练手项目</p>
      <p>UI风格参照了<b>网易云音乐APP</b></p>
      <p>可能会有Bug...</p>
      <p>目前登录功能已经还不够完善 后期再尝试添加吧</p>
      <p>也请注意<b>账号安全</b></p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.navBar {
  position: sticky;
  transition: background-color 0.6s ease-in-out;
  top: 0;
  .icon {
    font-size: 0.5rem;
    color: red;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .6rem;
  .logo {
    margin-bottom: 10%;
    width: 2rem;
    height: 2rem;
    > img {
      width: inherit;
      height: inherit;
    }
  }
  > p {
    font-size: .28rem;
    color: #5b5b5b;
    line-height: .6rem;
  }
}
</style>
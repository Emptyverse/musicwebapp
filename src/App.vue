<template>
  <!-- 路由中配置了HomeView 当前地址若为该组件的映射的地址 就显示HomeView -->
  <router-view/>
  <FooterMusic v-show="$store.state.isFooterMusic"></FooterMusic>
</template>

<script>
import FooterMusic from "@/components/item/FooterMusic.vue"
export default {
  components: {
    FooterMusic
  }
}
</script>

<style lang="less">
//配置全局样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;//怪异盒子？
}
//配置icon样式
.icon {
  width: .5rem;
  height: .5rem;
}
</style>

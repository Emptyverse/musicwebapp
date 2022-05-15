<template>
  <div class="home">
    <!-- 3、使用组件 导入的组件标签放在这就等于把该组件内容显示在这 -->
    <TopNav></TopNav>
    <Swiper></Swiper>
    <IconList></IconList>
    <MusicList></MusicList>
  </div>
</template>

<script>
// @ is an alias to /src
// 1、引入各种组件
import TopNav from"@/components/home/TopNav.vue";
import Swiper from"@/components/home/Swiper.vue";
import IconList from"@/components/home/IconList.vue";
import MusicList from"@/components/home/MusicList.vue"

export default {
  name: 'HomeView',
  //2、注册组件
  components: {
    TopNav,//key value 同名可以简写成一个
    Swiper,
    IconList,
    MusicList
  }
}
</script>

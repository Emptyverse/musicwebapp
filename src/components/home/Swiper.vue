<template>
  <div id="swiper">
    <van-swipe :autoplay="3000" lazy-render>
      <!-- 遍历的数据变成了由axios请求获取的响应式数据state.images，而非之前的假数据 -->
      <van-swipe-item v-for="image in state.images" :key="image">
        <!-- 具体的src是在res.data.banners.pic上的，即state.images.pic 这里遍历出来的image.pic -->
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios";
import { getBanner } from "@/request/api/swiper.js";
import { reactive, onMounted } from "vue";

export default {
  // vue3新增的api
  setup() {
    //将数据转换成响应式 这是vue3的 后期再补知识
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      //   console.log(res);
      //   state.images=res.data.banners
      //   console.log(state.images);
      // })
      let res = await getBanner();
      state.images = res.data.banners;
    //console.log(res);
    });
    return { state };
  },
};
</script>

<style lang="less">
//为什么不能加scoped?
//样式选择器是个轮播 要去浏览器找
#swiper {
  // 在这上面添加一个div 避免和其他轮播图的id冲突
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.1rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: red;
    }
  }
}
</style>
<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">推荐歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <!-- 自定义轮播图 -->
      <van-swipe
        :loop="false"
        :width="130"
        class="mySwipe"
        :show-indicators="false"
      >
        <!-- 遍历musicList 获取每一个item数组 -->
        <van-swipe-item v-for="item in state.musicList" :key="item">
            <!-- router-link包裹的元素 点击后会进行路由跳转 query传的应该是一个对象-->
          <router-link :to="{path:'/itemMusic', query:{id: item.id}}">
            <!-- picUrl为获取到的图片地址 -->
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <!-- 图片上的icon图标 -->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              <!-- 播放量 -->
              {{ changeCount(item.playCount) }}
            </span>
            <!-- 歌单相关描述 -->
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
//导入歌单列表请求方法
import { getMusicList } from "@/request/api/swiper.js";
import { reactive, onMounted } from "vue";
export default {
  //   data() {
  //     return {
  //       musicList: [], //定义接收歌单列表的数据的数组容器
  //     };
  //   },
  //   methods: {
  //     async getRecomList() {
  //       let res = await getMusicList(); //异步调用歌单列表请求方法
  //       console.log(res);
  //       this.musicList = res.data.result; //接收歌单轮播数据
  //     },
  //     //添加一个函数 改变播放量数据单位 也可以写成计算属性
  //     changeCount: function (num) {
  //       if (num >= 100000000) {
  //         return (num / 100000000).toFixed(1) + "亿";
  //       } else if (num >= 10000) {
  //         return (num / 10000).toFixed(1) + "万";
  //       }
  //     },
  //   },
  //   mounted() {
  //     this.getRecomList();
  //   },
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      //console.log(res);
      state.musicList = res.data.result;
    });
    return { state, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;
    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
  //因为router-link标签相当于一个a标签 所以包裹在里面的都是链接 字体因此变蓝 这里改回黑色
  a {
      color: black;
  }
}
</style>
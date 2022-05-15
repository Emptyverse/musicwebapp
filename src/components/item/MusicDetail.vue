<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <!-- 头部左边 -->
    <div class="detailTopLeft">
      <!-- 左箭头 -->
      <!-- 左箭头点击调用updateDetailShow方法改变弹出框状态 -->
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <!-- 获取歌曲名字 -->
        <Vue3Marquee>{{ musicList.al.name }}</Vue3Marquee>
        <!-- <p>{{ musicList.al.name }}</p> -->
        <!-- 获取歌手名字 多个歌手需要遍历 -->
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}
        </span>
        <!-- 还有一个小小的右箭头 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <!-- 头部右方 -->
    <div class="detailTopRight">
      <!-- 分享图标 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <!-- 中间内容部分 -->
  <div class="detailContent" v-show="isLyricShow">
    <!-- 磁针 img_needle 这个样式绑定不太懂-->
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <!-- 磁盘 img_cd-->
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <!-- 歌手图片 img_ar 绑定动态样式-->
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      @click="isLyricShow = false"
      :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }"
    />
  </div>
  <!-- 歌词部分 -->
  <div class="musicLyric" ref="musicLyric" v-show="!isLyricShow">
    <!-- 遍历歌词数组 -->
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.next,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent"></div>
    <!-- 进度条 max进度条最大值 来自于audio的duration属性 随着当前播放时间移动 step为步数-->
    <input
      type="range"
      class="range"
      min="0"
      :max="duration"
      v-model="currentTime"
      step="0.05"
    />
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!-- 播放图标添加点击事件play play是由父组件FooterMusic传过来的 -->
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <!-- 暂停图标添加点击事件play play是由父组件FooterMusic传过来的 -->
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
//引入走马灯marquee
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      isLyricShow: true,
    };
  },
  computed: {
    ...mapState([
      "lyricList", //歌词列表
      "currentTime", //当前时间 从
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric: function () {
      //定义一个数组
      let arr;
      //判断是否已经获取到歌词
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        //获取下一句歌词时间
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = 100000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
      }
      //   console.log(arr);
      return arr;
    },
  },
  mounted() {
    //挂载完就调用获取歌曲总时长 动态绑定进度条max值
    this.addDuration();
    // console.log(this.musicList);
  },
  //由父组件传过来
  props: ["musicList", "play", "isbtnShow", "addDuration"],
  methods: {
    //切换歌曲方法
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    //返回箭头按钮点击触发
    backHome: function () {
      //磁盘显示
      setTimeout(() => {
        this.isLyricShow = true;
      }, 500);
      //更新侧边栏歌曲详情页显示状态
      this.updateDetailShow();
    },
    //解构之前的歌曲详情页的弹出层状态 弹出层有true和false状态 打开关闭
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
  //注册组件
  components: {
    Vue3Marquee,
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(50px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 2rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    //磁针原始样式
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0; //原点 绕原点旋转
    transform: rotate(-13deg); //角度
    transition: all 2s;
  }
  .img_needle_active {
    //磁针触发播放时的样式
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  //图片样式 设计旋转动画
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    //动画：rotate_ar动画名字 时间10s linear匀速 infinite无线循环
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running; //控制动画启动
  }
  .img_ar_paused {
    animation-play-state: paused; //控制动画暂停
  }
  @keyframes rotate_ar {
    //动画旋转
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }
  //播放到当前时间的歌词时的样式
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
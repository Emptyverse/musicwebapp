<template>
  <div class="footerMusic" >
      <!-- 添加点击事件触发updateDetailShow方法修改修改弹出层显示状态 -->
    <div class="footerLeft" @click="updateDetailShow">
      <!-- 动态绑定src属性获取对应的歌曲背景 -->
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <!-- 获取歌曲名字 {{}} 插值语法 -->
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首噢</span>
      </div>
    </div>
    <div class="footerRight">
      <!-- 添加播放按钮点击事件 -->
      <!-- 添加图标点击事件 触发paly方法  v-if是判断暂停和播放图标的显示 -->
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <!-- 通过audio标签的src来获取歌曲来播放，使用模板字符串 ${id}来传递歌曲id值 controls属性是为了显示播放按钮-->
    <!-- 添加ref属性为了从$refs中获取标签元素 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <!-- 歌曲详情页弹出层 使用MusicDetail组件 -->
    <!-- 传递需要的参数和函数给歌曲详情页 MusicDetail组件要用props属性接收 父传子-->
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }" >
        <MusicDetail :musicList="playList[playListIndex]" :play="play"
        :isbtnShow="isbtnShow" :addDuration="addDuration"></MusicDetail>
    </van-popup>

  </div>
</template>

<script>
//导入mapState辅助函数返回一个对象 ...解构state里面的数据 用playList playListIndex 来接收 因此同名所以省略成一个单词
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue"
export default {
  data() {
    return {
      interval: 0
    }
  },
  computed: {
    //isbtnShow是暂停和播放的状态 true为暂停
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"])
  },
  // 挂载完之后也要触发
  mounted() {
    // 触发vuex的store中的getLyric方法 并传参 可能是因为是在函数里 所以添加this指向外层组件实例
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
  },
  // updated生命周期钩子： 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
  // 这个应该是数据变更后再获取
  updated() {
    // 触发vuex的store中的getLyric方法 并传参 可能是因为是在函数里 所以添加this指向外层组件实例
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
  },
  methods: {
    //定义播放放
    play: function () {
      //需要先判断当前是否为暂停状态 如果为暂停 则this.$refs.audio.paused==true
      if (this.$refs.audio.paused) {
        //若为暂停状态 则调用audio标签元素的播放方法
        this.$refs.audio.play();
        //更新图标显示状态为false 即为播放
        this.updateIsbtnShow(false);
        //播放时触发时间更新函数
        this.updateTime()
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        //暂停时清除定时器
        clearInterval(this.interval);
      }
    },
    //添加总时长 传递到vuex
    addDuration: function() {
      this.updateDuration(this.$refs.audio.duration)
    },
    //每秒更新当前播放时间
    updateTime: function() {
      this.interval = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      },1000)
    },
    //从vuex中结构出方法 更新图标状态方法
    ...mapMutations(["updateIsbtnShow", "updateDetailShow", "updateCurrentTime", "updateDuration"]),
  },
  watch: {
      //监听palyListIndex歌曲下标是否发生变化，变化了就启动自动播放
      playListIndex: function() {
          //启动自动播放
          this.$refs.audio.autoplay = true;
          //若为暂停则把IsbtnShow属性置为false 即为播放状态
          if(this.$refs.audio.paused) {
              this.updateIsbtnShow(false);
          }
      },
      //侦听playList歌单列表是否发生变化，变化就做判断
      playList: function() {
          //如果为暂停状态，为啥要这样判断 因为如果本来就是播放状态就不必了
          if(this.isbtnShow) {
              //启动自动播放
              this.$refs.audio.autoplay = true;
              //修改状态为播放
              this.updateIsbtnShow(false);
          }
      }
  },
  components: {
    MusicDetail
  }
};
</script>

<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center; //垂直居中
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
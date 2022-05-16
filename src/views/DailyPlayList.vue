<template>
  <div id="dailyPlayList">
    <!-- 头部组件 -->
    <van-nav-bar
      fixed
      :border="false"
      :class="{ navbar: !isScroll, navbar_scroll: isScroll }"
    >
      <template #left>
        <van-icon name="arrow-left" class="icon" @click="$router.go(-1)" />
      </template>
      <template #title>
        <span class="title">每 日 推 荐</span>
      </template>
    </van-nav-bar>
    <div class="headerBox">
      <div class="date">{{ today }}</div>
      <div class="history">历史日推</div>
    </div>
    <div class="playall">
      <van-icon class="icon" name="play-circle" />
      <span class="txt">播放全部</span>
    </div>
    <div class="itemList">
      <!-- 歌曲列表遍历 遍历出来的item即为一首歌曲 v-for必须绑定key -->
      <div class="item" v-for="(item, i) in dailySongs" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <!-- item.name为歌曲名 item.ar为歌手数组 遍历数组得到所有歌手 -->
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <!-- 遍历以下歌曲信息是否有mv 有的话显示mv图标 -->
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
    <!-- <div class="songList">
      <div
        class="songItem"
        v-for="item in dailySongs"
        :key="item.id"
        @click="playThisMusic(item.id)"
      >
        <van-image :src="item.al.picUrl" fit="cover" class="pic" />
        <div class="info">
          <div class="title">
            <div class="name van-ellipsis">
              {{ item.name }}
              <span class="otherName" v-if="item.alia[0]">
                ({{ item.alia[0] }})
              </span>
            </div>
            <div class="reason van-ellipsis">
              {{ reasonMsg(item.id) }}
            </div>
          </div>
          <div class="artists van-ellipsis">
            <span class="artist" v-for="(ar, index) in item.ar" :key="index">
              <span v-if="index === item.ar.length - 1"> {{ ar.name }} </span>
              <span v-else> {{ ar.name }} / </span>
            </span>
            <span class="by"> - {{ item.al.name }} </span>
          </div>
        </div>
        <van-icon
          class-prefix="my-icon"
          :class="{ icon: true, notmv: !item.mv }"
          name="mv"
        />
        <van-icon class-prefix="my-icon" class="icon" name="col_ellipsis" />
      </div>
    </div> -->
    <!-- 加载组件 -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getDailyRecom } from "../request/api/item.js";
export default {
  data() {
    return {
      isScroll: false,
      // 日推歌曲列表
      dailySongs: [],
      // 推荐理由列表
      recommendReasons: [],
      // 当前歌单的id列表
      songidlist: [],
    };
  },
  methods: {
    // 点击列表里的歌曲实现播放
    playMusic: function (i) {
      // 调用vuex中mutations里的方法----store文件夹中的js文件
      //更新playlist 触发FooterMusic组件中的数据变化
      this.updatePlayList(this.dailySongs);
      //更新歌曲下标 传入上面遍历的i数据
      this.updatePlayListIndex(i);
    },
    async getDailyRecomSong() {
      // 获取每日推荐歌曲
      let { data: res } = await getDailyRecom();
      if (res.code === 200) {
        // 保存歌曲列表
        this.dailySongs = res.data.dailySongs;
        // 保存推荐理由列表
        // this.recommendReasons = res.data.recommendReasons;
        // 保存日推歌单的id列表
        // for (let i = 0; i < res.result.length; i++) {
        //   this.songidlist.push(res.result[i].id);
        // }
      }
    },
    topNavigationChange() {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > 200) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    },
    //利用mapMutations 解构获取方法 当然上面要先导入
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
  computed: {
    today: function () {
      let D = new Date();
      let m = D.getMonth() + 1;
      let d = D.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return `Day${d}/ Month${m}`;
    },
  },
  mounted() {
    this.getDailyRecomSong();
    window.addEventListener("scroll", this.topNavigationChange);
  },
};
</script>

<style lang="less" scoped>
#dailyPlayList {
  background-color: #fff;
  .navbar {
    background-color: transparent;
    .icon {
      font-size: 0.4rem;
      margin-left: --0.12rem;
    }
    .title {
      display: true;
      font-weight: 700;
    }
  }
  .navbar_scroll {
    background-image: linear-gradient(
      67.2deg,
      rgba(37, 208, 199, 1) -7.5%,
      rgba(165, 90, 240, 1) 62.7%
    );
    .icon {
      font-size: 0.4rem;
      margin-left: --0.12rem;
    }
    .title {
      display: block;
    }
  }
  .headerBox {
    height: 3.6rem;
    background-image: linear-gradient(
      67.2deg,
      rgba(37, 208, 199, 1) -7.5%,
      rgba(165, 90, 240, 1) 62.7%
    );
    position: relative;
    color: #fff;
    .date {
      position: absolute;
      font-family: Verdana;
      font-size: 0.4rem;
      bottom: 1.2rem;
      left: 0.2rem;
    }
    .history {
      position: absolute;
      bottom: 0.4rem;
      left: 0.2rem;
      font-size: 0.2rem;
      width: 1.2rem;
      height: 0.48rem;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 0.3rem;
      text-align: center;
      line-height: 0.48rem;
    }
  }
  .playall {
    background-color: #fff;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    align-items: center;
    margin-left: 0.1rem;
    position: sticky;
    top: 0.92rem;
    z-index: 2;
    .icon {
      font-size: 0.4rem;
      color: #1499ee;
    }
    .txt {
      font-size: 0.28rem;
      margin-left: 0.12rem;
    }
  }
  // .songList {
  //   .songItem {
  //     height: 1.2rem;
  //     width: 100%;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-around;
  //     .pic {
  //       width: .8rem;
  //       height: .8rem;
  //       border-radius: .08rem;
  //       overflow: hidden;
  //     }
  //     .info {
  //       .title {
  //         width: 5rem;
  //         display: flex;
  //         .name {
  //           width: 4rem;
  //           font-size: .28rem;
  //           .otherName {
  //             color: #939393;
  //           }
  //         }
  //         .reason {
  //           margin-top: 3px;
  //           height: .28rem;
  //           max-width: 1rem;
  //           line-height: .28rem;
  //           font-size: .2rem;
  //           background-color: #fffcd7;
  //           color: #ceb45e;
  //         }
  //       }
  //       .artists {
  //         margin-top: .04rem;
  //         width: 5.2rem;
  //         font-size: .2rem;
  //         color: #939393;
  //       }
  //     }
  //     .icon {
  //       font-size: .28rem;
  //       color: #1499ee;
  //     }
  //     .notmv {
  //       color: rgba(147, 147, 147, 0.4);
  //     }
  //   }
  // }
  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon {
          fill: #999;
        }
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
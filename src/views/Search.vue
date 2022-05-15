<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="杨雨衡"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <span>历史</span>
    <span
      v-for="item in keyWordList"
      :key="item"
      class="spanKey"
      @click="searchHistory(item)"
    >
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from "@/request/api/swiper.js";
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  //挂载后从本地存储localStorage中获取历史记录 可能为空
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList"))
      ? JSON.parse(localStorage.getItem("keyWordList"))
      : [];
  },
  methods: {
    enterKey: async function () {
      //把关键字添加到历史关键字数组中 unshift从头添加 表示最新搜索
      this.keyWordList.unshift(this.searchKey);
      //用Set去重再解构为参数 再用数组[]包裹
      this.keyWordList = [...new Set(this.keyWordList)];
      // 固定长度 不能大于10
      if (this.keyWordList.length > 10) {
        this.keyWordList.splice(this.keyWordList.length - 1, 1);
      }
      //将关键字存入本地存储
      localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
      //搜索关键字获取歌曲
      let res = await getSearchMusic(this.searchKey);
      //   console.log(res);
      this.searchList = res.data.result.songs;
      //清空关键字
      this.searchKey = "";
    },
    //删除历史
    delHistory: function () {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    //点击搜索历史关键字来获取歌曲
    searchHistory: async function (item) {
      let res = await getSearchMusic(item);
      //   console.log(res);
      this.searchList = res.data.result.songs;
    },
    updateIndex: function (item) {
        //可能是因为接口不同 返回的数据属性名不一样 所以这里要改回来 才能传到底部组件FooterMusic中
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      //push到播放列表的最后位置
      this.$store.commit("pushPlayList", item);
      //具体播放最后一首歌
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
.itemList {
  width: 100%;
  padding: 0.2rem;
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
</style>
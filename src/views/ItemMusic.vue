<template>
  <!-- 3、使用组件 将数据state.playlist传给ItemMusicTop组件 并用props接收-->
  <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
  <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicListItem, getMusicListSong } from "@/request/api/item.js";
//1、导入组件ItemMusicTop
import ItemMusicTop from "@/components/item/ItemMusicTop";
import ItemMusicList from "@/components/item/ItemMusicList";

export default {
  setup() {
    const state = reactive({
      playlist: {},
      itemList: [],
    });
    onMounted(async () => {
      //获取推荐歌单轮播图的id
      let id = useRoute().query.id;
      // console.log(id);
      // console.log(useRoute())

      //Ⅰ---获取整个歌单详情   
      let res = await getMusicListItem(id);
      console.log(res);
      // 一定要注意：res.data.playlist和我们在state中设置的playList大小写不一样 我进坑了 - -  最后全改为palylist了 0 0
      state.playlist = res.data.playlist;
      // console.log(state.playList);

      //Ⅱ ---获取歌单列表的所有歌曲
      let result = await getMusicListSong(id)
      state.itemList = result.data.songs
      console.log(result);
      //将state获取的数据放进sessionStorage里面以key value的形式存放
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
  //2、注册组件
  components: {
    ItemMusicTop,
    ItemMusicList
  },
};
</script>
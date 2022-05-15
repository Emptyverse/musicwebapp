import { createStore } from 'vuex'
import { getMusicLyric } from "@/request/api/item.js"
//导入获取收集登陆方法
import {getPhoneLogin} from "@/request/api/swiper.js"

export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar:[{name: "灏灏灏仔"}]
    }],
    playListIndex: 0, //默认歌曲下标为0
    isbtnShow: true, //暂停或播放图标的显示状态 true为暂停状态
    detailShow: false, //歌曲详情页的显示
    lyricList:{},//歌词
    currentTime:0,//当前播放时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
    token:"",
    user:{},//用户信息
  },
  getters: {
  },
  mutations: {
    // 修改state中的isbtnShow的值 来更新暂停和播放图标的显示状态
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
      // console.log(value);
    },
    // 更新playList 传入itemList
    updatePlayList: function (state, value) {
      state.playList = value
      // console.log(state.playList);
    },
    // 更新playListIndex歌曲下标 传入下标value
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
      // console.log(value);
    },
    //更新详情页打开关闭状态 不需要传其他参数
    updateDetailShow: function (state) {
      //直接取反
      state.detailShow = !state.detailShow
    },
    //更新歌词列表 由actions里面commit过来
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    //更新当前播放时间
    updateCurrentTime:function(state,value){
      // console.log(state.currentTime);
      state.currentTime=value
    },
    //更新歌曲总时长
    updateDuration:function(state,value){
      state.duration=value
    },
    //搜索组件中 点击歌曲把该歌曲添加到playList中
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    //更改登陆状态 影响的是个人页面的显示
    updateIsLogin:function(state,value){
      state.isLogin=true
    },
    //token的更新
    updateToken:function(state,value){
      state.token = value
      //同时保存到localStorage
      localStorage.setItem('token',state.token)
    },
    //更新用户信息
    updateUser:function(state,value){
      state.user = value
      // console.log(value)
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      // console.log(res);
      context.commit("updateLyricList",res.data.lrc)
    },
    //实现登陆
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value);
      console.log(res);
      return res
    }
  },
  modules: {
  }
})

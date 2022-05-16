<template>
  <van-popup
    v-model:show="show"
    position="left"
    close-on-click-overlay
    :style="{ width: '70%', height: '100%' }"
    >w
  </van-popup>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: this.isSideBarShow,
    };
  },
  computed: {
    ...mapState(["isSideBarShow"]),
  },
};
</script>

<style lang="less" scoped>
.popup {
  height: 100%;
  width: 80%;
  background: #f5f5f6;
}
.user {
  margin: 12px 0 0 16px;
  display: flex;
  align-items: center;
  .user_avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid rgb(255, 145, 145);
    background-color: rgba(255, 145, 145, 0.2);
    overflow: hidden;
    position: relative;
    img {
      width: inherit;
      height: inherit;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .user_name {
    cursor: pointer;
    font-size: 14px;
    margin-left: 20px;
    .loginbtn {
      border: 1px solid #ec4141;
      color: #ec4141;
      line-height: 14px;
      border-radius: 15px;
      padding: 1px 8px;
    }
  }
  .arrow_icon {
    cursor: pointer;
    margin-left: 10px;
    margin-top: 4.2px;
    font-size: 14px;
  }
}
.funList {
  width: 90%;
  border-radius: 16px;
  background-color: #fff;
  margin: 20px auto;
  overflow: hidden;
}
.van-cell__left-icon {
  margin-right: 10px;
}
</style>
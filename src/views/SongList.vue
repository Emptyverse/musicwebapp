<template>
  <div id="songList">
    <van-nav-bar
      :border="false"
      fixed
      @click-left="$router.go(-1)"
      class="navbar"
    >
      <template #left>
        <van-icon name="arrow-left" class="icon" />
        <div class="title">歌单广场</div>
      </template>
    </van-nav-bar>
  </div>
</template>

<style>
</style>
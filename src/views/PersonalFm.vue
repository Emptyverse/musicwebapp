<template>
  <div id="personalFm">
    <van-nav-bar :border="false" class="navbar" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-down" />
      </template>
      <template #title>
        <span class="title">私人FM</span>
      </template>
    </van-nav-bar>
  </div>
</template>
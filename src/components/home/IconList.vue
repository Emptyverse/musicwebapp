<template>
    <div class="iconList">
        <!-- 每一个为一个div盒子加span标签 共四个-->
        <div class="iconItem" @click="$router.push('/DailyPlayList')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true" @click="$router.push('/personalFm')">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true" @click="$router.push('/songList')">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .iconList {
        width: 100%;
        height: 1.6rem;
        margin-top: .2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iconItem {
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon {
                width: 1.0rem;
                height: 1.0rem;
            }
        }
    }
</style>
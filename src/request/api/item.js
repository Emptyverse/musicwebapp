import service from '..'
//获取歌单详情页的数据
export function getMusicListItem(data) {
    return service({
        method: 'GET',
        //传入动态id 这里用的是模板字符串 差点又被坑了 0 0
        url:`/playlist/detail?id=${data}`
    })
}
//获取歌单的所有歌曲
export function getMusicListSong(data) {
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}
//获取歌曲的歌词 把歌词保存在vuex中
export function getMusicLyric(data){
    return service({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}
//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
} 
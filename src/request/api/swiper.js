//从request文件中的index.js引入service实例
import { service } from '..';
//定义一个函数 获取轮播图banner,并把函数抛出去 export
export function getBanner() {
    return service({
        method: 'GET',
        url: '/banner?type=2'
    })
}
//请求歌单函数
export function getMusicList() {
    return service({
        method: 'GET',
        url: '/personalized?limit=10'
    })
}
//通过关键字搜索歌曲
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/search?keywords=${data}`
    })
}
//登录 传一个对象过去 对象包括手机号和密码
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}

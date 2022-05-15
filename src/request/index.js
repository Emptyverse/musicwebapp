//导入axios
import axios from 'axios';
//封装axios 返回实例service供其他组件请求使用
let service = axios.create({
    //俺在这把baseURL写成了baseUrl 因为是自动补全 所以浪费了点事件 0 0
    baseURL:'https://netease-cloud-music-api-delta-seven-10.vercel.app/',
    timeout:3000
})
export default service

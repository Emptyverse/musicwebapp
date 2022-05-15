//导入vant中需要用到的插件
import { Swipe, SwipeItem, Button, Popup } from "vant";
// 把导入的插件放入数组中
let plugins = [Popup,Swipe, SwipeItem, Button, Popup]
//抛出一个函数给main.js中的Vue实例vm使用，函数传入参数为Vue实例
//函数目的是遍历插件数组并用Vue实例use插件
export default function getVantPlugins(app) {
    plugins.forEach((plugin) => {
        return app.use(plugin)
    })
}

import axios from 'axios'
const instance = axios.create()  // 创建axios实例
import qs from 'qs'
import {showLoadingToast, closeToast} from 'vant'
import 'vant/lib/index.css';

interface Response{
    code: number;
    msg: string;
    data?: any;
}

// 基于请求拦截器，发请求之前弹出等待框
instance.interceptors.request.use((config)=>{
    // 弹个窗
    showLoadingToast({
        duration: 0,
        message: '加载中...',
        forbidClick: true
    })
    return config
})

// 基于响应拦截器，接收到结果后隐藏等待框
instance.interceptors.response.use((response)=>{
    closeToast()
    return response
})


const myaxios = {
    /** 用于发送get请求 
     *  url: 请求资源路径  
     *  params: 请求参数（Object形式）
     */
    get(url:string, params?:object):Promise<Response>{
        return instance({
            url, 
            method: 'get',
            params
        })
    },

    /**
     * 用于发送post请求
     * @param {String} url   请求资源路径
     * @param {Object} params   请求参数（对象类型）
     * @returns Promise<Response>
     */
    post(url:string, params?:object):Promise<Response>{
        return instance({
            url,
            method: 'post',
            data: qs.stringify(params)
        })
    }
}

export default myaxios
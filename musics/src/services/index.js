import request from '../utils/request'

//const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';
const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';

//登录接口

export function tellogin(params){
    console.log(params)
    // return request(`${host}/login?email=${params.phone}&password=${params.password}`)
    return request(`http://123.206.55.50:14000/login?email=${params.phone}@163.com&password=${params.password}`)
    
}
//每日推荐歌曲
export function getremmendersongs(){
    return request(`${host}/recommend/songs`)
}

//每日推荐歌单
export function getremmenderresource(){
    return request(`${host}/recommend/resource`)
}

//搜索
export function getseach(keyword){
    return request(`${host}/search?keywords=${keyword} `)
}

//获取音乐 url
export function getsongsurl(idx){
    return request(`${host}/song/url?id=${idx}`)
}

//歌曲详情
export function getdetail(idx){
    return request(`${host}/song/detail?ids=${idx}`)
}

//获取歌词
export function getlyric(idx){
    return request(`${host}/lyric?id=${idx}`)
}
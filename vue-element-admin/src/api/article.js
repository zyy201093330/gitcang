import request from '@/utils/request'
const host = !/123.206.55.50/.test(window.location.host)?'http://123.206.55.50:15000': 'http://123.206.55.50:15000';

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function userlist(list){
  return request({
    url:`${host}/users/list`,
    method:'get',
    list
  })
}
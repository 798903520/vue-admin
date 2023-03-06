/*
 * @Description:
 * @Author: shiao
 * @Date: 2022-05-05 10:49:43
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-05-25 14:40:44
 */
import http from '../providers/http'
import axios from 'axios'
/**************公共接口*************/

// 登录
const getBili = (data) => {
    return http.post('bug/debugIt',data)
}

//查询blog
const getBlog = (data) => {
    return http.post('blog/getBlog',data)
}

//新增blog
const addBlog = (data) => {
    return http.post('blog/addBlog',data)
}

/**
  * 城市相关
  */

// 新增
const add = (data) => {
    return http.post('table/addCity',data)
}
// 编辑
const edit = (data) => {
    return http.post('table/editCity',data)
}
// 获取单条数据
const getOneData = (data) => {
    return http.get('table/getCityData',data)
}
// 获取公共服务城市列表
const getCityList = (data) => {
    return http.get('table/getCityList',data)
}

/**
  * 商品类型
  */
 // 新增
const add_PT = (data) => {
    return http.post('table/add_PT',data)
}
// 编辑
const edit_PT = (data) => {
    return http.post('table/edit_PT',data)
}
// 获取单条数据
const get_p_t_Data = (data) => {
    return http.get('table/get_p_t_Data',data)
}
// 获取公共服务城市列表
const get_p_t_List = (data) => {
    return http.get('table/get_p_t_List',data)
}

/**
  * 商家
  */
 // 新增
 const add_PB = (data) => {
    return http.post('table/add_PB',data)
}
// 编辑
const edit_PB = (data) => {
    return http.post('table/edit_PB',data)
}
// 获取单条数据
const get_p_b_Data = (data) => {
    return http.get('table/get_p_b_Data',data)
}
// 获取公共服务城市列表
const get_p_b_List = (data) => {
    return http.get('table/get_p_b_List',data)
}


/**
  * 商品
  */
 // 新增
 const add_P = (data) => {
    return http.post('table/add_P',data)
}
// 编辑
const edit_P = (data) => {
    return http.post('table/edit_P',data)
}
// 获取单条数据
const get_p_Data = (data) => {
    return http.get('table/get_p_Data',data)
}
// 获取公共服务城市
const get_p_List = (data) => {
    return http.get('table/get_p_List',data)
}

// 登录
const login = (data) => {
    return http.post('login/login',data)
}





export {
    login,
    addBlog,

// 城市
    getCityList,
    getOneData,
    add,
    edit,
// 商品类型
    add_PT,
    edit_PT,
    get_p_t_Data,
    get_p_t_List,
// 商家
    add_PB,
    edit_PB,
    get_p_b_Data,
    get_p_b_List,
// 商品
    add_P,
    edit_P,
    get_p_Data,
    get_p_List,


    getBili,
    getBlog
}

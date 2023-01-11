/*
 * @Description:
 * @Author: shiao
 * @Date: 2022-05-05 10:49:43
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-05-25 14:40:44
 */
import http from '../providers/http'
/**************公共接口*************/
//新增blog
const addBlog = (data) => {
    return http.post('blog/addBlog',data)
}
// 新增
const add = (data) => {
    return http.post('first/add',data)
}
// 编辑
const edit = (data) => {
    return http.post('/first/edit',data)
}
// 获取单条数据
const getOneData = (data) => {
    return http.get('/first/editData',data)
}
// 获取公共服务城市列表
const getCityList = (data) => {
    return http.get('/first/getCityList',data)
}
// 登录
const login = (data) => {
    return http.post('/login/login',data)
}





export {
    login,
    addBlog,
    getCityList,
    getOneData,
    add,
    edit
}

import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path:'/',
            name:'all',
            redirect: '/shop',
            component: () => import('../view/index.vue'),
            children:[
                {
                    path:'/index',
                    name:'首页',
                    meta: {
                        title: '登录',
                        Permission:'root'
                    },
                    component: () => import('../view/iPage.vue'),
                },
                {
                    path:'/home',
                    name:'表格',
                    redirect: '/home/homeIndex',
                    children:[
                        {
                            path:'/home/homeIndex',
                            name:'表格',
                            meta: {
                                title: '表格',
                                Permission:'root'
                            },
                            component: () => import('../view/table/homeIndex.vue'),
                        },
                        {
                            path:'/home/domMove',
                            name:'移动',
                            meta: {
                                title: '移动',
                                Permission:'root'
                            },
                            component: () => import('../view/table/domMove.vue'),
                        }
                    ]
                },
                {
                    path:'/game',
                    name:'游戏',
                    redirect: '/game/gameIndex',
                    children:[
                        {
                            path:'/game/gameIndex',
                            name:'游戏',
                            meta: {
                                title: '游戏',
                                Permission:'root'
                            },
                            component: () => import('../view/game/gameIndex.vue'),
                        },
                        {
                            path:'/game/gameNone',
                            name:'摄像',
                            meta: {
                                title: '摄像',
                                Permission:'root'
                            },
                            component: () => import('../view/game/gameNone.vue'),
                        },
                        {
                            path:'/game/ball',
                            name:'小球',
                            meta: {
                                title: '小球',
                                Permission:'root'
                            },
                            component: () => import('../view/game/ball.vue'),
                        }
                    ]
                },
                {
                    path:'/bug',
                    name:'爬虫',
                    redirect: '/bug/bugIndex',
                    children:[
                        {
                            path:'/bug/bugIndex',
                            name:'爬虫',
                            meta: {
                                title: '爬虫',
                                Permission:'root'
                            },
                            component: () => import('../view/debug/bugIndex.vue'),
                        },
                    ]
                },
                {
                    path:'/tools',
                    name:'工具',
                    redirect: '/tools/numToZH',
                    children:[
                        {
                            path:'/tools/numToZH',
                            name:'数字转中文',
                            meta: {
                                title: '数字转中文',
                                Permission:'root'
                            },
                            component: () => import('../view/tools/numToZH.vue'),
                        },
                    ]
                },

            ]
        },
        {
            path: '/loginIt',
            name:'loginIt',
            component: () => import('../view/login.vue'),
            meta: {
                title: '登录',
                keepAlive: true,
            }
        },
        {
            path: '/shop',
            name:'商城',
            component: () => import('../view/shop/shopIndex.vue'),
            meta: {
                title: '商城',
                Permission:'user,root,lang'
            }
        },
        {
            path: '/404',
            name:'404',
            component: () => import('../view/404.vue'),
            meta: {
                title: '商城',
                Permission:'user,root'
            }
        },
    ]
})

router.beforeEach((to, from,next) => {
    if(to.path=='/loginIt'){
        if(sessionStorage.getItem('MyToken')){
            router.push(from)
        }else{
            next()
        }
    }else if(to.path=='/shop'){
        next()
    }else{
        if(sessionStorage.getItem('MyToken')){
            // 权限判断
            let data = JSON.parse(sessionStorage.getItem('userData'));
            if(to.meta.Permission&&to.meta.Permission.includes(data.permission)){
                next();
            }else{
                next('/404');
            }
        }else{
            alert('请登录')
            //跳转到首页
            router.push('/loginIt')
        }
    }
})

export default router

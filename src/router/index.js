import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path:'/',
            name:'all',
            redirect: '/index',
            component: () => import('../view/index.vue'),
            children:[
                {
                    path:'/index',
                    name:'首页',
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
                            component: () => import('../view/homeIndex.vue'),
                        },
                        {
                            path:'/home/domMove',
                            name:'移动',
                            component: () => import('../view/domMove.vue'),
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
                            component: () => import('../view/gameIndex.vue'),
                        },
                        {
                            path:'/game/gameNone',
                            name:'摄像',
                            component: () => import('../view/gameNone.vue'),
                        }
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
    ]
})

router.beforeEach((to, from,next) => {
    if(to.path=='/loginIt'){
        console.log('from',from)
        if(sessionStorage.getItem('MyToken')){
            router.push(from)
        }else{
            next()
        }
    }else{
        if(sessionStorage.getItem('MyToken')){
            next();
        }else{
            alert('请登录')
            //跳转到首页
            router.push('/loginIt')
        }
    }
})

export default router

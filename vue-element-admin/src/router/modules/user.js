import Layout from '@/views/layout/Layout'

const userRouter = {
    path:'/user',
    component:Layout,
    redirect:'/user/list',
    name:'User',
    meta:{
        title:"Table",
        icon:'table'
    },
    children:[
        {
            path:'list',
            component:()=>import('@/views/user/list'),
            name:'Userlist',
            meta:{title:'userlist'}
        }
    ]
}

export default userRouter
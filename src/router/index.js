import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index') }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/book',
    component: Layout,
    redirect: '/book/create',
    meta: {
      title: '图书管理',
      icon: 'documentation',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: '/book/create',
        component: () => import('@/views/book/create'),
        name: 'book',
        meta: {
          title: '上传图书',
          icon: 'edit',
          roles: ['admin']
        }
      },
      {
        path: '/book/edit/:fileName',
        component: () => import('@/views/book/edit'),
        name: 'book',
        hidden: true,
        meta: {
          title: '编辑图书',
          icon: 'edit',
          roles: ['admin'],
          activeMenu: '/book/list'
        }
      },
      {
        name: 'bookList',
        path: '/book/list',
        component: () => import('@/views/book/list'),
        meta: {
          title: '图书列表',
          icon: 'list',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/visual',
    component: Layout,
    redirect: '/visual/report',
    meta: {
      title: '可视化',
      breadcrumb: false,
      icon: 'visual',
      roles: ['admin']
    },
    children: [
      {
        path: '/visual/report',
        component: () => import('@/views/datav/screen-report'),
        name: 'report',
        meta: {
          title: '数据报表',
          icon: 'report',
          roles: ['admin']
        }
      }, {
        path: '/visual/bmap',
        component: () => import('@/views/datav/bmap'),
        name: 'bmap',
        meta: {
          title: '百度地图案例',
          icon: 'bmap',
          roles: ['admin']
        }
      }]
  },
  {
    path: '/canvas',
    redirect: '/canvas/fileLink',
    meta: {
      title: 'canvas',
      breadcrumb: false,
      icon: 'img',
      roles: ['admin']
    },
    component: Layout,
    children: [{
      path: 'fileLink',
      name: 'canvasLink',
      component: () => import('@/views/canvas/link'),
      meta: {
        title: 'canvas-demo',
        icon: 'file',
        roles: ['admin']
      }
    }, {
      path: 'compress',
      component: () => import('@/views/canvas/compress'),
      meta: {
        title: '文件压缩',
        icon: 'compress',
        roles: ['admin']
      }
    }]

  }, {
    path: '/fileDemo',
    redirect: '/fileDemo/why100',
    component: Layout,
    meta: {
      title: '项目展示',
      icon: 'img',
      roles: ['admin']
    },
    children: [{
      path: '/why100',
      component: () => import('@/views/fileDemo/why100/index'),
      meta: {
        title: '十万个为什么',
        icon: 'img',
        roles: ['admin']
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

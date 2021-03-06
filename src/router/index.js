import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import FriendSession from '@/components/converse/FriendSession';
import GroupSession from '@/components/converse/GroupSession';
import Home from '@/components/Home';
import Chat from '@/components/home/Chat';
import Group from '@/components/home/Group';
import Status from '@/components/home/Status';
import Friends from '@/components/home/Friends';
import FriendAdd from '@/components/account/FriendAdd';
import Waiting from '@/components/Waiting';
import Login from '@/components/Login';
import Profile from '@/components/account/Profile';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [

    // 等待应用完成初始化
    {
      path: '/',
      name: 'Checker',
      component: Waiting,
    },

    // 登录相关路由
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    // 主界面相关路由：最近消息、最近群消息、最新动态等
    {
      path: '',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/chat',
          name: 'Chat',
          component: Chat,
        },
        {
          path: '/group',
          name: 'Group',
          component: Group,
        },
        {
          path: '/status',
          name: 'Status',
          component: Status,
        },
        {
          path: '/friends',
          name: 'Friends',
          component: Friends,
        },
      ],
    },

    // 聊天界面路由
    {
      path: '/talk/:id',
      name: 'FriendSession',
      component: FriendSession,
      props: true,
      meta: { requiresAuth: true },
    },

    {
      path: '/group/:id',
      name: 'GroupSession',
      component: GroupSession,
      props: true,
      meta: { requiresAuth: true },
    },

    {
      path: '/friend/add',
      name: 'FriendAdd',
      meta: { requiresAuth: true },
      component: FriendAdd,
    },

    // 个人信息界面相关路由
    {
      path: '/profile',
      name: 'Profile',
      meta: { requiresAuth: true },
      component: Profile,
    },
    {
      path: '/user/:uid',
      name: 'OtherProfile',
      // TODO: 添加路由对应组件
    },
  ],
});

// 检查将要跳转的路由是否需要认证，如需要认证且当前没有认证即跳转到登陆界面
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isInitialized && !store.getters.self) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

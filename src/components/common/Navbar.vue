<template>
  <header class="topbar">
    <div class="container">
      <div class="topbar-item navbar">
        <router-link to="/chat" replace class="nav-item nav-item-chat" href="#">
          <font-awesome-icon class="icon" :icon="chatIcon" />
          <span class="/text">聊天</span>
        </router-link>
        <router-link to="/group" replace class="nav-item nav-item-group" href="#">
          <font-awesome-icon class="icon" :icon="groupIcon" />
          <span class="text">群聊</span>
        </router-link>
        <router-link to="/friends" replace class="nav-item nav-item-status" href="#">
          <font-awesome-icon class="icon" :icon="friendsIcon" />
          <span class="text">好友</span>
        </router-link>
        <router-link to="/status" replace class="nav-item nav-item-status" href="#">
          <font-awesome-icon class="icon" :icon="statusIcon" />
          <span class="text">动态</span>
        </router-link>
      </div>
      <div class="menu">
        <font-awesome-icon class="menu-icon" @click="switchMenu" :icon="menuIcon" />
        <div class="menu-content" v-if="showingMenu">
          <div @click="showProfile" class="menu-item">我的信息</div>
          <hr>
          <div @click="addFriend" class="menu-item">添加好友</div>
          <div @click="addGroup" class="menu-item">加入群组</div>
          <div @click="createGroup" class="menu-item">创建群组</div>
          <hr>
          <div @click="logout" class="menu-item">登出账号</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import {
  faComment as chatIconReg,
  faComments as groupIconReg,
  faStar as statusIconReg,
  faUser as friendsIconReg,
} from '@fortawesome/fontawesome-free-regular';
import {
  faComment as chatIconSolid,
  faComments as groupIconSolid,
  faStar as statusIconSolid,
  faUser as friendsIconSolid,
  faBars as menuIcon,
} from '@fortawesome/fontawesome-free-solid';

import {
  LOGOUT,
  SHOW_OPERATION_BOX,
  ADD_FRIEND,
  ADD_GROUP,
  CREATE_GROUP,
} from '@/types/action-types';
import util from '@/util';


export default {
  name: 'navbar',
  data() {
    return {
      showingMenu: false,
    };
  },
  props: ['active'],
  computed: {
    chatIcon() {
      return this.active === 'Chat' ? chatIconSolid : chatIconReg;
    },
    groupIcon() {
      return this.active === 'Group' ? groupIconSolid : groupIconReg;
    },
    statusIcon() {
      return this.active === 'Status' ? statusIconSolid : statusIconReg;
    },
    friendsIcon() {
      return this.active === 'Friends' ? friendsIconSolid : friendsIconReg;
    },
    menuIcon() {
      return menuIcon;
    },
  },
  methods: {
    switchMenu() {
      this.showingMenu = !this.showingMenu;
    },
    showProfile() {
      this.$router.push('/profile');
      this.switchMenu();
    },
    logout() {
      this.$store.dispatch(LOGOUT)
        .then(() => this.$router.replace('/login'));
    },
    addFriend() {
      this.$store.dispatch(SHOW_OPERATION_BOX, {
        title: '请输入想要添加的好友的邮箱',
        validate: util.validateEmail,
        message: '请输入正确的邮箱地址！',
        callback: (email) => {
          this.$store.dispatch(ADD_FRIEND, email);
        },
      });
      this.switchMenu();
    },
    addGroup() {
      this.$store.dispatch(SHOW_OPERATION_BOX, {
        title: '请输入想要加入的群组名称',
        validate: util.validateName,
        message: '名称只能包含汉字、字母、数字与下划线！',
        callback: (gname) => {
          this.$store.dispatch(ADD_GROUP, gname);
        },
      });
      this.switchMenu();
    },
    createGroup() {
      this.$store.dispatch(SHOW_OPERATION_BOX, {
        title: '请输入想要创建的群组名称',
        validate: util.validateName,
        message: '名称只能包含汉字、字母、数字与下划线！',
        callback: (gname) => {
          this.$store.dispatch(CREATE_GROUP, gname);
        },
      });
      this.switchMenu();
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>


<style scoped lang="scss">
.topbar {
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: $gray;
  background-color: $white;
  box-shadow: 0 1px 1px darken($lightgray, 20%);

  .container {
    position: relative;
  }

  .menu {
    position: absolute;
    top: 0;
    right: 0;

    .menu-icon {
      width: 18px;
      height: 18px;
      padding-top: 13px;
      padding-bottom: 13px;
      position: absolute;
      top: 0;
      right: 0;

      &:hover {
        cursor: pointer;
      }
    }

    .menu-content {
      position: absolute;
      width: 6rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      box-shadow: 0px 0px 5px rgba(150, 150, 150, 0.8);
      top: 45px;
      right: 0;

      .menu-item {
        display: block;
        width: 100%;
        box-sizing: border-box;
        text-decoration: none;
        text-align: center;
        background-color: #fff;
        padding: 10px 15px;
        border-top: 1px olid #eee;
        color: #66757f;

        &:hover {
          cursor: pointer;
        }
      }

      hr {
        width: 100%;
        margin: 0;
        box-sizing: border-box;
        border: 1px solid #eee;
      }
    }
  }
}
.topbar-item {
  display: flex;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
}
.topbar-item .icon {
  font-size: 18px;
  margin-right: 2px;
}

.topbar-item a {
  text-decoration: none;
  color: $gray;
}

.nav-item {
  padding-top: 11px;
  padding-bottom: 11px;
  padding-left: 18px;
  padding-right: 18px;
  height: 21px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.2s, color 0.2s;
}

.nav-item.router-link-active,
.nav-item:hover {
  color: $active;
  border-bottom-color: $active;
}

@media (max-width: $content-mobile-width) {
  .menu-icon {
    padding-left: 13px;
    padding-right: 13px;
  }
}
</style>


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
        <router-link to="/status" replace class="nav-item nav-item-status" href="#">
          <font-awesome-icon class="icon" :icon="statusIcon" />
          <span class="text">动态</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import {
  faCommentAlt as chatIconReg,
  faComments as groupIconReg,
  faStar as statusIconReg,
} from '@fortawesome/fontawesome-free-regular';
import {
  faCommentAlt as chatIconSolid,
  faComments as groupIconSolid,
  faStar as statusIconSolid,
} from '@fortawesome/fontawesome-free-solid';


export default {
  name: 'navbar',
  data() {
    return {
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

</style>

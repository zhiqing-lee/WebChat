<template>
<div>
  <conversations v-if="messages.length > 0" class="conversations" :messages="messages"></conversations>
  <div class="nodata" v-if="messages.length < 1">
    <font-awesome-icon class="icon" :icon="emptyBoxIcon"></font-awesome-icon>
    <div class="notice-text">暂时没有消息数据哦！</div>
  </div>

</div>
</template>

<script>
import Conversations from '@/components/converse/Conversations';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInbox as emptyBoxIcon } from '@fortawesome/fontawesome-free-solid';

export default {
  name: 'chat',
  data() {
    return {
      emptyBoxIcon,
    };
  },
  computed: {
    messages() {
      return this.$store.getters.recentMessages;
    },
  },
  created() {
  },
  methods: {
  },
  components: {
    Conversations,
    FontAwesomeIcon,
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.nodata {
  display: flex;
  padding: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.6;

  .icon {
    width: 100px;
    height: 100px;
    color: $gray;
  }

  .notice-text {
    color: $gray;
  }
}
</style>

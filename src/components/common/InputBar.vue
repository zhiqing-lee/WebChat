<template>
  <div class="input-bar">
    <input type="text" placeholder="在此输入您想发送的信息" autocomplete="off" wrap="hard" v-model="text"><button class="btn" @click="post">{{ button }}</button>
  </div>
</template>

<script>
import {
  SHOW_NOTICE,
} from '@/types/action-types';

export default {
  name: 'input-bar',
  props: ['button'],
  data() {
    return {
      text: '',
    };
  },
  methods: {
    post() {
      if (this.text.length < 1) {
        this.$store.dispatch(SHOW_NOTICE, { message: '请输入消息内容', type: 'warning', timeout: 3000 });
        return;
      }
      this.$emit('post', { text: this.text });
      this.text = '';
    },
  },
};
</script>

<style scoped lang="scss">
.input-bar {
  display: flex;
  background-color: $lightlightblue;
  padding: 10px;
  align-items: flex-end;
}
input {
  flex-grow: 1;
  margin-right: 10px;
}
</style>




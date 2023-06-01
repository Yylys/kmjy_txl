<template>
  <div>
    <!-- 二级路由占位符 -->
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <!-- 底部选项卡 -->
    <van-tabbar v-model="active" active-color="#f03d37">
      <van-tabbar-item replace to="index">
        <span>公司</span>
        <template #icon="props">
          <img :src="require(
            `../assets/tabs/index_${props.active?1:0}.png`)"/>
        </template>
      </van-tabbar-item>

<!--      <van-tabbar-item replace to="/home/video">
        <span>公司</span>
        <template #icon="props">
          <img :src="require(
            `@/assets/tabs/video_${props.active?1:0}.png`)"/>
        </template>
      </van-tabbar-item> -->

      <van-tabbar-item replace to="/home/show">
        <span>群组</span>
        <template #icon="props">
          <img v-if="props.active" src="@/assets/tabs/show_1.png"/>
          <img v-else src="@/assets/tabs/show_0.png"/>
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/home/me">
        <span>我的</span>
        <template #icon="props">
          <img v-if="props.active" src="@/assets/tabs/me_1.png"/>
          <img v-else src="@/assets/tabs/me_0.png"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 处理底部选项卡
const active = ref(0)

</script>

<style scoped>

</style>
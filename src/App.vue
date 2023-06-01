<template>
  <div>
    <!-- 一级路由 -->
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component v-if="$route.meta.keepAlive" :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
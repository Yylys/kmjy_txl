<template>
  <div>
    <!-- 头部标题栏 -->
    <van-nav-bar title="百慕大影城">
      <template #right>
        <van-popover
          placement="bottom-end"
          v-model:show="showPopover"
          :actions="actions"
        >
          <template #reference>
            <van-icon name="apps-o" size="20" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>

    <!-- 广告栏 -->
    <AppHeader></AppHeader>
    <!-- <app-header></app-header> -->
    <!-- <appHeader></appHeader> -->

    <!-- topnav顶部导航 -->
    <van-sticky>
      <div class="topnav">
        <span>北京</span>
        <s></s>
        <van-tabs 
          color="#f03d37" 
          class="tabs" 
          v-model:active="navActive">
          <van-tab title="热映" name="1"></van-tab>
          <van-tab title="待映" name="2"></van-tab>
          <van-tab title="经典" name="3"></van-tab>
        </van-tabs>
        <van-icon
          style="font-weight: bold"
          color="#f03d37"
          name="search"
          size="20"
        />
      </div>
    </van-sticky>

    <!-- 电影列表 -->
    <van-pull-refresh 
      v-model="refreshing" @refresh="onRefresh"
      success-text="加载完成"
      success-duration="800">
      <van-list
        style="margin-bottom: 50px;"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <MovieItem 
          v-for="item in movies" :key="item.id" :movie="item"
          @click="$router.push(`/detail/${item.id}`)">
        </MovieItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch} from "vue";
import httpApi from "@/http";
import Movie from "@/types/Movie";


// 顶部标题栏相关
const showPopover = ref(false);
const actions = [{ text: "首页" }, { text: "榜单" }, { text: "热点" }];


// 顶部导航相关
const navActive = ref('1');
watch(navActive, (newval, oldval)=>{
  console.log(newval) // newval 就是选中项的类别ID
  // 回到顶部
  window.scrollTo(0, 108)
  // 重置当前页码与finished变量
  page.value = 1
  finished.value = false

  // 发请求之前，得先去sessionStorage中寻找，是否以前存过，如果存过直接使用
  let moviesCache = sessionStorage.getItem(newval)
  if(moviesCache){
    let list:Movie[] = JSON.parse(moviesCache)
    movies.splice(0, movies.length, ...list)
    return;
  }
  // 若没有找到缓存，则重新发送请求
  let params = {cid:parseInt(newval), page:1, pagesize:20}
  httpApi.movieApi.queryByCategoryId(params).then(res=>{
    // 获取结果
    let list:Movie[] = res.data.data.result
    // 替换当前列表数据 splice方法可以删除所有元素，同时设置新元素
    movies.splice(0, movies.length, ...list)

    // 将list存入sessionStorage  key:电影类别id   value:电影对象列表
    sessionStorage.setItem(newval, JSON.stringify(list)) 

  })
})



// 处理首页热映列表的加载
const movies = reactive<Movie[]>([]);



// 触底加载下一页时相关代码
// 是否正在加载中，执行onLoad时自动改为true，数据加载完后需要手动改为false
const loading = ref(false)   
// 数据是否已经加载完毕，如果设置为true，则将不会再执行触底onLoad
const finished = ref(false)
const page = ref(1)      // 代表当前页码
function onLoad(){
  console.log('到底了，加载下一页数据...')
  // 发送http请求，加载首页热映类别下的电影列表
  let params = { 
    cid: parseInt(navActive.value), 
    page: page.value++,
    pagesize: 20
  };
  httpApi.movieApi.queryByCategoryId(params).then((res) => {
    console.log("加载热映类别首页电影列表", res);
    let list: Movie[] = res.data.data.result;
    movies.push(...list);
    // 手动控制变量
    loading.value = false
    // 如果list数组已经加载不到数据了，就代表到底了
    if(list.length == 0){
      finished.value = true
    }
  });
}


// 处理下拉刷新业务
const refreshing = ref(false)
function onRefresh(){
  // 下拉刷新，释放后执行，将自动设置refreshing=true
  console.log('onRefresh..')
  // 加载当前类别下的首页电影列表
  page.value = 1   // 页码初始化
  let params = {cid:parseInt(navActive.value), page:1, pagesize:20}
  httpApi.movieApi.queryByCategoryId(params).then(res=>{
    let list:Movie[] = res.data.data.result
    movies.splice(0, movies.length, ...list)
    // 下拉刷新数据加载已完成
    refreshing.value = false
    // 将movies数组，更新一下本地缓存
    sessionStorage.setItem(navActive.value, JSON.stringify(movies))
  })
}


onMounted(()=>{
  console.log('mounted...')
})


</script>

<style scoped lang="scss">
.topnav {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  border-bottom: 1px solid #eee;
  .tabs {
    flex: 1;
    margin: 0px 30px;
  }
  s {
    border: 4px solid black;
    border-color: transparent;
    border-top-color: #444;
    margin: 5px 0px 0px 3px;
  }
}
</style>

<style>
:root {
  --van-nav-bar-background: #f03d37;
  --van-nav-bar-title-text-color: #fff;
  --van-nav-bar-icon-color: #fff;
}
</style>

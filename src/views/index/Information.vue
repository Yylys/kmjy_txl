<template>
	<!-- topnav顶部导航 -->
	<van-sticky>
		<van-nav-bar title="通讯录" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft"
			@click-right="onClickRight">
		</van-nav-bar>
		<van-search v-model="search" placeholder="请输入搜索关键词" input-align="center" />
	</van-sticky>
	<PerSonnel v-for="item in 20"></Personnel>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import { ref, reactive, onMounted, watch } from "vue";

	const userRouter = useRouter()
	// 搜索框
	const search = ref('');
	watch(search, (newval, oldval) => {
		console.log(newval, '1111');
	})

	// 导航栏返回上一层
	const onClickLeft = () => history.back();
	// 导航栏返回首页
	const onClickRight = () => {
		userRouter.replace({
			path: '/home/index',
		})
	};
	
</script>

<style scoped>
	/* 主要区域 */
	.main-container {
		background-color: #fff;
	}

	/* 影片信息 */
	.movie-item {
		margin: 0 10px;
		background-color: #fff;
		border-bottom: 1px solid #e5e5e5;
	}

	/* 影片图片容器 */
	.movie-item .movie-item-avatar {
		width: 48px;
		height: 48px;
		position: relative;
		margin-top: 12px;
		float: left;
	}

	.movie-item .movie-item-avatar img {
		width: 100%;
		height: 48px;
		border-radius: 2px;
	}

	/* 影片内容容器 */
	.movie-item .movie-item-content-wrapper {
		padding: 12px 14px 12px 0;
		margin-left: 55px;
		position: relative;
	}

	.movie-item .movie-item-content-wrapper .content {
		padding-right: 5px;
		margin-right: 58px;
		overflow: hidden;
	}

	.movie-item .movie-item-content-wrapper .content .title {
  max-height: 20px;
  margin-bottom: 3px;
  line-height: 20px;
  font-size: 14px;
  color: #333;
		/* overflow: hidden; */
		display: flex;
		justify-content: space-between;
	}

	.movie-item .movie-item-content-wrapper .content .line-ellipsis {
		margin-top: 10px;
		line-height: 15px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 14px;
		color: #666;
		display: flex;
		justify-content: space-between;
	}

	.movie-item .movie-item-content-wrapper .score-wrapper {
		font-size: 14px;
		position: absolute;
		right: 0;
		top: 20px;
		height: 27px;
		margin: auto;
	}

	.movie-item .movie-item-content-wrapper .score {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		box-sizing: border-box;
		/*  background-color: #f03d37;
  color: #fff; */
		border-radius: 4px;
		white-space: nowrap;
		font-size: 14px;
		cursor: pointer;
	}
</style>
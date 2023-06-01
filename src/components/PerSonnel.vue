<template>
	<!-- 主要区域开始 -->
	<div class="main-container">
		<!-- 单一影片开始 -->
		<div class="movie-item">
			<!-- 图片开始 -->
			<div class="movie-item-avatar">
				<img src="movie.cover">
			</div>
			<!-- 图片结束 -->
			<!-- 内容容器开始 -->
			<div class="movie-item-content-wrapper">
				<div class="content" @click="$router.push(`/Information`)">
					<div class="title">
						<span>严玉霖</span>
						<span>座机:0871-123456</span>
					</div>
					<!-- <div class="line-ellipsis">{{ movie.type }}</div> -->
					<div class="line-ellipsis">
						<span>前端开发</span>
						<span>电话:13112345678</span>
					</div>
				</div>
				<!-- 评分开始 -->
				<div class="score-wrapper">
					<div class="score">
						<van-popover placement="left" v-model:show="showPopover" :actions="actions" @select=onSelect>
						  <template #reference>
							<van-icon position="bottom" name="phone" color="#ee0a24" size="20" />
						  </template>
						</van-popover>
							
					</div>
					<!-- 弹出层 -->
				</div>
				<!-- 评分结束 -->
			</div>
			<!-- 内容容器结束 -->
		</div>
		<!-- 单一影片结束 -->
	</div>
	<!-- 主要区域结束 -->
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import { ref, reactive, onMounted, watch } from "vue";
	import { showToast } from 'vant';

	const userRouter = useRouter()

	// 电话拨号
	const show = ref(false); // 控制弹出层是否显示
	const showPopup = () => {
		show.value = true
		console.log('show.value', show.value);
	}
	 const showPopover = ref(false);
	    const actions = [
	      { text: '10010', icon: 'phone' },
	      { text: '10086', icon: 'phone' },
	      { text: '10001', icon: 'phone' },
	    ];
	 const onSelect = (action) => {
		  window.open(`tel:${action.text}`);
		 }

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
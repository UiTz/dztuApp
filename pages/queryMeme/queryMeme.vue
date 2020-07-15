<template>
	<view>
		<view
			@click="goQuery"
		>
			<zy-search></zy-search>
		</view>
		<scroll-view scroll-y class="img-container">
			<view class="img-item" v-for="(item, index) in imgList" :key="index"><image :src="item.url" lazy-load></image></view>
		</scroll-view>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import zySearch from '@/components/zy-search/zy-search.vue';
export default {
	components: {
		uniSearchBar,
		zySearch
	},
	data() {
		return {
			imgList: void 0,
			searchKeyword: '',
			hostList: []
		};
	},
	created() {},
	methods: {
		goQuery(){
			uni.navigateTo({
				url: "/pages/search/search"
			})
		},
		queryMeme(keyword = this.searchKeyword, page = 1) {
			const data = { keyword, page };
			uni.showLoading({
				mask: true,
				title: '正在加载...'
			});
			uniCloud
				.callFunction({
					name: 'getMeme',
					data
				})
				.then(({ result }) => {
					uni.hideLoading();
					this.imgList = result;
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: '加载失败'
					});
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.img-container {
	width: 100%;
	height: auto;
	.img-item {
		width: 50%;
		display: inline-block;
		margin: 0 auto;
		image {
			width: 100%;
		}
	}
}
</style>

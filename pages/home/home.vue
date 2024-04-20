<template>
	<view>
		<view class="search-box">
			<my-search @myclick='gotoSearch'></my-search>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for='(item ,i) in movieList' :key="i"  style="position: relative;">
				<uni-section :title="item.movieTypeName" type="line">
					<template v-slot:right>
						<view class="unilink" @click="navClickHandler(item)">查看更多</view>
					</template>
					<my-goods :datas="item.data"></my-goods>
				</uni-section>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movieList:[],
			};
		},
		onLoad(options){
			this.getMovieType()
		},
		methods:{
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
			async getMovieType(){
				let {data:res} = await uni.$http.post('/movieApi/movieType/query')
				if(res.code!=200)return uni.$showMsg()
				if(res.data && res.data.length>0){
					res.data.forEach(e=>{
						this.getMovieList(e)
					})
				}
			},
			async getMovieList(e){
				let {data:res1} = await uni.$http.post('/movieApi/movie/detailQuery',{movieType:e.movieType,pageNum:1,retNum:10})
				this.movieList.push({movieTypeName:e.movieTypeName,movieType:e.movieType,data:res1.data})
			},
			navClickHandler(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?pageType=more&navbarTitle='+item.movieTypeName+'&params='+item.movieType
				})
			}
		}
	}
</script>

<style lang="scss">
	.unilink{
		color:#ffa115;
		font-size: 34rpx;
		padding:20rpx 0;
	}
	.search-box{
		position: sticky;
		top:0;
		z-index: 999;
	}
	.uni-section .uni-section-header {
		padding-top:36rpx !important;
		padding-bottom: 60rpx !important;
	}
	.uni-section .uni-section-header__content .distraction {
		font-size: 36rpx !important;
	}
</style>

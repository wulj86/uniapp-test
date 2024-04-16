<template>
	<view>
		<view class="search-box">
			<my-search @myclick='gotoSearch'></my-search>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for='(item ,i) in movieList' :key="i"  style="position: relative;">
				<view class="unilink" @click="navClickHandler(item)">查看更多</view>
				<uni-section :title="item.movie_type_name" type="line">
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
				console.log(res)
				if(res.code!=200)return uni.$showMsg()
				if(res.data && res.data.length>0){
					res.data.forEach(e=>{
						this.getMovieList(e)
					})
				}
			},
			async getMovieList(e){
				let {data:res1} = await uni.$http.post('/movieApi/movie/detailQuery',{movieType:e.movie_type,pageNum:1,retNum:10})
				this.movieList.push({movie_type_name:e.movie_type_name,movie_type:e.movie_type,data:res1.data})
			},
			navClickHandler(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?pageType=more&navbarTitle='+item.movie_type_name+'&params='+item.movie_type
				})
			}
		}
	}
</script>

<style lang="scss">
	.unilink{
		position: absolute;
		z-index: 999;
		right:10px;
		top:10px;
		color:#ffa115
	}
	.search-box{
		position: sticky;
		top:0;
		z-index: 999;
	}
</style>

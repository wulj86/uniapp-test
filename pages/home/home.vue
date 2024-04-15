<template>
	<view>
		<view class="search-box">
			<my-search @myclick='gotoSearch'></my-search>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for='(item ,i) in floorList' :key="i"  style="position: relative;">
				<view class="unilink" @click="navClickHandler(item)">查看更多</view>
				<uni-section :title="'分组'+i" type="line">
					<my-goods :goods="item.product_list"></my-goods>
				</uni-section>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabBar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				floorList:[]
			};
		},
		onLoad(options){
			let url='/movie/movieComments/query?movieId=1'
			this.getFloorList()
			return
			uni.request({
				url,
				method:'GET',
				success() {
					
				}
			})
		},
		methods:{
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
			async getFloorList(){
				let {data:res} = await uni.$http.get('/v1/home/floordata')
				if(res.meta.status!=200)return uni.$showMsg()
					
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = prod.image_src
					})
				})
				this.floorList=res.message
			},
			navClickHandler(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?pageType=more&navbarTitle='+item.movieType
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

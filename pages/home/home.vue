<template>
	<view>
		<view class="search-box">
			<my-search @myclick='gotoSearch'></my-search>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for='(item ,i) in floorList' :key="i">
				<uni-section :title="'分组'+i" type="line" style="position: relative;">
					<view class="unilink" @click="navClickHandler(item)">查看更多</view>
					<!-- <view class="floor-img-box">
						 <view class="right-img-box">
							<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" :url='item2.url'>
								<img :src="item2.image_src" mode='widthFix' style="width:100rpx;height:160rpx">
							</navigator>
						 </view>
					</view> -->
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
			this.getFloorList()
		},
		methods:{
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
			async getFloorList(){
				let {data:res} = await uni.$http.get('/home/floordata')
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
					url:'/subpkg/goods_list/goods_list'
				})
				switch(item.name){
					case '分类':
						// uni.switchTab({
						// 	url:'/pages/cate/cate'
						// })
						break
				}
			}
		}
	}
</script>

<style lang="scss">
	.unilink{
		position: absolute;
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

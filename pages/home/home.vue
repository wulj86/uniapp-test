<template>
	<view>
		<view class="search-box">
			<my-search @myclick='gotoSearch'></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key='i'>
				<navigator class="swiper-item" :url="`/subpkg/goods_details/goods_details?goods_id=${item.goods_id}`">
					<img :src="item.image_src" alt="" srcset="">
				</navigator>
			</swiper-item>
		</swiper>
		
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<img :src="item.image_src" alt="" class='nav-img'>
			</view>
		</view>
		
		<view class="floor-list">
			<view class="floor-item" v-for='(item ,i) in floorList' :key="i">
				<img :src="item.floor_title.image_src" class='floor-title'>
				
				<view class="floor-img-box">
					 <navigator class="left-img-box" :url="item.product_list[0].url">
					 	<img :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode='widthFix'>
					 </navigator>
					 
					 <view class="right-img-box">
					 	<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if='i2!=0' :url='item2.url'>
					 		<img :src="item2.image_src" mode='widthFix' :style="{width:item2.image_width+'rpx'}">
					 	</navigator>
					 </view>
				</view>
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
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				let {data:res} = await uni.$http.get('/home/swiperdata')
				if(res.meta.status!=200)return uni.$showMsg()
				this.swiperList=res.message
			},
			async getNavList(){
				let {data:res} = await uni.$http.get('/home/catitems')
				if(res.meta.status!=200)return uni.$showMsg()
				this.navList=res.message
			},
			async getFloorList(){
				let {data:res} = await uni.$http.get('/home/floordata')
				if(res.meta.status!=200)return uni.$showMsg()
					
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList=res.message
			},
			navClickHandler(item){
				switch(item.name){
					case '分类':
						uni.switchTab({
							url:'/pages/cate/cate'
						})
						break
					// case '秒杀拍':
					// 	uni.navigateTo({
					// 		url:''
					// 	})
					// 	break
					// case '超市购':
					// 	uni.navigateTo({
					// 		url:''
					// 	})
					// 	break
					// case:'母婴品'
					// 	uni.navigateTo({
					// 		url:
					// 	})
					// 	break
				
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;
		.nav-img{
			width:128rpx;
			height: 140rpx;
		}
	}
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.floor-img-box{
		display: flex;
		padding-left:10rpx;
	}
	.search-box{
		position: sticky;
		top:0;
		z-index: 999;
	}
</style>

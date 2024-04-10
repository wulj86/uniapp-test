<template>
	<view>
		<uni-row class="demo-uni-row">
			<uni-col :span="6" :gutter='4' v-for="(item,i) in goods" :key="i">
				<!-- 导航路径谨慎，最好用绝对路径，相对路径在页面引用时会有问题 -->
				<navigator  :url="'/subpkg/goods_details/goods_details?goods_id='+item.goods_id" class="colitem">
					<img :src="item.image_src" @click="goDetail" style="width:100rpx;height:160rpx">
					<text>符合规划</text>
				</navigator>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
				type:Array,
				default:()=>[]
			},
		},
		data() {
			return {
			};
		},
		mounted(){
			// console.log(this.goods)
		},
		methods:{
			goDetail(){
				console.log(1111111)
			}
		}
	}
</script>

<style lang="scss">
	.demo-uni-row{
		margin-top: 20rpx;
	}
	.colitem{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-bottom: 20rpx;
	}
</style>

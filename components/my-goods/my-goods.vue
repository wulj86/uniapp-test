<template>
	<view>
		<uni-row class="demo-uni-row">
			<uni-col :span="6" :gutter='4' v-for="(item,i) in datas" :key="i">
				<!-- 导航路径谨慎，最好用绝对路径，相对路径在页面引用时会有问题 -->
				<navigator  :url="'/subpkg/goods_details/goods_details?movie_id='+item.movie_id" class="colitem">
					<img :src="baseUrl + item.img_src" style="width:100rpx;height:160rpx">
			h 		<uni-rate allow-half readonly :value="item.score/2" :size="12"/>
					<text>{{item.movie_name}}</text>
				</navigator>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	export default {
		props:{
			datas:{
				type:Array,
				default:()=>[]
			},
		},
		data() {
			return {
				baseUrl:'',//图像地址前缀
			};
		},
		mounted(){
			this.baseUrl=this.$store.state.m_user.imgBaseUrl
		},
		methods:{
			
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

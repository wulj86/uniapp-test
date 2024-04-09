<template>
	<view @click="searchBoxHandler" class="my-search-container" :style="{backgroundColor:bgColor}">
		<view class="my-search-box" :style="{borderRadius:radius+'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgColor:{
				type:String,
				default:"#c00000"
			},
			radius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('myclick')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	// background-color: #c00000;
	display: flex;
	align-items: center;
	padding:0 10px;
	
	.my-search-box{
		height: 36px;
		background-color: #fff;
		// border-radius: 18px;
		width: 100%;
		display: flex;
		justify-content: center;//在没有垂直布局flex-direction:colunm的时候需要水平垂直居中，反之只要再加垂直居中，因为垂直布局已有水平居中的样式
		align-items: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>

<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
				<radio value="" :checked='goods.goods_state' v-if="showRadio" color='#c00000' @click="radioClickHandler"/>
				<image :src="goods.goods_small_logo || defaultSrc" class="goods-pic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					 <view class="goods-price">
					 	${{goods.goods_price}}
					 </view>
					 <uni-number-box v-if='showNum' :min='1' :value='goods.goods_count' @change="numClickHandler"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
				type:Object,
				default:()=>{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defaultSrc:'http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg'
			};
		},
		methods:{
			radioClickHandler(){
				this.$emit('radioChange',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numClickHandler(val){
				this.$emit('numChange',{
					goods_id:this.goods.goods_id,
					goods_count:+val
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px;
	border-bottom:1px solid #efefef;
	.goods-item-left{
		margin-right:5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			display: flex;
			// align-items: center;
			justify-content: space-between;
			.goods-price{
				color:#c00000;
				font-size: 16px;
			}
		}
	}
}
</style>

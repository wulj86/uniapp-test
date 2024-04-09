<template>
	<view class="cart-container">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type='shop' size='18'></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key='i'>
				<uni-swipe-action-item  :right-options="options" @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :showRadio="true" :showNum='true' @radioChange='radioChangeHandler' @numChange='numberChangeHandler'></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
</template>

<script>
	import { mapState,mapMutations} from 'vuex'
	import badgeMix from '@/mixins/tabBar-badge.js'
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart',['cart'])
		},
		data() {
			return {
				options:[
					 {
						text: '删除',
						style: {
							backgroundColor: '#c00000'
						}
					}
				],
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			numberChangeHandler(e){
				this.updateGoodsCount(e)
				this.setBadge()
			},
			swipeActionClickHandler(goods){
				console.log(goods)
				this.removeGoodsById(goods)
				this.setBadge()
			}
		}
	}
</script>

<style lang="scss">
.cart-container{
		padding-bottom: 50px;
	}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		font-size: 14px;
		margin-left: 10px;
	}
}
</style>

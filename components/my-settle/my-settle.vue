<template>
	<view>
		<view class="my-settle-container">
			<label class="radio" @click="changeAllState">
				<radio :checked="isFullCheck" color="#c00000" /><text>全选</text>
			</label>
			<view class="amount-box">
				合计：<text class="amount">{{checkedGoodsAmount}}</text>
			</view>
			<view class="btn-settle" @click="settlement">
				结算{{checkedCount}}
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState','clearCart']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择商品')
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				if(!this.token) {
					uni.$showMsg('请先登录')
					this.delayNavigate()
				}
				this.payOrder()
			},
			async payOrder(){
				const orderInfo={
					order_price:0.01,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x=>x.goods_state).map(x=>({
						goods_id:x.goods_id,
						goods_price:x.goods_price,
						goods_number:x.goods_count
					}))
				}
				// const {data:res} = await uni.$http.post('/my/orders/create',orderInfo)
				// if(res.meta.status!=200) return uni.$showMsg('创建订单失败！')
				// const orderNumber=res.message.order_number//订单编号
				
				// const {data:res2} = await uni.$http.post('/my/orders/req_unifiedorder',{order_number:orderNumber})
				// if(res2.meta.status!=200) return uni.$showMsg('预付订单生成失败！')
				// const payInfo=res2.message.pay
				
				const payInfo={
					"timeStamp": "1564730510",
					  "nonceStr": "SReWbt3nEmpJo3tr",
					  "package": "prepay_id=wx02152148991420a3b39a90811023326800",
					  "signType": "MD5",
					  "paySign": "3A6943C3B865FA2B2C825CDCB33C5304",
					  }
				
				const {err,succ} = await uni.requestPayment(payInfo)//微信支付Api
				
				// if(err) return uni.$showMsg('订单未支付')
				// const {data:res3} = await uni.$http.post('/my/orders/chkOrder',{order_number:orderNumber})
				// if(res3.meta.status!=200) return uni.$showMsg('订单未支付')
				
				uni.showToast({
					title:'订单支付成功',
					icon:'success'
				})
				this.clearCart()
			},	
			delayNavigate(){
				const that=this
				this.seconds=3
				this.showTips(this.seconds)
				this.timer=setInterval(()=>{
					this.seconds--
					if(this.seconds<=0) {
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							success() {
								that.updateRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			showTips(n){
				uni.showToast({
					icon:'none',
					title:`请登录后再结算,${n}秒后自动跳转到登录页`,
					mask:true,
					duration:500
				})
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position:fixed;
	bottom: 0;
	left:0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-top: 1px solid #efefef;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #c00000;
		height: 50px;
		color: white;
		line-height: 50px;
		padding:0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>
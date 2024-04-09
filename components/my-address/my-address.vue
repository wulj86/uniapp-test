<template>
	<view>
		<view v-if="JSON.stringify(address)==='{}'" class="address-choose-box">
			<button type="primary" size='mini' class="btnChooseAdress" @click="chooseAddress">请选择收获地址+</button>
		</view>
		<view v-else class="address-info-box">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		
		<img src="/static/divider.png" alt="" class='address-boder'>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
				const [err,succ] = await uni.chooseAddress().catch(err=>err)
				// 安卓机或者苹果机返回信息
				if(err && (err.errMsg==='chooseAddress:fail auth deny' || succ.errMsg==='chooseAddress:fail authorize no response')){
					uni.$showMsg('需要重新授权')
					this.reAuth()
				}
				if(err===null && succ.errMsg==='chooseAddress:ok'){
					this.updateAddress(succ)
				}
			},
			async reAuth(){
				const [err2,confirmResult] =await uni.showModal({
					content:'检测到您没打开地址权限，是否打开？',
					confirmText:'确认',
					cancelText:'取消'
				})
				if(err2) return
				if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权')
				if(confirmResult.confirm) return uni.openSetting({
					success(e) {
						if(e.authSetting['scope.address']) uni.$showMsg('授权成功，请选择收获地址')
					}
				})
			}
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-boder{
	width: 100%;
	height: 10px;
}
.address-info-box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding:0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		.row1-right{
			display: flex;
			justify-content: space-between;
		}
	}
	.row2{
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.row2-left{
			white-space: nowrap;
		}
	}
}
</style>
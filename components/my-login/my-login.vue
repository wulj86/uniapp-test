<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
		<text class="tips-text">登陆后尽享更多权益</text>
		<!-- <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
		  <image class="avatar" :src="avatarUrl"></image>
		</button> 
		<input type="nickname" class="weui-input" placeholder="请输入昵称"/> -->
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				avatarUrl : 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo'])	
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			 // onChooseAvatar(e) {
				//  console.log(e)
			 //    this.avatarUrl = e.detail.avatarUrl 
			 //  },//获取头像昵称
			getUserInfo(){
				const that=this
				uni.getSetting({
				  success(res) {
				    if (!res.authSetting['scope.userInfo']) {
				      uni.authorize({
				        scope: 'scope.userInfo',
				        success () {
				          uni.$showMsg('授权成功')
				        }
				      })
				    }else{
						uni.getUserProfile({
							desc:'允许授权获取用户信息',
							success(e) {
								that.updateUserInfo(e.userInfo)
								that.getToken(e)
							}
						})
					}
				  }
				})
			},
			async getToken(e){
				const [err,res] = await uni.login().catch(err=>err)
				if(err||res.errMsg!=='login:ok') return uni.$showMsg('登录失败')
				console.log(res.code)
				console.log(e)
				const query={
					code:res.code,
					encryptedData:e.encryptedData,
					iv: e.iv,
					rawData:e.rawData,
					signature:e.signature,
				}
				// const {data:loginResult} =await uni.$http.post('/users/wxlogin',query)
				// if(loginResult.meta.status!=200) return uni.$showMsg('登录失败')
				uni.$showMsg('登录成功')
				this.updateToken('hhhhhhhhhh')
				this.navigateBack()
			},
			navigateBack(){
				const that= this
				if(this.redirectInfo && this.redirectInfo.openType=='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete() {
							that.updateRedirectInfo({})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
	
	&::after{
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 90%;
		border-radius:100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>
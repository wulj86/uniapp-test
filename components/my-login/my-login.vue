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
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			getUserInfo(){
				const that=this
				uni.getSetting({//判断用户是否已授权
				  success(res) {
					  console.log(res)
				    if (!res.authSetting['scope.userInfo']) {
				      uni.authorize({
				        scope: 'scope.userInfo',
				        success () {
				          uni.$showMsg('授权成功')
				        }
				      })
				    }else{
						uni.login({
						  provider: 'weixin', //使用微信登录
						  success: function (loginRes) {
						    console.log(loginRes.authResult);
						  }
						});
						// this.login()
					}
				  }
				})
			},
			async login(){
				//获取微信登录凭证
				// await uni.login().catch(err=>err)
				
				//登录服务器
				let res1 = await uni.$http.post('/movieApi/userAccount/login',{userAccount:'123',weixinCode:res.code})
				if(res1.code!=200) return uni.$showMsg('登录失败')
				uni.$showMsg('登录成功')
				this.updateUserInfo(res.data)
				this.updateToken('hhhhhhhhhh')
			},
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
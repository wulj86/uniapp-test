<template>
	<view class="login-container">
		<view class="example">
			<view class="segmented-control" style="margin-bottom: 40rpx;">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button">
				</uni-segmented-control>
			</view>
			<!-- 展示不同的排列方式 -->
			<view v-show='current==0'>
				<uni-forms ref="form" :modelValue="form" :rules="rules">
					<uni-forms-item label="账号" required name="userAccount">
						<uni-easyinput v-model="form.userAccount" placeholder="请输入账号" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput v-model="form.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('form')">登录</button>
			</view>
			
			<view v-show='current==1'>
				<uni-forms ref="form1" :modelValue="form1" :rules="rules1">
					<uni-forms-item label="账号" required name="userAccount">
						<uni-easyinput v-model="form1.userAccount" placeholder="请输入账号" />
					</uni-forms-item>
					<uni-forms-item label="手机号" required name="userNumber">
						<uni-easyinput v-model="form1.userNumber" placeholder="请输入手机号" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput v-model="form1.password" placeholder="请输入密码" />
					</uni-forms-item>
					<!-- <uni-forms-item label="确认密码" required name="password">
						<uni-easyinput v-model="form.password" placeholder="请输入密码" />
					</uni-forms-item> -->
				</uni-forms>
				<button type="primary" @click="registAccount('form1')">注册</button>
			</view>
			
		</view>

		<!-- <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button> -->
		
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				 items: ['登录', '注册'],
				current: 0,
				form:{
					userAccount:'',
					password:''
				},
				rules: {
					userAccount: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				},
				form1:{
					userAccount:'',
					userName:'',
					userNumber:'',
					password:''
				},
				rules1: {
					userAccount: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					},
					userNumber: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}, {
							minLength: 8,
							errorMessage: '密码字数不能少于8位'
						}]
					}
				},
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			// getUserInfo(){
			// 	const that=this
			// 	uni.getSetting({//判断用户是否已授权
			// 	  success(res) {
			// 	    if (!res.authSetting['scope.userInfo']) {
			// 	      uni.authorize({
			// 	        scope: 'scope.userInfo',
			// 	        success () {
			// 	          uni.$showMsg('授权成功')
			// 	        }
			// 	      })
			// 	    }else{
			// 			that.login()
			// 		}
			// 	  }
			// 	})
			// },
			onClickItem(e) {
			      if (this.current != e.currentIndex) {
			        this.current = e.currentIndex;
			      }
			},
			submit(){
				//获取微信登录凭证
				// let res = await uni.login().catch(err=>err)
				//登录
				this.$refs.form.validate().then(async(res)=>{
					if(res){
						let {data:res1} = await uni.$http.post('/movieApi/userAccount/login',this.form)
						if(res1.code!=200) return uni.$showMsg('登录失败')
						uni.$showMsg('登录成功')
						this.updateUserInfo(res1.data[0])
						this.updateToken(res1.data[0]?.token)
					}
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
				
			},
			registAccount(){
				//注册
				this.$refs.form1.validate().then(async(res)=>{
					if(res){
						this.form1.userName=this.form1.userAccount
						let {data:res1} = await uni.$http.post('/movieApi/userAccount/add',this.form1)
						if(res1.code!=200) return uni.$showMsg('注册失败')
						uni.$showMsg('注册成功，请登录！')
						this.current=0
					}
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
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
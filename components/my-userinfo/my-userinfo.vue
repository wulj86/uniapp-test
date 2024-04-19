<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<img src="/static/avatar.png" class='avatar' alt="">
			<view class="nickname">
				{{userinfo.userName}}
			</view>
		</view>
		
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<navigator  url="/subpkg/goods_list/goods_list?pageType=like" class="colitem">
						<view class="panel-item">
							<text>{{collected}}</text>
							<text>想看的</text>
						</view>
					</navigator>
					<view class="panel-item">
						<text>|</text>
					</view>
					<navigator  url="/subpkg/goods_list/goods_list?pageType=read" class="colitem">
						<view class="panel-item">
							<text>{{read}}</text>
							<text>看过的</text>
						</view>
					</navigator>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-list-item" @click="logOut">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapState } from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				collected:0,
				read:0,
			};
		},
		computed:{
			...mapState('m_user',['userinfo']),
		},
		mounted(){
				this.getData()
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			async logOut(){
				const [err,succ] =await uni.showModal({
					title:'提示',
					content:'确认退出登录吗',
				}).catch(err=>err)
				if(succ && succ.confirm){
					let {data:res1} = await uni.$http.post('/movieApi/userAccount/logout',{userAccount:'123'})
					if(res1.code!=200) return
					this.updateUserInfo({})
					this.updateToken('')
				}
			},
			async getData(){
				let {data:res1} = await uni.$http.post('/userMoviePreferences/queryLikes',{
					userAccount:this.userinfo.userAccount
				})
				if(res1.code!=200) return uni.$showMsg('网络异常！')
				this.collected=res1.total??0
				
				let {data:res2} = await uni.$http.post('/userMoviePreferences/queryReads',{
					userAccount:this.userinfo.userAccount,
				})
				if(res2.code!=200) return uni.$showMsg('网络异常！')
				this.read=res2.total??0
			}
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	background-color: #f4f4f4;
	.top-box{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.avatar{
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		.nickname{
			font-size: 16px;
			color: #fff;
			margin-top: 10px;
		}
	}
	.panel-list{
		padding: 0 10px;
		position: relative;
		top:-10px;
		.panel{
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			.panel-body{
				display: flex;
				justify-content: space-around;
				.colitem{
					width: 40%;
				}
				.panel-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					font-size: 12px;
					padding: 10px 0;
					.icon{
						width: 30px;
						height: 30px;
						}
				}
			}
			.panel-title{
				line-height: 45px;
				padding-left: 10px;
				font-size: 14px;
				border-bottom: 1px solid #efefef;
			}
		}
	}
	.panel-list-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		padding: 0 10px;
		line-height: 45px;
	}
}
</style>
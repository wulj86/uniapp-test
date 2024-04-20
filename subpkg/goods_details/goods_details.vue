<template>
	<page-meta>
	    <navigation-bar
	      :title="movie.movieName"
	    />
	  </page-meta>
	<view class="container">
		<view class="top">
			<img :src="baseUrl+movie.imgSrc" alt="图片" class="top-left">
			<view class="top-right">
				<view style="font-size: 38rpx;font-weight: 400;letter-spacing: 4rpx;">{{movie.movieName}}</view>
				<view style="color: #ff5722;">导演：{{movie.director}}</view>
				<view style="color: #9E9E9E;">
					{{movie.movieTypeName}}—{{movie.address}}
				</view>
				<view class="bottom">
					<uni-fav :checked="movie.collected==1" bgColor='white' fgColor='grey' bgColorChecked='white' fgColorChecked='orange'
					 class="favBtn" :content-text="{contentDefault: '想看',contentFav: '想看'}" @click="favClick(1,movie.collected)" />
					<uni-fav :checked="movie.read==1" bgColor='white' fgColor='grey' bgColorChecked='white' fgColorChecked='orange'
					 class="favBtn" :content-text="{contentDefault: '看过',contentFav: '看过'}" @click="favClick(2,movie.read)" />
				</view>
			</view>
		</view>
		
		<uni-card margin="0" shadow="0px 0px 3px 1px rgba(0, 0, 0, 0.08)">
			<view class="uni-body">
				<view style="font-size: 28rpx;">豆瓣评分</view>
				<view class="score">
					<uni-rate allow-half readonly :value="movie.score/2" :is-fill="false" :size="18"/>
					<view style="font-size: 56rpx;font-weight: bold;padding:28rpx 0">{{movie.score}}</view>
				</view>
			</view>
		</uni-card>
		<view style="margin-top:20rpx;">
			<view class="group">简介</view>
			<!-- <view class="intro-ellipsis" v-show="showEllipsis">
				{{movie.introduction}}
			</view> -->
			<view style="letter-spacing: 4rpx;">
				{{movie.introduction}}
			</view>
			<!-- <rich-text :nodes="movie.introduction" v-show="!showEllipsis" style="letter-spacing: 4rpx;"></rich-text> -->
			<!-- <view class="unilink" @click="showIntro">查看更多</view> -->
		</view>
		<view style="margin-bottom: 20rpx;">
			<view class="group">演员</view>
			<view class="actorGroup">
				<view class="actor" v-for='(actor,index) in actorData' :key='index'>{{actor}}</view>
			</view>
		</view>
		<view style="margin-top: 60rpx;">
			<view class="commonClass">
				<view class="group">留言板</view>
				<view class="commonClass" style="padding:30rpx" @click="openPopup"><uni-icons type="compose" size="26"></uni-icons><text style="font-size: 32rpx;">评论</text></view>
			</view>
			<view  v-for="(item,i) in comments" :key='i' style="margin-bottom: 36rpx;">
				<view class="comments">
					<view class="left">
						<img src="/static/cart.png" alt="头像" class="avatar">
						<text>{{item.userAccount}}</text>
					</view>
					<text style="color:#9E9E9E">{{item.createTime}}</text>
				</view>
				<rich-text :nodes="item.content"style="letter-spacing: 4rpx;"></rich-text>
			</view>
			<view class="unilink" @click="getMoreComments" v-if='showCommentsMoreBtn'>查看更多</view>
		</view>
		<uni-popup ref="popup" background-color="#fff" type="bottom">
			<view style="padding: 20rpx;font-size: 28rpx;letter-spacing: 2rpx;">
				评论窗口
			</view>
			<uni-easyinput type="textarea" autoHeight v-model="comment" placeholder="请输入评论内容" :cursor-spacing='150'></uni-easyinput>
			<view style="text-align: center;padding:40rpx 0">
				<button class="mini-btn" type="primary" size="mini" style="width: 200rpx;" @click="submitComment">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
					showEllipsis:true,//展示简介
					movie:{
						movieId:'',
						imgSrc:'',
						movieName:'',//电影名称
						director:'',//导演
						movieTypeName:'',
						address:'',
						score:'',
						actor:'',
						collected:0,//想看
						read:0,//看过
						introduction:``,//电影介绍
					},
					actorData:[],
					comments:[],//评论内容数据
					comment:'',//添加评论内容
					page:1,//评论内容分页
					size:10,
					total:0,
					baseUrl:'',
				}
		},
		computed:{
			...mapState('m_user',['userinfo','token']),
			showCommentsMoreBtn(){
				return this.page*this.size < this.total
			}
		},
		async onLoad(options){
			this.baseUrl=this.$store.state.m_user.imgBaseUrl
			let obj={movieId:options.movieId}
			if(this.justifyLogin()){
				obj.userAccount=this.userinfo.userAccount,
				obj.token=this.token
			}
			//获取电影详情
			let {data:res} = await uni.$http.post('/movieApi/movie/detailQuery',obj)
			if(res.code!=200) return uni.$showMsg('获取数据失败')
			this.movie=res.data[0]
			this.actorData=this.movie.actor.split('/')
			this.getComments()
		},
		methods:{
			// showIntro(){
			// 	this.showEllipsis=!this.showEllipsis
			// 	this.$forceUpdate()
			// },
			async getComments(){
				//获取电影相关评论
				let {data:res} = await uni.$http.post('/movieApi/movieComments/query',{movieId:this.movie.movieId})
				if(res.code!=200) return uni.$showMsg('获取评论数据失败')
				if(this.page!==1){
					this.comments=[...this.comments,...res.data]
				}else{
					this.comments=[...res.data]
				}
				this.total=res.total
				if(!this.showCommentsMoreBtn) return uni.$showMsg('数据加载完毕！')
			},
			getMoreComments(){
				this.page++
				this.getComments()
			},
			justifyLogin(){//判断是否登录
				if(!this.token) return false
				return true
			},
			async favClick(type,value) {//想看和看过
			console.log(value)
				if(this.justifyLogin()){
					if(type==1){
						let key=value!=1?'addLikes':'removeLikes'
						let {data:res} = await uni.$http.post(`/userMoviePreferences/${key}`,{
							userAccount:this.userinfo.userAccount,
							movieId:this.movie.movieId,
							token:this.token
						})
						if(res.code!=200) return uni.$showMsg('网络异常！')
						this.movie.collected=!this.movie.collected
					}else{
						let key2=value!=1?'addReads':'removeReads'
						let {data:res} = await uni.$http.post(`/userMoviePreferences/${key2}`,{
							userAccount:this.userinfo.userAccount,
							movieId:this.movie.movieId,
							token:this.token
						})
						if(res.code!=200) return uni.$showMsg('网络异常！')
						this.movie.read=!this.movie.read
					}
					this.$forceUpdate()
				}else{
					uni.switchTab({
						url:'/pages/my/my'
					})
				}
				
			},
			openPopup(){//添加评论弹窗
				if(this.justifyLogin()){
					this.$refs.popup.open()
				}else{
					uni.switchTab({
						url:'/pages/my/my'
					})
				}
			},
			async submitComment(){
				let obj={
					userName:this.userinfo.userName,
					userAccount:this.userinfo.userAccount,
					movieId:this.movie.movieId,
					content:this.comment,
					token:this.token
				}
				let {data:res} = await uni.$http.post('/movieApi/movieComments/add',obj)
				if(res.code!=200) return uni.$showMsg('添加评论失败')
				uni.$showMsg('添加评论成功')
				this.page=1
				this.getComments()
				this.$refs.popup.close()
				this.comment=null
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: RGB(245,245,245);
	}
	.container{
		padding: 20rpx;
		.top{
			display: flex;
			margin-bottom: 20rpx;
			.top-left{
				width: 200rpx;
				height: 300rpx;
				box-shadow:0px 0px 10px 6px rgba(0, 0, 0, 0.15);
				border-radius: 8rpx;
			}
			.top-right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 40rpx;
				justify-content: space-around;
				.bottom{
					display: flex;
					justify-content: space-around;
					.favBtn{
						box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.15);
					}
				}
			}
		}
	.uni-body{
			// background-color: white;
			height: 180rpx;
			.score{
				display: flex;
				align-items: center;
				flex-direction: column;
			}
		}
	}
	.group{
		font-size: 36rpx;
		font-weight: bold;
		margin:30rpx 0;
	}
	.unilink{
		padding: 20rpx 0;
		margin-top: 10rpx;
		color:#ffa115;
		text-align: right;
		font-size: 30rpx;
	}
	.intro-ellipsis{
		display: -webkit-box;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 4; /* 显示的行数，可以根据需要修改 */
		  overflow: hidden;
		  text-overflow: ellipsis;
		  letter-spacing: 4rpx;
	}
	.actorGroup{
		margin-top: 40rpx;
		padding-top: 20rpx;
		.actor{
			margin-left: 10rpx;
			margin-bottom: 10rpx;
			padding: 24rpx 30rpx;
			background: #009688;
			border-radius: 10rpx;
			color: white;
			font-size: 30rpx;
			display: inline-block;
		}
	}
	.comments{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
		.left{
			display: flex;
			align-items: center;
			.avatar{
				width: 36rpx;
				height: 36rpx;
				border-radius: 40rpx;
				border: 1px solid grey;
				padding: 14rpx;
				margin-right: 10rpx;
			}
		}
	}
	.commonClass{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

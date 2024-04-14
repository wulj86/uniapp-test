<template>
	<view class="container">
		<view class="top">
			<img :src="movie.img_src" alt="图片" class="top-left">
			<view class="top-right">
				<view style="font-size: 38rpx;font-weight: 400;letter-spacing: 4rpx;">{{movie.title}}</view>
				<view style="color: #ff5722;">导演：{{movie.director}}</view>
				<view style="color: #9E9E9E;">
					{{movie.movieType.join('/')}}—{{movie.address.join('/')}}
				</view>
				<view class="bottom">
					<uni-fav :checked="movie.collected" bgColor='white' fgColor='grey' bgColorChecked='white' fgColorChecked='orange'
					 class="favBtn" :content-text="{contentDefault: '想看',contentFav: '想看'}" @click="favClick(1)" />
					<uni-fav :checked="movie.read" bgColor='white' fgColor='grey' bgColorChecked='white' fgColorChecked='orange'
					 class="favBtn" :content-text="{contentDefault: '看过',contentFav: '看过'}" @click="favClick(2)" />
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
			<view class="intro-ellipsis" v-if="showEllipsis">
				{{movie.movieIntroduction}}
			</view>
			<rich-text :nodes="movie.movieIntroduction" v-else style="letter-spacing: 4rpx;"></rich-text>
			<view class="unilink" @click="showEllipsis=!showEllipsis">查看更多</view>
		</view>
		<view>
			<view class="group">演员</view>
			<view class="actorGroup">
				<text class="actor" v-for='(actor,index) in movie.actor' :key='index'>{{actor}}</text>
			</view>
		</view>
		<view style="margin-top: 60rpx;">
			<view class="commonClass">
				<view class="group">留言板</view>
				<view class="commonClass" @click="openPopup"><uni-icons type="compose" size="18"></uni-icons><tex>评论</tex></view>
			</view>
			<view  v-for="(item,i) in comments" :key='i' style="margin-bottom: 36rpx;">
				<view class="comments">
					<view class="left">
						<img src="/static/cart.png" alt="头像">
						<text>{{item.account}}</text>
					</view>
					<text style="color:#9E9E9E">{{item.date}}</text>
				</view>
				<rich-text :nodes="item.content"style="letter-spacing: 4rpx;"></rich-text>
			</view>
		</view>
		<uni-popup ref="popup" background-color="#fff" type="bottom">
			<view style="padding: 20rpx;font-size: 28rpx;letter-spacing: 2rpx;">
				评论窗口
			</view>
			<uni-easyinput type="textarea" autoHeight v-model="comment" placeholder="请输入评论内容"></uni-easyinput>
			<view style="text-align: center;margin:30rpx 0">
				<button class="mini-btn" type="primary" size="mini" style="width: 200rpx;" @click="submitComment">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
// 	import { mapState,mapMutations,mapGetters } from 'vuex'
	export default {
		// computed:{
		// 	...mapState('m_cart',[]),
		// 	...mapGetters('m_cart',['total'])
		// },
		data() {
			return {
					showEllipsis:true,//展示简介
					movie:{
						img_src:'/static/jomoo.png',
						title:'杀死比尔分公司分公司',//电影名称
						director:'胜多负少',//导演
						movieType:['动作','喜剧'],
						address:['中国大陆','中国香港'],
						score:'4.7',
						actor:['赵丽颖','林更新','今晨','严宽'],
						collected:true,//想看
						read:false,//看过
						movieIntroduction:`更丰富付付付付法定公司法告诉对方告诉对方告诉对方告诉告诉对方
						付付付付付规划的规划基督教，付付付付付规划的规划基督教，付付付付付规划的规划基督教，付付付付付规划的规划基督教
						对方告诉对方告诉对方告诉对方。对方告诉对方告诉对方公司的风格。更丰富付付付付法定公司法告诉对方告诉对方告诉对方告诉告诉对方
						付付付付付规划的规划基督教，付付付付付规划的规划基督教，付付付付付规划的规划基督教，付付付付付规划的规划基督教
						对方告诉对方告诉对方告诉对方。对方告诉对方告诉对方公司的风格。更丰富付付付付法定公司法告诉对方告诉对方告诉对方告诉告诉对方
						付付付付付规划的规划基督教，付付付付付规划的规划基督教，付付付付付规划的规划基督教，付付付付付规划的规划基督教
						对方告诉对方告诉对方告诉对方。对方告诉对方告诉对方公司的风格。`,//电影介绍
					},
					comments:[//评论内容数据
						{
							account:'水电费',
							date:'2024-04-05',
							content:'分隔符过多所所所所所所所所所所所所所所所所所付噶奥奥噶多付噶付'
						},
						{
							account:'分隔符',
							date:'2024-04-05',
							content:'方同意退货还有分公司'
						},
						{
							account:'会更好',
							date:'2024-04-05',
							content:'双方告诉对方告诉对方告诉对方公司分公司的风格'
						},
					],
					comment:'',//添加评论内容
				}
		},
		onLoad(options){
			
		},
		methods:{
			// ...mapMutations('m_cart',['addToCart']),
			favClick(num) {
				if(num==1){
					this.movie.collected=!this.movie.collected
				}else{
					this.movie.read=!this.movie.read
				}
				this.$forceUpdate()
			},
			openPopup(){
				this.$refs.popup.open()
			},
			submitComment(){
				
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
		font-size: 30rpx;
		font-weight: bold;
		margin:20rpx 0;
	}
	.unilink{
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
			padding: 30rpx 40rpx;
			background: #009688;
			border-radius: 10rpx;
			color: white;
			font-size: 30rpx;
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
			image{
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

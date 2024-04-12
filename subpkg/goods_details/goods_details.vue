<template>
	<view class="container">
		<view class="top">
			<img :src="movie.img_src" alt="图片" class="top-left">
			<view class="top-right">
				<view style="font-size: 38rpx;font-weight: 400;letter-spacing: 4rpx;">{{movie.title}}</view>
				<view style="color: #ff5722;">导演：{{movie.director}}</view>
				<view style="color: #9E9E9E;">
					{{movie.movieType.join('/')}}——{{movie.address.join('/')}}
				</view>
				<view class="bottom">
					<view class="favi">
						<uni-icons type='star' size="18" color="gray" v-if='!movie.collected'></uni-icons>
						<uni-icons type='star-filled' size="18" color="gray" v-else></uni-icons>
						<text style="font-weight: bold;margin-left:10rpx;">想看</text>
					</view>
					<view class="favi">
						<uni-icons type='color' size="18" color="gray" v-if='!movie.read'></uni-icons>
						<uni-icons type='color-filled' size="18" color="gray" v-else></uni-icons>
						<text style="font-weight: bold;margin-left:10rpx;">看过</text>
					</view>
				</view>
			</view>
		</view>
		
		<uni-card margin="15" shadow="3px 0px 3px 1px rgba(0, 0, 0, 0.08)" >
			<view class="uni-body">
				<view>豆瓣评分</view>
				<view class="score">
					<view>
						<uni-icons type='star' size="18" color="orange"></uni-icons>
						<uni-icons type='star' size="18" color="orange"></uni-icons>
						<uni-icons type='star' size="18" color="orange"></uni-icons>
						<uni-icons type='star' size="18" color="grey"></uni-icons>
						<uni-icons type='star' size="18" color="grey"></uni-icons>
					</view>
					<view style="font-size: 44rpx;font-weight: bold;">{{movie.score}}</view>
				</view>
			</view>
		</uni-card>
		<view>
			<view class="group">简介</view>
			<rich-text :nodes="movie.movieIntroduction"></rich-text>
		</view>
		<view>
			<view class="group">演员</view>
		</view>
		
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
					movie:{
						img_src:'/static/jomoo.png',
						title:'杀死比尔分公司分公司',//电影名称
						director:'胜多负少',//导演
						movieType:['动作','喜剧'],
						address:['中国大陆','中国香港'],
						score:'6.0',
						actor:['赵丽颖','林更新','今晨','严宽'],
						collected:true,//想看
						read:false,//看过
						movieIntroduction:'更丰富付付付付付付付付付付付付付付付付付付付付付付付付付付付付付付付    付付付付付规划的规划基督教',//电影介绍
					},
					comments:[
						{
							author:'水电费',
							content:'分隔符过多所所所所所所所所所所所所所所所所所付噶奥奥噶多付噶付'
						},
						{
							author:'水电费',
							content:'分隔符过多所所所所所所所所所所所所所所所所所付噶奥奥噶多付噶付'
						},
						{
							author:'水电费',
							content:'分隔符过多所所所所所所所所所所所所所所所所所付噶奥奥噶多付噶付'
						},
					]
				}
		},
		onLoad(options){
			
		},
		methods:{
			// ...mapMutations('m_cart',['addToCart']),
			
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
					.favi {
						    justify-content: center;
						    width: 150rpx;
						    height: 70rpx;
						    background-color: white;
						    display: flex;
						    align-items: center;
					}
				}
			}
		}
	.uni-body{
			// background-color: white;
			height: 140rpx;
			.score{
				display: flex;
				align-items: center;
				flex-direction: column;
			}
		}
	}
</style>

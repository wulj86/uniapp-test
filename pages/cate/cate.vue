<template>
	<view>
		<swiper circular :indicator-dots="true" autoplay :interval="4000"
			:duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key='index'>
				<navigator  :url="'/subpkg/goods_details/goods_details?goods_id='+item.goods_id" class="navigator">
					<img :src="item.img_src">
				</navigator>
			</swiper-item>
		</swiper>
		<view class="category">
			<navigator  :url="'/subpkg/goods_list/goods_list'" class="navigator" v-for="(cate,i) in cateList" :key="i">
				<uni-card margin="15" shadow="3px 0px 3px 1px rgba(0, 0, 0, 0.08)" >
					<view class="uni-body">
						<img :src="cate.img_src" class="left">
						<view class="right">
							<view v-for="(goods,i2) in cate.goodsList" :key="i2" class="item">
								<view class="name">{{i2+1}}、{{goods.movieName}}分</view><text class="score">{{goods.movieScore}}</text>
							</view>
						</view>
					</view>
				</uni-card>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[
					{
						goods_id:'1',
						img_src:'https://api-hmugo-web.itheima.net/pyg/pic_floor01_2@2x.png'
					},
					{
						goods_id:'2',
						img_src:'https://api-hmugo-web.itheima.net/pyg/pic_floor02_2@2x.png'
					},
					{
						goods_id:'3',
						img_src:'https://api-hmugo-web.itheima.net/pyg/pic_floor03_2@2x.png'
					},
				],
				cateList:[
					{
						img_src:'https://api-hmugo-web.itheima.net/pyg/pic_floor01_2@2x.png',
						goodsList:[
							{
								movieScore:'5.3',
								movieName:'杀死比尔杀死比尔杀死杀死比尔杀死比尔杀死比尔杀死比尔'
							},
							{
								movieScore:'5.3',
								movieName:'杀死比尔 dfgfds dgdfg dfgdf fgdfg dgdfg gdfg'
							},
							{
								movieScore:'5.3',
								movieName:'杀死比尔fghdfghdfghfghfghd fhdfgh'
							},
						]
					},
					{
						img_src:'https://api-hmugo-web.itheima.net/pyg/pic_floor02_2@2x.png',
						goodsList:[
							{
								movieScore:'5.3',
								movieName:'杀死比尔杀死比尔杀死杀死比尔杀死比尔杀死比尔杀死比尔'
							},
							{
								movieScore:'5.3',
								movieName:'杀死比尔'
							},
							{
								movieScore:'5.3',
								movieName:'杀死比尔'
							},
						]
					},
					{
						img_src:'https://api-hmugo-web.itheima.net/pyg/pic_floor03_2@2x.png',
						goodsList:[
							{
								movieScore:'5.3',
								movieName:'杀死比尔'
							},
							{
								movieScore:'5.3',
								movieName:'杀死比尔'
							},
							{
								movieScore:'5.3',
								movieName:'杀死比尔'
							},
						]
					},
				]
			};
		},
		onLoad(){
			
		},
		methods:{
			async getCateList(){
				
			},
		}
	}
</script>

<style lang="scss">
	swiper {
			height: 300rpx;
			padding: 10px;
		}
	navigator,image{
		width:100%;
		height: 100%;
	}
	.category{
		.uni-card{
			padding:0px !important;
			.uni-card__content{
				padding:0px !important;
			}
			.uni-body{
				display: flex;
				height: 160rpx;
				image.left{
					width: 30%;
					height: 100%;
				}
				.right{
					width: 60%;
					margin-left:10px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: end;
					padding: 10px;
					.item{
						width:100%;
						display: flex;
						.name{
							max-width: 70%;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.score{
							font-weight: 400;
							font-size: 32rpx;
							color: #ffa115;
							margin-left: 40rpx;
						}
					}
				}
			}
		}
	}
</style>

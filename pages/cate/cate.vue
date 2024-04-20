<template>
	<view>
		<swiper circular :indicator-dots="true" autoplay :interval="4000"
			:duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key='index'>
				<navigator  :url="'/subpkg/goods_details/goods_details?movieId='+item.movieId" class="navigator">
					<img :src="baseUrl+item.imgSrc" style="width: 100%;height: 100%;">
				</navigator>
			</swiper-item>
		</swiper>
		<view class="category">
			<navigator :url="'/subpkg/goods_list/goods_list?pageType=cate&navbarTitle='+cate.rankTypeName+'&params='+cate.rankType" class="navigator" v-for="(cate,i) in cateList" :key="i">
				<uni-card margin="15" shadow="3px 0px 3px 1px rgba(0, 0, 0, 0.08)" >
					<view class="uni-body">
						<img :src="cate.imgSrc" class="swiperImg">
						<view class="right">
							<view v-for="(movie,i2) in cate.data" :key="i2" class="item">
								<view class="name">{{i2+1}}、{{movie.movieName}}</view><text class="score">{{movie.score}}分</text>
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
				swiperList:[],//轮播图
				cateList:[],//榜单分类
				baseUrl:''
				};
		},
		onLoad(){
			this.baseUrl=this.$store.state.m_user.imgBaseUrl
			this.getCateType()
		},
		methods:{
			async getCateType(){
				let {data:res} = await uni.$http.post('/movieApi/movieRank/query')
				if(res.code!=200)return uni.$showMsg()
				if(res.data && res.data.length>0){
					res.data.forEach(e=>{
						this.getCateList(e)
					})
				}
			},
			async getCateList(e){
				let {data:res1} = await uni.$http.post('/movieApi/movieRank/queryMovie',{rankType:e.rankType,pageNum:1,retNum:3})
				if(e.rankType==4){
					this.swiperList=res1.data
					return
				}
				switch (e.rankType){
					case 1:
						e.imgSrc='/static/top250.png'
						break;
					case 2:
						e.imgSrc='/static/top250.png'
						break;
					default:
						e.imgSrc='/static/top250.png'
						break;
				}
				this.cateList.push({...e,data:res1.data})
			}
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
				.swiperImg{
					width: 30%;
					height: 100%;
				}
				.right{
					width: 60%;
					margin-left:10px;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					align-items: end;
					padding: 0 10px;
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

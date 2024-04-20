<template>
	<page-meta>
	    <navigation-bar
	      title="搜索"
	    />
	  </page-meta>
	<view>
		<view class="seach-box">
			<uni-search-bar v-model='keyWord' :focus="true" @input='search' :radius='100' cancelButton='none'></uni-search-bar>
		</view>
		<view class="sugg-list" v-show='searchResults.length>0'>
			<view class="sugg-item" @click="gotoDetail(item)" v-for='(item,i) in searchResults' :key='i'>
				<view class="left">
					<img :src="baseUrl+item.imgSrc" alt="图片" class="searchImg" />
					<view class="detail">
						<view class="goods-name">{{item.movieName}}</view>
						<uni-rate allow-half readonly :value="item.score/2" :size="12"/>
						<!-- <view class="actor">{{item.actor}}</view> -->
					</view>
				</view>
				<uni-icons type='arrowright' size='16'></uni-icons>
			</view>
		</view>
		
		<view class="history-box" v-show='searchResults.length==0'>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type='trash' size='17' @click="clean"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag @click="searchHistory(item)" :text="item" v-for="(item,i) in historyList" :key='i'></uni-tag>
			</view>
			<view class='none'>暂无数据，快点搜索吧！</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord:'',//关键词
				timer:null,//搜索防抖
				searchResults:[],//搜索结果
				historyList:[],//搜索历史
				total:0,
				queryObj:{
					pageNum:1,
					retNum:8,
				},
				isLoading:false,
				baseUrl:''
			};
		},
		onLoad() {
			this.baseUrl=this.$store.state.m_user.imgBaseUrl
			//获取历史搜索关键词
			let str=uni.getStorageSync('kw')??''
			if(str){
				this.historyList=str.split(',')
			}
		},
		onReachBottom(){
			if(this.queryObj.pageNum*this.queryObj.retNum >= this.total) return uni.$showMsg('数据加载完毕！')
			if(this.isLoading) return
			this.queryObj.pageNum++
			this.getSearchList(2)
		},
		onPullDownRefresh(){
			this.queryObj.pageNum=1
			this.isLoading=false
			this.searchResults=[]
			this.total=0
			this.getSearchList(1,()=>uni.stopPullDownRefresh())
		},
		methods:{
			search(e){//关键词改变事件
				this.keyWord=e
				clearTimeout(this.timer)
				if(!e) return this.searchResults=[]
				this.timer=setTimeout(()=>{
					this.getSearchList(1)
				},500)
			},
			async getSearchList(type,cb){
				//type为1表示重新搜索，为2表示下拉查询更多
				if(type==1) {
					this.searchResults=[]
					this.queryObj.pageNum=1
				}
				this.isLoading=true
				if(!this.historyList.includes(this.keyWord)) this.historyList.unshift(this.keyWord)
				uni.setStorageSync('kw',this.historyList.toString())
				let {data:res} = await uni.$http.post(`/movieApi/movie/fuzzyQquery`,{queryParam:this.keyWord,...this.queryObj})
				if(res.code!=200)return uni.$showMsg()
				this.searchResults=[...this.searchResults,...res.data]
				this.isLoading=false
				this.total=res.total
				cb && cb()
			},
			searchHistory(e){
				this.keyWord=e
			},
			gotoDetail(item){
				uni.navigateTo({
					url:`../goods_details/goods_details?movieId=${item.movieId}`
				})
			},
			clean(){
				this.historyList=[]
				uni.setStorageSync('kw','')
			}
		}
	}
</script>

<style lang="scss">
.seach-box{
	position: sticky;
	top:0;
	z-index: 999;
	background: white;
}
.sugg-list{
	padding:0 20rpx;
	.sugg-item{
		padding: 26rpx 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			display: flex;
			align-items: center;
			.searchImg{
				width: 100rpx;
				height: 120rpx;
				margin-right: 30rpx;
			}
			.detail{
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				.actor{
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					color: #9E9E9E;
					width: 80%;
				}
			}
		}
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 6rpx;
		}
	}
}
.history-box{
	padding:  0 10rpx;
	.history-title{
		height: 80rpx;
		display: flex;
		align-items: center;//父元素若有设置高度，可以设置这个来垂直居中
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			display: block;
			margin-top: 30rpx;
			margin-right: 10rpx;
		}
	}
	.none{
		margin-top: 40%;
		font-size: 20px;
		text-align: center;
	}
}
</style>

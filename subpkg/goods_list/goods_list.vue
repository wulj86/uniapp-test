<template>
	<page-meta>
	    <navigation-bar
	      :title="navbarTitle"
	    />
	  </page-meta>
	<view>
		<uni-icons type="up" size="40" class="upicon" color="#ffa115" @click="goToTop"></uni-icons>
		<my-goods :datas="movieList"></my-goods>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				queryObj:{
					pageNum:1,
					retNum:10,
				},
				url:'',//查询接口
				total:0,
				movieList:[],
				isLoading:false,
				navbarTitle:'',
				pageType:'more',//页面类型(查看更多、榜单、想看、看过)
				params:'1',//影片类型、榜单类型
			};
		},
		computed:{
			...mapState('m_user',['userinfo']),
		},
		onLoad(options){
			console.log(options.pageType)
			this.pageType=options.pageType

			switch (this.pageType){
				case 'more':
				this.navbarTitle='更多'+options.navbarTitle
					url='/movieApi/movie/detailQuery'
					this.queryObj.movieType=this.params
					break;
				case 'cate':
					this.navbarTitle=options.navbarTitle
					url='/movieApi/movieRank/queryMovie'
					this.queryObj.rankType=this.params
					break;
				case 'like':
					this.navbarTitle='想看的影片'
					url='/movieApi/userMoviePreferences/queryLikes'
					this.queryObj.userAccount=this.userinfo.user_account
					break;
				case 'read':
					this.navbarTitle='看过的影片'
					this.url='/movieApi/userMoviePreferences/queryReads'
					this.queryObj.userAccount=this.userinfo.user_account
					break;
			}
			this.getMovieList()
		},
		onReachBottom(){
			if(this.queryObj.pageNum*this.queryObj.retNum >= this.total) return uni.$showMsg('数据加载完毕！')
			if(this.isLoading) return
			this.queryObj.pageNum++
			this.getMovieList()
		},
		onPullDownRefresh(){
			this.queryObj.pageNum=1
			this.isLoading=false
			this.movieList=[]
			this.total=0
			this.getMovieList(()=>uni.stopPullDownRefresh())
		},
		methods:{
			async getMovieList(cb){
				this.isLoading=true
				let res = await uni.$http.post(this.url,this.queryObj)
				if(res.code!=200)return uni.$showMsg()
				this.movieList=[...this.movieList,...res.data]
				this.isLoading=false
				this.total=res.total
				cb && cb()
			},
			goToTop() {
			  uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300 // 动画时长，默认300ms
			  });
			}
		}
	}
</script>

<style lang="scss">
.upicon{
	position: fixed;
	bottom: 20rpx;
	right: 10rpx;
	z-index: 999;
}

</style>

<template>
	<view>
		<uni-icons type="up" size="40" class="upicon" color="#ffa115" @click="goToTop"></uni-icons>
		<my-goods :goods="goodsList"></my-goods>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:30,
				},
				goodsList:[],
				isLoading:false,
				total:0
			};
		},
		onLoad(options){
			console.log(options)
			this.queryObj.query=options.query || ''
			this.queryObj.cid=options.cid||''
			this.getGoodsList()
		},
		onReachBottom(){
			if(this.queryObj.pagenum*this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			if(this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			this.queryObj.pagenum=1
			this.isLoading=false
			this.goodsList=[]
			this.total=0
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading=true
				let {data:res} = await uni.$http.get(`/goods/search`,this.queryObj)
				if(res.meta.status!=200)return uni.$showMsg()
				res.message.goods.forEach(e=>e.image_src=e.goods_big_logo)
				this.goodsList=[...this.goodsList,...res.message.goods]
				this.isLoading=false
				this.total=res.message.total
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

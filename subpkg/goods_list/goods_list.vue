<template>
	<view>
		<view class="goods-list">
			<navigator :url="'../goods_details/goods_details?goods_id='+goods.goods_id" v-for="(goods,i) in goodsList" :key='i'>
				<my-goods :goods="goods"></my-goods>
			</navigator>
		</view>
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
					pagesize:10,
				},
				goodsList:[],
				total:0,
				isLoading:false
			};
		},
		onLoad(options){
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
			this.total=0
			this.isLoading=false
			this.goodsList=[]
			
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading=true
				let {data:res} = await uni.$http.get(`/goods/search`,this.queryObj)
				if(res.meta.status!=200)return uni.$showMsg()
				this.goodsList=[...this.goodsList,...res.message.goods]
				this.total=res.message.total
				this.isLoading=false
				cb && cb()
			},
			
		}
	}
</script>

<style lang="scss">


</style>

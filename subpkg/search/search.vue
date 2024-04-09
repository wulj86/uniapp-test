<template>
	<view>
		<view class="seach-box">
			<uni-search-bar @confirm='search' :focus="true" @input='input' :radius='100' cancelButton='none'></uni-search-bar>
		</view>
		<view class="sugg-list" v-show='searchResults.length>0'>
			<view class="sugg-item" @click="gotoDetail(item)" v-for='(item,i) in searchResults' :key='i'>
				<view class="goods-name">
					{{item.goods_name}}
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
				<uni-tag @click="gotoGoodsDetail(item)" :text="item" v-for="(item,i) in historyList" :key='i'></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord:'',
				timer:null,
				searchResults:[],
				historyList:['a','app','apple']
			};
		},
		methods:{
			search(){
				
			},
			input(e){
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.keyWord=e
					this.getSearchList()
				},500)
			},
			async getSearchList(){
				if(!this.keyWord) return this.searchResults=[]
				
				if(!this.historyList.includes(this.keyWord)) this.historyList.unshift(this.keyWord)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
				let {data:res} = await uni.$http.get(`/goods/qsearch?query=${this.keyWord}`)
				if(res.meta.status!=200)return uni.$showMsg()
				this.searchResults=res.message?res.message:[]
			},
			gotoDetail(item){
				uni.navigateTo({
					url:`../goods_details/goods_details?goods_id=${item.goods_id}`
				})
			},
			clean(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
			},
			gotoGoodsDetail(item){
				uni.navigateTo({
					url:`../goods_details/goods_details?query=${item}`
				})
			}
		}
	}
</script>

<style lang="scss">
.seach-box{
	position: sticky;
	top:0;
	z-index: 999;
}
.sugg-list{
	padding:0 5px;
	.sugg-item{
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
.history-box{
	padding:  0 5px;
	.history-title{
		height: 40px;
		display: flex;
		align-items: center;//父元素若有设置高度，可以设置这个来垂直居中
		justify-content: space-between;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			display: block;
			margin-top: 15px;
			margin-right: 5px;
		}
	}
}
</style>

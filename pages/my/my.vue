<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo ref='userInfo' v-else></my-userinfo>
	</view>
</template>

<script>
	import { mapState} from 'vuex'
 	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		},
		onShow() {
			this.$refs.userInfo?.getData()
		}
	}
</script>

<style lang="scss">
page .my-container{
	height: 100%;
}
</style>

export default{
	namespaced:true,
	state:()=>({
		token:uni.getStorageSync('token')||'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
	}),
	mutations:{
		updateUserInfo(state,userinfo){
			state.userinfo=userinfo
			this.commit('m_user/saveUserinfoToStorage')
		},
		saveUserinfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateToken(state,token){
			state.token=token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		}
	},
	getters:{
		
	}
}
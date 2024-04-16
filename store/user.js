export default{
	namespaced:true,
	state:()=>({
		token:uni.getStorageSync('token')||'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		imgBaseUrl:'http://127.0.0.1:18080'
	}),
	mutations:{
		updateUserInfo(state,userinfo){
			state.userinfo=userinfo
			console.log(state)
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
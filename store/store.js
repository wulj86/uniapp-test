import Vue from "vue"
import Vuex from 'vuex'
import moduleuser from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		'm_user':moduleuser
	}
})

export default store
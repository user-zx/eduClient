/**
 * Created by zhangxin on 2017/3/14.
 */
export default {
    state:{
        breadCrumb:[],
    },
    mutations:{
        setBreadCrumb(state,params){
            state.breadCrumb=params;
        }
    }
}

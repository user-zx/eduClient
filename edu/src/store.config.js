/**
 * Created by zhangxin on 2017/3/14.
 */
export default {
    state:{
        breadCrumb:[],
        curContent: 'article',
       // userinfo:{},
    },
    mutations:{
        setBreadCrumb(state,params){
            state.breadCrumb=params;
        },
        updateBreadCrumb(state,params){
            state.breadCrumb.push(params);
        },
        setCurContent(state,params){
            state.curContent = params;
        },
       
    }
}

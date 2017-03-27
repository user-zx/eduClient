/**
 * Created by zhangxin on 2017/3/14.
 */
import panorama from './views/pomp/panorama/panorama.vue';
import analyse from './views/pomp/analyse/analyse.vue';
import warning from './views/pomp/warning/warning.vue';
import event from './views/pomp/event/event.vue';
import speech from './views/pomp/speech/speech.vue';
import industryNews from './views/reference/industryNews/industryNews.vue';
import characterNews from './views/reference/characterNews/characterNews.vue';
import seeClearly from './views/reference/seeClearly/seeClearly.vue';
import mediaCoverage from './views/reference/mediaCoverage/mediaCoverage.vue';
import report from './views/reference/report/report.vue';
import seeWbWeChat from './views/serviceTool/seeWbWeChat/seeWbWeChat.vue';
import myAttention from './views/myAttention/myAttention.vue';
import login from './views/login/login.vue';
import home from './views/home/home.vue';
import eventDetails from './views/pomp/event/eventDetails/eventDetails.vue';
import eventList from './views/pomp/event/evenList/eventList.vue';
import publicOpinionRule from "./views/pomp/warning/publicOpinionRule.vue";
export default {
    mode:'history',
    base:__dirname,
    routes:[
        {
            path:"",
            redirect:"/home/panorama",
        },
        {
            name:"home",
            path:"/home",
            component:home,
            redirect:"/home/panorama",
            children:[
                {
                    name:"panorama",
                    path:"panorama",
                    component:panorama
                },
                {
                    path:"event",
                    component:event,
                    children:[
                        {
                            path:"",
                            component:eventList
                        }
                    ]
                },
                {
                    path:"eventDetails",
                    component:event,
                    children:[
                        {
                            path:"",
                            component:eventDetails
                        }
                    ]
                },
                {
                    name:"analyse",
                    path:"analyse",
                    component:analyse
                },
                {
                    name:"舆情预警",
                    path:"warning",  
                    component:warning
                },
                { 
                   name:"舆情规则",
                   path:"publicOpinionRule",
                   component:publicOpinionRule
                },
                {
                    name:"speech",
                    path:"speech",
                    component:speech
                },
                {
                    name:"industryNews",
                    path:"industryNews",
                    component:industryNews
                },
                {
                    name:"characterNews",
                    path:"characterNews",
                    component:characterNews
                },
                {
                    name:"seeClearly",
                    path:"seeClearly",
                    component:seeClearly
                },
                {
                    name:"mediaCoverage",
                    path:"mediaCoverage",
                    component:mediaCoverage
                },
                {
                    name:"report",
                    path:"report",
                    component:report
                },
                {
                    name:"seeWbWeChat",
                    path:"seeWbWeChat",
                    component:seeWbWeChat
                },
                {
                    name:"myAttention",
                    path:"myAttention",
                    component:myAttention
                }
            ]
        },
        {
            path:"/login",
            component:login,
            name:"login"
        },
    ]
}
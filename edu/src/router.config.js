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
export default {
    mode:'history',
    base:__dirname,
    routes:[
        {
            path:"",
            redirect:"panorama",
            name:"home"
        },
        {
            name:"panorama",
            path:"/panorama",
            component:panorama
        },
        {
            name:"analyse",
            path:"/analyse",
            component:analyse
        },
        {
            name:"warning",
            path:"/warning",
            component:warning
        },
        {
            name:"event",
            path:"/event",
            component:event
        },
        {
            name:"speech",
            path:"/speech",
            component:speech
        },
        {
            name:"industryNews",
            path:"/industryNews",
            component:industryNews
        },
        {
            name:"characterNews",
            path:"/characterNews",
            component:characterNews
        },
        {
            name:"seeClearly",
            path:"/seeClearly",
            component:seeClearly
        },
        {
            name:"mediaCoverage",
            path:"/mediaCoverage",
            component:mediaCoverage
        },
        {
            name:"report",
            path:"/report",
            component:report
        },
        {
            name:"seeWbWeChat",
            path:"/seeWbWeChat",
            component:seeWbWeChat
        },
        {
            name:"myAttention",
            path:"/myAttention",
            component:myAttention
        }


    ]
}
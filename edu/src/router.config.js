/**
 * Created by zhangxin on 2017/3/14.
 */
import panorama from './views/panorama/panorama.vue';
import analyse from './views/analyse/analyse.vue';
import warning from './views/warning/warning.vue';
import event from './views/event/event.vue';
import speech from './views/speech/speech.vue';
export default {
    mode:'history',
    base:__dirname,
    routes:[
        {
            path:"",
            component:panorama,
            children:[
                {
                    path:"panorama",
                    component:panorama
                },
                {
                    path:"analyse",
                    component:analyse
                },
                {
                    path:"warning",
                    component:warning
                },
                {
                    path:"event",
                    component:event
                },
                {
                    path:"speech",
                    component:speech
                }
            ]
        },

    ]
}
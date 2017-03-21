<template>
    <div id="edu">
        <div class="page">
            <div class="page-left">
                <left></left>
            </div>
            <div class="page-content">
                <div class="page-header">
                    <top></top>
                </div>
                <div class="page-wrapper">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <bottom></bottom>
    </div>

</template>

<script>
import top from './components/layout/top/top.vue';
import left from './components/layout/left/left.vue';
import bottom from './components/layout/bottom/bottom.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{top,left,bottom},
    mounted(){
        $(".page .page-wrapper").css({"min-height":$(window).height()-$(".footer").height()-$(".page-header").height()+"px"});
        $(window).resize(()=> {
            $(".page .page-wrapper").css({"min-height":$(window).height()-$(".footer").height()-$(".page-header").height()+"px"});
        });
    }
}
</script>

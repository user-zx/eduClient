<template>
    <div id="edu">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components:{},
    mounted(){
        $(".page .page-wrapper").css({"min-height":$(window).height()-$(".footer").height()-$(".page-header").height()+"px"});
        $(window).resize(()=> {
            $(".page .page-wrapper").css({"min-height":$(window).height()-$(".footer").height()-$(".page-header").height()+"px"});
        });
    }
}
</script>

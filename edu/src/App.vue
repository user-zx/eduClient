<template>
    <div id="edu" class="page">
        <div class="page-left">
            <left></left>
        </div>
        <div class="page-content">
            <div class="page-header">
                <top></top>
            </div>
            <div class="page-wrapper">
                <div class="test">
                    ceshineorpmnhg
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import top from './components/layout/top/top.vue';
import left from './components/layout/left/left.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{top,left}
}
</script>

<style lang="scss" scoped>

</style>

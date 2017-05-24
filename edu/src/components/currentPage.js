export default {
    install(Vue, options) {
        Vue.directive('initjump', {
            update: function(el, binding) {
                if (binding.value) { el.children[2].children[0].value  = binding.value }
            }
        })
    }
}

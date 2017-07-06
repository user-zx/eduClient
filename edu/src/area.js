exports.install = function (Vue, options) {
    Vue.prototype.allProvince = function () {
        let province = [
            {value: 'aa', label: 'aaa'},
            {value: 'aa', label: 'aaa'},
            {value: 'aa', label: 'aaa'},
            {value: 'aa', label: 'aaa'},
            {value: 'aa', label: 'aaa'},
            {value: 'aa', label: 'aaa'},
            {value: 'aa', label: 'aaa'},
        ]

        return province;
    };
}
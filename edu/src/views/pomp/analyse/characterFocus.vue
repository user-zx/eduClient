/**
* Created by lifei on 2017/3/21.
*/
<template>
    <el-table :data="tableData"  stripe style="width: 100%">
        <el-table-column v-for="item in thData" label="item.title" prop="item.prop">
        </el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>

</style>

<script>
    export default{
        data(){
            return {
                thData: [
                    {'checkbox': true, 'title': ''},
                    {'checkbox': false, 'title': '全部'},
                    {'checkbox': false, 'title': '人物', 'prop': 'name'},
                    {'checkbox': false, 'title': '声量', 'prop': 'voiceNum'},
                    {'checkbox': false, 'title': '总阅读量', 'prop': 'readNum'},
                    {'checkbox': false, 'title': '热度', 'prop': 'hot'},
                    {'checkbox': false, 'title': '情感', 'prop': 'emotion'},
                ],

                tableData: [
                    {
                        'id': 1,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 2,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 3,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 4,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 5,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 5,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 6,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 7,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },{
                        'id': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },

                ]
            }
        },
        components: {},
        methods: {
        },
        mounted(){
        }
    }

</script>
/**
* Created by lifei on 2017/3/24.
*/
<template>
    <el-table :data="tableData" class="tran-table white-table" border style="width: 100%"
              :resizable="false">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="全部" align="center" prop="all"></el-table-column>
        <el-table-column label="人物" prop="name" align="center"></el-table-column>
        <el-table-column label="声量" prop="voiceNum" align="center"></el-table-column>
        <el-table-column label="总阅读量" prop="readNum" align="center"></el-table-column>
        <el-table-column label="热度" prop="hot" align="center"></el-table-column>
        <el-table-column label="情感" prop="emotion" align="center"></el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>
    .tran-table{
        margin-top: 10px;
    }
</style>

<script>
    export default{
        data(){
            return {
                tableData: [
                    {
                        'id': 1,
                        'all': 1,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 2,
                        'all': 2,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 3,
                        'all': 3,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 4,
                        'all': 4,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 5,
                        'all': 5,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 6,
                        'all': 6,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 7,
                        'all': 7,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 8,
                        'all': 8,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 9,
                        'all': 9,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 10,
                        'all': 10,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 11,
                        'all': 11,
                        'name': '习1总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 12,
                        'all': 12,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },{
                        'id': 13,
                        'all': 13,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 14,
                        'all': 14,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    },
                    {
                        'id': 15,
                        'all': 15,
                        'name': '习总',
                        'voiceNum': 888,
                        'readNum': 1024,
                        'hot': 5,
                        'emotion': 1
                    }
                ]
            }
        },
        components: {},
        methods: {
            addIcon(){
                this.$nextTick(function () {
                    let  $firstCell = $('.white-table .el-table__body tbody tr:first td:eq(1) div.cell'),
                         $secondCell = $('.white-table .el-table__body tbody tr:eq(1) td:eq(1) div.cell'),
                         $thirdCell = $('.white-table .el-table__body tbody tr:eq(2) td:eq(1) div.cell');
                    $firstCell.prepend('<i class="icon-rank icon-gold"></i>');
                    $secondCell.prepend('<i class="icon-rank icon-silver"></i>');
                    $thirdCell.prepend('<i class="icon-rank icon-copper"></i>');
                })
            }
        },
        mounted(){
            this.addIcon()
        }
    }

</script>
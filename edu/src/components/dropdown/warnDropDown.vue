<template>
    <el-dropdown class="event-store-box" trigger="click" @command="saveWarn">
        <el-button type="primary" icon="plus" class="button-icon">
            添加预警
        </el-button>
        <el-dropdown-menu slot="dropdown" class="event-store-item">
            <el-dropdown-item v-for="warn in warns" :command="'' + warn.id">{{warn.warnName}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        data() {
            return {
                param: {
                    pageSize: 1000,
                    pageNumber: 0
                },
                warns: []
            }
        },
        methods: {
            getAllEvent() {
                this.$http.post('/apis/opinionWarn/getWarnRule.json', {pageNumber: 0, pageSize: 1000}).then((response) => {
                    if (response.data.success) {
                        this.warns = response.data.data.content;
                    } else {
                        console.error(response.data.message);
                    }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            saveWarn(warnId) {
                this.$emit('onSaveWarn', warnId);
            }
        },
        mounted() {
            this.getAllEvent();
        }
    }
</script>
<style type="scss">
    .el-dropdown-menu {
        max-height: 200px;
        overflow-y: auto;
    }
</style>
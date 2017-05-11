<template>
    <el-dropdown class="event-store-box" trigger="click" @command="saveEvent">
        <el-button type="primary" icon="plus" class="button-icon">
            事件库
        </el-button>
        <el-dropdown-menu slot="dropdown" class="event-store-item">
            <el-dropdown-item v-for="event in events" :command="'' + event.id">{{event.title}}</el-dropdown-item>
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
                events: []
            }
        },
        methods: {
            getAllEvent() {
                this.$http.post('/apis/eventAnalysis/getEventList.json', this.param).then(
                    (response) => {
                        // console.log(response);
                        if (response.data.success) {
                            this.events = response.data.data.content;
                        } else {
                            console.error(response.data.message);
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            },
            saveEvent(eventId) {
                this.$emit('onSaveEvent', eventId);
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
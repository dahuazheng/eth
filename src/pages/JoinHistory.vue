<template>
    <div class="join-history">
        <PopupTitle title="参与历史" :back="close"/>
        <ul>
            <li>
                <span>时间</span>
                <span>序列</span>
            </li>
            <li v-for="item in list" :key="item.number">
                <span>{{item.created_at | formatDate}}</span>
                <span>{{item.round_rank}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import PopupTitle from '../components/PopupTitle'
    import moment from 'moment'
    import {OrderApi} from "../api"
    import {ensureMilliseconds} from "../utils"

    export default {
        components: {PopupTitle},
        data() {
            return {
                list: [],
                // total: 0
            }
        },
        filters: {
            formatDate(value) {
                if (!value) return
                const formatDate = 'YYYY-MM-DD HH:mm:ss'
                return moment(ensureMilliseconds(value)).format(formatDate)
            }
        },
        methods: {
            getOrderList() {
                OrderApi.getOrderList({page: '1', limit: '20'}).then(res => {
                    this.list = res.data.list
                }).catch(err => {
                    console.error(err)
                })
            },
            close() {
                this.$router.push({name: 'home', query: {tab: 'join'}})
            }
        },
        mounted() {
            this.getOrderList()
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .join-history {
        ul {
            @include clearUl;
            padding: $margin-width;

            li {
                @include px2rem('height', 40);
                @include fontSize($font-little);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 $space-width;
                border-bottom: 1px solid $border-color;
            }
        }
    }

</style>

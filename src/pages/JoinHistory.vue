<template>
    <div class="join-history">
        <PopupTitle title="参与历史" :back="close"/>
        <ul>
            <li>
                <span>时间</span>
                <span>序列</span>
            </li>
            <li v-for="item in list" :key="item.number">
                <span>{{item.time | formatDate}}</span>
                <span>{{item.number}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import PopupTitle from '../components/PopupTitle'
    import moment from 'moment'
    import {MainApi} from "../api"
    import {ensureMilliseconds} from "../utils"

    export default {
        components: {PopupTitle},
        data() {
            return {
                list: [{
                    time: '343411234500',
                    number: 1
                }, {
                    time: '343411234500',
                    number: 2
                }, {
                    time: '343411234500',
                    number: 3
                }]
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
                MainApi.getOrderList({page: '1', limit: '20'}).then(res => {
                    console.log(res, '======================')
                    this.list = res.data
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

<template>
    <div id="transaction-record">
        <NavHeader title="充值记录"/>
        <div class="transaction-record__content">
            <ul>
                <li>类型</li>
                <li>数量</li>
                <li>状态</li>
                <li>时间</li>
            </ul>
            <ul v-for="data in rechargeList" :key="data.id">
                <li>{{ data.type }}</li>
                <li>+{{data.amount}} {{data.coinCode}}</li>
                <li :class="[data.status === 1 && 'text-green', data.status === -1 && 'text-red']">
                    {{transformStatus(data.status)}}
                </li>
                <li>{{ data.createdAt | formatDate }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import NavHeader from '../components/NavHeader'
    // import { TRADE_STATUS } from '../utils/constants'
    import { ensureMilliseconds } from '../utils'
    import { RankApi } from '../api'

    export default {
        data() {
            return {
                currStatus: '',
                rechargeList: {}
            }
        },
        filters: {
            formatDate(value) {
                if (!value) return
                const formatDate = 'YYYY-M-DD  HH:mm:ss'
                return moment(ensureMilliseconds(value)).format(formatDate)
            }
        },
        components:{NavHeader},
        methods: {
            // 转换状态值为文字
            transformStatus(val) {
                switch(val){
                    case 1:
                        return this.currStatus = '提现待审核';
                    case 2:
                        return this.currStatus = '提现中';
                    case 3:
                        return this.currStatus = '拒绝提现申请';
                    case 4:
                        return this.currStatus = '提现成功';
                    case 5:
                        return this.currStatus = '提现失败';
                    case 6:
                        return this.currStatus = '充值成功';
                    default:
                        return null
                }
            },

            // 获取充值记录表
            getNewpayOrderList() {
                RankApi.getNewpayOrderList({
                    type: '1'   // 1充值 2提现
                }).then(res => {
                    this.rechargeList = res
                }).catch(err => {
                    console.error(err)
                })

            }
        },
        mounted() {
            this.getNewpayOrderList()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #transaction-record {
        .transaction-record__content {
            box-sizing: border-box;
            padding: 12px;

            ul {
                @include clearUl;
                display: flex;
                align-items: center;
                border-bottom: 1px solid $border-bottom-color;
                font-size: $font-little - 1;
                font-weight: $common-font-weight;
                padding: 5px 0;

                &:first-child {
                    padding-bottom: 13px;
                }

                li {
                    width: 25%;
                    text-align: center;
                }
            }
        }
    }
</style>

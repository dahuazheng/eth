<template>
    <div id="transaction-record">
        <NavHeader title="提现记录"/>
        <div class="transaction-record__content">
            <ul>
                <li>类型</li>
                <li>数量</li>
                <li>状态</li>
                <li>时间</li>
            </ul>
            <ul v-for="(data, key) in withdrawList" :key='key'>
                <li>{{ data.type === '1' ? '充值' : '提现' }}</li>
                <li>+{{data.amount}} {{data.coinCode}}</li>
                <li :class="data.status | transformColor">
                    {{data.status | transformStatus}}
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
    import { WalletApi } from '../api'


    export default {
        data() {
           return {
               currStatus: '',
               withdrawList: {}
           }
        },
        filters: {
            formatDate(value) {
                if (!value) return
                const formatDate = 'YYYY-M-DD  HH:mm:ss'
                return moment(ensureMilliseconds(value)).format(formatDate)
            },
            // 转换状态值为文字
            transformStatus(val) {
                switch(val){
                    case '1':
                        return '提现待审核';
                    case '2':
                        return '提现中';
                    case '3':
                        return '拒绝提现申请';
                    case '4':
                        return '提现成功';
                    case '5':
                        return '提现失败';
                    case '6':
                        return '充值成功';
                    default:
                        return null
                }
            },
            // 转换状态值为色号
            transformColor(val) {
                console.log(val)
                switch(val){
                    case '1':
                        return ' ';
                    case '2':
                        return '';
                    case '3':
                        return 'text-red';
                    case '4':
                        return 'text-green';
                    case '5':
                        return 'text-red';
                    case '6':
                        return 'text-green';
                    default:
                        return ''
                }
            },
        },
        components:{NavHeader},
        methods: {
            // 获取提现记录表
            getNewpayOrderList() {
                console.log('提现')
                WalletApi.getNewpayOrderList({
                    type: '2'   // 1充值 2提现
                }).then(res => {
                    // console.log(res[2], res[2].createdAt)
                    this.withdrawList = res
                    // console.log('res', this.withdrawList[2].created_at)
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

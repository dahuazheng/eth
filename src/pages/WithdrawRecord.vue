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
            <ul v-for="data in listData" :key="data.id">
                <li>{{ data.businessType }}</li>
                <li><span>{{ data.businessType === '充值' ? '+' : '-' }}</span> 100 INC</li>
                <li :class="[data.status === 1 && 'text-green', data.status === -1 && 'text-red']">
                    {{transformStatus(data.status)}}
                </li>
                <li>{{ data.time | formatDate }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import NavHeader from '../components/NavHeader'
    import { TRADE_STATUS } from '../utils/constants'
    import { ensureMilliseconds } from '../utils'

    export default {
        data() {
           return {
               currStatus: '',
               listData: [
                   {
                      businessType: '提现',
                      amount: '100',
                      status: TRADE_STATUS.success,
                      time: '23423453400'
                   },
                   {
                       businessType: '提现',
                       amount: '100',
                       status: TRADE_STATUS.pending,
                       time: '23423453400'
                   },
                   {
                       businessType: '提现',
                       amount: '100',
                       status: TRADE_STATUS.fail,
                       time: '23423453400'
                   }
               ]
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
            transformStatus(val) {
                switch(val){
                    case  1:
                        return this.currStatus = '成功';
                    case 0:
                        return this.currStatus = '等待';
                    case  -1:
                        return this.currStatus = '失败';
                    default:
                        return null
                }
            }
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

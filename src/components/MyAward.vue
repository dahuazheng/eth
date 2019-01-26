<template>
    <div class="my-award">
        <p class='my-title'>
            <i></i>
            <span>我的头衔</span>：{{ this.transformStatus(level) }}
        </p>
        <div class="price-box">
            <span @click.stop="getBonusAmount()">
                奖励总额：
                <img src="../assets/images/icon_help.png">
            </span>
            <small>
                {{userBonus.allEth || 0}} ETH / {{userBonus.allInc || 0}} INC
            </small>
            <div class="explain-box" @click="showAwardDetail=false" v-show="showAwardDetail" >
                <ul @click.stop>
                    <li>
                        <label>静态分红奖</label>
                        <span>{{userBonus.staticEth || 0}} ETH</span>
                        <span>{{userBonus.staticInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>动态分红奖</label>
                        <span>{{userBonus.dynamicEth || 0}} ETH</span>
                        <span>{{userBonus.dynamicInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>高级经理奖</label>
                        <span>{{userBonus.topManagerEth || 0}} ETH</span>
                        <span>{{userBonus.topManagerInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>每日竞猜奖</label>
                        <span>{{userBonus.dayGuessEth || 0}} ETH</span>
                        <span>{{userBonus.dayGuessInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>24H 直推龙虎榜</label>
                        <span>{{userBonus.dayPushEth || 0}} ETH</span>
                        <span>{{userBonus.dayPushInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>其他奖励</label>
                        <span>{{userBonus.otherEth || 0}} ETH</span>
                        <span>{{userBonus.otherInc || 0}} INC</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn-tabs">
            <!--<EthButton name="提现" border="1px solid #f1e2ff" :click="withdraw"/>-->
            <EthButton name="我的直推" type="#9712A3" :click="recommend"/>
        </div>
        <p>加油！推荐30自动成为经理，可以获得50代的推荐奖。</p>
        <div class="shade" v-show="showAwardDetail" @click="showAwardDetail=false"></div>
    </div>
</template>

<script>
    import EthButton from './EthButton'
    import { UserApi } from '../api'

    export default {
        components: {EthButton},
        data() {
            return {
                showAwardDetail: false,
                level: '1',
                userBonus: {}
            }
        },
        methods: {
            // 获取我的头衔
            getUserInfo() {
              UserApi.getUserInfo().then(res => {
                  this.level = res.level
              }).catch(err => {
                  console.error(err)
              })
            },

            // 转换头衔
            transformStatus(val) {
                switch(val){
                    case '1':
                        return '参与者';
                    case '2':
                        return '经理';
                    case '3':
                        return '高级经理';
                    default:
                        return ''
                }
            },

            // 点击显示总额
            getBonusAmount() {
                this.showAwardDetail = true
            },

            // 奖励总额
            getUserBonus() {
                UserApi.getUserBonus().then(res => {
                    console.log('aaaa',res)
                    this.userBonus = res
                }).catch(err => {
                    console.error(err)
                })
            },

            recommend() {
                this.$router.push('/user-center')
            }
        },
        mounted() {
            this.getUserInfo()
            this.getUserBonus()

        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .my-award {
        position: relative;

        .my-title {
            width: 100%;
            padding: 12px 0;
            margin: 0;
            color: #9e9f9d;

            i {
                display: inline-block;
                margin-right: 10px;
                @include px2rem('width', 20);
                @include px2rem('height', 20);
                @include background-image();
                background-image: url('../assets/images/icon_work_leve.png');
            }

            span {
                color: #9712A3;
                font-weight: 500;
            }
        }

        .shade{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        .price-box {
            @include fontPrimaryColor($primary-color);
            @include fontSize($font-medium-s);
            position: relative;
            padding-top: 35px;
            padding-bottom: 13px;
            font-weight: normal;
            text-align: center;
            background: #f1e2ff;

            span {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                color: #3f1964;
                font-weight: 500;
                /*padding-bottom: 20px;*/
            }

            img {
                @include px2rem('width', 16);
                @include px2rem('height', 16);
            }

            .explain-box {
                @include px2rem('height', 209);
                position: absolute;
                bottom: 30px;
                left: 0;
                right: 0;
                margin: auto;
                width: 100%;
                background: url('../assets/images/bg_dialog_come.png') center;
                background-size: 100% 100%;
                z-index: 1;

                ul {
                    @include clearUl;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: start;
                    align-items: center;
                    margin: $margin-width;

                    > li {
                        @include fontSize($font-little-s);
                        @include px2rem('padding-top', 15);

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 33.333%;
                        line-height: 1.6;

                        label {
                            margin-bottom: 5px;
                            @include fontColor($font-color)
                        }
                    }
                }
            }
        }

        .btn-tabs {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background: #f1e2ff;
            padding-bottom: 20px;

            button {
                border: none;
            }
        }

        p{
            display: flex;
            align-items: center;
            justify-content: center;
            @include fontPrimaryColor(#a35a85);
            @include fontSize($font-little);
            margin-top: 30px;
            font-weight: 500;
            text-align: center;
        }
    }
</style>

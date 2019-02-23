<template>
    <div id="common-problem">
        <NavHeader title="常见问题"/>
        <ul class="common-problem__content">
            <li v-for="item in problemList" :key="item.id">
                <p @click="item.status = !item.status">{{ item.title}}</p>
                <transition>
                    <div class="content" v-show="item.status" v-html="item.content"></div>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader'

    export default {
        name: 'commonProblem',
        components: {NavHeader},
        data() {
            return {
                problemList: [
                    {
                        title: 'Q：如何往该账户的钱包转账? ',
                        content: '每个账户都有一个自己ETH钱包地址，可在游戏主页钱包一栏查看你的钱包地址。如果你的资金在其他钱包上，你可以使用第三方工具钱包如(imToken)转账到“Lucky Inc”钱包上，你可点击我的钱包标签页面点击收款按钮，然后使用 imToken或其他的以太坊钱包App扫描页面所示的收款二维码，即可发起转账。等待交易的区块链上确认后，可在钱包中查看余额。另外如果你的资金在交易所，比如火币、币安、OKex等交易所，可直接提现到的“Lucky Inc”钱包地址上。',
                        status: false
                    },
                    {
                        title: 'Q：什么是邀请码?\n',
                        content: '邀请码是激活“Lucky Inc”游戏用户的一串字符，如果你有上级推荐人，你必须写上级推荐人的邀请码，如果没有请输入“66666666”选择系统。你在参与游戏后，你的上级推荐人会获得一部分的奖励',
                        status: false
                    },
                    {
                        title: 'Q：游戏的过程是怎么样的?',
                        content: '游戏的过程很简单，等待游戏开始后，直接使用账户内的ETH及INC支付即可参与，参与的次数越多，奖励越多，每轮游戏开始12小时倒计时，每当有新的用户加入游戏，系统倒计时会增加对应时间，封顶12小时。<br/>' +
                            '第1天，增加一次投注时间增加60分钟<br>' +
                            '第2天，增加一次投注时间增加50分钟<br>' +
                            '第3天，增加一次投注时间增加40分钟<br>' +
                            '第4天，增加一次投注时间增加30分钟<br>' +
                            '第5天及以后，增加一次投注时间增加20分钟<br>' +
                            '当倒计时为00:00时，最后一名用户可获得终极贏家奖励<br>' +
                            '每次新伙伴加入游戏的奖励分配比例：<br>' +
                            '30%给前面的用户奖励 <br>' +
                            '29%共15代推荐奖励 <br>' +
                            '1%高级经理奖励 <br>' +
                            '3%~8%24H直推龙虎榜奖励 <br>' +
                            '9%-20%每日竟猜奖励 <br>' +
                            '17%终极赢家奖励 <br>' +
                            '1%久久伴随奖励 <br>' +
                            '5%倒数退本奖励 <br>' +
                            '1%下一轮奖池 <br>' +
                            '4%销毁&额外奖励 <br>',
                        status: false
                    },
                    {
                        title: 'Q：如何邀请其他参与者?\n',
                        content: '“Lucky Inc”游戏免费激活成为用户，然后将你的邀请码发送给你的好友，并叮嘱他们绑定的时候填写你的邀请码。',
                        status: false
                    },
                    {
                        title: 'Q：邀请新伙伴能获得多少奖励?',
                        content: '每次邀请新伙伴加入，能够获得下级投资额的15%，共15代的推荐奖励 <br>' +
                            '1代:15% <br>' +
                            '2代:7.5% <br>' +
                            '3代:3% <br>' +
                            '4代:1.5% <br>' +
                            '5代:0.7% <br>' +
                            '6代:0.4% <br>' +
                            '7代~15代:每代0.1%<br>' +
                            '(全平台1%:高级经理均分奖励) <br>',
                        status: false
                    },
                    {
                        title: 'Q：有足够的ETH和INC，如何参与?',
                        content: '在“Lucky Inc”游戏主界面，你可以使用快捷键直接支付ETH和INC参与游戏，同时可以多次复投。',
                        status: false
                    },
                    {
                        title: 'Q：如何查看我参与游戏的ETH及INC数量?',
                        content: '你可以在游戏主界面查看当前已经参与的ETH及INC个数。也可以在“参与记录”查看我已经参与游戏的ETH及INC数量。',
                        status: false
                    },
                    {
                        title: 'Q：如何获得静态分红奖励？',
                        content: '静态分红奖励是每个参与者都可以获得的奖励，每次新用户加入的30%给前面的用户静态分红奖励，全球公排,三倍封顶。',
                        status: false
                    },
                    {
                        title: 'Q：如何查看我的动态推荐奖励？',
                        content: '你可以在游戏主界面“我的奖励”中查看“动态推荐奖励”，动态推荐奖励共30%，直接推荐的人数=可获得奖励的代数，共15代的 <br/>' +
                            '推荐奖励: <br/>' +
                            '1代:15% <br/>' +
                            '2代:7.5% <br/>' +
                            '3代:3% <br/>' +
                            '4代:1.5% <br/>' +
                            '5代:0.7% <br/>' +
                            '6代:0.4% <br/>' +
                            '7代~15代:每代0.1% <br/>' +
                            '(全平台1%:高级经理均分奖励)<br/>',
                        status: false
                    },
                    {
                        title: 'Q：如何成为经理? ',
                        content: '直接推荐15人自动成为经理，如果你是优秀的经理，可以获得很高的奖励。多劳多得，上不封顶，随时提现。',
                        status: false
                    },
                    {
                        title: 'Q：如何成为高级经理? ',
                        content: '直接推荐15人成为经理，其中有3个直推是经理，就自动成为高级经理。本轮游戏的ETH及INC总数1%，平均奖励给所有高级经理。',
                        status: false
                    },
                    {
                        title: 'Q：如何获得24H直推龙虎榜奖励? ',
                        content: '每天“24小时直推冠亚军”竞赛活动，每天新增加的直接推荐的总个数赛出前五名，可以获得当天新加入游戏的以太坊总数的3%奖励(后期比例上调至8%) <br/>' +
                            '直推数：用户直接邀请的好友每参与1次游戏，邀请人的直推数增加1 <br/>',
                        status: false
                    },
                    {
                        title: 'Q：如何计算每天的“24H直推龙虎榜“奖励? ',
                        content: '当天新加入游戏的以太坊总数的3%(后期比例上调至8%)奖励给前当天的一~五等奖 <br/>' +
                            '一等奖:50% <br/>' +
                            '二等奖:20% <br/>' +
                            '三等奖:15% <br/>' +
                            '四等奖:10% <br/>' +
                            '五等奖:5% <br/>' +
                            '若排名并列，根据达到对应直推数的时间进行排名。',
                        status: false
                    },
                    {
                        title: 'Q：如何参与免费的“每日竟猜”活动? ',
                        content: '每日竟猜是非常公平、公开的游戏，只要是本轮游戏的用户都可以每天免费参与，今天猜明天参与游戏的单日总次数，谁也无法提前预知，天天开奖，每天成就一批百万富翁。',
                        status: false
                    },
                    {
                        title: 'Q：如何计算“每日竟猜”的奖励? ',
                        content: '每日竟猜的奖励非常丰厚，每天参与额的9%(后期增加到20%)天天中大奖，按就近原则依次产生一～五等奖: <br/>' +
                            '一等奖:50% <br/>' +
                            '二等奖:20% <br/>' +
                            '三等奖:15% <br/>' +
                            '四等奖:10% <br/>' +
                            '五等奖:5% <br/>' +
                            '若排名并列，根据竞猜时间进行排名。竟猜中奖人获得90%，其上级推荐人获得10% <br/>',
                        status: false
                    },
                    {
                        title: 'Q：如何查看当前的终极赢家奖励? ',
                        content: '本轮游戏所有用户的累计参与额的17%比例计入当前终极赢家奖励(参与次数达到10000后,下调至1%)。',
                        status: false
                    },
                    {
                        title: 'Q：如何查看我的各项奖励? ',
                        content: '你可以在游戏主界面“我的奖励”中查看，主要包括五部分静态分红奖励、动态推荐奖励、高级经理奖励、24H直推龙虎榜奖励、每日竟猜奖励。',
                        status: false
                    },
                    {
                        title: 'Q：如何查看转账记录? ',
                        content: '你可以点击“我的钱包”栏，然后点击充值/提现页面右上角的“记录”按钮即可进入充值/提现记录页面。',
                        status: false
                    },
                ]
            }
        },
        mounted() {
            const {name} = this.$route.query
            if (name === 'inviter') {
                this.problemList[1].status = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #common-problem {
        .common-problem__content {
            @include clearUl;

            li {
                padding: 0 20px;
                border-bottom: 1px solid $border-bottom-color;

                p {
                    display: flex;
                    align-items: flex-start;
                    @include fontSize($font-medium-s + 1);
                    color: #3d215c;
                    margin-bottom: 7px;

                    &::before {
                        content: '';
                        display: inline-block;
                        @include px2rem('width', 24);
                        @include px2rem('height', 29);
                        @include background-image;
                        background-image: url('../assets/images/image_html_title.png');
                    }
                }

                div.content {
                    @include fontSize($font-medium-s + 1);
                    line-height: 1.5;
                    padding: 0 20px 10px;
                    text-align: justify;
                }
            }
        }
    }
</style>

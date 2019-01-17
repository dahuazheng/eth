<template>
    <div id="game-intro">
        <NavHeader title="游戏说明"/>

        <div class="game-intro__content">
            <div class="content eth-intro">
                <p class="title">「 1ETH游戏介绍 」</p>
                <p class="text">1ETH游戏是全球区块链爱好者共同发起的一款区块链游戏，游戏中奖励众多，参与即可获得奖励，并附带全新的区块链特性，让用户玩游戏的同时可以带来不菲的收益。</p>
            </div>
            <div class="content part-method">
                <p class="title">「 参与方法 」</p>
                <p class="text">用户每次仅能投注0.1ETH+1000INC参与游戏，可以多次重复参与游戏。</p>
            </div>
            <div class="content reward-desc">
                <p class="title">「 奖励说明 」</p>
                <div class='group' v-for="awardDesc in awardDesclist" :key="awardDesc.id">
                    <div class="group-item">
                        <span :class="['block-title', awardDesc.status ? ' up' : ' down']" @click="() => {
                                awardDesc.status = !awardDesc.status
                   }">{{ awardDesc.title }}</span>
                        <transition name="fade">
                            <p v-if="awardDesc.status" v-html="awardDesc.text"> {{ awardDesc.text }}</p>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'
  import PopupTitle from "../components/PopupTitle";

  export default {
    name: 'gameIntro',
    components: {PopupTitle, NavHeader},
    data() {
      return {
        awardDesclist: [
          {
            title: '静态分红',
            text: '每次投注参与的30%金额，拿给前面投注参与的用户做静态分红奖励，平均分配。静态分红奖励每天三倍封顶（即每次投注每日最高可拿静态分红0.3个ETH和3000个INC）',
            status: false
          },
          {
            title: '动态推荐奖',
            text: '直接推荐的用户数=可获取收益的代数。（最多15代）<br/>' +
                  '当某用户参与游戏，每次投注金额的29%分配给他的上级推荐人，奖金比例：第一代15%、第二代7.5%、第三代3%、第四代1.5%、第五代0.7%、第六代0.4%、第7～15代0.1%/每代。',
            status: false
          },
          {
            title: '高级经理奖',
            text: '推荐数大于等于15的用户自动成为经理，当你成为经理，并且直接推荐三个经理就自动成为高级经理人。<br/>' +
                  '每轮游戏结束，本轮累计参与额的1%给所有高级经理人均分。',
            status: false
          },
          {
            title: '24H直推龙虎榜',
            text: '每日参与额的3%奖励给当天新增直推最多的前5名：<br/>' +
                  '第一名：50% <br/>' +
                  '第二名：20% <br/>' +
                  '第三名：15% <br/>' +
                  '第四名：10% <br/>' +
                  '第五名：5% <br/>' +
                  '注： 若排名并列，均分奖金 <br/>' +
                  '若本轮游戏参与次数达到1万次以后奖金比例调整为8%',
            status: false
          },
          {
            title: '每日竞猜奖',
            text: '参与过本轮游戏的用户，在本轮游戏持续时间中，每天都可以免费竞猜一次，今天猜明天游戏的参与次数，按照就近原则依次产生一至五等奖。 <br/>' +
                  '每日参与额的9%分配给获奖的用户 <br/>' +
                  '一等奖50%、二等奖20%、三等奖15%、四等奖10%、五等奖5% <br/>' +
                  '（如中奖者多名并列，均分） <br/>' +
                  '每笔奖金的90%奖励给中奖者 <br/>' +
                  '10%奖励给其上级推荐人 <br/>' +
                  '若本轮游戏参与次数达到1万次以后奖金比例调整为20%',
            status: false
          },
          {
            title: '终极赢家奖',
            text: '本轮累计参与额的17%奖励给最后一名（当本轮游戏参与次数达到1万次时，比例下调至1%）',
            status: false
          },
          {
            title: '久久伴随奖',
            text: '当游戏倒计时结束，倒数第2至倒数第100名参与者可以获得该轮游戏ETH和INC累计参与额的1%奖励，99人均分“久久伴随奖”。',
            status: false
          },
          {
            title: '倒数回本奖',
            text: '当游戏倒计时结束，该轮游戏累计参与额的5%奖励给倒数101名开始逆数的人，直至发完。每人奖励0.1ETH+1000INC。',
            status: false
          },
          {
            title: '销毁&额外奖励',
            text: 'INC的部分，4%由公司直接销毁，ETH的部分，分给每一轮游戏投注量最大的用户。',
            status: false
          },
          {
            title: '下一轮奖池',
            text: '当游戏倒计时结束，本轮游戏ETH和INC累计参与额的1%，三天后下一轮游戏开始，自动进入到下一轮游戏的奖池。',
            status: false
          }
        ]
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #game-intro {
        .game-intro__content {
            .content {
                padding-left: 22px;
                padding-right: 50px;

                &::before {
                    content: '';
                    display: inline-block;
                    @include px2rem('width', 24);
                    @include px2rem('height', 29);
                    @include background-image;
                    background-image: url('../assets/images/image_html_title.png');
                }

                .fade-enter-active,
                .fade-leave-active {
                    transition: opacity .3s;
                }
                .fade-enter,
                .fade-leave-to {
                    opacity: 0;
                }

                p {
                    &.title {
                        display: inline-block;
                        vertical-align: bottom;
                        font-size: $font-little + 1;
                        color: $primary-color;
                        letter-spacing: 1px;
                    }

                    &.text {
                        padding-left: 30px;
                        margin-top: 0;
                    }
                }
                div.group {
                    padding-left: 36px;

                    .group-item {
                        margin: 15px auto 25px;

                        .block-title {
                            position: relative;
                            display: block;
                            color: $color-white;
                            text-align: center;
                            padding: 10px;
                            border-radius: 4px;
                            background-color: #ddd;
                            @include background-gradient($color-from, $color-to);

                            &.up::after {
                                content: '';
                                position: absolute;
                                right: 20px;
                                bottom: 14px;
                                border-top: 0px solid transparent;
                                border-bottom: 12px solid $color-white;
                                border-left: 7px solid transparent;
                                border-right: 7px solid transparent;
                                transition: all 0.3s;
                            }

                            &.down::after {
                                content: '';
                                position: absolute;
                                right: 20px;
                                bottom: 10px;
                                border-top: 12px solid $color-white;
                                border-bottom: 0 solid transparent;
                                border-left: 7px solid transparent;
                                border-right: 7px solid transparent;
                                transition: all 0.3s;
                            }

                        }

                        p {
                            text-align: justify;
                        }
                    }
                }
            }
        }
    }
</style>

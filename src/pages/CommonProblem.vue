<template>
    <div id="common-problem">
        <NavHeader title="常见问题"/>
        <ul class="common-problem__content">
            <li v-for="item in problemList" :key="item.id">
                <p @click="item.status = !item.status">{{ item.title}}</p>
                <transition>
                    <div class="content" v-show="item.status">{{ item.content }}</div>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'

  export default {
    name: 'commonProblem',
    components: { NavHeader },
    data() {
      return {
        problemList: [
          {
            title: 'Q:如何往该账户的钱包转账? ',
            content: '每个账户都有一个自己ETH钱包地址,可在游戏主页钱包一栏查看你的钱包地址。如果你的资金在其他钱包上,你可以使用第三方工具钱包如( imToken)转账到“1ETH"钱包上,你可点击我的钱包标签页面点击收款按钮,然后使用 imToken或其他的以太坊钱包App扫描页面所示的收款二维码,即可发起转账。等待交易的区块链上确认后,可在钱包中查看余额。另外如果你的资金在交易所,比如火币、币安、OKex等交易所,可直接提现到的“1ETH"钱包地址上。\n',
            status: false
          },
          {
            title: 'Q:什么是邀请码?\n',
            content: '邀请码是激活“1ETH"游戏用户的一串字符,如果你有上级推荐人,你必须写上级推荐人的邀请码,如果没有请输入“666666”选择系统。你在參与游戏后,你的上级推荐人会获得一部分的奖励\n',
            status: false
          },
          {
            title: 'Q:游戏的过程是怎么样的?',
            content: '游戏的过程很简单,等待游戏开始后,直接使用账户内的ETH及INC支付即可参与,参与的次数越多,奖励越多,每轮游戏开始12小时倒计时,每当有新的用户加入游戏,系统倒计时会增加1小时(最高可以增加到12小时),当倒计时为00:00时,最后一名用户可获得终极贏家奖励\n' +
                '每次新伙伴加入游戏的奖励分配比例：\n' +
                '30%给前面的用户奖励\n' +
                '29%共15代推荐奖励\n' +
                '1%高级经理奖励\n' +
                '3%~8%24H直推龙虎榜奖励\n' +
                '9%-20%每日竟猜奖励\n' +
                '17%终极赢家奖励\n' +
                '1%久久伴随奖励\n' +
                '5%倒数退本奖励\n' +
                '1%下一轮奖池\n' +
                '4%销毁&额外奖励\n',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '杰克丹尼参加考试卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '杰克丹尼参加考试卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          }
        ]
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
                border-bottom: 2px solid $border-bottom-color;

                p {
                    display: flex;
                    align-items: flex-start;
                    font-size: $font-medium-s + 1;
                    color: #3d215c;
                    margin-bottom: 0;

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
                    font-size: $font-medium-s + 1;
                    line-height: 1.5;
                    padding: 0 20px 10px;
                }
            }
        }
    }
</style>

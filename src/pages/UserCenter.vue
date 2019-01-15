<template>
    <div class="user-center">
        <header>
            <icon name="arrow-left" @click="() =>{ this.$router.go(-1) }"></icon>
            <span>个人中心</span>
            <icon name="home" @click="() =>{ this.$router.push('/') }" class="icon-home"></icon>
        </header>
        <div class="banner">
            <div class="user">
                <div class="name">
                    <label>专属昵称</label>
                </div>
                <p>0x8923kjKJhkjh9879827ufiywiyri2987yhiu</p>
            </div>
            <ul>
                <li>
                    <span>0.000 ETH</span>
                    <span>0.000 INC</span>
                    <label>
                        奖励总额
                        <img src="../assets/images/icon_total_eth.png">
                    </label>
                </li>
                <li>
                    <span>0</span>
                    <label>
                        参与次数
                    </label>
                </li>
                <li>
                    <span>0</span>
                    <label>
                        直推个数
                    </label>
                </li>
            </ul>
        </div>
        <ul class="tabs">
            <li v-for="tab in tabs"
                :key="tab.value"
                :class="{active:tab.value===action}"
                @click="changeTab(tab.value)">
                {{tab.label}}
            </li>
        </ul>
        <ul class="items">
            <li v-show="action==='push'">
                <table class="push">
                    <tr>
                        <th>昵称</th>
                        <th>钱包地址</th>
                        <th>参与次数</th>
                        <th>直推个数</th>
                    </tr>
                    <tr>
                        <td>aaa</td>
                        <td>0x8923kjKJhkjh9879827ufiywiyri2987yhiu</td>
                        <td>320</td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td>aaa</td>
                        <td>0x8923kjKJhkjh9879827ufiywiyri2987yhiu</td>
                        <td>320</td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td>aaa</td>
                        <td>0x8923kjKJhkjh9879827ufiywiyri2987yhiu</td>
                        <td>320</td>
                        <td>200</td>
                    </tr>
                </table>
            </li>
            <li v-show="action==='winner'">
                <table class="winner">
                    <tr>
                        <th>日期</th>
                        <th>直推个数</th>
                        <th>结果</th>
                    </tr>
                    <tr>
                        <td>2018-12-12</td>
                        <td>88</td>
                        <td>108</td>
                    </tr>
                    <tr>
                        <td>2018-12-12</td>
                        <td>88</td>
                        <td>108</td>
                    </tr>
                    <tr>
                        <td>2018-12-12</td>
                        <td>88</td>
                        <td>108</td>
                    </tr>
                </table>
            </li>
            <li v-show="action==='guess'">
                <table class="guess">
                    <tr>
                        <th>时间</th>
                        <th>我的竞猜</th>
                        <th>中奖数字</th>
                        <th>结果</th>
                    </tr>
                    <tr>
                        <td>
                            2018-12-12 <br>
                            23:23:23
                        </td>
                        <td>8</td>
                        <td>88</td>
                        <td>888</td>
                    </tr>
                    <tr>
                        <td>
                            2018-12-12 <br>
                            23:23:23
                        </td>
                        <td>8</td>
                        <td>88</td>
                        <td>888</td>
                    </tr>
                    <tr>
                        <td>
                            2018-12-12 <br>
                            23:23:23
                        </td>
                        <td>8</td>
                        <td>88</td>
                        <td>888</td>
                    </tr>
                </table>
            </li>
        </ul>
    </div>
</template>

<script>

  export default {
    name: 'userCenter',
    data() {
      return {
        action: 'push',
        tabs: [
          {label: '直推表', value: 'push'},
          {label: '龙虎榜', value: 'winner'},
          {label: '竞猜', value: 'guess'},
        ]
      }
    },
    methods: {
      changeTab(value) {
        this.action = value
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .user-center {
        ul {
            @include clearUl;
        }

        header {
            @include fontSize($font-medium);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 39px;
            line-height: 39px;
            text-align: center;
            color: $clear-color;

            .svg-icon {
                position: absolute;
                top: 0;
                left: $margin-width;
                bottom: 0;
                margin: auto;
                color: $clear-color;

                &.icon-home {
                    left: auto;
                    right: $margin-width;
                }
            }
        }

        .banner {
            @include px2rem('height', 228);
            width: 100%;
            padding-top: 40px;
            background-image: url('../assets/images/bg_persenter_title.png');
            background-size: 100% 100%;

            .user {
                @include px2rem('padding-top', 20);
                display: flex;
                flex-direction: column;
                align-items: center;

                .name {
                    @include px2rem('width', 167);
                    @include px2rem('height', 58);
                    box-sizing: border-box;
                    background-image: url('../assets/images/icon_user_nickname.png');
                    background-size: 100% 100%;

                    label {
                        @include px2rem('margin-top', 20);
                        @include px2rem('margin-left', 11);
                        @include fontSize($font-little-s);
                        display: inline-block;
                        color: #865149;
                    }
                }

                p {
                    @include clearBack;
                    @include fontSize($font-little-s);
                    color: #fcb2ff;
                }
            }

            ul {
                @include clearUl;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: flex-end;
                margin-top: 20px;

                li {
                    @include fontSize($font-little);
                    display: flex;
                    flex-direction: column;
                    justify-content: end;
                    align-items: center;
                    color: $clear-color;
                    line-height: 1.8;

                    label {
                        @include fontSize($font-little-s);
                        margin-top: 5px;
                        color: #EFA795;

                        img {
                            @include px2rem('width', 19);
                            @include px2rem('height', 19);
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        .tabs {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 8px;

            li {
                @include px2rem('width', 108);
                @include px2rem('height', 36);
                @include px2rem('line-height', 36);
                @include px2rem('border-radius', 18);
                @include fontSubColor($font-sub-color);
                @include fontSize($font-little);
                text-align: center;

                &.active {
                    @include background-gradient(#af24d4, #7312b9);
                    color: $clear-color;
                }
            }
        }

        .items {
            margin-top: $margin-width;

            table.push {
                width: 100%;
                border-collapse: collapse;

                tr {
                    @include px2rem('height', 35);
                    @include fontSize($font-little);
                    @include fontSubColor($font-sub-color);
                    border-bottom: 1px solid $border-color;

                    &:first-child {
                        background: #f5f5f5;
                    }
                }

                th, td {
                    box-sizing: border-box;
                    padding: 0 5px;
                    font-weight: normal;
                    word-wrap: break-word;
                    word-break: break-all;

                    &:nth-child(1) {
                        padding-left: $common-list-padding;
                    }

                    &:nth-child(2) {
                        width: 40%;
                    }

                    &:last-child {
                        padding-right: $common-list-padding;
                        text-align: right;
                    }
                }

                td {
                    padding: 6px 5px;
                }
            }

            table.guess, table.winner {
                width: 100%;
                border-collapse: collapse;

                tr {
                    @include fontSize($font-little);
                    @include fontSubColor(#2d2d2d);
                    @include px2rem('height', 35);
                    border-bottom: 1px solid $border-color;
                }

                th, td {
                    text-align: center;
                    padding: 5px;
                    font-weight: 500;

                    &:first-child {
                        text-align: left;
                        padding-left: $common-list-padding;
                    }

                    &:last-child {
                        text-align: right;
                        padding-right: $common-list-padding;
                    }
                }

                &.winner th, &.winner td {
                    box-sizing: border-box;
                    width: 33.333%;
                }
                &.guess th, &.guess td {
                    box-sizing: border-box;
                    width: 25%;
                }
            }
        }
    }
</style>

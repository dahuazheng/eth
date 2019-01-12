<template>
    <div class="home">
        <Banner/>
        <main>
            <ul class="tabs">
                <li v-for="tab in tabs"
                    :key="tab.value"
                    :class="{active:tab.value===tabAction}"
                    @click="changeTab(tab.value)">
                    <span>{{tab.label}}</span>
                </li>
            </ul>
            <ul class="items">
                <li class="join" v-show="tabAction==='join'">
                    <div class="btn-box" @click="openNoteCodePopup">
                        <img src="../assets/images/bg_eth.png">
                        立即参与 1 EHT
                    </div>
                    <p>
                        参与历史
                        <small>我的累积参与：0次</small>
                        <small>钱包余额：0 ETH</small>
                    </p>
                </li>
                <li v-show="tabAction==='guess'">
                    <DayGuess/>
                </li>
            </ul>
        </main>
        <EthFooter/>
        <NoteCodePopup :show="noteCodePopupShow" :close="closeNoteCodePopup"/>
    </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import EthFooter from '@/components/EthFooter.vue'
  import NoteCodePopup from '@/components/NoteCodePopup.vue'
  import DayGuess from '@/components/DayGuess.vue'
  import {joinMixin} from '../mixins'

  export default {
    name: 'home',
    components: {
      Banner, EthFooter, NoteCodePopup, DayGuess
    },
    mixins: [joinMixin],
    data() {
      return {
        tabAction: 'guess',
        tabs: [
          {
            label: '立即参与',
            value: 'join'
          }, {
            label: '每日竞猜',
            value: 'guess'
          }, {
            label: '我的奖励',
            value: 'award'
          }, {
            label: '邀请玩家',
            value: 'invite'
          },
        ]
      }
    },
    methods: {
      changeTab(value) {
        this.tabAction = value
      },
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    .home {
        position: relative;
        height: 100%;
        background: $clear-color;

        ul {
            @include clearUl;
        }

        main {
            .tabs {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                border-bottom: 1px solid $border-color;

                li {
                    @include fontSubColor($font-sub-color);

                    span {
                        @include px2rem('height', 55);
                        @include px2rem('line-height', 55);
                        @include transition(all .25);
                        display: inline-block;
                        box-sizing: border-box;

                    }

                    &.active {
                        @include fontSubColor($font-color);

                        span {
                            border-bottom: 2px solid $primary-color;
                        }
                    }
                }
            }

            .items {
                .join {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;

                    .btn-box {
                        @include px2rem('width', 237);
                        @include px2rem('height', 84);
                        @include fontColor(#FEDF9A);
                        position: relative;
                        box-sizing: border-box;
                        margin-top: 70px;
                        padding-top: 32px;
                        background-image: url('../assets/images/bg_bet.png');
                        background-size: cover;

                        img {
                            @include px2rem('width', 74);
                            @include px2rem('height', 74);
                            position: absolute;
                            top: -37px;
                            left: 0;
                            right: 0;
                            margin: auto;
                        }
                    }

                    p {
                        @include fontColor($primary-color);
                        display: flex;
                        flex-direction: column;
                        margin-top: -10px;
                        line-height: 1.6;

                        small {
                            @include fontSubColor($font-sub-color);
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="game-intro">
        <NavHeader title="游戏说明"/>

        <div class="game-intro__content">
            <div class="content eth-intro">
                <p class="title">「 1 ETH游戏说明 」</p>
                <p class="text">但是故事的但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格复古风格的风格</p>
            </div>
            <div class="content part-method">
                <p class="title">「 参与方法 」</p>
                <p class="text">但是故事的但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格复古风格的风格</p>
            </div>
            <div class="content reward-desc">
                <p class="title">「 奖励说明 」</p>
                <div class='group' v-for="awardDesc in awardDesclist" :key="awardDesc.id">
                    <div class="group-item">
                        <span :class="['block-title', awardDesc.status ? ' up' : ' down']" @click="() => {
                                awardDesc.status = !awardDesc.status
                   }">{{ awardDesc.title }}</span>
                        <transition name="fade">
                            <p v-if="awardDesc.status"> {{ awardDesc.text }}</p>
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
            text: '不到对方改变对认同和今天运通的不二个人方改变方向改变',
            status: false
          },
          {
            title: '动态推荐',
            text: '不到对方改变对认同和今天运通的不二个人方改变方向改变',
            status: false
          },
          {
            title: '静态分红',
            text: '不到对方改变对认同和今天运通的不到对方改变对认同和今天运通的不二个人方改变方向改变不二个人方改变方向改变',
            status: false
          },
          {
            title: '动态推荐',
            text: '不到对方改变对认同和今天运通的不二个人方改变方向改变',
            status: false
          },
          {
            title: '静态分红',
            text: '不到对方改变对认同和今不到对方改变对认同和今天运通的不二个人方改变方向改变天运通的不二个人方改变方向改变',
            status: false
          },
          {
            title: '动态推荐',
            text: '不到对方改变对认同和今天运不到对方改变对认同和今天运通的不二个人方改变方向改变通的不二个人方改变方向改变',
            status: false
          },
          {
            title: '静态分红',
            text: '不到对方改变对认同和今天运通的不二个人方改变方向改变',
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
                        font-size: $font-little;
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
                    }
                }
            }
        }
    }
</style>

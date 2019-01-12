<template>
    <div id="game-intro">
        <NavHeader title="游戏说明"/>

        <div class="game-intro__content">
            <div class="content eth-intro">
                <p class="title">「 1 ETH游戏说明 」</p>
                <p>但是故事的但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格复古风格的风格</p>
            </div>
            <div class="content part-method">
                <p class="title">「 参与方法 」</p>
                <p>但是故事的但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格但是故事的复古风格的风格复古风格的风格</p>
            </div>
            <div class="content reward-desc">
                <p class="title">「 奖励说明 」</p>
                <div class='group'>
                    <div class="group-item">
                        <span>静态分红</span>
                        <p>静态分红是哭着说达华方法东方航空发生的可能</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'

  export default {
    name: 'gameIntro',
    components: {NavHeader}
  }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #game-intro {
        .game-intro__content {
        .content {
            p {
                &.title {
                    font-size: $font-little;
                    color: $primary-color;
                }
            }
        }
        }
    }
</style>
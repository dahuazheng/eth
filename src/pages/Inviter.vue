<template>
    <div class="home">
        <Banner/>
        <main>
            <p>
                <label>必须绑定邀请人才能参与游戏！</label>
            </p>
            <p class="no-inviter">
                <span>若无邀请人</span>
                <img src="../assets/images/icon_helper.png">
            </p>
            <p>
                <input type="text" placeholder="输入邀请人昵称">
            </p>
            <p class="btn-box">
                <button>立即绑定</button>
            </p>

        </main>
        <EthFooter/>
    </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import EthFooter from '@/components/EthFooter.vue'

  export default {
    name: 'home',
    components: {
      Banner, EthFooter
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    .home {
        position: relative;
        height: 100%;
        background: $clear-color;

        main {
            padding-top: 15px;

            p {
                @include fontSize($font-medium-s);
                margin: 15px;
                text-align: center;

                label {
                    @include fontSize($font-medium);
                    @include fontSubColor($font-sub-color);
                }

                input {
                    @include px2rem('width', 315);
                    padding: 7px 0;
                    border: none;
                    border-bottom: 1px solid $border-color;
                }

                &.no-inviter {
                    @include fontSubColor($font-sub-color);
                    @include fontSize($font-little);
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;

                    img {
                        @include px2rem('width', 30);
                        @include px2rem('height', 30);
                        margin-left: 5px;
                    }
                }

                &.btn-box {
                    margin-top: 40px;

                    button {
                        @include px2rem('width', 148);
                        @include px2rem('height', 42);
                        @include px2rem('line-height', 42);
                        @include background-gradient(#C037ED, #9712A3);
                        @include fontSize($font-medium-s);
                        color: $clear-color;
                        border-radius: 5px;
                        border: none;
                    }
                }

            }
        }
    }
</style>

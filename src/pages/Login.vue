<template>
    <div class="home">
        <Banner/>
        <main>
            <p><label>请先登录</label></p>
            <p>
                <button>登陆</button>
            </p>
        </main>
        <EthFooter/>
    </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import EthFooter from '@/components/EthFooter.vue'

  export default {
    name: 'login',
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
            p {
                @include fontSize($font-medium-s);
                margin: 40px;
                text-align: center;

                label {
                    @include fontSize($font-medium);
                    @include fontSubColor($font-sub-color);
                }

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
</style>

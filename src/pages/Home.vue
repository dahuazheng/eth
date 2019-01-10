<template>
    <div class="home">
        <Banner/>
        <main>
            <p><label>请先登录</label></p>
            <p>
                <button>登陆</button>
            </p>
            <p><span>注册</span></p>
        </main>
        <Footer/>
    </div>
</template>

<script>
  // @ is an alias to /src
  import Banner from '@/components/Banner.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'home',
    components: {
      Banner, Footer
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
                }

                span {
                    @include fontPrimaryColor($primary-color)
                }
            }
        }
    }
</style>

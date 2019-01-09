<template>
    <div class="home">
        <Banner/>


    </div>
</template>

<script>
  // @ is an alias to /src
  import Banner from '@/components/Banner.vue'

  export default {
    name: 'home',
    components: {
      Banner
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    .home {
        padding-bottom: 30px;
    }

    .banner {
        @include px2rem('height', 328);
        box-sizing: border-box;
        width: 100%;
        padding-top: 20px;
        //background: #8c00af;

        .head {
            position: relative;
            @include px2rem('height', 60);

            img {
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                @include px2rem('width', 78);
                @include px2rem('height', 82);

                &.trophy {
                    left: 15px;
                }

                &.logo {
                    left: 0;
                    right: 0;
                    @include px2rem('width', 60);
                    @include px2rem('height', 64);
                }
            }

            .input-box {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 15px;
                margin: auto;
                @include px2rem('width', 125);
                @include px2rem('height', 28);

                input {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 0 8px;
                    border-radius: 14px;
                    border: 1px solid #ccc;
                    background: transparent;
                    outline: none;
                    @include fontSize($font-little);
                    @include fontColor(#ccc)
                }

                input::-webkit-input-placeholder {
                    @include fontColor(#ccc)
                }
            }
        }

        .jackpot {
            padding-top: 15px;
            text-align: center;
            color: #f6f6f6;

            small {
                @include fontSize($font-little-s)
            }

            .price {
                @include fontSize(26px);
                color: #ffe600;
            }

            ul {
                @include clearUl;
                @include fontSize($font-little-s);
                display: flex;
                justify-content: center;

                li {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    text-align: left;
                    margin: 0 15px;
                }
            }
        }
    }

    .container {
        margin-left: 15px;
        margin-right: 15px;
    }

    section {
        .title {
            margin: 0;
            padding: 8px 0;
            line-height: 1.5;
            @include fontSize($font-medium-s);
            @include fontSubColor($font-sub-color)
        }

        ul {
            @include clearUl;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;

            li {
                //flex-grow: 1;
                width: 32%;
                margin-right: 2%;
                @include px2rem('height', 84);
                @include px2rem('line-height', 84);
                background: #fff;

                &:last-child {
                    margin-right: 0;
                }

                .box {
                    display: inline-block;
                    width: 100%;
                    line-height: 1.2;
                    vertical-align: middle;
                    text-align: center;

                    img {
                        @include px2rem('width', 28);
                        @include px2rem('height', 28);
                    }
                    label {
                        display: inline-block;
                        margin-top: 8px;
                        @include fontSubColor($font-sub-color);
                        @include fontSize($font-medium-s);
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="charge-money">
        <div class="title">
            <icon name="arrow-left" @click="() => { this.$router.go(-1) }"></icon>
            <!--<icon name="article-share"></icon>-->
        </div>
        <div class="box">
            <h2>
                收款 <br>
                <small>余额： 0 ETH</small>
            </h2>
            <QrcodeVue :value="wallatAddress" size="138" renderAs='svg'/>
            <p class="code">{{ wallatAddress }}</p>
            <p v-clipboard:copy="wallatAddress"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError"
            >复制地址</p>
        </div>
    </div>
</template>j

<script>
    import QrcodeVue from 'qrcode.vue'
    import { Toast } from 'mint-ui'

    export default {
        props: ['show', 'back'],
        components: {
            QrcodeVue
        },
        data() {
            return {
                wallatAddress: '0x8923kjKJhkjh9879827ufiywiyri2987yhiu',
                message: 'Copy These Text'
            }
        },
        methods: {
            onCopy(e) {
                return Toast('已复制')
            },
            onError() {
                return Toast('请重新复制')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .charge-money {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        @include background-gradient-vertical(#8a1eb2, #450d78);

        .title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 39px;
            margin: 5px $margin-width;

            .svg-icon {
                color: $clear-color;
            }
        }

        .box {
            @include px2rem('width', 280);
            @include px2rem('height', 380);
            position: absolute;
            top: 70px;
            right: 0;
            left: 0;
            box-sizing: border-box;
            padding: $space-width;
            margin: 20px auto;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            background: $clear-color;
            text-align: center;

            h2 {
                @include fontSize($font-medium);
                line-height: 1.8;
                font-weight: normal;

                small {
                    @include fontSize($font-little);
                    @include fontColor($font-third-color);

                }
            }

            .qrcode {
                /*flex-shrink: 0;*/
                /*width: 144px;*/
                /*height: 144px;*/
                /*padding: 10px;*/
                /*background: #fff;*/
                /*border-radius: 4px;*/
            }

            p {
                @include fontPrimaryColor(#7c46af);

                &.code {
                    @include px2rem('height', 18);
                    @include px2rem('line-height', 18);
                    @include px2rem('border-radius', 14);
                    @include fontSize($font-little-s);
                    display: inline-block;
                    padding: 0 10px;
                    background: #efe0fd;

                }
            }
        }
    }

</style>

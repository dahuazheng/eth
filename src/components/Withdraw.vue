<template>
    <div class="withdraw">
        <div class="title">
            <icon name="arrow-left"></icon>
            提现
            <icon name="scan-code" class="scan"></icon>
        </div>
        <div class="form">
            <div class="row">
                <label>选择币种</label>
                <span>
                    ETH
                    <icon name="down"></icon>
                </span>
            </div>
            <div class="row">
                <input type="text" placeholder="收款人地址">
            </div>
            <div class="row">
                <input type="text" placeholder="转账金额">
                <span>余额： 0 ETH</span>
                <small>手续费：0.0001 ETH</small>
            </div>
            <div class="row">
                <input type="text" placeholder="转账金额">
                <span>获取验证码</span>
            </div>
            <div class="row">
                <label>到账数量</label>
                <span>
                    --ETH
                </span>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .withdraw {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background: $clear-color;

        .title {
            @include fontSize($font-medium);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 $margin-width;

            .svg-icon{
                width: 20px;
                height: 20px;
            }

            .scan{
                @include fontPrimaryColor($primary-color)
            }
        }
    }
</style>
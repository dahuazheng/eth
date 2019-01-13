<template>
    <div id="user-center">
        <div class="user-center__banner">
            <div class="icon-group">
                <img class="logo" src="../assets/images/icon_eth_download.png" alt=""> <span>x</span> <img
                    src="../assets/images/icon_eth_star.png" alt="">
            </div>
            <p>我的</p>
        </div>

        <div class="user-center__options">
            <ul class="options">
                <!--<li>
                    <router-link to="/select-lang">
                        <span class='check-option__language'> 选择语言</span>
                        <span class="lang-tip">简体中文</span>
                        <span class='check-arrow'></span>
                    </router-link>
                </li>-->
                <li>
                    <router-link to="/game-intro">
                        <span class="check-option__game">游戏说明</span>
                        <span class='check-arrow'></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/common-problem">
                        <span class="check-option__help">常见问题</span> <span class='check-arrow'/>
                    </router-link>
                </li>
                <li>
                    <router-link to="/contact-us">
                        <span class="check-option__contact"> 联系我们</span> <span class='check-arrow'/>
                    </router-link>
                </li>
                <li>
                    <router-link to="/login">
                        <span class="check-option__out"> 退出登录</span>
                        <span class='check-arrow'/>
                    </router-link>
                </li>
            </ul>
        </div>

        <EthFooter action="userOption"/>
    </div>
</template>
<script>
  import EthFooter from '@/components/EthFooter.vue'

  export default {
    name: 'userOption',
    components: {EthFooter},
  }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #user-center {
        .user-center__banner {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            @include px2rem('height', 237);
            text-align: center;
            background-image: url('../assets/images/bg_me_title.png');
            background-size: 100% 100%;

            .icon-group {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                img {
                    @include px2rem('height', 46);
                    @include px2rem('line-height', 52);

                    &.logo {
                        @include px2rem('height', 64);
                        @include px2rem('line-height', 64);
                    }
                }

                span {
                    @include px2rem('height', 20);
                    @include px2rem('line-height', 20);
                    @include fontSize($font-large);
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 6px;
                    margin: auto;
                    display: inline-block;
                    color: #ffe500;
                }
            }

            p {
                color: #fed67c;
                letter-spacing: 1px;
                font-size: $font-large;
                margin-top: 0;
            }
        }

        .user-center__options {
            padding-bottom: 36px;
            padding-left: 36px;
            padding-right: 36px;
            padding-top: 10px;

            ul.options {
                @include clearUl;
                display: flex;
                flex-direction: column;

                li > a {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 0;
                    font-size: $font-little + 1;
                    text-decoration: none;

                    span {
                        display: inline-flex;
                        align-items: center;
                        color: #5b5b5b;

                        &.check-option__language::before {
                            content: '';
                            display: inline-block;
                            margin-right: 10px;
                            @include px2rem('width', 30);
                            @include px2rem('height', 30);
                            @include background-image();
                            background-image: url('../assets/images/icon_language.png');
                        }

                        &.check-option__game::before {
                            content: '';
                            display: inline-block;
                            margin-right: 10px;
                            @include px2rem('width', 30);
                            @include px2rem('height', 30);
                            @include background-image();
                            background-image: url('../assets/images/icon_game_des.png');
                        }

                        &.check-option__help::before {
                            content: '';
                            display: inline-block;
                            margin-right: 10px;
                            @include px2rem('width', 30);
                            @include px2rem('height', 30);
                            @include background-image();
                            background-image: url('../assets/images/icon_helper.png');
                        }

                        &.check-option__contact::before {
                            content: '';
                            display: inline-block;
                            margin-right: 10px;
                            @include px2rem('width', 30);
                            @include px2rem('height', 30);
                            @include background-image();
                            background-image: url('../assets/images/icon_commite_us.png');
                        }

                        &.check-option__out::before {
                            content: '';
                            display: inline-block;
                            margin-right: 10px;
                            @include px2rem('width', 30);
                            @include px2rem('height', 30);
                            @include background-image();
                            background-image: url('../assets/images/icon_sign_out.png');
                        }

                        &.check-arrow {
                            @include px2rem('width', 11);
                            @include px2rem('height', 11);
                            background-image: url('../assets/images/icon_push_right.png');
                            @include background-image()
                        }

                        &.lang-tip {
                            position: absolute;
                            right: 30px;
                            font-size: $font-little-s;
                            color: #c4c2c2;
                        }
                    }
                }
            }
        }
    }
</style>
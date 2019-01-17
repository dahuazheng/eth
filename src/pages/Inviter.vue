<template>
    <div class="inviter">
        <Banner/>
        <main>
            <p>
                <label>必须绑定邀请人才能参与游戏！</label>
            </p>
            <p class="no-inviter">
                <router-link to="/common-problem?name=inviter">
                    <span>若无邀请人</span>
                    <img src="../assets/images/icon_helper.png">
                </router-link>
            </p>
            <p>
                <input type="text" v-model.trim="inviter" placeholder="输入邀请人昵称">
            </p>
            <p class="btn-box">
                <button @click="submit">立即绑定</button>
            </p>
        </main>
        <EthFooter action="home"/>
    </div>
</template>

<script>
    import Banner from '@/components/Banner.vue'
    import EthFooter from '@/components/EthFooter.vue'
    import Cookies from 'js-cookie'
    import {Toast} from 'mint-ui'
    import UserApi from '@/api/user'

    export default {
        name: 'home',
        components: {
            Banner, EthFooter
        },
        data() {
            return {
                inviter: '',
            }
        },
        methods: {
            submit() {
                if (!this.inviter) {
                    return Toast('请输入邀请人昵称')
                }

                UserApi.bindInviteCode({invite_code: this.inviter}).then(res => {
                    if (Number(res.status) === 1) {
                        console.log(res)
                        Cookies.set('ETH.invite_code', this.inviter, {expires: 1 / 24})
                        Toast('绑定成功')
                        setTimeout(() => {
                            this.$router.push({name: 'home'})
                        }, 2000)
                    } else {
                        Toast('输入的邀请人昵称不存在')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .inviter {
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
                    @include fontSize($font-medium-s);
                    padding: 7px 0;
                    border: none;
                    border-bottom: 1px solid $border-color;
                }

                &.no-inviter a {
                    @include fontSubColor($font-sub-color);
                    @include fontSize($font-medium-s);
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;

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

<template>
    <div class="inviter">
        <Banner
            :reset="+new Date()"
            :startCountDown="startCountDown"
            :endCountDown="endCountDown"
            :gameStatus="gameStatus"
            :displayCountDown="displayCountDown"
        />
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
                <input
                    type="text"
                    @input="change"
                    @change="change"
                    :value="inpCode"
                    placeholder="输入邀请码"
                >
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
    import {UserApi} from '@/api'
    import {countDownMixin} from '../mixins'

    export default {
        name: 'home',
        mixins: [countDownMixin],
        components: {
            Banner, EthFooter
        },
        data() {
            return {
                inviteCode: '',
            }
        },
        computed: {
            inpCode() {
                return this.inviteCode
            }
        },
        methods: {
            // 邀请码校验
            change(event) {
                let val = event.target.value.trim()
                // 数字、英文字母
                if (/^[0-9A-Za-z]{0,8}$|^$/.test(val)) {
                    this.inviteCode = val
                } else {
                    event.target.value = this.inviteCode
                }
            },
            submit() {
                if (!this.inviteCode) {
                    return Toast('请输入邀请人昵称')
                }

                // 临时邀请码
                // Cookies.set('ETH.bind_inviter', 'true', {expires: 1 / 24})
                // this.$router.push({name: 'home'})

                UserApi.bindInviteCode({invite_code: this.inviteCode}).then(res => {
                    if (Number(res.status) === 1) {
                        // console.log(res)
                        this.$store.dispatch('user/getInviteCode')
                        Cookies.set('ETH.bind_inviter', 'true', {expires: 1 / 24})
                        Toast('绑定成功')
                        setTimeout(() => {
                            this.$router.push({name: 'home'})
                        }, 1000)
                    } else {
                        Toast(res.msg)
                    }
                })
            }
        },
        mounted() {
            // 判断是否绑定邀请码
            if (!UserApi.isBindInviter()) {
                UserApi.checkInviteBind().then(res => {
                    if (Number(res.status) === 1 && Number(res.data && res.data.is_bind) === 1) {
                        this.$router.push({name: 'home'})
                    }
                })
            } else {
                this.$router.push({name: 'home'})
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
            padding-bottom: 40px;

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
                    padding-bottom: 40px;

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

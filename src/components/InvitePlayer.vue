<template>
    <div class="invite-player">
        <div class="my-inviter">
            <label>我的邀请人</label>
            <span>{{parentInviteCode}}</span>
        </div>
        <div class="item in-active">
            <label>您的专属邀请码为</label><br>
            <span v-clipboard:copy="user.invite_code || ''"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">
                {{user.invite_code || ''}}
                <img src="../assets/images/icon_copy.png">
            </span>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import {mapState} from 'vuex'
    import {UserApi} from '../api'

    export default {
        data() {
            return {
                parentInviteCode: ''
            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
            })
        },
        methods: {
            copyName() {
                const input = document.createElement('input')
                document.body.appendChild(input)
                input.setAttribute('value', this.user.invite_code)
                input.select()
                if (document.execCommand('copy')) {
                    document.execCommand('copy')
                }
                Toast('复制成功')
                document.body.removeChild(input)
            },
            onCopy() {
                return Toast('复制成功')
            },

            onError() {
                return Toast('请重新复制')
            }
        },
        mounted() {
            UserApi.getParentInviteCode().then(res => {
                if (Number(res.status) === 1) {
                    this.parentInviteCode = res.data && res.data.parent_invite_code
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .invite-player {
        .my-inviter {
            padding: 20px 0;
            border-bottom: 1px solid $border-color;
            text-align: center;

            label {
                @include fontSubColor($font-sub-color);
                margin-right: $space-width;
            }
        }

        .in-active {
            padding: 40px 0;
            text-align: center;

            span {
                @include px2rem('height', 26);
                @include px2rem('line-height', 26);
                display: inline-block;
                margin-top: $margin-width;
                padding: 0 15px;
                border-radius: $border-radius;
                background: #fff6f0;
                color: #cebf6e;

                img {
                    margin-left: 5px;
                    vertical-align: middle;
                    @include px2rem('width', 15);
                    @include px2rem('height', 15);
                }
            }
        }
    }
</style>

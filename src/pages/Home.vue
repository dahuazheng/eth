<template>
    <div class="home">
        <Banner/>
        <main>
            <ul class="tabs">
                <li v-for="tab in tabs"
                    :key="tab.value"
                    :class="{active:tab.value === tabAction}"
                    @click="changeTab(tab.value)">
                    <span>{{tab.label}}</span>
                </li>
            </ul>
            <ul class="items">
                <li v-show="tabAction==='join'">
                    <JoinNow :balance="balance" :open="openNoteCodePopup"/>
                </li>
                <li v-show="tabAction==='guess'">
                    <DayGuess/>
                </li>
                <li v-show="tabAction==='award'">
                    <MyAward/>
                </li>
                <li v-show="tabAction==='invite'">
                    <InvitePlayer/>
                </li>
            </ul>
        </main>
        <EthFooter action="home"/>
        <NoteCodePopup :show="noteCodePopupShow" :close="closeNoteCodePopup"/>
    </div>
</template>

<script>
    import Banner from '@/components/Banner.vue'
    import EthFooter from '@/components/EthFooter.vue'
    import NoteCodePopup from '@/components/NoteCodePopup.vue'
    import JoinNow from '@/components/JoinNow.vue'
    import DayGuess from '@/components/DayGuess.vue'
    import MyAward from '@/components/MyAward.vue'
    import InvitePlayer from '@/components/InvitePlayer.vue'

    import UserApi from '@/api/user'
    import {mapState} from 'vuex'


    export default {
        name: 'home',
        components: {
            Banner, EthFooter, NoteCodePopup, JoinNow, DayGuess, MyAward, InvitePlayer
        },
        data() {
            return {
                noteCodePopupShow: false,
                tabAction: 'join',
                tabs: [
                    {label: '立即参与', value: 'join'},
                    {label: '每日竞猜', value: 'guess'},
                    {label: '我的奖励', value: 'award'},
                    {label: '邀请玩家', value: 'invite'}
                ]
            }
        },
        computed: {
            ...mapState({
                balance: state => state.balance,
            })
        },
        methods: {
            openNoteCodePopup() {
                this.noteCodePopupShow = true
            },
            closeNoteCodePopup() {
                this.noteCodePopupShow = false
            },
            changeTab(value) {
                this.tabAction = value
            },
            init() {
                this.$store.dispatch('balance/getBalance')
                if (!UserApi.isOnline()) {
                    this.$router.push({name: 'login'})
                    return
                }
                if (!UserApi.isBindInviter()) {
                    this.$router.push({name: 'inviter'})
                }
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    .home {
        position: relative;
        height: 100%;
        background: $clear-color;

        ul {
            @include clearUl;
        }

        main {
            .tabs {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                border-bottom: 1px solid $border-color;

                li {
                    @include fontSubColor($font-sub-color);

                    span {
                        @include px2rem('height', 55);
                        @include px2rem('line-height', 55);
                        @include transition(all .25);
                        display: inline-block;
                        box-sizing: border-box;

                    }

                    &.active {
                        @include fontSubColor($font-color);

                        span {
                            border-bottom: 2px solid $primary-color;
                        }
                    }
                }
            }
        }
    }
</style>

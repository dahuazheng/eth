<template>
    <div class="join-history">
        <PopupTitle title="参与历史" :back="close"/>
        <ul>
            <li>
                <span>时间</span>
                <span>序列</span>
            </li>
            <li v-for="item in list" :key="item.number">
                <span>{{item.time}}</span>
                <span>{{item.number}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import PopupTitle from '../components/PopupTitle'

    export default {
        components: {PopupTitle},
        data() {
            return {
                list: [{
                    time: '2019-01-07 12:30:20',
                    number: 1
                }, {
                    time: '2019-01-07 12:30:20',
                    number: 2
                }, {
                    time: '2019-01-07 12:30:20',
                    number: 3
                }]
            }
        },
        methods: {
            close() {
                this.$router.push({name: 'home', query: {tab: 'join'}})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .join-history {
        ul {
            @include clearUl;
            padding: $margin-width;

            li {
                @include px2rem('height', 40);
                @include fontSize($font-little);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 $space-width;
                border-bottom: 1px solid $border-color;
            }
        }
    }

</style>

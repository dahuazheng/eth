<template>
    <div id="contact-us">
        <NavHeader title="联系我们"/>

        <div class="logo"></div>
        <ul class="list">
            <li>
                <span class='contact'> 联系我们</span>
                <span class="tip"> </span>
                <span class='check-arrow'></span>
            </li>
            <li>
                <span class="email">邮箱</span>
                <span>service@luckyinc.org</span>
                <!--<span class='check-arrow'></span>-->
            </li>
        </ul>
    </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'

  export default {
    name: 'contactUs',
    components: {NavHeader}
  }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #contact-us {
        .logo {
            margin: 10px auto;
            @include px2rem('width', 128);
            @include px2rem('height', 124);
            @include background-image();
            background-image: url('../assets/images/inc_contact.png');
        }

        ul.list {
            @include clearUl;
            display: flex;
            flex-direction: column;
            padding: 0 23px;

            li {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                @include fontSize($font-little + 1);
                text-decoration: none;

                span {
                    display: inline-flex;
                    align-items: center;
                    color: #5b5b5b;
                    letter-spacing: 1px;
                    @include fontSize($font-medium-s + 1);

                    &.tip {
                        position: absolute;
                        right: 20px;
                        color: #c4c2c2;
                    }
                    &.check-arrow {
                        @include px2rem('width', 11);
                        @include px2rem('height', 11);
                        background-image: url('../assets/images/icon_push_right.png');
                        @include background-image()
                    }

                }
            }
        }
    }
</style>

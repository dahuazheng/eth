<template>
    <div id="common-problem">
        <div class="common-problem__nav">
            <router-link to="/user-center" class="nav-back"/>
            <span class="nav-title">常见问题</span> <span/>
        </div>

        <ul class="common-problem__content">
            <li>
                <p>Q：如何创建“1ETH”账户？</p>
            </li>
            <li>
                <p>Q：什么是邀请码？</p>
            </li>
            <li>
                <p>Q：如何创建“1ETH”账户？</p>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'commonProblem',

  }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #common-problem {
        .common-problem__nav {
            display: flex;
            justify-content: space-between;
            padding: 36px 12px;

            .nav-back {
                @include px2rem('width', 20);
                @include px2rem('height', 20);
                @include background-image;
                text-decoration: none;
                background-image: url('../assets/images/icon_back_black.png');
            }

            .nav-title {
                font-size: $font-medium-s + 4;
                font-weight: 600;
                color: #000;
            }
        }

        .common-problem__content {
            @include clearUl;

            li {
                padding: 0 20px;
                border-bottom: 2px solid $border-bottom-color;

                p {
                    display: flex;
                    align-items: flex-start;
                    font-size: $font-medium-s + 1;
                    color: #3d215c;
                    margin-bottom: 10px;

                    &::before {
                        content: '';
                        display: inline-block;
                        @include px2rem('width', 24);
                        @include px2rem('height', 29);
                        @include background-image;
                        background-image: url('../assets/images/image_html_title.png');
                    }
                }
            }
        }
    }
</style>
<template>
    <div id="common-problem">
        <NavHeader title="常见问题"/>
        <ul class="common-problem__content">
            <li v-for="item in problemList">
                <p @click="item.status = !item.status">{{ item.title}}</p>
                <transition>
                    <div class="content" v-show="item.status">{{ item.content }}</div>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'

  export default {
    name: 'commonProblem',
    components: { NavHeader },
    data() {
      return {
        problemList: [
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '杰克丹尼参加考试卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '杰克丹尼参加考试卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          },
          {
            title: 'Q：如何创建“1ETH”账户？',
            content: '杰克丹尼参加考试卡聚合釜IE发布会杰克丹尼参加考试的回复而不会就好',
            status: false
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    #common-problem {
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
                    margin-bottom: 0;

                    &::before {
                        content: '';
                        display: inline-block;
                        @include px2rem('width', 24);
                        @include px2rem('height', 29);
                        @include background-image;
                        background-image: url('../assets/images/image_html_title.png');
                    }
                }
                
                div.content {
                    font-size: $font-medium-s + 1;
                    line-height: 1.5;
                    padding: 0 20px 10px;
                }
            }
        }
    }
</style>
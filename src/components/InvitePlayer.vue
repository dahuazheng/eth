<template>
    <div class="invite-player">
        <div class="my-inviter">
            <label>我的邀请人</label>
            <span>9999999</span>
        </div>
        <!--<div class="item un-active" v-show="active==='un'">-->
            <!--<input type="text" placeholder="请指定您的专属邀请昵称" v-model="name">-->
            <!--<span @click="activateName">激活专属邀请昵称</span>-->
        <!--</div>-->
        <div class="item in-active">
            <label>您的专属邀请码为</label><br>
            <span>
                {{name}}
                <img src="../assets/images/icon_copy.png" @click="copyName">
            </span>
        </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        active: 'un',
        name: ''
      }
    },
    methods: {
      activateName() {
        if (!this.name) {
          Toast('请输入专属邀请昵称')
          return
        }
        this.active = 'in'
      },
      copyName() {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', this.name)
        input.select()
        if (document.execCommand('copy')) {
          document.execCommand('copy')
        }
        Toast('复制成功')
        document.body.removeChild(input)
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .invite-player {
        .my-inviter {
            @include px2rem('height', 64);
            @include px2rem('line-height', 64);
            border-bottom: 1px solid $border-color;
            text-align: center;

            label {
                @include fontSubColor($font-sub-color);
                margin-right: $space-width;
            }
        }

        .un-active {
            position: relative;
            margin: $margin-width;

            input {
                @include fontSize($font-medium-s);
                box-sizing: border-box;
                width: 100%;
                padding: 7px 15px;
                border: none;
                border-bottom: 1px solid $border-color;
            }

            span {
                @include fontColor(#cebf6e);
                position: absolute;
                top: 0;
                right: 15px;
                bottom: 0;
                margin: auto;
                padding: 7px 0;
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

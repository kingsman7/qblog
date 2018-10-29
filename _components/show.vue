<template>
  <div id="iblogShow"
       :class="this.$q.platform.is.desktop ? 'desktop' : 'mobile'">
    <!--= CATEGORIES =-->
    <div class="q-container content">
      <div class="row">

        <div class="col-12">
          <div class="imgPost"
               :style="'background-image: url('+encodeURI(dataPost.mainimage)+')'">
          </div>

          <hr>

          <div v-html="dataPost.description"></div>
        </div>
      </div>
    </div>

    <!--= POST =-->
    <post-component v-if="(!dataPost.children || !dataPost.children.length) && !this.$route.params.slugPost"
                    :category="dataPost" :posts="dataPost.posts">
    </post-component>
  </div>
</template>
<script>
  /*Component*/
  import postComponent from '@imagina/qblog/_components/widgets/widget-post'

  export default {
    props: {
      dataPost: {default: []},
    },
    components: {
      postComponent
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}

  }
</script>
<style lang="stylus">
  @import "~variables";
  #iblogShow
    .content
      padding 70px 85px 40px 85px
      hr
        border-top 1px solid $grey-11
        margin 35px auto
      p
        font-size 16px
        color $grey-8
        line-height 1.4
        text-align justify
      .imgPost
        width 100%
        height 546px
        background-size cover
        background-repeat no-repeat
        background-position center
    &.mobile
      .content
        padding 15px 20px
      .imgPost
        height 200px
</style>

<template>
  <div id="iblogIndex" :class="this.$q.platform.is.desktop ? 'desktop' : 'mobile'">
    <!--= CATEGORIES =-->
    <div class="q-container content">
      <div class="row gutter-md">

        <div class="col-12 col-md-6 col-lg-4"
             :key="index" :to="'/'+category.slug"
             v-for="(category, index) in categories.children">
          <div class="block"
               :style="'background-image: url('+encodeURI(category.mainimage)+')'">
            <router-link :to="'/'+category.slug" class="text-white">
              <div class="row overlay full-height text-center">
                <div class="col-12 self-center">
                  {{category.title}}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      categories: {default: []},
    },
    components: {},
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
  #iblogIndex
    .content
      padding-top 70px
      padding-bottom 40px
      .block
        position relative
        height 355px
        font-size 35px
        color white
        background-position center
        background-repeat no-repeat
        background-size cover
        text-shadow 2px 2px 2px #464646
        text-decoration none
        a
          text-decoration none !important
        .overlay
          position absolute
          top 0
          left 0
          width 100%
          background-color #23336670
    &.mobile
      .content
        padding 0
      .block
        height 200px
      .gutter-md
        @media screen and (max-width: $breakpoint-xs)
          div
            padding-top 2px

          &:first-child
            padding-top 32px
</style>

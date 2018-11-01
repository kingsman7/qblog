<template>
  <div id="postComponent" :class="$q.platform.is.desktop ? 'desktop' : 'mobile'">
    <div class="q-container full-height">
      <div class="row full-height items-center">
        <div class="col-12">
          <carousel autoplay loop
                    v-if="category && posts.length"
                    :autoplayTimeout="$q.platform.is.desktop ? 4000 : 2000"
                    :perPage="$q.platform.is.desktop ? 4 : 1"
                    :paginationEnabled="false"
                    :navigationEnabled="$q.platform.is.desktop ? true : false"
                    navigationNextLabel="<i class='fas fa-angle-right'></i>"
                    navigationPrevLabel="<i class='fas fa-angle-left'></i>">
            <!--POSTS-->
            <slide v-for="(post, index) in posts" :key="index">
              <router-link :to="'/'+categorySlug+'/'+post.slug" class="text-secondary">
                <div class="img"
                     :style="'background-image: url('+encodeURI(post.mainimage)+')'">
                </div>
                <div class="title">
                  <q-icon name="fas fa-check-circle"></q-icon>
                  <q-btn :label="post.title"
                         flat color="secondary">
                  </q-btn>
                </div>
              </router-link>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /*Services*/
  import postsService from '@imagina/qblog/_services/posts'

  export default {
    props: {
      category: {default: false},
      posts: {default: false}
    },
    components: {},
    watch: {
      category(data) {
        if(!this.posts && this.category)
          this.getPosts()
      }
    },
    mounted() {
      this.$nextTick(function () {
        if(!this.posts && this.category)
          this.getPosts()
      })
    },
    data() {
      return {}
    },
    computed:{
      categorySlug(){
        return this.category.parent ? this.category.parent.slug : this.category.slug
      }
    },
    methods: {
      getPosts(){
        let parameters = {
          filter : {categoryId : this.category.id},
          include : 'category,categories'
        }

        postsService.index(parameters).then((response) => {
          this.posts = response.data
        })
      }
    }

  }
</script>
<style lang="stylus">
  @import "~variables";

  #postComponent
    text-align center
    .img
      height 192px
      width 100%
      background-position center
      background-size cover
      background-repeat: no-repeat;
      border 1px solid $grey-3
    .VueCarousel
      margin-bottom 60px
      @media screen and (max-width: $breakpoint-md)
        margin-bottom 40px
      .VueCarousel-slide
        padding 0 15px
        a
          text-decoration none
        .title
          position relative
          padding-top 10px
          text-align left
          .q-icon
            position absolute
            left 10px
            top 20px
          .q-btn
            text-align left
            padding-left 40px
            .q-focus-helper
              display none
        @media screen and (max-width: $breakpoint-md)
          padding 0 60px !important
      .VueCarousel-navigation
        padding 20px auto
        .VueCarousel-navigation-button
          font-size 31px
          color $secondary

</style>

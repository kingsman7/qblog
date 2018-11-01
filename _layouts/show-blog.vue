<template>
  <div id="showIblog" class="relative-position">
    <!--= BANNER =-->
    <banner-component :dataBanner="post">
    </banner-component>

    <div class="q-container">
      <div class="row q-py-xl">
        <!--Post-->
        <div class="post col-12 col-lg-8">
          <!--Title-->
          <h1 class="title">
            {{post.title}}
          </h1>

          <!--Image-->
          <div class="img"
               :style="'background-image: url('+post.mainimage+')'">
            <!--Tag Date-->
            <span class="bg-primary text-center text-uppercase text-white float-left p-2 mb-3 date">
                <h4>{{post.created_date.day}}</h4>
                {{post.created_date.mounth}}
              </span>
          </div>

          <!--Description-->
          <div class="description" v-html="post.description"></div>

          <!--Autor-->
          <div class="autor q-headline">
            <span class="text-secondary">{{post.addedBy}}</span>, Autor
          </div>

          <!--Comments-->
          <comment-component></comment-component>
        </div>


        <!--Other Posts-->
        <div class="col-12 col-lg-4 desktop-only">
          <posts-component></posts-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*Component*/
  import bannerComponent from '@imagina/qblog/_components/widgets/widget-banner'
  import commentComponent from 'src/components/commentsFB'
  import postsComponent from '@imagina/qblog/_components/widgets/widget-post-blog'

  export default {
    preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
      return Promise.all([
        store.dispatch('blog/POST_SHOW', {
          slug: currentRoute.params.slugPost,
          include: 'categories'
        }),
        store.dispatch('blog/POST_INDEX', {
          filter : {
            categorySlug : 'blog'
          },
          include: 'category'
        })
      ])
    },
    meta() {
      return {
        title: this.metaData.siteName,
        meta: {
          description: {name: 'description', content: this.metaData.summary},
          //Schema.org para Google+
          itemprop: {itemprop: "name", content: this.metaData.title},
          itemprop1: {itemprop: "description", content: this.metaData.summary},
          itemprop2: {itemprop: "image", content: this.metaData.image},
          //Open Graph para Facebook
          property: {property: "og:title", content: this.metaData.title},
          property1: {property: "og:type", content: "article"},
          property2: {property: "og:image", itemprop: "image", content: this.metaData.image},
          property3: {property: "og:image:secure_url", itemprop: "image", content: this.metaData.image},
          property4: {property: "og:url", content: this.metaData.url},
          property5: {property: "og:description", content: this.metaData.summary},
          property6: {property: "og:site_name", content: this.metaData.siteName},
          property7: {property: "og:locale", content: "es_ES"},
          //Twitter Card
          name: {name: "twitter:card", content: "summary_large_image"},
          name1: {name: "twitter:site", content: this.metaData.siteName},
          name2: {name: "twitter:title", content: this.metaData.title},
          name3: {name: "twitter:description", content: this.metaData.summary},
          name4: {name: "twitter:creator", content: ""},
          name5: {name: "twitter:image:,src", content: this.metaData.image},
        },
      }
    },
    components: {
      bannerComponent,
      commentComponent,
      postsComponent
    },
    watch: {},
    data() {
      return {
        post: this.$store.state.blog.post,
        innerLoading: false,
      }
    },
    mounted() {
      this.$nextTick(function () {})
    },
    computed: {
      /**
       * Order the meta data
       */
      metaData() {
        let data = this.$store.state.blog.post

        return {
          siteName: (data && data.title) ? data.title + ' | ' + env('TITLE') : 'not found',
          title: (data && data.title) ? data.title : 'not found',
          summary: (data && data.summary) ? data.summary : 'not found',
          image: (data && data.mainimage) ? data.mainimage : 'not found',
          url: data ? env('URL') + this.$route.path : 'not found'
        }
      },
    },
  }
</script>

<style lang="stylus">
  @import "~variables";
  #showIblog
    .post
      .title
        font-size 34px
        color $dark
        margin-top 0
        @media screen and (max-width : $breakpoint-md)
          font-size 24px
          text-align center
      .img
        height 400px
        width 100%
        position relative
        background-repeat no-repeat
        background-position center
        background-size cover
        span
          padding 5px
          position absolute
          top 0px
          left 20px
          line-height 1.5
          h4
            margin 0
      .autor
        padding 15px 0
        margin-bottom 25px
        border-top: 1px solid $grey-5
        border-bottom: 1px solid $grey-5
      .description
        margin 30px 0px
        p
          line-height 1.6
          text-align justify
    iframe
      width 100% !important
</style>

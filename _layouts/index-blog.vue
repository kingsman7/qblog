<template>
  <div id="indexBlog" class="relative-position">
    <!--= BANNER =-->
    <banner-component :dataBanner="{title: 'blog'}">
    </banner-component>

    <!-- Contend -->
    <div class="q-container">
      <div class="contentDescription gutter-md row q-py-lg"
           v-if="posts && posts.length">
        <div class="col-12 col-lg-4" :key="key"
             v-for="(post,key) in posts">
          <q-card inline style="width: 100%">
            <q-card-media>
              <router-link :to="'/blog/'+post.slug">
                <div class="img" :style="'background-image: url('+post.mainimage+')'"></div>
              </router-link>
            </q-card-media>
            <q-card-title>
              <router-link :to="'/blog/'+post.slug">
                <h1 class="text-primary q-headline">
                  {{post.title}}
                </h1>
              </router-link>
              <!--Tag Date-->
              <span class="bg-primary text-center text-uppercase text-white float-left p-2 mb-3 date">
                <h4>{{post.created_date.day}}</h4>
                {{post.created_date.mounth}}
              </span>
            </q-card-title>
            <q-card-main>
              <p class="text-faded q-mb-none">
                Por {{post.addedBy}}
              </p>
            </q-card-main>
            <q-card-separator/>
            <q-card-actions>
              <p class="q-px-md q-py-sm">
                {{post.summary}}
              </p>
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!--Not results-->
      <not-results v-if="!posts.length"></not-results>
    </div>
  </div>
</template>

<script>
  /*Component*/
  import bannerComponent from '@imagina/qblog/_components/widgets/widget-banner'
  import notResults from 'src/components/notResults'

  export default {
    preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
      return store.dispatch('blog/CATEGORY_SHOW', {slug: 'blog', include : 'posts'})
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
      notResults
    },
    watch: {},
    data() {
      return {
        posts: this.$store.state.blog.category.posts,
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
        let data = this.$store.state.blog.category

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
  #indexBlog
    .q-card
      .q-card-media
        .img
          background-size cover
          background-position center
          background-repeat no-repeat
          height 277px
          width 100%
      .q-card-title
        position relative
        h1
          line-height 1
          height 50px
          overflow hidden
          padding-left 65px
        span
          padding 5px
          position absolute
          top -16px
          left 0
          line-height 1.5
          h4
            margin 0
      .q-card-actions
        p
          line-height 1.4
          height 75px
          overflow hidden
</style>

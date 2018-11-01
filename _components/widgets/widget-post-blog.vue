<template>
  <div id="postBlogComponent" class="q-mt-xl">
    <h1 class="q-title text-center">
      POST RECIENTES
    </h1>

    <div class="full-width q-px-md">
      <q-list class="q-pa-none">
        <q-item separator :key="key" link :to="urlPost(post)"
                v-for="(post, key) in posts">
            <q-item-side :image="post.mainimage"/>
            <q-item-main :label="post.title"/>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
  import {alert} from '@imagina/qhelper/_plugins/alert'

  export default {
    props: {},
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {})
    },
    data() {
      return {
        posts: this.$store.state.blog.posts
      }
    },
    methods: {
      urlPost(post){
        return '/'+post.category.slug+'/'+post.slug
      }
    }

  }
</script>
<style lang="stylus">
  @import "~variables";
</style>

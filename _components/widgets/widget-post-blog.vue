<template>
  <div id="postBlogComponent" class="q-mt-xl">
    <div class="text-h6 text-center">
      POST RECIENTES
    </div>

    <div class="full-width q-px-md">
      <!--Not results-->
      <not-result v-if="!posts.length"/>
      <!--List-->
      <q-list class="q-pa-none" v-else bordered separator>
        <q-item :key="key" clickable v-for="(post, key) in posts"
                :to="{name: 'qblog.show', params : {category : post.category.slug, postSlug: post.slug}}">
          <q-item-section>
            <label>{{post.title}}</label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      categorySlug: {default: false}
    },
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.getData()
      })
    },
    data() {
      return {
        posts: []
      }
    },
    methods: {
      getData() {
        if (this.categorySlug) {
          this.loading = true
          let params = {
            refresh: true,
            params: {
              filter: {categorySlug: this.categorySlug},
              include: 'category'
            }
          }

          this.$crud.index('apiRoutes.qblog.posts', params).then(response => {
            this.posts = response.data
            this.loading = false
          }).catch(error => {
            console.error(error)
            this.loading = false
          })
        }
      }
    }

  }
</script>
<style lang="stylus">
</style>

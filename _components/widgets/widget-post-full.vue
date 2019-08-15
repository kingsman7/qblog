<template>
  <div v-if="post" class="col-12 q-py-md">
    <div class="q-container q-py-xl q-px-md">
      <div class="row items-center">
        <div class="col-12 col-md-6 text-center">
          <!--Title-->
          <h3 class="text-primary text-weight-light q-my-sm">
            <router-link :to="{name: 'qblog.show', params:{slugPost: post.slug }}"
                         class="text-primary">
              {{ post.title }}
            </router-link>
          </h3>
          <!--Menu-->
          <h6 class="text-weight-light menu-title q-my-none q-mb-md">
            <router-link :to="{name: 'products.index'}" class="text-primary">
              VER MENÚ
            </router-link>
          </h6>
        </div>
        <!--Description-->
        <p class="col-12 col-md-6 q-pa-none q-title" v-html="post.description" />
      </div>
    </div>
    <q-inner-loading :visible="loading">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </div>
</template>

<script>
  export default {
    name: "widget-post-full",
    props: {
      slug: {
        default: ''
      }
    },
    data() {
      return {
        post: false,
        loading: false
      }
    },
    mounted() {
      this.getPost()
    },
    watch: {
      slug() {
        this.getPost()
      }
    },
    methods: {
      getPost() {
        this.loading = true
        let params = {
          params: {filter: {field: 'slug',}}
        }

        this.$crud.show('apiRoutes.qblog.posts', this.slug, params).then(response => {
          this.loading = false
          this.post = response.data
        }).catch(error => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables"
  .menu-title a
    display inline-block
    padding 0 0 5px
    border-bottom 1px solid $primary
</style>

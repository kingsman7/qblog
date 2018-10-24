<template>
  <div id="masterIblog" class="relative-position">
    <!--= BANNER =-->
    <banner-component :dataBanner="dataIblog"
                      v-if="componentShow && componentShow != '404'">
    </banner-component>

    <!--INDEX-->
    <index-component :categories="dataIblog"
                     v-if="componentShow == 'index'">
    </index-component>

    <!--SHOW-->
    <show-component :dataPost="dataIblog"
                    v-if="componentShow == 'show'">
    </show-component>

    <!--404-->
    <not-found v-if="componentShow == '404'"></not-found>

    <!--Inner Loading-->
    <q-inner-loading :visible="innerLoading">
      <q-spinner-ball size="50px" color="primary"></q-spinner-ball>
    </q-inner-loading>
  </div>
</template>

<script>
  /*Component*/
  import bannerComponent from '@imagina/qblog/_components/widgets/widget-banner'
  import indexComponent from '@imagina/qblog/_components/index'
  import showComponent from '@imagina/qblog/_components/show'
  import notFound from 'src/components/404'

  /*Services*/
  import categoriesServices from '@imagina/qblog/_services/categories'
  import postsServices from '@imagina/qblog/_services/posts'

  export default {
    meta () {
      return {
        title: this.metaTitle
      }
    },
    props: {},
    components: {
      bannerComponent,
      indexComponent,
      showComponent,
      notFound
    },
    watch: {
      $route(to, from) {
        this.getData()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getData()
      })
    },
    data() {
      return {
        metaTitle:env('TITLE'),
        dataIblog: false,
        innerLoading: true,
        componentShow: false
      }
    },
    methods: {
      /**
       * Get Data
       */
      getData() {
        //Get parameters from URL
        let slugCategory = this.$route.params.slugCategory
        let slugPost = this.$route.params.slugPost

        this.innerLoading = true

        /* Request Data Post according parameter in URL*/
        if (slugPost) {
          let include = 'categories'
          this.metaTitle = slugPost.split('-').join(' ')+' | '+env('TITLE')

          postsServices.show(slugPost, include).then((response) => {
            this.dataIblog = response.data
            this.loadComponent()
          })
        } else {/* Request Data Category according parameter in URL*/
          let include = 'children,parent'
          this.metaTitle = slugCategory.split('-').join(' ')+' | '+env('TITLE')

          categoriesServices.show(slugCategory, include).then((response) => {
            this.dataIblog = response.data
            this.loadComponent()
          })
        }
      },

      /**
       * Select Component to show according to data
       */
      loadComponent(){
        let data = this.dataIblog

        // Condition for select component Index
        if(data.children && data.children.length){
          this.componentShow = 'index'
        }

        // Condition for select component Show
        if((data.children && !data.children.length) || !data.children){
          this.componentShow = 'show'
        }

        // Hidden all if data is false
        if(!data){
          this.componentShow = '404'
        }

        //Hidden inner loading
        this.innerLoading = false
      }

    }

  }
</script>

<style lang="stylus">
  @import "~variables";
</style>

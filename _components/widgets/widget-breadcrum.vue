<template>
  <div id="breadcrumComponent">
    <div class="content">
      <q-breadcrumbs
        active-color="primary"
        color="light"
      >
        <!-- Separator -->
        <q-icon name="fas fa-angle-right" slot="separator" slot-scope="props" />
        <!-- Route Home -->
        <q-breadcrumbs-el label="Inicio" to="/" icon="home" />
        <!-- Other Routes -->
        <q-breadcrumbs-el v-for="(r,index) in routes" :key="index"
                          :label="r.name" :to="'/'+r.to"  />
      </q-breadcrumbs>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      route: {default: false},
    },
    components: {},
    watch: {
      $route(to, from){
        if(this.route){
          this.orderRoutes()
        }else{
          this.getRouteMatched()
        }
      },
      route(data){
        this.orderRoutes()
      }
    },
    mounted() {
      this.$nextTick(function () {
        if(this.route){
          this.orderRoutes()
        }else{
          this.getRouteMatched()
        }
      })
    },
    data() {
      return {
        routes : []
      }
    },
    methods: {
      /*Order routes from route*/
      orderRoutes(){
        this.routes = []

        if(this.route){
          //Route for category
          if(this.route.parent != null){
            this.routes.push({
              name : this.route.parent.title,
              to : this.route.parent.slug
            })
          //Route for Post
          }else if(this.route.categories != null){
            this.routes.push({
              name : this.route.categories[0].title,
              to : this.route.categories[0].slug
            })
          }

          //Current Route
          this.routes.push({
            name : this.route.title,
            to : this.route.slug
          })
        }
      },

      /*Order routes from vue rooutes*/
      getRouteMatched(){
        this.routes = []
        let routes = this.$route.matched

        if(routes.length >= 3){
          for(var i = 1; i < routes.length; i++){
            this.routes.push({
              name : routes[i].name,
              to : routes[i].name
            })
          }
        }else{
          this.routes = [{
            name : routes[1].name,
            to: routes[1].name
          }]
        }
      }
    }

  }
</script>
<style lang="stylus">
  @import "~variables";
  #breadcrumComponent
    @media screen and (max-width : $breakpoint-md)
      overflow-x scroll
    .content
      text-transform capitalize !important
      font-size 13px
      width max-content
      display inline-block
      .q-link
        font-weight normal
        .q-icon
          font-size 17px
      .q-breadcrumbs-separator
        font-size 9px
      .q-breadcrumbs-last
        color $primary !important

</style>

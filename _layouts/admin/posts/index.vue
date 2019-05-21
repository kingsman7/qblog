<template>
  <div id="placesIndex"
       class="q-layout-page row justify-center layout-padding">
    
    <div class="text_title text-blue-9 col-12 q-title text-right">
      <span>Posts</span>
    
    </div>
    
    <div class="col-12">
      
      
      <q-table
        :loading="loading"
        :data="dataTable"
        :columns="columns"
        :pagination.sync="pagination"
        
        row-key="filename"
        color="primary"
        @request="getData"
      >
        
        <!--= Full Page =-->
        <template slot="top-right" slot-scope="props">
          <div class="row justify-end items-center full-width">
            <q-btn
              flat round dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
            />
            
            <q-btn color="primary"
                   icon="fas fa-sync"
                   @click="getData({pagination:pagination,search:filter.search},true)"
            ></q-btn>
          </div>
        </template>
        
        <template slot="top-left" slot-scope="props">
          <q-search
            hide-underline
            clearable
            color="secondary"
            v-model="filter.search"
          />
        
        </template>
        <!--= Actions =-->
        <q-td slot="body-cell-actions"
              slot-scope="props" :props="props">
          
          <q-btn icon="fas fa-pen" color="positive" round size="xs" class="q-mx-xs"
                 @click="showEditOrCreatePost(props.row)" v-if="$auth.hasAccess('iblog.posts.edit')"/>
          <q-btn icon="far fa-trash-alt" color="negative" size="xs" class="q-mx-xs" round
                 @click="dialogDeletePlace.handler(props.row.id)" v-if="$auth.hasAccess('iblog.posts.destroy')"/>
        </q-td>
      
      </q-table>
    </div>
    <q-modal v-model="modalPlace"
             v-if="postToEdit"
             id="sliderModalEdit"
             :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
            v-close-overlay
            @click="getData({pagination:pagination,search:filter.search},true)"
            icon="keyboard_arrow_left"
          />
          <q-toolbar-title v-if="!postToEdit.id">New Post</q-toolbar-title>
          <q-toolbar-title v-else>Update Post ID: {{postToEdit.id}}</q-toolbar-title>
        
        </q-toolbar>
        
        
        <div class="row gutter-sm layout-padding">
          <div class="col-12">
            <locales ref="localeComponent" v-model="locale" @validate="$v.$touch()"></locales>
         
          </div>
          
          
          <div class="col-12 col-md-8" v-if="locale.success">
            <q-field
              :error="$v.locale.formTemplate.title.$error"
              error-label="This field is required"
            >
              <q-input :float-label="'Title ('+locale.language+')'" type="text" v-model="locale.formTemplate.title"/>
            </q-field>
            <q-field>
              <q-input :float-label="'Slug ('+locale.language+')'" type="text" v-model="locale.formTemplate.slug"/>
            </q-field>
            
            <q-field
              :error="$v.locale.formTemplate.summary.$error"
              error-label="This field is required"
            >
              <q-input :float-label="'Summary ('+locale.language+')'" type="textarea"
                       v-model="locale.formTemplate.summary" rows="3"/>
            </q-field>
            
            <div class="q-caption q-my-sm text-grey">{{'Description ('+locale.language+')'}}</div>
            <q-field
              :error="$v.locale.formTemplate.description.$error"
              error-label="This field is required">
              <q-editor v-model="locale.formTemplate.description"/>
            </q-field>
  
            <!-- Status -->
            <q-chips-input v-model="locale.formTemplate.tags" float-label="'Tags" />
            
            <media-form
              entity="Modules\Iblog\Entities\Post"
              :entity-id="postToEdit.id ? postToEdit.id : ''"
              v-model="locale.formTemplate.mediasSingle"
              label="Main Image"
              zone="mainimage"
            />
  
            <media-form
              multiple
              entity="Modules\Iblog\Entities\Post"
              :entity-id="postToEdit.id ? postToEdit.id : ''"
              v-model="locale.formTemplate.mediasMulti"
              label="Gallery"
              zone="gallery"
            />
          </div>
          
          <div class="col-12 col-md-4" v-if="locale.success">
            
            <!--Category-->
            <div class="q-caption q-my-sm text-grey">Category</div>
            <treeselect
              :clearable="true"
              :append-to-body="true"
              :options="options.categories"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.categoryId"
              placeholder=""
            />
            <q-progress indeterminate color="primary" v-if="loadingCategories" />
            <!--Categories-->
            <div class="q-caption q-my-sm text-grey">Categories</div>
            <recursive-list v-model="locale.formTemplate.categories"
                            :items="options.categories"/>
  
  
            <q-field
        
            >
              <q-select
                v-model="locale.formTemplate.status"
              :options="[
              {label:'Published', value:2},
              {label:'Unpublished', value:3},
              {label:'Draft', value:0},
              {label:'Pending', value:1}]"/>
            </q-field>

          </div>
          
          <div class="col-12 text-center">
            <q-btn color="primary" label="Save" @click="updateOrCreatePost();"/>
          </div>
        
        </div>
      </q-modal-layout>
    </q-modal>
    
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$auth.hasAccess('iblog.posts.create')">
      <q-btn round color="positive" icon="add" @click="showEditOrCreatePost(false)"/>
    </q-page-sticky>
  </div>
</template>
<script>
  
  /*Plugins*/
  import {alert} from '@imagina/qhelper/_plugins/alert'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {required} from 'vuelidate/lib/validators'
  import { uid } from 'quasar'
  import _cloneDeep from 'lodash.clonedeep'


  /*Components*/
  import mediaForm from '@imagina/qmedia/_components/form'
  import locales from '@imagina/qsite/_components/locales'
  import recursiveList from 'src/components/master/recursiveListSelect'
  
  /*Services*/
  import blogService from '@imagina/qblog/_services/index'
  
  export default {
    props: {},
    components: {
      mediaForm,
      locales,
      Treeselect,
      recursiveList
    },
    
    validations() {
      return this.getObjectValidation()
    },
    
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.getData({pagination: this.pagination, search: this.filter.search});
      })
    },
    data() {
      return {
        mediaKey: uid(),
        modalPlace: false,
        loadingCategories: false,
        options: {
          categories: [],
        },
        locale: {
          fields: {
            id: '',
            translatableOptions: '',
            options: '',
            categoryId: null,
            categories:[],
            status: 2,
            userId: this.$store.state.auth.userId,
            mediasSingle: {},
            mediasMulti: {},
            tags:[]
            
          },
          fieldsTranslatable: {
            title: '',
            slug: '',
            description: '',
            test:'',
            summary: '',
            metaTitle: 'test',
            metaKeywords: '',
            metaDescription: '',
            
          },
          validations: {
            title: {required},
            description: {required},
            summary: {required}
          }
        },
        postToEdit: {},
        dataTable: [],
        pagination: {
          page: 1,
          rowsPerPage: 15,
          rowsNumber: 1
        },
        postToEdit: {},
        loading: false,
        filter: {
          search: ''
        },
        dialogDeletePlace: {
          handler: (id) => {
            this.$q.dialog({
              title: 'Confirm',
              ok: 'Delete',
              message: 'Are you sure to eliminate this Post?',
              cancel: 'Cancel'
            }).then(() => {
              this.deletePost(id)
            }).catch(() => {
            })
          }
        },
        columns: [
          {
            name: 'title', label: 'Title',
            field: 'title',
            align: 'center',
            sortable: true,
            style: 'width: 40%'
          },
          {
            name: 'createdAt', label: 'Created At', field: 'createdAt',
            format: val => val ? this.$d(this.$moment(val, 'YYYY-MM-DD HH:mm').toDate(), 'short', this.$q.i18n.lang) : '-',
            align: 'left', sortable: true
          },
          {
            name: 'actions', label: 'actions', align: 'center'
          },
        
        ],
      }
    },
    methods: {
      async getData({pagination, search}, refresh = false) {
        
        this.loading = true
        // clear storage cache
        if (refresh)
          this.$helper.clearCache('apiRoutes.blog.posts')
        
        let params = {
          params: {
            filter: {
              search: this.filter.search,
              allTranslations: true
            },
            include: 'categories',
            page: pagination.page,
            take: pagination.rowsPerPage,
          },
          refresh: refresh
        }
        
        // index all media by params
        blogService.crud.index('apiRoutes.blog.posts', params).then(response => {
          this.dataTable = response.data
          
          this.pagination.rowsPerPage = response.meta.page.perPage;
          this.pagination.page = response.meta.page.currentPage;
          this.pagination.rowsNumber = response.meta.page.lastPage;
          
          this.loading = false
        })
        
      },
      
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
      convertRelationsToFront(object,relation){
        let result = [];
  
        object[relation].forEach((category,index) => {
          result[index] = category.id
        })
        object[relation] = result
      },
      showEditOrCreatePost(post) {
        this.$v.$reset()//Reset validations
        this.getCategories()//Get categories

        if (post) {
          this.convertRelationsToFront(post,'categories')
          this.postToEdit = post
          this.locale.form = _cloneDeep(post)
        } else {
       
          this.locale.form = _cloneDeep(this.postToEdit = {
            title: '',
            slug: '',
            description: '',
            summary: '',
            metaTitle: '',
            metaKeywords: '',
            metaDescription: '',
            translatableOptions: '',
            options: '',
            categories: [],
            categoryId: null,
            status: 2,
            userId: this.$store.state.auth.userId,
            mediasSingle: {},
            mediasMulti: {},
            tags:[]
          })
        }
        this.mediaKey = uid()
        this.modalPlace = true
        
      },
      updateOrCreatePost() {
        this.loading = true;
        let data = _cloneDeep(this.locale.form)
        let configName = 'apiRoutes.blog.posts'

        this.$refs.localeComponent.vTouch();
        
        
        if (!this.$v.$error) {
          this.loading = true
          if (data.id) {
            blogService.crud.update(configName, data.id, data).then(response => {
              alert.success('Post updated', 'top')
              this.getData({pagination: this.pagination, search: this.filter.search}, true);
            }).catch(error => {
              alert.error('Post not updated', 'bottom', false, 2500)
              this.loading = false;
            })
          } else {
            blogService.crud.create(configName, data).then(response => {
              alert.success('Post created', 'top')
              this.getData({pagination: this.pagination, search: this.filter.search}, true);
            }).catch(error => {
              alert.error('Post not created', 'bottom', false, 2500)
              this.loading = false;
            })
          }
          this.modalPlace = false
        }else{
          alert.error("There some errors in form",'bottom',false,2500)
        }
        
      },
      
      deletePost(id){
        this.loading = true;
        let configName = 'apiRoutes.blog.posts'
        blogService.crud.delete(configName, id).then(response => {
          alert.success('Post deleted', 'top')
          this.getData({pagination: this.pagination, search: this.filter.search}, true);
        }).catch(error => {
          alert.error('Post not deleted', 'bottom', false, 2500)
          this.loading = false;
        })
      },
  
      //Get post categories
      getCategories() {
    
        this.loadingCategories = true
        let configName = 'apiRoutes.blog.categories'
        let params = {//Params to request
          refresh: true,
          params: {include: 'parent'},
        }
        //Request
        blogService.crud.index(configName, params).then(response => {
          this.options.categories = this.$helper.array.tree(response.data)
      
          if(response.data.length)
            this.locale.fields.categoryId = response.data[0].id
      
          this.loadingCategories = false
        }).catch(error => {
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.loadingCategories = false
        })
    
      },
      
    }
    
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qblog.posts',
          permission: 'iblog.posts',
          create: {
            title: this.$tr('qblog.layout.newPost'),
          },
          read: {
            columns: [
              {
                name: 'id', label: this.$tr('ui.form.id'),
                field: 'id',
                sortable: true,
              },
              {
                name: 'title', label: this.$tr('ui.form.title'),
                field: 'title',
                align: 'center',
                sortable: true,
              },
              {
                name: 'slug', label: this.$tr('ui.form.slug'),
                field: 'slug',
                align: 'center',
                sortable: true,
              },
              {
                name: 'category', label: this.$tr('ui.form.category'),
                align: 'center', field: 'category', sortable: true,
                format: val => ((val && val.title) ? val.title : '-')
              },
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt',
                format: val => val ? this.$trd(val) : '-',
                align: 'left', sortable: true
              },
              {
                name: 'actions', label: this.$tr('ui.form.actions'), align: 'center'
              },
            ],
            requestParams : {include : 'category'}
          },
          update: {
            title: this.$tr('qblog.layout.updatePost'),
            requestParams: {include: 'categories'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            title: {
              label: `${this.$tr('ui.form.title')}*`,
              value: '',
              type: 'text',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            slug: {
              label: `${this.$tr('ui.form.slug')}*`,
              value: '',
              type: 'text',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            summary: {
              label: `${this.$tr('ui.form.summary')}*`,
              value: '',
              type: 'text',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            description: {
              label: `${this.$tr('ui.form.description')}*`,
              value: '',
              type: 'html',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            metaTitle: {
              label: this.$tr('ui.form.metaTitle'),
              value: '',
              type: 'text',
              isTranslatable: true,
            },
            metaDescription: {
              label: this.$tr('ui.form.metaDescription'),
              value: '',
              type: 'textarea',
              isTranslatable: true,
            },
            mediasMulti: {
              label: this.$tr('ui.form.gallery'),
              value: {},
              type: 'media',
              zone: 'gallery',
              entity: "Modules\\Iblog\\Entities\\Post",
              enitityId: null
            },
          },
          formRight: {
            masterRecord : {
              label: this.$tr('ui.form.masterRecord'),
              value: 0,
              isFakeField : true,
              type: 'select',
              options: [
                {label: this.$tr('ui.label.yes'), id: 1},
                {label: this.$tr('ui.label.no'), id: 0},
              ]
            },
            userId: {
              label: `${this.$tr('ui.form.author')}*`,
              value: this.$store.state.quserAuth.userId,
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
                requestParams: {filter: {roleSlug : 'author'}}
              },
              create: {
                title: this.$tr('quser.layout.newUser'),
                component: import('@imagina/quser/_crud/users')
              },
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            categoryId: {
              label: `${this.$tr('ui.form.category')}*`,
              value: null,
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qblog.categories',
                select: {label: 'title', id: 'id'},
                requestParams: {include: 'parent'}
              },
              create: {
                title: this.$tr('qblog.layout.newCategory'),
                component: import('@imagina/qblog/_crud/categories')
              },
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            categories: {
              label: this.$trp('ui.form.category'),
              value: [],
              type: 'multiSelect',
              loadOptions: {
                apiRoute: 'apiRoutes.qblog.categories',
                select: {label: 'title', id: 'id'},
                requestParams: {include: ''}
              },
              create: {
                title: this.$tr('qblog.layout.newCategory'),
                component: import('@imagina/qblog/_crud/categories')
              }
            },
            status: {
              label: this.$tr('ui.form.status'),
              value: 2,
              type: 'select',
              options: [
                {label: this.$tr('ui.form.publish'), id: 2},
                {label: this.$tr('ui.form.noPublish'), id: 3},
                {label: this.$tr('ui.form.draft'), id: 0},
                {label: this.$tr('ui.form.pending'), id: 1}
              ]
            },
            tags: {
              label: this.$trp('ui.form.tag'),
              value: [],
              type: 'chips',
            },
            mediasSingle: {
              label: this.$tr('ui.form.image'),
              value: {},
              type: 'media',
              zone: 'mainimage',
              entity: "Modules\\Iblog\\Entities\\Post",
              enitityId: null
            }
          },
        }
      }
    },
  }
</script>

<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qblog.entityNames.post"),
        apiRoute: 'apiRoutes.qblog.posts',
        permission: 'iblog.posts',
        extraFormFields: 'iblog.crud-fields.posts',
        create: {
          title: this.$tr('iblog.cms.newPost'),
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'),
              field: 'id',
              sortable: true,
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
            },
            {
              name: 'slug', label: this.$tr('isite.cms.form.slug'),
              field: 'slug',
              align: 'left',
              sortable: true,
            },
            {
              name: 'category', label: this.$tr('isite.cms.form.category'),
              align: 'left', field: 'category', sortable: true,
              format: val => ((val && val.title) ? val.title : '-')
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ],
          requestParams: {include: 'category'},
          filters: {
            categories: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('isite.cms.label.category')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qblog.categories'
              }
            }
          }
        },
        update: {
          title: this.$tr('iblog.cms.updatePost'),
          requestParams: {include: 'categories'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          slug: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.slug')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          summary: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.summary')}*`,
              type: 'textarea',
              rows: "3",
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          description: {
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          metaTitle: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.metaTitle'),
            }
          },
          metaDescription: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.metaDescription'),
              type: 'textarea',
              rows: 2,
            }
          },
          mediasMulti: {
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.gallery'),
              zone: 'gallery',
              entity: "Modules\\Iblog\\Entities\\Post",
              entityId: null
            }
          },
        },
        formRight: {
          masterRecord: {
            value: '0',
            type: 'select',
            isFakeField: true,
            props: {
              label: this.$tr('isite.cms.form.masterRecord'),
              options: [
                {label: this.$tr('isite.cms.label.yes'), value: '1'},
                {label: this.$tr('isite.cms.label.no'), value: '0'},
              ]
            }
          },
          userId: {
            value: parseInt(this.$store.state.quserAuth.userId),
            type: 'crud',
            props: {
              type: 'select',
              crudData: import('@imagina/quser/_crud/users'),
              crudProps: {
                label: `${this.$tr('isite.cms.form.author')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
              config: {
                options: {label: 'fullName', value: 'id'},
                requestParams: {filter: {roleSlug: 'author'}}
              },
            },
          },
          categoryId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('@imagina/qblog/_crud/categories'),
              customData: {
                read: {
                  requestParams: {include: 'parent', filter: {status: 1}}
                }
              },
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
          },
          categories: {
            value: [],
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('@imagina/qblog/_crud/categories'),
              customData: {
                read: {
                  requestParams: {include: 'parent', filter: {status: 1}}
                }
              },
              crudProps: {
                label: this.$trp('isite.cms.form.category'),
                multiple: true,
                useChips: true
              },
            },
          },
          status: {
            value: '2',
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.status'),
              options: [
                {label: this.$tr('isite.cms.form.publish'), value: '2'},
                {label: this.$tr('isite.cms.form.noPublish'), value: '3'},
                {label: this.$tr('isite.cms.form.draft'), value: '0'},
                {label: this.$tr('isite.cms.form.pending'), value: '1'}
              ]
            },
          },

          sortOrder: {
            value: '0',
            type: 'input',
            props: {
              label: this.$tr('iblog.cms.form.sortOrder'),
              type: 'number'
            }
          },
          dateAvailable: {
            value: '',
            type: 'date',
            props: {
              label: this.$tr('iblog.cms.form.availableDate'),
            }
          },
          tags: {
            value: [],
            type: 'select',
            props: {
              label: this.$trp('isite.cms.form.tag'),
              useInput: true,
              useChips: true,
              multiple: true,
              hideDropdownIcon: true,
              inputDebounce: "0",
              newValueMode: "add-unique"
            }
          },
          featured: {
            value: '0',
            type: 'checkbox',
            props: {
              label: this.$tr('iblog.cms.form.featured'),
              trueValue: '1',
              falseValue: '0',
            }
          },
          mediasSingle: {
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.image'),
              zone: 'mainimage',
              entity: "Modules\\Iblog\\Entities\\Post",
              entityId: null
            }
          }
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>

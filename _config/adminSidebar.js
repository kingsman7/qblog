const pages = config('pages') // Get Pages from config

//Blog
export default [
  {
    title: 'iblog.cms.sidebar.adminGroup',
    icon: 'fab fa-blogger',
    children: [
      pages.qblog.posts, // posts setup
      pages.qblog.categories, // categories setup
      pages.qblog.postsInternal, // Post internal
    ]
  },
]

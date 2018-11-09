export const BLOG_SUCCESS = (state, data) => {
  data.dataIblog ? state.dataIblog = data.dataIblog.value : false;
  data.category ? state.category = data.category.value : false;
  data.categories ? state.categories = data.categories.value : false;
  data.post ? state.post = data.post.value : false;
  data.posts ? state.posts = data.posts.value : false;
  data.widgets ? state.widgets[data.widgets.key] = data.widgets.value : false;
};

export const BLOG_EMPTY = (state) => {
  state.dataIblog = null;
  state.category = null;
  state.categories = null;
  state.post = null;
  state.posts = null;
  data.widgets = null
};


// 生成分类索引页面
hexo.extend.generator.register('category-index', function(locals) {
  return {
    path: 'categories/index.html',
    data: locals.categories,
    layout: 'category-index'
  };
});

// 生成标签索引页面
hexo.extend.generator.register('tag-index', function(locals) {
  return {
    path: 'tags/index.html',
    data: locals.tags,
    layout: 'tag-index'
  };
});

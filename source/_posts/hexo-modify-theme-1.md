title: Hexo主题修改（一）
date: 2015-07-26 18:01:55
categories: Blog
tags:
- hexo
---

首先，使用的主题是[Noderce](https://github.com/willerce/hexo-theme-noderce)，作者是[willerce](http://willerce.com/)，感谢作者。

这个周末花了点时间来修改hexo的主题（其实很早之前就想自己修改了，但是一直拖着）。
其实修改主题主要就是弄清楚主题的布局文件在哪里修改就差不多了，剩下的就是调用函数，写逻辑，改样式的问题了。
不过中间还是有不少问题，作个记录。

<!--more-->

这个是主题文件夹的目录树
```
demo
├── _config.yml
├── languages
├── layout
└── source
```

主要看layout目录下的文件就行，上面是现在在用的主题，其中layout的一级目录下的文件都应该包含这些文件（其中categroies.ejs与tags.ejs是自己添加的，可以不用）
```
layout
├── archive.ejs  //文章归档，包括单个分类与单个标签，调用_partial/archive.ejs
├── categories.ejs  //显示所有分类的布局，非必须
├── category.ejs  //单个分类显示的布局，调用_partial/archive.ejs
├── index.ejs  //首页显示，调用_partial/article.ejs与_partial/pagination.ejs
├── layout.ejs  //整个网站布局，调用_partial下的各个模板
├── page.ejs  //layout为page的布局文件，例如categories，tags，调用_partial/article.ejs
├── _partial  //供布局文件调用，可以随便定制
├── post.ejs  //layout为post的布局文件，例如新发表的文章，调用_partial/article.ejs
├── tag.ejs  //单个标签显示的布局，调用_partial/archive.ejs
├── tags.ejs  //显示所有标签的布局，非必须
└── _widget  //显然是widget布局文件，目前没用过
```

---

###添加所有分类与所有标签页面
上面的categories.ejs与tags.ejs是自己添加，为了区分单个分类与所有分类而添加。这两个文件是用来显示/categories/与/tags/的，也就是自己新建的page（hexo new page categories/tags），调用的时候在source/categories/index.md（这里source与theme同级，不是主题下的source）里添加自定义layout，例如
```
title: 分类
date: 2015-03-28 20:05:42
type: "categories"
layout: "categories"  //添加自定义layout，tags也是一样的
```
这样，在链接到localhost:4000/categories/时就会自动调用layout/categories.ejs布局文件了。下面是完整的文件
categories.ejs
```
<% if (site.categories.length) { %>
	<div class="archive-title"><p><%= _p('categories_count', site.categories.length) %></p></div>
	<div class="archive-categories">
		<%- list_categories(site.categories) %>
	</div>
<% } %>
```
tags.ejs
```
<% if (site.tags.length) { %>
	<div class="archive-title"><p><%= _p('tags_count', site.tags.length) %></p></div>
	<div class="archive-tags">
		<%- tagcloud({min_font: 14, max_font: 28}) %>
	</div>
<% } %>
```
PS：原来已经有自带的函数了，亏我还花了不少时间去找这个：(
感谢这个主题的作者：[hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus/blob/master/layout/categories.ejs)

---

###添加单个分类与单个标签归档
对文章的归档作了一点点的修改，包括分类与标签，因为arhcive.ejs、category.ejs、tag.ejs都调用_partial/archive.ejs模板，所以只需修改模板文件就行，注意调用的时候添加自定义的参数，例如：`<%- partial('_partial/archive', {type: 'category'}) %>`，调用模板时传递type参数。完整的文件代码如下。
_partial/archive.ejs
```
<% if (type == 'archive') { %>
	<!-- 使用site.posts来获取所有文章 -->
	<div class="archive-title"><p><%= _p('archives_count', site.posts.length) %></p></div>
	<div class="archive">
		<!-- 获取当前年份，主要是用来把文章按照年份区分（这样写不知道逻辑有没有问题） -->
		<% year = new Date().getFullYear() %>
		<div class="year"><p><%= year %></p></div>
			<ul>
		<!-- 使用sort()来对获取的文章先进行排序 -->
		<% site.posts.sort('date', 'desc').each(function (item) { %>
			<% item_year = item.date.year() %>
			<!-- 对年份进行判断 -->
			<% if (item_year != year) { %>
				<% year = item_year %>
				</ul>
				</div>
				<div class="year"><p><%= year %></p></div>
					<ul>
			<% } else { %>
				<li>
					<time><%= item.date.format('MMM DD') %></time>
					<a href="<%= config.root %><%- item.path %>"><%= item.title %></a>
				</li>
			<% } %>
		<% }) %>
			</ul>
		</div>
	</div>
<% } else if (type == 'category') { %>
	<div class="archive-title"><p><%= page.category %></p></div>
	<div class="archive-category">
		<ul>
		<!-- 这里使用page.posts，因为应该是按照某一分类来获取文章，并不是获取所有分类 -->
		<% page.posts.sort('date', 'desc').each(function (item) { %>
			<li>
				<a href="<%= config.root %><%- item.path %>"><%= item.title %></a>
			</li>
		<% }) %>
		</ul>
	</div>
	<!-- 分页 -->
	<% if (page.total > 1) { %>
		<div class="archive-page">
			<%- paginator({prev_text: __('prev'), next_text: __('next')}) %>
		</div>
	<% } %>
<!-- 标签与分类类似 -->
<% } else if (type == 'tag') { %>
	<div class="archive-title"><p><%= page.tag %></p></div>
	<div class="archive-tag">
		<ul>
		<% page.posts.sort('date', 'desc').each(function (item) { %>
			<li>
				<a href="<%= config.root %><%- item.path %>"><%= item.title %></a>
			</li>
		<% }) %>
		</ul>
	</div>
	<% if (page.total > 1) { %>
		<div class="archive-page">
			<%- paginator({prev_text: __('prev'), next_text: __('next')}) %>
		</div>
	<% } %>
<% } else {} %>
```

---

目前修改的就这两点，不过文章归档还不是很满意，因为我想在文章归档里自定义每页显示文章数量，但是现在的显示数量是在_config.yml里的per_page: 10固定了，也就是说与首页显示的数目一样。不过，google找到了解决的方法：[首页分页和归档分页不同是如何做到的？](https://github.com/iissnan/hexo-theme-next/issues/30)，以后再找时间改改。

其实我想要的功能都有了，接下来要做的就是写一套好的css了：)
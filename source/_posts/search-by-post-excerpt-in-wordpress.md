title: WordPress搜索添加自定义字段
date: 2015-08-04 20:50:43
categories: PHP
tags:
- wordpress
---

昨天工作需要修改wordpress搜索功能，就是在搜索时把post_excerpt也添加到查询当中。
用的是wordpress自带pre_get_posts的api，添加到add_action就行，想要添加其他自定义字段也是类似的。

<!--more-->

把代码添加到functions.php中。
```
/* add excerpt search */
add_action('pre_get_posts', 'jc_woo_search_pre_get_posts');

function jc_woo_search_pre_get_posts($query){
 
    if ( is_search() ) {
        add_filter( 'posts_join', 'jc_search_post_join' ); // ingore this
        add_filter( 'posts_where', 'jc_search_post_excerpt' );
    }
}

function jc_search_post_excerpt($where = ''){
 
    global $wp_the_query;
    // get database prefix
    global $wpdb;
 
    // escape if not woocommerce search query
    if ( empty( $wp_the_query->query_vars['wc_query'] ) && empty( $wp_the_query->query_vars['s'] ) )
            return $where;
 
    $where = preg_replace("/post_title LIKE ('%[^%]+%')/", "post_title LIKE $1) OR (".$wpdb->prefix."posts.post_excerpt LIKE $1 ", $where);
 
    return $where;
}
/* end search */
```

中途容易出错的是where语句，可以先把where语句输出来，然后再输出修改后的where语句来进行对比，这样容易找出错误。
显然where语句是用来修改搜索查询时要用来进行对比的字段，类似的还有posts_join用法。

在查找解决方法中找到了另一个类似的插件，作个记录：[Search by Product Tag for Woocommerce](https://wordpress.org/support/view/plugin-reviews/search-by-product-tags-for-woocommerce)

参考链接
[How to Add custom fields to Woocommerce product search](http://jamescollings.co.uk/blog/extending-woocommerce-search-query-include-custom-fields/)

WordPress API
[pre_get_posts](https://codex.wordpress.org/Plugin_API/Action_Reference/pre_get_posts)
[posts_where](http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where)
[posts_join](http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_join)
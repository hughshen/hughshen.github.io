title: 使用usort函数对二维数组进行排序
date: 2015-09-01 21:13:13
categories: PHP
tags:
- sort
---

php提供了很多的排序函数，具体看这里：[Sorting Arrays](http://php.net/manual/en/array.sorting.php)。

看了一下，好像没有对二维数组以上进行排序的函数，但是有一个`usort()`函数，可以使用用户自定义的函数进行排序，这个函数可以满足需求。

<!--more-->

这是官方手册上的一个简单例子。
```
<?php
function cmp($a, $b) {
    if ($a == $b) return 0;
    return ($a < $b) ? -1 : 1;
}

$a = array(3, 2, 5, 6, 1);
usort($a, "cmp");
?>
```

对二维数组以上，只需要做一点点修改，手册也给出了例子。
```
<?php
// 对fruits数组按color进行排序
function cmp($a, $b) {
    if ($a["color"] == $b["color"]) return 0;
    return ($a["color"] > $b["color"]) ? 1 : -1;
}

$fruits[0]["fruit"] = "lemons";
$fruits[0]["color"] = "yellow";
$fruits[1]["fruit"] = "apples";
$fruits[1]["color"] = "red";
$fruits[2]["fruit"] = "grapes";
$fruits[2]["color"] = "purple";

usort($fruits, "cmp");
?>
```
usort函数还可以做更多复杂的排序，具体去看官方手册。

参考链接
[usort](http://php.net/manual/zh/function.usort.php)
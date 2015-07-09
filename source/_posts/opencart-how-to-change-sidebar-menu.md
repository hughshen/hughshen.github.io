title: OpenCart修改Sidebar菜单
date: 2015-07-09 21:22:04
categories: PHP
tags:
- opencart
---

今天有个需求是要修改sidebar的一些菜单，刚开始接触，连文件目录都还没搞懂：(
摸索了一下午加上“晓明”的指点，有点头绪了。

<!--more-->

比如我有个Account module，我要增加customer的一些个人信息，比如性别（sex），大概需要修改这几个文件：controller/account/edit.php，model/customer.php，language/account/edit.php，themeXXX/template/account/edit.tpl（edit内容展示页面），themeXXX/template/common/column_right.tpl（sidebar内容），其实文件都是跟modules相对应的，很好找。

---

首先看看sidebar里面的内容
```
<?php if ($modules) { ?>
<aside class="col-sm-3" id="column-right">
  <?php foreach ($modules as $module) { ?>
  <?php echo $module; ?>
  <?php } ?>
</aside>
<?php } ?>
```
这段代码是个什么鬼啊，哪里来的modules？？？
我觉得modules是根据url自动获取的，比如url里有个参数为?route=account/edit，modules就是指account模块，如果换成?route=product/product_name...，对应的modules就换成了product。

知道了account模块之后，然后找到controller/account/edit.php（因为我想改的是edit页面），查看里面的代码，注意控制命名为ControllerAccountEdit
```
//加载模块的语言包
$this->language->load('account/edit');
//调用对应的model方法，model_account_customer的类名称为ModelAccountCustomer
$this->model_account_customer->editCustomer($this->request->post);
//定义data数据并发传给tpl作页面展示
$this->data['entry_fax'] = $this->language->get('entry_fax');
if (isset($this->request->post['fax'])) {
	$this->data['fax'] = $this->request->post['fax'];
} elseif (isset($customer_info)) { //查看数据库是否已有记录
	$this->data['fax'] = $customer_info['fax'];
} else {
	$this->data['fax'] = '';
}
//添加自定义的sex字段，可以另外添加其他功能
$this->data['entry_sex'] = $this->language->get('entry_sex');
if (isset($this->request->post['sex'])) {
	$this->data['fax'] = $this->request->post['sex'];
} elseif (isset($customer_info)) { //这里会抛出一个错误，因为并不能查询到sex字段，需要自行添加
	$this->data['sex'] = $customer_info['sex'];
} else {
	$this->data['sex'] = '';
}
//sex不能为空，否则返回错误
if (($this->request->post['sex']) != 'man' || ($this->request->post['sex']) != 'women') {
	$this->error['sex'] = $this->language->get('error_sex');
}
```
controller添加完之后，就可以在tpl文件中使用了，当然，还需要修改language文件
找到language/account/edit.php添加自定义语言
```
$_['entry_sex'] = '性別';
$_['error_sex'] = '性别输入错误！';
```
然后再修改themeXXX/template/account/edit.tpl文件
```
//按照其他的写法，添加sex菜单
<div class="form-group">
	<label class="control-label col-sm-5" ><span class="required">*</span> <?php echo $entry_sex; ?></label>
	<div class="controls col-sm-7">
		<input type="text" name="sex" value="<?php echo $sex; ?>" />
		<?php if ($error_sex) { ?>
		<span class="error help-inline"><?php echo $error_sex; ?></span>
		<?php } ?>
	</div>
</div>
```
这样就可以在浏览器看到添加的sex输入框了。

---

不过还未完成，还需要修改model文件，使得添加的sex能够识别并返回数据给controller，而且需要在数据库中添加sex字段，model文件还没看，就先这样吧，今晚继续撸Yii去。
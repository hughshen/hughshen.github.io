title: 搭建Hexo博客，并部署到Github上
date: 2015-03-28 18:44:21
categories: Blog
tags:
- hexo
- github
- ubuntu
---

## 安装Hexo
输入命令
```bash
sudo apt-get install git
wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
nvm install 0.12 # 版本
npm install -g hexo-cli
```
<!--more-->

在安装 *nvm* 的时候，连接不成功，直接到 *github* [下载](https://github.com/creationix/nvm)，然后运行 *install.sh*

## 搭建本地博客
```bash
mkdir hexoblog
cd hexoblog
hexo init
npm install
hexo new "my-first-blog"
hexo g
hexo s
```
在浏览器输入 *localhost:4000* 就能看到新建的博客了 [具体](http://hexo.io/docs/)

## 部署到Github
在 *github* 新建一个仓库，仓库名称为 *账户名称.github.com*，必须是这个！！

然后在博客目录下建立仓库，可能需要配置 *git* 信息
```bash
cd hexoblog
git init
git config --global user.name "your name"
git config --global user.email "your email"
```
接下来编辑配置文件 *_config.yml*
```
deploy: 
  type: git
  repository: https://github.com/账户名称/账户名称.github.io.git
  branch: master
```
编辑保存之后就可以进行推送
```bash
hexo g 
hexo d
```
另外，在推送的时候 出现 *ERROR Deployer not found: github*，具体看[#1040](https://github.com/hexojs/hexo/issues/1040)

解决：把 *github* 改为 *git* 之后，还需要在终端运行 *npm install hexo-deployer-git --save*，还有注意配置文件里的空格！

---

**Hexo基本上就搭建好了，有空再深入了解**

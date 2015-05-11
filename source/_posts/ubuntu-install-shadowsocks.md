title: VPS中安装Shadowsocks
date: 2015-05-11 13:15:44
categories: 学习
tags:
- Ubuntu
- Shadowsocks
---

###服务端安装（Ubuntu1404），[具体](https://github.com/shadowsocks/shadowsocks )
```bash
ssh <username>@<ip_address> -p <port> #ssh登录vps
apt-get update
apt-get install python-pip
pip install shadowcocks
apt-get install python-m2crypto #支持更多的加密方式
```

<!--more-->

配置 */etc/shadowsocks/config.json* 手动创建该文件，具体可[参考](https://github.com/shadowsocks/shadowsocks/wiki/Configuration-via-Config-File)
```
{
    "server":"my_server_ip",
    "server_port":8388,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"mypassword",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```
运行
```bash
ssserver -c /etc/shadowsocks/config.json --user nobody -d start #后台运行
```
可以设置开机启动，编辑 */etc/rc.local*
```
/usr/local/bin/ssserver –c /etc/shadowsocks/config.json
```

###客户端安装（Ubuntu1404），项目[地址](https://github.com/librehat/shadowsocks-qt5)
```bash
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
```
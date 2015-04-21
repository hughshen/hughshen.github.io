title: Hadoop使用笔记
date: 2015-04-21 20:06:26
categories: 学习
tags:
- Hadoop
---

### name与data的clusterID不一样导致错误Incompatible clusterIDs
具体到 *name* 和 *data* 文件夹里把 *VERSION* 里面的 *clusterID* 修改为一致

<!--more-->

###java.net.ConnectException
需要先打开 *namenode* 
```
sbin/start-dfs.sh
sbin/start-yarn.sh
```

###[ls,put,get...]: No such file or directory
注意不要漏了反斜线，[具体](http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/SingleCluster.html#Execution)
```
bin/hdfs dfs -mkdir /user
bin/hdfs dfs -mkdir /user/<username>
bin/hdfs dfs -ls /
```

###Unable to load native-hadoop library for your platform
目前还未解决...



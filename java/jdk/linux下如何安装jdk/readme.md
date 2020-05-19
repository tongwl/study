# linux下安装JDK1.8教程

## 网上教程(亲测可用)

Linux 下安装JDK1.8网上参考教程.pdf (from https://www.cnblogs.com/fswhq/p/10713429.html)



## JDK下载地址

由于墙的原因，在官网下载可能很慢，可以到国内的一些站点下载，比如：

https://repo.huaweicloud.com/java/jdk/



## 简略步骤

1. 首先将下载好的jdk安装包(jdk-8u202-linux-x64.tar.gz) 拷贝到linux 系统

2. 例如将jdk安装包拷贝至 `/home/jdk`，首先解压该安装包

   ```
   $ cd  /home/jdk
   $ tar  -zxvf  jdk-8u202-linux-x64.tar.gz
   ```

3. 解压完成之后在当前目录能看到一个[jdk1.8.0_202]的目录，里面存放的就是jdk内容

4. 将[jdk1.8.0_202]拷贝至 `/usr/java`下

5. 修改环境变量: `vim /etc/profile`, 在profile的最后添加以下内容：

   ```
   export JAVA_HOME=/usr/java/jdk1.8.0_202
   export JRE_HOME=${JAVA_HOME}/jre
   export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
   export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
   export PATH=$PATH:${JAVA_PATH}
   ```

6. 让修改的环境变量生效：

   ```
   source /etc/profile
   ```

7. 测试jdk是否安装成功

   ```
   javac
   java -version
   ```

   

   

   

   


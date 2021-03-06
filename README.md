# ReactNative的组件及相关功能使用

#### 备注：代码只提交了js/img/php的部分，原ReactNative部分下边会从初始化开始按步骤加进来，相关环境搭建自己解决。

## 1. 涉及到的组件
获取设备信息、获取通讯录信息、上传图片、热更新[code-push]、AES数据加密、本地存储[AsyncStorage]、绘制手势曲线、下拉Select框选择、WebView加载H5, Fetch[async/await]拉取数据 等相关组件应应用

##  2. Screen shot for Android 部分如下：

<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/Y%5B(D%240T%601%7B%60BYJMT7%609%7B%24%7B9.png">  <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/X~22R%7BAF1BV%5BETI%25JX75ZAX.png">
<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/6%7DS%5B%60Y61W)QY%60P8XUL1VOWX.png">  <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/VVVN7ZP%5BM%7DR1WMST)%7D%40EN3R.png"><img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/%7BQ%40~BTV14%24%60PZN%7DTAIN%7BZS0.png">
<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/RMOTQRMF6BHUW_22U1%5BLQ~X.png">  <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/2QQXFF7%60C%7BBWMFQ~NCA_UBD.png">
<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/RMR5(2FY%25CU%7B3T%6081T(0RNU.png">
<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/XH%7DAFN~GAD0~WH14I_V2XUW.png">  <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/B%60%5DK3(%5DH8%7B8%60ZL%24893C%40P1S.png">
<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/16PFBR~BJKY9~LT82B6GWXN.png">  <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/%25P)K%5B%25KGPX%5BWA%5BM6RN(9TT8.png">
<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/~86LQURN3K2%40(WQ%6065BU_V0.png">  <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/Y5E_%5BHPS%7BGVD%40XRLQ(7II5C.png">
<img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/%7B78%40%407A1%40KZ%25UJ7Z%40HDY086.png">  <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/~3%40%40%7B49(Z9JZX6)%7B5%7B6BDGS.png">

## 3. 安装
1. **初始化一个ReactNative项目 并浏览效果**

```
$ react-native init TestMT05
$ cd TestMT05
$ pwd 
$ /var/www/react/test/TestMT05
$ react-native run-android
```
 执行完上边3步的效果如下：
 <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/H%40~3%5DD8FE_(PN~F5T4E1D~N.png">


2. **下载当前Git项目 并追加进第一步初始化的RN项目中**

```
$ git clone https://github.com/BoBoGithub/ReactNativeTest.git
$ cd ReactNativeTest
$ cp -r ./* /var/www/react/test/TestMT05
```

3. **安装关联组件**

```
$ cd /var/www/react/test/TestMT05
$ npm install react-navigation --save
$ npm install react-native-code-push --save
$ npm install react-native-device-info --save
$ npm install react-native-contacts --save
$ npm install react-native-modal-dropdown --save
$ npm install react-native-scrollable-tab-view --save
$ npm install react-native-gesture-password --save
$ npm install react-native-image-picker --save
$ npm install crypto-js --save

$ react-native link
```

4. **权限设置**
```
新增权限操作 修改文件：/var/www/react/test/TestMT05/android/app/src/main/AndroidManifest.xml
	<!-- 新增 通讯录操作 -->
	<uses-permission android:name="android.permission.READ_PROFILE" />
	<uses-permission android:name="android.permission.READ_CONTACTS" />
	<uses-permission android:name="android.permission.WRITE_CONTACTS" />
	
	<!-- 新增 照片操作 -->
	<uses-permission android:name="android.permission.CAMERA" />
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

5. **错误处理**
```
相关组件：react-native-gesture-password
解决办法：http://blog.sina.com.cn/s/blog_14ad54a500102xhkg.html
```
 <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/%24P0%7B5A6QPK(_D%40((%60UYQQWK.png">
	
6. **重新运行一下 就看到界面了**
```
$ react-native run-android
```

7. **后端接收数据处理**
```
$ 配置Nginx指向 /var/www/
$ 修改本地IP地址为：sudo ifconfig eth0 172.16.1.95
$ pwd
$ /var/www/react/test/ReactNativeTest
$ cp ./index.php /var/www/react/data/TestMT01/
$ 创建后端程序存放目录 mkdir /var/www/react/data/TestMT01/
$ 创建后端图片上传目录 mkdir /var/www/react/data/TestMT01/img
$ 然后刷新App登录/注册就能看到请求日志 tail -f /var/www/react/data/TestMT01/access.log
$ 备注：注册时的短信验证码 默认是：abc123   |   登录用户名/密码 默认是：user001/123456
```
 <img src="https://github.com/BoBoGithub/ReactNativeTest/blob/master/src/images/~3%40%40%7B49(Z9JZX6)%7B5%7B6BDGS.png">

#### 备注：目前只调试好了Android版的，IOS的需要XCode环境支持，本人机器不给力装不上，所以就没适配[I](http://www.xgsddl.com)OS的

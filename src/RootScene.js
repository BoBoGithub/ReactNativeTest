import React, {PureComponent} from 'react';
import {Image, View, Text} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import MineScene from './scene/Mine/MineScene';
import HomeScene from './scene/Home/HomeScene';

import FeedBackScene from './scene/FeedBack/FeedBackScene';
import AboutScene from './scene/About/AboutScene';
import ProductSene from './scene/Product/ProductSene';
import LoanAuthSene from './scene/Auth/LoanAuthSene';
import WebViewSene from './scene/WebView/WebViewSene';
import BaseAuthSene from './scene/Auth/BaseAuthSene';
import PhoneAuthSene from './scene/Auth/PhoneAuthSene';
import RePayLoanSene from './scene/User/RePayLoanSene';
import UserLoginSene from './scene/User/UserLoginSene';
import UserRegSene from './scene/User/UserRegSene';
import UserSettingSene from './scene/User/UserSettingSene';
import SafetySettingSene from './scene/User/SafetySettingSene';
import GestureSettingSene from './scene/User/GestureSettingSene';
import UserPhotoSettingSene from './scene/User/UserPhotoSettingSene';

import CodePush from 'react-native-code-push';

		

/**

	//打包方法：https://www.cnblogs.com/shaoting/p/7117454.html
	cd android $ ./gradlew assembleRelease

	//生成更新文件
	react-native bundle --platform android --entry-file index.js --bundle-output ./bundles/index.android.bundle --assets-dest ./bundles --dev false

	//上传推送更新
	code-push release TestMT02 ./bundles/ 1.0.0 --deploymentName Staging  --description "新增数据加解密操作" --mandatory false

	备注：关于更新提示请参考：https://github.com/Microsoft/react-native-code-push/blob/master/Examples/CodePushDemoApp/App.js

	//在虚拟机上安装apk方法
		cd进入/sdk/platform-tools，输入adb install XXX.apk,提示Success，就说明安装成功了
	
	第三方组件汇总: 
		http://www.jianshu.com/p/e3ee0ab1eb82
		http://blog.csdn.net/chichengjunma/article/details/52920137

*/

class RootScene extends PureComponent{

	sync() {
		 CodePush.sync();
	}

	syncImmediate() {
	       CodePush.sync(
	             { installMode: CodePush.InstallMode.IMMEDIATE,//启动模式三种：ON_NEXT_RESUME、ON_NEXT_RESTART、IMMEDIATE
	                updateDialog: {
	                        appendReleaseDescription:true,//是否显示更新description，默认为false
	                        descriptionPrefix:"更新内容：",//更新说明的前缀。 默认是” Description:
	                        mandatoryContinueButtonLabel:"立即更新",//强制更新的按钮文字，默认为continue
	                        mandatoryUpdateMessage:"",//- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
	                        optionalIgnoreButtonLabel: '稍后',//非强制更新时，取消按钮文字,默认是ignore
	                       optionalInstallButtonLabel: '后台更新',//非强制更新时，确认文字. Defaults to “Install”
	                      optionalUpdateMessage: '有新版本了，是否更新？',//非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.
	                      title: '更新提示'//要显示的更新通知的标题. Defaults to “Update available”.
	                  },
	            },
	        );
	}
		
	componentWillMount(){
    	CodePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
	}
 	componentDidMount(){
		CodePush.allowRestart();//在加载完了可以允许重启
	}
		
	render(){
		return (
			<Navigator />
		);
	}
}

	const Tab = TabNavigator(
		{
			Home: {
				screen: HomeScene,
				navigationOptions: ({navigation})=>({
					tabBarLabel: '借款',
					tabBarIcon: ({focused, tintColor})=>(
						<Image 
							source={focused
											? require('./img/tabbar/pfb_tabbar_homepage.png')
											: require('./img/tabbar/pfb_tabbar_homepage_selected.png')
										}
							style={{ tintColor: tintColor, width: 25, height: 25 }}
						/>
					)
				}),
			},
			Mine: {
				screen: MineScene,
				navigationOptions: ({navigation})=>({
					tabBarLabel: '我的',
					tabBarIcon: ({focused, tintColor})=>(
						<Image 
							source={focused
											? require('./img/tabbar/pfb_tabbar_mine_selected.png')
											: require('./img/tabbar/pfb_tabbar_mine.png')
										}
							style={{ tintColor: tintColor, width: 25, height: 25 }}
						/>
					)
				})
			},
			
		},
		{
			tabBarComponent: TabBarBottom,
			tabBarPosition: 'bottom',
			swipeEnabled: true,
			animationEnabled: true,
			lazy: true,
			tabBarOptions: {
				activeTintColor: '#06C1AE',
				inactiveTintColor: '#979797',
				style: { backgroundColor: '#ffffff' },
			},
		}
	);

	const Navigator = StackNavigator(
		{
			Tab: 			{screen: Tab},
			FeedBack: 		{screen: FeedBackScene},
			About: 			{screen: AboutScene},
			Product: 		{screen: ProductSene},
			LoanAuth: 		{screen: LoanAuthSene},
			BaseAuth: 		{screen: BaseAuthSene},
			PhoneAuth: 		{screen: PhoneAuthSene},			
			RePayLoan: 		{screen: RePayLoanSene},
			UserLogin: 		{screen: UserLoginSene},
			UserReg: 		{screen: UserRegSene},
			UserSeting:		{screen: UserSettingSene},
			SafetySetting: 	{screen: SafetySettingSene}, 
			GestureSetting: {screen: GestureSettingSene},
			UserPhotoSet: 	{screen: UserPhotoSettingSene},
			WebView: 		{screen: WebViewSene}
		},
		{
			navigationOptions : {
				headerBackTitle: null,
				headerTintColor: '#333333',
				showIcon: true,
			},
			headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏  
			//mode: 'modal',// card
		}
	);
	
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME};
RootScene = CodePush(codePushOptions)(RootScene);

export default RootScene;

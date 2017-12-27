import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, Alert} from 'react-native';

import store from '../Utils/DeviceStorage';

class UserLoginSene extends PureComponent{
	//Header设置
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, fontSize: 12, color: 'gray'}} onPress={()=>{
						navigation.navigate('UserReg')
					}}>注册</Text>
				</TouchableOpacity>
			</View>
		),
		headerLeft: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '用户登录',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	//初始化
	constructor(props){
		super(props);
	
		//检查是否已登录
		this.initUserInfo();
	}
	
	async initUserInfo(){
		try{
			let userInfoData = await store.get('userInfo');
			
			if(userInfoData != null && userInfoData.realName != ''){
				this.props.navigation.navigate('Mine')
			}
		}catch(error){
			console.error('DIY.Error: '+error);
		}
	}
	
	render(){
		let userName = '';
		let passWord  = '';
		
		return (
			<View style={{flex: 1, flexDirection:'column'}}>
				<View style={{padding: 30, alignSelf: 'center'}}>
					<Image style={{ marginLeft: 3 }} source={require('../../img/Home/icon_homepage_beautyCategory.png')} />
				</View>
				
				<View style={{backgroundColor: 'white'}}>
					<View style={{borderColor:'#e0e0e0', borderBottomWidth: 1, flexDirection: 'row'}}>
						<Text style={{padding: 20}}>登录用户：</Text>
						<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									padding: 13,
									textAlignVertical:'center',
								}}
								keyboardType="number-pad"
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入登录用户/手机号码"
								clearButtonMode='always'
								onChangeText={(text) => {
									userName = text
								}}
							/>
					</View>
					<View style={{borderColor:'#e0e0e0', borderBottomWidth: 1, flexDirection: 'row'}}>
						<Text style={{padding: 20}}>登录密码：</Text>
						<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									padding: 13,
									textAlignVertical:'center',
								}}
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入登录密码"
								password={true}
								secureTextEntry={true}
								clearButtonMode='always'
								onChangeText={(text) => {
									passWord = text
								}}
							/>						
					</View>
				</View>
				
				<View style={{padding: 20, alignSelf: 'flex-end'}}>
					<TouchableOpacity onPress={() => {
						this.props.navigation.navigate('WebView', {WebUrl: 'http://wap.10010.com/t/businessTransact/resetPwd/view.htm?menuId=000100010005&mobile_c_from=bianminfuwu&navUrlCode=1173', WebTitle: '找回服务密码'})
					}}>
						<Text style={{color: 'gray'}}>忘记密码?</Text>
					</TouchableOpacity>
				</View>
				
				<View style={{
					borderColor: 'black',
					borderWidth: 1,
					borderRadius: 50,
					backgroundColor: 'black',
					padding: 1
				}}>
					<View style={{}}>
						<TouchableOpacity onPress={() => {
							if(userName == ''){
								Alert.alert('请输入登录用户名');
								return ;
							}
							if(passWord == ''){
								Alert.alert('请输入登录密码');
								return ;
							}
							
							var formData = new FormData();
							formData.append('UserName', userName);  
							formData.append('PassWord', passWord);  
							formData.append('act', 'userLogin');  

							//请求登录
							fetch('http://172.16.1.95/react/data/TestMT01/index.php', {
								method: 'POST',
								mode: 'no-cors',
								cache: 'no-cache',
								body: formData,
							}).then((response)=>response.json()).then((ret)=>{
								if(ret.errno == 0){
									//记录登录信息
									store.save('userInfo', {'userName': userName, 'realName': ret.data.realName});
									
									//跳转
									this.props.navigation.navigate('Mine')
								}else{
									Alert.alert('ERROR: '+ret.errmsg);
								}
							});
						}}>
							<Text style={{color: 'white', alignSelf: 'center', padding: 20, fontSize: 20}}>登录</Text>						
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default UserLoginSene;
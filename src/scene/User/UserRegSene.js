import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, Alert} from 'react-native';

import store from '../Utils/DeviceStorage';

class UserRegSene extends PureComponent{
	//Header设置
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, fontSize: 12, color: 'gray'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '新用户注册',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	constructor(props){
		super(props);
		
		this.state = {
			userName: '',
			passWord: '',
			mobileCode: '',
			userInfo: {},
			timerCount: this.props.timerCount || 10,
			timerTitle: this.props.timerTitle || '获取验证码',
			selfEnable: false,
		};
		
		// this.timeCounts = this.timeCounts.bind(this);
		// this.timeCount = this.timeCount.bind(this);
	}
	
	componentDidMount(){
		//获取用户信息
		this.initUserInfo();
	}
	
	componentWillUnmount(){
		clearInterval(this.interval);
	}
	
	async initUserInfo(){
		try{
			var data = await store.get('userInfo');
			if(data != null){
				this.props.navigation.navigate('Mine');
			}
		}catch(error){
			console.error("ERROR: "+error);
		}
	}
	
	timeCounts(){
		const codeTime = this.state.timerCount;
		
		this.interval = setInterval(()=>{
			const timer = this.state.timerCount - 1;
			if(timer == 0){
				this.interval && clearInterval(this.interval);
				this.setState({
					timerCount: codeTime,
					timerTitle: this.props.timerTitle || '获取验证码',
					selfEnable: false
				});
			}else{
				this.setState({
					timerCount:timer,
					timerTitle: `重新获取(${timer}s)`,
				});
			}
		}, 1000);
	}
	
	timeCount(){
		if(this.state.selfEnable){
			return ;
		}
		
		this.timeCounts();
		this.setState({
			selfEnable: true
		});
		
		//发送短信
		this.sendMobile();
	}
	
	sendMobile(){
		var formData = new FormData();
		formData.append('UserName', this.state.userName);  
		formData.append('act', 'sendMobile'); 
	
		fetch('http://172.16.1.95/react/data/TestMT01/index.php', {
			method: 'POST',
			mode: 'no-cors',
			cache: 'no-cache',
			body: formData,
		}).then((response)=>response.json()).then((ret)=>{
			if(ret.errno == 0){
				//发送成功
				
			}else{
				Alert.alert('DIY.Error: '+ret.errmsg);
			}
		}).catch((error)=>{
			Alert.alert('DIR.Error: '+ error);
		});
	}
	
	render(){
		let selfEnable = this.state.selfEnable;

		return (
			<View style={{flex: 1, flexDirection:'column'}}>
				<View style={{padding: 26, alignSelf: 'center'}}>
					<Image style={{ marginLeft: 3 }} source={require('../../img/Home/icon_homepage_foottreatCategory.png')} />
				</View>
				
				<View style={{backgroundColor: 'white'}}>
					<View style={{borderColor:'#e0e0e0', borderBottomWidth: 1, flexDirection: 'row'}}>
						<Text style={{padding: 20}}>注册手机：</Text>
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
								placeholder="请输入注册手机号码"
								clearButtonMode='always'
								onChangeText={(text) => {
									this.state.userName = text
								}}
							/>
					</View>
					
					<View style={{borderColor:'#e0e0e0', borderBottomWidth: 1, flexDirection: 'row'}}>
						<Text style={{padding: 20}}>注册密码：</Text>
						<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									padding: 13,
									textAlignVertical:'center',
								}}
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入6~20位密码"
								password={true}
								secureTextEntry={true}
								clearButtonMode='always'
								onChangeText={(text) => {
									this.state.passWord = text
								}}
							/>						
					</View>
					
					<View style={{borderColor:'#e0e0e0', borderBottomWidth: 1, flexDirection: 'row'}}>
							<Text style={{padding: 20}}>验证短信：</Text>
							<TextInput
									style={{
										flex: 1,
										fontSize: 14,
										padding: 13,
										textAlignVertical:'center',
									}}
									placeholderTextColor='#aaaaaa'
									underlineColorAndroid='transparent'
									placeholder="请输入短信验证码"
									clearButtonMode='always'
									onChangeText={(text) => {
										this.state.mobileCode = text
									}}
								/>
							
								<TouchableOpacity activeOpacity={selfEnable ? 1 : 0.6} onPress={() => {
									this.timeCount();
								}}>
									<View style={{padding: 12}}>
										<Text style={{alignSelf: 'center', padding: 5}}>{this.state.timerTitle}</Text>
									</View>
								</TouchableOpacity>
						</View>
				
				</View>
				
				<View style={{padding: 18, flexDirection: 'row'}}>
					<Text>注册代表您同意 </Text>
					<TouchableOpacity onPress={()=>{
						this.props.navigation.navigate('WebView', {WebUrl: 'https://m.baidu.com?f=rnar', WebTitle: '米缸金融用户注册协议'})
					}}>
						<Text style={{color:'blue'}}>《米缸金融用户注册协议》</Text>
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
							if(this.state.userName == ''){
								Alert.alert('请输入注册手机号码');
								return ;
							}
							if(this.state.passWord == ''){
								Alert.alert('请输入6~20位密码');
								return ;
							}
							if(this.state.mobileCode == ''){
								Alert.alert('请输入短信验证码');
								return ;
							}
							
							var formData = new FormData();
							formData.append('UserName', this.state.userName);  
							formData.append('PassWord', this.state.passWord);  
							formData.append('MobileCode', this.state.mobileCode);  
							formData.append('act', 'userReg');  

							//请求注册
							fetch('http://172.16.1.95/react/data/TestMT01/index.php', {
								method: 'POST',
								mode: 'no-cors',
								cache: 'no-cache',
								body: formData,
							}).then((response)=>response.json()).then((ret)=>{
								if(ret.errno == 0){
									store.save('userInfo', {'userName': this.state.userName, 'realName': ret.data.realName});

									this.props.navigation.navigate('Mine')
								}else{
									Alert.alert('ERROR: '+ret.errmsg);
								}
							});
						}}>
							<Text style={{color: 'white', alignSelf: 'center', padding: 15, fontSize: 17}}>注册</Text>						
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default UserRegSene;
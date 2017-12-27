import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, Keyboard} from 'react-native';

class PhoneAuthSene extends PureComponent{
	
	state: {
		pwd: string
	}
	
	constructor(props: Object){
		super(props);
		
		this.state = {
			pwd: ''
		};
	}
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '手机认证',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	render(){
		return (
			<View style={{flex: 1}}>
				<View style={{}}>
					<View style={{padding:10}} />
				
					<View style={{
						height: 120,
						flexDirection: 'column',
						paddingLeft: 15,
						paddingRight: 10,
						backgroundColor:'white'
					}}>
						<TouchableOpacity onPress={()=>{
							
						}}>
							<View style={{flexDirection:'row', alignItems: 'center', borderColor:'#e0e0e0', borderBottomWidth: 1}}>
								<Text style={{padding: 20}}>手机号：</Text>
								<Text style={{color:'#999999'}}>15613187762</Text>
							</View>
						</TouchableOpacity>
						
						<View style={{flexDirection:'row', alignItems: 'center'}}>
							<Text style={{padding: 20}}>服务码：</Text>
							<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									paddingTop: 18,
									textAlignVertical:'top',
								}}
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入服务码"
								onChangeText={(text) => {
									this.state.pwd = text
								}}
						/>
							<View style={{ flex: 1, backgroundColor: 'blue' }} />
							<TouchableOpacity onPress={()=>{
								this.props.navigation.navigate('WebView', {WebUrl: 'http://wap.10010.com/t/businessTransact/resetPwd/view.htm?menuId=000100010005&mobile_c_from=bianminfuwu&navUrlCode=1173', WebTitle: '找回服务密码'})
							}}>
								<Text style={{color:'#999999'}}>忘记密码?</Text>
							</TouchableOpacity>
						</View>
						
					</View>
				</View>
				
				<View style={{padding:1}} />
				
				<View style={{padding: 18, flexDirection: 'row'}}>
					<Text>授权代表您同意 </Text>
					<TouchableOpacity onPress={()=>{
						this.props.navigation.navigate('WebView', {WebUrl: 'https://m.baidu.com?f=rnar', WebTitle: '信息收集及使用规则'})
					}}>
						<Text style={{color:'blue'}}>《信息收集及使用规则》</Text>
					</TouchableOpacity>
				</View>
				
				<View style={{padding:10}} />
					
				<View style={{
					paddingLeft: 15,
					paddingRight: 10,
				}}>
					<TouchableOpacity onPress={() => {
							Keyboard.dismiss();
							if(this.state.pwd == ''){
								Alert.alert('请输入服务码!');
								return ;
							}
							Alert.alert('请求验证中...');
					}}>
						<Text style={{
								paddingTop: 10,
								paddingBottom: 10,
								paddingLeft: 120,
								paddingRight: 120,
								borderColor: 'red',
								borderWidth: 1,
								borderRadius: 5,
								alignSelf: 'center',
								backgroundColor: 'red',
								color: 'white',
								fontSize: 18
							}}
						>下一步</Text>
					</TouchableOpacity>
				</View>
				
			</View>
		);
	}
}

export default PhoneAuthSene;
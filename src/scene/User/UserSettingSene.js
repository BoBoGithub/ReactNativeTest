import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';

import store from '../Utils/DeviceStorage';

class UserSettingSene extends PureComponent{
	
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
		title: '设置',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	//退出登录
	loginout(){
		store.delete('userInfo');
		
		//跳转首页
		this.props.navigation.navigate('Home');
	}
	
	render(){
		return (
			<View style={{flex: 1, flexDirection:'column'}}>
				<View style={{padding: 6}} />
				
				<TouchableOpacity onPress={()=>{
					this.props.navigation.navigate('SafetySetting')
				}}>
					<View style={{
						height: 44,
						flexDirection: 'row',
						alignItems: 'center',
						paddingLeft: 15,
						paddingRight: 10,
						backgroundColor: 'white',
					}}>
							<Text style={{padding: 17,}}>安全设置</Text>
							<View style={{ flex: 1, backgroundColor: 'blue' }} />
							<Image style={{
								width: 14,
								height: 14,
								marginLeft: 5,
							}} source={require('../../img/Public/cell_arrow.png')} />						
					</View>
				</TouchableOpacity>
				
				<View style={{padding: 6}} />
				
				<TouchableOpacity onPress={()=>{
					this.props.navigation.navigate('UserPhotoSet')
				}}>
					<View style={{
						height: 44,
						flexDirection: 'row',
						alignItems: 'center',
						paddingLeft: 15,
						paddingRight: 10,
						backgroundColor: 'white',
					}}>
							<Text style={{padding: 17,}}>头像设置</Text>
							<View style={{ flex: 1, backgroundColor: 'blue' }} />
							<Image style={{
								width: 14,
								height: 14,
								marginLeft: 5,
							}} source={require('../../img/Public/cell_arrow.png')} />						
					</View>
				</TouchableOpacity>
				
				<View style={{padding:20}} />
				
				<TouchableOpacity onPress={()=>{
					this.loginout();
				}}>
					<View style={{backgroundColor: 'white'}}>
							<Text style={{padding: 13, alignSelf: 'center'}}>退出登录</Text>				
					</View>
				</TouchableOpacity>
				
			</View>
		);
	}
}

export default UserSettingSene;
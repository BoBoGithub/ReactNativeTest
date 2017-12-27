import React, {PureComponent} from 'react';
import {View, Text, Alert, TouchableOpacity, TextInput, Image} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

class RelationInfo extends PureComponent{
	
	render(){
		return (
			<View style={{padding: 10}}>
				<Text>以下均为必填项</Text>
				<View style={{padding:5}} />

				<View style={{
					height: 155,
					flexDirection: 'column',
					paddingLeft: 15,
					paddingRight: 10,
					backgroundColor:'white'
				}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>联系人关系：</Text>
						<ModalDropdown 
							defaultValue="　请选择联系人关系" 
							style={{flex: 1, paddingTop: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}
							textStyle={{fontSize: 14}}
							options={['　请选择联系人关系', '　父母', '　兄弟', '　姐妹', '　朋友', '　同事']}
							dropdownStyle={{padding: 10}}
							onSelect={(index, value)=>{
								
							}}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>联系人姓名：</Text>
						<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									padding: 13,
									textAlignVertical:'top',
									borderBottomWidth: 1,
									borderColor:'#e0e0e0'
								}}
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入联系人姓名"
								onChangeText={(text) => {
									
								}}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
						<Text style={{padding: 13}}>联系人电话：</Text>
						<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									padding: 13,
									textAlignVertical:'top',
									borderBottomWidth: 1,
									borderColor:'#e0e0e0'
								}}
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入联系人电话"
								onChangeText={(text) => {
									
								}}
							/>
							<View style={{flex: 1}} />
							<TouchableOpacity onPress={() => {
								Alert.alert('只在真机中才能获取通讯录...');
							}}>
								<Image style={{width: 14, height: 14, marginRight: 5}} source={require('../../img/Mine/beauty_technician_v15.png')} />
							</TouchableOpacity>
					</View>
				</View>
				
				<View style={{padding: 20}}></View>
				
				<View style={{
					height: 155,
					flexDirection: 'column',
					paddingLeft: 15,
					paddingRight: 10,
					backgroundColor:'white'
				}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>联系人关系：</Text>
						<ModalDropdown 
							defaultValue="　请选择联系人关系" 
							style={{flex: 1, paddingTop: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}
							textStyle={{fontSize: 14}}
							options={['　请选择联系人关系', '　父母', '　兄弟', '　姐妹', '　朋友', '　同事']}
							dropdownStyle={{padding: 10}}
							onSelect={(index, value)=>{
								
							}}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>联系人姓名：</Text>
						<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									padding: 13,
									textAlignVertical:'top',
									borderBottomWidth: 1,
									borderColor:'#e0e0e0'
								}}
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入联系人姓名"
								onChangeText={(text) => {
									
								}}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
						<Text style={{padding: 13}}>联系人电话：</Text>
						<TextInput
								style={{
									flex: 1,
									fontSize: 14,
									padding: 13,
									textAlignVertical:'top',
									borderBottomWidth: 1,
									borderColor:'#e0e0e0'
								}}
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								placeholder="请输入联系人电话"
								onChangeText={(text) => {
									
								}}
							/>
							<View style={{flex: 1}} />
							<TouchableOpacity onPress={() => {
								Alert.alert('只在真机中才能获取通讯录...');
							}}>
								<Image style={{width: 14, height: 14, marginRight: 5}} source={require('../../img/Mine/beauty_technician_v15.png')} />
							</TouchableOpacity>
					</View>
				</View>
				
				<View style={{padding:10}} />

				<View style={{
					paddingLeft: 15,
					paddingRight: 10,
				}}>
				<TouchableOpacity onPress={() => {
					Alert.alert('发送请求服务中...');
					
					//this.props.navigation.navigate('LoanAuth')
				}}>
					<Text style={{
							paddingTop: 10,
							paddingBottom: 10,
							paddingLeft: 90,
							paddingRight: 90,
							borderColor: 'red',
							borderWidth: 1,
							borderRadius: 5,
							alignSelf: 'center',
							backgroundColor: 'red',
							color: 'white',
						}}
					>保存</Text>
					</TouchableOpacity>
				</View>
				
			</View>
		);
	}
}

export default RelationInfo;
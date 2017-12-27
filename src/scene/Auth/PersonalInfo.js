import React, {PureComponent} from 'react';
import {View, Text, Alert, TouchableOpacity, TextInput} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

class PersonalInfo extends PureComponent{
	
	render(){
		return (
			<View style={{padding: 10}}>
				<Text>以下均为必填项</Text>
				<View style={{padding:5}} />

				<View style={{
					height: 335,
					flexDirection: 'column',
					paddingLeft: 15,
					paddingRight: 10,
					backgroundColor:'white'
				}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>学历：</Text>
						<ModalDropdown 
							defaultValue="请选择学历" 
							style={{flex: 1, paddingTop: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}} 
							textStyle={{fontSize: 14}}
							options={['请选择学历', '初中及以下', '高中或中专', '专科', '本科', '研究生及以上']}
							dropdownStyle={{padding: 10}}
							onSelect={(index, value)=>{
								
							}}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>婚姻：</Text>
						<ModalDropdown
							defaultValue="请选婚姻状况"
							style={{flex: 1, paddingTop: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}
							textStyle={{fontSize: 14}}
							options={['请选婚姻状况', '未婚','已婚','离异']}
							dropdownStyle={{padding: 10}}
							onSelect={(index, value)=>{
								
							}}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>子女：</Text>
						<ModalDropdown
								defaultValue="请选子女人数"
								style={{flex: 1, paddingTop: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}
								textStyle={{fontSize: 14}}
								options={['请选子女人数', '0个','1个','2个']}
								dropdownStyle={{padding: 10}}
								onSelect={(index, value)=>{
									
								}}
							/>
					</View>
					<TouchableOpacity onPress={() => {
							Alert.alert('联动数据多，考虑其它方案中...');
					}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>居住省市：</Text>
					</TouchableOpacity>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>居住地址：</Text>
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
								placeholder="请输入居住地址"
								onChangeText={(text) => {
									
								}}
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}>居住时长：</Text>
						<ModalDropdown
								defaultValue="　请选居住时长"
								style={{flex: 1, paddingTop: 13, borderColor:'#e0e0e0', borderBottomWidth: 1}}
								textStyle={{fontSize: 14}}
								options={['　请选居住时长', '　1年以下', '　1~3年', '　3~5年', '　5年以上']}
								dropdownStyle={{padding: 10}}
								onSelect={(index, value)=>{
									
								}}
							/>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Text style={{padding: 13}}>个人微信：</Text>
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
								placeholder="请输入个人微信"
								onChangeText={(text) => {
									
								}}
						/>
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

export default PersonalInfo;
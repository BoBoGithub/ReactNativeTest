import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';

class SafetySettingSene extends PureComponent {
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
		title: '安全设置',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	render(){
		return (
			<View style={{flex: 1, flexDirection:'column'}}>
				<View style={{padding: 6}} />
				
				<TouchableOpacity onPress={()=>{
					this.props.navigation.navigate('GestureSetting')
				}}>
					<View style={{
						height: 44,
						flexDirection: 'row',
						alignItems: 'center',
						paddingLeft: 15,
						paddingRight: 10,
						backgroundColor: 'white',
					}}>
							<Text style={{padding: 17,}}>手势设置</Text>
							<View style={{ flex: 1, backgroundColor: 'blue' }} />
							<Image style={{
								width: 14,
								height: 14,
								marginLeft: 5,
							}} source={require('../../img/Public/cell_arrow.png')} />						
					</View>
				</TouchableOpacity>
				
				<View style={{padding:10}} />
				
				<TouchableOpacity onPress={()=>{
					Alert.alert('开发中...')
				}}>
					<View style={{
						height: 44,
						flexDirection: 'row',
						alignItems: 'center',
						paddingLeft: 15,
						paddingRight: 10,
						backgroundColor: 'white',
					}}>
							<Text style={{padding: 17,}}>指纹设置</Text>
							<View style={{ flex: 1, backgroundColor: 'blue' }} />
							<Image style={{
								width: 14,
								height: 14,
								marginLeft: 5,
							}} source={require('../../img/Public/cell_arrow.png')} />						
					</View>
				</TouchableOpacity>
				
			</View>
		);
	}
}

export default SafetySettingSene;
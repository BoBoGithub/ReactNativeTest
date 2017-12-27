import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

class LoanAuthSene extends PureComponent{
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '借款认证',
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
							this.props.navigation.navigate('BaseAuth')
						}}>
							<View style={{flexDirection:'row', alignItems: 'center', borderColor:'#e0e0e0', borderBottomWidth: 1}}>
								<Text style={{padding: 20}}>个人信息</Text>
								<View style={{ flex: 1, backgroundColor: 'blue' }} />
								<Text style={{color:'#999999'}}>未填写</Text>
								<Image style={{width: 14,height: 14, marginLeft: 5}} source={require('../../img/Public/cell_arrow.png')} />
							</View>
						</TouchableOpacity>
						
						<TouchableOpacity onPress={()=>{
							this.props.navigation.navigate('PhoneAuth')
						}}>
							<View style={{flexDirection:'row', alignItems: 'center'}}>
								<Text style={{padding: 20}}>手机认证</Text>
								<View style={{ flex: 1, backgroundColor: 'blue' }} />
								<Text style={{color:'#999999'}}>未授权</Text>
								<Image style={{width: 14,height: 14, marginLeft: 5}} source={require('../../img/Public/cell_arrow.png')} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				
				<View style={{padding:1}} />
				
				<View style={{padding: 18, flexDirection: 'row'}}>
					<Text>完成认证代表您同意 </Text>
					<TouchableOpacity onPress={()=>{
						this.props.navigation.navigate('WebView', {WebUrl: 'https://m.baidu.com?f=rnar', WebTitle: '个人征信查询授权委托书'})
					}}>
						<Text style={{color:'blue'}}>《个人征信查询授权委托书》</Text>
					</TouchableOpacity>
				</View>
				
				<View style={{padding:10}} />
					
				<View style={{
					paddingLeft: 15,
					paddingRight: 10,
				}}>
					<TouchableOpacity onPress={() => {

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
						>提交</Text>
					</TouchableOpacity>
				</View>
				
			</View>
		);
	}
}

export default LoanAuthSene;
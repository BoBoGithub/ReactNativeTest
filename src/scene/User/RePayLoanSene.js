import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

class RePayLoanSene extends PureComponent{
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '我要还款',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	render(){
		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<View style={{
					backgroundColor:'#06C1AE',
					paddingTop: 16,
					paddingBottom: 10,
				}}>
					<View style={{flexDirection:'column'}}>
							<Text style={{fontSize: 11, color: '#777777', textAlign:'center'}}>提前还款有其它借款试用资格哦！</Text>
							<Text style={{fontSize: 16, color: '#777777', textAlign:'center', padding: 10}}>距离还款日 15天</Text>
					</View>
				</View>
				
				<View style={{flex: 1, flexDirection: 'column'}}>
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
								<Text style={{paddingTop: 20, paddingRight: 20, paddingBottom: 20}}>应还款</Text>
								<View style={{ flex: 1, backgroundColor: 'blue' }} />
								<Text style={{color:'#999999', paddingRight: 20}}>1050 元</Text>
								
							</View>
						</TouchableOpacity>
						
						<TouchableOpacity onPress={()=>{
							
						}}>
							<View style={{flexDirection:'row', alignItems: 'center'}}>
								<Text style={{paddingTop: 20, paddingRight: 20, paddingBottom: 20}}>还款日</Text>
								<View style={{ flex: 1, backgroundColor: 'blue' }} />
								<Text style={{color:'#999999', paddingRight: 20}}>2017-12-30</Text>
							</View>
						</TouchableOpacity>
					</View>
				
			
					<View style={{
						padding: 20,
						flex: 1, 
						flexDirection: 'column'
					}}>
						<TouchableOpacity onPress={()=>{
							Alert.alert('请求还款中...');
						}}>
							<Text style={{
									paddingTop: 10,
									paddingBottom: 10,
									paddingLeft: 70,
									paddingRight: 70,
									borderColor: 'red',
									borderWidth: 1,
									borderRadius: 5,
									alignSelf: 'center',
									backgroundColor: 'red',
									color: 'white',
									fontSize: 18
								}}
							>立即还款</Text>
						</TouchableOpacity>
					</View>

				</View>				
			</View>
		);
	}
}

export default RePayLoanSene;
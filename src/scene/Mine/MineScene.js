import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Alert, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'

import DeviceInfo from 'react-native-device-info';

import { screen } from '../../common/screen';
import store from '../Utils/DeviceStorage';
import CryptoJS from '../Utils/CryptoJS';

class MineScene extends PureComponent {
	
	static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <View style={{ flexDirection: 'row' }}>
				<TouchableOpacity style={styles._container} onPress={() => {
					navigation.navigate('UserSeting')
				}}>
					<Image style={styles._icon} source={require('../../img/Mine/icon_navigationItem_set_white.png')} />
				</TouchableOpacity>
				
				<TouchableOpacity style={styles._container} onPress={() => {}}>
					<Image style={styles._icon} source={require('../../img/Home/icon_navigationItem_message_white.png')} />
				</TouchableOpacity>
            </View>
        ),
        headerStyle: { backgroundColor: '#06C1AE' },
    })
	
	state: {
        isRefreshing: boolean,
		userInfo: Object
    }

	constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
			userInfo: {},
			avatarSource: null
        }
		
		//获取登录信息
		this.initUserInfo();
    }
	
	async initUserInfo(){
		try{
			let userInfoData = await store.get('userInfo');
			
			//检查登录状态
			if(userInfoData != null){
				//提取头像信息
				let userPhotoUrl = await store.get(userInfoData.userName+'_userPhotoUrl');
				
				this.setState({
					userInfo: userInfoData,
					avatarSource: (userPhotoUrl != null && userPhotoUrl.imgUrl != '' ? userPhotoUrl.imgUrl : null)
				});
				
			}else{
				//去登陆
				this.props.navigation.navigate('UserLogin')
			}
		}catch(error){
			console.error('DIY.Error: '+error);
		}
	}
	
	onHeaderRefresh() {
		// if(JSON.stringify(this.state.userInfo) == "{}"){
			// 去登陆
			// this.props.navigation.navigate('UserLogin')
		// }
		
		//获取登录信息
		this.initUserInfo();
		
        this.setState({ isRefreshing: true })
		
        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000);
    }
	
	getDataList() {
        return (
            [
                [
                    { title: '我的还款', subtitle: '1个待还', image: require('../../img/Mine/icon_mine_wallet.png'), scene: 'RePayLoan'},
                    { title: '借款记录', image: require('../../img/Mine/icon_mine_balance.png'), scene: ''},
                    { title: '我的银行卡', subtitle: '已绑定', image: require('../../img/Mine/icon_mine_voucher.png'), scene: ''},
                ],
                [
                    { title: '帮助中心', image: require('../../img/Mine/icon_mine_customerService.png'), scene: ''},
					{ title: '问题反馈', image: require('../../img/Mine/icon_mine_comment.png'), scene: 'FeedBack'},
                    { title: '关于米缸', subtitle: '2017.12.14', image: require('../../img/Mine/icon_mine_aboutmeituan.png'), scene: 'About'}
                ]
            ]
        )
    }

	renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                
			
				let cell = <View style={styles.__container} key={i}>
								<TouchableOpacity onPress={()=>{
										if(data.scene == 'FeedBack'){
											this.props.navigation.navigate('FeedBack', { info: data })
										}else if(data.scene == 'About'){
											this.props.navigation.navigate('About', { info: data })
										}else if(data.scene == 'RePayLoan'){
											this.props.navigation.navigate('RePayLoan', { info: data })
										}else{
											Alert.alert('test.test '+data.scene)
										}
								}}>
									<View style={styles.__content}>
										<Image style={styles.__icon} source={data.image} />
										<Text style={styles.h2}>{data.title}</Text>
										<View style={{ flex: 1, backgroundColor: 'blue' }} />
										<Text style={{color:'#999999'}}>{data.subtitle}</Text>
										<Image style={styles.__arrow} source={require('../../img/Public/cell_arrow.png')} />
									</View>

									<View style={styles.line} />
									
								</TouchableOpacity>
							</View>
				
                cells.push(cell)
            }
            cells.push(<View style={styles.___container} key={i}></View>)
        }

        return (
            <View style={{ flex: 1 }}>
                {cells}
            </View>
        )
    }
	
	renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.userContainer}>
					<TouchableOpacity onPress={() => {
						this.props.navigation.navigate('UserPhotoSet')
					}}>
						{
							this.state.avatarSource === null 
							?
								<Image style={styles.avatar} source={require('../../img/Mine/avatar.png')} />
							:
								<Image style={styles.avatar} source={{uri: this.state.avatarSource, cache: 'force-cache'}} />
						}
					</TouchableOpacity>
					<View>
                        <View style={{ flexDirection: 'row' }}>
						<TouchableOpacity onPress={() => {}}>
							<Text style={styles.h1}>您好，{this.state.userInfo.realName}</Text>
						</TouchableOpacity>
                            <Image style={{ marginLeft: 3 }} source={require('../../img/Mine/beauty_technician_v15.png')} />
                        </View>
						<TouchableOpacity onPress={() => {}}>
						<Text style={{color: 'white', marginTop: 4}}>个人信息 ></Text>
						</TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
	
	render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <View style={{ position: 'absolute', width: 480, height: 720 / 2, backgroundColor: '#06C1AE' }} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
					<View style={styles.___container}></View>
                    {this.renderCells()}
					
					<View style={{padding: 10, flex:1, flexDirection: 'column', alignItems: 'center'}}>
						<Text style={{padding: 13}}>{DeviceInfo.getManufacturer()} {DeviceInfo.getSystemName()} {DeviceInfo.getSystemVersion()}</Text>
						<Text>{DeviceInfo.getModel()}</Text>
						<Text style={{padding: 10}}>
							{CryptoJS.decodeAES('2CudDnHH+TZjrNm8oDPLtgl4P3XCQv3pi9cJuCnsbPxTuz2kT1bvC7P5WYkQh8tX').mobile}
						</Text>
						<Text style={{padding: 10}}>
							{CryptoJS.encodeAES('15613187762')}
						</Text>
					</View>
                </ScrollView>
            </View>
        );
    }
	
}

// define your styles
const styles = StyleSheet.create({
	___container: {
        height: 14,
        backgroundColor: '#f3f3f3',
    },
	
    header: {
        backgroundColor: '#06C1AE',
        paddingBottom: 20
    },
    icon: {
        width: 27,
        height: 27,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    },
	
	_container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    _icon: {
        width: 27,
        height: 27,
        margin: 8,
    },
    _title: {
        fontSize: 15,
        color: '#333333',
        margin: 8,
    },
	
	
	__container: {
        backgroundColor: 'white',
    },
    __content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    __icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    __subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    __arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    },
	h2: {
        fontSize: 14,
        color: '#222222',
    },
	p: {
        fontSize: 13,
        color: '#777777',
    },
	line: {
        width: 480,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
});

export default MineScene;
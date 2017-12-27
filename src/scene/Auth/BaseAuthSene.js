import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import PersonalInfo from './PersonalInfo';
import RelationInfo from './RelationInfo';

class BaseAuthSene extends PureComponent{
		
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '基本信息',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	render(){
		return (
				<ScrollableTabView
					tabBarBackgroundColor='white'
					tabBarActiveTextColor='blue'
					tabBarInactiveTextColor='#555555'
					tabBarTextStyle={{fontSize: 14, marginTop: 13}}
					renderTabBar={() => <DefaultTabBar />}
					locked={true}
				>
					<PersonalInfo key={0} tabLabel={'个人信息'} />
					
					<View key={1} tabLabel={'职业信息'} style={{padding: 10}}>
							<Text>以下均为必填项-职业信息</Text>
					</View>
					
					<RelationInfo key={2} tabLabel={'联系人'} />				
					
				</ScrollableTabView>
		);
	}
}

export default BaseAuthSene;
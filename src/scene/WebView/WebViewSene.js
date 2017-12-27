import React, {PureComponent} from 'react';
import {View, Text, WebView, TouchableOpacity} from 'react-native';

class WebViewSene extends PureComponent{
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: navigation.state.params.WebTitle,
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	render(){
		let WebUrl = this.props.navigation.state.params.WebUrl;
		return (
			<View style={{flex: 1, padding: 1}}>
				<WebView
					bounces={true}
					scalesPageToFit={true}
					startInLoadingState={true}
					source={{uri:WebUrl,method: 'GET'}}
				/>
			</View>
		);
	}
}

export default WebViewSene;
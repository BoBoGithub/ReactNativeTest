import React, {PureComponent} from 'react';
import {View, Text, Keyboard, TouchableOpacity, Alert, TextInput} from 'react-native';

let feedbackText = '';
class FeedBackScene extends PureComponent{
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						navigation.state.params.handleCheck();
					}}>提交</Text>
				</TouchableOpacity>
			</View>
		),
		title: '问题反馈',
		headerTitleStyle: { color: 'white', alignSelf: 'center' },
		headerStyle: {backgroundColor: '#06C1AE'}
	});
	
	componentDidMount(){
		feedbackText = '';
		this.props.navigation.setParams({handleCheck: this.onPostFeedBack});
	}
	
	onPostFeedBack = ()=>{
		if(feedbackText === undefined || feedbackText.replace(/\s+/g, '') === ''){
			Alert.alert('请填写反馈内容哦~');
		}else{
			var formData = new FormData();
			formData.append('con', feedbackText);  
			formData.append('act', 'postFeedBack');  
			
			//提交反馈数据
			fetch('http://172.16.1.95/react/data/TestMT01/index.php',{
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				body: formData,
			}).then((response) => {
				return response.json();
			}).then((json)=>{
				if(json.errno == 0){
					Alert.alert('反馈成功!');
				}else{
					Alert.alert('ERROR：'+json.errmsg);
				}
			});
			
			this.textInput.clear();
			Keyboard.dismiss();
		}
	};
	
	render(){
		return (
			<View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
				<TextInput 
					ref={(ref) => {
						this.textInput = ref;
					}}
					style={{
						flex: 1,
						fontSize: 18,
						padding: 15,
						textAlignVertical:'top',
					}} 
					placeholder="请写下您的宝贵意见或建议，一起进步！"
					placeholderTextColor='#aaaaaa'
					underlineColorAndroid='transparent'
					numberOfLines={10}
					multiline
					onChangeText={(text) =>{
						feedbackText=text;
					}}
					onFocus={()=>{
						feedbackText=''
					}}
				>
					
				</TextInput>
			</View>
		);
	}
}

export default FeedBackScene;
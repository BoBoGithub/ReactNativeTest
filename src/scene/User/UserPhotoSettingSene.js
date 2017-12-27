import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, Platform, StyleSheet,PixelRatio, Alert} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import store from '../Utils/DeviceStorage';

const options = {
  title: '选择图片', 
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', 
    chooseFromLibraryButtonTitle: '图片库', 
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high', 
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2, 
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: { 
        skipBackup: true, 
        path: 'images'
    }
};
	
class UserPhotoSettingSene extends PureComponent{
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
		title: '头像设置',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
	});
	
	constructor(props: Object){
		super(props);
		
		this.state = {
            loading:false,
			userInfo: {},
			avatarSource: null
        }
		
		//检查是否上传过头像
		this.checkUploadImage();
	}
	
	async checkUploadImage(){
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
			console.error('ERROR: '+error);
		}
	}
		
	showImagePicker(){
		ImagePicker.showImagePicker(options, (response) => {
		  console.log('Response = ', response);

		  if (response.didCancel) {
			console.error('User cancelled image picker');
		  }
		  else if (response.error) {
			console.error('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
			console.error('User tapped custom button: ', response.customButton);
		  }
		  else {
			let source;

			if(Platform.OS === 'android'){
				source = {uri: response.uri, isStatic: true}
			}else{
				source = {uri: response.uri.replace('file://', ''), isStatic: true}
			}
			
			let file;
			if(Platform.OS === 'android'){
				file = response.uri
			}else {
				file = response.uri.replace('file://', '')
			}
			
			this.setState({
				loading:true,
			});
				
			
			this.onFileUpload(file,response.fileName||'unname.jpg').then(result=>{
				this.setState({
					loading:false
				})
			});
			
		  }
		});
	}
	
	onFileUpload(file, fileName){
		let reqImgUrl = "http://172.16.1.95/react/data/TestMT01/index.php";
		let params = {
			'act' : 'uploadImg',
		};
		
		return this.uploadFile(reqImgUrl, params, file,fileName);
	}
	
	uploadFile(url, params, fileUrl, fileName) {
		let data = new FormData();

		data.append('file', {
			uri: fileUrl,
			name: fileName,
			type: 'image/jpeg'
		});

		Object.keys(params).forEach((key)=> {
			if (params[key] instanceof Date) {
				data.append(key, value.toISOString())
			} else {
				data.append(key, String(params[key]))
			}
		});
		
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Accept': 'multipart/form-data;charset=utf-8',
				'UserAgent':Platform.OS+" Http1.0/BoBo"
			},
			body: data
		};

		return fetch(url, fetchOptions).then((response)=>{
			return response.json()
		}).then((json)=>{
			//Alert.alert(json.errmsg);
			
			if(json.errno == 0){
				this.setState({
					avatarSource: json.imgUrl
				});
				
				//设置图片缓存地址
				store.save(this.state.userInfo.userName+'_userPhotoUrl', {'imgUrl' : json.imgUrl});
			}
		});
	}
	
	render(){
		
		return (
			<View style={{padding: 30}}>
				{
					this.state.avatarSource === null 
					?
						<TouchableOpacity
							onPress={this.showImagePicker.bind(this)}
						>
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
							>上传用户头像</Text>
						</TouchableOpacity>
					:
					<View>
						<Image style={styles.avatar} source={{uri: this.state.avatarSource, cache: 'force-cache'}} />
						<View style={{padding: 10}} />
						<TouchableOpacity
							onPress={this.showImagePicker.bind(this)}
						>
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
							>重新上传用户头像</Text>
						</TouchableOpacity>
					</View>
				}
					
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    //borderRadius: 75,
    width: 300,
    height: 300
  }
});

export default UserPhotoSettingSene;
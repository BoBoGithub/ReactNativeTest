import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import PasswordGesture from 'react-native-gesture-password';

class GestureSettingSene extends PureComponent{
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
		title: '手势设置',
		headerTitleStyle: { color: 'black', alignSelf: 'center', fontSize: 16},
		headerStyle: {backgroundColor: 'white'},
	});
	
	constructor(props: Object){
		super(props);
		
		this.state = {
			message: '绘制解锁图案',
			status: 'normal',
		}
	}
	
	onStart(){
        this.setState({
            status: 'normal',
            message: '绘制解锁图案中...',
        });
    }
	
	onReset() {
        this.setState({
            status: 'normal',
            message: '请重新绘制解锁图案',
        });
    }
	
	onEnd(password) {
        if ( parseInt(password) < 100000) {
            this.setState({
                status: 'wrong',
                message: '设置格式错误，请重试!',
            });
        } else {
            this.setState({
                status: 'right',
                message: '绘制解锁图案，通过!',
            });
			
			setTimeout(()=>Alert.alert('绘制数字为：'+password), 2000);
        }
    }
	
	render(){
		return (
			<PasswordGesture
				ref='pg'
                status={this.state.status}
				interval={1500}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
				onReset={()=>this.onReset()}
			/>
		);
	}
}

export default GestureSettingSene;
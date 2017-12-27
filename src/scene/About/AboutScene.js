import React, {PureComponent} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

class AboutScene extends PureComponent{
	
	static navigationOptions = ({navigation})=>({
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={()=>{}}>
					<Text style={{padding:20, color: '#222222'}} onPress={()=>{
						navigation.state.params.handleCheck();
					}}></Text>
				</TouchableOpacity>
			</View>
		),
		title: '关于米缸-热更新',
		headerTitleStyle: { color: 'white', alignSelf: 'center'},
		headerStyle: {backgroundColor: '#06C1AE'}
	});
	
	render(){
		return (
			<View style={{padding: 10, backgroundColor: '#f3f3f3'}}>
			<ScrollView>
				<Image source={require('../../img/About/intro.jpg')} style={{alignSelf:'center', padding: 5, width: 350, height: 200}}/>
				<View style={{padding: 10, }}></View>
				<View style={{borderColor: '#B8AD94', borderWidth: 2}}>
					<View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
						<Image style={{width:170, height: 110, padding: 20}} source={require('../../img/About/about_01.png')} />
						<Image style={{width:170, height: 110, padding: 10 }} source={require('../../img/About/about_02.png')} />
					</View>
					
					<View style={{alignItems: 'center', paddingLeft: 10}}>
						<Image style={{width:170, height: 110, padding: 10 }} source={require('../../img/About/about_03.png')} />
					</View>
					
					<View style={{padding: 10}}>
						<Text style={{fontSize: 13, paddingBottom: 10}}>　　米缸金融2014年11月成立，注册地上海黄浦区，注册资本人民币1亿元，由中信资产旗下互联网创业投资基金与中国十佳风险投资公司联创永宣共同投资。米缸金融平台（MIGANG.COM）于2015年2月1日正式上线。米缸金融是中国互联网金融协会首批会员，同时也是上海市互联网金融行业协会的创始会员，并于2016年3月荣升理事会员。</Text>
						<Text style={{fontSize: 13, paddingBottom: 10}}>　　米缸金融总部位于中国金融中心上海陆家嘴，研发中心位于中国硅谷-北京中关村。广州和深圳设有分支机构。</Text>
						<Text style={{fontSize: 13, paddingBottom: 10}}>　　米缸金融是专业的第三方金融信息服务平台。专注于消费金融和个人资产证劵化的发展，利用互联网大数据为广大用户提供专业普惠的私人银行服务，旨在打造互联网金融细分领域的领导地位。2015年8月米缸金融与天安财险达成战略合作，成为国内首家推出“互联网金融+履约保证保险”服务的平台。2016年3月米缸金融与某知名国有控股的股份制银行签署资金存管协议，即将成为互联网金融行业中少数同时具有“房屋抵押+履约保证保险+资金托管” 等多重风险管控的平台。</Text>
					</View>
					
					<View style={{padding: 10}}>
						<Text>管理团队：</Text>
						<View>
							<Image style={{width: 170, height: 170, alignSelf: 'center'}} source={require('../../img/About/bitmapcopy_01.png')} />
							<Text style={{paddingTop: 10, fontSize: 13, alignSelf:'center'}}>曹晓峰</Text>
							<Text style={{fontSize: 13, alignSelf:'center'}}>创始人/董事长</Text>
							<Text style={{paddingTop: 20, fontSize: 13}}>　　本科毕业于上海交通大学计算机系，后就读于中欧国际工商学院、上海交通大学上海高级金融学院，并获得EMBA学位。先后在IT和户外电子媒体行业两次成功创业，所创立的企业获得美林、TDF、JAFCO等一流投资机构的投资，并以3亿多美金出售给美股上市公司；此后长期活跃于VC/PE界。</Text>
						</View>
					</View>
					
				</View>
			</ScrollView>
			</View>
		);
	}
}

export default AboutScene;
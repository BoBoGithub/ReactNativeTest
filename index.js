import React, {PureComponent} from 'react';
import { AppRegistry } from 'react-native';

import RootScene from './src/RootScene';

export default class TestMT04 extends PureComponent{
	render(){
		return (
			<RootScene />
		);
	}
}

AppRegistry.registerComponent('TestMT04', () => TestMT04);

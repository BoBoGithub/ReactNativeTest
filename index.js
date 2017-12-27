import React, {PureComponent} from 'react';
import { AppRegistry } from 'react-native';

import RootScene from './src/RootScene';

export default class TestMT05 extends PureComponent{
	render(){
		return (
			<RootScene />
		);
	}
}

AppRegistry.registerComponent('TestMT05', () => TestMT05);

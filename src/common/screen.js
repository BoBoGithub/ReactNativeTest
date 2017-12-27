import { Dimensions, Platform, PixelRatio } from 'react-native'

export default {
    width: 480,
    height: 720,
    onePixel: 1 / PixelRatio.get(),
    statusBarHeight: (Platform.OS === 'ios' ? 20 : 0)
}
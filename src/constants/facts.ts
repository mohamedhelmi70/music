import {Platform, I18nManager, Dimensions, StatusBar} from 'react-native';

const isAndroid = Platform.OS == 'android';
const isIOS = Platform.OS == 'ios';
const {isRTL} = I18nManager;
const isLTR = !isRTL;

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 780 || dimen.width === 780)
          || (dimen.height === 812 || dimen.width === 812)
          || (dimen.height === 844 || dimen.width === 844)
          || (dimen.height === 896 || dimen.width === 896)
          || (dimen.height === 926 || dimen.width === 926))
    );
}

export function ifIphoneX(iphoneXStyle: any, regularStyle: any) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe: boolean) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight,
        default: 0
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}

export {isAndroid, isIOS, isRTL, isLTR};
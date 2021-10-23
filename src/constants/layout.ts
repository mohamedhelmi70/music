import {Dimensions, PixelRatio} from 'react-native';

export let width = Dimensions.get('window').width;
export let height = Dimensions.get('window').height;

export const wp = (widthPercent: string) => {
    const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

    return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const hp = (heightPercent: string) => {
    const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);

    return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

const listenOrientationChange = (that: {setState: ({}) => void}) => {
    Dimensions.addEventListener('change', (newDimensions) => {
        width = newDimensions.window.width;
        height = newDimensions.window.height;

        that.setState({
            orientation: width < height ? 'portrait' : 'landscape',
        });
    });
};

const removeOrientationListener = () => {
    Dimensions.removeEventListener('change', () => {});
};

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    listenOrientationChange,
    removeOrientationListener,
};
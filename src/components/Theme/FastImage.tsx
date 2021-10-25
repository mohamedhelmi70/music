import React from 'react';
import {ImageStyle, StyleProp} from 'react-native';
import FastImage from 'react-native-fast-image';

interface FastImageProps {
    url: string;
    style?: StyleProp<ImageStyle>;
}

function Image({url, style}: FastImageProps) {
    return (
        <FastImage
            source={{
                uri: url,
                headers: {Authorization: '4f298a53e552283bee957836a529baec'},
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
            }}
            style={{...style}}
            resizeMode={FastImage.resizeMode.cover}
        />
    );
}

export default Image;

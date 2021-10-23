import React, {ReactNode} from 'react';
import {ActivityIndicator, StatusBar, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View} from '../Themed';
import {colors} from '../../constants';

function Container({children, loading, style}: {children: ReactNode; loading?: boolean; style?: StyleProp<ViewStyle>}) {
    return (
        <View style={[styles.container, style]}>
            <StatusBar backgroundColor={colors.light.tint} barStyle="dark-content" />
            {loading ? <ActivityIndicator size="small" color={colors.light.primary} /> : children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.light.background,
    },
});

export default Container;

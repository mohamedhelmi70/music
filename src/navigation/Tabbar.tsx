import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, getBottomSpace, isIOS, wp} from '../constants';

function BottomTabBar({state, descriptors, navigation}: any) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const ICONS = ['home-outline', 'people-outline', 'md-musical-notes-outline', 'search'];
    const STRINGS_EN = ['Home', 'Artists', 'Albums', 'search'];

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{...styles.container, flexDirection: 'row'}}>
            {state.routes.map((route: any, index: any) => {
                const {options} = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={index}
                        style={styles.tab}>
                        <Icon name={ICONS[index]} color={isFocused ? colors.light.primary : '#A2A2A2'} size={25} />
                        <Text style={{...styles.text, color: isFocused ? colors.light.primary : '#848484'}}>
                            {STRINGS_EN[index]}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default BottomTabBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingBottom: getBottomSpace(),
        borderTopLeftRadius: wp('8%'),
        borderTopRightRadius: wp('8%'),
        paddingVertical: wp('2%'),
    },
    tab: {
        flex: 1,
        paddingVertical: wp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 9,
        fontWeight: isIOS ? '600' : undefined,
        fontFamily: isIOS ? 'Roboto' : 'Roboto-Medium',
    },
});

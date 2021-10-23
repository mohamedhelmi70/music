import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {isLTR, wp} from '../../constants';
import {useNavigation} from '@react-navigation/native';

function BackButton({color = '#FFF'}) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() => navigation.goBack()}>
            <Icon
                name={isLTR ? 'md-arrow-back-sharp' : 'md-arrow-forward-sharp'}
                color={color}
                style={{marginTop: wp('1%')}}
                size={27}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: wp('14%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BackButton;

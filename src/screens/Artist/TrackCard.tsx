import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {AppParamList, Track} from '../../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, wp} from '../../constants';
import {Text, View} from '../../components/Themed';
import Icon from 'react-native-vector-icons/Ionicons';

interface TrackCardProps {
    track: Track;
    albumId: number;
    artistId: number;
    navigation?: StackNavigationProp<AppParamList, 'Artist'>;
}

function TrackCard({track, navigation, artistId, albumId}: TrackCardProps) {
    return (
        <Pressable
            style={{marginStart: wp('5%')}}
            onPress={() =>
                navigation?.navigate('Track', {trackId: track.id_track, title: track.track, albumId, artistId})
            }>
            <View style={styles.container}>
                <View lightColor={colors.light.gray} style={styles.image}>
                    <Icon name="md-musical-notes-outline" size={30} />
                </View>
                <View style={styles.cardRight}>
                    <Text style={styles.cardTitle} numberOfLines={1} weight="700" lightColor="#334443">
                        {track.track}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: wp('26.5%'),
        alignSelf: 'center',
        borderRadius: wp('3%'),
        marginBottom: wp('4%'),
    },
    image: {
        width: wp('26.5%'),
        height: wp('25.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: wp('3%'),
        borderTopRightRadius: wp('3%'),
    },
    cardRight: {
        marginLeft: wp('2%'),
        paddingVertical: wp('3%'),
    },
    cardTitle: {
        fontSize: wp('2.5%'),
        maxWidth: wp('40%'),
        width: wp('25.8%'),
    },
});

export default TrackCard;

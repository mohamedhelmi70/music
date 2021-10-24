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
    navigation: StackNavigationProp<AppParamList, 'Home'>;
}

function TrackCard({track, navigation, albumId, artistId}: TrackCardProps) {
    return (
        <Pressable
            onPress={() =>
                navigation.navigate('Track', {trackId: track.id_track, title: track.track, albumId, artistId})
            }>
            <View lightColor="#FFF" style={styles.container}>
                <View lightColor={colors.light.gray} style={styles.image}>
                    <Icon name="md-musical-notes-outline" size={30} />
                </View>
                <View style={styles.cardRight} lightColor="#FFF">
                    <Text style={styles.cardTitle} weight="700" lightColor="#334443">
                        {track.track}
                    </Text>

                    <Text style={styles.caption} font="Roboto-Medium" weight="500" lightColor={colors.light.dark}>
                        {track.artist}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp('90%'),
        alignSelf: 'center',
        borderRadius: wp('3%'),
        marginBottom: wp('4%'),

        flexDirection: 'row',
    },
    image: {
        width: wp('25%'),
        height: wp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: wp('3%'),
        borderBottomLeftRadius: wp('3%'),
    },
    cardRight: {
        marginLeft: wp('4%'),
        paddingVertical: wp('3%'),
    },
    cardTitle: {
        fontSize: wp('3.6%'),
        maxWidth: wp('40%'),
        width: wp('40%'),
    },
    caption: {
        fontSize: wp('3%'),
        maxWidth: wp('40%'),
        width: wp('40%'),
        marginTop: wp('1.5%'),
    },
});

export default TrackCard;

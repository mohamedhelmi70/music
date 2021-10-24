import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {Artist, AppParamList} from '../../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {wp} from '../../constants';
import FastImage from '../../components/FastImage';
import {Text, View} from '../../components/Themed';

interface ArtistCardProps {
    artist: Artist;
    navigation: StackNavigationProp<AppParamList, 'Artists'>;
}

function AlbumCard({artist, navigation}: ArtistCardProps) {
    return (
        <Pressable onPress={() => navigation.navigate('Artist', {artistId: artist.id_artist})} style={styles.container}>
            <View>{Boolean(artist.cover) && <FastImage url={artist.cover} style={styles.image} />}</View>
            <View style={styles.cardRight}>
                <Text style={styles.cardTitle} weight="700" numberOfLines={1} lightColor="#334443">
                    {artist.artist}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp('45%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginBottom: wp('5%'),
    },
    image: {
        width: wp('40%'),
        height: wp('40%'),
        borderRadius: wp('20%'),
        marginBottom: wp('2%'),
    },
    cardRight: {
        marginLeft: wp('4%'),
    },
    cardTitle: {
        fontSize: wp('3%'),
        maxWidth: wp('40%'),
    },
});

export default AlbumCard;

import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {Album} from '../../../types';
import {wp} from '../../constants';
import FastImage from '../../components/Theme/FastImage';
import {Text, View} from '../../components/Themed';

interface AlbumCardProps {
    album: Album;
}

function AlbumCard({album}: AlbumCardProps) {
    return (
        <Pressable style={styles.container}>
            <View>{Boolean(album.cover) && <FastImage url={album.cover} style={styles.image} />}</View>
            <View style={styles.cardRight}>
                <Text style={styles.cardTitle} weight="700" numberOfLines={1} lightColor="#334443">
                    {album.album}
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
        borderRadius: wp('3%'),
        marginBottom: wp('2%'),
    },
    cardRight: {
        marginLeft: wp('4%'),
    },
    cardTitle: {
        fontSize: wp('3.2%'),
        maxWidth: wp('40%'),
        width: wp('40%'),
    },
});

export default AlbumCard;

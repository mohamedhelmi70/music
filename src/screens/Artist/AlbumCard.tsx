import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {Album} from '../../../types';
import {colors, wp} from '../../constants';
import FastImage from '../../components/FastImage';
import {Text, View} from '../../components/Themed';

interface AlbumCardProps {
    album: Album;
    selectedAlbum: number;
    selectAlbum: (id: number) => void;
}

function AlbumCard({album, selectedAlbum, selectAlbum}: AlbumCardProps) {
    return (
        <Pressable style={styles.container} onPress={() => selectAlbum(album.id_album)}>
            <View>{Boolean(album.cover) && <FastImage url={album.cover} style={styles.image} />}</View>
            <View>
                <Text
                    style={styles.cardTitle}
                    weight="700"
                    numberOfLines={1}
                    lightColor={album.id_album === selectedAlbum ? colors.light.primary : '#334443'}>
                    {album.album}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp('25%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginBottom: wp('5%'),
    },
    image: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('3%'),
        marginBottom: wp('2%'),
    },
    cardTitle: {
        fontSize: wp('3.2%'),
        maxWidth: wp('20%'),
        width: wp('19%'),
    },
});

export default AlbumCard;

import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {AppParamList, Artist, Album, Track} from '../../../types';
import {BackButton, Container} from '../../components';
import Image from '../../components/FastImage';
import {Text} from '../../components/Themed';
import {colors, isIOS, wp} from '../../constants';
import axiosInstance from '../../constants/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import {RouteProp} from '@react-navigation/core';
import AlbumCard from './AlbumCard';
import TrackCard from './TrackCard';
import {StackNavigationProp} from '@react-navigation/stack';

interface ArtistScreenProps {
    navigation: StackNavigationProp<AppParamList, 'Artist'>;
    route: RouteProp<AppParamList, 'Artist'>;
}

function ArtistScreen({route, navigation}: ArtistScreenProps) {
    const isMountedRef = useIsMountedRef();
    const [status, setStatus] = React.useState<'IDEL' | 'LOADING'>('LOADING');
    const [artist, setArtist] = React.useState<Artist | undefined>(undefined);
    const [albums, setAlbums] = React.useState<Album[]>([]);
    const [tracks, setTracks] = React.useState<Track[]>([]);
    const [selectedAlbum, setSelectedAlbum] = React.useState<number>(-1);

    const getArtist = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: Artist; pages: number}} = await axiosInstance.get(
                `/artists/${route.params.artistId}`,
            );
            const result: {data: {success: boolean; result: {albums: Album[]}}} = await axiosInstance.get(
                `/artists/${route.params.artistId}/albums`,
            );
            if (res.data.success === true && result.data.success === true) {
                setArtist(res.data.result);
                setAlbums(result.data.result.albums);
                setSelectedAlbum(result.data.result.albums[0].id_album);
            }
            setStatus('IDEL');
        } catch (error) {
            setStatus('IDEL');
        }
    }, [isMountedRef, route.params.artistId]);

    const getTracks = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: {tracks: Track[]}}} = await axiosInstance.get(
                `/artists/${route.params.artistId}/albums/${selectedAlbum}/tracks`,
            );
            if (res.data.success === true) {
                setTracks(res.data.result.tracks);
            }
        } catch (error) {
            console.log(error);
        }
    }, [isMountedRef, route.params.artistId, selectedAlbum]);

    React.useEffect(() => {
        getArtist();
    }, [getArtist]);

    React.useEffect(() => {
        getTracks();
    }, [getTracks]);

    if (status === 'LOADING') {
        return (
            <Container>
                <ActivityIndicator size="small" color={colors.light.primary} />
            </Container>
        );
    }

    return (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <BackButton color={'#FFF'} />
                        </View>
                        {Boolean(artist) && Boolean(artist?.cover) && (
                            <View style={styles.avatarContainer}>
                                <Image url={artist.cover} style={styles.avatar} />
                            </View>
                        )}
                        <View style={{paddingHorizontal: wp('5%')}}>
                            <Text style={[styles.heading, {marginEnd: wp('1%')}]}>{artist?.artist}</Text>
                        </View>
                    </View>
                    <View style={styles.listHeader}>
                        <Text style={{fontSize: wp('4.3%')}} font="Roboto-Bold" weight="700">
                            Albums
                        </Text>
                    </View>
                    <FlatList
                        numColumns={1}
                        data={albums}
                        horizontal={true}
                        style={{width: wp('100%'), paddingTop: wp('3%'), paddingStart: wp('5%')}}
                        contentContainerStyle={{paddingEnd: wp('7%')}}
                        keyExtractor={(item) => item?.id_album?.toString()}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{width: wp('4%')}} />}
                        renderItem={({item}) => (
                            <AlbumCard album={item} selectedAlbum={selectedAlbum} selectAlbum={setSelectedAlbum} />
                        )}
                    />
                </View>
            }
            renderItem={() => <View />}
            ListFooterComponent={
                <>
                    <View style={styles.listHeader}>
                        <Text style={{fontSize: wp('4.3%')}} font="Roboto-Bold" weight="700">
                            Tracks
                        </Text>
                    </View>
                    <FlatList
                        numColumns={3}
                        data={tracks}
                        showsVerticalScrollIndicator={false}
                        style={{width: wp('100%'), paddingTop: wp('3%')}}
                        contentContainerStyle={{paddingEnd: wp('7%')}}
                        renderItem={({item}) => (
                            <TrackCard
                                track={item}
                                navigation={navigation}
                                albumId={selectedAlbum}
                                artistId={route.params.artistId}
                            />
                        )}
                    />
                </>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        position: 'relative',
    },
    header: {
        position: 'absolute',
        top: isIOS ? wp('10%') : wp('5%'),
        left: wp('5%'),
        zIndex: 2,
        backgroundColor: 'rgba(1,1,1, .3)',
        borderRadius: wp('5%'),
    },
    avatarContainer: {
        alignSelf: 'flex-start',
        width: wp('100%'),
        height: wp('80%'),
    },
    avatar: {
        width: wp('100%'),
        height: wp('80%'),
    },
    heading: {
        marginTop: wp('3%'),
        fontSize: wp('4.5%'),
        fontWeight: '600',
        maxWidth: wp('80%'),
        alignSelf: 'flex-start',
        color: colors.light.dark,
    },
    listHeader: {
        marginTop: wp('3%'),
        paddingHorizontal: wp('5%'),
    },
});

export default ArtistScreen;

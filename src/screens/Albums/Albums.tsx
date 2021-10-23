import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Album} from '../../../types';
import {Container} from '../../components';
import {Text, View} from '../../components/Themed';
import {colors, getStatusBarHeight, wp} from '../../constants';
import axiosInstance from '../../constants/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import AlbumCard from './AlbumCard';

function Albums() {
    const isMountedRef = useIsMountedRef();
    const [albums, setAlbums] = React.useState<Album[]>([]);

    const getAlbums = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: {albums: Album[]}}} = await axiosInstance.get(
                `/artists/15/albums`,
            );
            if (res.data.success === true) {
                setAlbums(res.data.result.albums);
            }
        } catch (error) {
            console.log(error);
        }
    }, [isMountedRef]);

    React.useEffect(() => {
        getAlbums();
    }, [getAlbums]);

    return (
        <Container style={styles.container}>
            <FlatList
                numColumns={2}
                data={albums}
                ListHeaderComponent={
                    <View lightColor={colors.light.background} style={styles.header}>
                        <Text
                            weight="700"
                            style={{fontSize: wp('5%')}}
                            lightColor={colors.light.text}
                            font="Roboto-Bold">
                            Albums
                        </Text>
                    </View>
                }
                style={{width: wp('100%'), paddingHorizontal: wp('5%')}}
                keyExtractor={(item) => item?.id_album?.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <AlbumCard album={item} />}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(true),
        justifyContent: 'flex-start',
    },
    header: {
        width: wp('100%'),
        paddingVertical: wp('4%'),
    },
});

export default Albums;

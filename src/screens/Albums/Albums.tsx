import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Album} from '../../../types';
import {Container} from '../../components';
import {Text, View} from '../../components/Themed';
import {colors, getStatusBarHeight, isIOS, wp} from '../../constants';
import axiosInstance from '../../constants/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import AlbumCard from './AlbumCard';

function Albums() {
    const isMountedRef = useIsMountedRef();
    const [status, setStatus] = React.useState<'IDEL' | 'LOADING'>('LOADING');
    const [albums, setAlbums] = React.useState<Album[]>([]);
    const [search, handleSearch] = React.useState('');

    const getAlbums = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: {albums: Album[]}}} = await axiosInstance.get(
                `/artists/15/albums`,
            );
            if (res.data.success === true) {
                setAlbums(res.data.result.albums);
            }
            setStatus('IDEL');
        } catch (error) {
            setStatus('IDEL');
            console.log(error);
        }
    }, [isMountedRef]);

    React.useEffect(() => {
        getAlbums();
    }, [getAlbums]);

    if (status === 'LOADING') {
        return (
            <Container>
                <ActivityIndicator size="small" color={colors.light.primary} />
            </Container>
        );
    }

    const albumsFiltered: Album[] = albums.filter((album) => album.album.includes(search));

    return (
        <Container style={styles.container}>
            <View lightColor={colors.light.background} style={styles.header}>
                <Text weight="700" style={{fontSize: wp('5%')}} lightColor={colors.light.text} font="Roboto-Bold">
                    Albums
                </Text>
                <View lightColor="#fff" darkColor={colors.dark.dark} style={styles.inputContainer}>
                    <Icon name="search" size={20} color={colors.light.dark} />
                    <TextInput
                        autoCapitalize="none"
                        keyboardAppearance="default"
                        autoCompleteType="off"
                        value={search}
                        onChangeText={handleSearch}
                        placeholderTextColor={colors.light.placeholder}
                        style={[styles.input, {color: colors.light.text}]}
                        placeholder="Search"
                    />
                    {search !== '' && <Icon onPress={() => handleSearch('')} name="close" size={20} color={'#F00'} />}
                </View>
            </View>
            {albumsFiltered?.length > 0 ? (
                <FlatList
                    numColumns={2}
                    data={albumsFiltered}
                    style={{width: wp('100%'), paddingHorizontal: wp('5%')}}
                    keyExtractor={(item) => item?.id_album?.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <AlbumCard album={item} />}
                />
            ) : (
                <Container>
                    <Text
                        style={{marginTop: wp('20%')}}
                        font="Roboto-Medium"
                        weight="500"
                        lightColor={colors.light.dark}>
                        There are no albums for : "{search}"
                    </Text>
                </Container>
            )}
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
        paddingBottom: wp('4%'),
        paddingHorizontal: wp('5% '),
    },
    inputContainer: {
        height: wp('13%'),
        width: wp('90%'),
        marginEnd: wp('.7%'),
        borderRadius: wp('1.5%'),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: wp('4%'),
        paddingHorizontal: wp('2.5%'),
    },
    input: {
        width: wp('75%'),
        paddingVertical: wp('2%'),
        paddingHorizontal: wp('3%'),
        color: '#000',
        fontFamily: isIOS ? 'Roboto' : 'Roboto-Regular',
    },
});

export default Albums;

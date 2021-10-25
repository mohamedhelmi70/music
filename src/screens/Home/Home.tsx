import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TextInput} from 'react-native';
import {Container} from '../../components';
import {AppParamList, Track} from '../../../types';
import axiosInstance from '../../constants/axios';
import {Text, View} from '../../components/Themed';
import {colors, getStatusBarHeight, isIOS, wp} from '../../constants';
import TrackCard from './TrackCard';
import {StackNavigationProp} from '@react-navigation/stack';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import Icon from 'react-native-vector-icons/Ionicons';

interface HomeProps {
    navigation: StackNavigationProp<AppParamList, 'Home'>;
}

function Home({navigation}: HomeProps) {
    const isMountedRef = useIsMountedRef();
    const [artistId, setArtistId] = React.useState<number>(27255);
    const [status, setStatus] = React.useState<'IDEL' | 'LOADING'>('LOADING');
    const [albumId, setAlbumId] = React.useState<number>(488178);
    const [tracks, setTracks] = React.useState<Track[]>([]);
    const [search, handleSearch] = React.useState('');

    const getTracks = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: {artist: string; tracks: Track[]}}} = await axiosInstance.get(
                `/artists/${artistId}/albums/${albumId}/tracks`,
            );
            if (res.data.success === true) {
                const data = res?.data?.result?.tracks.map((track) => ({...track, artist: res?.data?.result?.artist}));
                setTracks(data);
            }
            setStatus('IDEL');
        } catch (error) {
            setStatus('IDEL');
            console.log(error);
        }
    }, [isMountedRef, albumId, artistId]);

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

    const tracksFiltered: Track[] = tracks.filter((track) => track.track.includes(search));

    return (
        <Container style={styles.container}>
            <View lightColor={colors.light.background} style={styles.header}>
                <Text weight="700" style={{fontSize: wp('5%')}} lightColor={colors.light.text} font="Roboto-Bold">
                    You are Welcome
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
            {tracksFiltered?.length > 0 ? (
                <FlatList
                    data={tracksFiltered}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TrackCard track={item} navigation={navigation} albumId={albumId} artistId={artistId} />
                    )}
                />
            ) : (
                <Container>
                    <Text
                        style={{marginTop: wp('20%')}}
                        font="Roboto-Medium"
                        weight="500"
                        lightColor={colors.light.dark}>
                        There are no tracks for : "{search}"
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

export default Home;

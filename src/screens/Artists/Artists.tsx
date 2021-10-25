import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TextInput} from 'react-native';
import {AppParamList, Artist} from '../../../types';
import {Container} from '../../components';
import {Text, View} from '../../components/Themed';
import {colors, getStatusBarHeight, isIOS, wp} from '../../constants';
import axiosInstance from '../../constants/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import ArtistCard from './ArtistCard';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

interface ArtistsProps {
    navigation: StackNavigationProp<AppParamList, 'Artists'>;
}

function Artists({navigation}: ArtistsProps) {
    const isMountedRef = useIsMountedRef();
    const [artists, setArtists] = React.useState<Artist[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [hasMoreData, setHasMoreData] = React.useState<'TRUE' | 'FALSE'>('TRUE');
    const [status, setStatus] = React.useState<'IDEL' | 'LOADING' | 'REFRESHING'>('LOADING');
    const [search, handleSearch] = React.useState('');

    const getArtists = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: Artist[]; pages: number}} = await axiosInstance.get(
                `/artists?page=${page}`,
            );
            if (res.data.success === true) {
                if (page === 1) {
                    setArtists(res.data.result);
                } else {
                    setArtists([...artists, ...res.data.result]);
                }
                setHasMoreData(page < res.data.pages ? 'TRUE' : 'FALSE');
            }
            setStatus('IDEL');
        } catch (error) {
            setStatus('IDEL');
        }
    }, [isMountedRef, page]);

    const searchByArtist = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: Artist[]}} = await axiosInstance.get(
                `?q=${search}&type=artist`,
            );
            if (res.data.success === true) {
                setArtists(res.data.result);
            }
        } catch (error) {
            console.log(error);
        }
    }, [search, handleSearch]);

    React.useEffect(() => {
        getArtists();
    }, [getArtists]);

    const handleOnEndReached = () => {
        if (hasMoreData === 'TRUE' && status === 'IDEL' && search === '') {
            setPage(page + 1);
        }
    };

    return (
        <Container style={styles.container}>
            <View lightColor={colors.light.background} style={styles.header}>
                <Text weight="700" style={{fontSize: wp('5%')}} lightColor={colors.light.text} font="Roboto-Bold">
                    Artists
                </Text>
                <View lightColor="#fff" darkColor={colors.dark.dark} style={styles.inputContainer}>
                    <Icon
                        onPress={() => {
                            search === '' ? getArtists() : searchByArtist();
                        }}
                        name="search"
                        size={28}
                        color={colors.light.primary}
                    />
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
                    {search !== '' && (
                        <Icon
                            onPress={() => {
                                handleSearch('');
                                getArtists();
                            }}
                            name="close"
                            size={20}
                            color={'#F00'}
                        />
                    )}
                </View>
            </View>
            <FlatList
                numColumns={2}
                data={artists}
                style={{width: wp('100%'), paddingHorizontal: wp('5%')}}
                contentContainerStyle={{paddingTop: wp('5%')}}
                onEndReachedThreshold={0.2}
                onRefresh={search == '' ? () => {} : () => setPage(1)}
                onEndReached={search == '' ? () => {} : handleOnEndReached}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?.id_artist?.toString()}
                refreshing={status === 'REFRESHING'}
                ListEmptyComponent={
                    status === 'LOADING' ? (
                        <Container>
                            <ActivityIndicator size="small" color={colors.light.primary} />
                        </Container>
                    ) : (
                        <Container>
                            <Text
                                style={{marginTop: wp('20%')}}
                                font="Roboto-Medium"
                                weight="500"
                                lightColor={colors.light.dark}>
                                There are no artists for : "{search}"
                            </Text>
                        </Container>
                    )
                }
                renderItem={({item}) => <ArtistCard artist={item} navigation={navigation} />}
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
        width: wp('72%'),
        paddingVertical: wp('2%'),
        paddingHorizontal: wp('3%'),
        color: '#000',
        fontFamily: isIOS ? 'Roboto' : 'Roboto-Regular',
    },
});

export default Artists;

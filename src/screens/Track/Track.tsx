import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {AppParamList, Track, TrackLyrics} from '../../../types';
import {Container} from '../../components';
import {Text} from '../../components/Themed';
import {colors, getBottomSpace, wp} from '../../constants';
import axiosInstance from '../../constants/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';

interface TrackScreenProps {
    route: RouteProp<AppParamList, 'Track'>;
}

function TrackScreen({route}: TrackScreenProps) {
    const isMountedRef = useIsMountedRef();
    const [status, setStatus] = React.useState<'IDEL' | 'LOADING'>('LOADING');
    const [track, setTrack] = React.useState<Track | undefined>(undefined);
    const [lyrics, setLyrics] = React.useState<TrackLyrics | undefined>(undefined);

    const getTrack = React.useCallback(async () => {
        try {
            const res: {data: {success: boolean; result: Track}} = await axiosInstance.get(
                `/artists/${route.params.artistId}/albums/${route.params.albumId}/tracks/${route.params.trackId}`,
            );
            if (res.data.success === true) {
                setTrack(res.data.result);
                if (res.data.result.haslyrics) {
                    const result: {data: {success: boolean; result: TrackLyrics}} = await axiosInstance.get(
                        res.data.result.api_lyrics,
                    );
                    setLyrics(result.data.result);
                }
            }
            setStatus('IDEL');
        } catch (error) {
            setStatus('IDEL');
        }
    }, [isMountedRef, route.params.trackId]);

    React.useEffect(() => {
        getTrack();
    }, [getTrack]);

    if (status === 'LOADING') {
        return (
            <Container>
                <ActivityIndicator size="small" color={colors.light.primary} />
            </Container>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: getBottomSpace(), paddingTop: wp('10%')}}>
            <Text
                font="Roboto-Bold"
                weight="700"
                lightColor={colors.light.text}
                style={{width: wp('90%'), marginBottom: wp('.5%')}}>
                Artist: {track?.artist}
            </Text>
            <Text
                font="Roboto-Bold"
                weight="700"
                lightColor={colors.light.text}
                style={{width: wp('90%'), marginBottom: wp('.5%')}}>
                Album: {track?.album}
            </Text>
            <Text
                font="Roboto-Bold"
                weight="700"
                lightColor={colors.light.text}
                style={{width: wp('90%'), marginBottom: wp('7%')}}>
                Track: {track?.track}
            </Text>

            <Text
                font="Roboto-Bold"
                weight="700"
                lightColor={colors.light.text}
                style={{width: wp('90%'), marginBottom: wp('2%')}}>
                Track Lyrics:
            </Text>
            {track?.haslyrics ? (
                <Text font="Roboto-Medium" weight="500" lightColor={colors.light.dark} style={{width: wp('90%')}}>
                    {lyrics?.lyrics}
                </Text>
            ) : (
                <Text font="Roboto-Medium" weight="500" lightColor={colors.light.dark} style={{width: wp('90%')}}>
                    There are no lyrics for this track
                </Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
});

export default TrackScreen;

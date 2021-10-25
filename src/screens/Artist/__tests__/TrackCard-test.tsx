import React from 'react';
import renderer from 'react-test-renderer';
import {Track} from '../../../../types';
import TrackCard from '../TrackCard';

// Describing a test suite
describe('<TrackCard />', () => {
    const track: Track = {
        id_track: 11,
        track: 'track name',
        artist: 'artist name',
        album: 'album name',
        api_track: 'hhtps://music.com/track',
        api_lyrics: 'hhtps://music.com/lyrics',
        haslyrics: false,
        bpm: 12,
    };
    test('Renders TrackCard correctly', () => {
        const tree = renderer.create(<TrackCard track={track} albumId={1212} artistId={2323} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

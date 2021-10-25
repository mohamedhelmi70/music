import React from 'react';
import renderer from 'react-test-renderer';
import {Album} from '../../../../types';
import AlbumCard from '../AlbumCard';

// Describing a test suite
describe('<AlbumCard />', () => {
    const album: Album = {
        album: 'album name',
        id_album: 1233,
        cover: 'https://image.png',
        api_album: 'hhtps://music.com/album',
        api_tracks: 'hhtps://music.com/tracks',
    };
    test('Renders AlbumCard correctly', () => {
        const tree = renderer.create(<AlbumCard album={album} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

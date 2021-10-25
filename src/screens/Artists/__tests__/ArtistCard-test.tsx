import React from 'react';
import renderer from 'react-test-renderer';
import {Artist} from '../../../../types';
import ArtistCard from '../ArtistCard';

// Describing a test suite
describe('<ArtistCard />', () => {
    const artist: Artist = {
        id_artist: 11,
        artist: 'artist name',
        cover: 'https://artist.png',
    };
    test('Renders ArtistCard correctly', () => {
        const tree = renderer.create(<ArtistCard artist={artist} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

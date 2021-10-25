import {RouteProp} from '@react-navigation/core';
import React from 'react';
import renderer from 'react-test-renderer';
import {AppParamList} from '../../../../types';
import TrackScreen from '../Track';

// Describing a test suite
describe('<Track />', () => {
    const route: RouteProp<AppParamList, 'Track'> = {
        params: {trackId: 121, albumId: 15, artistId: 12, title: 'track title'},
        key: 'q1',
        name: 'Track',
    };
    test('Renders Track correctly', () => {
        const tree = renderer.create(<TrackScreen route={route} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

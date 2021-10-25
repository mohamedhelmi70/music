import React from 'react';
import renderer from 'react-test-renderer';
import FastImage from '../FastImage';

// Describing a test suite
describe('<FastImage />', () => {
    test('Renders Fast Image correctly', () => {
        const tree = renderer.create(<FastImage url={'test.png'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
